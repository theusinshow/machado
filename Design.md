# DESIGN.md — Sistema de Design: Machado Plataformas

> Fonte da verdade visual do projeto. Toda decisão de cor, tipografia, espaçamento e animação está aqui. Ao implementar qualquer componente, consultar este arquivo antes de qualquer outra referência.

---

## 🎨 Filosofia de Design

**Referência estrutural:** good-fella.com
**Estética própria:** Industrial premium. Navy escuro + aço metálico + azul elétrico de acento.
**Sensação:** Um fabricante que domina o mercado. Pesado, preciso, confiável — mas com presença.
**Diferencial:** Não é uma página genérica de implemento. É a apresentação de um produto que carrega toneladas — o design precisa ter o mesmo peso visual.

### Princípios Visuais
1. **Fundo escuro dominante** — O produto é fotografado em fundo preto. O site segue essa linguagem.
2. **Tipografia como peça de metal** — Headlines grandes, condensadas, com peso máximo.
3. **Azul elétrico como sinal de vida** — Em um mar de dark navy, o azul primário brilhante marca CTAs e destaques.
4. **Grade rígida, imagens sem limites** — Layout em grid preciso, fotos do produto vazando pelas bordas.
5. **Movimento industrial** — Animações que lembram maquinaria: precisas, sem bounce, com peso.

---

## 🖌️ Paleta de Cores

### Cores Identificadas nos Assets

Com base nas imagens de paleta fornecidas pelo cliente (duas paletas):

**Paleta Dark (principal — fundo dark navy como no mockup hero):**
| Token | Hex | Uso |
|-------|-----|-----|
| `--color-bg` | `#1C2430` | Fundo principal da página |
| `--color-bg-mid` | `#2F3B4A` | Cards, seções alternadas |
| `--color-bg-light` | `#4A5665` | Borders grossas, elementos de destaque |
| `--color-steel` | `#A7B0BA` | Texto secundário, ícones |
| `--color-surface` | `#F2F4F6` | Seções claras (financiamento, sobre) |

**Paleta Blue (acentos e primários):**
| Token | Hex | Uso |
|-------|-----|-----|
| `--color-primary` | `#1A4B82` | CTA principal, botões, links ativos |
| `--color-primary-light` | `#5B9BD5` | Hover de CTA, ícones em destaque |
| `--color-primary-muted` | `#8FB4D4` | Bordas de cards de produto, separadores |
| `--color-navy` | `#1E3A5F` | Alternativo escuro para botões ghost |
| `--color-navy-dark` | `#1A2E46` | Navbar scrollada, overlays |

**Paleta de texto:**
| Token | Hex | Uso |
|-------|-----|-----|
| `--color-text` | `#F2F4F6` | Texto principal (fundo escuro) |
| `--color-text-muted` | `#A7B0BA` | Texto secundário, captions |
| `--color-text-dark` | `#1C2430` | Texto em seções claras |
| `--color-white` | `#FFFFFF` | Logo, texto hero, destaques puros |

**Utilitários:**
| Token | Hex | Uso |
|-------|-----|-----|
| `--color-border` | `#2F3B4A` | Divisores, bordas de card |
| `--color-border-light` | `#4A5665` | Bordas mais visíveis |
| `--color-overlay` | `rgba(28, 36, 48, 0.85)` | Overlay sobre imagens/vídeo |
| `--color-success` | `#25D366` | Botão WhatsApp |

### Implementação em CSS
```css
:root {
  /* Backgrounds */
  --color-bg:           #1C2430;
  --color-bg-mid:       #2F3B4A;
  --color-bg-light:     #4A5665;
  --color-steel:        #A7B0BA;
  --color-surface:      #F2F4F6;

  /* Primary Blue */
  --color-primary:      #1A4B82;
  --color-primary-light:#5B9BD5;
  --color-primary-muted:#8FB4D4;
  --color-navy:         #1E3A5F;
  --color-navy-dark:    #1A2E46;

  /* Text */
  --color-text:         #F2F4F6;
  --color-text-muted:   #A7B0BA;
  --color-text-dark:    #1C2430;
  --color-white:        #FFFFFF;

  /* Utility */
  --color-border:       #2F3B4A;
  --color-border-light: #4A5665;
  --color-overlay:      rgba(28, 36, 48, 0.85);
  --color-whatsapp:     #25D366;
}
```

---

## 📐 Tipografia

### Hierarquia de Fontes

