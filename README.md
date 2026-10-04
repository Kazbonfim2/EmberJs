# Ember UI

Design system em HTML e CSS puro, com visual denso e compacto de software de desktop gamer e cor de destaque laranja saturado.

Sem frameworks, sem bibliotecas, sem CDNs. Um único arquivo.

> Inspirado no estilo visual de clientes de jogos para desktop. Não usa logos, ícones ou assets de nenhuma marca.

## Como usar

Abra o `index.html` no navegador. Não precisa instalar nada.

A página é uma demonstração com uma seção por componente, menu lateral e botão de tema (claro/escuro) no topo.

## Componentes

- Botões (primário, secundário, ghost, perigoso, ícone, P/M/G, loading)
- Inputs, senha, busca, textarea e select, com estados de erro e sucesso
- Checkbox, radio, switch e slider
- Tabs e menu lateral
- Janela de app, com barra de título
- Modais (simples, confirmação e erro)
- Dropdown e menu de contexto
- Tooltip e popover
- Cards de jogo/produto
- Lista de biblioteca
- Barra de progresso e de download
- Badges, tags e avatar com status
- Toasts
- Paginação e breadcrumb
- Scrollbar customizada

Todos têm estados normal, hover, `focus-visible`, active e disabled.

## Estrutura do arquivo

O CSS fica dentro de `<style>`, em blocos comentados:

1. **Tokens:** cores, espaçamentos, raios e sombras (`:root`)
2. **Base**
3. **Componentes**
4. **Demo e utilitários**

O JavaScript no final do arquivo é pequeno e cuida só de tema, modal, tabs, dropdown, menu de contexto, fechar toast e mostrar/ocultar senha.

## Temas

A troca é feita pelo atributo `data-theme` no `<html>`:

```html
<html data-theme="dark">   <!-- ou "light" -->
```

A escolha fica salva no `localStorage`.

## Trocar a cor de destaque

Altere no `:root`:

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
