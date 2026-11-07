import fs from "node:fs";
import path from "node:path";
import { neon } from "@neondatabase/serverless";

// Helper to load .env.local without exposing secrets
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
const databaseUrl =
  process.env.DATABASE_URL_POOLED ||
  process.env.DATABASE_URL ||
  localEnv.DATABASE_URL_POOLED ||
  localEnv.DATABASE_URL;

if (!databaseUrl) {
  console.error(
    "FATAL: DATABASE_URL_POOLED or DATABASE_URL not found in environment or .env.local.",
  );
  process.exit(1);
}

// HARD GUARD: Refuse to run against production database
if (databaseUrl.includes("ep-noisy-rice-a16h9gsb")) {
  console.error(
    "FATAL: Guard triggered! Refusing to run against production database (ep-noisy-rice-a16h9gsb). Aborting.",
  );
  process.exit(1);
}

// DEV BRANCH GUARD: Require dev branch host
if (!databaseUrl.includes("ep-still-rain-a122yurg")) {
  console.error(
    "FATAL: Guard triggered! Only dev branch (ep-still-rain-a122yurg) is permitted. Aborting.",
  );
  process.exit(1);
}

console.log("Connecting to Neon Lakebase Postgres (dev branch: ep-still-rain-a122yurg)...");
const sql = neon(databaseUrl);

try {
  const result = await sql`SELECT NOW() as current_time, current_database() as db_name, version()`;
  console.log("Successfully connected to Neon dev branch!");
  console.log("Database:", result[0].db_name);
  console.log("Server time:", result[0].current_time);
  console.log("PostgreSQL version:", result[0].version.split(",")[0]);

  // Check tables
  const tables = await sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    ORDER BY table_name;
  `;
  console.log(
    "Public tables:",
    tables.map((t) => t.table_name),
  );

  // Verify products count
  const count = await sql`SELECT count(*)::int as count FROM products`;
  console.log("Products count:", count[0].count);

  if (count[0].count === 0) {
    console.log("Dev branch has no products. Seeding standard product catalog into dev branch...");
    const sampleProducts = [
      {
        slug: "cups",
        title: "Cups & Glasses",
        description: "Single and double-wall cups that carry your logo to every table.",
        min_quantity: 100,
      },
      {
        slug: "boxes",
        title: "Custom Boxes",
        description: "Shipping, gift and product boxes sized to fit and built to protect.",
        min_quantity: 100,
      },
      {
        slug: "pizza-food-boxes",
        title: "Pizza & Food Boxes",
        description: "Grease-resistant boxes that keep food hot and branding sharp.",
        min_quantity: 100,
      },
      {
        slug: "takeaway",
        title: "Takeaway Packaging",
        description: "Complete takeaway sets that look consistent from kitchen to doorstep.",
        min_quantity: 100,
      },
      {
        slug: "tissues",
        title: "Tissues & Napkins",
        description: "Soft printed napkins that finish the dining experience.",
        min_quantity: 100,
      },
      {
        slug: "paper-bags",
        title: "Paper Bags",
        description: "Kraft and white bags with strong handles and clean print.",
        min_quantity: 100,
      },
      {
        slug: "sleeves-stickers",
        title: "Sleeves & Stickers",
        description: "Low-cost branding for cups, boxes and sealed packs.",
        min_quantity: 100,
      },
      {
        slug: "other",
        title: "Other Custom Packaging",
        description: "Have something specific in mind? Tell us and we will make it.",
        min_quantity: 100,
      },
    ];

    for (const p of sampleProducts) {
      await sql`
        INSERT INTO products (slug, title, description, min_quantity)
        VALUES (${p.slug}, ${p.title}, ${p.description}, ${p.min_quantity})
        ON CONFLICT (slug) DO NOTHING;
      `;
    }
    console.log("Dev branch seeding complete!");
  }

  // Insert a test quote request marked with ZZ-TEST prefix
  const product = await sql`SELECT id FROM products LIMIT 1`;
  if (product.length > 0) {
    console.log("Testing insert on quote_requests table with ZZ-TEST prefix...");
    const insertedQuote = await sql`
      INSERT INTO quote_requests (
        customer_name,
        business_name,
        phone,
        email,
        product_id,
        quantity,
        details
      ) VALUES (
        'ZZ-TEST Neon Integration Guard',
        'Printzy Dev QA',
        '+92 300 1234567',
        'qa-dev@printzy.pk',
        ${product[0].id},
        500,
        'Automated verification of Neon dev branch integration.'
      ) RETURNING id, customer_name, status, admin_notes, created_at;
    `;
    console.log(
      "Test quote inserted successfully on dev branch (status:",
      insertedQuote[0].status,
      ", admin_notes:",
      insertedQuote[0].admin_notes,
      ")",
    );

    // Clean up test quote
    const deleted =
      await sql`DELETE FROM quote_requests WHERE customer_name LIKE 'ZZ-TEST%' RETURNING id`;
    console.log(`Cleaned up ${deleted.length} ZZ-TEST quote row(s).`);
  }

  console.log("ALL NEON DEV DATABASE CHECKS PASSED! ✅");
} catch (err) {
  console.error("Database connection error:", err);
  process.exit(1);
}