```css
/* === FONTE DISPLAY PROPRIETÁRIA === */
/* Machado (METAG___.TTF) — USO EXCLUSIVO em headlines e nome da marca */
--font-display: 'Machado', 'Arial Narrow', sans-serif;

/* === FONTE SECUNDÁRIA — Títulos de seção, subtítulos === */
/* Barlow Condensed: industrial, geométrico, combina com Machado */
--font-heading: 'Barlow Condensed', 'Arial Narrow', sans-serif;

/* === FONTE CORPO === */
/* Barlow: mesma família, tom profissional, muito legível */
--font-body: 'Barlow', 'Helvetica Neue', sans-serif;

/* === FONTE MONO === */
/* DM Mono: números de stats, numeração de cards, tags técnicas */
--font-mono: 'DM Mono', 'Courier New', monospace;
```

### Google Fonts (importar no HTML)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Regras de Uso da Fonte Machado (CRÍTICO)
| Contexto | Usar Machado? |
|----------|:---:|
| Headline hero principal | ✅ SIM |
| Nome da marca no hero | ✅ SIM |
| H1 de seção em destaque | ✅ SIM |
| H2/H3 de seções | ❌ NÃO — usar Barlow Condensed Bold |
| Body text, parágrafos | ❌ NÃO — usar Barlow Regular |
| Labels, eyebrows, captions | ❌ NÃO — usar Barlow Condensed ou Barlow |
| Números de stats | ❌ NÃO — usar DM Mono ou Barlow Condensed Black |
| Botões/CTAs | ❌ NÃO — usar Barlow Condensed SemiBold |
| Navbar links | ❌ NÃO — usar Barlow Condensed |

### Escala Tipográfica
```css
/* Baseada em escala Major Third (1.25) com clamp para responsividade */
--text-xs:      0.75rem;          /*  12px — captions, legal */
--text-sm:      0.875rem;         /*  14px — labels, eyebrows */
--text-base:    1rem;             /*  16px — body padrão */
--text-lg:      1.125rem;         /*  18px — body lead, intro */
--text-xl:      1.25rem;          /*  20px — subtítulos pequenos */
--text-2xl:     1.5rem;           /*  24px — subtítulos */
--text-3xl:     1.875rem;         /*  30px — H3 */
--text-4xl:     2.25rem;          /*  36px — H2 */
--text-5xl:     3rem;             /*  48px — H1 seção */
--text-6xl:     3.75rem;          /*  60px — display */
--text-hero:    clamp(3.5rem, 8vw, 8rem);    /* Hero headline responsivo */
--text-display: clamp(5rem, 12vw, 12rem);   /* Headline máximo — fonte Machado */
```

### Pesos e Espaçamentos
```css
--weight-light:    300;
--weight-regular:  400;
--weight-medium:   500;
--weight-semibold: 600;
--weight-bold:     700;
--weight-black:    900;

--leading-none:    1;        /* Hero, display */
--leading-tight:   1.1;      /* Headlines */
--leading-snug:    1.25;     /* Sub-headlines */
--leading-normal:  1.5;      /* Body */
--leading-relaxed: 1.75;     /* Long-form */

--tracking-tight:  -0.03em;  /* Headlines grandes */
--tracking-normal: 0;
--tracking-wide:   0.1em;    /* Labels, eyebrows, botões */
--tracking-wider:  0.2em;    /* Tags, caps */
```

---

## 📏 Espaçamento e Layout

### Sistema de Espaçamento (base 4px)
```css
--space-1:    0.25rem;   /*   4px */
--space-2:    0.5rem;    /*   8px */
--space-3:    0.75rem;   /*  12px */
--space-4:    1rem;      /*  16px */
--space-5:    1.25rem;   /*  20px */
--space-6:    1.5rem;    /*  24px */
--space-8:    2rem;      /*  32px */
--space-10:   2.5rem;    /*  40px */
--space-12:   3rem;      /*  48px */
--space-16:   4rem;      /*  64px */
--space-20:   5rem;      /*  80px */
--space-24:   6rem;      /*  96px */
--space-32:   8rem;      /* 128px */
--space-40:   10rem;     /* 160px */
```

### Container e Grid
```css
--container-max:     1440px;
--container-default: 1200px;
--container-narrow:  800px;
--container-padding: clamp(1.25rem, 5vw, 4rem);

--grid-columns:   12;
--grid-gap:       clamp(1rem, 2vw, 1.5rem);
```

