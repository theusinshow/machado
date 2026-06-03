# Mapa do Projeto — Machado Plataformas

## Arquitetura

O projeto segue uma arquitetura **estática multi-página (MPA)** sem framework. Cada página é um arquivo HTML independente que compartilha os mesmos assets CSS e JS. Não há roteamento client-side, SPA, SSR ou build pipeline.

```
┌─────────────────────────────────────────────────────┐
│                    BROWSER                          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  HTML Pages (5)                                     │
│  ┌───────┐ ┌───────┐ ┌──────────┐ ┌────────┐ ┌───┐ │
│  │ index │ │ sobre │ │ produtos │ │clientes│ │crd│ │
│  └───┬───┘ └───┬───┘ └────┬─────┘ └───┬────┘ └─┬─┘ │
│      │         │          │            │        │   │
│      └─────────┴────┬─────┴────────────┴────────┘   │
│                     │                               │
│  ┌──────────────────┴──────────────────────────┐    │
│  │              CSS Layer                      │    │
│  │  critical.css (inline) + bundle.css (async) │    │
│  │  mobile.css (media queries)                 │    │
│  └──────────────────┬──────────────────────────┘    │
│                     │                               │
│  ┌──────────────────┴──────────────────────────┐    │
│  │              JS Layer                       │    │
│  │  CDN: Lenis, GSAP, ScrollTrigger, SplitText │    │
│  │  Local: gsap-setup.js → main.js             │    │
│  │         → animations.bundle.js              │    │
│  └──────────────────┬──────────────────────────┘    │
│                     │                               │
│  ┌──────────────────┴──────────────────────────┐    │
│  │              Assets                         │    │
│  │  images/ (WebP + PNG fallback)              │    │
│  │  videos/ (MP4)                              │    │
│  │  fonts/  (WOFF2, OTF, TTF)                  │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  Serviços Externos:                                 │
│  • WhatsApp API (wa.me) — geração de leads          │
│  • MapLibre GL — mapa interativo (sobre.html)       │
│  • Adobe Fonts (Typekit) — Aktiv Grotesk            │
│  • YouTube (nocookie embed) — vídeo institucional   │
│  • Swiper CDN — carrosséis (produtos, clientes)     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Pastas Principais

### `/` (raiz)
Os 5 HTMLs ficam na raiz para URLs limpas (ex: `site.com/produtos.html`). Inclui também `robots.txt`, `sitemap.xml` e `package.json`.

### `css/`
Camada de estilos dividida em tokens, reset, tipografia, layout, animações e componentes. O `bundle.css` é a concatenação de tudo (carregado async). O `critical.css` é inlined no `<head>` para evitar flash.

### `css/components/`
Um arquivo CSS por componente visual. Cada arquivo é autocontido e usa variáveis de `variables.css`.

### `js/`
Entry point (`main.js`) que inicializa módulos de animação com estratégia de carregamento priorizado. Módulos críticos (hero, navbar) carregam imediatamente; o restante usa `requestIdleCallback`.

### `js/animations/`
12 módulos de animação independentes. Cada um é responsável por uma seção ou comportamento específico.

### `assets/images/`
Organizado por contexto (hero, produtos, clientes, sobre, navbar, logo). Cada imagem tem versão WebP (moderna) e PNG/JPG (fallback).

### `assets/fonts/`
Fontes customizadas: Machado (display) e Horizon (títulos). Aktiv Grotesk vem via Adobe Fonts CDN.

## Arquivos Importantes

### HTML

| Arquivo | Responsabilidade |
|---------|-----------------|
| `index.html` | Home — hero, diferenciais, produtos showcase (tabs), depoimentos, social proof, CTA |
| `sobre.html` | Sobre — história, fábrica, specbar, mapa, diferenciais, missão/visão/valores |
| `produtos.html` | Produtos — 3 linhas (leve/média/pesada) com carrossel Swiper + lightbox + opcionais |
| `clientes.html` | Clientes — galerias de ação e entrega (Swiper), ticker de estados, depoimentos |
| `credito.html` | Crédito — cards BNDES/FINAME/Sicredi, timeline, pagamento direto |

### CSS

| Arquivo | Responsabilidade |
|---------|-----------------|
| `css/variables.css` | **Fonte da verdade** para todos os tokens: cores, espaçamentos, tipografia, sombras, durações, breakpoints |
| `css/reset.css` | Reset global + estilos base (box-sizing, font-smoothing, focus-visible, skip-link) |
| `css/typography.css` | Famílias, escala de tamanhos, classes utilitárias (`.eyebrow`, `.lead`, `.mono`, `.section-title`) |
| `css/layout.css` | `.container`, `.section`, `.grid--2/3/4`, utilitários flex, cursor customizado, WhatsApp float, botões |
| `css/animations.css` | Todos os `@keyframes` + estados iniciais de `[data-animate]` + `prefers-reduced-motion` |
| `css/mobile.css` | Overrides para breakpoints ≤479px, ≤767px, ≤1023px |
| `css/critical.css` | Subset crítico inlined no `<head>` (navbar, hero, layout base) |
| `css/bundle.css` | Concatenação completa — carregado async via `<link rel="stylesheet" media="print" onload>` |
| `css/components/hero.css` | Hero section: layout, reveal animations, spotlight, scroll indicator |
| `css/components/navbar.css` | Navbar: estados (scrolled, open, light), painel expandível, cards, indicador |
| `css/components/footer.css` | Footer: grid, links, social, copyright, assinatura dev |
| `css/components/produtos.css` | Arsenal: layout alternado, specs panel, carrossel, lightbox, opcionais |
| `css/components/depoimentos.css` | Cards de depoimento: featured state, estrelas, avatar |
| `css/components/diferenciais.css` | Cards de pilares: indicador animado, pinned scroll desktop |
| `css/components/social-proof.css` | KPIs: cards de estatísticas, contadores animados |
| `css/components/sobre.css` | Sobre: layout editorial, specbar, pull quote, image stack |
| `css/components/localizacao.css` | Mapa MapLibre, marcador pulsante, popup |
| `css/components/financiamento.css` | Cards de financiamento: tiers, timeline, steps |
| `css/components/cta-interstitial.css` | Seção CTA final (presente em todas as páginas) |
| `css/components/subpages.css` | Estilos comuns às subpáginas: hero de subpágina, ticker, divider |

### JavaScript

| Arquivo | Responsabilidade |
|---------|-----------------|
| `js/main.js` | **Orquestrador** — inicializa todos os módulos com priorização (critical vs deferred) |
| `js/gsap-setup.js` | Registra plugins GSAP + define easings customizados (`machado`, `snap`, `wipe`) |
| `js/lenis.js` | Smooth scroll — desativado em touch, integrado com ScrollTrigger |
| `js/animations.bundle.js` | Bundle compilado de todos os módulos de animação |
| `js/animations/hero.js` | Animações do hero: scale-up da imagem, spotlight mouse tracking, scroll pulse |
| `js/animations/navbar.js` | Menu mobile: open/close com clip-path, theme switching light/dark por scroll |
| `js/animations/scroll-triggers.js` | **Motor principal** — 7 tipos de animação por scroll (fade-up, fade-in, slide-left/right, scale-in, lines, section-heading) |
| `js/animations/produtos-tabs.js` | Showcase de produtos: pinned scroll desktop, panel switching, spotlight parallax |
| `js/animations/diferenciais.js` | Pilares: indicador animado com rotação, step-through por scroll (pinned desktop / relative mobile) |
| `js/animations/stats.js` | Cards de KPI: entrada fade + contagem numérica via IntersectionObserver |
| `js/animations/counters.js` | Contadores genéricos para elementos `[data-count]` fora do stats |
| `js/animations/marquee.js` | Ticker horizontal infinito (usado nos heros de subpáginas e lista de estados) |
| `js/animations/magnetic.js` | Efeito magnético em botões: segue cursor + retorno elástico |
| `js/animations/button-swap.js` | Microinteração: label e ícone trocam de posição no hover |
| `js/animations/sobre-gallery.js` | Galeria de fotos da fábrica com autoplay e dots |
| `js/animations/youtube-facade.js` | Lazy-load de vídeo: facade + clique injeta iframe YouTube |

## Responsabilidade de Cada Módulo

### Módulos de Infraestrutura
- **`main.js`** — Decide o que carregar e quando. Usa `requestIdleCallback` para módulos não-críticos.
- **`gsap-setup.js`** — Configuração pura, sem efeitos visuais. Registra plugins e cria easings.
- **`lenis.js`** — Smooth scroll apenas no desktop. Sincroniza posição com ScrollTrigger.

### Módulos de Animação por Seção
- **`hero.js`** — Apenas index.html. Scale-up da imagem, spotlight interativo, scroll indicator.
- **`navbar.js`** — Todas as páginas. Menu mobile, detecção de seções claras/escuras.
- **`scroll-triggers.js`** — Todas as páginas. Elementos com `[data-animate]` animam ao entrar no viewport.
- **`produtos-tabs.js`** — Apenas index.html. Showcase com pinned scroll e parallax.
- **`diferenciais.js`** — Apenas index.html. Pilares com pinned scroll e indicador.
- **`stats.js`** — index.html e clientes.html. Cards de KPI com contagem.
- **`sobre-gallery.js`** — Apenas sobre.html. Galeria com autoplay.
- **`youtube-facade.js`** — Onde houver `[data-yt]`. Facade para lazy-load de YouTube.

### Módulos de Interação Global
- **`marquee.js`** — Tickers infinitos (heros de subpáginas, lista de estados).
- **`magnetic.js`** — Botões com `[data-magnetic]`. Efeito de atração ao cursor.
- **`button-swap.js`** — Botões `.btn--split`. Troca label/ícone no hover.
- **`counters.js`** — Elementos `[data-count]` genéricos.

## Fluxo Geral da Aplicação

```
1. Browser requisita HTML
   │
