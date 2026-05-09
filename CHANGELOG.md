# CHANGELOG — Machado Plataformas

> Registro obrigatório de todas as alterações do projeto.
> Formato: `[AAAA-MM-DD] Tipo — Descrição breve` seguido de detalhes.
> Tipos: `FEAT` (novo recurso), `FIX` (correção), `STYLE` (visual/CSS), `REFACTOR`, `CHORE` (estrutura/config), `CONTENT` (textos/imagens).

---

## [2026-05-09] FIX — Hero: título completo sem corte

**Agente:** Claude Code
**Sessão:** Correção do overflow no título "PLATAFORMAS"

### Alterado
- `css/components/hero.css` — coluna esquerda do grid alargada de `0.86fr` para `1.1fr` (`.hero-media` é `position: absolute`, não ocupa grid); font-size do título em `1024px+` reduzido de `var(--text-hero)` (6rem fixo) para `clamp(3rem, 4vw, 4.5rem)`; font-size em `1280px+` ajustado de `clamp(6rem, 7vw, 7.5rem)` para `clamp(3.5rem, 4vw, 5rem)` — elimina o corte de "PLATAFORMAS" causado por `overflow: hidden` da animação de reveal

---

## [2026-05-09] STYLE — Cor cinza do menu restaurada

**Agente:** Claude Code
**Sessão:** Reversão da cor --color-menu-bg

### Alterado
- `css/variables.css` — `--color-menu-bg` revertido de `#252E3C` para `#333333` (cinza original que gerava bom contraste na navbar aberta, painéis e controles de produto)

---

## [2026-05-09] FIX — Auditoria UI/UX: acessibilidade, tokens e contraste

**Agente:** Claude Code
**Sessão:** Auditoria ui-ux-pro-max + web-design-guidelines + implementação

### Alterado
- `css/reset.css` — removido `outline: none` global; adicionado `focus-visible` seguro (2px solid primary-light) e componente `.skip-link` com posicionamento via `:focus-visible`
- `index.html` — adicionado `<link rel="preload">` para a fonte Machado; `<a class="skip-link">` como primeiro filho do body; atributos `width`/`height` nas imagens `.navbar-card` (320×224), `.stat-media-card` (440×600) e `.diferenciais` (640×800)
- `css/variables.css` — `--color-menu-bg` alterado de `#333333` (órfão) para `#252E3C` (paleta navy); adicionados `--weight-semibold: 600` e `--weight-bold: 700`
- `css/layout.css` — adicionado `touch-action: manipulation` ao seletor `.btn` (elimina delay de 300ms no mobile)
- `css/components/hero.css` — font-size do título revisado para `clamp()` em todos os breakpoints; usa token `var(--text-hero)` em vez de valor absoluto
- `css/components/footer.css` — removido `opacity: 0` permanente de `.footer-headline`; adicionado padrão `.js-ready .footer-headline { opacity: 0 }` (seguro caso JS falhe); font-size usa `var(--text-hero)`
- `css/components/social-proof.css` — adicionado `font-variant-numeric: tabular-nums` em `.stat-number`; font-size usa `var(--text-hero)`
- `css/components/produtos.css` — removidos hovers em `.produto-slide__title/specs/extra` (anti-pattern UX); contraste de `.produto-slide__spec-row dt` corrigido de `var(--color-bg-light) opacity:0.65` (~2.77:1, WCAG fail) para `var(--color-primary)`
- `css/components/navbar.css` — `padding-inline: 60px` substituído por `var(--container-padding)` no breakpoint 1024px
- `css/components/cta-interstitial.css` — `.cta-mid__headline` font-size de `3.25rem` para `clamp(var(--text-4xl), 6vw, var(--text-hero))`
- `js/main.js` — adicionado `document.documentElement.classList.add('js-ready')` no início de DOMContentLoaded
- `js/animations/diferenciais.js` — breakpoints `1024px`/`1023px` extraídos para constantes `BP_DESKTOP`/`BP_MOBILE`
- `js/animations/produtos-tabs.js` — breakpoints `1024px`/`1023px` extraídos para constantes `BP_DESKTOP`/`BP_MOBILE`

---

## [2026-05-07] CHORE — Plano de ajustes do feedback do cliente

**Agente:** Codex
**Sessão:** Planejamento sem implementação

### Criado
- `PLANO_FEEDBACK_CLIENTE.md` — documento com interpretação do feedback, nova estrutura sugerida, ajustes por seção, diretrizes de copy e prioridades de implementação

## [2026-05-07] CHORE — Ícone da página

**Agente:** Codex
**Sessão:** Favicon da landing page

### Alterado
- `index.html` — adicionado favicon PNG usando `assets/images/logo/Icon.png`

## [2026-05-07] STYLE — Cinza editorial em superfícies internas

**Agente:** Codex
**Sessão:** Aplicação pontual do cinza #333333

### Alterado
- `css/components/financiamento.css` — heading, painel e cards internos passam a usar `--color-menu-bg` como superfície de apoio sobre o fundo azul escuro
- `css/components/produtos.css` — controles de galeria e setas principais passam a usar `--color-menu-bg`, aproximando os controles do menu aberto
- `css/components/contato.css` — campos do formulário, opções do select e placeholder do mapa passam a usar `--color-menu-bg` para maior consistência nas seções escuras
- `css/components/footer.css` — botões sociais recebem superfície `--color-menu-bg`

## [2026-05-07] STYLE — Produtos com scroll mais suave

**Agente:** Codex
**Sessão:** Refinamento da animação dos slides de produtos

### Alterado
- `js/animations/produtos-tabs.js` — distância do ScrollTrigger desktop ampliada, transição horizontal do track desacelerada e entrada do slide ativo suavizada com menor deslocamento e duração maior

## [2026-05-07] STYLE — Financiamento em seção industrial escura

**Agente:** Codex
**Sessão:** Redesign da seção Financiamento

