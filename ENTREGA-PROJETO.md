# Documentação de Entrega — Machado Plataformas

**Cliente:** Machado Plataformas
**Domínio:** machadoplataformas.com.br
**Data de Entrega:** 02 de Junho de 2026
**Responsável:** Matheus Mendes — Web Designer
**Contato:** matheusmendes077@gmail.com

---

## 1. Resumo do Projeto

Site institucional multi-página desenvolvido para a **Machado Plataformas**, empresa fabricante de plataformas para caminhões localizada em Palhoça/SC. O site apresenta os produtos, depoimentos de clientes, informações da empresa e opções de financiamento.

| Item               | Detalhe                                          |
|--------------------|--------------------------------------------------|
| Tipo               | Site institucional / Landing pages               |
| Páginas            | 5 páginas                                        |
| Tecnologia         | HTML5, CSS3, JavaScript (vanilla)                |
| Responsivo         | Sim — Mobile, Tablet, Desktop                    |
| Idioma             | Português (Brasil)                               |
| Hospedagem         | Estática (HTML/CSS/JS puro, sem backend)         |
| Peso total         | ~269 MB (inclui node_modules de build)           |

---

## 2. Estrutura de Páginas

| Página         | Arquivo          | Descrição                                                        |
|----------------|------------------|------------------------------------------------------------------|
| **Início**     | `index.html`     | Hero principal, diferenciais, depoimentos, prova social          |
| **Produtos**   | `produtos.html`  | Linhas Leve, Média e Pesada com carrossel de fotos e specs       |
| **Clientes**   | `clientes.html`  | Galeria de entregas, plataformas em ação, depoimentos            |
| **Sobre**      | `sobre.html`     | História da empresa, fábrica, missão/visão/valores, mapa         |
| **Crédito**    | `credito.html`   | Opções de financiamento: BNDES, FINAME, Sicredi, cartão, à vista|

---

## 3. Estrutura de Arquivos

```
machado/
├── index.html
├── produtos.html
├── clientes.html
├── sobre.html
├── credito.html
├── robots.txt
├── sitemap.xml
├── css/
│   ├── critical.css          → Estilos inline acima do fold
│   ├── bundle.css            → CSS principal (carregado non-blocking)
│   ├── mobile.css            → Breakpoints responsivos
│   ├── reset.css             → Reset/normalização
│   ├── variables.css         → Tokens de design (cores, fontes, espaçamentos)
│   ├── typography.css        → Escalas tipográficas
│   ├── layout.css            → Grid e containers
│   ├── animations.css        → Keyframes e transições
│   └── components/           → 11 componentes CSS isolados
│       ├── navbar.css
│       ├── hero.css
│       ├── subpages.css
│       ├── social-proof.css
│       ├── depoimentos.css
│       ├── diferenciais.css
│       ├── produtos.css
│       ├── financiamento.css
│       ├── footer.css
│       ├── cta-interstitial.css
│       └── localizacao.css
├── js/
│   ├── main.js               → Orquestrador de inicialização
│   ├── gsap-setup.js         → Setup GSAP + plugins
│   ├── lenis.js              → Smooth scroll
│   ├── animations.bundle.js  → Bundle de animações
│   └── animations/           → 12 módulos de animação
├── assets/
│   ├── fonts/                → Machado Display, Horizon
│   └── images/               → ~166 arquivos organizados por seção
│       ├── hero/
│       ├── logo/
│       ├── navbar/
│       ├── produtos/ (leve, media, pesada, opcionais)
│       ├── clientes/ (acao, entrega)
│       ├── galeria/
│       ├── sobre/
│       └── depoimentos/
└── package.json
```

---

## 4. Tecnologias e Dependências

### Stack Principal
- **HTML5** semântico com tags `<section>`, `<picture>`, `<article>`
- **CSS3** com Custom Properties (variáveis), Grid, Flexbox, `aspect-ratio`
- **JavaScript** vanilla (ES Modules)

### Bibliotecas Externas (CDN)

