# PROMPTS.md — Guia Mestre de Prompts
## Machado Plataformas × good-fella.com

> Use este arquivo como seu arsenal. Cada prompt foi escrito para extrair o máximo de qualquer IA (Claude, GPT-4o, Gemini, Codex). Cole o prompt exato, substitua apenas os campos marcados com `[colchetes]`.

---

## 📌 COMO USAR ESTE ARQUIVO

1. **Escolha o prompt** da seção que você quer construir
2. **Cole o CONTEXTO BASE** (Seção 0) antes de qualquer prompt em uma conversa nova
3. **Cole o prompt específico** da seção desejada
4. **Substitua os `[colchetes]`** com seus dados reais
5. Se a IA errar algo, use os **Prompts de Correção** no final

---

---

# 0. CONTEXTO BASE — Cole Sempre no Início de uma Conversa Nova

```
Você vai me ajudar a construir uma landing page profissional.

## PROJETO
Cliente: Machado Plataformas
Segmento: Fabricante de plataformas para guincho / implementos rodoviários
Objetivo da página: Converter visitantes em leads via formulário de orçamento e WhatsApp

## REFERÊNCIA VISUAL OBRIGATÓRIA
O layout, estrutura e sistema de animações devem seguir o site good-fella.com:
- Tipografia editorial de alto impacto (fonte display enorme, tracking negativo)
- Fundo escuro dominante (dark navy, não preto puro)
- Animações de reveal por scroll (elementos sobem ao entrar na viewport)
- Navbar transparente que fica opaca ao scrollar
- Loading screen com contador de porcentagem
- Smooth scroll com Lenis
- Cursor customizado (dot + follower)

## STACK TÉCNICA
- HTML5 semântico
- CSS3 com Custom Properties (zero frameworks — sem Bootstrap, sem Tailwind)
- Vanilla JavaScript puro
- GSAP 3.12 (ScrollTrigger + SplitText + CustomEase)
- Lenis para smooth scroll
- Todas as dependências via CDN

## IDENTIDADE VISUAL
Paleta de cores:
  --color-bg:            #1C2430  (fundo principal — dark navy)
  --color-bg-mid:        #2F3B4A  (cards, seções alt)
  --color-bg-light:      #4A5665  (bordas, detalhes)
  --color-steel:         #A7B0BA  (texto secundário)
  --color-surface:       #F2F4F6  (seções claras)
  --color-primary:       #1A4B82  (azul — CTA principal)
  --color-primary-light: #5B9BD5  (azul claro — hover, ícones)
  --color-text:          #F2F4F6  (texto principal)
  --color-text-muted:    #A7B0BA  (texto secundário)
  --color-border:        #2F3B4A  (divisores)
  --color-whatsapp:      #25D366  (botão WhatsApp)

Tipografia:
  Display/Hero: fonte 'Machado' (METAG___.TTF) — somente em headlines máximas
  Headings:     'Barlow Condensed' (Google Fonts) — Bold/Black
  Body:         'Barlow' (Google Fonts) — Regular/Medium
  Mono/Números: 'DM Mono' (Google Fonts)

Ease GSAP personalizado:
  CustomEase.create("machado", "0.16, 1, 0.3, 1");

## REGRAS ABSOLUTAS
1. Nunca usar Bootstrap, Tailwind ou qualquer framework CSS
2. Nunca hardcodar cores — sempre usar as variáveis CSS acima
3. A fonte Machado (METAG___.TTF) é usada SOMENTE em headlines hero — nunca em body, labels ou botões
4. Guard clause obrigatória em todo módulo JS: if (!el) return;
5. Sem markers: true no ScrollTrigger em produção
6. Nunca usar setTimeout para timing de animação — usar GSAP delays
7. Imagens com loading="lazy" abaixo do fold
8. Vídeo hero: autoplay muted loop playsinline
```

---

---

# 1. PROMPT — Estrutura Base (HTML + CSS Reset + Variables)