### Alterado
- `index.html` — seção `#financiamento` convertida para fundo escuro, heading técnico reutilizável, copy consultiva, painel de negociação e métodos de pagamento compactos
- `css/components/financiamento.css` — componente refeito com `--color-bg`, painel escuro, grid responsivo, microinterações de hover, square indicator e animação básica de linha no painel

## [2026-05-07] FIX — Badge da seção Sobre acima do carrossel

**Agente:** Codex
**Sessão:** Correção de sobreposição do badge

### Alterado
- `css/components/sobre.css` — `sobre-badge` recebeu camada explícita acima dos slides da galeria para evitar que imagens cubram o selo `DESDE 2004`

## [2026-05-07] FEAT — Sobre com carrossel e métricas atualizadas

**Agente:** Codex
**Sessão:** Ajustes da seção Quem Somos

### Alterado
- `index.html` — seção `#sobre` atualizada para 22 anos, badge `DESDE 2004`, métrica `4000+` unidades produzidas e galeria com imagens locais de `assets/images/sobre/`
- `css/components/sobre.css` — estilos do carrossel, dots de navegação, transições básicas, hover sutil e manutenção do layout responsivo da seção
- `js/main.js` — adicionada `initSobreGallery()` com autoplay via GSAP `delayedCall`, navegação por dots e animação inicial básica com `ScrollTrigger`

## [2026-05-07] FEAT — Botões split com swap animado + remoção da galeria

**Agente:** Claude Code
**Sessão:** Padronização de botões e limpeza de seções

### Alterado
- `css/layout.css` — sistema de botões split completamente redesenhado: novas variantes (`btn--split-primary`, `btn--split-outline`, `btn--split-ghost`, `btn--split-whatsapp`) com `box-shadow: inset` para bordas, `overflow: hidden` no container para clip do swap; `btn__label` sobe para `z-index: 2` e `btn__plus` fica em `z-index: 1` para texto ficar visível durante o cruzamento; removido `letter-spacing` hover que desalinhava a medição no JS; removido `transform: rotate(45deg)` dos hovers de variantes
- `css/variables.css` — adicionado `--ease-premium: cubic-bezier(0.22, 1, 0.36, 1)`
- `css/animations.css` — bloco `prefers-reduced-motion` atualizado com `btn--split`, `btn--split .btn__label`, `btn--split .btn__plus`, `btn--split:hover`
- `js/main.js` — adicionado `initButtonSwap()`: detecta `(hover: hover) e (pointer: fine)`, mede `offsetWidth` de label e plus no hover e anima ambos com GSAP (swap de posição — plus vai à esquerda, label vai à direita); `initContactForm` atualizado para buscar `.btn__label || span` no botão de submit; `initDepoimentos` usa ease `snap`
- `index.html` — todos os botões convertidos para padrão split: hero (primary + outline), produtos 3× (primary + outline por slide), sobre (ghost), cta-mid (primary + whatsapp), financiamento (outline), form submit (primary); seção `#galeria` removida inteiramente (80 linhas de HTML)

### Criado
- `prompts.md` — prompt completo para reimplementação da seção `#sobre` por agente externo

---

## [2026-05-07] FEAT — Produtos: scroll pin, specs dl/dt/dd, marker e dois CTAs

**Agente:** Claude Code
**Sessão:** Reaplicação das melhorias da seção Equipamentos (revertidas por engano junto com text-reveal)

### Alterado
- `js/animations/produtos-tabs.js` — desktop `mm.add` com `ScrollTrigger pin: true`; `onUpdate` avança slides pelo scroll (~90% vh por slide); cursor tracking do `.produto-slide__marker` via `gsap.quickTo`; `animatePanel` usa `.produto-slide__spec-row` (em vez de `specs p`); seletor mobile exclui `.produto-slide__marker`
- `css/components/produtos.css` — `::before` de `.produto-slide__text-inner` substituído por `.produto-slide__marker` (elemento real, `position: absolute`, GSAP-controlled); `.produto-slide__spec-row` com grid `7.5rem 1fr`, `dt` mono xs, `dd` base medium; `.produto-slide__cta` vira flex com gap; seta `.btn__icon` com hover `translateX(5px)`; reduced-motion atualizado
- `index.html` — 3 slides de produto: `<span class="produto-slide__marker">` adicionado; specs convertidas para `<dl>` + `<div class="produto-slide__spec-row">` com `<dt>/<dd>`; kickers `// 01 — Linha Leve / 02 — Linha Média / 03 — Linha Pesada`; CTA duplo "Solicitar Orçamento" (primary) + "Ver mais" (outline)

---

## [2026-05-07] STYLE — Produtos: grid profissional e controles reorganizados

**Agente:** Codex
**Sessão:** Redesign visual da seção Produtos

### Alterado
- `css/components/produtos.css` — seção Produtos redesenhada com grid desktop estável, palco de mídia uniforme, imagens/vídeo preenchendo proporção consistente, controles internos da galeria reposicionados e navegação global separada da área das fotos para evitar colisões
- `js/animations/produtos-tabs.js` — sincronização mobile agora também atualiza o produto ativo ao voltar o scroll pela seção

## [2026-05-05] CONTENT — Produtos: mídias numeradas por linha

**Agente:** Codex
**Sessão:** Classificação das imagens da galeria de produtos

### Alterado
- `index.html` — galerias de Linha Leve, Média e Pesada agora usam arquivos numerados por ordem, removendo referências antigas de WhatsApp e imagens pequenas

---

## [2026-05-05] FIX — Produtos: galeria sem corte

**Agente:** Codex
**Sessão:** Ajuste de enquadramento das mídias de produtos

### Alterado
- `css/components/produtos.css` — galeria recebeu respiro interno, itens passaram a respeitar inset responsivo e mídias usam limites de largura/altura para preservar o enquadramento
- `js/animations/produtos-tabs.js` — removido scale ativo da galeria para evitar corte visual em imagens e vídeos

---

## [2026-05-05] STYLE — Loader antigo com wipe diagonal

