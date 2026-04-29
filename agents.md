# AGENTS.md — Instruções para Agentes de IA

> Leia CLAUDE.md primeiro para o contexto completo do projeto. Este arquivo define como cada agente deve se comportar, o que jamais pode fazer, e os padrões de código do projeto Machado Plataformas.

---

## 🤖 Identidade do Projeto para os Agentes

**Projeto:** Machado Plataformas — Landing Page Comercial
**Segmento:** Fabricante de plataformas para guincho (mercado B2B/B2C rodoviário)
**Referência visual:** good-fella.com (layout editorial, animações premium, tipografia de alto impacto)
**Tom visual:** Industrial premium. Escuro, pesado, confiável. O produto pesa toneladas — o design também.
**Objetivo:** Landing page que pareça de fabricante líder de mercado. Autoridade + desejo + conversão.

---

## 🚫 Regras Imutáveis — Jamais Quebre

1. **Nunca apague animações** sem autorização explícita
2. **Nunca use `!important`** no CSS — resolva especificidade corretamente
3. **Nunca use `setTimeout`** para timing de animação — use GSAP delays e timelines
4. **Nunca use frameworks CSS** (Bootstrap, Tailwind) — design 100% custom
5. **Nunca hardcode cores ou espaçamentos** — sempre use as variáveis de `variables.css`
6. **Nunca misture lógica de animação com lógica de formulário/negócio** — módulos separados
7. **Nunca crie arquivos fora da estrutura** definida no CLAUDE.md
8. **A fonte Machado (METAG___.TTF)** é usada EXCLUSIVAMENTE em headlines e display — nunca em body text ou labels
9. **O logo SVG é sempre branco** sobre fundo escuro — não alterar cores do SVG inline
10. **CTAs principais sempre em azul primário** (`--color-primary`) — nunca mudar sem aprovação

---

## 🎭 Papel de Cada Agente

### Claude.ai (Interface Web)
**Papel:** Arquiteto, Designer, Solucionador de Problemas Pontuais

**Quando usar:**
- Criar um componente isolado para avaliar antes de implementar
- Discutir decisões de design ou arquitetura
- Resolver problemas de animação específicos
- Revisar código antes de integrar

**Formato de entrega preferido:**
```
[Componente: nome-do-componente]
[Arquivo: css/components/nome.css ou js/animations/nome.js]
[Dependências: GSAP / SplitText / etc.]
---
[código completo e funcional]
```

**Regra:** Sempre perguntar "Quer que eu implemente diretamente ou gero o código para integração?"

---

### Claude Code (CLI)
**Papel:** Implementador Principal e Integrador

**Rotina de início de sessão:**
```bash
# 1. Ler o contexto
cat CLAUDE.md

# 2. Verificar estado do projeto
ls -la
find . -not -path '*/node_modules/*' -not -path '*/.git/*' | sort

# 3. Verificar se há erros de lint
node --check js/main.js
```

**Ao implementar uma seção nova:**
1. HTML semântico primeiro (estrutura + aria labels)
2. CSS com tokens de `variables.css` (nunca valores mágicos)
3. JS: criar módulo de animação em `js/animations/`
4. Importar e chamar `init()` em `main.js` na ordem correta
5. Testar scroll e timing mental antes de commitar

**Ao implementar uma animação:**
1. Verificar se o elemento HTML existe no DOM
2. Verificar se o CSS inicial existe (`opacity: 0` etc.)
3. Escrever o módulo com guard clause
4. Integrar em `scroll-triggers.js` ou `main.js` conforme o tipo

**Checklist antes de commitar:**
```
[ ] Sem console.log() esquecidos
[ ] Sem markers: true no ScrollTrigger
[ ] Sem valores hardcoded (cores, espaçamentos)
[ ] Guard clauses presentes em todos os módulos JS
[ ] Responsivo testado mentalmente (375px e 1280px)
```

---

### Codex (OpenAI)
**Papel:** Gerador de Snippets e Utilitários Específicos

**Prompt base obrigatório para cada tarefa:**
```
Projeto: Machado Plataformas — Landing page de fabricante de plataformas para guincho.
Stack: HTML5 + CSS Custom Properties + Vanilla JS + GSAP 3.12 + Lenis smooth scroll.
Regras:
  - Sem frameworks CSS (Bootstrap, Tailwind)
  - Sem TypeScript
  - Sem bundler/build tool
  - Nomes de variáveis em inglês
  - Comentários em português
  - Sempre incluir guard clause: if (!el) return;

Tarefa: [DESCREVER AQUI]
```

**Áreas de atuação do Codex:**
- Funções utilitárias (debounce, throttle, viewport helpers)
- Algoritmos de animação (física de scroll, interpolação)
- Lógica de formulário (validação, fetch/submit)
- Código que não envolve decisão de design

---

## 🔧 Padrões de Código

### HTML — Template de Seção
```html
<!-- ==========================================
     [NÚMERO]. [NOME DA SEÇÃO]
     ========================================== -->
<section id="[id-secao]" class="section [id-secao]" aria-labelledby="[id-secao]-heading">
  <div class="container">

    <!-- Header da seção -->
    <div class="section-header" data-animate="fade-up">
      <span class="eyebrow">[Label da seção]</span>
      <h2 id="[id-secao]-heading" class="section-title" data-animate="lines">
        [Título da seção]
      </h2>
    </div>

    <!-- Conteúdo -->

  </div>
</section>
```

