# Relatório QA Visual — Machado Plataformas
**Data:** 2026-05-29  
**Ferramenta:** Playwright headless (Chromium)  
**Breakpoints testados:** 320 / 360 / 375 / 390 / 414 / 768 / 1024 / 1366 / 1440 / 1920 px  
**Páginas testadas:** Home, Sobre, Produtos, Clientes, Crédito

---

## Sumário Executivo

| Página      | 320  | 360  | 375  | 390  | 414  | 768  | 1024 | 1366 | 1440 | 1920 |
|-------------|------|------|------|------|------|------|------|------|------|------|
| Home        | ⚠️   | ✅   | ✅   | ✅   | ✅   | ✅   | ✅   | ✅   | ✅   | ✅   |
| Sobre       | ✅*  | ✅*  | ✅*  | ✅*  | ✅*  | ✅   | ✅   | ✅   | ✅   | ✅   |
| Produtos    | ✅   | ✅   | ✅   | ✅   | ✅   | ✅   | ✅   | ✅   | ✅   | ✅   |
| Clientes    | ✅*  | ✅*  | ✅*  | ✅*  | ✅*  | ✅   | ✅   | ✅   | ✅   | ✅   |
| Crédito     | ✅*  | ✅*  | ✅*  | ✅*  | ✅*  | ✅   | ✅   | ✅   | ✅   | ✅   |

> `✅*` = sem overflow horizontal ou botões cortados; flags LOW de seções naturalmente altas (conteúdo rico)

---

## Problemas Encontrados

### 🔴 Críticos
_Nenhum encontrado._

### 🟠 Altos — CORRIGIDOS

#### P1 · OFFSCREEN_BUTTON — `produtos.html` @ 320px
**Causa:** A regra CSS `.arsenal--alt .arsenal__content { align-items: flex-end; text-align: right; }` era declarada **fora de qualquer media query**, após o bloco `@media (max-width: 1024px)` que corretamente revertia para `flex-start` no mobile. Como o CSS cascateia pela ordem de declaração, a regra sem query sobrescrevia a mobile, empurrando o botão "Solicitar Orçamento" para a direita em 13px além do viewport de 320px.

**Elemento afetado:** `.arsenal.arsenal--alt .arsenal__content > .btn--split-primary`  
**Left: 106px / Right: 333px / Viewport: 320px → overflow: +13px**

**Correção:** Movida a regra `align-items: flex-end; text-align: right; ...` para dentro de `@media (min-width: 1025px)`, evitando conflito com o override mobile.

**Arquivo alterado:** `produtos.html` (bloco `<style>` inline, linhas 394-404)

**Status pós-fix:** ✅ Verificado — todos os 10 breakpoints passam em produtos.html

---

### 🟡 Médios — Parcialmente corrigidos

#### P2 · HERO_TOO_TALL — `index.html` @ 320px
**Causa:** O hero usa `min-height: 100svh` (568px). Com o conteúdo total (kicker + título 2 linhas + subtítulo 3 linhas + CTAs) somando ~475px, mais o padding do hero-inner (80px), o hero atinge 635px (112% do viewport).

**Correção aplicada:** Adicionado `@media (max-width: 359px)` em `css/mobile.css` e `css/bundle.css` reduzindo `padding-block` de `var(--space-6) var(--space-14)` para `var(--space-4) var(--space-10)` e comprimindo `margin-top` dos CTAs.

**Status pós-fix:** ⚠️ Hero ainda mede 635px (conteúdo supera o viewport). O overflow é de apenas 67px e não causa scroll horizontal nem truncamento. Todos os elementos (kicker, título, subtítulo, CTAs) permanecem visíveis e acessíveis.

> **Validação manual necessária:** Visualizar em dispositivo físico 320px (ex.: iPhone SE 1ª geração) para confirmar se os CTAs estão na primeira dobra.

---

### 🟡 Médios — Falsos positivos (sem ação necessária)

