/**
 * Machado Plataformas — Visual Audit Script
 * Playwright headless audit: all pages × all breakpoints
 */

import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const BASE_URL = 'http://localhost:8090';

const PAGES = [
  { slug: 'home',      path: '/',              name: 'Home (index.html)' },
  { slug: 'sobre',     path: '/sobre.html',    name: 'Sobre' },
  { slug: 'produtos',  path: '/produtos.html', name: 'Produtos' },
  { slug: 'clientes',  path: '/clientes.html', name: 'Clientes' },
  { slug: 'credito',   path: '/credito.html',  name: 'Crédito' },
];

const BREAKPOINTS = [
  { label: '375x667',   width: 375,  height: 667  },
  { label: '390x844',   width: 390,  height: 844  },
  { label: '430x932',   width: 430,  height: 932  },
  { label: '768x1024',  width: 768,  height: 1024 },
  { label: '1024x768',  width: 1024, height: 768  },
  { label: '1440x900',  width: 1440, height: 900  },
  { label: '1920x1080', width: 1920, height: 1080 },
];

const AUDIT_DIR  = 'c:/Dev/webdesign/landing-pages/machado/.audit';
const SHOT_DIR   = `${AUDIT_DIR}/screenshots`;

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

async function checkPage(browserPage, slug) {
  const issues = [];

  // ── 1. Horizontal scroll ─────────────────────────────────────────
  const overflow = await browserPage.evaluate(() => {
    const html  = document.documentElement;
    const vw    = html.clientWidth;
    const sw    = html.scrollWidth;
    const overflowers = [];
    document.querySelectorAll('*').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 3) {
        overflowers.push({
          tag:   el.tagName.toLowerCase(),
          cls:   (el.className?.toString?.() || '').slice(0, 70),
          right: Math.round(r.right),
          excess: Math.round(r.right - vw),
        });
      }
    });
    return { vw, sw, has: sw > vw + 3, overflowers: overflowers.slice(0, 6) };
  });

  if (overflow.has) {
    issues.push({
      type: 'OVERFLOW_HORIZONTAL',
      severity: 'CRITICAL',
      detail: `scrollWidth=${overflow.sw}px > vw=${overflow.vw}px (+${overflow.sw - overflow.vw}px)`,
      elements: overflow.overflowers,
    });
  }

  // ── 2. Broken images ─────────────────────────────────────────────
  const broken = await browserPage.evaluate(() =>
    Array.from(document.querySelectorAll('img'))
      .filter(img => img.complete && !img.naturalWidth && !img.src.startsWith('data:'))
      .map(img => ({ src: img.getAttribute('src') || '', alt: img.alt }))
  );
  if (broken.length) {
    issues.push({
      type: 'BROKEN_IMAGES',
      severity: 'MEDIUM',
      detail: `${broken.length} broken image(s)`,
      elements: broken,
    });
  }

  // ── 3. Collapsed / zero-height sections ──────────────────────────
  const collapsed = await browserPage.evaluate(() =>
    Array.from(document.querySelectorAll(
      'section, header, footer, .hero-stage, .page-hero, .sobre-unified, .arsenal, .em-acao, .entregas, .financiamento, .localizacao'
    ))
      .filter(el => el.getBoundingClientRect().height < 10)
      .map(el => ({ tag: el.tagName, id: el.id, cls: (el.className?.toString?.() || '').slice(0, 60) }))
  );
  if (collapsed.length) {
    issues.push({
      type: 'COLLAPSED_SECTION',
      severity: 'HIGH',
      detail: `${collapsed.length} section(s) with height < 10px`,
      elements: collapsed,
    });
  }

  // ── 4. Text clipped inside overflow:hidden ─────────────────────
  const clipped = await browserPage.evaluate(() =>
    Array.from(document.querySelectorAll('h1,h2,h3,.hero-title,.page-hero__title,.arsenal__name,.sec-title'))
      .filter(el => {
        const s = window.getComputedStyle(el);
        return (s.overflow === 'hidden' || s.overflowX === 'hidden') && el.scrollWidth > el.clientWidth + 3;
      })
      .map(el => ({
        tag:  el.tagName,
        cls:  (el.className?.toString?.() || '').slice(0, 60),
        text: el.textContent?.trim?.().slice(0, 50),
        sw:   el.scrollWidth,
        cw:   el.clientWidth,
      }))
  );
  if (clipped.length) {
    issues.push({
      type: 'TEXT_CLIPPED',
      severity: 'HIGH',
      detail: `${clipped.length} heading(s) clipped (scrollWidth > clientWidth)`,
      elements: clipped,
    });
  }

  // ── 5. Off-screen buttons / CTAs ─────────────────────────────────
  const offBtns = await browserPage.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    return Array.from(document.querySelectorAll('button, .btn, a[class*="btn"]'))
      .filter(el => {
        const r = el.getBoundingClientRect();
        return r.right > vw + 5 || r.left < -5;
      })
      .map(el => ({
        text:  el.textContent?.trim?.().slice(0, 40),
        cls:   (el.className?.toString?.() || '').slice(0, 60),
        left:  Math.round(el.getBoundingClientRect().left),
        right: Math.round(el.getBoundingClientRect().right),
      }));
  });
  if (offBtns.length) {
    issues.push({
      type: 'OFFSCREEN_BUTTON',
      severity: 'HIGH',
      detail: `${offBtns.length} button/CTA partially off-screen`,
      elements: offBtns,
    });
  }

  // ── 6. Map check (sobre) ──────────────────────────────────────────
  if (slug === 'sobre') {
    const mapH = await browserPage.evaluate(() => {
      const el = document.getElementById('sobre-map');
      return el ? Math.round(el.getBoundingClientRect().height) : -1;
    });
    if (mapH >= 0 && mapH < 100) {
      issues.push({
        type: 'MAP_COLLAPSED',
        severity: 'HIGH',
        detail: `#sobre-map height = ${mapH}px (expected ≥ 240px)`,
        elements: [],
      });
    }
  }

  // ── 7. Navbar height sanity ───────────────────────────────────────
  const navH = await browserPage.evaluate(() => {
    const nav = document.querySelector('#navbar, .navbar, header');
    return nav ? Math.round(nav.getBoundingClientRect().height) : null;
  });
  if (navH !== null && navH < 40) {
    issues.push({
      type: 'NAVBAR_COLLAPSED',
      severity: 'HIGH',
      detail: `Navbar height = ${navH}px (expected ≥ 48px)`,
      elements: [],
    });
  }

  return issues;
}