### Padding de Seção
```css
--section-sm:  clamp(3rem, 6vw, 6rem);
--section-md:  clamp(5rem, 9vw, 10rem);
--section-lg:  clamp(7rem, 12vw, 14rem);
```

---

## 🎬 Sistema de Animações

### Durações
```css
--dur-fast:    200ms;
--dur-normal:  400ms;
--dur-slow:    700ms;
--dur-slower:  1000ms;
--dur-crawl:   1600ms;
```

### Easing GSAP
```javascript
// Ease principal — suave, industrial, sem bounce
CustomEase.create("machado", "0.16, 1, 0.3, 1");   // Expo Out

// Para snaps e mudanças de estado rápidas
CustomEase.create("snap",    "0.87, 0, 0.13, 1");   // Circ InOut

// Para elementos que entram com peso (cards pesados)
CustomEase.create("heavy",   "0.4, 0, 0.2, 1");
```

### Animações por Tipo de Elemento

#### Hero Title (fonte Machado) — Chars subindo com máscara
```javascript
const split = new SplitText('.hero-title', { type: 'chars' });
gsap.from(split.chars, {
  yPercent: 110,
  opacity: 0,
  duration: 1.2,
  stagger: 0.03,
  ease: 'machado',
  delay: 0.3,  // após loader
});
```

#### Seções — Fade up padrão
```javascript
gsap.fromTo(el,
  { opacity: 0, y: 50 },
  { opacity: 1, y: 0, duration: 0.9, ease: 'machado',
    scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' }
  }
);
```

#### Cards de Produto — Entrada em cascata
```javascript
gsap.fromTo(cards,
  { opacity: 0, y: 60, scale: 0.96 },
  { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: 'machado',
    scrollTrigger: { trigger: '.produtos-grid', start: 'top 80%' }
  }
);
```

#### Linha divisória — Reveal horizontal
```javascript
gsap.fromTo(line,
  { scaleX: 0, transformOrigin: 'left center' },
  { scaleX: 1, duration: 1.4, ease: 'machado',
    scrollTrigger: { trigger: line, start: 'top 90%' }
  }
);
```

#### Counters de Prova Social
```javascript
gsap.from(counter, {
  textContent: 0,
  duration: 2.5,
  snap: { textContent: 1 },
  ease: 'power2.out',
  scrollTrigger: { trigger: counter, start: 'top 80%', once: true }
});
```

#### Imagens da Galeria — Scale reveal
```javascript
gsap.fromTo(img,
  { scale: 1.1, opacity: 0 },
  { scale: 1, opacity: 1, duration: 1.2, ease: 'machado',
    scrollTrigger: { trigger: img, start: 'top 85%' }
  }
);
```

---

## 🧩 Especificações de Componentes

### Navbar
- **Altura:** 72px (desktop), 60px (mobile)
- **Fundo inicial:** Transparente (`rgba(0,0,0,0)`)
- **Fundo ao scroll (> 80px):** `rgba(28, 36, 48, 0.96)` + `backdrop-filter: blur(12px)`
- **Logo:** Branco, alinhada à esquerda, 120px de largura
- **Links:** Barlow Condensed SemiBold, 14px, `--tracking-wider`, maiúsculo, cor `--color-steel`
- **Links hover:** cor `--color-primary-light`, transição 200ms
- **CTA:** Botão filled `--color-primary` + texto branco, Barlow Condensed SemiBold

### Botão CTA Principal
```css
.btn-primary {
  background: var(--color-primary);
  color: var(--color-white);
  font-family: var(--font-heading);
  font-weight: var(--weight-semibold);
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  padding: var(--space-4) var(--space-8);
  border: 2px solid var(--color-primary);
  position: relative;
  overflow: hidden;
  /* Hover: efeito de preenchimento reverso em azul mais claro */
}
.btn-primary:hover {
  background: var(--color-primary-light);
  border-color: var(--color-primary-light);
}
```

### Botão WhatsApp
```css
.btn-whatsapp {
  background: var(--color-whatsapp);  /* #25D366 */
  color: var(--color-white);
  /* Ícone WhatsApp SVG inline à esquerda */
}
```

### Botão Ghost
```css
.btn-ghost {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border-light);
}
.btn-ghost:hover {
  border-color: var(--color-primary-light);
  color: var(--color-primary-light);
}
```

