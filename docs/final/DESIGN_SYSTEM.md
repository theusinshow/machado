# Design System — Machado Plataformas

> Fonte da verdade: `css/variables.css` (tokens) e `css/typography.css` (tipografia).

## Identidade Visual

**Personalidade da marca:** Autoridade, Precisão, Presença.
Estética industrial premium — navy escuro + aço + azul elétrico. A tipografia pesada reflete o peso e a solidez dos produtos fabricados.

---

## Cores

### Fundos

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg` | `#1C2430` | Fundo primário (dark navy) |
| `--color-bg-mid` | `#2F3B4A` | Fundo intermediário |
| `--color-bg-light` | `#4A5665` | Fundo claro (dentro do dark theme) |
| `--color-footer-bg` | `#0F1823` | Fundo do footer (mais escuro) |
| `--color-surface` | `#F2F4F6` | Superfícies claras (seções light) |
| `--color-black` | `#000000` | Preto absoluto (hero bg) |
| `--color-white` | `#FFFFFF` | Branco absoluto |

### Primárias (Azuis)

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-primary` | `#1B4D84` | Azul primário (botões, acentos) |
| `--color-primary-light` | `#5B9BD5` | Azul claro (CTAs, links, focus) |
| `--color-primary-muted` | `#8FB4D4` | Azul suave (texto secundário em dark) |
| `--color-navy` | `#1E3A5F` | Navy (variação) |
| `--color-navy-dark` | `#1A2E46` | Navy escuro |

### Texto

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-text` | `#F2F4F6` | Texto principal (sobre fundo escuro) |
| `--color-text-muted` | `#A7B0BA` | Texto secundário |
| `--color-steel` | `#A7B0BA` | Alias para muted (steel tone) |
| `--color-text-dark` | `#1C2430` | Texto sobre fundos claros |

### Utilitárias

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-whatsapp` | `#25D366` | Verde WhatsApp (CTAs de conversão) |
| `--color-star` | `#FFB800` | Estrelas de avaliação |
| `--color-error` | `#E05A5A` | Erros/alertas |
| `--color-border` | `#2F3B4A` | Bordas no dark theme |
| `--color-border-light` | `#4A5665` | Bordas mais claras |

### Semi-transparentes (seleção)

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-overlay` | `rgba(28, 36, 48, 0.85)` | Overlay escuro |
| `--color-primary-soft` | `rgba(91, 155, 213, 0.08)` | Hover sutil |
| `--color-primary-glow` | `rgba(91, 155, 213, 0.25)` | Glow em botões |
| `--color-white-muted` | `rgba(255, 255, 255, 0.7)` | Texto branco suave |
| `--color-navbar-dark` | `rgba(0, 0, 0, 0.78)` | Fundo navbar |
| `--color-navbar-panel` | `#333333` | Fundo do painel do menu |

---

## Tipografia

### Famílias

| Token | Família | Uso |
|-------|---------|-----|
| `--font-display` | `'Machado'` | Título do hero — fonte exclusiva da marca |
| `--font-titles` | `'Horizon'` | Títulos de seção (h2, `.section-title`) |
| `--font-heading` | `'aktiv-grotesk'` | Headings e corpo (fallback) |
| `--font-body` | `'aktiv-grotesk'` | Texto corrido |
| `--font-mono` | `'geist-mono'` | Labels técnicos, eyebrows, dados |

### Pesos

| Token | Valor |
|-------|-------|
| `--weight-light` | 300 |
| `--weight-regular` | 400 |
| `--weight-medium` | 500 |
| `--weight-semibold` | 600 |
| `--weight-bold` | 700 |

### Escala de Tamanhos

| Token | Valor | Pixels |
|-------|-------|--------|
| `--text-xs` | `0.75rem` | 12px |
| `--text-sm` | `0.875rem` | 14px |
| `--text-base` | `1rem` | 16px |
| `--text-lg` | `1.125rem` | 18px |
| `--text-xl` | `1.25rem` | 20px |
| `--text-2xl` | `1.5rem` | 24px |
| `--text-3xl` | `1.875rem` | 30px |
| `--text-4xl` | `2.25rem` | 36px |
| `--text-5xl` | `3rem` | 48px |
| `--text-6xl` | `3.75rem` | 60px |
| `--text-hero` | `6rem` | 96px |
| `--text-display` | `8rem` | 128px |

### Classes Tipográficas

