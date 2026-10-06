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
bun run pack:lib     # build:lib + empacota tudo em ember-ui-<versão>.tgz, pronto pra instalar em outro projeto
bun test             # roda a suíte de testes (bun:test)
```

`src/App.tsx` é a página de demo — uma seção por componente, menu lateral e botão de tema (claro/escuro) no topo, equivalente ao `index.html` original.

## Instalar em outro projeto (pacote não publicado no npm)

`ember-ui` **não está publicado no registry do npm** — não existe `npm install ember-ui` que funcione sozinho. A forma de instalar é via **tarball local**, gerado a partir deste repositório. Qualquer gerenciador (`npm`, `bun`, `yarn`, `pnpm`) entende esse tarball normalmente, do mesmo jeito que entenderia um pacote baixado do registry.

### 1. Gerar o tarball

Neste repositório:

```bash
bun run pack:lib
```

Isso roda `build:lib` (gera `dist/`) e empacota tudo — `dist/`, `package.json`, `README.md` — em `ember-ui-0.1.0.tgz`, na raiz do repo. Repita sempre que mudar algo em `src/`.

> Em ambientes Windows com o repositório dentro de uma pasta sincronizada pelo OneDrive com acentos no caminho, `bun pm pack` pode falhar com `failed to open tarball file destination` — é um bug do Bun nesse cenário específico, não do pacote. Por isso o script usa `npm pack` por baixo (requer o `npm` instalado, que já vem com o Node).

### 2. Instalar o tarball no projeto consumidor

```bash
# caminho absoluto ou relativo até o .tgz gerado no passo 1
npm install /caminho/para/html-css-js-emberjs/ember-ui-0.1.0.tgz react react-dom
# ou, com bun:
bun add /caminho/para/html-css-js-emberjs/ember-ui-0.1.0.tgz react react-dom
```

Ou fixe no `package.json` do projeto consumidor (ótimo pra quem quer repetir a instalação em outra máquina):

```json
{
  "dependencies": {
    "ember-ui": "file:../html-css-js-emberjs/ember-ui-0.1.0.tgz",
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}
```

seguido de `npm install` (ou `bun install`/`yarn install`/`pnpm install`) normalmente.

### 3. Alternativa para desenvolvimento ativo (hot-reload do próprio código-fonte)

Sem precisar regerar o tarball a cada mudança — só pra iterar localmente:

```bash
# neste repositório
bun run build:lib
bun link

# no projeto consumidor
bun link ember-ui
```

(`npm link` funciona do mesmo jeito, trocando `bun` por `npm`.) Depois de qualquer mudança em `src/`, rode `bun run build:lib` de novo neste repositório — o link aponta pra `dist/`, não pro código-fonte.

As duas formas resultam no mesmo pacote `ember-ui` — import, CSS e providers funcionam exatamente como documentado abaixo. Este fluxo (e só ele, hoje) também está descrito em [`public/llms.txt`](public/llms.txt) e na seção "Primeiros passos" da [página de demo](#como-usar), para que um agente de IA consiga instalar a biblioteca sem precisar perguntar.

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

- [Button / ButtonGroup](#button--buttongroup) (primário, secundário, ghost, perigoso, ícone, P/M/G, loading)
- [Field / Input / PasswordInput / Select / Textarea](#field--input--passwordinput--select--textarea), com estados de erro e sucesso
- [Checkbox / Radio / Switch](#checkbox--radio--switch) e [Slider](#slider)
- [Tabs](#tabs) e [SideNav](#sidenav)
- [Window](#window), com barra de título
- [Modal](#modal) (padrão, aviso e erro) — `<dialog>` nativo
- [Dropdown](#dropdown) e [ContextMenu](#contextmenu) — posicionados com [Floating UI](https://floating-ui.com/)
- [Tooltip](#tooltip) e [Popover](#popover) — também via Floating UI
- [Card / CardGrid](#card--cardgrid) de jogo/produto
- [LibraryList](#librarylist)
- [Progress / Download](#progress--download) — barra de progresso e de download
- [Badge / Tag / Avatar](#badge--tag--avatar)
- [Toast](#toast), via `ToastProvider` + `useToast()`
- [Pagination / Breadcrumb](#pagination--breadcrumb)
- [Accordion](#accordion)
- [BlinkingIcon](#blinkingicon) e [Icon](#icon)
- [CodeWindow](#codewindow)
- [Heading / Text](#heading--text)
- [SmoothScrollProvider](#smoothscrollprovider) — scrollbar/scroll customizado
- `Flex`/`FlexItem` — sistema de layout (veja [Sistema de layout (Flex)](#sistema-de-layout-flex))
- `QRCode` — gera e exibe QR codes (veja [QRCode](#qrcode))

Todos têm estados normal, hover, `focus-visible`, active e disabled.

## Prop de espaçamento (m/p)

Todo componente aceita as mesmas props de margin/padding no estilo Chakra UI: `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my`, `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py`. Um número de `1` a `7` usa os tokens `--sp-1`..`--sp-7`; qualquer outro número (px) ou string CSS (`"1rem"`) passa direto.

```tsx
import { Button, Card } from "ember-ui";

<Button mt={3} px="20px">Confirmar</Button>
<Card mb={2} title="Jogo" />
```

## Guia de componentes

### Button / ButtonGroup

Variantes `primary` (default) | `secondary` | `ghost` | `danger`, tamanhos `sm` | `md` (default) | `lg`, prop `icon` pra botão quadrado só com ícone (precisa de `aria-label`) e `loading` pra estado de carregamento.

```tsx
import { Button, ButtonGroup } from "ember-ui";

<Button>Salvar</Button>
<Button variant="secondary">Cancelar</Button>
<Button variant="ghost" size="sm">Ver mais</Button>
<Button variant="danger">Excluir</Button>

// botão de loading: trava o clique (disabled) e marca aria-busy pro leitor de tela
function SalvarButton() {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    await salvar();
    setLoading(false);
  }

  return (
    <Button loading={loading} disabled={loading} onClick={handleClick}>
      {loading ? "Salvando…" : "Salvar"}
    </Button>
  );
}

