#!/usr/bin/env node
/**
 * capture.mjs — Screenshots do site Machado Plataformas para portfólio.
 */

import { chromium, devices } from 'playwright';
import sharp from 'sharp';
import { mkdir, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';

// ---------- configuração ----------
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true];
  })
);

const URL = args.url || 'https://machado-sigma.vercel.app/';
const OUT_DIR = path.resolve(args.out || './public/cases/machado');
const QUALITY = Number(args.quality || 82);

const BUDGET = { 'desktop-tall': 300, 'mobile-tall': 150, _default: 250 };

const HIDE_SELECTORS = [
  '[id*="cookie" i]', '[class*="cookie" i]',
  '[id*="consent" i]', '[class*="consent" i]',
  '[id*="lgpd" i]', '[class*="lgpd" i]',
  '[aria-label*="cookie" i]', '[class*="cookie-banner" i]',
  '.cc-window', '#onetrust-banner-sdk', '#hs-eu-cookie-confirmation',
];
const HIDE_FLOATING_WHATSAPP = true;
const WHATSAPP_SELECTORS = ['[href*="wa.me" i]', '[href*="whatsapp" i]', '[class*="whatsapp" i]', '[id*="whatsapp" i]'];

const kb = (bytes) => bytes / 1024;
const log = (...a) => console.log(...a);

function budgetFor(name) {
  return BUDGET[name] ?? BUDGET._default;
}

const WEBP_MAX_DIM = 16000; // limite real do WebP é 16383px; margem de segurança

async function writeWebp(pngBuffer, name) {
  const limitKB = budgetFor(name);
  const file = path.join(OUT_DIR, `${name}.webp`);
  const meta = await sharp(pngBuffer).metadata();

  const maxDim = Math.max(meta.width, meta.height);
  const preScale = maxDim > WEBP_MAX_DIM ? WEBP_MAX_DIM / maxDim : 1;

  const render = (q, extra = 1) => {
    const sc = preScale * extra;
    let s = sharp(pngBuffer);
    if (sc < 1) s = s.resize({ width: Math.max(1, Math.round(meta.width * sc)) });
    return s.webp({ quality: q, effort: 6 }).toBuffer();
  };

  const qualities = [QUALITY, 75, 68, 60, 52, 45, 38];
  let best = null;

  for (const q of qualities) {
    const buf = await render(q);
    if (!best || buf.length < best.buf.length) best = { buf, q, scale: preScale };
    if (kb(buf.length) <= limitKB) {
      await writeFile(file, buf);
      log(`  ✓ ${name}.webp  ${kb(buf.length).toFixed(0)}KB  q${q}${preScale < 1 ? `  pré-escala ${preScale.toFixed(2)}` : ''}  (limite ${limitKB}KB)`);
      return;
    }
  }

  for (const scale of [0.9, 0.8, 0.7, 0.6, 0.5]) {
    const buf = await render(72, scale);
    if (buf.length < best.buf.length) best = { buf, q: 72, scale: preScale * scale };
    if (kb(buf.length) <= limitKB) {
      await writeFile(file, buf);
      log(`  ✓ ${name}.webp  ${kb(buf.length).toFixed(0)}KB  q72  escala ${(preScale * scale).toFixed(2)}  (limite ${limitKB}KB)`);
      return;
    }
  }

  await writeFile(file, best.buf);
  log(`  ⚠ ${name}.webp  ${kb(best.buf.length).toFixed(0)}KB  (NÃO atingiu o limite de ${limitKB}KB — menor possível gravado)`);
}

async function fullScroll(page) {
  await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const step = Math.round(window.innerHeight * 0.8);
    let y = 0;
    const max = document.documentElement.scrollHeight;
    while (y < max) {
      window.scrollTo(0, y);
      await sleep(180);
      y += step;
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await sleep(400);
    window.scrollTo(0, 0);
    await sleep(300);
  });
  await page.evaluate(async () => {
    await Promise.all(
      Array.from(document.images)
        .filter((img) => !img.complete)
        .map((img) => new Promise((res) => { img.onload = img.onerror = res; }))
    );
  });
}

async function hideJunk(page, hideWhatsapp) {
  const sels = [...HIDE_SELECTORS, ...(hideWhatsapp ? WHATSAPP_SELECTORS : [])];
  await page.addStyleTag({
    content: sels.map((s) => `${s}{display:none !important;visibility:hidden !important;}`).join('\n'),
  }).catch(() => {});
  for (const t of ['aceitar', 'aceito', 'concordo', 'entendi', 'ok', 'fechar', 'accept']) {
    const btn = page.getByRole('button', { name: new RegExp(t, 'i') }).first();
    if (await btn.count().catch(() => 0)) await btn.click({ timeout: 800 }).catch(() => {});
  }
}

