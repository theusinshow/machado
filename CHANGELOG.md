# CHANGELOG — Machado Plataformas

> Registro obrigatório de todas as alterações do projeto.
> Formato: `[AAAA-MM-DD] Tipo — Descrição breve` seguido de detalhes.
> Tipos: `FEAT` (novo recurso), `FIX` (correção), `STYLE` (visual/CSS), `REFACTOR`, `CHORE` (estrutura/config), `CONTENT` (textos/imagens).

---

## [2026-04-30] STYLE — Social-proof desktop: layout 4 colunas flat estilo good-fella.com

**Agente:** Claude Code
**Sessão:** Rewrite do layout desktop da seção de prova social

### Alterado
- `css/components/social-proof.css` — `@media 1024px`: grid trocado de `repeat(2, 1fr)` para `repeat(4, minmax(0, 1fr))` com `gap: 0`; cards recebem `background-color: transparent; border: none; border-right: 1px solid var(--color-stats-divider)` para efeito de colunas planas separadas por linha fina; último card sem `border-right` via `:last-child`; adicionado override `@media (hover: hover) and (min-width: 1024px)` para suprimir feedback de borda no hover em desktop (a animação do `stat-square` já provê o feedback)

---

## [2026-05-01] STYLE — Cards 590×440px, 50px margem lateral, texto ancorado à esquerda

**Agente:** Claude Code
**Sessão:** Ajuste de dimensões e layout da seção social-proof

### Alterado
- `css/components/social-proof.css` — `.stat-label-wrapper` trocado de `inline-flex` para `flex` com `width: 100%` (texto fica anchored à esquerda do card inteiro); `@media 1024px`: container override com `max-width: 1300px; padding-inline: 50px` (resulta em inner-width 1200px → cards ~592px com gap 16px); grid trocado de `repeat(4, 1fr)` para `repeat(2, 1fr)` criando layout 2×2; cards com `height: 440px`; removido pseudo-element `::after` de separador que não se aplica ao novo layout 2 colunas

---

## [2026-05-01] FIX — Refinamentos de UX: hover, square, scroll top, label speed

**Agente:** Claude Code
**Sessão:** Ajustes pós-revisão da seção social-proof

### Alterado
- `css/components/social-proof.css` — removido `translateY` do hover do card (sem lift); removido `transition: transform` da regra base pois não é mais necessário; rotação inicial do `stat-square` reduzida de `-135deg` para `-45deg` (mais sutil); duração de entrada encurtada para `0.32s/0.42s`; trigger do square permanece `.stat-card:hover` (card inteiro, não só o texto)
- `index.html` — adicionado script inline no `<head>` com `history.scrollRestoration = 'manual'` e `window.scrollTo(0,0)` — garante scroll para o topo em F5 e navegação back/forward, antes de qualquer CDN carregar
- `js/animations/stats.js` — label: deslocamento inicial reduzido de `y:16` para `y:10`, duração de `0.65s` para `0.38s`, ease trocado para `power3.out` (mais fluido para deslocamentos curtos), position na timeline adiantado de `0.32` para `0.28`

---

## [2026-05-01] FEAT — Animações da seção Social Proof redesenhadas

**Agente:** Claude Code
**Sessão:** Refinamento de social-proof — hover, stat-square, scroll animations, contagem de números

### Alterado
- `css/variables.css` — adicionados tokens `--ease-machado` e `--ease-snap` para uso em transições CSS (evita cubic-bezier solto fora dos tokens)
- `css/components/social-proof.css` — hover do card reduzido de `translateY(-4px)` para `translateY(-2px)`, transição de transform encurtada para `--dur-fast`; borda no hover trocada para `--color-border-light` (mais sutil); `stat-square` agora oculto por padrão (`opacity:0; scale(0) rotate(-135deg)`), reaparece no hover do card com transição `machado` suave (0.55s) e retorna rapidamente (0.22s) — CSS puro sem GSAP; adicionado bloco `prefers-reduced-motion` desativando a transição do square
- `js/animations/stats.js` — reescrito com três layers independentes: (1) card entra de baixo (y:36→0), (2) `.stat-label` sobe separado (y:16→0) durante a entrada do card, (3) números contam de 0 até o valor via `data-count` / `data-count-suffix`; estado inicial dos labels pré-definido com `gsap.set` antes dos ScrollTriggers; bloco `prefers-reduced-motion` reseta labels também
- `index.html` — adicionados `data-count` e `data-count-suffix` nos três `.stat-number__value` (22; 4mil; 2mil)