**Agente:** Codex
**Sessão:** Ajuste final da transicao do loader

### Alterado
- `css/animations.css` — loader antigo manteve visual original e recebeu `clip-path` inicial para wipe
- `js/loader.js` — saida vertical substituida por wipe diagonal com easing `wipe`, preservando quadrados e label antigos

---

## [2026-05-05] FIX — Loader visual antigo restaurado

**Agente:** Codex
**Sessão:** Reversao parcial do loader mantendo hero premium

### Alterado
- `css/animations.css` — loader voltou ao visual antigo com quadrados maiores e label visivel
- `js/loader.js` — animacao antiga dos quadrados e saida vertical restauradas, mantendo remocao do DOM no final e suporte a reduced motion

---

## [2026-05-05] FEAT — Produtos: galeria interna automatica

**Agente:** Codex
**Sessão:** Galeria com imagens, video e mini setas nos produtos

### Alterado
- `index.html` — areas de imagem de Linha Leve, Media e Pesada convertidas para galerias internas com ate 4 midias, incluindo video na Linha Media e mini setas por galeria
- `css/components/produtos.css` — adicionados estilos de `.produto-gallery`, itens empilhados, transicoes de fade/scale e mini controles responsivos
- `js/animations/produtos-tabs.js` — adicionada logica de estado por galeria, autoplay via `gsap.delayedCall`, reset ao trocar produto, mini setas internas e pausa/play de videos apenas na midia ativa

---

## [2026-05-05] FEAT — Hero premium reveal

**Agente:** Codex
**Sessão:** Loader curto, wipe diagonal e entrada editorial da hero

### Alterado
- `index.html` — imagem principal da hero marcada como `loading="eager"` e `decoding="async"` para priorizar LCP sem shift
- `css/animations.css` — loader convertido para tela fullscreen minimalista com fundo da marca, mini mark central e suporte a wipe diagonal por `clip-path`
- `css/components/hero.css` — adicionados masked text reveal, blocos de revelacao, fade/scale da imagem, textura discreta, spotlight via CSS variables e microinteracoes nos links da hero
- `css/layout.css` — hover dos botoes split ganhou deslocamento sutil e movimento horizontal no bloco de `+`
- `js/gsap-setup.js` — criado easing `wipe` com curva `0.76, 0, 0.24, 1`
- `js/loader.js` — loader refeito para durar aproximadamente 1.1s, remover o DOM ao concluir e respeitar `prefers-reduced-motion` sem `setTimeout`
- `js/animations/hero.js` — entrada da hero reescrita com block reveal, mascara por linha, imagem com fade/scale, cleanup de `will-change` e spotlight controlado por `--mouse-x`/`--mouse-y` em desktop

---

## [2026-05-05] FIX — Produtos: heading acompanha texto

**Agente:** Codex
**Sessão:** Correcao da largura do titulo Equipamentos

### Alterado
- `css/components/produtos.css` — heading de Produtos agora usa `fit-content`, largura minima e titulo menor para acompanhar o texto sem vazar da caixa
- `css/layout.css` — `.section-heading` recebeu `box-sizing: border-box` para preservar borda/padding no calculo visual

---

## [2026-05-05] CONTENT — Headings tecnicos sem numeracao

**Agente:** Codex
**Sessão:** Ajuste de textos dos titulos de Produtos e Diferenciais

### Alterado
- `index.html` — meta de Diferenciais alterado para `// Pilares`, meta de Produtos para `// Categorias` e h2 de Produtos para `Equipamentos`

---

## [2026-05-05] FIX — Diferenciais: scroll sem travamento de pin

**Agente:** Codex
**Sessão:** Suavizacao da entrada na secao de pilares

### Alterado
- `js/animations/diferenciais.js` — removido pin virtual da `.diferenciais-layout`; pilares e imagem agora sincronizam pelo scroll natural da pagina, evitando a pausa/encaixe ao entrar na secao

---

## [2026-05-05] FIX — Produtos: titulo sem quebra

**Agente:** Codex
**Sessão:** Correcao do heading compacto de Produtos

### Alterado
- `css/components/produtos.css` — heading de Produtos ficou um pouco mais largo, com gap menor e titulo sem quebra de linha
- `css/layout.css` — titulo global de `section-heading` passou a preservar palavras sem quebra forcada

---

## [2026-05-05] STYLE — Produtos: heading compacto

**Agente:** Codex
**Sessão:** Ajuste do titulo da secao Produtos

### Alterado
- `index.html` — titulo da secao Produtos resumido para "Produtos"
- `css/components/produtos.css` — largura do heading de Produtos reduzida para evitar sobreposicao com a area de imagem e titulo local ajustado para `--text-3xl`

---

## [2026-05-05] STYLE — Section heading claro restaurado

**Agente:** Codex
**Sessão:** Reversao da variacao navy dos titulos

### Alterado
- `index.html` — removida classe `section-heading--navy` dos headings de Diferenciais e Produtos
- `css/layout.css` — removida variacao navy, mantendo o componente claro/cinza em tamanho compacto

---

## [2026-05-05] STYLE — Section heading navy

**Agente:** Codex
**Sessão:** Ajuste de cor do componente de titulos

### Alterado
- `css/layout.css` — adicionada variacao `.section-heading--navy` com fundo azul escuro, borda cinza/translucida, texto branco e meta em azul claro
- `index.html` — headings de Diferenciais e Produtos passaram a usar a variacao navy

---

## [2026-05-05] STYLE — Section heading mais compacto

**Agente:** Codex
**Sessão:** Reducao visual do componente de titulo tecnico

### Alterado
- `css/layout.css` — componente `.section-heading` compactado com menor padding, largura maxima reduzida, linha mais curta e titulo em `--text-4xl`
- `css/components/diferenciais.css` e `css/components/produtos.css` — titulos locais reduzidos para `--text-4xl` para evitar presenca exagerada

---

## [2026-05-05] FEAT — Section heading tecnico animado