| Biblioteca      | Versão  | Finalidade                        |
|-----------------|---------|-----------------------------------|
| GSAP            | 3.12.5  | Motor de animação                 |
| ScrollTrigger   | 3.12.5  | Animações baseadas em scroll      |
| SplitText       | 3.12.5  | Animação de texto por palavra     |
| CustomEase      | 3.12.5  | Curvas de easing personalizadas   |
| Lenis           | 1.1.14  | Smooth scroll                     |
| Swiper          | 11      | Carrossel de imagens              |
| MapLibre GL     | Latest  | Mapa interativo (página Sobre)    |

### Fontes

| Fonte            | Tipo     | Uso                     | Origem          |
|------------------|----------|-------------------------|-----------------|
| Machado Display  | Custom   | Hero principal          | Local (woff2)   |
| Horizon          | Custom   | Títulos de seção (H2)   | Local (woff2)   |
| Aktiv Grotesk    | Servida  | Corpo e headings        | Adobe TypeKit   |
| Geist Mono       | Servida  | Textos monospace        | Google Fonts    |

### Ferramenta de Build
- **Sharp** (v0.34.5) — otimização de imagens PNG → WebP

---

## 5. Design e Identidade Visual

### Paleta de Cores (variáveis CSS)

| Token                    | Valor           | Uso                          |
|--------------------------|-----------------|------------------------------|
| `--color-bg`             | `#0b0f1a`       | Fundo principal (dark)       |
| `--color-surface`        | `#111827`       | Cards e superfícies          |
| `--color-text`           | `#e2e8f0`       | Texto principal              |
| `--color-accent`         | `#2563eb`       | Botões CTA, destaques        |
| `--color-accent-hover`   | `#3b82f6`       | Hover dos botões             |
| `--color-muted`          | `#94a3b8`       | Texto secundário             |

### Temas por Página
- **Dark:** Início, Produtos, Clientes
- **Light:** Sobre, Crédito

---

## 6. SEO e Metadados

### Implementações
- Meta `description` personalizada por página
- Open Graph completo (`og:title`, `og:description`, `og:image`, `og:url`, `og:locale`)
- Twitter Card (`summary_large_image`)
- Tags `<link rel="canonical">` em todas as páginas
- Arquivo `robots.txt` — permite todos os crawlers
- Arquivo `sitemap.xml` — 5 URLs com prioridades definidas
- Favicon 32x32 PNG

### Sitemap — Prioridades

| URL                                           | Prioridade |
|-----------------------------------------------|------------|
| machadoplataformas.com.br/                    | 1.0        |
| machadoplataformas.com.br/produtos.html       | 0.9        |
| machadoplataformas.com.br/clientes.html       | 0.7        |
| machadoplataformas.com.br/sobre.html          | 0.6        |
| machadoplataformas.com.br/credito.html        | 0.7        |

---

## 7. Performance e Otimizações

### Estratégia de Carregamento
1. **CSS crítico** inline no `<head>` (above the fold renderiza sem esperar rede)
2. **bundle.css** carregado via `<link rel="preload">` + `onload` (non-blocking)
3. **Fontes críticas** com `<link rel="preload">` (Machado, Horizon)
4. **Preconnect** para CDNs de fontes (TypeKit, Google Fonts)
5. **Scripts** no final do `<body>` (não bloqueiam render)

### Imagens
- Formato **WebP** como padrão (com fallback PNG/JPG)
- Elemento `<picture>` com `srcset` responsivo
- **`loading="lazy"`** em imagens abaixo do fold
- **`loading="eager"` + `fetchpriority="high"`** na hero
- `aspect-ratio` CSS para evitar layout shift (CLS)

### JavaScript
- Módulos não-críticos diferidos via `requestIdleCallback`
- YouTube embeds com facade (lazy-load)
- Bundle único de animações para reduzir requisições HTTP

### Acessibilidade
- Suporte a `prefers-reduced-motion` (desabilita animações)
- ARIA labels nos elementos interativos
- Targets de toque mínimo de 48px no mobile

---

## 8. Responsividade — Breakpoints

| Breakpoint       | Alvo                              |
|------------------|-----------------------------------|
| `max-width: 479px`  | Smartphones pequenos           |
| `max-width: 600px`  | Smartphones                    |
| `max-width: 767px`  | Mobile geral                   |
| `max-width: 1024px` | Tablets                        |
| `max-width: 1280px` | Notebooks / telas menores      |
| `min-width: 1281px`  | Desktop full                  |

