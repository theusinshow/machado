# Checklist Final — Machado Plataformas

> Última atualização: 03/06/2026
> Responsável: Matheus Mendes (Coded by M)

---

## O Que Já Está Pronto

### Páginas
- [x] **Home** (`index.html`) — Hero, diferenciais, produtos showcase, depoimentos, social proof, CTA
- [x] **Sobre** (`sobre.html`) — História, fábrica, specbar, mapa, diferenciais, missão/visão/valores
- [x] **Produtos** (`produtos.html`) — 3 linhas com carrossel + lightbox + opcionais
- [x] **Clientes** (`clientes.html`) — Galerias ação/entrega, ticker estados, depoimentos
- [x] **Crédito** (`credito.html`) — BNDES, FINAME, Sicredi, cartão, à vista, timeline

### Funcionalidades
- [x] Navbar responsiva com menu mobile animado
- [x] Theme switching automático (dark/light por seção)
- [x] Smooth scroll (Lenis, apenas desktop)
- [x] Scroll-triggered animations (7 tipos)
- [x] Pinned scroll nos produtos e diferenciais (desktop)
- [x] Carrosséis Swiper (produtos, clientes ação, entregas)
- [x] Lightbox para fotos de produtos
- [x] Mapa interativo (MapLibre GL)
- [x] Contadores numéricos animados
- [x] YouTube facade com lazy-load
- [x] Botões magnéticos (desktop)
- [x] Botões split com swap animation (desktop)
- [x] Marquee/ticker infinito
- [x] Gallery com autoplay (sobre)
- [x] WhatsApp floating button
- [x] Custom cursor (desktop)
- [x] Assinatura do desenvolvedor no footer (shimmer)

### SEO e Meta
- [x] Meta title e description em todas as páginas
- [x] Open Graph tags (og:title, og:description, og:image, og:url, og:locale)
- [x] Twitter Card (summary_large_image)
- [x] Canonical URLs
- [x] `robots.txt`
- [x] `sitemap.xml`
- [x] `lang="pt-BR"`
- [x] JSON-LD (ManufacturingBusiness) no index.html

### Acessibilidade
- [x] Skip-link
- [x] `aria-label` em navegação, links e botões
- [x] `aria-hidden` em elementos decorativos
- [x] `aria-current="page"` na página ativa
- [x] `alt` em todas as imagens
- [x] `role="contentinfo"` no footer
- [x] `:focus-visible` styling global
- [x] `prefers-reduced-motion` respeitado
- [x] Touch targets ≥ 44px em mobile
- [x] Input font-size ≥ 16px (evita zoom iOS)

### Performance
- [x] CSS crítico inlined no `<head>`
- [x] Bundle CSS carregado async (non-blocking)
- [x] Scripts com `defer`
- [x] Imagens otimizadas (WebP + fallback PNG/JPG)
- [x] Imagens com `loading="lazy"` (below fold)
- [x] Fontes em WOFF2
- [x] `requestIdleCallback` para módulos não-críticos
- [x] Animações GPU-only (transform + opacity)
- [x] Passive event listeners

---

## O Que Foi Testado

### QA Visual (10 breakpoints)
- [x] 320px (iPhone SE)
- [x] 360px (Android compact)
- [x] 375px (iPhone standard)
- [x] 390px (iPhone 14)
- [x] 414px (iPhone Plus)
- [x] 480px (Landscape small)
- [x] 768px (iPad portrait)
- [x] 1024px (iPad landscape / Desktop small)
- [x] 1366px (Laptop)
- [x] 1440px (Desktop)

### Funcional
- [x] Links de navegação entre páginas
- [x] Links WhatsApp (mensagem pré-preenchida)
- [x] Carrosséis Swiper (navegação, loop, counter)
- [x] Lightbox (abrir, fechar, navegação)
- [x] Menu mobile (abrir, fechar, navegação, Escape)
- [x] Mapa interativo (zoom, pan, popup)
- [x] Contadores numéricos
- [x] Scroll-triggered animations
- [x] YouTube embed (click-to-play)

### Cross-Browser
- [x] Chrome (desktop)
- [x] Chrome (Android)
- [x] Safari (macOS) — verificar em produção
- [x] Safari (iOS) — verificar em produção
- [ ] Firefox — não testado explicitamente
- [ ] Edge — não testado explicitamente

---

## O Que Pode Ser Melhorado

### Performance
- [ ] **Minificação de CSS/JS** — Os bundles não estão minificados. Usar terser/cssnano reduziria ~30-40% do tamanho.
- [ ] **Lazy-load de scripts de subpáginas** — Swiper e MapLibre só são necessários em páginas específicas, mas são carregados via CDN em todas.
- [ ] **Service Worker** — Poderia cachear assets estáticos para visitas recorrentes.
- [ ] **Preconnect para CDNs** — Adicionar `<link rel="preconnect">` para os CDNs de terceiros (cdnjs, unpkg, jsdelivr).