```
Com base no contexto do projeto Machado Plataformas acima, crie os arquivos base:

## ARQUIVOS NECESSÁRIOS

### 1. index.html
Crie o HTML completo com:
- DOCTYPE, meta tags (charset, viewport, description, OG tags)
- Import das fontes Google: Barlow Condensed (400,600,700,800,900) + Barlow (300,400,500,600) + DM Mono (400,500)
- Import de todos os CSS em ordem: reset → variables → typography → layout → animations → cada componente
- CDN scripts em ordem: Lenis → GSAP → ScrollTrigger → SplitText → CustomEase
- Estrutura HTML de TODAS as 12 seções (pode usar placeholder de conteúdo)
- Cursor elements (#cursor e #cursor-follower) antes do body content
- Loading screen (#loader) com logo, barra de progresso e número de porcentagem
- type="module" no script main.js

As 12 seções em ordem:
1. #navbar — logo esq + menu central (Serviços, Produtos, Galeria, Sobre, Contato) + CTA "FAÇA SEU ORÇAMENTO" dir
2. #hero — headline grande (h1 com classe hero-title), subtítulo, 2 CTAs, produto à direita
3. #social-proof — 4 stats com data-count e data-suffix, labels abaixo
4. #diferenciais — 5 cards com ícone SVG, título e texto
5. #produtos — 4 cards: Linha Pesada / Linha Média / Linha Leve / Linha Urbano
6. #galeria — grid de 8 fotos com overlay de hover
7. #sobre — texto + foto fábrica + badge de ano
8. #cta-mid — frase impactante + botão WhatsApp + botão formulário
9. #financiamento — ícones de pagamento + texto resumo
10. #depoimentos — 3 cards com foto, nome, empresa, texto
11. #contato — formulário (5 campos) + info contato + mapa embed
12. #footer — logo + links + dados legais

### 2. css/reset.css
Reset moderno: box-sizing, margin 0, padding 0, img e video como block, smooth scroll behavior

### 3. css/variables.css
Todas as CSS Custom Properties do projeto:
- Cores (conforme paleta acima)
- Tipografia: --font-display, --font-heading, --font-body, --font-mono
- Escala de texto: --text-xs até --text-display (com clamp para hero e display)
- Pesos: --weight-light até --weight-black
- Line-heights e letter-spacing
- Espaçamentos: --space-1 até --space-40
- Container: --container-max (1440px), --container-default (1200px), --container-padding (clamp)
- Seção padding: --section-sm, --section-md, --section-lg
- Durações de animação: --dur-fast até --dur-crawl
- Border-radius: --radius-sm, --radius-md, --radius-lg

Entregue os 3 arquivos completos e funcionais.
```

---

---

# 2. PROMPT — Loading Screen

```
Com base no contexto Machado Plataformas, crie a loading screen completa.

## O QUE CRIAR

### HTML (já dentro do index.html, #loader)
```html
<div id="loader" class="loader">
  <div class="loader__inner">
    <img src="./assets/images/logo/logo.svg" alt="Machado Plataformas" class="loader__logo" width="180">
    <div class="loader__bar-wrapper">
      <div class="loader__bar" id="loader-bar"></div>
    </div>
    <span class="loader__number" id="loader-progress">0%</span>
  </div>
</div>
```

### css/components/navbar.css — apenas o loader
- Fullscreen fixed, z-index 9999, fundo #1C2430
- Logo centralizado com fade in ao carregar
- Barra de progresso fina (3px) na parte inferior, cor #1A4B82, cresce de 0% a 100% via width
- Número grande (Barlow Condensed Black, 80-100px) centralizado, cor #F2F4F6
- Saída: o loader inteiro sobe e sai da tela (transform: translateY(-100%))

### js/loader.js
```javascript
export function initLoader() {
  return new Promise((resolve) => {
    // 1. Pegar elementos
    // 2. Animar número de 0 a 100 com gsap (2s, ease power2.inOut)
    // 3. Animar barra de progresso junto
    // 4. Ao chegar em 100%, aguardar 0.2s, depois:
    //    - loader sobe com gsap.to (yPercent: -100, 0.9s, ease "machado")
    //    - onComplete: resolve() a Promise
    // 5. Safety timeout: resolve() após 5s mesmo se falhar
    // 6. Bloquear overflow do body durante loading, liberar ao resolver
  });
}
```

Entregue o CSS completo da loading screen e o JS completo do loader.js.
```

---

---

# 3. PROMPT — Navbar

```
Com base no contexto Machado Plataformas, crie a navbar completa.

## ESPECIFICAÇÕES

Layout: Logo esquerda + Links centro + CTA direita
Altura: 72px desktop, 60px mobile
Fundo inicial: transparente
Fundo ao scrollar (> 80px): rgba(28, 36, 48, 0.96) com backdrop-filter: blur(12px)
Transição de estado: suave, 0.4s

Links desktop:
- Serviços | Produtos | Galeria | Sobre | Contato
- Fonte: Barlow Condensed SemiBold, 13px, letter-spacing 0.15em, uppercase
- Cor: #A7B0BA
- Hover: #5B9BD5, transição 200ms

CTA "FAÇA SEU ORÇAMENTO":
- Background: #1A4B82
- Texto: #FFFFFF, Barlow Condensed SemiBold, uppercase, tracking 0.1em
- Padding: 12px 24px
- Hover: background #5B9BD5
- Atributo data-magnetic

Mobile (< 768px):
- Hamburger button (2 linhas que viram X)
- Menu fullscreen que desce com animação (translateY)
- Links grandes centralizados

### ARQUIVOS
Crie: css/components/navbar.css + o trecho JS necessário em main.js para:
1. Detectar scroll e adicionar classe .is-scrolled ao navbar
2. Abrir/fechar menu mobile com GSAP
3. Fechar menu ao clicar em link âncora
4. Smooth scroll via Lenis ao clicar nos links

Entregue HTML do navbar, CSS completo e JS de comportamento.
```