---

## 9. Integrações e Contato

### WhatsApp Business
- **Número:** +55 (48) 3348-9982
- Mensagens pré-preenchidas personalizadas por página
- Botão flutuante fixo em todas as páginas
- Formato: `https://wa.me/554833489982?text=[mensagem]`

### Redes Sociais
| Rede       | Perfil                  |
|------------|-------------------------|
| Instagram  | @machadoplataformas     |
| YouTube    | @machadoplataformas     |
| TikTok     | @machadoplataformas     |
| Facebook   | /machadoplataformas     |

### Informações Físicas
- **Endereço:** R. B, Qd. 01 Lt. 13 — Pacheco, Palhoça — SC, 88134-040
- **Telefone:** (48) 3348-9982
- **E-mail:** machadoplataformas@gmail.com
- **Mapa interativo** na página Sobre (MapLibre GL)

---

## 10. Instruções de Hospedagem / Deploy

### Requisitos do Servidor
- Servidor web estático (Apache, Nginx, Cloudflare Pages, Netlify, Vercel, etc.)
- **Não requer** banco de dados, PHP, Node.js ou backend
- Certificado SSL (HTTPS) — necessário para SEO e segurança

### Como Fazer Deploy
1. Copiar **todos os arquivos** da pasta `machado/` para o diretório raiz do servidor (public_html, www, etc.)
2. Garantir que `index.html` está na raiz
3. Verificar que o domínio `machadoplataformas.com.br` aponta para o servidor
4. Testar todas as 5 páginas e links do WhatsApp

### Arquivos que NÃO devem ir para produção
- `node_modules/` — dependência de build, não é necessária no servidor
- `package.json` / `package-lock.json` — metadados de desenvolvimento
- `.git/` — histórico de versionamento
- `ENTREGA-PROJETO.md` — este documento (manter apenas internamente)

---

## 11. Manutenção Futura

### Para alterar textos ou conteúdo
- Editar diretamente os arquivos `.html` em qualquer editor de texto
- Textos estão em português, sem CMS — alterações são feitas no código

### Para alterar imagens
- Substituir os arquivos em `assets/images/` mantendo os mesmos nomes
- Formato recomendado: **WebP** (melhor performance)
- Manter proporções originais para evitar distorção

### Para alterar cores ou fontes
- Editar `css/variables.css` — todas as cores e fontes estão centralizadas como variáveis CSS

### Para alterar informações de contato
- Buscar e substituir o número/email nos arquivos HTML
- Links do WhatsApp incluem mensagem pré-formatada — atualizar se necessário

### Dependências Externas (monitorar)
- **Adobe TypeKit** — fonte Aktiv Grotesk depende de assinatura ativa
- **CDNs** (cdnjs, unpkg, jsdelivr) — bibliotecas JS carregadas externamente
- **Google Fonts** — fonte Geist Mono

---

## 12. Checklist de Entrega

- [x] Todas as 5 páginas funcionando e navegáveis
- [x] Responsivo em Mobile, Tablet e Desktop
- [x] Links de WhatsApp funcionando com mensagem pré-preenchida
- [x] Imagens otimizadas (WebP)
- [x] SEO básico implementado (meta tags, OG, sitemap, robots.txt)
- [x] Animações com fallback para `prefers-reduced-motion`
- [x] Favicon configurado
- [x] Mapa interativo na página Sobre
- [x] Carrossel de produtos funcional
- [x] Performance otimizada (CSS crítico, lazy loading, preloads)
- [ ] Testes finais no domínio de produção
- [ ] Verificação de SSL/HTTPS
- [ ] Google Search Console — submissão do sitemap
- [ ] Google Analytics / tag de rastreamento (se desejado pelo cliente)

---

## 13. Garantia e Suporte

O site foi entregue em pleno funcionamento na data acima. Eventuais ajustes dentro do escopo original podem ser solicitados dentro do período de garantia acordado em contrato.

Alterações de escopo (novas páginas, funcionalidades, integrações) serão orçadas separadamente.

---

**Documento gerado em 02/06/2026**
**Machado Plataformas — machadoplataformas.com.br**
