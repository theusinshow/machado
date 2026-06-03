# Machado Plataformas — Website Institucional

## Objetivo

Site institucional multi-página para a **Machado Plataformas**, fabricante de plataformas rodoviárias para guincho (auto socorro). O site apresenta as linhas de produtos, histórico da empresa, depoimentos de clientes, opções de financiamento e múltiplos pontos de contato via WhatsApp para geração de leads.

## Cliente / Contexto

| Campo | Valor |
|-------|-------|
| Empresa | Machado Plataformas |
| Segmento | Fabricação de plataformas para guincho e transporte |
| Localização | Palhoça, SC — Brasil |
| Domínio | machadoplataformas.com.br |
| Tempo de mercado | 22+ anos (desde 2003) |
| Fábrica | 3.000 m², fabricação 100% própria |
| Desenvolvedor | Coded by M (Matheus Mendes) |

## Stack Utilizada

| Camada | Tecnologia | Versão |
|--------|------------|--------|
| Markup | HTML5 semântico | — |
| Estilo | CSS3 (Custom Properties, Grid, Flexbox) | — |
| Animação | GSAP (GreenSock) | 3.12.5 |
| Scroll | Lenis | 1.1.14 |
| Plugins GSAP | ScrollTrigger, SplitText, CustomEase | 3.12.5 |
| Carrossel | Swiper | 11.x |
| Mapa | MapLibre GL JS | via CDN |
| Fontes | Adobe Fonts (Aktiv Grotesk), custom (Machado, Horizon), Google Fonts (Geist Mono) | — |
| Imagens | Sharp (otimização/build) | 0.34.5 |
| Versionamento | Git | — |

> **Sem framework JS, sem build tools, sem backend.** O projeto é 100% estático (HTML/CSS/JS vanilla).

## Estrutura de Pastas

```
machado/
├── index.html                  # Home
├── sobre.html                  # Sobre a empresa
├── produtos.html               # Linha de produtos
├── clientes.html               # Clientes e depoimentos
├── credito.html                # Linhas de crédito/financiamento
├── robots.txt                  # SEO
├── sitemap.xml                 # SEO
├── package.json                # Dependência: sharp (otimização de imagens)
│
├── css/
│   ├── variables.css           # Tokens de design (cores, espaçamentos, tipografia)
│   ├── reset.css               # Reset global
│   ├── typography.css          # Sistema tipográfico
│   ├── layout.css              # Grid, containers, utilitários
│   ├── animations.css          # Keyframes e estados de animação CSS
│   ├── mobile.css              # Overrides responsivos
│   ├── critical.css            # CSS crítico (inlined no <head>)
│   ├── bundle.css              # Bundle completo (todas as regras concatenadas)
│   └── components/             # CSS por componente
│       ├── hero.css
│       ├── navbar.css
│       ├── footer.css
│       ├── produtos.css
│       ├── depoimentos.css
│       ├── diferenciais.css
│       ├── social-proof.css
│       ├── sobre.css
│       ├── localizacao.css
│       ├── financiamento.css
│       ├── cta-interstitial.css
│       └── subpages.css
│
├── js/
│   ├── main.js                 # Entry point — orquestra módulos
│   ├── gsap-setup.js           # Registro de plugins e easings customizados
│   ├── lenis.js                # Smooth scroll
│   ├── animations.bundle.js    # Bundle de todos os módulos de animação
│   └── animations/             # Módulos individuais
│       ├── hero.js
│       ├── navbar.js
│       ├── scroll-triggers.js
│       ├── produtos-tabs.js
│       ├── diferenciais.js
│       ├── stats.js
│       ├── counters.js
│       ├── marquee.js
│       ├── magnetic.js
│       ├── button-swap.js
│       ├── sobre-gallery.js
│       └── youtube-facade.js
│
├── assets/
│   ├── images/
│   │   ├── hero/               # Imagens do hero (desktop + mobile, WebP + PNG)
│   │   ├── logo/               # Logo SVG + favicons
│   │   ├── navbar/             # Cards do menu (LEVE, MEDIA, PESADA)
│   │   ├── produtos/           # Fotos por linha (leve/, media/, pesada/, opcionais/)
│   │   ├── clientes/           # Galerias (acao/, entrega/)
│   │   ├── sobre/              # Fotos da fábrica
│   │   └── galeria/            # Galeria geral
│   ├── videos/
│   │   └── preview-institucional.mp4
│   └── fonts/
│       ├── Machado-Display.woff2
│       └── Horizon-Font/       # Horizon.otf + Horizon.woff2
│
└── docs/
    └── final/                  # Esta documentação
```

