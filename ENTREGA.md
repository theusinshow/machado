# Checklist de Entrega — Machado Plataformas

**Data:** 30 de maio de 2026
**Versão:** 1.0 — Entrega Final
**Responsável:** Equipe de desenvolvimento
**Domínio de produção:** machadoplataformas.com.br

---

## 1. Status Geral do Projeto

| Item | Status |
|------|--------|
| Desenvolvimento | ✅ Concluído |
| QA Responsivo | ✅ Concluído — 10 tamanhos de tela |
| Auditoria de erros JS e rede | ✅ Zero erros encontrados |
| Auditoria de copy e conteúdo | ✅ Concluída |
| Preparação para deploy | ✅ Concluída |
| Pendências técnicas bloqueantes | ✅ Nenhuma |
| Pendências de conteúdo bloqueantes | ⚠️ 3 itens para validação do cliente |

**Veredicto: pronto para publicação**, condicionado à validação dos 3 pontos de conteúdo listados na seção 13.

---

## 2. Páginas Entregues

| Página | URL | Status |
|--------|-----|--------|
| Home | `/` | ✅ |
| Produtos | `/produtos.html` | ✅ |
| Clientes | `/clientes.html` | ✅ |
| Sobre | `/sobre.html` | ✅ |
| Crédito (financiamento) | `/credito.html` | ✅ |

**Total: 5 páginas entregues e testadas.**

---

## 3. Funcionalidades Testadas

| Funcionalidade | Resultado |
|----------------|-----------|
| Menu de navegação (hambúrguer mobile) | ✅ Abre e fecha corretamente |
| Navegação entre páginas | ✅ Todos os links internos funcionam |
| Carrossel de produtos (Linha Leve, Média, Pesada) | ✅ Setas, contador e swipe funcionando |
| Lightbox de fotos — produtos | ✅ Abre ao clicar, fecha com ESC e botão |
| Galeria "Clientes em Ação" | ✅ Swiper com contador corrigido (01–08) |
| Galeria "Entregas Realizadas" | ✅ Swiper com contador corrigido (01–07) |
| Carrossel de depoimentos | ✅ 6 cards na Home, 6 na página Clientes |
| Seção de linha de crédito | ✅ Cards BNDES / FINAME / Sicredi / Cartão |
| Timeline de etapas (Crédito) | ✅ Animação de 3 etapas funciona |
| Mapa de localização (Sobre) | ✅ MapLibre renderiza, popup com endereço |
| Vídeo institucional (Home) | ✅ Player YouTube abre via click na thumbnail |
| Animações de entrada (GSAP) | ✅ Sem erros de console em nenhuma página |
| Scroll suave (Lenis) | ✅ Ativo em desktop; desabilitado em mobile/touch |
| WhatsApp flutuante | ✅ Presente e funcional em todas as páginas |

---

## 4. CTAs Testados

| CTA | Páginas | Destino | Status |
|-----|---------|---------|--------|
| "Faça seu Orçamento" (navbar) | Todas | WhatsApp orçamento geral | ✅ |
| "Falar no WhatsApp" (botão flutuante) | Todas | WhatsApp orçamento de plataforma | ✅ |
| "Solicitar Orçamento" (hero / produto) | Home, Produtos | WhatsApp por linha (Leve, Média, Pesada) | ✅ |
| "Ver linha completa" | Home | Âncora para seção da linha em produtos.html | ✅ |
| "Consultar Condições" | Crédito | WhatsApp para consulta de condições | ✅ |
| "Falar com especialista" | Clientes, Sobre, Crédito | WhatsApp com contexto da página | ✅ |
| "Solicite um orçamento sem compromisso" (footer) | Todas | WhatsApp orçamento | ✅ |

**Total: 47 links de WhatsApp verificados.** Todos apontam para o número `(48) 3348-9982`.

---

## 5. WhatsApp Testado

- **Número:** `+55 48 3348-9982`
- **Mensagens pré-preenchidas** por contexto de entrada (orçamento geral, Linha Leve, Linha Média, Linha Pesada, crédito, página de clientes)
- **Botão flutuante:** visível em todas as páginas, mobile e desktop
- **Comportamento mobile:** botão ampliado e acessível em telas pequenas
- **Status:** ✅ Todos os links verificados e funcionais

> **Ação do cliente:** confirmar com o responsável que o número `(48) 3348-9982` está ativo e configurado para receber mensagens do WhatsApp Business.

---

## 6. Performance