| Classe | Fonte | Tamanho | Comportamento |
|--------|-------|---------|---------------|
| `.hero-title` | Machado | `--text-display` (8rem) | Uppercase, line-height 0.92 |
| `.section-title` | Horizon | `--text-5xl` (3rem) | Uppercase, weight 700, tracking -0.02em |
| `.eyebrow` | Geist Mono | `--text-xs` (0.75rem) | Uppercase, tracking 0.2em, prefixo "/ " |
| `.lead` | Aktiv Grotesk | `--text-lg` (1.125rem) | Line-height 1.65, cor muted |
| `.mono` | Geist Mono | `--text-sm` (0.875rem) | Tracking 0.05em |

---

## Espaçamentos

Base: **4px (0.25rem)**. Escala multiplicativa.

| Token | Valor | Pixels |
|-------|-------|--------|
| `--space-1` | `0.25rem` | 4px |
| `--space-2` | `0.5rem` | 8px |
| `--space-3` | `0.75rem` | 12px |
| `--space-4` | `1rem` | 16px |
| `--space-5` | `1.25rem` | 20px |
| `--space-6` | `1.5rem` | 24px |
| `--space-8` | `2rem` | 32px |
| `--space-10` | `2.5rem` | 40px |
| `--space-12` | `3rem` | 48px |
| `--space-14` | `3.5rem` | 56px |
| `--space-16` | `4rem` | 64px |
| `--space-20` | `5rem` | 80px |
| `--space-24` | `6rem` | 96px |
| `--space-32` | `8rem` | 128px |
| `--space-40` | `10rem` | 160px |

### Seções (Padding Vertical Fluido)

| Token | Valor | Range |
|-------|-------|-------|
| `--section-sm` | `clamp(3rem, 6vw, 6rem)` | 48–96px |
| `--section-md` | `clamp(5rem, 9vw, 10rem)` | 80–160px (padrão) |
| `--section-lg` | `clamp(7rem, 12vw, 14rem)` | 112–224px |

### Container

| Token | Valor |
|-------|-------|
| `--container-max` | `1440px` (wide) |
| `--container-default` | `1200px` (padrão) |
| `--container-padding` | `clamp(1.25rem, 5vw, 4rem)` — 20–64px |

---

## Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-sm` | `4px` | Inputs, pequenos elementos |
| `--radius-md` | `8px` | Cards, containers |
| `--radius-lg` | `16px` | Cards maiores, modais |
| `--radius-full` | `9999px` | Botões pill, badges, avatares |

---

## Sombras

| Token | Valor | Uso |
|-------|-------|-----|
| `--shadow-lift` | `0 6px 18px rgba(0,0,0,0.22)` | Elevação geral |
| `--shadow-control-hover` | `0 4px 16px rgba(0,0,0,0.15)` | Hover em controles |
| `--shadow-primary-soft` | `0 8px 24px rgba(91,155,213,0.25)` | Glow azul |
| `--shadow-whatsapp` | `0 4px 20px rgba(37,211,102,0.4)` | Botão WhatsApp |
| `--shadow-whatsapp-hover` | `0 6px 28px rgba(37,211,102,0.6)` | Hover WhatsApp |

---

## Botões

### Base (`.btn`)
```
display: inline-flex
align-items: center
gap: 8px
padding: 16px 32px
font-size: 14px (--text-sm)
font-weight: 500
letter-spacing: 0.12em
text-transform: uppercase
border: 2px solid transparent
cursor: pointer
```

### Variantes

| Classe | Background | Cor | Borda | Hover |
|--------|-----------|-----|-------|-------|
| `.btn--primary` | `--color-primary` | white | primary | bg → primary-light |
| `.btn--ghost` | transparent | text | border-light | bg → bg-light |
| `.btn--whatsapp` | `--color-whatsapp` | white | whatsapp | shadow glow verde |
| `.btn--outline` | transparent | primary-light | primary-light | bg → primary, text → white |

### Split Buttons (`.btn--split`)
Botão composto com label + ícone plus separados por gap de 6px. Quatro variantes (primary, outline, ghost, whatsapp) e três tamanhos (sm, default, lg).

Microinteração: no hover, label e ícone trocam de posição horizontalmente (via `button-swap.js`).

---

## Cards

### Card de Depoimento (`.depoimento-card`)
- Background branco, border sutil, sombra leve
- Acento azul no topo (3px, scaleX 0.18 → 1 no hover)
- Aspas decorativas (8rem, opacity 0.07)
- Variante featured: background azul claro, borda azul