---

## [2026-05-01] FIX — Bugs de CSS e reduced-motion + galeria com imagens reais

**Agente:** Claude Code
**Sessão:** Retomada de projeto — diagnóstico e correções

### Alterado
- `css/variables.css` — adicionado token `--space-14: 3.5rem` (corrige padding quebrado em tablet: hero.css linha 207 usava variável inexistente)
- `css/components/financiamento.css` — 2 rgba hardcoded substituídos por `--color-border-soft` e `--color-primary-surface`
- `css/components/sobre.css` — rgba hardcoded `rgba(255,255,255,0.7)` substituído por `--color-white-muted`
- `css/components/cta-interstitial.css` — rgba hardcoded substituído por `--color-primary-soft`
- `css/components/contato.css` — 2 rgba hardcoded substituídos por `--color-primary-ring` e `--color-error-ring`; adicionada classe `.form-field--full` (usada no HTML mas não definida)
- `js/animations/scroll-triggers.js` — corrigido bug de `prefers-reduced-motion`: footer headline ficava `opacity:0` porque a função retornava cedo sem resetar o estado inicial do CSS
- `index.html` — galeria substituída: 8 imagens reais de `assets/images/galeria/` no lugar de placeholders `picsum.photos`

---

## [2026-04-29] STYLE — Navbar refinada com animações good-fella.com

**Agente:** Claude Code
**Sessão:** Refinamento de navbar/menu aberto seguindo referência good-fella.com

### Alterado
- `index.html` — seção logo abaixo da hero reestruturada para três métricas institucionais da Machado com markup novo (`stats-section`, `stats-container`, `stat-card`, `stat-number`, `stat-label`).
- `css/variables.css` — adicionados tokens específicos da nova seção clara de resultados (`#EEEEEE` no fundo da seção e `#F7F7F7` nos cards), além de bordas e sombras dedicadas.
- `css/components/social-proof.css` — componente recriado com visual premium claro, três cards responsivos, hover sutil, separadores desktop e números em destaque com detalhe azul.
- `css/components/social-proof.css` — seção recalibrada para layout editorial em quatro painéis, com imagem na primeira coluna e três blocos numéricos altos seguindo a composição da referência.
- `index.html` — adicionada coluna visual com imagem da plataforma antes das métricas, alinhando a seção ao layout de referência.
- `css/components/social-proof.css` — painéis refinados para ficar mais fiéis à referência: quatro containers bem definidos, números maiores, labels menores no rodapé e proporções mais altas no desktop.
- `css/components/social-proof.css` — proporção dos quatro painéis reduzida para um formato menos vertical e mais próximo de um bloco horizontal premium.
- `index.html` — legendas dos cards de resultado reestruturadas com wrapper, square azul e texto em linha única.
- `css/components/social-proof.css` — labels dos cards travadas em uma linha, com square azul fixo e espaçamento alinhado à referência.
- `js/animations/stats.js` — microanimação adicionada ao rodapé dos cards: square azul entra girando junto com a legenda, em sequência e apenas uma vez.
- `js/main.js` — integração da animação dedicada da seção de resultados na ordem de inicialização pós-loader.
- `css/variables.css` — adicionados tokens de largura máxima, colunas e gaps do menu aberto para evitar medidas soltas no componente.
- `css/components/navbar.css` — seção inferior do menu aberto reconstruída com grid estável de três áreas, limitando a navegação à esquerda, o bloco de texto ao centro e o bloco de imagens à direita.
- `css/components/navbar.css` — cards da direita convertidos para `flex` contido com `min-width: 0`, `max-width: 100%` e imagens com `width: 100%`/`height: auto`, eliminando a sobreposição sobre o texto central.
- `css/components/navbar.css` — navbar fechada mantém fundo transparente para se mesclar com o background do site; cartão cinza escuro (`--color-menu-bg`) reservado exclusivamente para o estado de menu aberto.
- `css/components/navbar.css` — tema claro da navbar fechada ajustado para cartão cinza claro (`--color-surface`) sobre seções claras, como nas referências 4 e 5.
- `index.html` — adicionado `.nav-indicator` (elemento único) dentro de `.navbar-panel__nav`.
- `css/components/navbar.css` — removidos `::before` dos links da nav; adicionado `.nav-indicator` com `position: absolute` e `transition: transform` para deslizar verticalmente entre itens.
- `js/main.js` — lógica de indicador animado: `positionIndicator()` move o quadrado via `translateY` no hover, `moveIndicatorToActive()` retorna ao item ativo no mouseleave, reposicionamento automático no resize.
- `css/components/navbar.css` — layout do painel aberto revertido para proporções anteriores (`1.02fr / 0.56fr / 1.22fr`, `aspect-ratio: 0.72`, gap padrão) após teste visual.
- `js/main.js` — animações de abertura/fechamento do menu expandido refatoradas para timeline GSAP com `clip-path` (revelação de cima para baixo), stagger refinado em três grupos (nav links, meta blocks, cards) e easing `machado`.
- `js/main.js` — fechamento do menu agora usa timeline GSAP com `clearProps: 'all'` para limpeza segura após a animação.

