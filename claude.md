# CLAUDE.md — Projeto: Machado Plataformas

> Lido automaticamente pelo Claude Code a cada sessão. Contexto completo, regras e arquitetura do projeto. Qualquer agente retoma o trabalho com total fidelidade a partir daqui.

---

## 🏗️ Visão Geral do Projeto

**Cliente:** Machado Plataformas
**Segmento:** Fabricante de plataformas para guincho / implementos rodoviários
**Tipo:** Landing Page comercial — foco em conversão (orçamentos)
**Referência de design:** [good-fella.com](https://good-fella.com) — estrutura, animações, tipografia editorial pesada
**Stack:** HTML5 + CSS3 (Custom Properties) + Vanilla JS + GSAP 3 + Lenis smooth scroll

---

## 🎯 Objetivo da Página

Converter visitantes em leads via formulário de orçamento e WhatsApp. A landing page deve comunicar **autoridade industrial**, **qualidade de fabricação** e **variedade de produtos** de forma visualmente impactante — sem parecer catálogo genérico.

**KPIs de sucesso:**
- Cliques no CTA "Faça seu Orçamento"
- Envios de formulário de contato
- Cliques no botão WhatsApp
- Tempo na página > 2 min

---

## 📁 Estrutura de Arquivos

```
machado-plataformas/
│
├── index.html
├── CLAUDE.md               ← Este arquivo
├── AGENTS.md               ← Regras para agentes IA
├── DESIGN.md               ← Sistema de design (cores, tipo, tokens)
├── REFERENCES.md           ← Referências visuais e técnicas
│
├── assets/
│   ├── fonts/
│   │   └── METAG___.TTF          ← Fonte display proprietária (Machado)
│   │
│   ├── images/
│   │   ├── logo/
│   │   │   ├── logo.svg          ← Logo branco — uso em fundo escuro
│   │   │   └── logo-dark.svg     ← Logo escuro — uso em fundo claro (se necessário)
│   │   ├── hero/
│   │   │   ├── plataforma-hero.webp
│   │   │   └── plataforma-hero.jpg   ← Fallback
│   │   ├── produtos/
│   │   │   ├── pesada.webp / .jpg
│   │   │   ├── media.webp / .jpg
│   │   │   ├── leve.webp / .jpg
│   │   │   └── urbano.webp / .jpg
│   │   ├── galeria/
│   │   │   └── [foto-01 a foto-08].webp  ← Aplicações reais, obra, campo
│   │   ├── sobre/
│   │   │   └── fabrica.webp / .jpg       ← Foto da fábrica ou equipe
│   │   └── depoimentos/
│   │       └── [cliente-01 a cliente-03].webp
│   │
│   └── videos/
│       └── hero-reel.mp4         ← Vídeo real do produto para o hero
│
├── css/
│   ├── reset.css                 ← CSS reset moderno (box-sizing, margins)
│   ├── variables.css             ← FONTE DA VERDADE — todos os tokens
│   ├── typography.css            ← @font-face + escala tipográfica
│   ├── layout.css                ← Container, grid, flexbox, seções
│   ├── animations.css            ← Estados iniciais para GSAP
│   └── components/
│       ├── navbar.css
│       ├── hero.css
│       ├── social-proof.css      ← Números + selos
│       ├── diferenciais.css      ← 5 pilares
│       ├── produtos.css          ← 4 cards de produto
│       ├── galeria.css           ← Grid de fotos
│       ├── sobre.css
│       ├── cta-interstitial.css  ← Faixa de conversão intermediária
│       ├── financiamento.css
│       ├── depoimentos.css
│       ├── contato.css           ← Formulário + WhatsApp + Mapa
│       └── footer.css
│
├── js/
│   ├── main.js                   ← Entry point — ordem de init importa
│   ├── loader.js                 ← Loading screen animada
│   ├── lenis.js                  ← Smooth scroll setup
│   ├── gsap-setup.js             ← Register plugins + CustomEase
│   └── animations/
│       ├── hero.js               ← Entrada do hero após loader
│       ├── scroll-triggers.js    ← ScrollTrigger de todas as seções
│       ├── marquee.js            ← Ticker horizontal (se usado)
│       ├── magnetic.js           ← Botões com atração magnética
│       ├── cursor.js             ← Cursor customizado
│       ├── text-split.js         ← SplitText para chars/lines
│       ├── counters.js           ← Animação de números (prova social)
│       └── produtos-tabs.js      ← Interação dos cards de produto
│
└── README.md
```

---

## 📋 Seções — Mapa Completo

| # | ID da Seção | Nome | Conteúdo Principal | Objetivo |
|---|-------------|------|--------------------|----------|
| 1 | `#navbar` | Navbar | Logo esq., menu central (5 links), CTA direita "FAÇA SEU ORÇAMENTO" | Navegação + conversão rápida |
| 2 | `#hero` | Hero | Headline grande (fonte Machado), subtítulo, vídeo real do produto, 2 CTAs | Impacto visual imediato |
| 3 | `#social-proof` | Prova Social | Números: anos, unidades produzidas, clientes, estados + selos INMETRO/NBR | Credibilidade instantânea |
| 4 | `#diferenciais` | Diferenciais | 5 pilares com ícone SVG + título + texto curto | Responder "Por que Machado?" |
| 5 | `#produtos` | Produtos | 4 cards: Pesada / Média / Leve / Urbano + link para catálogo | Segmentar o visitante |
| 6 | `#galeria` | Galeria | Grid masonry de fotos reais (aplicações, obras, campo) | Tangibilizar o produto |
| 7 | `#sobre` | Sobre | Texto institucional + foto da fábrica + badge ano fundação | Humanizar e gerar confiança |
| 8 | `#cta-mid` | CTA Intermediário | Frase impactante + botão WhatsApp + botão Formulário | Conversão no meio da jornada |
| 9 | `#financiamento` | Financiamento | Ícones das formas de pagamento + texto resumo das condições | Remover objeção de preço |
| 10 | `#depoimentos` | Depoimentos | Slider/cards com foto, nome, empresa e depoimento do cliente | Prova social definitiva |
| 11 | `#contato` | Contato | Formulário (nome, empresa, telefone, produto, mensagem) + WhatsApp flutuante + Google Maps embed | Conversão final |
| 12 | `#footer` | Rodapé | Logo, links rápidos, dados legais (CNPJ, endereço), redes sociais, copyright | Fechamento + respaldo legal |

---

## ⚙️ Stack Técnica

### CDN — Ordem de carregamento
```html
<!-- 1. Lenis Smooth Scroll -->
<script src="https://unpkg.com/lenis@1.1.14/dist/lenis.min.js"></script>

<!-- 2. GSAP Core -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>

<!-- 3. Plugins GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/SplitText.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/CustomEase.min.js"></script>
```

### Registro de plugins (gsap-setup.js)
```javascript
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);

// Ease principal do projeto — suave e industrial
CustomEase.create("machado", "0.16, 1, 0.3, 1");   // Expo Out suavizado
CustomEase.create("snap",    "0.87, 0, 0.13, 1");   // Circ InOut para snaps
```

### Fonte proprietária (typography.css)
```css
@font-face {
  font-family: 'Machado';
  src: url('../assets/fonts/METAG___.TTF') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

---

## 🧠 Regras de Desenvolvimento

### Nomenclatura
- Classes CSS: `kebab-case` → `.produto-card`, `.hero-title`, `.social-proof-number`
- Variáveis CSS: `--categoria-prop` → `--color-primary`, `--font-display`, `--space-16`
- IDs: apenas âncoras de seção e hooks JS → `#produtos`, `#hero`
- JS: camelCase → `initHero()`, `initScrollTriggers()`, `initCounters()`
- Data attributes: `data-animate`, `data-magnetic`, `data-delay`, `data-count`

### Regras de Animação (CRÍTICO)
1. Estado inicial via `gsap.set()` ou classe CSS `.will-animate { opacity: 0 }`
2. GSAP **sempre anima de volta ao estado natural** — jamais deixar opacity: 0 permanente
3. `markers: false` em produção — nunca commitar com markers ativos
4. Cada módulo JS exporta apenas `init()` — sem efeitos colaterais no import
5. Guard clause obrigatório: `if (!elements.length) return;`

### Performance
- `will-change: transform` apenas durante animação ativa
- Lenis + ScrollTrigger sincronizados: `lenis.on('scroll', ScrollTrigger.update)`
- Imagens: WebP + fallback JPEG, `loading="lazy"` abaixo do fold
- Vídeo hero: `autoplay muted loop playsinline preload="auto"`
- Nunca bloquear o thread principal com processamento pesado no scroll

### Responsividade
- **Mobile-first:** base → `min-width: 768px` → `min-width: 1024px` → `min-width: 1280px`
- Cursor customizado desabilitado em `@media (hover: none)` (touch devices)
- Animações reduzidas em `@media (prefers-reduced-motion: reduce)`

---

## 📝 Changelog — Regra Obrigatória

**Todo agente, toda sessão, toda alteração: registrar no `CHANGELOG.md` antes de encerrar.**

### O que registrar
Qualquer mudança que afete arquivos do projeto — sem exceção:
- Criação ou exclusão de arquivo
- Alteração de CSS, JS ou HTML (mesmo que pequena)
- Adição ou substituição de assets (imagens, fontes, vídeos)
- Mudança de conteúdo (textos, links, números)
- Ajuste de configuração ou estrutura de pastas

### Formato obrigatório

```markdown
## [AAAA-MM-DD] TIPO — Descrição breve em uma linha

**Agente:** Claude Code | Claude.ai | Codex
**Sessão:** Nome descritivo da sessão

### Alterado
- `caminho/arquivo.ext` — o que mudou e por quê

### Criado
- `caminho/arquivo.ext` — para que serve

### Removido
- `caminho/arquivo.ext` — motivo da remoção
```

### Tipos válidos
| Tipo | Quando usar |
|------|-------------|
| `FEAT` | Novo componente, seção ou funcionalidade |
| `FIX` | Correção de bug visual, lógico ou de layout |
| `STYLE` | Ajuste visual sem mudança de comportamento |
| `REFACTOR` | Reestruturação de código sem mudança de resultado |
| `CONTENT` | Alteração de texto, imagem ou dado de conteúdo |
| `CHORE` | Setup, estrutura de pastas, configurações |

### Protocolo de encerramento de sessão
1. Listar todos os arquivos modificados (`find . -newer CHANGELOG.md -type f`)
2. Escrever a entrada do changelog com data real (`2026-MM-DD`)
3. Incluir seções apenas com itens que existirem (Criado / Alterado / Removido)
4. Não encerrar sem o registro — mesmo que a sessão tenha sido pequena

---

## 🔄 Fluxo de Trabalho entre Agentes

```
Claude.ai (web)
  → Resolução de problemas pontuais
  → Geração de componentes isolados
  → Revisão de decisões de design
        ↓
Claude Code (CLI) — IMPLEMENTADOR PRINCIPAL
  → Integração de componentes ao projeto
  → Testes de animação e responsividade
  → Manutenção da estrutura de arquivos
        ↓
Codex (OpenAI)
  → Snippets e utilitários específicos
  → Algoritmos de animação complexos
  → Sempre receber contexto do CLAUDE.md antes do prompt
```

**Protocolo Claude Code:**
1. Sempre ler `CLAUDE.md` ao iniciar sessão
2. Rodar `ls -la` e `find . -name "*.css" | head -20` para checar estado
3. Nunca criar arquivos fora da estrutura definida
4. Commitar antes de delegar para Codex
5. **Registrar TODAS as alterações no `CHANGELOG.md` antes de encerrar a sessão**

---

## ✅ Checklist de Progresso

### Fase 1 — Setup
- [ ] Estrutura de pastas completa criada
- [ ] METAG___.TTF copiado para assets/fonts/
- [ ] logo.svg salvo em assets/images/logo/
- [ ] variables.css com todos os tokens do DESIGN.md
- [ ] reset.css, typography.css, layout.css criados

### Fase 2 — Seções
- [ ] Loading Screen
- [ ] Navbar (logo + links + CTA + mobile menu + scroll behavior)
- [ ] Hero (headline Machado font + vídeo/imagem + 2 CTAs + animação entrada)
- [ ] Prova Social (counters animados + selos)
- [ ] Diferenciais (5 cards/ícones)
- [ ] Produtos (4 cards: Pesada, Média, Leve, Urbano)
- [ ] Galeria (grid de fotos)
- [ ] Sobre (texto + foto fábrica + badge ano)
- [ ] CTA Intermediário (faixa de conversão)
- [ ] Financiamento (formas de pagamento)
- [ ] Depoimentos (slider/cards)
- [ ] Contato (formulário + WhatsApp + Mapa)
- [ ] Rodapé

### Fase 3 — Qualidade
- [ ] Sem erros no console
- [ ] Responsivo: 375 / 768 / 1024 / 1280px testado
- [ ] Smooth scroll sem travamentos
- [ ] Todas as animações testadas
- [ ] Formulário com validação básica
- [ ] WhatsApp link com mensagem pré-formatada
- [ ] OG tags preenchidas
- [ ] Imagens otimizadas (WebP)
- [ ] `prefers-reduced-motion` respeitado
- [ ] Performance: First Paint < 2s local

---

*Última atualização: Início do projeto | Cliente: Machado Plataformas*