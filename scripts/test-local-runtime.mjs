import { spawn } from "node:child_process";

const PORT = 8788;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function probe(path) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, { redirect: "manual" });
  const text = await res.text();
  return {
    status: res.status,
    headers: Object.fromEntries(res.headers.entries()),
    snippet: text.slice(0, 150),
  };
}

async function waitForServer(maxAttempts = 30) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetch(BASE_URL);
      if (res.status === 200 || res.status === 404) return true;
    } catch (e) {
      // log every 5s
      if (i % 5 === 0) console.log(`Waiting for server at ${BASE_URL}... (${e.message})`);
    }
    await new Promise((r) => setTimeout(r, 1000));
  }
  return false;
}

async function run() {
  console.log("Starting local Wrangler dev server on port", PORT, "...");
  const env = {
    ...process.env,
    XDG_CONFIG_HOME: `${process.cwd()}/.wrangler/xdg`,
  };

  const serverProc = spawn(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["wrangler", "dev", "--port", String(PORT), "--ip", "127.0.0.1"],
    {
      env,
      stdio: ["ignore", "pipe", "pipe"],
      shell: true,
    },
  );

  serverProc.stdout.on("data", (data) => {
    const str = data.toString();
    process.stdout.write(`[wrangler] ${str}`);
  });

  serverProc.stderr.on("data", (data) => {
    process.stderr.write(`[wrangler:err] ${data.toString()}`);
  });

  try {
    const ready = await waitForServer();
    if (!ready) {
      throw new Error("Server failed to respond within 30 seconds");
    }
    console.log("\nServer is READY! Probing routes and headers...\n");

    const rRoot = await probe("/");
    console.log(`GET / -> HTTP ${rRoot.status} (Expected 200)`);

    const rQuote = await probe("/quote");
    console.log(`GET /quote -> HTTP ${rQuote.status} (Expected 200)`);

    const rProducts = await probe("/products");
    console.log(`GET /products -> HTTP ${rProducts.status} (Expected 200)`);

    const rUnknown = await probe("/unknown-route-test-404");
    console.log(`GET /unknown-route-test-404 -> HTTP ${rUnknown.status} (Expected 404)`);

    console.log("\n--- Response Headers (GET /) ---");
    for (const [k, v] of Object.entries(rRoot.headers)) {
      if (
        [
          "content-security-policy",
          "x-content-type-options",
          "referrer-policy",
          "strict-transport-security",
          "permissions-policy",
          "x-frame-options",
          "x-xss-protection",
          "access-control-allow-origin",
        ].includes(k.toLowerCase())
      ) {
        console.log(`${k}: ${v}`);
      }
    }

    const allPassed =
      rRoot.status === 200 &&
      rQuote.status === 200 &&
      rProducts.status === 200 &&
      rUnknown.status === 404;

    console.log(
      "\nRoute check result:",
      allPassed ? "ALL ROUTES PASSED ✅" : "SOME ROUTES FAILED ❌",
    );
  } finally {
    console.log("\nStopping dev server...");
    serverProc.kill();
  }
}

run().catch((err) => {
  console.error("Test runner failed:", err);
  process.exit(1);
});