### CSS — Template de Componente
```css
/* ===========================
   COMPONENTE: [Nome]
   Arquivo: css/components/[nome].css
   Depende de: variables.css, layout.css
=========================== */

/* --- Layout --- */
.component {
  display: grid;
}

/* --- Visual --- */
.component {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
}

/* --- Typography --- */
.component__title {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  color: var(--color-text);
}

/* --- Animation initial state --- */
.component[data-animate] {
  opacity: 0;
  transform: translateY(40px);
}

/* --- Responsive --- */
@media (min-width: 768px) {
  .component { }
}

@media (min-width: 1024px) {
  .component { }
}
```

### JS — Template de Módulo de Animação
```javascript
/**
 * [Nome do módulo]
 * @module animations/[nome]
 * @requires GSAP, ScrollTrigger (registrados em gsap-setup.js)
 */

export function init() {
  // Guard clause — sai silenciosamente se o elemento não existe
  const elements = document.querySelectorAll('[data-animate="[tipo]"]');
  if (!elements.length) return;

  elements.forEach((el, i) => {
    const delay = parseFloat(el.dataset.delay) || 0;

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 60,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay,
        ease: 'machado',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  });
}
```

### JS — main.js (Ordem de Inicialização)
```javascript
/**
 * main.js — Entry Point
 * ORDEM IMPORTA: cada módulo pode depender do anterior
 */

import { initLenis }         from './lenis.js';
import { initLoader }        from './loader.js';
import { initCursor }        from './animations/cursor.js';
import { initHero }          from './animations/hero.js';
import { initScrollTriggers} from './animations/scroll-triggers.js';
import { initMagnetic }      from './animations/magnetic.js';
import { initCounters }      from './animations/counters.js';
import { initProdutosTabs }  from './animations/produtos-tabs.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth scroll (outros dependem dele)
  const lenis = initLenis();

  // 2. Loader (bloqueia o resto até completar)
  initLoader().then(() => {

    // 3. Cursor (independente, sempre primeiro após loader)
    initCursor();

    // 4. Hero (primeira coisa visível)
    initHero();

    // 5. Scroll-based animations
    initScrollTriggers();

    // 6. Counters (prova social)
    initCounters();

    // 7. Interações
    initMagnetic();
    initProdutosTabs();

  });
});
```

---

## 🐛 Debugging Guide

### Animações não executam
```javascript
// 1. Verificar se GSAP carregou
console.log(gsap.version); // deve retornar "3.12.x"

// 2. Verificar se o elemento existe
console.log(document.querySelectorAll('[data-animate]').length);

// 3. Ativar markers para ver trigger points
scrollTrigger: { trigger: el, start: 'top 85%', markers: true }

// 4. Verificar integração Lenis + ScrollTrigger
// Deve estar em lenis.js:
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

### Scroll travado ou irregular
```javascript
// Checar se há overflow: hidden desnecessário no body ou html
// Checar se Lenis está sendo inicializado antes do ScrollTrigger
// Verificar se há elementos com position: fixed sem z-index correto
```

### Fonte Machado não aparece
```css
/* Verificar caminho do TTF */
@font-face {
  font-family: 'Machado';
  src: url('../assets/fonts/METAG___.TTF') format('truetype');
  font-display: swap;
}
/* Verificar no DevTools: Network tab → filtrar por "font" */
```

### Loader não completa
```javascript
// Garantir que a Promise resolve em todos os caminhos
// Adicionar timeout de segurança:
setTimeout(() => resolve(), 4000); // máximo 4s mesmo se falhar
```

---

## 📝 Histórico de Decisões

| # | Decisão | Motivo | Data |
|---|---------|--------|------|
| 1 | Vanilla JS sem framework | Máximo controle, zero overhead, fácil handoff | Início |
| 2 | GSAP + Lenis | Padrão do mercado premium, referência good-fella.com usa | Início |
| 3 | Sem bundler/build | Simplifica workflow, foco no resultado visual | Início |
| 4 | Fonte Machado (METAG___.TTF) | Identidade proprietária — só headlines e display | Início |
| 5 | Paleta azul navy escuro + aço | Mercado rodoviário/industrial — autoridade + técnico | Início |
| 6 | Hero com vídeo real | Produto físico precisa ser visto em movimento | Início |
| 7 | CTA duplo (Formulário + WhatsApp) | Diferentes perfis de lead (formal vs. imediato) | Início |

---

## ✅ Checklist de Qualidade (Antes de Entregar)

**Visual**
- [ ] Tipografia hierarquia clara: Display > H1 > H2 > H3 > Body > Caption
- [ ] Todas as cores via variáveis CSS
- [ ] Hover states em todos os elementos interativos
- [ ] Imagens sem distorção (object-fit: cover onde necessário)
- [ ] Fundo do vídeo hero não pisca ao carregar

**Funcional**
- [ ] Formulário com validação (campos obrigatórios + e-mail válido)
- [ ] Link WhatsApp com mensagem pré-formatada: `https://wa.me/55XXXXXXXXXXX?text=Olá,%20gostaria%20de%20um%20orçamento`
- [ ] Smooth scroll: clicar em link âncora leva suavemente à seção
- [ ] Mobile menu abre/fecha corretamente
- [ ] Navbar muda de estado ao scrollar

**Performance**
- [ ] Sem erros no console
- [ ] Images com alt text descritivo
- [ ] Imagens abaixo do fold com loading="lazy"
- [ ] Vídeo hero com poster (fallback enquanto carrega)

**Responsividade**
- [ ] 375px (iPhone SE)
- [ ] 768px (iPad)
- [ ] 1024px (Desktop pequeno)
- [ ] 1280px (Desktop padrão)

---

*Atualizar este arquivo sempre que novas decisões de arquitetura forem tomadas.*