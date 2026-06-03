# Animações e Interações — Machado Plataformas

## Bibliotecas Utilizadas

| Biblioteca | Versão | CDN | Responsabilidade |
|-----------|--------|-----|-----------------|
| **GSAP** | 3.12.5 | cdnjs.cloudflare.com | Motor principal de animação |
| **ScrollTrigger** | 3.12.5 | cdnjs.cloudflare.com | Animações disparadas por scroll |
| **SplitText** | 3.12.5 | cdnjs.cloudflare.com | Divisão de texto por linhas/palavras |
| **CustomEase** | 3.12.5 | cdnjs.cloudflare.com | Curvas de easing customizadas |
| **Lenis** | 1.1.14 | unpkg.com | Smooth scroll (apenas desktop) |
| **Swiper** | 11.x | cdn.jsdelivr.net | Carrosséis (produtos, clientes) |
| **MapLibre GL** | via CDN | unpkg.com | Mapa interativo (apenas sobre.html) |

### Easings Customizados (definidos em `js/gsap-setup.js`)

| Nome | Curva | Uso |
|------|-------|-----|
| `machado` | `cubic-bezier(0.16, 1, 0.3, 1)` | Easing principal — 90% das animações |
| `snap` | `cubic-bezier(0.87, 0, 0.13, 1)` | Transições rápidas e precisas |
| `wipe` | `cubic-bezier(0.76, 0, 0.24, 1)` | Efeitos de wipe/reveal |

---

## Mapa de Animações por Seção

### Hero (`js/animations/hero.js`)

**Página:** index.html

| Efeito | Alvo | Tipo | Detalhes |
|--------|------|------|----------|
| Scale-up de imagem | `.hero-media` | GSAP | scale 1.04 → 1, 1.2s, ease machado |
| Text reveal | `[data-hero-reveal]` | CSS Keyframes | clip-path wipe + fade, staggered delays |
| CTAs fade | `.hero-ctas` | CSS Keyframes | `heroFade`, 0.7s delay |
| Scroll indicator pulse | `.hero-scroll__line` | GSAP | scaleY 1 → 0.3, yoyo infinito, 1.2s |
| Spotlight interativo | `.hero-stage` | JS + CSS | Mouse tracking → `--mouse-x/--mouse-y` vars |

> O spotlight só funciona em desktop com mouse (`hover: hover and pointer: fine and min-width: 768px`).

### Navbar (`js/animations/navbar.js`)

**Página:** Todas

| Efeito | Alvo | Tipo | Detalhes |
|--------|------|------|----------|
| Menu open | `.navbar-panel__inner` | GSAP Timeline | clip-path reveal + stagger de links, cards, meta |
| Menu close | `.navbar-panel__inner` | GSAP Timeline | clip-path collapse, 0.28s |
| Indicador | `.nav-indicator` | GSAP | Segue link ativo, rotação 180° |
| Theme switch | `#navbar` | JS (rAF) | Alterna light/dark conforme seção sob a navbar |
| Height transition | `.navbar-inner` | CSS | 80px → 64px ao scrollar |

### Scroll Reveals (`js/animations/scroll-triggers.js`)

**Página:** Todas

O motor principal de animação de entrada. Todos os elementos com `[data-animate]` são animados ao entrarem no viewport (trigger em `top 85%`).

| Tipo | Atributo | Transform Inicial | Animação | Duração |
|------|----------|-------------------|----------|---------|
| Fade up | `data-animate="fade-up"` | opacity: 0, translateY(60px) | opacity: 1, y: 0 | 1s |
| Fade in | `data-animate="fade-in"` | opacity: 0 | opacity: 1 | 0.9s |
| Slide left | `data-animate="slide-left"` | opacity: 0, translateX(-60px) | opacity: 1, x: 0 | 1s |
| Slide right | `data-animate="slide-right"` | opacity: 0, translateX(60px) | opacity: 1, x: 0 | 1s |
| Scale in | `data-animate="scale-in"` | opacity: 0, scale(0.92) | opacity: 1, scale: 1 | 1.1s |
| Lines | `data-animate="lines"` | yPercent: 110 por linha | yPercent: 0, stagger 0.08s | 1s |
| Section heading | `data-animate="section-heading"` | Composto (ver abaixo) | Timeline | 0.9s |

**Section Heading (animação composta):**
1. Linha (`__rule`) escala de 0 → 1 horizontalmente
2. Quadrado (`__square`) desliza ao longo da linha + rotação 180°
3. Textos (meta, título, subtítulo) fazem fade-up com stagger de 0.1s

**Delay customizado:** Qualquer elemento pode usar `data-delay="0.2"` para atrasar sua animação.

**Toggle actions:** `play none none reverse` — a animação reverte ao scrollar para cima.

### Diferenciais (`js/animations/diferenciais.js`)

**Página:** index.html