| Otimização | Status | Detalhe |
|------------|--------|---------|
| Imagem do hero pré-carregada | ✅ | Versões mobile e desktop em WebP |
| Fontes críticas pré-carregadas | ✅ | Horizon e Machado Display com `preload` |
| CSS carregado sem bloquear renderização | ✅ | Bundle non-blocking via `onload` |
| CSS crítico inline | ✅ | Elimina flash sem estilo no primeiro frame |
| Scripts sem bloqueio | ✅ | 7 scripts com `defer`, 1 com `type="module"` |
| Imagens com lazy loading | ✅ | Todas as imagens abaixo do fold |
| Formato WebP com fallback | ✅ | 61 imagens WebP, fallbacks PNG/JPG |
| Vídeo carregado sob demanda | ✅ | Preview só carrega ao clicar |
| Assets de fonte locais | ✅ | WOFF2 local para Horizon e Machado Display |

**Imagens de produção:** 66 MB de imagens no total — tamanho adequado para um catálogo com galeria de produtos e clientes. Para performance máxima, recomendamos CDN de imagens (ver seção 14).

---

## 7. SEO Básico

| Item | Home | Produtos | Clientes | Sobre | Crédito |
|------|------|----------|----------|-------|---------|
| `<title>` único | ✅ | ✅ | ✅ | ✅ | ✅ |
| Meta description | ✅ | ✅ | ✅ | ✅ | ✅ |
| URL canônica | ✅ | ✅ | ✅ | ✅ | ✅ |
| Open Graph (Facebook/WhatsApp) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Imagem OG | ✅ | ✅ | ✅ | ✅ | ✅ |
| Idioma (`lang="pt-BR"`) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Dados estruturados JSON-LD | ✅ | — | — | — | — |
| `robots.txt` | ✅ (raiz) | — | — | — | — |
| `sitemap.xml` | ✅ (raiz) | — | — | — | — |

**Nota:** Dados estruturados (JSON-LD) presentes apenas na Home. Isso é suficiente para um primeiro indexamento — tipo `ManufacturingBusiness`, com nome, endereço, telefone, redes sociais e coordenadas geográficas.

---

## 8. Acessibilidade Básica

| Item | Status |
|------|--------|
| Link "Pular para o conteúdo" (teclado) | ✅ Presente em todas as páginas |
| Textos alternativos em imagens | ✅ 44 imagens com alt descritivo |
| Rótulos ARIA em elementos interativos | ✅ 150+ `aria-label` no total |
| Suporte a `prefers-reduced-motion` | ✅ Todas as animações respeitam a preferência |
| Contraste de texto | ✅ Fundo escuro com texto claro — acima de 4.5:1 |
| Navegação por teclado (foco visível) | ✅ Estilo de foco definido em CSS |
| HTML semântico (`<header>`, `<main>`, `<footer>`, `<nav>`) | ✅ |
| Hierarquia de títulos (h1 → h2 → h3) | ✅ Uma h1 por página |

---

## 9. Responsividade

Testado com Playwright headless (Chromium) em **10 tamanhos de tela**:

| Tamanho | Tipo | Resultado |
|---------|------|-----------|
| 320px | Mobile pequeno (iPhone SE 1ª geração) | ⚠️ Hero 67px além da dobra — ver nota |
| 360px | Mobile padrão Android | ✅ |
| 375px | iPhone 13 mini / SE 3ª geração | ✅ |
| 390px | iPhone 14 / 15 | ✅ |
| 414px | iPhone Plus / Pro Max | ✅ |
| 768px | Tablet / iPad | ✅ |
| 1024px | Tablet landscape / laptop pequeno | ✅ |
| 1366px | Laptop padrão | ✅ |
| 1440px | Desktop widescreen | ✅ |
| 1920px | Desktop full HD | ✅ |

**Nota 320px:** O hero ocupa 635px num viewport de 568px (67px além da dobra). Os CTAs estão visíveis e acessíveis — não é erro, mas exige validação em aparelho físico antes de investir em tráfego de mobile pequeno.

---

## 10. Navegadores Testados

| Navegador | Resultado |
|-----------|-----------|
| Chromium headless — desktop e mobile | ✅ Testado automaticamente |
| Google Chrome | ✅ Confirmado manual |
| Safari / iOS | ⚠️ Não testado — requer dispositivo Apple |
| Firefox | ⚠️ Não testado |
| Edge | ⚠️ Não testado (base Chromium, esperado compatível) |
| Samsung Internet | ⚠️ Não testado |

> **Recomendação:** Testar Safari/iOS antes de escalar tráfego pago — especialmente animações, scroll suave e o mapa de localização, que têm comportamentos distintos no motor do Safari.

---

## 11. Pendências Técnicas

