# REFERENCES.md — Referências Visuais e Técnicas

> Catálogo de referências para design, animação, código e conteúdo do projeto Machado Plataformas. Use para tomar decisões alinhadas com a visão do projeto.

---

## 🌐 Referência Principal de Design

### Good Fella — good-fella.com

**O que reproduzir estruturalmente:**
| Elemento | Como reproduzir |
|----------|----------------|
| Loading Screen | Logo centralizado + contador % + saída suave (yPercent: -100) |
| Tipografia display | Fonte Machado enorme, tracking negativo, ocupando largura total |
| Layout split do hero | 50% texto esquerda + 50% produto direita (como mockup) |
| Marquee/ticker | Linha horizontal com especialidades separadas por `—`, loop contínuo |
| Cards com hover elaborado | Border acende + scale de imagem + overlay de info |
| Navbar transparente → opaca | Transição suave ao scrollar 80px |
| Cursor customizado | Dot pequeno + follower maior, reagem ao hover de elementos |
| Smooth scroll | Lenis, sem travamentos, integrado ao GSAP ScrollTrigger |
| Reveals de texto | SplitText — chars ou lines subindo com máscara overflow hidden |
| Footer com headline grande | Última seção tem tipografia grande — "MACHADO PLATAFORMAS" no rodapé |

**O que NÃO reproduzir:**
| Elemento | Motivo |
|----------|--------|
| Tom casual/agência criativa | Machado é industrial/B2B — mais sério, mais técnico |
| Paleta monocromática preta | Usar navy dark + aço + azul primário (identidade Machado) |
| Conteúdo de portfólio digital | Seções de produtos físicos (guincho, caminhão) |
| Cursor invertendo texto | Pode confundir usuário industrial — cursor simples azul |

---

## 🏭 Referências de Design para Setor Industrial/Rodoviário