**Agente:** Codex
**Sessão:** Componente visual para titulos de secao

### Alterado
- `index.html` — headings de Diferenciais e Produtos passaram a usar `section-heading` com meta mono, linha tecnica e square azul
- `css/layout.css` — criado componente global `.section-heading` com variacoes compactas, superficie cinza, borda sutil, regra horizontal e square
- `css/components/diferenciais.css` e `css/components/produtos.css` — estilos locais dos headers ajustados para herdar o novo componente sem conflito
- `js/animations/scroll-triggers.js` — adicionada animacao GSAP para headings: linha expande, square percorre a regra e meta/titulo entram com fade
- `js/animations/diferenciais.js` — animacao antiga do titulo e kicker e ignorada quando o novo heading animado esta presente, evitando timeline duplicada

---

## [2026-05-05] STYLE — Diferenciais: titulo dentro da timeline

**Agente:** Codex
**Sessão:** Ajuste estrutural do header de Diferenciais

### Alterado
- `index.html` — `h2#diferenciais-heading` e kicker movidos para dentro de `.diferenciais-timeline`, mantendo o `aria-labelledby` da section
- `css/components/diferenciais.css` — header da timeline teve espaçamento ajustado e timeline passou a alinhar conteudo pelo topo

---

## [2026-05-05] STYLE — Social proof: escala dos stats alinhada a referencia

**Agente:** Codex
**Sessão:** Refinamento visual dos numeros de social proof

### Alterado
- `css/components/social-proof.css` — `stat-number` ajustado para `6rem` com `line-height: 1`, peso light e kerning normal; labels mono reduzidos para `--text-base`, line-height mais seco e menor letter-spacing

---

## [2026-05-05] FIX — Fonts: familia Adobe aplicada

**Agente:** Codex
**Sessão:** Correcao do fallback para Arial

### Alterado
- `css/variables.css` — tokens tipograficos agora priorizam os nomes de familia servidos pelo Adobe Fonts (`aktiv-grotesk` e `geist-mono`), mantendo nomes locais como fallback

---

## [2026-05-05] FIX — Fonts: Aktiv via Typekit

**Agente:** Codex
**Sessão:** Carregamento real da Aktiv Grotesk

### Alterado
- `index.html` — adicionado stylesheet Adobe Typekit `https://use.typekit.net/wfu4nak.css` e preconnects para Typekit
- `css/typography.css` — removidos `@font-face` locais da Aktiv baseados em `local()`, evitando fallback para Arial quando a fonte nao existe instalada no sistema

---

## [2026-05-05] STYLE — Social proof: numeros mais leves

**Agente:** Codex
**Sessão:** Refinamento do peso dos stats

### Alterado
- `css/components/social-proof.css` — `.stat-number__value` passou a usar `--weight-light` para reduzir o peso visual dos numeros principais

---

## [2026-05-05] STYLE — Pesos tipograficos sistematizados

**Agente:** Codex
**Sessão:** Aplicacao do plano de weight inspirado na referencia

### Alterado
- `css/variables.css` — adicionados tokens `--weight-light`, `--weight-regular` e `--weight-medium`
- `css/typography.css` — base de leitura ajustada para regular, hero da marca preservada em Machado e classes globais passaram a usar tokens de peso
- `css/layout.css`, `css/animations.css` e componentes — pesos tipograficos migrados para tokens semanticos, com light em numeros grandes, regular em textos/titulos e medium em CTAs/labels/estados ativos

---

## [2026-05-05] FIX — Hero: fonte da marca preservada

**Agente:** Codex
**Sessão:** Restauracao da tipografia proprietaria no titulo da hero

### Alterado
- `css/variables.css` — `--font-display` voltou a priorizar a fonte `Machado` apenas para display
- `css/typography.css` — `@font-face` da fonte proprietaria restaurado e `.hero-title` voltou para peso normal da marca

---

## [2026-05-05] STYLE — Tipografia global Aktiv Grotesk e Geist Mono

**Agente:** Codex
**Sessão:** Troca do sistema tipografico do site

### Alterado
- `index.html` — carregamento externo reduzido para `Geist Mono` nos pesos 400 e 500
- `css/variables.css` — tokens globais de fonte migrados para `Aktiv Grotesk` em display/heading/body e `Geist Mono` em labels/numeros/microcopy
- `css/typography.css` — declarados pesos locais da `Aktiv Grotesk` via `local()`, corpo em light, headlines em regular/light, fundos via variavel e letter-spacing zerado
- `css/layout.css` e componentes tipograficos — pesos antigos `700/800/900` reduzidos para `500`, letter-spacing negativo removido e tamanhos baseados em `vw` substituidos por valores fixos em `rem`

---

## [2026-05-05] FIX — Produtos: deslocamento correto das setas

**Agente:** Codex
**Sessão:** Correcao do carrossel de Produtos

### Alterado
- `js/animations/produtos-tabs.js` — setas agora deslocam o track por largura de viewport (`100vw`) em vez de percentual da largura total, evitando salto para area branca; resize realinha o produto ativo

---

## [2026-05-05] FEAT — Produtos: navegacao por setas

**Agente:** Codex
**Sessão:** Troca do controle por scroll para controles direcionais

### Alterado
- `index.html` — adicionados botoes anterior/proximo na secao Produtos
- `css/components/produtos.css` — criados estilos minimalistas para as setas, estados de hover/focus/disabled e wrapper com overflow controlado
- `js/animations/produtos-tabs.js` — vitrine desktop deixou de depender do wheel/pin para trocar produtos; setas e indicadores agora animam o track diretamente com GSAP

---

## [2026-05-05] FIX — Produtos: scroll por gesto discreto

**Agente:** Codex
**Sessão:** Navegacao travada no centro do slide de Produtos

### Alterado
- `js/animations/produtos-tabs.js` — scroll horizontal encurtado e mais travado; cada gesto de wheel agora mira o proximo slide com animacao programatica mais rapida, mantendo o painel ativo centralizado e reduzindo estados intermediarios com conteudo cortado