| # | Item | Prioridade | Detalhe |
|---|------|-----------|---------|
| T1 | Hero em 320px | Baixa | 67px além da dobra. CTAs visíveis, sem scroll horizontal. Validar em iPhone SE físico. |
| T2 | MapLibre em produção | Média | Mapa depende de serviço externo de mapas. Confirmar renderização após publicação no domínio real. |
| T3 | Safari / iOS | Média | Não testado. Testar antes de campanhas mobile. |
| T4 | Analytics | Alta | Nenhum script de rastreamento instalado. Configurar Google Analytics 4 ou Meta Pixel antes de iniciar tráfego pago. |
| T5 | Formulário de leads | Baixa | Todos os contatos são via WhatsApp. Se desejar capturar e-mails, será necessário desenvolver um formulário dedicado. |

---

## 12. Pendências de Conteúdo

| # | Item | Arquivo |
|---|------|---------|
| C1 | **Especificações técnicas das linhas** — a Home e a página de Produtos mostram capacidades diferentes para a mesma linha. Exemplo: Linha Leve aparece como "até 3.500 kg" na Home e "4.000–7.000 kg" em Produtos. | `index.html`, `produtos.html` |
| C2 | **"Suporte 24h"** — o diferencial de número 3 na Home diz "atendimento pós-venda disponível 24 horas". Confirmar se esse é o horário real de atendimento. | `index.html` |
| C3 | **Depoimentos da página Clientes** — os 6 depoimentos desta página estão elaborados de forma diferente dos depoimentos reais do Google exibidos na Home. Confirmar origem e autenticidade. | `clientes.html` |

---

## 13. Pontos que Precisam de Validação do Cliente

| # | Pergunta | Urgência |
|---|----------|----------|
| V1 | Qual é a capacidade correta de cada linha? (Leve: até 3.500 kg ou 4.000–7.000 kg?) | **Alta — afeta credibilidade** |
| V2 | A empresa realmente oferece atendimento pós-venda 24 horas? | **Alta — afeta reputação** |
| V3 | Os depoimentos da página Clientes são de clientes reais? Se sim, há autorização de uso? | **Alta — aspecto jurídico** |
| V4 | O número de WhatsApp `(48) 3348-9982` está configurado e ativo para receber leads? | **Crítica — sem isso o site não converte** |
| V5 | Existe rastreamento de conversões configurado (Google Analytics, Meta Pixel)? | Média |
| V6 | Há um domínio contratado e hospedagem definida para o site? | **Crítica — necessário para publicar** |

---

## 14. Recomendações Pós-Entrega

**Curto prazo — antes de iniciar tráfego**

1. **Configurar Google Analytics 4** — instalar no `<head>` de todas as páginas para rastrear visitas, origem de tráfego e cliques nos CTAs de WhatsApp.
2. **Conectar domínio e publicar** — configurar DNS apontando para o servidor de hospedagem.
3. **Testar em Safari / iOS** — especialmente animações e o mapa.
4. **Solicitar indexação no Google Search Console** — após publicar, submeter o sitemap em `machadoplataformas.com.br/sitemap.xml`.
5. **Resolver os pontos V1 a V4** da seção 13.

**Médio prazo — 1 a 3 meses após publicação**

6. **CDN de imagens** — as imagens somam 66 MB. Considerar Cloudflare Images ou similar para entrega mais rápida em clientes do Norte e Nordeste.
7. **Criar perfil no Google Meu Negócio** — aparece em buscas locais e valida o endereço da fábrica.
8. **Adicionar dados estruturados** nas sub-páginas (Produtos, Clientes) para melhorar aparência no Google.
9. **Acompanhar PageSpeed Insights** após publicação em produção — medir LCP, CLS e INP reais com dados do domínio definitivo.
10. **Monitorar o WhatsApp** — confirmar que os leads chegam e que o tempo de resposta está dentro do esperado.

---

## 15. Checklist para Iniciar Tráfego Pago

Antes de qualquer campanha no Google Ads, Meta Ads ou TikTok Ads, confirmar cada item abaixo:

- [ ] Domínio publicado e funcionando com HTTPS
- [ ] Google Analytics 4 instalado e verificado
- [ ] Meta Pixel instalado (se campanhas no Instagram / Facebook)
- [ ] Evento de clique no WhatsApp rastreado como conversão
- [ ] WhatsApp ativo e respondendo em menos de 1 hora
- [ ] Especificações técnicas das linhas corrigidas e alinhadas entre Home e Produtos
- [ ] Teste Safari / iOS concluído sem erros
- [ ] Página Home testada em iPhone físico 320px
- [ ] Mapa da página Sobre testado no domínio de produção
- [ ] Google Meu Negócio criado e verificado
- [ ] Sitemap submetido no Google Search Console
- [ ] Depoimentos da página Clientes validados pelo cliente
- [ ] "Suporte 24h" confirmado ou corrigido
- [ ] Budget de campanha definido e landing page de destino escolhida

---

*Documento gerado em 30/05/2026 com base em auditoria automatizada (Playwright + Node.js) e revisão manual. Válido para a versão atual do código.*