---

---

# 4. PROMPT — Hero Section

```
Com base no contexto Machado Plataformas, crie a hero section completa.

## LAYOUT (baseado no mockup fornecido)
Split 50/50: texto à esquerda, produto à direita
Altura: 100vh mínimo
Fundo: preto (#000) — o produto fotogrado em fundo preto domina

## CONTEÚDO
Esquerda:
- Eyebrow tag: "PLATAFORMAS PARA GUINCHO"
- H1 (hero-title, fonte Machado): "MACHADO PLATAFORMAS" (ou linha 1 "FORÇA" + linha 2 "QUE MOVE")
- Subtítulo (Barlow Regular 16-18px, #A7B0BA): "[subtítulo descritivo do produto]"
- CTA 1 (primary): "FAÇA SEU ORÇAMENTO"
- CTA 2 (ghost): "CONHEÇA OS PRODUTOS"

Direita:
- Imagem/vídeo do produto (plataforma/guincho em fundo preto com leve glow azul no produto)
- Tag flutuante opcional: "15 anos de mercado"

Scroll indicator: seta animada ou texto "SCROLL" na parte inferior esquerda

## ANIMAÇÕES (com GSAP — após loader completar)
1. Eyebrow: fade up, opacity 0→1, y 20→0, 0.6s, delay 0.1s
2. H1 (hero-title): SplitText em chars, yPercent 110→0, stagger 0.025s, 1.2s, ease "machado"
3. Subtítulo: SplitText em lines, y 30→0, opacity 0→1, stagger 0.1s, 0.8s, delay -0.4s
4. CTAs: fade up, y 20→0, opacity 0→1, 0.6s, delay -0.2s
5. Imagem/vídeo direita: scale 1.1→1, opacity 0→1, 1.4s, ease "machado"

## CSS
- Usar CSS Grid para o split 50/50
- Imagem à direita: object-fit: cover, height: 100%
- Overlay sutil no fundo do texto: gradiente da esquerda para transparente
- No mobile: coluna única, produto abaixo do texto

Crie: HTML da seção hero, css/components/hero.css e js/animations/hero.js
```

---

---

# 5. PROMPT — Seção Prova Social (Números + Selos)

```
Com base no contexto Machado Plataformas, crie a seção de prova social.

## CONTEÚDO
4 estatísticas em linha horizontal:
- 15+ / Anos de Experiência
- 500+ / Plataformas Entregues  
- 200+ / Clientes Atendidos
- 12 / Estados Atendidos

Atributos HTML nos números:
  data-count="15" data-suffix="+"
  data-count="500" data-suffix="+"
  data-count="200" data-suffix="+"
  data-count="12" data-suffix=""

Abaixo dos números (opcional): logos/selos de certificação (INMETRO, NBR) — placeholders por enquanto

## VISUAL
- Fundo: #2F3B4A (levemente diferente do body para criar contraste)
- Números: Barlow Condensed Black ou DM Mono, 60-72px, #F2F4F6
- Suffix (+): cor #5B9BD5, mesmo tamanho
- Labels: Barlow Regular 14px, #A7B0BA, uppercase, tracking 0.1em
- Separadores: linha vertical 1px #4A5665 entre cada stat
- Mobile: 2x2 grid

## ANIMAÇÕES
- Seção entrada: fade up da seção inteira ao entrar na viewport
- Números: counter animado de 0 ao valor final ao entrar na viewport (once: true)
- Ease dos counters: power2.out, 2.5s

Crie: HTML da seção, css/components/social-proof.css e js/animations/counters.js
```

---

---

# 6. PROMPT — Seção Diferenciais (5 Pilares)

