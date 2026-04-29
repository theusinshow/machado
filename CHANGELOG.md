# CHANGELOG — Machado Plataformas

> Registro obrigatório de todas as alterações do projeto.
> Formato: `[AAAA-MM-DD] Tipo — Descrição breve` seguido de detalhes.
> Tipos: `FEAT` (novo recurso), `FIX` (correção), `STYLE` (visual/CSS), `REFACTOR`, `CHORE` (estrutura/config), `CONTENT` (textos/imagens).

---

## [2026-04-29] CHORE — Setup inicial completo do projeto

**Agente:** Claude Code
**Sessão:** Setup & estrutura base

### Criado
- Estrutura completa de pastas (`assets/`, `css/`, `css/components/`, `js/`, `js/animations/`)
- `css/reset.css` — CSS reset moderno
- `css/variables.css` — Todos os tokens de design (cores, tipografia, espaçamento, animações)
- `css/typography.css` — `@font-face` Machado + escala tipográfica + classes utilitárias
- `css/layout.css` — Container, grid, botões base, utilitários de layout
- `css/animations.css` — Estados iniciais GSAP, loader, cursor, WhatsApp flutuante, `prefers-reduced-motion`
- `css/components/navbar.css`
- `css/components/hero.css`
- `css/components/social-proof.css`
- `css/components/diferenciais.css`
- `css/components/produtos.css`
- `css/components/galeria.css`
- `css/components/sobre.css`
- `css/components/cta-interstitial.css`
- `css/components/financiamento.css`
- `css/components/depoimentos.css`
- `css/components/contato.css`
- `css/components/footer.css`
- `js/gsap-setup.js` — Register plugins + CustomEase `"machado"` e `"snap"`
- `js/lenis.js` — Smooth scroll + sincronização com ScrollTrigger
- `js/loader.js` — Loading screen animada com Promise e safety timeout
- `js/animations/cursor.js` — Cursor customizado (desabilitado em touch)
- `js/animations/magnetic.js` — Efeito magnético em botões `[data-magnetic]`
- `js/animations/counters.js` — Animação de contadores numéricos com ScrollTrigger
- `js/animations/hero.js` — Animação de entrada do hero (SplitText + timeline)
- `js/animations/scroll-triggers.js` — Todos os `[data-animate]`: fade-up, fade-in, slide-left, slide-right, scale-in, lines
- `js/animations/produtos-tabs.js` — Hover nos cards de produto
- `js/main.js` — Entry point com ordem de inicialização
- `index.html` — Página completa com 12 seções (Navbar, Hero, Social Proof, Diferenciais, Produtos, Galeria, Sobre, CTA Mid, Financiamento, Depoimentos, Contato, Footer)
- `CHANGELOG.md` — Este arquivo

### Copiado de `imgs/`
- `assets/images/logo/logo.svg` ← `imgs/logosvg 1.svg`
- `assets/images/hero/plataforma-hero.png` ← `imgs/fotohero.png`

### Regras validadas
- Zero hex hardcoded em CSS (todos via `variables.css`)
- Guard clause em todos os módulos JS
- `markers: false` em todos os ScrollTriggers
- Mobile-first em todos os componentes
- `prefers-reduced-motion` implementado

---