// botão só com ícone -- aria-label é obrigatório, não é decorativo
<Button icon aria-label="Fechar">
  <Icon name="x" size="sm" />
</Button>

// agrupados, com rótulo acessível pro grupo
<ButtonGroup label="Ações da linha">
  <Button variant="secondary">Editar</Button>
  <Button variant="danger">Excluir</Button>
</ButtonGroup>
```

### Field / Input / PasswordInput / Select / Textarea

`Field` é o wrapper (label + dica + estado); dentro dele vai um `Input`, `PasswordInput`, `Select` ou `Textarea`. `state` pode ser `"error"` ou `"success"`.

```tsx
import { Field, Input, PasswordInput, Select, Textarea } from "ember-ui";

<Field label="Nome de usuário" htmlFor="user">
  <Input id="user" leadingIcon="users" placeholder="seu_nick" />
</Field>

<Field label="Senha" htmlFor="pass" state="error" hint="Mínimo 8 caracteres" hintIcon="circle-alert">
  <PasswordInput id="pass" />
</Field>

<Field label="Região" htmlFor="region" state="success" hint="Disponível">
  <Select id="region">
    <option>Brasil</option>
    <option>EUA</option>
  </Select>
</Field>

<Field label="Bio" htmlFor="bio">
  <Textarea id="bio" rows={4} />
</Field>
```

### Checkbox / Radio / Switch

Os três recebem o rótulo como `children` (envolvem um `<label>`), e qualquer atributo nativo de `<input>` (`checked`, `onChange`, `disabled`...).

```tsx
import { Checkbox, Radio, Switch } from "ember-ui";

<Checkbox checked={aceito} onChange={(e) => setAceito(e.target.checked)}>Aceito os termos</Checkbox>
<Radio name="plano" value="pro">Plano Pro</Radio>
<Switch checked={notificacoes} onChange={(e) => setNotificacoes(e.target.checked)}>Notificações</Switch>
```

### Slider

Um `<input type="range">` estilizado; use como um range nativo.

```tsx
import { Slider } from "ember-ui";

