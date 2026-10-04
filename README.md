# Ember UI

Biblioteca de componentes React do design system Ember UI: visual denso e compacto de software de desktop gamer, cor de destaque laranja saturado. Runtime principal é o [Bun](https://bun.sh).

> Esta é a branch `react/main`. A versão original em HTML/CSS/JS puro, de arquivo único, continua em `main`.

> Inspirado no estilo visual de clientes de jogos para desktop. Não usa logos, ícones ou assets de nenhuma marca.

## Como usar

```bash
bun install   # instala as dependências
bun dev       # sobe a página de demo (Vite) em http://localhost:5173
bun run build       # build de produção da página de demo
bun run build:lib   # gera dist/ com os componentes prontos para importar em outro projeto
bun test             # roda a suíte de testes (bun:test)
```

`src/App.tsx` é a página de demo — uma seção por componente, menu lateral e botão de tema (claro/escuro) no topo, equivalente ao `index.html` original.

## Importar um componente

```tsx
import { Button, Modal, useToast } from "ember-ui";

function Exemplo() {
  const toast = useToast();
  return <Button onClick={() => toast({ title: "Oi!", variant: "ok" })}>Clique</Button>;
}
```

`src/index.ts` é o barrel público: reexporta todos os componentes, hooks e helpers. Cada componente mora isolado em `src/components/<Nome>/`, com seu próprio `.tsx` e `.css`.

## Componentes

- Botões (primário, secundário, ghost, perigoso, ícone, P/M/G, loading)
- Inputs, senha, busca, textarea e select, com estados de erro e sucesso
- Checkbox, radio, switch e slider
- Tabs e menu lateral
- Janela de app, com barra de título
- Modais (simples, confirmação e erro) — `<dialog>` nativo
- Dropdown e menu de contexto — posicionados com [Floating UI](https://floating-ui.com/)
- Tooltip e popover — também via Floating UI
- Cards de jogo/produto
- Lista de biblioteca
- Barra de progresso e de download
- Badges, tags e avatar com status
- Toasts, via `ToastProvider` + `useToast()`
- Paginação e breadcrumb
- Scrollbar customizada
- `QRCode` — gera e exibe QR codes (veja [QRCode](#qrcode))

Todos têm estados normal, hover, `focus-visible`, active e disabled.

## Estrutura

```
src/
  styles/      tokens.css, base.css (reutilizáveis) e layout.css (só da página de demo)
  lib/         helpers puros: classnames, navegação por teclado, paginação
  theme/       ThemeProvider / useTheme / ThemeToggle
  components/  um componente por pasta, com .tsx + .css + index.ts
  index.ts     barrel público da biblioteca
  App.tsx      página de demo
tests/         bun:test sobre a lógica não-trivial extraída em lib/ e theme/
```

## Temas

A troca é feita pelo atributo `data-theme` no `<html>`, via `ThemeProvider`/`useTheme`:

```tsx
import { ThemeProvider, ThemeToggle } from "ember-ui";

<ThemeProvider>
  <ThemeToggle />
  {/* resto do app */}
</ThemeProvider>
```

A escolha fica salva no `localStorage` (chave `ember-theme`).

## QRCode

Gera e exibe QR codes como SVG — sem canvas, sem chamada de rede, sem leitura/decodificação (fora de escopo). Usa o pacote
[`qrcode`](https://www.npmjs.com/package/qrcode) só pela parte síncrona de codificação (algoritmo de Reed-Solomon); a
renderização em SVG é nossa, o que dá controle total de cor e tamanho via props.

```tsx
import { QRCode } from "ember-ui";

// uso simples -- cor e fundo já vêm do tema (--text-strong / --bg-raised)
<QRCode value="https://ember-ui.example/convite" />

// conteúdo curto, destinado a impressão: mais correção de erro, menos espaço
<QRCode value="ID-4821-FORJA-DAS-BRASAS" size={96} level="H" />

// cor customizada, sobrepondo o tema
<QRCode value="https://ember-ui.example" color="var(--accent)" background="none" />
```

**Props:**

| Prop | Tipo | Default | Uso |
| --- | --- | --- | --- |
| `value` | `string` | — (obrigatório) | Texto/URL a codificar |
| `size` | `number` | `160` | Lado do SVG, em px |
| `level` | `"L" \| "M" \| "Q" \| "H"` | `"M"` | Correção de erro -- mais alto tolera mais dano, mas gera um QR mais denso |
| `margin` | `number` | `2` | Módulos de zona de silêncio em volta do código |
| `color` | `string` | `"var(--text-strong)"` | Cor dos módulos escuros |
| `background` | `string` | `"var(--bg-raised)"` | Cor de fundo (`"none"` pra transparente) |

Regra prática pro `level`: `"M"` (padrão) cobre a maioria dos casos em tela; suba pra `"Q"`/`"H"` só quando o código for
impresso e puder se sujar, arranhar ou ser parcialmente coberto -- o ganho de robustez custa um QR com mais módulos.

## Trocar a cor de destaque

Altere em `src/styles/tokens.css`:

| Variável | Uso |
| --- | --- |
| `--accent` | Cor base |
| `--accent-hover` | Hover e topo do gradiente |
| `--accent-active` | Estado pressionado e bordas |
| `--on-accent` | Texto sobre o destaque (confira o contraste AA) |
| `--accent-soft` | Fundo translúcido (item ativo, foco) |
| `--accent-fg` | Destaque usado como texto, por tema |
| `--focus` | Cor do anel de foco, por tema |

## Acessibilidade

- Foco visível em todos os elementos interativos
- Contraste AA nos dois temas
- Navegação por teclado (tabs com setas, menus com setas, `Esc` para fechar)
- `aria-label`, `aria-current`, `aria-selected` e `role` nos componentes
- Respeita `prefers-reduced-motion`

## Créditos

Ícones: [Lucide](https://lucide.dev), licença ISC, embutidos como SVG inline.