async function main() {
  ensureDir(SHOT_DIR);

  const browser = await chromium.launch({ headless: true });
  const fullReport = [];

  for (const pg of PAGES) {
    console.log(`\n▶ ${pg.name}`);
    const pageRep = { page: pg.name, slug: pg.slug, breakpoints: [] };

    for (const bp of BREAKPOINTS) {
      process.stdout.write(`  [${bp.label}] `);

      const ctx  = await browser.newContext({
        viewport: { width: bp.width, height: bp.height },
        deviceScaleFactor: 1,
        ignoreHTTPSErrors: true,
      });
      const bPage = await ctx.newPage();

      const consoleErrs = [];
      bPage.on('console', m => { if (m.type() === 'error') consoleErrs.push(m.text()); });
      bPage.on('pageerror', e => consoleErrs.push(e.message));

      let issues = [];
      let screenshotRel = null;

      try {
        await bPage.goto(`${BASE_URL}${pg.path}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
        // wait for fonts + images
        await bPage.waitForTimeout(1800);

        issues = await checkPage(bPage, pg.slug);

        // Attach console errors
        const jsErrors = consoleErrs.filter(e =>
          !e.includes('favicon') &&
          !e.includes('maplibre') &&   // map style warnings are expected in file://
          !e.includes('tiles.openfreemap')
        );
        if (jsErrors.length) {
          issues.push({
            type: 'JS_CONSOLE_ERROR',
            severity: 'MEDIUM',
            detail: `${jsErrors.length} JS console error(s)`,
            elements: jsErrors.slice(0, 4),
          });
        }

        // Screenshot: always for ≤430px, for others only if issues
        const isMobile = bp.width <= 430;
        if (isMobile || issues.length > 0) {
          const fname = `${pg.slug}_${bp.label}.png`;
          await bPage.screenshot({ path: `${SHOT_DIR}/${fname}`, fullPage: true });
          screenshotRel = `screenshots/${fname}`;
        }

        const mark = issues.length === 0 ? '✅' : `⚠️  ${issues.length}`;
        console.log(mark);
      } catch (err) {
        console.log(`❌ ${err.message.slice(0, 60)}`);
        issues = [{ type: 'LOAD_ERROR', severity: 'CRITICAL', detail: err.message.slice(0, 120), elements: [] }];
      }

      pageRep.breakpoints.push({ breakpoint: bp.label, issueCount: issues.length, issues, screenshot: screenshotRel });
      await ctx.close();
    }

    fullReport.push(pageRep);
  }

  await browser.close();

  // ── Save JSON ─────────────────────────────────────────────────────
  writeFileSync(`${AUDIT_DIR}/report.json`, JSON.stringify(fullReport, null, 2));

  // ── Print report ──────────────────────────────────────────────────
  const hr = '═'.repeat(72);
  console.log(`\n\n${hr}`);
  console.log('RELATÓRIO DE AUDITORIA — Machado Plataformas');
  console.log(hr);

  let total = 0;
  const allIssues = [];  // for prioritized list

  for (const pg of fullReport) {
    const cnt = pg.breakpoints.reduce((a, b) => a + b.issueCount, 0);
    total += cnt;
    console.log(`\n📄 ${pg.page}  [${cnt} problema(s)]`);
    console.log('─'.repeat(60));

    for (const bp of pg.breakpoints) {
      if (bp.issueCount === 0) {
        console.log(`  ${bp.breakpoint.padEnd(12)} ✅`);
        continue;
      }
      console.log(`  ${bp.breakpoint.padEnd(12)} ⚠️  ${bp.issueCount} problema(s)`);
      for (const iss of bp.issues) {
        const icon = iss.severity === 'CRITICAL' ? '🔴' : iss.severity === 'HIGH' ? '🟠' : '🟡';
        console.log(`    ${icon} [${iss.severity}] ${iss.type}: ${iss.detail}`);
        for (const el of (iss.elements || []).slice(0, 3)) {
          const d = typeof el === 'string' ? el : JSON.stringify(el);
          console.log(`       └ ${d.slice(0, 100)}`);
        }
        allIssues.push({ page: pg.name, breakpoint: bp.breakpoint, ...iss });
      }
    }
  }

  // ── Priority list ─────────────────────────────────────────────────
  console.log(`\n${hr}`);
  console.log('PROBLEMAS PRIORIZADOS (mobile-first)');
  console.log(hr);

  const priority = ['375x667','390x844','430x932','768x1024','1024x768','1440x900','1920x1080'];
  const sevOrder  = { CRITICAL: 0, HIGH: 1, MEDIUM: 2 };

  allIssues
    .sort((a, b) => (priority.indexOf(a.breakpoint) - priority.indexOf(b.breakpoint)) || (sevOrder[a.severity] - sevOrder[b.severity]))
    .forEach((iss, i) => {
      const icon = iss.severity === 'CRITICAL' ? '🔴' : iss.severity === 'HIGH' ? '🟠' : '🟡';
      console.log(`\n${i + 1}. ${icon} [${iss.severity}] ${iss.page} @ ${iss.breakpoint}`);
      console.log(`   Tipo: ${iss.type}`);
      console.log(`   Detalhe: ${iss.detail}`);
      if (iss.elements?.length) {
        const sample = typeof iss.elements[0] === 'string' ? iss.elements[0] : JSON.stringify(iss.elements[0]);
        console.log(`   Amostra: ${sample.slice(0, 100)}`);
      }
    });

  console.log(`\n${hr}`);
  console.log(`TOTAL: ${total} problema(s) encontrado(s)`);
  console.log(`JSON:  .audit/report.json`);
  console.log(`Shots: .audit/screenshots/ (${fullReport.flatMap(p=>p.breakpoints).filter(b=>b.screenshot).length} arquivos)`);
  console.log(`${hr}\n`);
}

main().catch(e => { console.error(e); process.exit(1); });