---

## [2026-04-29] STYLE — Hero redesenhada com composição editorial premium

**Agente:** Codex
**Sessão:** Refinamento visual da hero

### Alterado
- `index.html` — hero reestruturada com kicker técnico, CTA principal, ação secundária e linha de highlights para melhorar hierarquia e leitura.
- `css/components/hero.css` — layout da hero reconstruído em mobile-first com grid editorial, palco visual para a imagem, glow azul controlado e escala mais premium em desktop.
- `js/animations/hero.js` — animação de entrada expandida para contemplar os novos elementos da hero sem quebrar o split do título.
- `css/components/hero.css` — refinamento do layout para corrigir o empilhamento do título e restaurar a composição horizontal com texto à esquerda e produto à direita.
- `index.html` — CTA principal da hero e CTA fixo do canto inferior direito convertidos para o formato bloco + quadrado com `+`.
- `css/layout.css` — criação do padrão reutilizável de CTA split inspirado na referência visual, adaptado para a paleta Machado.
- `css/animations.css` — substituição do botão circular flutuante por um CTA fixo no novo formato visual.
- `css/components/hero.css` — ajuste da largura do CTA principal para ficar mais próximo da referência.
- `css/variables.css` — adição da família `JetBrains Mono` para CTAs e microtipografia de interface.
- `index.html` — importação da JetBrains Mono, redução do texto da hero e remoção dos highlights para simplificar a composição.
- `css/layout.css` — redução do tamanho dos CTAs split e troca da tipografia para JetBrains Mono fina.
- `css/components/hero.css` — hero refinada para deixar o naming menor, em linha, com a imagem mais próxima do bloco principal e o link secundário sublinhado.
- `css/components/hero.css` — remoção do fade de fundo, hero com preto sólido, tipografia da marca sem clipping aparente e imagem menor/anexada ao rodapé visual da seção.
- `css/layout.css` — hover do CTA split suavizado para uma resposta mais discreta.
- `css/animations.css` — CTA fixo do canto inferior direito com hover mais sutil.
- `css/layout.css` — CTAs split reduzidos novamente para se aproximarem mais da escala da referência atual.
- `css/components/hero.css` — título da hero reduzido, com melhor espaçamento entre linhas, e imagem reposicionada para um layout mais ancorado ao canto inferior direito da tela.
- `css/components/hero.css` — imagem da hero ampliada e deslocada ainda mais para o canto direito da tela no desktop.
- `css/components/hero.css` — hero image deslocada além do padding do container no desktop para encostar visualmente no canto inferior direito da seção.
- `css/components/hero.css` — hero image reposicionada alguns pixels mais para baixo no desktop, mantendo a composição do canto inferior direito.
- `index.html` — texto da hero refinado para uma leitura mais direta e mais próxima da referência.
- `css/layout.css` — CTAs split da hero e do botão fixo reduzidos novamente para ficarem mais próximos da escala visual de referência.
- `css/components/hero.css` — coluna de texto da hero refinada com melhor hierarquia, respiro entre título azul/branco e subtítulo mais contido.
- `css/components/hero.css` — bloco de texto da hero ampliado em torno de 15% e hero image reposicionada mais para baixo no desktop.
- `css/components/hero.css` — bloco de texto da hero ampliado novamente para ganhar mais presença e largura útil no desktop.
- `css/components/hero.css` — coluna esquerda da hero ampliada de forma mais agressiva, com mais largura de grid e mais espaço útil para título, subtítulo e CTAs.
- `css/components/hero.css` — coluna esquerda da hero ampliada novamente com escala aproximada de 1.3 para kicker, título, subtítulo e CTA principal.
- `index.html` — CTA secundário da hero encurtado de "Ver modelos disponíveis" para "Ver modelos".
- `index.html` — navbar reestruturada com CTA split, toggle "Menu" mais refinado e melhor hierarquia no menu mobile.
- `css/components/navbar.css` — navbar totalmente redesenhada com barra flutuante escura, navegação desktop mais editorial e overlay mobile mais premium.
- `js/main.js` — comportamento da navbar refinado com controle explícito de abertura/fechamento, `aria-expanded` e fechamento via `Escape`.
- `index.html` — navbar reestruturada novamente para um padrão mais fiel às referências, com topo minimalista e painel expandido em três áreas.
- `css/components/navbar.css` — navegação refeita com barra flutuante compacta e painel editorial inspirado diretamente nas referências de `assets/images/references/nav bar`.
- `js/main.js` — toggle da navbar adaptado ao novo `navbar-panel`, com rótulo `Menu/Close` e fade de abertura/fechamento do painel.
- `css/components/navbar.css` — adição de estado claro da navbar para contraste sobre seções claras, mantendo o mesmo layout flutuante.
- `js/main.js` — navbar agora alterna automaticamente entre tema escuro e claro de acordo com a seção visível no topo da página.
- `js/main.js` — fechamento da navbar reforçado com clique fora do painel expandido e rotina de `closeMenu()` mais robusta.
- `css/variables.css` — novos tokens ajustados para navbar clara e overlay suave dentro da mesma paleta do projeto.
- `css/components/navbar.css` — navbar redefinida para fundo branco/cinza, texto preto e estados ativos em azul tanto na barra quanto no painel expandido.
- `js/main.js` — remoção da troca automática de tema da navbar para manter o novo padrão claro fixo durante o scroll.
- `css/components/navbar.css` — correção da navbar fechada para voltar a ficar transparente, acompanhando a seção ao fundo, com cartão cinza reservado apenas ao menu aberto.
- `js/main.js` — restauração da leitura de `.section--light` para alternar a cor da navbar fechada conforme a seção visível no topo da página.
- `css/variables.css` — tokens da navbar ajustados novamente para o menu aberto voltar ao cinza escuro editorial, com destaque azul no lugar do laranja da referência.
- `css/components/navbar.css` — menu aberto redesenhado para ficar muito mais próximo da referência visual: barra superior escura, navegação grande à esquerda, bloco de contato ao centro e cards verticais à direita.
- `css/components/navbar.css` — tipografia dos links grandes do menu refinada para peso 500 e escala desktop de `64px / 72px`, usando a família carregada mais próxima da referência `Aktiv Grotesk`.
- `css/variables.css` — cor do fundo da navbar aberta ajustada para a base `#333333`, aplicada via token para manter a regra de zero hex direto nos componentes.
- `css/variables.css` — novos tokens de espaçamento da navbar aberta para controlar topo e margem inferior do painel via variável.
- `css/components/navbar.css` — cards da direita ampliados, bloco central deslocado para a esquerda e painel aberto limitado com margem inferior de `100px`.
- `css/variables.css` — novo token para controlar o gap vertical do bloco central da navbar aberta no desktop.
- `css/components/navbar.css` — bloco central da navbar aberta ajustado para `200px` de espaçamento vertical entre os grupos de conteúdo.
- `css/variables.css` — fundo da navbar aberta tornado totalmente opaco usando `#333333` via token, sem transparência no painel.
- `css/components/navbar.css` — bloco central da navbar aberta corrigido para usar gap real de `200px`, removendo o efeito extra causado por `space-between`.
- `css/components/navbar.css` — barra superior da navbar aberta alinhada visualmente ao painel principal, removendo blur e sombra para manter exatamente a mesma cor de fundo.
- `css/components/navbar.css` — retângulo do `+` no CTA da navbar aberta ajustado para usar o mesmo cinza `#333333` do topo, eliminando a diferença de cor no estado aberto.
- `css/components/navbar.css` — correção final da navbar aberta: CTA restaurado ao visual anterior e bordas do topo/painel igualadas ao mesmo fundo `#333333` para eliminar a leitura de dois tons diferentes.
- `css/components/navbar.css` — teste de opacidade no wrapper superior da navbar aberta revertido; mantido apenas o ajuste de cor do bloco superior para acompanhar o painel aberto sem alterar o comportamento anterior.
- `css/variables.css` — criação do token único `--color-menu-bg` para centralizar a cor real do menu aberto.
- `css/components/navbar.css` — topo aberto (`.navbar.is-open .navbar-inner`) e bloco abaixo (`.navbar-panel__inner`) unificados explicitamente no mesmo `background-color` usando `--color-menu-bg`.
- `css/components/navbar.css` — ajuste do wrapper externo do menu aberto revertido para transparente, preservando a separação entre a barra superior e o bloco de conteúdo, enquanto os dois retângulos continuam compartilhando o mesmo `--color-menu-bg`.
- `css/components/navbar.css` — opacidade removida do wrapper do menu aberto e aplicada ao bloco interno, evitando alteração perceptiva na cor do painel inferior.
- `js/main.js` — animação de abertura/fechamento da navbar expandida movida do wrapper do painel para `.navbar-panel__inner`, preservando a mesma cor chapada entre os dois retângulos.