```
Com base no contexto Machado Plataformas, crie a seção de diferenciais.

## CONTEÚDO (5 pilares)
1. Aço de Alta Resistência — Estrutura com aço certificado NBR, resistência comprovada em operação
2. Fabricação Própria — Controle total de qualidade, do corte ao acabamento final
3. Garantia de Fábrica — [X] anos de garantia em estrutura e componentes principais
4. Entrega em Todo o Brasil — Logística especializada para implementos de grandes dimensões
5. Suporte Técnico — Equipe especializada para instalação, manutenção e assistência

## ESTRUTURA DE CADA CARD
- Número: "01", "02"... em DM Mono, canto superior, cor #4A5665
- Ícone SVG (criar ícones simples e geométricos inline para cada pilar)
- Título: Barlow Condensed Bold 22px
- Texto: Barlow Regular 15px, #A7B0BA, max 2 linhas
- Linha de rodapé: 1px #2F3B4A que vira #1A4B82 no hover

## LAYOUT
- Grid 5 colunas desktop (1 por diferencial)
- 3 colunas tablet, 2 colunas mobile (2-2-1 ou scroll horizontal)
- Cards sem background (fundo do body), só a borda superior que acende no hover

## ANIMAÇÕES
- Entrada: cards aparecem em cascata (stagger 0.1s) ao entrar na viewport
- Hover: ícone faz scale 1→1.15, número muda de cor para #5B9BD5, linha inferior acende

Crie: HTML da seção, css/components/diferenciais.css.
Crie ícones SVG simples para cada um dos 5 pilares (inline, 40x40px, stroke style, cor currentColor).
```

---

---

# 7. PROMPT — Seção Produtos (4 Cards)