### Sites de Referência — Design Premium Industrial
| Site | O que observar |
|------|---------------|
| [liebherr.com](https://www.liebherr.com) | Maquinário pesado, fundo escuro, tipografia forte, vídeo hero |
| [caterpillar.com](https://www.caterpillar.com) | Autoridade de marca, fotos de produto dominando o layout |
| [mercedes-benz-trucks.com](https://www.mercedes-benz-trucks.com) | Produto em movimento, hero com vídeo, specs técnicas visuais |
| [scania.com](https://www.scania.com) | Dark theme, azul como acento, grid editorial para produtos |
| [randon.com.br](https://www.randon.com.br) | Referência nacional de implemento rodoviário |
| [guerra.com.br](https://www.guerra.com.br) | Fabricante de implemento no Brasil — ver estrutura de seções |

### Referências para Animações
| Site | O que observar |
|------|---------------|
| [Linear.app](https://linear.app) | Scroll suave, timing preciso, nada excessivo |
| [Framer.com](https://framer.com) | Animações de produto 3D/foto |
| [Stripe.com](https://stripe.com) | Gradientes animados, credibilidade visual |

---

## 🛠️ Referências Técnicas Completas

### GSAP — Documentação por Feature

| Feature | URL | Aplicação no projeto |
|---------|-----|---------------------|
| Core (to/from/fromTo) | gsap.com/docs/v3/GSAP | Base de todas as animações |
| ScrollTrigger | gsap.com/docs/v3/Plugins/ScrollTrigger | Revelação de seções por scroll |
| SplitText | gsap.com/docs/v3/Plugins/SplitText | Headline hero (Machado font) |
| CustomEase | gsap.com/docs/v3/Easing/CustomEase | Ease "machado" personalizado |
| Timeline | gsap.com/docs/v3/GSAP/Timeline | Loader screen + sequência hero |

### Lenis Smooth Scroll

```javascript
// Setup completo recomendado para o projeto
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

// Integração obrigatória com GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// Pausar Lenis em modais/overlays abertos
// lenis.stop() → lenis.start()
```

### SplitText — Animação da Headline Hero (Machado Font)

```javascript
/**
 * hero.js
 * Anima o título hero com a fonte Machado
 * Chars sobem de baixo com máscara (overflow: hidden no wrapper)
 */
export function init() {
  const title = document.querySelector('.hero-title');
  if (!title) return;

  // Split em chars
  const split = new SplitText(title, { type: 'chars, words' });

  // Wrap cada char em container overflow: hidden (cria máscara)
  split.chars.forEach(char => {
    const mask = document.createElement('span');
    mask.style.cssText = 'display: inline-block; overflow: hidden; vertical-align: top;';
    char.parentNode.insertBefore(mask, char);
    mask.appendChild(char);
  });

  // Timeline da animação
  const tl = gsap.timeline({ delay: 2.0 }); // após loader

  tl.from(split.chars, {
    yPercent: 110,
    opacity: 0,
    duration: 1.2,
    stagger: 0.025,
    ease: 'machado',
  });

  tl.from('.hero-subtitle', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'machado',
  }, '-=0.6');

  tl.from('.hero-ctas', {
    opacity: 0,
    y: 20,
    duration: 0.6,
    ease: 'machado',
  }, '-=0.4');
}
```

### Loading Screen — Sequência Completa

```javascript
/**
 * loader.js
 * Loading screen com contador % e saída suave
 * Retorna Promise que resolve quando o loader sai da tela
 */
export function initLoader() {
  return new Promise((resolve) => {
    const loader   = document.querySelector('#loader');
    const progress = document.querySelector('#loader-progress');
    if (!loader) { resolve(); return; }

    // Bloquear scroll durante loading
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline();

    // Fase 1: Contador 0% → 100% (1.8s)
    tl.to({ val: 0 }, {
      val: 100,
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: function() {
        if (progress) progress.textContent = Math.round(this.targets()[0].val) + '%';
      },
    });

    // Fase 2: Loader sobe e sai (0.9s)
    tl.to(loader, {
      yPercent: -100,
      duration: 0.9,
      ease: 'machado',
      onComplete: () => {
        loader.style.display = 'none';
        document.body.style.overflow = '';
        resolve(); // ← desbloqueia o main.js
      },
    });
  });
}
```

### Marquee CSS (se usado para especialidades)

```css
/* HTML: duplicar o conteúdo para loop perfeito */
.marquee-section {
  border-top: 1px solid var(--color-border-light);
  border-bottom: 1px solid var(--color-border-light);
  overflow: hidden;
  padding: var(--space-5) 0;
}

.marquee-track {
  display: flex;
  gap: var(--space-8);
  width: max-content;
  animation: marquee-scroll 30s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

.marquee-item {
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-xl);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-steel);
  white-space: nowrap;
}

.marquee-separator {
  color: var(--color-primary);
  font-weight: var(--weight-bold);
}

@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

### Efeito Magnético em Botões

```javascript
/**
 * magnetic.js
 * Botões com atração magnética ao hover — sutil, não exagerado
 * Usar em: CTAs principais, links do produto
 */
export function init() {
  const magnets = document.querySelectorAll('[data-magnetic]');
  if (!magnets.length) return;

  magnets.forEach(magnet => {
    const strength = parseFloat(magnet.dataset.magnetic) || 0.25;

    magnet.addEventListener('mousemove', (e) => {
      const rect = magnet.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top  - rect.height / 2;

      gsap.to(magnet, {
        x: x * strength,
        y: y * strength,
        duration: 0.5,
        ease: 'power2.out',
      });
    });

    magnet.addEventListener('mouseleave', () => {
      gsap.to(magnet, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'elastic.out(1, 0.4)',
      });
    });
  });
}
```

### Cursor Customizado

```javascript
/**
 * cursor.js
 * Cursor pequeno (dot azul) + follower (ring maior)
 * Desabilitado automaticamente em touch devices
 */
export function init() {
  // Não inicializar em touch
  if (window.matchMedia('(hover: none)').matches) return;

  const dot      = document.querySelector('#cursor');
  const follower = document.querySelector('#cursor-follower');
  if (!dot || !follower) return;

  // Esconder cursor nativo
  document.documentElement.style.cursor = 'none';

  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot segue imediatamente
    gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.1 });

    // Follower com delay
    gsap.to(follower, { x: mouseX, y: mouseY, duration: 0.5, ease: 'power2.out' });
  });

  // Estados: hover em elementos interativos
  const hoverTargets = document.querySelectorAll('a, button, [data-magnetic]');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('is-hovering');
      follower.classList.add('is-hovering');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('is-hovering');
      follower.classList.remove('is-hovering');
    });
  });
}
```

```css
/* animations.css — Cursor */
#cursor,
#cursor-follower {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
}

#cursor {
  width: 10px;
  height: 10px;
  background: var(--color-primary-light);
  border-radius: 50%;
}

#cursor-follower {
  width: 36px;
  height: 36px;
  border: 1.5px solid var(--color-primary-light);
  border-radius: 50%;
  opacity: 0.6;
}

#cursor.is-hovering {
  transform: translate(-50%, -50%) scale(2.5);
  background: transparent;
  border: 1.5px solid var(--color-primary-light);
}

#cursor-follower.is-hovering {
  opacity: 0;
}

@media (hover: none) {
  #cursor, #cursor-follower { display: none; }
}
```

### Counters de Prova Social

```javascript
/**
 * counters.js
 * Anima números da seção de prova social ao entrar na viewport
 */