## Principais Páginas e Seções

### 1. Home (`index.html`)
- **Hero** — Título animado "MACHADO PLATAFORMAS", CTA WhatsApp, imagem responsiva
- **Diferenciais** — Grid de 4 cards com pilares da empresa
- **Produtos** — Showcase interativo com tabs (Leve / Média / Pesada), pinned scroll no desktop
- **Depoimentos** — Cards de avaliação com estrelas
- **Social Proof** — KPIs animados (22+ anos, 4.000+ plataformas, 27 UF)
- **CTA Final** — Chamada para orçamento via WhatsApp

### 2. Sobre (`sobre.html`)
- **Ficha da empresa** — História, método de fabricação, imagens da fábrica
- **Specbar** — Estatísticas (22+ anos, 4.000+ plataformas, 27 UF, 3.000 m²)
- **Localização** — Mapa interativo (MapLibre GL) + endereço completo
- **Diferenciais** — Grid de cards com detalhes técnicos
- **DNA Machado** — Missão, Visão e Valores

### 3. Produtos (`produtos.html`)
- **Linha Leve** — Specs + carrossel de 5 fotos (Swiper) + lightbox
- **Linha Média** — Mesmo formato, layout alternado
- **Linha Pesada** — Mesmo formato
- **Opcionais** — Grid de acessórios (alongamento, asa delta, rampas, remonte, sapatas, portas laterais)

### 4. Clientes (`clientes.html`)
- **Em Ação** — Galeria Swiper com 12 fotos de clientes usando as plataformas
- **Entregas Realizadas** — Galeria de 11 entregas + ticker de estados atendidos
- **Depoimentos** — Cards com avaliações reais de clientes

### 5. Crédito (`credito.html`)
- **Financiamento** — Cards BNDES, FINAME, Sicredi + timeline de 3 etapas
- **Pagamento Direto** — Cartão (até 21x) e à vista
- **CTA Final** — Consulta de condições via WhatsApp

## Como Rodar Localmente

O projeto é 100% estático. Basta servir os arquivos com qualquer servidor HTTP local:

```bash
# Opção 1: VS Code Live Server
# Instale a extensão "Live Server" e clique "Go Live" na barra inferior

# Opção 2: Python
python -m http.server 8000

# Opção 3: Node.js (npx)
npx serve .

# Opção 4: PHP
php -S localhost:8000
```

Abra `http://localhost:8000` no navegador.

> **Nota:** Abrir os HTMLs diretamente via `file://` pode causar problemas com CORS em fontes e scripts de módulo.

## Como Fazer Build

Não há build step obrigatório. O projeto já está com os bundles prontos (`bundle.css`, `animations.bundle.js`).

Para **otimizar imagens** (caso troque alguma foto):

```bash
npm install        # Instala sharp
node convert-images.js  # Converte para WebP e redimensiona
```

Para **atualizar o bundle CSS** após editar arquivos em `css/components/`:
1. Concatene todos os arquivos CSS na ordem correta para gerar `bundle.css`
2. O CSS crítico (`critical.css`) é inlined manualmente no `<head>` de cada HTML

## Como Fazer Deploy

O site pode ser hospedado em qualquer serviço de arquivos estáticos:

| Plataforma | Comando / Método |
|------------|------------------|
| **Vercel** | `vercel --prod` ou conectar repositório Git |
| **Netlify** | Arrastar pasta no dashboard ou conectar Git |
| **S3 + CloudFront** | Upload dos arquivos + configurar distribuição |
| **Hospedagem tradicional** | Upload via FTP/SFTP para `public_html/` |

### Checklist de deploy:
1. Verificar se `robots.txt` e `sitemap.xml` estão atualizados
2. Verificar se as URLs canônicas nos HTMLs apontam para o domínio de produção
3. Testar todas as páginas em mobile e desktop
4. Confirmar que os links do WhatsApp estão com o número correto
5. Validar as meta tags OG (usar [metatags.io](https://metatags.io))

### Arquivos que NÃO devem ir para produção:
- `node_modules/`
- `imgs/` (pasta de trabalho temporária)
- `screenshots/` (QA)
- `.claude/`, `.superpowers/`, `.impeccable/`, `.codex/`
- `.audit/`
- `package.json`, `package-lock.json`
- Arquivos `.md` na raiz (documentação de desenvolvimento)