```
Com base no contexto Machado Plataformas, crie a seção de produtos.

## 4 PRODUTOS
1. Linha Pesada — Para guincho pesado e semirreboque / Carga máxima: [X]t
2. Linha Média — Versatilidade para uso intenso / Carga máxima: [X]t
3. Linha Leve — Compacta e eficiente / Carga máxima: [X]t
4. Linha Urbano — Para cidades e acessos restritos / Carga máxima: [X]t

## ESTRUTURA DE CADA CARD
```
[imagem do produto — 100% width, aspect-ratio 4/3, object-fit: cover]
[badge categoria: "LINHA PESADA" — Barlow Condensed, uppercase, #1A4B82 bg]
[nome do produto — Barlow Condensed Bold 24px]
[spec principal — ex: "Carga: até Xt" — DM Mono 13px, #5B9BD5]
[link "Ver Catálogo →" — Barlow SemiBold 14px, cor muda no hover]
```

## COMPORTAMENTO DE HOVER DO CARD
- Borda do card: 1px #2F3B4A → 1px #5B9BD5 (transição 0.3s)
- Imagem: scale 1→1.06 (0.5s ease)
- Badge: background #1A4B82 → #5B9BD5
- Seta do link: translateX 0→6px

## LAYOUT
- Grid 4 colunas desktop
- 2 colunas tablet
- 1 coluna mobile (scroll vertical)
- Gap: 24px
- Card background: #2F3B4A
- Border-radius: 4px (sutil)

## SEÇÃO
- Header: eyebrow "CATÁLOGO" + H2 "Nossas Linhas" + link "Ver Todos →" na direita
- CTA abaixo do grid: "Precisa de ajuda para escolher? Fale com nosso consultor" + botão WhatsApp

## ANIMAÇÕES
Entrada em cascata: scale 0.96→1, opacity 0→1, stagger 0.12s, ease "machado"

Crie: HTML completo da seção, css/components/produtos.css.
```

---

---

# 8. PROMPT — Galeria

```
Com base no contexto Machado Plataformas, crie a seção de galeria.

## LAYOUT
Grid com 8 fotos em layout assimétrico (masonry-style usando CSS Grid):
- 2 fotos grandes (spans 2 colunas ou 2 linhas)
- 6 fotos médias/pequenas
- Sem border-radius nas imagens (bordas retas — estética industrial)
- Gap: 12px entre fotos
- Desktop: 4 colunas, mobile: 2 colunas

## HOVER DE CADA FOTO
- Overlay escuro (rgba 0,0,0,0.6) aparece com fade
- Ícone de lupa/expand centralizado (SVG branco, 32px)
- Leve scale 1.03 na imagem
- Cursor muda para pointer

## LAYOUT SUGERIDO (CSS Grid areas)
```
[grande] [pequena] [pequena] [media]
[grande] [media  ] [pequena] [pequena]
```

## SEÇÃO
- Título: "APLICAÇÕES REAIS" — Barlow Condensed Black
- Subtítulo: "Nossas plataformas em operação"
- CTA abaixo: "Ver mais projetos no Instagram →"

## ANIMAÇÕES
- Fotos revelam scale 1.08→1 com opacity 0→1 ao entrar na viewport
- Stagger 0.07s entre fotos
- Cada foto tem seu próprio ScrollTrigger (start: "top 88%")

Use imagens placeholder (https://picsum.photos/800/600?random=N) enquanto as reais não chegam.

Crie: HTML completo, css/components/galeria.css.
```

---

---

# 9. PROMPT — Seção Sobre

```
Com base no contexto Machado Plataformas, crie a seção "Sobre".

## LAYOUT
Grid 2 colunas: texto esquerda (55%), imagem direita (45%)
Mobile: coluna única, imagem primeiro

## CONTEÚDO
Esquerda:
- Eyebrow: "NOSSA HISTÓRIA"
- H2: "Fabricando força há [X] anos"
- Parágrafo 1: "[Texto institucional — origem da empresa, missão, localização]"
- Parágrafo 2: "[Diferenciais, equipe, compromisso com qualidade]"
- Mini stats inline: ícone + texto (ex: 🏭 Fábrica Própria | ✅ ISO [XXXX] | 📍 [Cidade, Estado])
- Botão: "CONHEÇA A FÁBRICA" (ghost) ou link para vídeo

Direita:
- Foto da fábrica / equipe (sem border-radius, ocupa 100% da coluna)
- Badge flutuante no canto da imagem: ano de fundação "DESDE [ANO]" em DM Mono, background #1A4B82

## VISUAL
- Fundo da seção: levemente diferente (#2F3B4A ou manter #1C2430)
- Linha vertical fina #4A5665 entre as duas colunas (desktop)

## ANIMAÇÕES
- Texto (esquerda): linhas sobem com SplitText, stagger 0.08s
- Imagem (direita): scale 1.08→1, opacity 0→1, delay 0.3s
- Badge: bounce suave ao entrar na viewport (scale 0→1, ease elastic.out)

Crie: HTML completo, css/components/sobre.css.
```

---

---

# 10. PROMPT — CTA Intermediário + Financiamento

```
Com base no contexto Machado Plataformas, crie 2 seções seguidas.

## SEÇÃO A — CTA INTERMEDIÁRIO (#cta-mid)
Faixa de conversão no meio da página.

Layout: centralizado, padding vertical generoso (100-140px)
Fundo: gradiente sutil de #1C2430 → #1E3A5F (azul navy profundo) → #1C2430

Conteúdo:
- Headline grande: "PRONTO PARA EQUIPAR SEU GUINCHO?" (Barlow Condensed Black, 48-64px)
- Subtítulo: "Solicite um orçamento sem compromisso. Atendimento em todo o Brasil."
- 2 botões lado a lado:
  * "SOLICITAR ORÇAMENTO" — filled #1A4B82, data-magnetic
  * "FALAR NO WHATSAPP" — filled #25D366 com ícone WhatsApp SVG, data-magnetic

Animações: headline faz SplitText words, botões entram com stagger 0.15s

---

## SEÇÃO B — FINANCIAMENTO (#financiamento)
Fundo: #F2F4F6 (seção clara — contraste com o restante dark)
Texto: dark (#1C2430)

Conteúdo:
- Eyebrow: "FORMAS DE PAGAMENTO"
- Título: "Facilitamos sua aquisição" (Barlow Condensed Bold, cor #1C2430)
- Subtítulo: "Trabalhamos com as principais opções do mercado"
- Grid de ícones/logos de pagamento (5-6 ícones):
  * Boleto Bancário
  * Transferência / PIX
  * Financiamento (BNDES ou banco parceiro)
  * Cartão (se aplicável)
  * Leasing
- Texto de apoio: "Consulte nossas condições especiais para frotas e transportadoras."
- Botão: "CONSULTAR CONDIÇÕES" — outline azul (não filled, pois fundo é claro)

Criar ícones SVG simples para cada forma de pagamento.

Crie: HTML de ambas, css/components/cta-interstitial.css, css/components/financiamento.css.
```

---

---

# 11. PROMPT — Depoimentos

```
Com base no contexto Machado Plataformas, crie a seção de depoimentos.

## ESTRUTURA DE CADA CARD
- 5 estrelas SVG (#FFB800 — dourado)
- Texto do depoimento (entre aspas, Barlow Regular 16px, #F2F4F6, max 3 linhas)
- Separador: linha 1px #4A5665
- Foto circular do cliente (60px, border 2px #5B9BD5)
- Nome: Barlow Condensed Bold 16px, #F2F4F6
- Empresa/cargo: Barlow Regular 13px, #A7B0BA

## LAYOUT
- Desktop: 3 cards visíveis lado a lado
- Tablet: 2 cards
- Mobile: 1 card + swipe manual
- Cards não precisam de JS de slider complexo — usar CSS scroll snapping + botões prev/next simples
- Background dos cards: #2F3B4A, border 1px #4A5665

## NAVEGAÇÃO
Botões prev/next (setas) nos cantos direito/esquerdo:
- Barlow Condensed, 40x40px, border 1px #4A5665
- Hover: border #5B9BD5, background #2F3B4A

## 3 DEPOIMENTOS PLACEHOLDER
1. "A plataforma da Machado foi a melhor compra que fizemos para nossa frota. Qualidade impecável e entrega dentro do prazo." — [Nome], [Empresa], [Cidade/UF]
2. "Já temos 3 unidades e nunca tivemos problema. O suporte pós-venda é excelente." — [Nome], [Empresa], [Cidade/UF]
3. "Equipamento robusto, bem acabado. Recomendo para qualquer transportadora que precisa de confiabilidade." — [Nome], [Empresa], [Cidade/UF]

## ANIMAÇÕES
- Cards entram com fade + translateX da direita, stagger 0.1s
- Botões prev/next com efeito magnético (data-magnetic)

Crie: HTML completo, css/components/depoimentos.css, JS mínimo para navegação prev/next.
```

---

---

# 12. PROMPT — Seção Contato + Footer

```
Com base no contexto Machado Plataformas, crie as seções finais.

## SEÇÃO CONTATO (#contato)
Layout: 2 colunas — formulário esquerda (60%), info contato direita (40%)

### Formulário
Campos:
1. Nome completo * (text input)
2. Empresa / Razão Social (text input)
3. Telefone / WhatsApp * (tel input, placeholder: "(00) 00000-0000")
4. Produto de interesse (select: "Linha Pesada / Linha Média / Linha Leve / Linha Urbano / Ainda não sei")
5. Mensagem / Observações (textarea, 4 linhas)
6. Botão submit: "ENVIAR SOLICITAÇÃO"

Estilo dos campos:
- Background: #2F3B4A
- Border: 1px solid #4A5665
- Focus: border #5B9BD5 + box-shadow: 0 0 0 3px rgba(91,155,213,0.15)
- Labels: Barlow Condensed, uppercase, 12px, tracking 0.15em, #A7B0BA
- Placeholder: #4A5665 (sutil)
- Validation: borda vermelha (#E55C5C) se campo obrigatório vazio ao submeter

### Info Contato (coluna direita)
- "Prefere falar direto?" → botão grande WhatsApp (#25D366)
- Telefone: (clicável tel:)
- Email: (clicável mailto:)
- Endereço: [Cidade, Estado]
- Google Maps embed (iframe) abaixo — height 250px, sem border-radius

---

## FOOTER (#footer)
Fundo: #0F1823 (mais escuro que o body — cria peso final)
Linha superior: 1px #2F3B4A

Estrutura (4 colunas desktop):
Col 1: Logo (100px) + tagline curta + ícones de redes sociais (Instagram, Facebook, LinkedIn)
Col 2: Links "Produtos" → (Linha Pesada, Média, Leve, Urbano)
Col 3: Links "Empresa" → (Sobre, Galeria, Depoimentos, Contato)
Col 4: Dados legais: CNPJ: [XX.XXX.XXX/XXXX-XX] | [Razão Social] | [Endereço] | [Cidade-UF]

Copyright bar (abaixo, linha separadora):
"© [ANO] Machado Plataformas. Todos os direitos reservados."
Alinhado: esquerda copyright, direita "Desenvolvido por [nome]"

## ANIMAÇÕES FOOTER
- Headline gigante "MACHADO" em Barlow Condensed Black (como good-fella.com faz no footer)
- Aparece com scale 0.95→1 ao entrar na viewport

Crie: HTML completo de ambas, css/components/contato.css, css/components/footer.css.
Inclua JS mínimo de validação do formulário (sem bibliotecas externas).
```

---

---

# 13. PROMPT — Sistema de Animações Global

```
Com base no contexto Machado Plataformas, crie os módulos JS de animação global.

## ARQUIVOS A CRIAR

### js/gsap-setup.js
```javascript
// Registrar plugins e criar eases customizados
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase);
CustomEase.create("machado", "0.16, 1, 0.3, 1");
CustomEase.create("snap", "0.87, 0, 0.13, 1");
```

### js/lenis.js
```javascript
// Setup do Lenis com integração correta ao GSAP ScrollTrigger
// Exportar a instância para uso em outros módulos se necessário
export function initLenis() { ... }
```

### js/animations/scroll-triggers.js
Criar ScrollTriggers para TODAS as seções, usando data attributes:
- [data-animate="fade-up"] → opacity 0→1, y 60→0
- [data-animate="fade-in"] → opacity 0→1 (sem movimento)
- [data-animate="slide-left"] → opacity 0→1, x -60→0
- [data-animate="slide-right"] → opacity 0→1, x 60→0
- [data-animate="scale-in"] → opacity 0→1, scale 0.92→1
- [data-animate="lines"] → SplitText lines, yPercent 110→0 com máscara
- [data-delay="0.2"] → adicionar delay ao elemento

Todos os elementos animados com esses data attributes revelam ao entrar na viewport.
Config padrão ScrollTrigger: start "top 85%", toggleActions "play none none reverse"

### js/animations/cursor.js
Cursor customizado:
- #cursor: dot 10px, background #5B9BD5
- #cursor-follower: ring 36px, border 1.5px solid #5B9BD5
- Dot segue o mouse imediatamente (duration 0.08s)
- Follower com delay suave (duration 0.5s, ease power2.out)
- Estado .is-hovering: dot vira ring vazio, follower desaparece
- Desabilitado em (hover: none) — touch devices

### js/animations/magnetic.js
Efeito magnético para todos os [data-magnetic]:
- Strength padrão: 0.25 (pode ser sobrescrito via data-magnetic="0.4")
- mousemove: gsap.to com x/y calculados, 0.4s, power2.out
- mouseleave: retorno a 0/0, 0.8s, elastic.out(1, 0.4)

### js/main.js
Arquivo de entrada que importa e inicializa tudo na ordem correta.
Incluir tratamento de erro: se algum módulo falhar, os outros continuam funcionando.

Crie todos os arquivos JS completos e funcionais.
```

---

---

# 14. PROMPT — CSS Layout + Typography

```
Com base no contexto Machado Plataformas, crie os arquivos CSS base de layout e tipografia.

## css/typography.css

@font-face para fonte Machado:
- family: 'Machado'
- src: url('../assets/fonts/METAG___.TTF') format('truetype')
- font-display: swap

Classes utilitárias de tipografia:
- .display → font-family Machado, --text-display, leading-none, tracking-tight
- .headline → Barlow Condensed Black, --text-5xl, leading-tight
- .subheadline → Barlow Condensed Bold, --text-3xl
- .body-lg → Barlow Regular, --text-lg, leading-normal
- .body → Barlow Regular, --text-base, leading-normal
- .body-sm → Barlow Regular, --text-sm
- .eyebrow → Barlow Condensed SemiBold, --text-sm, uppercase, tracking 0.2em, cor #5B9BD5
- .mono → DM Mono Regular, --text-base
- .caption → Barlow Regular, --text-xs, #A7B0BA

Estilos base para tags:
- h1, h2, h3, h4 com tamanhos e pesos padronizados
- p com line-height e cor padrão
- a com cor e transição
- strong com font-weight 600
- Seleção de texto: background #1A4B82, cor #FFFFFF

---

## css/layout.css

.container:
- max-width: 1200px
- margin: 0 auto
- padding: 0 var(--container-padding)

.container--wide → max-width: 1440px
.container--narrow → max-width: 800px

.section:
- padding: var(--section-md) 0

.section-header:
- margin-bottom: var(--space-16)

.section-title:
- Barlow Condensed Black, --text-5xl, leading-tight, tracking-tight

Grid utilities:
- .grid-2, .grid-3, .grid-4 (com gap e responsive)
- .flex-between, .flex-center, .flex-col

Botões base:
- .btn → base comum (padding, font, uppercase, tracking, transition, cursor, position relative overflow)
- .btn-primary → background --color-primary + hover
- .btn-ghost → border + transparent bg + hover
- .btn-whatsapp → background #25D366 + ícone
- Efeito de ripple/fill no hover via ::before pseudo-element

---

## css/animations.css
Estados iniciais para todos os elementos animados por GSAP:
```css
[data-animate] {
  opacity: 0;
}
[data-animate="fade-up"] {
  transform: translateY(60px);
}
/* etc para cada tipo */

@media (prefers-reduced-motion: reduce) {
  [data-animate] {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

Entregue os 3 arquivos completos.
```

---

---

# 🔧 PROMPTS DE CORREÇÃO (Use quando algo sair errado)

## Correção de Animação que Não Funciona
```
O elemento [descrever elemento] não está animando corretamente.

Verifique:
1. O elemento tem o atributo data-animate correto?
2. O GSAP e ScrollTrigger estão carregados (gsap.version no console)?
3. O estado inicial CSS em animations.css está correto?
4. A integração Lenis + ScrollTrigger usa lenis.on('scroll', ScrollTrigger.update)?

Corrija o código para que [descrever comportamento esperado].
Adicione temporariamente markers: true no ScrollTrigger para debug.
```

## Correção de Responsividade
```
A seção [nome da seção] está quebrando em [375px / 768px / 1024px].

O problema é: [descrever o que está errado].

Corrija usando mobile-first:
- Base: 375px (coluna única)
- @media (min-width: 768px): [descrever layout tablet]
- @media (min-width: 1024px): [descrever layout desktop]

Nunca use valores fixos em px para larguras — usar %, clamp() ou variáveis CSS.
```

## Correção de Tipografia
```
A tipografia da seção [nome] está errada.

Regras do projeto:
- Fonte Machado (METAG___.TTF): SOMENTE em headline hero (#hero .hero-title)
- Headings de seção (h2): Barlow Condensed Black
- H3 e subtítulos: Barlow Condensed Bold
- Body text: Barlow Regular ou Medium
- Labels, eyebrows, botões: Barlow Condensed SemiBold, uppercase
- Números/stats: DM Mono

Corrija a tipografia do [elemento específico] para seguir essas regras.
```

## Correção de Cor
```
A cor do elemento [nome] está incorreta.

NUNCA usar valores hex diretos no CSS — sempre usar variáveis.
Paleta correta:
  --color-bg:            #1C2430
  --color-bg-mid:        #2F3B4A
  --color-primary:       #1A4B82
  --color-primary-light: #5B9BD5
  --color-text:          #F2F4F6
  --color-text-muted:    #A7B0BA
  --color-border:        #2F3B4A

Corrija o elemento [nome] para usar [variável correta].
```

## Correção de Performance
```
A página está lenta / as animações estão travando.

Verifique e corrija:
1. Remover will-change de elementos que não estão animando ativamente
2. Imagens abaixo do fold sem loading="lazy"
3. Verificar se há multiple ScrollTriggers desnecessários
4. Garantir que gsap.ticker.lagSmoothing(0) está ativo
5. Vídeo hero sem preload="metadata" ou poster

Otimize [especificar o que precisa de melhoria].
```

---

---

# 🚀 PROMPT NUCLEAR — Para Quando Você Quer Tudo de Uma Vez

> ⚠️ Use apenas em IAs com contexto muito grande (Claude Opus, GPT-4o com 128k). Para projetos reais, prefira os prompts individuais por seção.

```
Você é um desenvolvedor frontend sênior especializado em sites de alto impacto visual.

Vou te dar o briefing completo de um projeto. Quero que você entregue o código completo e funcional.

## BRIEFING COMPLETO

[COLE AQUI TODO O CONTEXTO BASE DA SEÇÃO 0]

## ESTRUTURA COMPLETA DA HOME (12 seções)
[COLE AQUI A TABELA DE SEÇÕES DO CLAUDE.md]

## TOKENS DE DESIGN
[COLE AQUI A SEÇÃO DE CORES E TIPOGRAFIA DO DESIGN.md]

## O QUE ENTREGAR
1. index.html — página completa com todas as 12 seções
2. css/variables.css — todos os tokens
3. css/reset.css + css/typography.css + css/layout.css + css/animations.css
4. css/components/ — um arquivo CSS por seção
5. js/main.js + js/loader.js + js/lenis.js + js/gsap-setup.js
6. js/animations/ — um módulo por tipo de animação

Entregue arquivo por arquivo, em ordem. Comece pelo index.html.
Após cada arquivo, aguarde minha confirmação para continuar com o próximo.
```

---

---

# 📋 CHECKLIST DE VALIDAÇÃO — Use depois de cada prompt

Cole este checklist na IA para ela revisar o próprio trabalho:

```
Revise o código que você gerou e verifique cada item:

CÓDIGO
[ ] Sem valores hex hardcoded (todas as cores são variáveis CSS)
[ ] Sem Bootstrap, Tailwind ou qualquer framework CSS
[ ] Sem jQuery ou outras bibliotecas não autorizadas
[ ] Guard clause presente em todos os módulos JS: if (!el) return;
[ ] Sem markers: true no ScrollTrigger
[ ] Sem setTimeout para timing de animação

TIPOGRAFIA
[ ] Fonte Machado usada SOMENTE em .hero-title
[ ] H2 das seções usa Barlow Condensed Black
[ ] Body text usa Barlow Regular
[ ] Labels/eyebrows usam Barlow Condensed SemiBold uppercase

RESPONSIVIDADE
[ ] Mobile-first (base sem @media = mobile)
[ ] Breakpoints: 768px, 1024px, 1280px
[ ] Nenhuma largura fixa em px em containers

ACESSIBILIDADE
[ ] Todos os inputs com label associado
[ ] Botões com aria-label quando sem texto visível
[ ] Imagens com alt text
[ ] prefers-reduced-motion implementado em animations.css

PERFORMANCE
[ ] Imagens abaixo do fold com loading="lazy"
[ ] Fontes com font-display: swap
[ ] Vídeo hero com muted, autoplay, loop, playsinline

Liste qualquer problema encontrado e corrija.
```

---

*Arquivo gerado para o projeto Machado Plataformas × good-fella.com*
*Use os prompts na ordem das seções para construção progressiva e controlada.*