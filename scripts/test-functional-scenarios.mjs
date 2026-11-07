import fs from "node:fs";
import path from "node:path";
import { neon } from "@neondatabase/serverless";
import { createQuoteRequest } from "../src/lib/db.ts";

// Helper to load .env.local
function loadEnvLocal() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, "utf-8");
  const env = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      env[key] = val;
    }
  }
  return env;
}

const localEnv = loadEnvLocal();
for (const [k, v] of Object.entries(localEnv)) {
  if (!process.env[k]) process.env[k] = v;
}

const dbUrl = process.env.DATABASE_URL_POOLED || process.env.DATABASE_URL || "";

// HARD RULE 1 CHECK
if (!dbUrl) {
  console.error("FATAL: DATABASE_URL_POOLED missing.");
  process.exit(1);
}
if (dbUrl.includes("ep-noisy-rice-a16h9gsb")) {
  console.error("FATAL: Production database host detected! Refusing to run. Aborting.");
  process.exit(1);
}
if (!dbUrl.includes("ep-still-rain-a122yurg")) {
  console.error(
    "FATAL: Host is not dev branch (ep-still-rain-a122yurg). Refusing to run. Aborting.",
  );
  process.exit(1);
}

const sql = neon(dbUrl);

async function run() {
  console.log("=== STARTING TASK E FUNCTIONAL TESTS ON DEV BRANCH ===");
  console.log("Verified database host is dev branch (ep-still-rain-a122yurg).");

  // Get active product
  const products =
    await sql`SELECT id, slug, title, min_quantity FROM products WHERE is_active = true LIMIT 1`;
  if (!products || products.length === 0) {
    throw new Error("No active products found on dev database.");
  }
  const testProduct = products[0];
  console.log(
    `Using product for tests: ${testProduct.title} (slug: ${testProduct.slug}, min_quantity: ${testProduct.min_quantity})\n`,
  );

  const DEMO_TURNSTILE_TOKEN = "1x00000000000000000000AA";
  let insertedCount = 0;

  // -------------------------------------------------------------
  // Scenario 1: Valid submission
  // -------------------------------------------------------------
  console.log("--- Scenario 1: Valid submission ---");
  const s1Name = "ZZ-TEST Valid Submission 1";
  const s1Result = await createQuoteRequest({
    customer_name: s1Name,
    business_name: "Printzy Dev QA",
    phone: "+92 300 1234567",
    email: "qa@printzy.pk",
    product_id: testProduct.slug,
    quantity: testProduct.min_quantity + 50,
    details: "Standard test order details for Printzy dev.",
    turnstileToken: DEMO_TURNSTILE_TOKEN,
  });
  insertedCount++;

  const s1Row = await sql`
    SELECT id, customer_name, status, admin_notes 
    FROM quote_requests 
    WHERE customer_name = ${s1Name}
    LIMIT 1;
  `;
  if (s1Row.length === 1 && s1Row[0].status === "pending" && s1Row[0].admin_notes === null) {
    console.log(
      `PASS: Valid submission created row id=${s1Row[0].id}, status='${s1Row[0].status}', admin_notes=${s1Row[0].admin_notes} ✅`,
    );
  } else {
    throw new Error(`FAIL Scenario 1: row not matching expected state: ${JSON.stringify(s1Row)}`);
  }

  // -------------------------------------------------------------
  // Scenario 2: Quantity below min_quantity
  // -------------------------------------------------------------
  console.log("\n--- Scenario 2: Quantity below min_quantity ---");
  const s2Name = "ZZ-TEST Below Min Quantity";
  let s2Rejected = false;
  try {
    await createQuoteRequest({
      customer_name: s2Name,
      business_name: null,
      phone: "+92 300 1234567",
      email: null,
      product_id: testProduct.slug,
      quantity: Math.max(1, testProduct.min_quantity - 1),
      details: null,
      turnstileToken: DEMO_TURNSTILE_TOKEN,
    });
  } catch (err) {
    s2Rejected = true;
    console.log(`PASS: Below min_quantity rejected with message: "${err.message}" ✅`);
  }
  const s2Row = await sql`SELECT id FROM quote_requests WHERE customer_name = ${s2Name}`;
  if (!s2Rejected || s2Row.length > 0) {
    throw new Error(`FAIL Scenario 2: Row was inserted despite low quantity: ${s2Row.length}`);
  }
  console.log("PASS: Confirmed 0 rows exist in dev database for Scenario 2 ✅");

  // -------------------------------------------------------------
  // Scenario 3: Phone "abc"
  // -------------------------------------------------------------
  console.log("\n--- Scenario 3: Phone 'abc' ---");
  const s3Name = "ZZ-TEST Invalid Phone";
  let s3Rejected = false;
  try {
    await createQuoteRequest({
      customer_name: s3Name,
      business_name: null,
      phone: "abc",
      email: null,
      product_id: testProduct.slug,
      quantity: testProduct.min_quantity,
      details: null,
      turnstileToken: DEMO_TURNSTILE_TOKEN,
    });
  } catch (err) {
    s3Rejected = true;
    const msg = err.message;
    const hasPostgresLeak = /syntax error|pq:|pg_|relation|column|SELECT|INSERT/i.test(msg);
    if (hasPostgresLeak) {
      throw new Error(`FAIL Scenario 3: Error contains leaked database text: "${msg}"`);
    }
    console.log(`PASS: Invalid phone rejected with clean user-facing error: "${msg}" ✅`);
  }
  const s3Row = await sql`SELECT id FROM quote_requests WHERE customer_name = ${s3Name}`;
  if (!s3Rejected || s3Row.length > 0) {
    throw new Error(`FAIL Scenario 3: Row was inserted despite invalid phone: ${s3Row.length}`);
  }
  console.log("PASS: Confirmed 0 rows exist in dev database for Scenario 3 ✅");

  // -------------------------------------------------------------
  // Scenario 4: TURNSTILE_SECRET_KEY unset for this process only
  // -------------------------------------------------------------
  console.log("\n--- Scenario 4: TURNSTILE_SECRET_KEY unset ---");
  const s4Name = "ZZ-TEST Unset Turnstile Key";
  const origKey = process.env.TURNSTILE_SECRET_KEY;
  let s4Rejected = false;
  try {
    delete process.env.TURNSTILE_SECRET_KEY;
    await createQuoteRequest({
      customer_name: s4Name,
      business_name: null,
      phone: "+92 300 1234567",
      email: null,
      product_id: testProduct.slug,
      quantity: testProduct.min_quantity,
      details: null,
      turnstileToken: DEMO_TURNSTILE_TOKEN,
    });
  } catch (err) {
    s4Rejected = true;
    console.log(`PASS: Unset secret rejected with message: "${err.message}" ✅`);
  } finally {
    process.env.TURNSTILE_SECRET_KEY = origKey;
  }
  const s4Row = await sql`SELECT id FROM quote_requests WHERE customer_name = ${s4Name}`;
  if (!s4Rejected || s4Row.length > 0) {
    throw new Error(`FAIL Scenario 4: Row was inserted when secret was unset: ${s4Row.length}`);
  }
  console.log("PASS: Confirmed 0 rows exist in dev database for Scenario 4 ✅");

  // -------------------------------------------------------------
  // Scenario 5: Direct POST with extra fields
  // -------------------------------------------------------------
  console.log("\n--- Scenario 5: Direct POST with injected extra fields ---");
  const s5Name = "ZZ-TEST Injected Extra Fields";
  const forgedId = "11111111-2222-3333-4444-555555555555";
  const s5Result = await createQuoteRequest({
    customer_name: s5Name,
    business_name: "Mallory Exploit Corp",
    phone: "+92 300 1234567",
    email: "exploit@test.com",
    product_id: testProduct.slug,
    quantity: testProduct.min_quantity,
    details: "Testing server resistance to status/admin_notes injection",
    turnstileToken: DEMO_TURNSTILE_TOKEN,
    // Extra injected malicious fields:
    id: forgedId,
    status: "fulfilled",
    admin_notes: "Hacked: approved without payment",
  });
  insertedCount++;

  const s5Row = await sql`
    SELECT id, customer_name, status, admin_notes 
    FROM quote_requests 
    WHERE customer_name = ${s5Name}
    LIMIT 1;
  `;
  if (
    s5Row.length === 1 &&
    s5Row[0].status === "pending" &&
    s5Row[0].admin_notes === null &&
    s5Row[0].id !== forgedId
  ) {
    console.log(
      `PASS: Stored row ignored injected fields: id=${s5Row[0].id} (not forged), status='${s5Row[0].status}' (pending), admin_notes=${s5Row[0].admin_notes} (null) ✅`,
    );
  } else {
    throw new Error(
      `FAIL Scenario 5: Injected fields compromised database state: ${JSON.stringify(s5Row)}`,
    );
  }

  // -------------------------------------------------------------
  // Scenario 6: Oversized details (>2000 chars) and non-numeric quantity
  // -------------------------------------------------------------
  console.log("\n--- Scenario 6: Oversized details and non-numeric quantity ---");
  const s6Name = "ZZ-TEST Oversized & Non-Numeric";
  let s6DetailsRejected = false;
  try {
    await createQuoteRequest({
      customer_name: s6Name,
      business_name: null,
      phone: "+92 300 1234567",
      email: null,
      product_id: testProduct.slug,
      quantity: testProduct.min_quantity,
      details: "A".repeat(2500),
      turnstileToken: DEMO_TURNSTILE_TOKEN,
    });
  } catch (err) {
    s6DetailsRejected = true;
    console.log(`PASS: Oversized details (>2000 chars) rejected: "${err.message}" ✅`);
  }

  let s6QtyRejected = false;
  try {
    await createQuoteRequest({
      customer_name: s6Name,
      business_name: null,
      phone: "+92 300 1234567",
      email: null,
      product_id: testProduct.slug,
      quantity: "not-a-number",
      details: "Normal details",
      turnstileToken: DEMO_TURNSTILE_TOKEN,
    });
  } catch (err) {
    s6QtyRejected = true;
    console.log(`PASS: Non-numeric quantity rejected: "${err.message}" ✅`);
  }

  const s6Row = await sql`SELECT id FROM quote_requests WHERE customer_name = ${s6Name}`;
  if (!s6DetailsRejected || !s6QtyRejected || s6Row.length > 0) {
    throw new Error("FAIL Scenario 6: Row was inserted despite oversized/invalid payload");
  }
  console.log("PASS: Confirmed 0 rows exist in dev database for Scenario 6 ✅");

  // -------------------------------------------------------------
  // Note on Cloudflare Turnstile local testing
  // -------------------------------------------------------------
  console.log("\n[NOTE ON TURNSTILE LOCAL TESTING]");
  console.log(
    "The Cloudflare demo secret key (1x0000000000000000000000000000000AA) automatically accepts any dummy token via siteverify.",
  );
  console.log(
    "Therefore, an end-to-end wrong-token test against Cloudflare siteverify is mathematically not possible locally without production keys; this is noted explicitly per task instructions.",
  );

  // -------------------------------------------------------------
  // CLEANUP: Delete only rows where customer_name starts with ZZ-TEST
  // -------------------------------------------------------------
  console.log("\n--- CLEANUP ---");
  const deletedRows = await sql`
    DELETE FROM quote_requests 
    WHERE customer_name LIKE 'ZZ-TEST%' 
    RETURNING id, customer_name;
  `;
  console.log(
    `Cleaned up ${deletedRows.length} test row(s) whose customer_name starts with 'ZZ-TEST'.`,
  );
  deletedRows.forEach((r) => console.log(` - Deleted row id=${r.id} (${r.customer_name})`));

  console.log("\n=== ALL TASK E SCENARIOS PASSED WITH EVIDENCE ✅ ===");
}

run().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
