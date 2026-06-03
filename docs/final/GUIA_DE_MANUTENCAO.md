# Guia de Manutenção — Machado Plataformas

> Este guia é destinado a desenvolvedores que precisem fazer alterações no site após a entrega.

---

## Como Alterar Textos

### Textos de Conteúdo (parágrafos, títulos, descrições)
Edite diretamente no HTML da página correspondente:

| Página | Arquivo |
|--------|---------|
| Home | `index.html` |
| Sobre | `sobre.html` |
| Produtos | `produtos.html` |
| Clientes | `clientes.html` |
| Crédito | `credito.html` |

Procure pelo texto atual no arquivo e substitua. Os textos estão inline no HTML — não há CMS ou arquivo JSON separado.

**Exemplo — alterar o subtítulo do hero:**
```html
<!-- index.html, dentro de .hero-subtitle -->
<p class="hero-subtitle">
  Fabricação 100% própria em Palhoça, SC.
  Aço de alta resistência, atendimento técnico...
</p>
```

### Textos de KPI / Estatísticas
Os números dos contadores são definidos no atributo `data-count`:
```html
<span class="stat-number__value" data-count="22">0</span>
```
Altere o valor de `data-count` para mudar o número alvo da animação. O texto do sufixo (ex: "+") está no `data-suffix` ou no HTML adjacente.

### Textos de Meta / SEO
Cada página tem suas meta tags no `<head>`. Atualize **title**, **description**, **og:title**, **og:description** e **canonical** conforme necessário:
```html
<title>Novo Título | Machado Plataformas</title>
<meta name="description" content="Nova descrição...">
<meta property="og:title" content="Novo Título">
<meta property="og:description" content="Nova descrição...">
<link rel="canonical" href="https://machadoplataformas.com.br/pagina.html">
```

---

## Como Trocar Imagens

### Passo a Passo

1. **Prepare a imagem nova** no formato WebP (recomendado) ou PNG/JPG
2. **Nomeie** com o mesmo nome do arquivo antigo para substituição direta
3. **Coloque** na pasta correspondente em `assets/images/`
4. Se o nome for diferente, **atualize o `src`** no HTML

### Onde ficam as imagens

| Contexto | Pasta | Formatos |
|----------|-------|----------|
| Hero | `assets/images/hero/` | WebP + PNG |
| Logo | `assets/images/logo/` | SVG + PNG |
| Produtos (Leve) | `assets/images/produtos/leve/` | WebP + JPG/PNG |
| Produtos (Média) | `assets/images/produtos/media/` | WebP + JPG/PNG |
| Produtos (Pesada) | `assets/images/produtos/pesada/` | WebP + JPG/PNG |
| Opcionais | `assets/images/produtos/opcionais/` | WebP |
| Clientes (Ação) | `assets/images/clientes/acao/` | WebP |
| Clientes (Entrega) | `assets/images/clientes/entrega/` | WebP |
| Sobre (Fábrica) | `assets/images/sobre/` | WebP |
| Navbar cards | `assets/images/navbar/` | WebP + PNG |

### Otimização de Imagens

Se tiver Node.js instalado, use o Sharp para converter:
```bash
npm install
node convert-images.js
```

Caso contrário, converta manualmente para WebP com ferramentas online (ex: squoosh.app) mantendo:
- **Hero desktop:** largura ~1920px
- **Hero mobile:** largura ~720px
- **Produtos:** largura ~800px
- **Galeria:** largura ~800px
- **Navbar cards:** largura ~400px

### Cuidado com `<picture>` e `srcset`
Algumas imagens usam o elemento `<picture>` com `<source>` para WebP e `<img>` como fallback:
```html
<picture>
  <source srcset="./assets/images/hero/plataforma-hero-mobile.webp" type="image/webp">
  <img src="./assets/images/hero/plataforma-hero-mobile.png" alt="..." >
</picture>
```
Ao trocar, atualize **ambos** os caminhos (WebP e fallback).

---

## Como Adicionar Novos Produtos / Seções

