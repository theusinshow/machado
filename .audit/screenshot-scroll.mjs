import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

// Test at 375px — scroll to produtos section
const ctx = await browser.newContext({ viewport: { width: 375, height: 667 } });
const page = await ctx.newPage();
await page.goto('http://localhost:8090/', { waitUntil: 'domcontentloaded', timeout: 20000 });
await page.waitForTimeout(800);

// Scroll through the page to trigger lazy load
await page.evaluate(() => {
  return new Promise((resolve) => {
    let dist = 0;
    const step = 300;
    const total = document.body.scrollHeight;
    const id = setInterval(() => {
      dist += step;
      window.scrollTo(0, dist);
      if (dist >= total) { clearInterval(id); resolve(); }
    }, 80);
  });
});
await page.waitForTimeout(1200);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);

// Screenshot the products section area
const sec = await page.$('#produtos');
if (sec) {
  await sec.screenshot({ path: 'screenshots/produtos-section_375.png' });
  console.log('✅ produtos section cropped (375px)');
}

// Full page after lazy-load trigger
await page.screenshot({ path: 'screenshots/after-scroll_375.png', fullPage: true });
console.log('✅ full page after scroll (375px)');

await ctx.close();

// Same for 390px
const ctx2 = await browser.newContext({ viewport: { width: 390, height: 844 } });
const page2 = await ctx2.newPage();
await page2.goto('http://localhost:8090/', { waitUntil: 'domcontentloaded', timeout: 20000 });
await page2.waitForTimeout(800);
await page2.evaluate(() => new Promise(resolve => {
  let d = 0; const id = setInterval(() => { d += 300; window.scrollTo(0, d); if (d >= document.body.scrollHeight) { clearInterval(id); resolve(); }}, 80);
}));
await page2.waitForTimeout(1200);
await page2.evaluate(() => window.scrollTo(0, 0));
await page2.waitForTimeout(400);
const sec2 = await page2.$('#produtos');
if (sec2) { await sec2.screenshot({ path: 'screenshots/produtos-section_390.png' }); console.log('✅ produtos section (390px)'); }

await ctx2.close();
await browser.close();
console.log('Done.');