export function init() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  counters.forEach(counter => {
    const target = parseInt(counter.dataset.count, 10);
    const suffix = counter.dataset.suffix || '';

    gsap.to(counter, {
      textContent: target,
      duration: 2.5,
      ease: 'power2.out',
      snap: { textContent: 1 },
      onUpdate: function() {
        counter.textContent = Math.round(this.targets()[0].textContent) + suffix;
      },
      scrollTrigger: {
        trigger: counter,
        start: 'top 80%',
        once: true,  // anima apenas uma vez
      },
    });
  });
}
```

---

## 📚 Recursos de Aprendizado

### GSAP
| Recurso | URL |
|---------|-----|
| Documentação oficial | gsap.com/docs |
| ScrollTrigger demos | gsap.com/demos |
| Fórum da comunidade | gsap.com/community |
| Codepen GSAP | codepen.io/GreenSock |

### Referências Gerais
| Recurso | URL | Para quê |
|---------|-----|---------|
| Codrops | tympanus.net/codrops | Efeitos visuais avançados com código |
| Awwwards | awwwards.com | Inspiração de sites premiados |
| CSS-Tricks | css-tricks.com | Referência CSS avançada |
| web.dev | web.dev | Performance e Core Web Vitals |

---

## 🖼️ Assets Fornecidos pelo Cliente

| Asset | Arquivo | Status | Localização |
|-------|---------|--------|-------------|
| Logo | `logosvg_1.svg` | ✅ Recebido | `assets/images/logo/logo.svg` |
| Fonte Display | `METAG___.TTF` | ✅ Recebido | `assets/fonts/METAG___.TTF` |
| Paleta de Cores | `1777485881413_image.png` | ✅ Analisado | Documentado em DESIGN.md |
| Mockup Hero | `1777485900063_image.png` | ✅ Analisado | Referência em `assets/referencias/` |
| Fotos de Produtos | — | ⏳ Aguardando | `assets/images/produtos/` |
| Fotos Galeria | — | ⏳ Aguardando | `assets/images/galeria/` |
| Foto Fábrica/Sobre | — | ⏳ Aguardando | `assets/images/sobre/` |
| Vídeo Hero | — | ⏳ Aguardando | `assets/videos/hero-reel.mp4` |
| Fotos Depoimentos | — | ⏳ Aguardando | `assets/images/depoimentos/` |
| Textos finais | — | ⏳ Aguardando | Substituir placeholders |
| CNPJ / Dados legais | — | ⏳ Aguardando | Footer |
| Link WhatsApp | — | ⏳ Aguardando | Todos os CTAs de WhatsApp |
| Google Maps embed | — | ⏳ Aguardando | Seção Contato |

---

## 🔤 Fontes Utilizadas

### Proprietária (display)
```css
/* Machado font — uso exclusivo em headlines */
@font-face {
  font-family: 'Machado';
  src: url('../assets/fonts/METAG___.TTF') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

### Google Fonts (headings + body)
```html
<!-- Barlow Condensed: headings de seção, labels, botões -->
<!-- Barlow: body text, parágrafos -->
<!-- DM Mono: números de stats, numeração de cards -->
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Justificativa das escolhas
| Fonte | Por quê |
|-------|---------|
| Machado (METAG) | Identidade proprietária — só usada no display/hero |
| Barlow Condensed | Mesma energia industrial/condensada que Machado, mas mais legível em tamanhos menores |
| Barlow | Família do Condensed — consistência, 300-600 para hierarquia de body |
| DM Mono | Números técnicos (estatísticas, capacidade de carga, specs) pedem tipografia monospace |

---

## 📋 Checklist de Assets Antes de Iniciar Implementação

Antes de criar o HTML/CSS, confirmar com o cliente:

- [ ] Logo SVG com versão dark (fundo claro) necessária?
- [ ] Vídeo ou foto estática no hero? (Mockup mostra foto)
- [ ] Quantos produtos no grid? (Confirmado: 4)
- [ ] Quantos depoimentos? (mínimo 3 para slider)
- [ ] Endereço completo para o Maps e footer
- [ ] CNPJ e razão social para o footer
- [ ] Número WhatsApp (formato: 5548XXXXXXXXX)
- [ ] E-mail para receber formulários
- [ ] Links das redes sociais (Instagram, Facebook, LinkedIn?)
- [ ] Textos finais de cada seção ou trabalhar com copywriter?
- [ ] Specs técnicas reais de cada produto (carga máxima, dimensões)

---

*Este arquivo é um documento vivo. Adicionar referências e snippets conforme o projeto evolui.*