<Slider min={0} max={100} value={volume} onChange={(e) => setVolume(Number(e.target.value))} />
```

### Tabs

`Tabs` guarda o estado controlado (`value`/`onChange`); `TabList` precisa de `aria-label`; `Tab`/`TabPanel` compartilham o mesmo `value`. Navegação por setas já incluída.

```tsx
import { Tabs, TabList, Tab, TabPanel } from "ember-ui";

function Exemplo() {
  const [tab, setTab] = useState("geral");
  return (
    <Tabs value={tab} onChange={setTab}>
      <TabList aria-label="Configurações">
        <Tab value="geral">Geral</Tab>
        <Tab value="avancado" disabled>Avançado</Tab>
      </TabList>
      <TabPanel value="geral">Conteúdo geral</TabPanel>
      <TabPanel value="avancado">Conteúdo avançado</TabPanel>
    </Tabs>
  );
}
```

### SideNav

`SideNav` é a lista; `SideNavTitle` é um título de seção; `SideNavLink` (com `current`) ou `SideNavButton` são os itens.

```tsx
import { SideNav, SideNavTitle, SideNavLink, SideNavButton } from "ember-ui";

<SideNav>
  <SideNavTitle>Biblioteca</SideNavTitle>
  <SideNavLink href="/jogos" current>Jogos</SideNavLink>
  <SideNavLink href="/loja">Loja</SideNavLink>
  <SideNavButton onClick={sair}>Sair</SideNavButton>
</SideNav>
```

### Window

Janela com barra de título e botões de minimizar/maximizar/fechar (cada `on...` é opcional).

```tsx
import { Window } from "ember-ui";

<Window title="Configurações" onMinimize={minimizar} onMaximize={maximizar} onClose={fechar}>
  <p>Conteúdo da janela.</p>
</Window>
```

### Modal

Controlado via `open`/`onClose`; precisa de `title` + `titleId` (usado no `aria-labelledby`). `variant` é `"default"` | `"warn"` | `"danger"`. Sem `icon`, mostra o X de fechar; com `icon`, mostra o ícone no cabeçalho (ex.: confirmação/erro) e não mostra o X.

```tsx
import { Modal, Button } from "ember-ui";

function ConfirmarExclusao() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>Excluir</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Excluir item?"
        titleId="modal-excluir"
        variant="danger"
        icon="circle-alert"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button variant="danger" onClick={confirmarExclusao}>Excluir</Button>
          </>
        }
      >
        Essa ação não pode ser desfeita.
      </Modal>
    </>
  );
}
```

### Dropdown

`trigger` é o conteúdo do botão que abre o menu (`triggerVariant`, default `"secondary"`); os itens são `MenuItem`/`MenuSeparator`.

```tsx
import { Dropdown, MenuItem, MenuSeparator } from "ember-ui";

<Dropdown trigger="Ações">
  <MenuItem icon="settings" shortcut="Ctrl+,">Preferências</MenuItem>
  <MenuSeparator />
  <MenuItem icon="trash" danger onSelect={excluir}>Excluir</MenuItem>
</Dropdown>
```

### ContextMenu

Envolve um único elemento; abre no ponto do clique direito.

```tsx
import { ContextMenu, MenuItem } from "ember-ui";

<ContextMenu menu={<MenuItem onSelect={copiar}>Copiar</MenuItem>}>
  <div className="card">Clique com o botão direito aqui</div>
</ContextMenu>
```

### Tooltip

Envolve um único elemento focável/hoverável.

```tsx
import { Tooltip, Button } from "ember-ui";

<Tooltip label="Salvar alterações">
  <Button icon aria-label="Salvar"><Icon name="check" /></Button>
</Tooltip>
```

### Popover

Como o `Dropdown`, mas o conteúdo é livre (não é uma lista de menu).

```tsx
import { Popover } from "ember-ui";

<Popover trigger="Filtros">
  <Checkbox>Só favoritos</Checkbox>
