import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });

for (const [w, h] of [[768, 1024], [1024, 768]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  await page.goto('http://localhost:8090/', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForTimeout(600);
  await page.evaluate(() => new Promise(r => {
    let d = 0; const id = setInterval(() => { d += 400; window.scrollTo(0,d); if(d>=document.body.scrollHeight){clearInterval(id);r();}}, 70);
  }));
  await page.waitForTimeout(1000);
  await page.evaluate(() => window.scrollTo(0,0));
  await page.waitForTimeout(300);
  
  const sec = await page.$('#produtos');
  if (sec) {
    await sec.screenshot({ path: `screenshots/produtos_${w}x${h}.png` });
    console.log(`✅ produtos at ${w}x${h}`);
  }
  
  // Measure figure
  const dims = await page.evaluate(() => {
    const fig = document.querySelector('.produto-figure');
    if (!fig) return null;
    const r = fig.getBoundingClientRect();
    return { h: Math.round(r.height), w: Math.round(r.width), aspect: getComputedStyle(fig).aspectRatio };
  });
  console.log(`   figure: ${JSON.stringify(dims)}`);
  await ctx.close();
}
await browser.close();