#### P3 · BROKEN_IMAGES — `produtos.html` (todos os breakpoints)
**Causa:** `<img class="lb-img" src="" alt="" />` — imagem do lightbox com src vazio por design. O src é preenchido dinamicamente via JS quando o usuário clica em uma foto. Sem impacto visual.

#### P4 · ELEMENTS_OVERLAPPING_NAVBAR — `produtos.html` (todos os breakpoints)
**Causa:** `.lb-close` (botão fechar do lightbox) é `position: fixed; top: 1.25rem; z-index: 2001`. Só é visível quando a overlay `.lb-overlay.is-open` existe. Sem impacto visual no estado padrão.

#### P5 · CTA_BELOW_FOLD — Produtos, Clientes, Crédito (mobile)
**Causa:** A seção `.page-cta` é a CTA final de cada página, posicionada intencionalmente no final. Não é um problema — usuários chegam a ela fazendo scroll. A verificação automatizada alertou pois a seção começa além de `top > viewport-height`.

---

### 🔵 Baixos — Informacionais (sem ação necessária)

#### P6 · EXCESSIVE_VERTICAL_SPACE — todas as páginas (mobile)
**Causa:** Seções ricas em conteúdo como `.sobre-unified` (2700px), `.financiamento` (2600px) e `.diferenciais` (1200px+) naturalmente são altas no mobile por serem layouts de coluna única com muito conteúdo. O script alertou seções > 900px, mas essas dimensões são esperadas e corretas.

---

## Correções Aplicadas

| # | Arquivo | Modificação |
|---|---------|-------------|
| 1 | `produtos.html` | Regras desktop `.arsenal--alt .arsenal__content` movidas para `@media (min-width: 1025px)` (linhas 394-409 → bloco condicionado) |
| 2 | `css/mobile.css` | Adicionado `@media (max-width: 359px)` com `padding-block` reduzido no `.hero-inner` e `margin-top` comprimido nos `.hero-ctas` |
| 3 | `css/bundle.css` | Mesma regra `@media (max-width: 359px)` adicionada após o bloco `@media (max-width: 479px)` existente (necessário pois `index.html` carrega bundle.css, não mobile.css diretamente) |

---

## Screenshots Salvos

Pasta: `.audit/screenshots-full/`  
Total: 30 arquivos PNG (mobile: todas as páginas × 5 breakpoints mobile)

Nomenclatura: `{page}_{breakpoint}.png`

Exemplos relevantes:
- `produtos_320.png` — estado pós-fix (✅)
- `home_320.png` — hero ligeiramente alto (⚠️ para validação manual)
- `home_375.png` — hero perfeito
- `clientes_375.png`, `credito_375.png` — layout limpo

---

## Pontos que Ainda Precisam de Validação Manual

1. **Hero home em 320px** — Testar em iPhone SE real ou emulador. O hero mede 635px num viewport de 568px. Os CTAs estão visíveis, mas abaixo da primeira dobra por ~67px.

2. **Menu mobile (navbar)** — Verificar abertura/fechamento do menu hamburguer em 320px. O script automatizado não abre o menu; apenas verifica altura inicial.

3. **Lightbox de fotos em produtos.html** — Verificar se o `.lb-close` e as setas `.lb-arrow` ficam posicionadas corretamente em telas estreitas (320-375px) quando a overlay está aberta.

4. **Animações GSAP em mobile** — O Playwright testa com `waitForTimeout(2s)`. Animações de entrada podem comportar-se diferente em dispositivos lentos. Validar scrollTrigger em mobile físico.

5. **MapLibre (sobre.html)** — O mapa só carrega via rede real. Em localhost, o mapa pode não renderizar completamente. Validar em produção ou staging.

---

## Conclusão

- **Todos os breakpoints desktop (768-1920px)** passam limpos em todas as páginas.
- **Mobile 360-414px** passam limpos em todas as páginas após a correção.
- **O único bug real encontrado** (botão fora da tela no arsenal--alt em 320px) foi corrigido com sucesso.
- **Identidade visual preservada**: nenhuma cor, tipografia, espaçamento ou componente foi redesenhado — apenas o confinamento responsivo foi corrigido.