### Hero Section
- **Layout:** Split 50/50 (texto esquerda, produto direita) conforme mockup
- **Fundo:** Preto puro (`#000`) — o produto em fundo preto domina
- **Headline:** Fonte Machado, `--text-display`, `--leading-none`, `--tracking-tight`
- **Subtítulo:** Barlow Regular, 16-18px, `--color-steel`
- **Vídeo/Imagem:** Lado direito, sem border-radius, com leve glow azul no produto
- **CTA primário:** "FAÇA SEU ORÇAMENTO" — azul filled
- **CTA secundário:** "CONHEÇA OS PRODUTOS" — ghost/outline

### Cards de Produto (4 unidades)
```
Layout: Grid 4 colunas desktop, 2 tablet, 1 mobile
Estrutura de cada card:
  ├── Imagem do produto (hover: scale 1.05, 0.4s)
  ├── Badge de categoria (ex: "LINHA PESADA")
  ├── Nome do produto
  ├── Specs técnicas resumidas (carga máxima, comprimento)
  └── Link "Ver Catálogo →"

Hover do card:
  ├── Borda azul primary-light acende
  ├── Imagem faz scale
  └── Badge muda de cor
```

### Galeria
- **Layout:** Grid masonry — colunas de larguras variadas para dinamismo
- **Mobile:** 2 colunas uniformes
- **Hover:** Overlay escuro + ícone de zoom

### Seção Prova Social (números)
```
Números grandes: DM Mono ou Barlow Condensed Black
Ex: "15+" / "500+" / "98%" / "12"
Rótulo abaixo: Barlow Regular, --color-text-muted
Separador: linha vertical 1px --color-border-light entre cada item
```

### Depoimentos
- **Layout:** Slider horizontal (3 cards visíveis desktop, 1 mobile)
- **Card:** `--color-bg-mid`, border `1px --color-border`, padding generoso
- **Foto:** Circular, 60px, border azul 2px
- **Stars:** 5 estrelas SVG amarelas/douradas
- **Navegação:** Setas prev/next — Barlow Condensed, sem border-radius

### Formulário de Contato
```
Campos:
  - Nome completo (obrigatório)
  - Empresa / Razão Social
  - Telefone / WhatsApp (obrigatório)
  - Produto de interesse (select: Pesada / Média / Leve / Urbano / Não sei)
  - Mensagem / Observações (textarea)
  - Botão: "ENVIAR SOLICITAÇÃO"

Estilo:
  - Fundo: --color-bg-mid
  - Inputs: border 1px --color-border, background --color-bg
  - Focus: border --color-primary-light + leve glow azul
  - Labels: Barlow Condensed, --tracking-wide, uppercase, --color-text-muted
```

### Rodapé
- **Fundo:** `--color-bg` (mais escuro que as seções — mergulha para fechar)
- **Linha superior:** 1px `--color-border-light` com leve glow
- **Logo:** 100px, branco
- **Links:** Barlow Regular 14px, `--color-text-muted`, hover `--color-primary-light`
- **CNPJ/dados legais:** Barlow Regular 12px, `--color-steel`

---

## 📱 Breakpoints

```css
/* Mobile (default): 0 — 767px */

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Wide Desktop */
@media (min-width: 1280px) { }

/* Ultra Wide */
@media (min-width: 1600px) { }
```

---

## 🔤 Conteúdo de Placeholder (Substituir com dados reais)

### Prova Social — Números
| Stat | Valor | Label |
|------|-------|-------|
| Anos no mercado | `15+` | Anos de Experiência |
| Unidades produzidas | `500+` | Plataformas Entregues |
| Clientes ativos | `200+` | Clientes Atendidos |
| Estados | `12` | Estados Atendidos |

### 5 Diferenciais
1. **Aço de Alta Resistência** — Estrutura com aço certificado NBR, resistência superior comprovada
2. **Fabricação Própria** — Controle total de qualidade, do corte ao acabamento
3. **Garantia de Fábrica** — [X] anos de garantia em estrutura e componentes
4. **Entrega em Todo o Brasil** — Logística especializada para grandes dimensões
5. **Suporte Técnico** — Equipe especializada para instalação e manutenção

### Produtos
| Produto | Subtítulo | Carga Máx |
|---------|-----------|-----------|
| Linha Pesada | Para guincho pesado e semirreboque | Até XX toneladas |
| Linha Média | Versatilidade para uso intenso | Até XX toneladas |
| Linha Leve | Compacta e eficiente | Até XX toneladas |
| Linha Urbano | Para cidades e acessos restritos | Até XX toneladas |

---

*Atualizar este arquivo quando paleta, tipografia ou especificações visuais mudarem. Todos os valores hexadecimais devem ser verificados com o cliente.*