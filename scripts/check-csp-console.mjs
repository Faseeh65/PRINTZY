import { spawn } from "node:child_process";
import { chromium } from "playwright";

const PORT = 8788;
const BASE_URL = `http://127.0.0.1:${PORT}`;

async function run() {
  console.log("Starting Wrangler for CSP verification on port", PORT, "...");
  const env = {
    ...process.env,
    XDG_CONFIG_HOME: `${process.cwd()}/.wrangler/xdg`,
  };

  const serverProc = spawn(
    process.platform === "win32" ? "npx.cmd" : "npx",
    ["wrangler", "dev", "--port", String(PORT), "--ip", "127.0.0.1"],
    { env, stdio: ["ignore", "pipe", "pipe"], shell: true },
  );

  // Wait for server ready
  for (let i = 0; i < 20; i++) {
    try {
      const res = await fetch(BASE_URL);
      if (res.status === 200) break;
    } catch {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }

  const cspViolations = [];
  const allConsoleMessages = [];
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  page.on("console", (msg) => {
    const text = msg.text();
    allConsoleMessages.push(`[${msg.type()}] ${text}`);
    if (
      text.includes("Content Security Policy") ||
      text.includes("violates the following Content Security Policy directive") ||
      text.includes("blocked by CSP") ||
      text.includes("Refused to")
    ) {
      cspViolations.push({ url: page.url(), text });
    }
  });

  page.on("pageerror", (err) => {
    allConsoleMessages.push(`[pageerror] ${err.message}`);
    if (err.message.includes("Content Security Policy") || err.message.includes("Refused to")) {
      cspViolations.push({ url: page.url(), text: err.message });
    }
  });

  console.log("Navigating to / (Home)...");
  await page.goto(`${BASE_URL}/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(2500);

  console.log("Navigating to /quote...");
  await page.goto(`${BASE_URL}/quote`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(4000);

  // Check if Turnstile iframe or script loaded
  const scriptLoaded = await page.evaluate(() =>
    Boolean(document.getElementById("turnstile-script")),
  );
  console.log("Turnstile script tag injected in DOM:", scriptLoaded ? "YES ✅" : "NO");

  await browser.close();
  serverProc.kill();

  console.log("\n--- CONSOLE LOG SUMMARY ---");
  console.log(`Total console events captured: ${allConsoleMessages.length}`);
  console.log(`CSP Violations detected: ${cspViolations.length}`);

  if (cspViolations.length > 0) {
    console.error("CSP Violations detected:", cspViolations);
    process.exit(1);
  } else {
    console.log("Zero CSP violations detected across / and /quote! ✅");
  }
}

run().catch((err) => {
  console.error("CSP verification failed:", err);
  process.exit(1);
});