### Adicionar um Produto na Página de Produtos

1. **Copie** um bloco `.arsenal` existente em `produtos.html`
2. **Altere** o conteúdo (nome, tagline, specs, features, imagens)
3. **Adicione as imagens** em `assets/images/produtos/NOVA_LINHA/`
4. **Atualize o Swiper** — cada slide é um `<div class="swiper-slide">`
5. **Atualize o counter** — o total de slides no `data-total`
6. Se necessário, **altere o link WhatsApp** com o nome do novo produto

### Adicionar uma Seção na Home

1. **Escolha o tipo de seção**: dark (`.section--dark`), mid (`.section--mid`) ou light (`.section--light`)
2. **Use a estrutura padrão**:
```html
<section class="section section--dark" id="nova-secao">
  <div class="container">
    <div class="section-heading" data-animate="section-heading">
      <span class="section-heading__meta eyebrow">LABEL</span>
      <span class="section-heading__rule">
        <span class="section-heading__square"></span>
      </span>
      <h2 class="section-heading__title">TÍTULO DA SEÇÃO</h2>
      <p class="section-heading__sub lead">Subtítulo descritivo.</p>
    </div>
    <!-- conteúdo aqui -->
  </div>
</section>
```
3. **Adicione `data-animate`** nos elementos para animações de scroll:
   - `data-animate="fade-up"` — sobe e aparece
   - `data-animate="fade-in"` — apenas aparece
   - `data-animate="scale-in"` — escala e aparece
4. As animações são automáticas — o `scroll-triggers.js` detecta qualquer `[data-animate]` novo.

### Adicionar um Depoimento

Em `clientes.html`, copie um `.depoimento-card` existente e altere:
```html
<div class="depoimento-card" data-animate="fade-up">
  <span class="depoimento-card__tag mono">Categoria</span>
  <div class="depoimento-card__stars" aria-label="5 de 5 estrelas">
    <!-- 5 SVGs de estrela -->
  </div>
  <blockquote class="depoimento-card__body">
    "Texto do depoimento aqui."
  </blockquote>
  <footer class="depoimento-card__author">
    <div class="depoimento-card__avatar">XX</div>
    <div>
      <cite class="depoimento-card__name">Nome do Cliente</cite>
      <span class="depoimento-card__company mono">Empresa — Cidade, UF</span>
    </div>
  </footer>
</div>
```

---

## Como Editar Contatos

### WhatsApp
O número do WhatsApp aparece em múltiplos lugares em **todas as 5 páginas**. Para alterar:

1. Faça uma busca global por `554833489982` (formato internacional sem +)
2. Substitua por o novo número no mesmo formato
3. O formato do link é: `https://wa.me/55XXXXXXXXXXX`
4. A mensagem pré-preenchida está no parâmetro `?text=`:
```
https://wa.me/554833489982?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento.
```

### Telefone
Busque por `(48) 3348-9982` e substitua. Também verifique o formato `tel:` nos links:
```html
<a href="tel:+554833489982">(48) 3348-9982</a>
```

### Email
Busque por `machadoplataformas@gmail.com` e substitua em todas as ocorrências.

### Endereço
O endereço completo está em `sobre.html` (seção de localização) e no footer de todas as páginas:
- Rua e número
- Bairro, Cidade — UF, CEP
- Coordenadas (se alterar a localização, atualize também o marcador do mapa)

### Redes Sociais
Busque e substitua os links em todas as páginas:
- Instagram: `instagram.com/machadoplataformas`
- YouTube: `youtube.com/@machadoplataformas`
- TikTok: `tiktok.com/@machadoplataformas`
- Facebook: `facebook.com/machadoplataformas`

> **Dica:** Use "Find and Replace All" no editor para alterar contatos globalmente. Os links são idênticos em todas as páginas.

---

## Como Atualizar Links

### Links de Navegação
A navbar está presente em todas as 5 páginas com a mesma estrutura. Para adicionar/remover uma página:

1. Edite o bloco `<nav class="navbar-panel__nav">` em **todas as 5 páginas**
2. Adicione/remova o `<a>` correspondente
3. Atualize o `aria-current="page"` na página correta
4. Atualize o footer (`<ul class="footer-links">`) em todas as páginas

### Links WhatsApp por Produto
Cada produto tem um link WhatsApp com mensagem personalizada:
```html
href="https://wa.me/554833489982?text=Olá!%20Tenho%20interesse%20na%20Linha%20Leve."
```
O texto após `?text=` deve ser URL-encoded. Use `%20` para espaços.

### Sitemap
Ao adicionar/remover páginas, atualize `sitemap.xml`:
```xml
<url>
  <loc>https://machadoplataformas.com.br/nova-pagina.html</loc>
  <lastmod>2026-06-03</lastmod>
</url>
```

---

## Cuidados Antes de Publicar

### Checklist Pré-Deploy

1. **Teste local** — Abra cada página em um servidor local e verifique:
   - [ ] Todos os links funcionam
   - [ ] Todas as imagens carregam
   - [ ] Animações rodam normalmente
   - [ ] Menu mobile abre/fecha
   - [ ] WhatsApp links abrem com mensagem correta

2. **Responsividade** — Teste em pelo menos 3 larguras:
   - [ ] 375px (mobile)
   - [ ] 768px (tablet)
   - [ ] 1440px (desktop)

3. **Bundle CSS** — Se editou algum arquivo em `css/components/`:
   - [ ] Copie a alteração para `bundle.css` na posição correspondente
   - [ ] Ou regenere o bundle concatenando os arquivos

4. **Bundle JS** — Se editou algum arquivo em `js/animations/`:
   - [ ] Copie a alteração para `animations.bundle.js` na posição correspondente
   - [ ] Ou regenere o bundle

5. **Imagens** — Se adicionou novas imagens:
   - [ ] Forneça versão WebP
   - [ ] Verifique que o nome do arquivo no HTML corresponde exatamente ao filesystem
   - [ ] Em produção Linux, nomes são **case-sensitive** (LEVE.webp ≠ leve.webp)

6. **SEO** — Se adicionou/removeu páginas:
   - [ ] Atualize `sitemap.xml`
   - [ ] Atualize `robots.txt` se necessário
   - [ ] Adicione meta tags na nova página

7. **Não envie para produção:**
   - `node_modules/`
   - `imgs/` (pasta temporária)
   - `screenshots/`
   - `.claude/`, `.superpowers/`, `.impeccable/`, `.codex/`
   - `.audit/`
   - `docs/` (opcional — documentação interna)
   - Arquivos `.md` da raiz

### Sobre o Bundle CSS
O `bundle.css` é a concatenação de todos os arquivos CSS. A ordem importa:

```
1. reset.css
2. variables.css
3. typography.css
4. layout.css
5. animations.css
6. mobile.css
7. components/cta-interstitial.css
8. components/depoimentos.css
9. components/diferenciais.css
10. components/financiamento.css
11. components/footer.css
12. components/hero.css
13. components/localizacao.css
14. components/navbar.css
15. components/produtos.css
16. components/sobre.css
17. components/social-proof.css
18. components/subpages.css
```

Para regenerar manualmente, concatene nessa ordem. Um script simples:
```bash
cat css/reset.css css/variables.css css/typography.css css/layout.css \
    css/animations.css css/mobile.css \
    css/components/cta-interstitial.css css/components/depoimentos.css \
    css/components/diferenciais.css css/components/financiamento.css \
    css/components/footer.css css/components/hero.css \
    css/components/localizacao.css css/components/navbar.css \
    css/components/produtos.css css/components/sobre.css \
    css/components/social-proof.css css/components/subpages.css \
    > css/bundle.css
```

### Sobre o Bundle JS
O `animations.bundle.js` contém todos os módulos de `js/animations/` em um único arquivo. Se editar qualquer módulo individual, a alteração deve ser refletida no bundle.
