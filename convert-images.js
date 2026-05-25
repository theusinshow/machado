// convert-images.js — converte todas as imagens do projeto para WebP
// Uso: node convert-images.js
// Os originais NÃO são apagados. Novos arquivos ficam na mesma pasta com extensão .webp

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const tasks = [
  // ── Hero ──────────────────────────────────────────────────────────
  // PNG com fundo transparente → WebP lossless preserva alpha
  {
    src: 'assets/images/hero/plataforma-hero.png',
    out: 'assets/images/hero/plataforma-hero.webp',
    w: 900, h: 1200,
    webp: { lossless: true },
  },

  // ── Produtos (showcase principal) ─────────────────────────────────
  // PNGs com fundo preto — lossless preserva a qualidade do produto
  {
    src: 'assets/images/produtos/LEVE.png',
    out: 'assets/images/produtos/LEVE.webp',
    w: 900, h: 1350,
    webp: { lossless: true },
  },
  {
    src: 'assets/images/produtos/MEDIA.png',
    out: 'assets/images/produtos/MEDIA.webp',
    w: 900, h: 1350,
    webp: { lossless: true },
  },
  {
    src: 'assets/images/produtos/pesada.png',
    out: 'assets/images/produtos/pesada.webp',
    w: 900, h: 1350,
    webp: { lossless: true },
  },

  // ── Galeria ────────────────────────────────────────────────────────
  {
    src: 'assets/images/galeria/2.jpeg',
    out: 'assets/images/galeria/foto-01.webp',
    w: 800, h: 1067,
    webp: { quality: 82 },
  },
  {
    src: 'assets/images/galeria/WhatsApp Image 2026-04-28 at 22.45.23.jpeg',
    out: 'assets/images/galeria/foto-02.webp',
    w: 800, h: 1067,
    webp: { quality: 82 },
  },
  {
    src: 'assets/images/galeria/WhatsApp Image 2026-04-28 at 22.45.41.jpeg',
    out: 'assets/images/galeria/foto-03.webp',
    w: 800, h: 1067,
    webp: { quality: 82 },
  },
  {
    src: 'assets/images/galeria/WhatsApp Image 2026-04-28 at 22.45.41(1).jpeg',
    out: 'assets/images/galeria/foto-04.webp',
    w: 800, h: 1067,
    webp: { quality: 82 },
  },
  {
    src: 'assets/images/galeria/WhatsApp Image 2026-04-28 at 22.45.46.jpeg',
    out: 'assets/images/galeria/foto-05.webp',
    w: 800, h: 1067,
    webp: { quality: 82 },
  },
  {
    src: 'assets/images/galeria/WhatsApp Image 2026-04-28 at 22.45.57.jpeg',
    out: 'assets/images/galeria/foto-06.webp',
    w: 800, h: 800,
    webp: { quality: 82 },
  },
  {
    src: 'assets/images/galeria/WhatsApp Image 2026-04-28 at 22.45.58.jpeg',
    out: 'assets/images/galeria/foto-07.webp',
    w: 800, h: 1067,
    webp: { quality: 82 },
  },
  {
    src: 'assets/images/galeria/WhatsApp Image 2026-04-28 at 22.45.58(1).jpeg',
    out: 'assets/images/galeria/foto-08.webp',
    w: 800, h: 1067,
    webp: { quality: 82 },
  },
  {
    src: 'assets/images/galeria/WhatsApp Image 2026-04-28 at 22.45.58(2).jpeg',
    out: 'assets/images/galeria/foto-09.webp',
    w: 800, h: 1067,
    webp: { quality: 82 },
  },
  {
    src: 'assets/images/galeria/WhatsApp Image 2026-05-05 at 12.12.50 (1).jpeg',
    out: 'assets/images/galeria/foto-10.webp',
    w: 800, h: 1067,
    webp: { quality: 82 },
  },

  // ── Sobre ──────────────────────────────────────────────────────────
  {
    src: 'assets/images/sobre/WhatsApp Image 2026-05-06 at 14.16.47.jpeg',
    out: 'assets/images/sobre/fabrica-01.webp',
    w: 1200, h: 636,
    webp: { quality: 85 },
  },
  {
    src: 'assets/images/sobre/WhatsApp Image 2026-05-06 at 14.16.47 (1).jpeg',
    out: 'assets/images/sobre/fabrica-02.webp',
    w: 800, h: 1067,
    webp: { quality: 85 },
  },
  {
    src: 'assets/images/sobre/WhatsApp Image 2026-05-06 at 14.16.49.jpeg',
    out: 'assets/images/sobre/fabrica-03.webp',
    w: 1200, h: 900,
    webp: { quality: 85 },
  },
  {
    src: 'assets/images/sobre/WhatsApp Image 2026-05-06 at 14.16.49 (1).jpeg',
    out: 'assets/images/sobre/fabrica-04.webp',
    w: 800, h: 1067,
    webp: { quality: 85 },
  },

  // ── Navbar card (versão menor da foto-03) ─────────────────────────
  {
    src: 'assets/images/galeria/WhatsApp Image 2026-04-28 at 22.45.41.jpeg',
    out: 'assets/images/galeria/foto-03-nav.webp',
    w: 400, h: 533,
    webp: { quality: 80 },
  },
];

(async () => {
  let ok = 0;
  let fail = 0;

  for (const t of tasks) {
    if (!fs.existsSync(t.src)) {
      console.warn(`⚠  Arquivo não encontrado: ${t.src}`);
      fail++;
      continue;
    }
    try {
      await sharp(t.src)
        .resize(t.w, t.h, { fit: 'inside', withoutEnlargement: true })
        .webp(t.webp)
        .toFile(t.out);

      const srcKB = Math.round(fs.statSync(t.src).size / 1024);
      const outKB = Math.round(fs.statSync(t.out).size / 1024);
      const saved = Math.round((1 - outKB / srcKB) * 100);
      console.log(`✓  ${t.out.padEnd(52)} ${String(srcKB + 'KB').padStart(7)} → ${String(outKB + 'KB').padStart(7)}  (−${saved}%)`);
      ok++;
    } catch (e) {
      console.error(`✗  ${t.src}: ${e.message}`);
      fail++;
    }
  }

  console.log(`\n${'─'.repeat(75)}`);
  console.log(`   ${ok} convertidas com sucesso   ${fail} erros`);
})();