---

## [2026-05-05] STYLE — Cursor customizado removido

**Agente:** Codex
**Sessão:** Remoção do efeito no cursor do mouse

### Alterado
- `index.html` — removidos os elementos `#cursor` e `#cursor-follower`
- `js/main.js` — removida importação e chamada de `initCursor()`

---

## [2026-05-05] STYLE — Diferenciais: fundo claro padrão do site

**Agente:** Codex
**Sessão:** Alinhamento visual entre Diferenciais e Produtos

### Alterado
- `css/components/diferenciais.css` — background de `.diferenciais` alterado de `--color-white` para `--color-stats-bg`, mantendo o padrão claro `#EEEEEE` via variável do projeto

---

## [2026-05-05] FEAT — Produtos: square indicator animado no hover

**Agente:** Codex
**Sessão:** Refinamento interativo dos textos de Produtos

### Alterado
- `css/components/produtos.css` — square indicator do bloco de texto agora se move, reduz e rotaciona ao passar o mouse sobre título, specs, descrição ou CTA; textos ganham deslocamento e mudança de cor no hover, em padrão semelhante ao indicador da navbar

---

## [2026-05-05] FIX — Produtos: slide não volta após wheel

**Agente:** Codex
**Sessão:** Correção de navegação discreta da seção Produtos

### Alterado
- `js/animations/produtos-tabs.js` — removido `snap` do ScrollTrigger para evitar disputa com navegação por wheel; wheel agora usa `targetIndex` como fonte de verdade para impedir retorno ao slide anterior durante scroll suave
- `css/components/produtos.css` — tipografia e contraste dos textos refinados com tokens/cores semânticas, largura de texto reduzida e estilos mobile ajustados para evitar cortes

---

## [2026-05-05] FIX — Produtos: scroll sem cortes visuais

**Agente:** Codex
**Sessão:** Refinamento do scroll horizontal de Produtos

### Alterado
- `css/components/produtos.css` — removido clipping interno da área de imagem para evitar cortes durante parallax/animação
- `js/animations/produtos-tabs.js` — removido `clip-path` da entrada da imagem, parallax reduzido, distância de scroll ampliada e snap ajustado para reduzir estados intermediários com conteúdo parcialmente cortado

---

## [2026-05-05] FIX — Produtos: scroll menos sensível

**Agente:** Codex
**Sessão:** Ajuste de leitura no scroll horizontal de Produtos

### Alterado
- `js/animations/produtos-tabs.js` — distância vertical do pin horizontal aumentada em 55%, `scrub` suavizado para `1.25` e `snap` tornado mais paciente para dar mais tempo de leitura entre produtos

---

## [2026-05-05] FEAT — Produtos: square indicator e animações técnicas

**Agente:** Codex
**Sessão:** Camada de animação da seção Produtos

### Alterado
- `css/components/produtos.css` — adicionados square indicators no bloco de texto e na linha técnica da imagem; progress indicator ganhou quadrado ativo; estados ativos com rotação e transições alinhadas ao padrão visual das seções existentes
- `js/animations/produtos-tabs.js` — entrada ativa dos produtos agora anima imagem com `clip-path`, texto com stagger lateral refinado, scale mais sutil e parallax leve via `containerAnimation` durante o scroll horizontal

---

## [2026-05-05] FIX — Scroll entre Diferenciais e Produtos

**Agente:** Codex
**Sessão:** Correção de conflito de pins ScrollTrigger

### Alterado
- `js/animations/diferenciais.js` — adicionado `refreshPriority` alto no pin da seção Diferenciais para garantir cálculo antes da seção Produtos
- `js/animations/produtos-tabs.js` — animação horizontal passou a mover o `.produtos-track` inteiro em vez de cada slide; pin ativado apenas em desktop (`min-width: 1024px`); `end` calculado por altura real da viewport; `refreshPriority` baixo e refresh via `requestAnimationFrame` para evitar início antecipado do pin/snap
- `css/components/produtos.css` — breakpoints alinhados ao JS (`1024px`) para evitar layout horizontal sem pin em tablets

---

## [2026-05-05] STYLE — Produtos: imagem grande à esquerda sem moldura

**Agente:** Codex
**Sessão:** Alinhamento da seção Produtos ao padrão Diferenciais

### Alterado
- `css/components/produtos.css` — removidos grid decorativo, moldura/container da imagem e estilos de quadro; imagem ampliada e fixada à esquerda em todos os slides; textos realinhados à direita com tipografia e espaçamento próximos da seção Diferenciais; fundo mantido no padrão claro do site

---

## [2026-05-05] STYLE — Produtos: fundo claro, imagens maiores e CTA Ver mais

**Agente:** Codex
**Sessão:** Ajuste final de composição da seção Produtos

### Alterado
- `index.html` — CTAs dos produtos alterados de "Solicitar Orçamento" para "Ver mais"
- `css/components/produtos.css` — seção Produtos voltou para o fundo claro padrão `--color-stats-bg`; grid sutil adaptado ao tema claro; imagens ampliadas e centralizadas; textos reposicionados ao lado da imagem com cores escuras e melhor contraste

---

## [2026-05-05] STYLE — Produtos: layout editorial compacto com texto lateral

**Agente:** Codex
**Sessão:** Aproximação visual da referência de cards compactos

### Alterado
- `index.html` — adicionado header visível na seção Produtos com label e headline editorial
- `css/components/produtos.css` — seção convertida para palco escuro minimalista com grid sutil, quadro compacto de imagem e bloco de texto lateral por produto
- `js/animations/produtos-tabs.js` — texto dos produtos passa a surgir lateralmente (`x`) ao ativar cada slide, mantendo scroll horizontal com pin/scrub/snap

---

## [2026-05-05] STYLE — Produtos: vitrine horizontal compacta e minimalista

**Agente:** Codex
**Sessão:** Compactação visual da seção Produtos