### Card de Estatística (`[data-stats-card]`)
- Background `--color-stats-card` (#F7F7F7)
- Borda sutil, sombra leve
- Número em Horizon (bold, grande), label em Geist Mono (uppercase, pequeno)
- Animação de contagem ao entrar no viewport

### Card de Financiamento (`.financiamento-card`)
- Dois tiers: featured (destaque com ícone grande) e standard (mais compacto)
- Decoração de canto (linhas CSS desenhadas)
- Hover: borda azul, sombra glow, transform translateY(-2px)

### Card de Opcional (`.opcionais-card`)
- Imagem com slideshow (múltiplas fotos alternando)
- Label + título + descrição
- Hover: borda azul, transform translateY(-4px), shadow

---

## Seções

### Classes de Seção

| Classe | Padding | Background |
|--------|---------|-----------|
| `.section` | `--section-md` | Herdado |
| `.section--sm` | `--section-sm` | Herdado |
| `.section--lg` | `--section-lg` | Herdado |
| `.section--dark` | — | `--color-bg` (navy escuro) |
| `.section--mid` | — | `--color-bg-mid` |
| `.section--light` | — | `--color-surface` (claro) |

### Padrão de Section Heading

Cada seção segue o padrão:
```html
<div class="section-heading">
  <span class="section-heading__meta">EYEBROW TEXT</span>
  <span class="section-heading__rule">
    <span class="section-heading__square"></span>
  </span>
  <h2 class="section-heading__title">TÍTULO</h2>
  <p class="section-heading__sub">Subtítulo</p>
</div>
```

Animação: a linha (`__rule`) escala de 0 → 1, o quadrado (`__square`) desliza ao longo e gira 180°.

---

## Responsividade

### Breakpoints

| Nome | Valor | Contexto |
|------|-------|----------|
| xs | ≤ 479px | Phones compactos (iPhone SE) |
| sm | ≤ 767px | Phones padrão (portrait) |
| md | ≤ 1023px | Tablets e phones landscape |
| lg | ≥ 1024px | Desktop |
| xl | ≥ 1440px | Telas wide |

### Comportamento por Breakpoint

| Componente | Mobile (≤767px) | Desktop (≥1024px) |
|------------|-----------------|-------------------|
| **Hero** | Título clamp(2.35rem, 11.5vw), sem subtítulo/kicker, CTAs empilhados | Título 8rem, grid 2 colunas, spotlight mouse |
| **Navbar** | Menu hamburger, painel expandível fullscreen | Menu inline, painel dropdown com cards |
| **Produtos** | Scroll natural, panels empilhados | Pinned scroll, parallax, spotlight |
| **Diferenciais** | Scroll relativo, 1 coluna | Pinned scroll com indicador, 1 coluna |
| **Grid** | 1 coluna | 2–4 colunas conforme classe |
| **Botões** | Full-width, min-height 3rem (touch target) | Auto-width |
| **Cursor** | Oculto | Custom dot + follower |
| **Smooth scroll** | Desativado (Lenis off) | Ativado |
| **Magnetic** | Desativado | Ativado |
| **Button swap** | Desativado | Ativado |

### Touch Targets
Todos os elementos interativos em mobile respeitam o mínimo de **44px** de área de toque (WCAG 2.5.5). Inputs usam `font-size: max(1rem, 16px)` para evitar zoom automático no iOS.

---

## Padrões Visuais Importantes

### Tema Escuro Dominante
O site usa dark theme como padrão. Seções claras (`.section--light`) são exceções usadas para contraste visual e destaque de conteúdo específico (depoimentos, opcionais, financiamento).

### Hierarquia de Cor no Texto
1. **Branco puro** (`--color-white`) — títulos principais
2. **Steel/Muted** (`--color-text-muted` / `--color-steel`) — corpo de texto
3. **Azul claro** (`--color-primary-light`) — links, eyebrows, acentos
4. **Azul primário** (`--color-primary`) — elementos de UI, botões

### Padrão de Animação de Entrada
Todos os elementos usam `[data-animate]` com transformações iniciais em CSS e animação via GSAP ScrollTrigger:
- `fade-up`: Opacidade 0 + translateY(60px)
- `fade-in`: Apenas opacidade
- `slide-left/right`: translateX(±60px)
- `scale-in`: scale(0.92)
- `lines`: SplitText por linhas, cada uma sobe do bottom

### Easing Padrão
O easing `machado` (`cubic-bezier(0.16, 1, 0.3, 1)`) é usado em 90% das animações. É um ease-out com overshoot sutil — rápido no início, desaceleração suave.

### Prefers Reduced Motion
Todo o sistema de animação respeita `prefers-reduced-motion: reduce`. Quando ativo:
- Todas as animações CSS são desabilitadas
- Transições reduzidas a 10ms
- `will-change` removido
- Elementos começam no estado final