2. HTML carrega:
   ├── <style> critical.css (inline, render-blocking)
   ├── <link> bundle.css (async, non-blocking)
   ├── <link> fontes (Adobe Fonts + Google Fonts)
   │
3. DOM parsed → Scripts carregam (defer):
   ├── Lenis (CDN)
   ├── GSAP + plugins (CDN)
   ├── gsap-setup.js (registra plugins + easings)
   └── main.js (type="module")
       │
4. main.js inicializa:
   ├── IMEDIATO (acima do fold):
   │   ├── Lenis (smooth scroll)
   │   ├── Navbar (menu + theme detection)
   │   ├── Hero (reveal + spotlight)
   │   └── Stats (KPIs visíveis)
   │
   └── DEFERRED (requestIdleCallback):
       ├── ScrollTriggers (reveals gerais)
       ├── Marquee (tickers)
       ├── Diferenciais (pilares)
       ├── Counters (números)
       ├── Magnetic (botões)
       ├── ProdutosTabs (showcase)
       ├── SobreGallery (galeria)
       ├── ButtonSwap (microinteração)
       └── YoutubeFacade (lazy video)
       │
5. Usuário navega:
   ├── ScrollTrigger detecta posição → dispara animações
   ├── IntersectionObserver → lazy-load de vídeos/contadores
   ├── Lenis interpola scroll → experiência suave
   └── Eventos de pointer → spotlight, magnético, parallax
       │
6. Conversão:
   └── CTA WhatsApp (wa.me) → mensagem pré-preenchida
```

### Fluxo de Navegação entre Páginas

```
                    ┌──────────┐
                    │  index   │
                    │  (Home)  │
                    └────┬─────┘
                         │
         ┌───────┬───────┼───────┬────────┐
         ▼       ▼       ▼       ▼        ▼
    ┌────────┐┌───────┐┌──────┐┌───────┐┌───────┐
    │produtos││clientes││sobre ││credito││  wa.  │
    │        ││       ││      ││       ││  me   │
    └────────┘└───────┘└──────┘└───────┘└───────┘
         │       │       │       │
         └───────┴───────┴───────┘
         (navbar interliga todas)
```

Todas as páginas se interligam via navbar. Toda página tem CTA direcionando para WhatsApp.