### Alterado
- `css/components/produtos.css` — mantida a lógica horizontal com painéis 100vw, mas conteúdo reduzido para cards menores centralizados; imagens com área visual compacta, textos menores, espaçamento mais contido e progress indicator reposicionado

---

## [2026-05-05] STYLE — Produtos: backgrounds semânticos e tipografia refinada

**Agente:** Codex
**Sessão:** Refinamento visual da seção Produtos

### Alterado
- `css/components/produtos.css` — adicionadas variáveis semânticas locais por slide para fundo, superfície de imagem, área de texto e cores de cópia; tipografia revisada com `--font-heading`, tamanhos por tokens/breakpoints, specs mais legíveis e contraste ajustado para slides claros e escuro

---

## [2026-05-05] FIX — Produtos: escala das imagens e sobreposição de texto

**Agente:** Codex
**Sessão:** Ajuste visual da vitrine horizontal de produtos

### Alterado
- `css/components/produtos.css` — imagens contidas com `object-fit: contain`, área visual com padding, indicador movido para o topo e slide pesado alterado para split sem texto absoluto sobre a imagem
- `js/animations/produtos-tabs.js` — escala ativa das imagens reduzida para um efeito mais sutil

---

## [2026-05-05] FEAT — Produtos: vitrine horizontal premium com ScrollTrigger

**Agente:** Codex
**Sessão:** Product showcase horizontal scroll-driven

### Alterado
- `index.html` — specs dos produtos convertidas de lista para linhas limpas, mantendo 3 informações curtas por slide
- `css/components/produtos.css` — seção Produtos reescrita como vitrine horizontal pinned, com painéis 100vw/100svh, layouts alternados, terceiro slide imersivo, indicador de progresso e fallback mobile vertical
- `js/animations/produtos-tabs.js` — módulo GSAP refeito com `xPercent`, `pin`, `scrub`, `snap`, highlight ativo, animação staggered de texto, escala sutil nas imagens e comportamento mobile/reduced-motion

---

## [2026-05-05] FIX — Produtos: espaçamento, tipografia e scroll-driven pin

**Agente:** Claude Code
**Sessão:** Ajuste de layout, tipografia e comportamento scroll na seção Produtos

### Alterado
- `index.html` — kicker trocado de `.eyebrow` para `.produtos-kicker` (evita `::before '— '` do eyebrow)
- `css/components/produtos.css` — espaçamento revisado (trigger padding-block space-6, body gap space-5, body padding-bottom space-10); tipografia padronizada (títulos em --font-body 32px igual ao diferenciais, nums em --font-ui-mono, specs em --font-body text-base); `.produtos-kicker` adicionado igual ao diferenciais-kicker; `.produto-item__name` sem hover ativo (só scroll/click)
- `js/animations/produtos-tabs.js` — adicionado GSAP ScrollTrigger pin no `.produtos-split` (espelho exato do diferenciais); animação de entrada do header e itens; scroll avança os produtos automaticamente

---

## [2026-05-05] FEAT — Seção Produtos repaginada: layout split-screen interativo

**Agente:** Claude Code
**Sessão:** Redesign Produtos — split-screen com imagem sticky e lista expansível

### Alterado
- `index.html` — seção #produtos completamente reescrita: grid de cards removido, substituído por split-screen (lista esquerda + imagem sticky direita); ordem Leve → Média → Pesada; textos reais do cliente
- `css/components/produtos.css` — CSS reescrito do zero para o novo layout
- `js/animations/produtos-tabs.js` — JS reescrito: hover (desktop) / click ativa item, expande specs e troca imagem com transição suave

---

## [2026-05-05] FIX — Proporção corrigida: steps 60% / imagem 40%

**Agente:** Claude Code
**Sessão:** Correção da proporção invertida na seção Diferenciais

### Alterado
- `css/components/diferenciais.css` — `grid-template-columns` corrigido de `1fr / 1.5fr` para `1.5fr / 1fr`; imagem ficava em 60% causando altura absurda com aspect-ratio 4:5; agora steps=60%, imagem=40%, resultado visual aprovado

---

## [2026-05-05] STYLE — Tipografia e container de imagem Diferenciais ajustados à referência

**Agente:** Claude Code
**Sessão:** Font sizes fixos + aspect-ratio retrato na imagem

### Alterado
- `css/components/diferenciais.css`:
  - `.diferenciais-title` → `font-size: 64px` (era clamp)
  - `.diferencial-step__title` → `font-size: 32px`
  - `.diferencial-step__text` → `font-size: 16px`
  - Desktop: `.diferenciais-visual__sticky` → `aspect-ratio: 4/5` substituindo `flex: 1 / min-height` — proporção retrato igual à referência (526×658px)
  - Desktop: `.diferenciais-layout` → `align-items: start` (imagem tem altura própria via aspect-ratio, não precisa de stretch)

---

## [2026-05-05] STYLE — Proporção de colunas Diferenciais ajustada para referência good-fella

**Agente:** Claude Code
**Sessão:** Alinhamento da seção Diferenciais à referência (grid overlay good-fella.com)

### Alterado
- `css/components/diferenciais.css` — grid-template-columns alterado para `1fr / 1.5fr` (40%/60%), espelhando o split de 5/7 colunas da referência; `align-self: start` no timeline para a imagem preencher exatamente a altura dos steps sem ultrapassar

---

## [2026-05-05] STYLE — Redução proporcional da seção Diferenciais

**Agente:** Claude Code
**Sessão:** Redução de escala da seção Diferenciais mantendo proporções

