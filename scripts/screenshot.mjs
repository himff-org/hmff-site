import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";

const URL = process.env.URL ?? "http://127.0.0.1:4321";
const OUTDIR = process.env.OUTDIR ?? "/tmp/hmff-screens";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

await mkdir(OUTDIR, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
});

async function shoot(path, opts = {}) {
  const page = await browser.newPage();
  await page.setViewport({ width: opts.width ?? 1440, height: opts.height ?? 900, deviceScaleFactor: 1 });
  await page.goto(`${URL}${opts.path ?? ""}`, { waitUntil: "networkidle0", timeout: 30000 });
  if (opts.scroll) await page.evaluate((y) => window.scrollTo(0, y), opts.scroll);
  await new Promise((r) => setTimeout(r, 350));
  await page.screenshot({ path: `${OUTDIR}/${path}`, fullPage: opts.fullPage ?? false });
  await page.close();
  console.log(`✓ ${path}`);
}

// Desktop full-page
await shoot("desktop-full.png", { fullPage: true });
// Mobile full-page
await shoot("mobile-full.png", { width: 390, height: 844, fullPage: true });
// /mahalo
await shoot("mahalo.png", { path: "/mahalo", fullPage: true });
// /404
await shoot("404.png", { path: "/this-does-not-exist", fullPage: true });

await browser.close();
console.log("done");