### SEO
- [ ] **Structured data** — Adicionar JSON-LD nas subpáginas (Product, FAQPage para crédito, etc.).
- [ ] **Breadcrumbs** — Sem breadcrumbs nas subpáginas.
- [ ] **Sitemap dinâmico** — O sitemap.xml é estático. Considerar atualização automática no deploy.

### Acessibilidade
- [ ] **Testes com screen reader** — Não identificado se foi testado com NVDA/VoiceOver.
- [ ] **Contraste em hover states** — Alguns hovers sutis podem não atingir WCAG AA em todos os cenários.
- [ ] **Trap de foco no lightbox** — Verificar se o foco fica preso dentro do lightbox quando aberto.
- [ ] **Trap de foco no menu mobile** — Verificar se o foco fica preso dentro do menu quando aberto.

### UX
- [ ] **Loading state** — Sem indicador de carregamento. Em conexões lentas, o conteúdo pode aparecer sem animações.
- [ ] **404 page** — Sem página de erro customizada.
- [ ] **Favicon completo** — Apenas favicon PNG de 16px e 32px. Faltam apple-touch-icon e manifest.json.
- [ ] **Página de Política de Privacidade** — Não existe. Pode ser exigida pela LGPD dependendo do uso de analytics.

---

## Riscos Conhecidos

### 1. Case Sensitivity em Produção
**Risco:** Médio
**Descrição:** Nomes de arquivos de imagem usam MAIÚSCULAS (ex: `LEVE-1.webp`, `MEDIA-1.png`). No Windows (dev) funciona, mas servidores Linux são case-sensitive. Se os paths no HTML não coincidirem exatamente com o filesystem, as imagens quebram.
**Mitigação:** Verificar paths após upload. Considerar renomear todos para lowercase.

### 2. Dependência de CDN para Funcionalidades Críticas
**Risco:** Baixo
**Descrição:** GSAP, Lenis, Swiper e MapLibre são carregados via CDN (cdnjs, unpkg, jsdelivr). Se um CDN cair, as animações e carrosséis param de funcionar. O conteúdo permanece acessível mas a experiência degrada.
**Mitigação:** Considerar self-hosting dos assets críticos.

### 3. Bundle CSS Manualmente Sincronizado
**Risco:** Médio
**Descrição:** O `bundle.css` é uma concatenação manual dos arquivos em `css/components/`. Não há build tool automatizado. Editar um componente sem atualizar o bundle causa divergência.
**Mitigação:** Documentar processo de atualização no guia de manutenção. Considerar um script de concat.

### 4. Licenciamento GSAP
**Risco:** Baixo
**Descrição:** GSAP é gratuito para uso comercial via CDN, mas SplitText e CustomEase são plugins premium. Verificar se a licença atual cobre o uso comercial.
**Mitigação:** Confirmar licenciamento no site do GSAP.

---

## Pendências Opcionais

| Item | Prioridade | Esforço |
|------|-----------|---------|
| Minificação CSS/JS | Média | 1h |
| Página 404 | Baixa | 2h |
| Favicon completo (apple-touch-icon, manifest) | Baixa | 30min |
| JSON-LD nas subpáginas | Baixa | 1h |
| Self-hosting de libraries CDN | Baixa | 2h |
| Script de build para bundle CSS | Média | 1h |
| Testes com screen reader | Média | 2h |
| Política de Privacidade | Depende do cliente | 2-4h |
| Preconnect hints para CDNs | Baixa | 15min |

---

## Recomendações Futuras

### Curto Prazo (pós-entrega)
1. **Monitorar Core Web Vitals** com Google Search Console ou PageSpeed Insights.
2. **Configurar Google Analytics / Tag Manager** se o cliente quiser métricas.
3. **Testar no Safari iOS real** — emuladores podem perder bugs de viewport e smooth scroll.

### Médio Prazo (1-3 meses)
1. **Integrar formulário de contato** como alternativa ao WhatsApp (nem todo lead quer usar WhatsApp).
2. **Blog / Conteúdo** para SEO orgânico (cases de sucesso, dicas de manutenção).
3. **Build pipeline** — Introduzir Vite ou similar para minificação, bundling automático e cache busting.

### Longo Prazo (6+ meses)
1. **CMS headless** (Contentful, Sanity, Strapi) para o cliente atualizar textos/fotos sem depender do dev.
2. **Internacionalização** — Se a empresa expandir para outros mercados.
3. **Sistema de orçamento online** — Formulário com seleção de produto/opcionais e envio direto.