async function findSections(page) {
  const rects = await page.evaluate(() => {
    const seen = new Set();
    const out = [];
    const cands = document.querySelectorAll('section, header, footer, main > div, [class*="section" i]');
    for (const el of cands) {
      const r = el.getBoundingClientRect();
      const top = r.top + window.scrollY;
      const h = r.height;
      if (h < window.innerHeight * 0.45) continue;
      const key = Math.round(top / 50);
      if (seen.has(key)) continue;
      seen.add(key);
      out.push({ top: Math.max(0, Math.round(top)), height: Math.round(h) });
    }
    out.sort((a, b) => a.top - b.top);
    return out;
  });
  return rects;
}

async function captureFullPage(browser, { name, width, height, mobile }) {
  const ctx = await browser.newContext(
    mobile
      ? { ...devices['Pixel 5'], viewport: { width, height }, deviceScaleFactor: 1, isMobile: true, hasTouch: true }
      : { viewport: { width, height }, deviceScaleFactor: 1 }
  );
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await hideJunk(page, false);
  await fullScroll(page);
  const png = await page.screenshot({ fullPage: true, type: 'png' });
  await writeWebp(png, name);
  await ctx.close();
}

async function captureSections(browser) {
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 });
  await hideJunk(page, HIDE_FLOATING_WHATSAPP);
  await fullScroll(page);

  const pageH = await page.evaluate(() => document.documentElement.scrollHeight);
  let sections = await findSections(page);

  const wanted = 5;
  if (sections.length < wanted) {
    const extra = [];
    for (let i = 0; i < wanted; i++) {
      extra.push({ top: Math.round((pageH - 1000) * (i / (wanted - 1))), height: 1000 });
    }
    sections = sections.concat(extra);
  }
  sections = sections
    .filter((s, i, arr) => arr.findIndex((x) => Math.abs(x.top - s.top) < 250) === i)
    .sort((a, b) => a.top - b.top);
  const pick = [];
  for (let i = 0; i < wanted; i++) {
    pick.push(sections[Math.min(sections.length - 1, Math.round((i * (sections.length - 1)) / (wanted - 1)))]);
  }

  for (let i = 0; i < wanted; i++) {
    const y = Math.min(pick[i].top, Math.max(0, pageH - 1000));
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(500);
    const png = await page.screenshot({ type: 'png' });
    await writeWebp(png, `hero-${i + 1}`);
  }

  const galleryY = [
    0,
    Math.round(pageH * 0.20),
    Math.round(pageH * 0.42),
    Math.round(pageH * 0.64),
    Math.max(0, pageH - 1000),
  ];
  for (let i = 0; i < galleryY.length; i++) {
    await page.evaluate((yy) => window.scrollTo(0, yy), galleryY[i]);
    await page.waitForTimeout(500);
    const png = await page.screenshot({ type: 'png' });
    await writeWebp(png, `gallery-${i + 1}`);
  }

  await ctx.close();
}

(async () => {
  await mkdir(OUT_DIR, { recursive: true });
  log(`URL : ${URL}`);
  log(`Saída: ${OUT_DIR}\n`);

  const browser = await chromium.launch();
  try {
    log('1/3  desktop-tall (1600x900, full-page)…');
    await captureFullPage(browser, { name: 'desktop-tall', width: 1600, height: 900, mobile: false });

    log('2/3  mobile-tall (400x900, full-page)…');
    await captureFullPage(browser, { name: 'mobile-tall', width: 400, height: 900, mobile: true });

    log('3/3  seções + galeria (1600x1000)…');
    await captureSections(browser);
  } finally {
    await browser.close();
  }

  log('\nResumo:');
  const names = ['desktop-tall', 'mobile-tall',
    'hero-1', 'hero-2', 'hero-3', 'hero-4', 'hero-5',
    'gallery-1', 'gallery-2', 'gallery-3', 'gallery-4', 'gallery-5'];
  let ok = 0;
  for (const n of names) {
    try {
      const s = await stat(path.join(OUT_DIR, `${n}.webp`));
      const within = kb(s.size) <= budgetFor(n);
      log(`  ${within ? '✓' : '⚠'} ${n}.webp  ${kb(s.size).toFixed(0)}KB`);
      if (within) ok++;
    } catch {
      log(`  ✗ ${n}.webp  (faltando)`);
    }
  }
  log(`\nConcluído: ${ok}/12 dentro do orçamento. Arquivos em ${OUT_DIR}`);
})().catch((e) => { console.error('ERRO:', e); process.exit(1); });