### Alterado
- `css/components/diferenciais.css` — redução uniforme ~25-30% em todos os tamanhos:
  - Título: `clamp(2.4rem→1.75rem, 4→3vw, 4rem→2.75rem)`
  - Margin header: `--space-12 → --space-8`; gap header: `--space-4 → --space-3`
  - Gap entre steps (mobile): `--space-8 → --space-6`; (768px): `--space-9 → --space-6`; (1024px): `clamp(space-7,3vh,space-9) → clamp(space-5,2vh,space-6)`
  - Título do step: `32px → 22px`; texto do step: `text-base → text-sm`
  - Imagem mobile: `min-height clamp(28rem,78vw,38rem) → clamp(18rem,55vw,26rem)`
  - Imagem desktop: `min-height clamp(32rem,60vh,44rem) → clamp(22rem,45vh,32rem)`
  - Padding da seção desktop: `clamp(space-20,8vw,space-32) → clamp(space-12,5vw,space-20)`
  - Gap do layout desktop: `clamp(space-12,6vw,space-24) → clamp(space-8,4vw,space-16)`
  - Padding-left timeline: `--space-10 → --space-8`

---

## [2026-05-05] FIX — Background da página e layout da seção Diferenciais

**Agente:** Claude Code
**Sessão:** Correção background #EEEEEE e quebra de layout diferenciais no fim do scroll