</Popover>
```

### Card / CardGrid

`image` substitui o ícone/gradiente (`colorFrom`/`colorTo`) quando informada. `price` aceita `Discount`/`PriceOld`/`PriceNow`.

```tsx
import { Card, CardGrid, Badge, Discount, PriceOld, PriceNow } from "ember-ui";

<CardGrid>
  <Card
    title="Forja das Brasas"
    href="/jogo/forja"
    colorFrom="#ff6a00"
    colorTo="#b33300"
    icon="gamepad"
    tags={<Badge variant="ok">Indie</Badge>}
    price={<><Discount>-30%</Discount><PriceOld>R$ 50</PriceOld><PriceNow>R$ 35</PriceNow></>}
  />
  <Card title="Em breve" image="/capa.jpg" disabled />
</CardGrid>
```

### LibraryList

```tsx
import { LibraryList, LibraryItem } from "ember-ui";

<LibraryList>
  <LibraryItem colorFrom="#ff6a00" colorTo="#b33300" name="Forja das Brasas" meta="12h jogadas" current />
  <LibraryItem colorFrom="#444" colorTo="#222" name="Ruínas de Vidro" meta="Instalado" />
</LibraryList>
```

### Progress / Download

`Progress` é a barra isolada (`variant`: `"default"` | `"ok"` | `"paused"` | `"live"`); `Download` é o card completo de download, com `Progress` embutido.

```tsx
import { Progress, Download } from "ember-ui";

<Progress value={72} label="Instalando" variant="live" />

<Download
  title="Forja das Brasas"
  status="Baixando"
  percent={54}
  speed="12 MB/s"
  sizeText="2.1 GB de 4.0 GB"
  etaText="3 min restantes"
  onPause={pausar}
  onCancel={cancelar}
/>
```

### Badge / Tag / Avatar

`Badge` tem `variant`: `"default"` | `"ok"` | `"err"` | `"warn"` | `"info"` | `"muted"`. `Tag` aceita `onRemove` + `removeLabel` pra ficar removível. `Avatar` precisa de `label` acessível e aceita `status`: `"online"` | `"away"` | `"offline"`.

```tsx
import { Badge, Tag, Avatar } from "ember-ui";

<Badge variant="ok">Online</Badge>
<Tag onRemove={() => removerTag("indie")} removeLabel="Remover tag Indie">Indie</Tag>
<Avatar label="Lucas, online" status="online">LB</Avatar>
```

### Toast

Envolva a árvore com `ToastProvider` e dispare com `useToast()`. `variant`: `"ok"` | `"err"` | `"warn"` | `"info"`.

```tsx
import { ToastProvider, useToast, Button } from "ember-ui";

function App() {
  return (
    <ToastProvider>
      <Botoes />
    </ToastProvider>
  );
}

function Botoes() {
  const toast = useToast();
  return (
    <Button onClick={() => toast({ title: "Salvo!", variant: "ok" })}>
      Salvar
    </Button>
  );
}
```

### Pagination / Breadcrumb

```tsx
import { Pagination, Breadcrumb, BreadcrumbItem } from "ember-ui";

<Pagination page={page} totalPages={10} onChange={setPage} />

<Breadcrumb>
  <BreadcrumbItem href="/">Início</BreadcrumbItem>
  <BreadcrumbItem href="/loja">Loja</BreadcrumbItem>
  <BreadcrumbItem current>Forja das Brasas</BreadcrumbItem>
</Breadcrumb>
```

### Accordion

`defaultValue` define qual item começa aberto (omitido = todos fechados); abrir um item fecha o outro.

```tsx
import { Accordion, AccordionItem } from "ember-ui";

<Accordion defaultValue="requisitos">
  <AccordionItem value="requisitos" title="Requisitos do sistema">
    8 GB de RAM, GPU com 4 GB de VRAM.
  </AccordionItem>
  <AccordionItem value="suporte" title="Suporte" disabled>
    Em breve.
  </AccordionItem>
</Accordion>
```

### BlinkingIcon

Ícone com animação de "pulso" (respeita `prefers-reduced-motion`); `label` torna-o acessível, senão é decorativo.

```tsx
import { BlinkingIcon } from "ember-ui";