| Efeito | Modo | Detalhes |
|--------|------|---------|
| Pinned scroll | Desktop (≥1024px) | Seção fixa no viewport, scroll controla step ativo |
| Indicador animado | Ambos | Desliza entre steps com rotação incremental de 180° |
| Step highlight | Ambos | Step ativo em opacity 1, inativos em 0.42 |
| Título/kicker | Ambos | Fade-up na entrada (once) |
| Image swap | Desktop | Imagem muda conforme step ativo |

**Mobile:** Sem pinning. Steps são relativos no scroll natural. Usa hysteresis de 90px para evitar flickering.

### Produtos Showcase (`js/animations/produtos-tabs.js`)

**Página:** index.html

| Efeito | Modo | Detalhes |
|--------|------|---------|
| Pinned scroll | Desktop (≥1024px) | Seção fixa, scroll alterna entre panels |
| Panel transition | Ambos | autoAlpha 0.8 + scale 0.97 → 1, 0.9s |
| Text swap | Ambos | Fade-out 0.16s → update DOM → fade-in 0.36s stagger |
| Spotlight parallax | Desktop | Mouse move → `--mouse-x/--mouse-y` + figure parallax ±12px/±6px |
| Rail entrance | Desktop | Items fazem fade-up staggered ao abrir seção |
| Panel entrance | Mobile | Fade-up individual por ScrollTrigger (start: top 58%) |

### Stats / KPIs (`js/animations/stats.js`)

**Página:** index.html, clientes.html

| Efeito | Alvo | Detalhes |
|--------|------|---------|
| Card entrance | `[data-stats-card]` | Fade-up, 0.85s, com delay individual |
| Label sub-entrance | `.stat-label` | Fade-up menor, offset 0.28s do card |
| Counter | `[data-count]` | Objeto GSAP tween 0 → valor, 1.8s, IntersectionObserver |

### Counters Genéricos (`js/animations/counters.js`)

**Página:** Qualquer (fora de stats)

Elementos `[data-count]` que não estejam dentro de `[data-stats-card]`. Contagem de 0 ao valor em 2.5s.

### Marquee / Ticker (`js/animations/marquee.js`)

**Página:** sobre.html, produtos.html, clientes.html, credito.html (heros de subpáginas), clientes.html (lista de estados)

| Efeito | Detalhes |
|--------|---------|
| Scroll infinito | x: 0 → x: -metade, linear, loop infinito |
| Velocidade | `distance / 60 / speed`, mínimo 12s |
| Pausa automática | Para quando fora do viewport (ScrollTrigger) |

### Magnetic (`js/animations/magnetic.js`)

**Página:** Todas (desktop only)

| Efeito | Alvo | Detalhes |
|--------|------|---------|
| Atração ao cursor | `[data-magnetic]` | Move em direção ao mouse, strength 0.25 (padrão) |
| Retorno elástico | `[data-magnetic]` | Volta com `elastic.out(1, 0.4)`, 0.8s |

### Button Swap (`js/animations/button-swap.js`)

**Página:** Todas (desktop only)

| Efeito | Alvo | Detalhes |
|--------|------|---------|
| Troca label/ícone | `.btn--split` | No hover: label desliza para direita, ícone para esquerda, 0.34s |

### Sobre Gallery (`js/animations/sobre-gallery.js`)

**Página:** sobre.html

| Efeito | Detalhes |
|--------|---------|
| Slide transition | Fade in + scale 1.04 → 1, 0.7s |
| Autoplay | Avança a cada 3.6s (gsap.delayedCall) |
| Entrance | Tilted entrance (rotate -1.2° → 0), 0.9s |

### YouTube Facade (`js/animations/youtube-facade.js`)

**Página:** Onde houver `[data-yt]`

| Efeito | Detalhes |
|--------|---------|
| Lazy-load vídeo preview | IntersectionObserver com rootMargin 200px |
| Click-to-embed | Remove facade, injeta iframe YouTube (nocookie) |

---

## Keyframes CSS (definidos em `css/animations.css`)

| Nome | Uso | Tipo |
|------|-----|------|
| `heroRv` | Text reveal do hero | clip-path wipe |
| `heroFade` | Fade dos CTAs do hero | opacity |
| `hero-btn-shimmer` | Shimmer em botões do hero | background-position, 6s loop |
| `status-pulse` | Indicador de status (navbar/footer) | scale + opacity pulse |
| `machado-map-pulse` | Marcador do mapa | scale + opacity ring |
| `kpi-border-pulse` | Borda pulsante em KPIs | opacity, 2.5s loop |
| `yt-pulse` | Thumbnail YouTube | scale pulse, 1.8s |
| `page-hero-bg-in` | Background do hero de subpáginas | clip-path reveal |
| `page-hero-deco-in` | Decoração do hero | opacity + translate |
| `page-hero-scan` | Linha de scan no hero | translateY loop |
| `page-hero-ticker` | Ticker text loop | translateX infinito |
| `sobre-corner-draw` | Cantos decorativos | scale 0 → 1 |
| `sobre-rule-draw` | Linhas decorativas | scaleX 0 → 1 |
| `subpage-fade-up` | Fade up em subpáginas | opacity + translateY |
| `subpage-rule-draw` | Linhas em subpáginas | scaleX |
| `subpage-title-rise` | Título de subpáginas | translateY + opacity |
| `financiamento-panel-line` | Linha em cards de financiamento | scaleX, 2s loop |
| `footer-shimmer` | Assinatura do desenvolvedor | background-position sweep, 4s |

