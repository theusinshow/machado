import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });

for (const [w, h] of [[1440, 900], [1366, 768]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:8090/', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(1200);
  // scroll to produtos  
  await page.evaluate(() => {
    const el = document.getElementById('produtos');
    if (el) el.scrollIntoView();
  });
  await page.waitForTimeout(800);
  const sec = await page.$('#produtos');
  if (sec) {
    await sec.screenshot({ path: `screenshots/desktop_produtos_${w}x${h}.png` });
    console.log(`✅ desktop produtos at ${w}x${h}`);
  }
  await ctx.close();
}
await browser.close();
