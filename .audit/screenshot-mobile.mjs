import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });

const viewports = [
  { w: 375, h: 667,  label: 'iphone-se' },
  { w: 390, h: 844,  label: 'iphone-14' },
  { w: 430, h: 932,  label: 'iphone-14plus' },
  { w: 768, h: 1024, label: 'ipad' },
];

for (const vp of viewports) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:8090/', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(1800);
  await page.screenshot({
    path: `screenshots/after-fix_${vp.label}_${vp.w}x${vp.h}.png`,
    fullPage: true,
  });
  await ctx.close();
  console.log(`✅ ${vp.label} (${vp.w}x${vp.h})`);
}

await browser.close();
console.log('Done.');