---

## Cuidados de Performance

### Estratégia de Carregamento
O `main.js` divide os módulos em dois grupos:

1. **Críticos** (carregam imediatamente):
   - Lenis, Navbar, Hero, Stats
   - São visíveis acima do fold

2. **Deferred** (carregam via `requestIdleCallback` com timeout de 300ms):
   - ScrollTriggers, Marquee, Diferenciais, Counters, Magnetic, ProdutosTabs, SobreGallery, ButtonSwap, YoutubeFacade
   - Estão abaixo do fold ou são interações secundárias

### GPU e Compositing
- Todas as animações usam apenas `transform` e `opacity` (propriedades GPU-accelerated)
- `will-change: opacity, transform` aplicado via `[data-animate]` no CSS
- Nenhuma animação causa layout shift ou repaint

### Batching de Reads
- Leituras de DOM (offsetWidth, getBoundingClientRect) são feitas antes da criação de animações
- Updates de posição (spotlight, magnetic) usam `requestAnimationFrame` para agrupar

### Event Listeners
- Todos os listeners de scroll/resize/pointermove usam `{ passive: true }`
- Listeners one-time usam `{ once: true }`
- Cleanup handlers em `matchMedia` para evitar memory leaks

### Pausa Inteligente
- Marquee pausa quando fora do viewport (ScrollTrigger play/pause)
- Lenis é desativado em touch devices
- Magnetic e ButtonSwap são desativados em touch devices
- IntersectionObserver substitui ScrollTrigger onde possível (stats counters)

### Reduced Motion
Quando `prefers-reduced-motion: reduce` está ativo:
- Todos os `[data-animate]` vão direto ao estado final (opacity: 1, transform: none)
- Todas as transições CSS são reduzidas a 10ms
- `will-change` é removido
- Marquee é completamente desativado
- Gallery autoplay é desativado
- Animações GSAP verificam `matchMedia('(prefers-reduced-motion: reduce)')` antes de executar

---

## Arquivos Responsáveis por Animações

### JavaScript (lógica)

| Arquivo | LOC estimadas | Complexidade |
|---------|---------------|-------------|
| `js/main.js` | ~40 | Baixa — orquestração |
| `js/gsap-setup.js` | ~20 | Baixa — configuração |
| `js/lenis.js` | ~30 | Baixa — inicialização |
| `js/animations/hero.js` | ~70 | Média — spotlight + reveals |
| `js/animations/navbar.js` | ~200 | Alta — menu + theme + indicator |
| `js/animations/scroll-triggers.js` | ~150 | Alta — 7 tipos de animação |
| `js/animations/produtos-tabs.js` | ~250 | Alta — pinned + parallax + panels |
| `js/animations/diferenciais.js` | ~180 | Alta — pinned + steps |
| `js/animations/stats.js` | ~100 | Média — cards + counters |
| `js/animations/counters.js` | ~40 | Baixa — counter simples |
| `js/animations/marquee.js` | ~50 | Baixa — loop infinito |
| `js/animations/magnetic.js` | ~50 | Baixa — mouse follow |
| `js/animations/button-swap.js` | ~60 | Baixa — hover swap |
| `js/animations/sobre-gallery.js` | ~80 | Média — slideshow + autoplay |
| `js/animations/youtube-facade.js` | ~40 | Baixa — lazy-load |

### CSS (keyframes e estados)

| Arquivo | Conteúdo |
|---------|----------|
| `css/animations.css` | Todos os @keyframes + estados iniciais de `[data-animate]` + reduced motion |
| `css/components/hero.css` | Keyframes `heroRv`, `heroFade`, `hero-btn-shimmer` |
| `css/components/subpages.css` | Keyframes `page-hero-*`, `subpage-*` |
| `css/components/sobre.css` | Keyframes `sobre-corner-draw`, `sobre-rule-draw` |
| `css/components/financiamento.css` | Keyframes `financiamento-panel-line` |
| `css/components/footer.css` | Keyframes `footer-shimmer` |
| `css/components/social-proof.css` | Keyframes `kpi-border-pulse` |
| `css/components/localizacao.css` | Keyframes `machado-map-pulse` |
