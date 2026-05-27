import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 375, height: 667 } });
const page = await ctx.newPage();
await page.goto('http://localhost:8090/', { waitUntil: 'domcontentloaded', timeout: 20000 });
await page.waitForTimeout(2000);

const data = await page.evaluate(() => {
  const get = sel => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const r = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    return { top: Math.round(r.top + scrollY), h: Math.round(r.height), w: Math.round(r.width), aspectRatio: style.aspectRatio, minHeight: style.minHeight, display: style.display };
  };
  
  const panels = Array.from(document.querySelectorAll('.produto-panel')).map((el, i) => {
    const fig = el.querySelector('.produto-figure');
    const pic = el.querySelector('picture');
    const img = el.querySelector('img');
    const s = (e) => e ? window.getComputedStyle(e) : null;
    const r = (e) => e ? e.getBoundingClientRect() : null;
    return {
      i, isActive: el.classList.contains('is-active'),
      panel: { top: Math.round(r(el).top + scrollY), h: Math.round(r(el).height) },
      fig: fig ? { top: Math.round(r(fig).top + scrollY), h: Math.round(r(fig).height), w: Math.round(r(fig).width), aspect: s(fig).aspectRatio, alignItems: s(fig).alignItems } : null,
      pic: pic ? { top: Math.round(r(pic).top + scrollY), h: Math.round(r(pic).height), w: Math.round(r(pic).width), display: s(pic).display } : null,
      img: img ? { top: Math.round(r(img).top + scrollY), h: Math.round(r(img).height), w: Math.round(r(img).width) } : null,
    };
  });

  return { viewport: { w: innerWidth, h: innerHeight }, section: get('#produtos'), shell: get('.produtos-shell'), left: get('.produtos-left'), copy: get('.produtos-copy'), stage: get('.produtos-stage'), panels };
});

console.log(JSON.stringify(data, null, 2));
await browser.close();