<BlinkingIcon name="bell" label="Notificação nova" size="lg" />
```

### Icon

SVG sprite interno; `size`: `"sm"` | `"md"` (default). Lista completa de `IconName` em `src/components/Icon/Icon.tsx`.

```tsx
import { Icon } from "ember-ui";

<Icon name="download" size="sm" />
```

### CodeWindow

Bloco de código com barra de título e botão de copiar (usa `navigator.clipboard`).

```tsx
import { CodeWindow } from "ember-ui";

<CodeWindow title="Instalação" code={`bun add ember-ui`} />
```

### Heading / Text

`Text` é o texto genérico (`as`, `size`, `weight`, `color`, `align`, `italic`, `truncate`); `Heading` é um `Text` com nível semântico `h1`..`h4` e tamanho/peso/cor padrão pro nível (`variant="sub"` dá o rótulo pequeno em caixa alta).

```tsx
import { Heading, Text } from "ember-ui";

<Heading level={1}>Título da página</Heading>
<Heading level={3} variant="sub">Seção</Heading>
<Text color="muted" truncate>Descrição longa que corta com elipse numa linha só</Text>
```

### SmoothScrollProvider

Suaviza o scroll da página inteira (Lenis), incluindo cliques em âncoras (`<a href="#id">`). Respeita `prefers-reduced-motion` por padrão.

```tsx
import { SmoothScrollProvider } from "ember-ui";

<SmoothScrollProvider>
  <App />
</SmoothScrollProvider>
```

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

## Sistema de layout (Flex)

`Flex` e `FlexItem` existem pra não precisar escrever `display: flex` e as propriedades relacionadas na mão em todo canto — eles normalizam as opções mais comuns de flexbox como props, usando os tokens de espaçamento (`--sp-1`..`--sp-7`) no `gap`. Funcionam junto com qualquer outro componente da biblioteca (um `Flex` pode conter `Button`, `Badge`, `Card`, o que for).

```tsx
import { Flex, FlexItem, Button, Badge } from "ember-ui";

// linha de botões, com quebra automática e espaçamento no token 3 (--sp-3)
<Flex gap={3} wrap>
  <Button variant="primary">Instalar</Button>
  <Button variant="secondary">Cancelar</Button>
</Flex>

// alinhar nas pontas
<Flex align="center" justify="between">
  <Badge>Esquerda</Badge>
  <Badge variant="ok">Direita</Badge>
</Flex>

// coluna com um item que cresce pra ocupar o espaço livre
<Flex direction="column" gap={2}>
  <FlexItem grow>Cresce</FlexItem>
  <FlexItem>Tamanho natural</FlexItem>
</Flex>
```

**`Flex` props:**

| Prop | Valores | Default |
| --- | --- | --- |
| `direction` | `row` \| `column` \| `row-reverse` \| `column-reverse` | `row` |
| `align` | `start` \| `center` \| `end` \| `stretch` \| `baseline` | — (`align-items` do navegador) |
| `justify` | `start` \| `center` \| `end` \| `between` \| `around` \| `evenly` | — (`justify-content` do navegador) |
| `gap` | `1`–`7` (usa `var(--sp-N)`) ou qualquer string CSS (`"12px"`, `"1rem"`) | — |
| `wrap` | `boolean` | `false` |
| `inline` | `boolean` (`inline-flex` em vez de `flex`) | `false` |
| `as` | qualquer tag/componente (`"ul"`, `"nav"`, ...) | `"div"` |

**`FlexItem` props:** `grow`/`shrink` (`boolean` vira `0`/`1`, ou passe um número exato), `basis` (qualquer `flex-basis` válido), `order`, `as`.

Não gera nenhuma classe CSS nova — tudo é resolvido via `style` computado a partir das props, então não tem risco de colidir com as classes do resto do design system.

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

Ícones: [Famicons](https://icones.js.org/collection/famicons) (via [Iconify](https://iconify.design)), licença MIT, embutidos como SVG inline.