### Alterado
- `css/typography.css` — `body { background-color }` alterado de `var(--color-bg)` (#1C2430) para `#EEEEEE`
- `css/components/diferenciais.css` — removido `position: sticky` e `top:` de `.diferenciais-visual__sticky` em desktop (conflitava com o `ScrollTrigger.pin()` do JS, causando quebra visual no último passo); substituído por `position: relative` + `.diferenciais-visual { display: flex; flex-direction: column }` e `.diferenciais-visual__sticky { flex: 1 }` para preenchimento correto da imagem

---

## [2026-05-01] STYLE — Scroll virtual nos diferenciais sem alterar layout

**Agente:** Codex
**Sessão:** Ajuste de ritmo da timeline de diferenciais

### Alterado
- `css/components/diferenciais.css` — removida a altura mínima dos itens no desktop, mantendo o layout compacto anterior da timeline.
- `js/animations/diferenciais.js` — troca dos pilares no desktop passou a usar `ScrollTrigger` com pin e duração virtual maior, exigindo mais rolagem entre itens sem aumentar o tamanho visual dos textos.

---

## [2026-05-01] STYLE — Scroll dos diferenciais mais longo entre pilares

**Agente:** Codex
**Sessão:** Ajuste de ritmo da timeline de diferenciais

### Alterado
- `css/components/diferenciais.css` — no desktop, cada `.diferencial-step` ganhou altura mínima responsiva e o gap da timeline foi zerado, aumentando a distância de scroll entre trocas.
- `js/animations/diferenciais.js` — ponto de foco do cálculo do item ativo ajustado para `46%` da viewport, deixando a troca mais estável com a imagem sticky.

---

## [2026-05-01] REFACTOR — Hero troca block reveal por clip reveal editorial

**Agente:** Codex
**Sessão:** Substituição da animação principal do hero

### Alterado
- `index.html` — atributos do hero trocados de `data-block-reveal` para `data-hero-reveal`.
- `css/components/hero.css` — removida estrutura de máscara/bloco e adicionados estados iniciais de clip reveal com `clip-path`, `opacity` e `translateY`.
- `js/animations/hero.js` — animação do hero reescrita para revelar os textos por `clip-path` com stagger suave, mantendo CTA, imagem e scroll indicator.
- `js/gsap-setup.js` — removido `blockReveal`, pois a animação voltou a usar o easing `machado`.

---

## [2026-05-01] FIX — Máscara do block reveal não fica sobre o hero

**Agente:** Codex
**Sessão:** Correção do reveal do hero

### Alterado
- `css/components/hero.css` — conteúdo do block reveal agora mantém camada, cor e tipografia herdadas; máscara recebeu dimensões explícitas.
- `js/animations/hero.js` — máscara do block reveal agora é ocultada com `autoAlpha: 0` ao final da passagem, evitando barras visíveis sobre o texto.

---

## [2026-05-01] FEAT — Hero com block reveal animation

**Agente:** Codex
**Sessão:** Animação premium de reveal no hero

### Alterado
- `index.html` — textos do hero receberam `data-block-reveal` e temas de máscara nos dois versos do título.
- `css/components/hero.css` — adicionada estrutura reutilizável de block reveal com container mascarado, conteúdo e bloco absoluto, incluindo fallback para `prefers-reduced-motion`.
- `js/animations/hero.js` — animação de caracteres substituída por block reveal reutilizável que cria camadas de conteúdo/máscara, faz o bloco atravessar o texto e revela o conteúdo com fade + translateY.
- `js/gsap-setup.js` — adicionado CustomEase `blockReveal` com curva `0.22, 1, 0.36, 1`.

---

## [2026-05-01] STYLE — Square gira apenas na troca de pilar

**Agente:** Codex
**Sessão:** Ajuste da rotação do indicador da timeline

### Alterado
- `css/components/diferenciais.css` — removida rotação contínua do square e adicionada variável `--indicator-rotation` aplicada no `::before`.
- `js/animations/diferenciais.js` — indicador agora incrementa a rotação via GSAP somente quando o item ativo muda durante o scroll.

---

## [2026-05-01] FIX — Square dos diferenciais gira sem sair do eixo

**Agente:** Codex
**Sessão:** Correção da rotação do indicador da timeline

### Alterado
- `css/components/diferenciais.css` — rotação do indicador movida para `.diferenciais-indicator::before`, mantendo o elemento pai responsável apenas pelo deslocamento vertical e evitando o efeito de órbita.

---

## [2026-05-01] STYLE — Step ativo desloca inteiro e indicador gira

**Agente:** Codex
**Sessão:** Ajuste de microinteração da timeline de diferenciais

### Alterado
- `css/components/diferenciais.css` — deslocamento de 40px movido do conteúdo para o `.diferencial-step.is-active` inteiro, incluindo número e texto; indicador ampliado para `1rem` e animado com rotação contínua no próprio eixo via `@keyframes`.
- `js/animations/diferenciais.js` — removido controle de rotação do tween do indicador para evitar conflito com a animação CSS.

---

## [2026-05-01] STYLE — Texto ativo dos diferenciais desloca à direita

**Agente:** Codex
**Sessão:** Ajuste de microinteração da timeline de diferenciais

### Alterado
- `css/components/diferenciais.css` — conteúdo textual do `.diferencial-step.is-active` agora desloca `--space-10` (40px) para a direita com transição suave, respeitando `prefers-reduced-motion`.

---

## [2026-05-01] STYLE — Timeline de diferenciais mais fluida

**Agente:** Codex
**Sessão:** Suavização da animação da seção diferenciais

### Alterado
- `js/animations/diferenciais.js` — movimento do indicador agora cancela o tween anterior antes de iniciar o próximo, usa `duration: 0.72`, `power3.out` e `overwrite: auto` para evitar travadas.
- `css/components/diferenciais.css` — transições de passos e imagens alongadas para suavizar opacidade, escala e crossfade.

---

## [2026-05-01] STYLE — Detalhes dos pilares no azul padrão

**Agente:** Codex
**Sessão:** Ajuste de cor da timeline de diferenciais

### Alterado
- `css/variables.css` — `--color-process-accent` agora aponta para `--color-primary`, deixando kicker e indicador da seção `#diferenciais` no azul padrão Machado.

---

## [2026-05-01] STYLE — Refinos visuais da timeline de diferenciais

**Agente:** Codex
**Sessão:** Ajustes pós-implementação da seção diferenciais

### Alterado
- `index.html` — seção `#diferenciais` trocada de `section--dark` para `section--light` e timeline passou a usar um único `.diferenciais-indicator` móvel em vez de um indicador por item.
- `css/components/diferenciais.css` — fundo da seção alterado para `--color-white`, textos em tons escuros, heading menor em linha única, título dos passos fixado em `32px`, números em `--font-ui-mono`, imagem com card arredondado e lista compactada para caber visualmente dentro da altura da imagem.
- `js/animations/diferenciais.js` — indicador laranja agora se desloca verticalmente com `gsap.to()` para acompanhar o item ativo, seguindo o comportamento do indicador da navbar.

---

## [2026-05-01] FEAT — Diferenciais como timeline interativa por scroll

**Agente:** Codex
**Sessão:** Recriação da seção Por que Machado?

### Alterado
- `index.html` — seção `#diferenciais` reestruturada de cards estáticos para timeline de cinco pilares com passos numerados, indicador ativo e painel visual com cinco imagens reais da galeria.
- `css/variables.css` — adicionado token `--color-process-accent` para o indicador laranja da timeline sem hardcode no componente.
- `css/components/diferenciais.css` — componente recriado com layout editorial em duas colunas, imagem sticky no desktop, estados ativo/inativo, crossfade suave de imagens e responsivo mobile sem sticky.
- `js/main.js` — importado e inicializado `initDiferenciais()` junto às animações principais.

### Criado
- `js/animations/diferenciais.js` — módulo isolado para ativar pilares conforme o scroll, alternar imagens, animar entrada inicial e respeitar `prefers-reduced-motion`.

---

## [2026-05-01] STYLE — Hover suave no label dos stats

**Agente:** Codex
**Sessão:** Microinteração dos textos inferiores da social-proof

### Alterado
- `css/components/social-proof.css` — `.stat-label-wrapper` agora recebe transição de transform e desloca `--space-2` para a direita no hover do `.stat-card`, evitando conflito com o transform inline que o GSAP aplica no `.stat-label`; fallback mantido em `prefers-reduced-motion`.

---

## [2026-05-01] STYLE — Label e square dos stats maiores

**Agente:** Codex
**Sessão:** Ajuste visual dos textos inferiores da social-proof

### Alterado
- `css/components/social-proof.css` — `.stat-label` aumentado para `clamp(1.15rem, 1.25vw, 1.35rem)`, `.stat-square` ampliado para `0.8rem` e espaçamento entre square/texto ajustado para `--space-3`.

---

## [2026-05-01] FIX — Contadores social-proof em valores absolutos

**Agente:** Codex
**Sessão:** Ajuste de texto dos contadores da social-proof

### Alterado
- `index.html` — contadores da social-proof alterados de 4mil+/2mil+ para 4000+/2000+, com `data-count` usando os valores absolutos para preservar a animação.
- `css/components/social-proof.css` — removida a classe `.stat-number__unit`, que não é mais usada após a troca para 4000+/2000+.
- `js/animations/stats.js` — contagem da social-proof permanece formatando apenas números inteiros, agora com alvos 4000 e 2000; os valores são inicializados em `0` e animados por um gatilho dedicado na seção inteira com `IntersectionObserver`, separado da timeline visual dos cards e independente da posição horizontal de cada card.
- `js/main.js` — `initStats()` passou a rodar logo no `DOMContentLoaded`, antes do loader, para preparar o contador sem depender do fim da animação inicial.
- `js/animations/counters.js` — contadores genéricos agora ignoram elementos dentro de `[data-stats-card]`, evitando sobrescrever `4mil` e `2mil` depois da animação específica da social-proof.

---

## [2026-05-01] STYLE — Social-proof em linha horizontal com cards 440x600

**Agente:** Codex
**Sessão:** Ajuste de dimensões da seção social-proof

### Alterado
- `css/components/social-proof.css` — seção social-proof ajustada para grid horizontal fixo com quatro colunas de 440px, cards e imagem com 440px x 600px, gap de `--space-5` (20px) e container centralizado na página, mantendo todos os itens lado a lado com rolagem horizontal quando necessário.

---

## [2026-05-01] STYLE — Hero image ancorada no canto inferior direito

**Agente:** Codex
**Sessão:** Ajuste de posicionamento da imagem principal do hero

### Alterado
- `css/components/hero.css` — `.hero-media` virou camada absoluta com largura de viewport e `.hero-img` agora fica ancorada em `right: 0; bottom: 0`, removendo os offsets negativos por breakpoint que prendiam a imagem à coluna em vez do canto inferior direito da tela.

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