## [2026-04-29] STYLE — Loader redesenhado e base visual saneada

**Agente:** Codex
**Sessão:** Continuação do projeto + redesign do loading screen

### Alterado
- `css/variables.css` — adição de tokens semânticos para transparências, glow, ring e sombras, evitando valores soltos fora da fonte da verdade.
- `css/layout.css` — base de botões ajustada para usar tokens de duração e cor do projeto.
- `css/animations.css` — remoção de `!important`, centralização de sombras em tokens e redesign completo do loading screen para o novo layout com quatro quadrados.
- `js/animations/hero.js` — integração com helper de `SplitText` com guard clause adicional.
- `js/animations/scroll-triggers.js` — animação de linhas refatorada para usar helper centralizado.
- `js/main.js` — inicialização alinhada ao `DOMContentLoaded` e inclusão do módulo opcional de marquee no fluxo.
- `js/loader.js` — animação do loader refeita para quatro quadrados que entram rolando, se alinham e depois liberam a tela.
- `index.html` — markup do loader simplificado para a nova composição visual.

### Criado
- `js/animations/text-split.js` — utilitário central para splits por chars e linhas com guard clauses.
- `js/animations/marquee.js` — módulo opcional de marquee horizontal, pronto para uso futuro.
- `js/animations/stats.js` — animação sequencial da nova seção de números/resultados com entrada única ao entrar na viewport.

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
