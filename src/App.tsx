import { Fragment, useState } from "react";
import { Button } from "./components/Button";
import { Flex, FlexItem } from "./components/Flex";
import { Icon } from "./components/Icon";
import { BlinkingIcon } from "./components/BlinkingIcon";
import { Field, Input, Textarea, Select, PasswordInput } from "./components/Field";
import { Checkbox, Radio, Switch } from "./components/Checkbox";
import { Slider } from "./components/Slider";
import { Tabs, TabList, Tab, TabPanel } from "./components/Tabs";
import { SideNav, SideNavTitle, SideNavLink, SideNavButton } from "./components/SideNav";
import { Window } from "./components/Window";
import { Modal } from "./components/Modal";
import { Dropdown, MenuItem, MenuSeparator } from "./components/Dropdown";
import { ContextMenu } from "./components/ContextMenu";
import { Tooltip } from "./components/Tooltip";
import { Popover } from "./components/Popover";
import { Card, CardGrid, Discount, PriceOld, PriceNow } from "./components/Card";
import { LibraryList, LibraryItem } from "./components/LibraryList";
import { Progress, Download } from "./components/Progress";
import { Badge, Tag, Avatar } from "./components/Badge";
import { Toast, useToast } from "./components/Toast";
import { Pagination, Breadcrumb, BreadcrumbItem } from "./components/Pagination";
import { QRCode } from "./components/QRCode";
import { Text } from "./components/Text";
import { ThemeToggle } from "./theme";
import { CodeWindow } from "./demo/CodeWindow";

const SECTION_GROUPS = [
  {
    title: "Fundamentos",
    items: [
      ["cores", "Cores"],
      ["texto", "Texto"],
      ["spacing", "Espaçamento rápido"],
      ["flex", "Sistema de Flex"],
      ["scrollbar", "Scrollbar"],
    ],
  },
  {
    title: "Componentes",
    items: [
      ["botoes", "Botões"],
      ["inputs", "Inputs"],
      ["selecao", "Seleção"],
      ["tabs", "Tabs e navegação"],
      ["janela", "Janela"],
      ["modal", "Modais"],
      ["dropdown", "Dropdown e contexto"],
      ["tooltip", "Tooltip e popover"],
      ["cards", "Cards"],
      ["lista", "Lista"],
      ["progresso", "Progresso e download"],
      ["badges", "Badges e avatar"],
      ["icone-piscante", "Ícone piscante"],
      ["toasts", "Notificações"],
      ["paginacao", "Paginação"],
      ["qrcode", "QR code"],
    ],
  },
] as const;

const SWATCHES = [
  "--accent", "--accent-hover", "--accent-active", "--bg-app", "--bg-base", "--bg-raised",
  "--ok", "--err", "--warn", "--info",
];

function DemoToasts() {
  const [items, setItems] = useState([
    { id: 1, variant: "ok" as const, title: "Download concluído", text: "Forja das Brasas está pronto para jogar." },
    { id: 2, variant: "err" as const, title: "Falha ao sincronizar", text: "Tentaremos de novo em 30 segundos." },
    { id: 3, variant: "warn" as const, title: "Pouco espaço em disco", text: "Restam 2 GB no drive C." },
    { id: 4, variant: "info" as const, title: "Amigo online", text: "Ana entrou e está jogando Maré Profunda." },
  ]);
  return (
    <div className="toasts" style={{ position: "static" }}>
      {items.map((t) => (
        <Toast key={t.id} title={t.title} text={t.text} variant={t.variant} onDismiss={() => setItems((xs) => xs.filter((x) => x.id !== t.id))} />
      ))}
    </div>
  );
}

export function App() {
  const [tab, setTab] = useState("loja");
  const [openModal, setOpenModal] = useState<"basic" | "confirm" | "error" | null>(null);
  const [page, setPage] = useState(1);
  const toast = useToast();

  return (
    <>
      <a className="skip" href="#main">Pular para o conteúdo</a>

      <header className="topbar">
        <div className="brand"><Icon name="bonfire" className="brand-icon" /> Ember UI</div>
        <span className="muted grow">Design system</span>
        <ThemeToggle />
      </header>

      <div className="shell">
        <nav className="demo-nav" aria-label="Seções do design system">
          <SideNav>
            {SECTION_GROUPS.map((group) => (
              <Fragment key={group.title}>
                <SideNavTitle>{group.title}</SideNavTitle>
                {group.items.map(([id, label]) => (
                  <SideNavLink key={id} href={`#${id}`}>{label}</SideNavLink>
                ))}
              </Fragment>
            ))}
          </SideNav>
        </nav>

        <main id="main">
          <section className="sec" id="cores" aria-labelledby="h-cores">
            <h2 id="h-cores">Cores</h2>
            <div className="swatches">
              {SWATCHES.map((name) => (
                <div className="sw" key={name}>
                  <i style={{ background: `var(${name})` }} />
                  {name}
                </div>
              ))}
            </div>
          </section>

          <section className="sec" id="texto" aria-labelledby="h-texto">
            <h2 id="h-texto">Texto</h2>
            <Text className="muted">
              <code>Text</code> é o componente genérico pra qualquer texto da interface: <code>size</code>, <code>weight</code>,{" "}
              <code>color</code> e <code>align</code> usam os tokens do design system (<code>--fs-*</code>, pesos 400-700,{" "}
              <code>--text-*</code> e as cores semânticas), <code>as</code> troca o elemento (<code>p</code>, <code>span</code>,{" "}
              <code>h1</code>..<code>h4</code>, etc.) e aceita <code>m</code>/<code>p</code> como todo o resto da biblioteca.
            </Text>

            <h3 className="sub">size + weight + color</h3>
            <div className="stack">
              <Text as="h3" size="xl" weight="bold" color="strong" m={0}>Forja das Brasas</Text>
              <Text size="md" color="default" m={0}>Texto padrão, do tamanho e cor normais do corpo.</Text>
              <Text size="sm" color="muted" m={0}>Texto secundário/legenda, mais discreto.</Text>
              <Text size="sm" color="ok" weight="semibold" m={0}>Disponível para jogar</Text>
              <Text size="sm" color="err" weight="semibold" m={0}>Falha ao conectar ao servidor</Text>
            </div>

            <h3 className="sub">align + truncate + m/p como os demais componentes</h3>
            <p className="muted">Mesma prop de espaçamento que Button/Card/Badge usam — aqui com mb pra separar os três exemplos.</p>
            <div style={{ maxWidth: 220 }}>
              <Text align="right" mb={3}>Alinhado à direita</Text>
              <Text truncate mb={3} style={{ padding: "var(--sp-2)", background: "var(--bg-inset)", borderRadius: "var(--r-sm)" }}>
                Esse texto é bem mais longo do que o espaço disponível, então é cortado com reticências no final
              </Text>
              <Text italic color="muted">Texto em itálico, cor muted</Text>
            </div>

            <CodeWindow code={`
import { Text } from "ember-ui";

<Text as="h3" size="xl" weight="bold" color="strong">Forja das Brasas</Text>
<Text size="sm" color="muted">Texto secundário/legenda.</Text>
<Text truncate style={{ maxWidth: 200 }}>Corta com reticências numa linha só</Text>
            `} />
          </section>

          <section className="sec" id="spacing" aria-labelledby="h-spacing">
            <h2 id="h-spacing">Espaçamento rápido (m/p)</h2>
            <p className="muted">
              Todo componente da biblioteca aceita <code>m</code>/<code>mt</code>/<code>mr</code>/<code>mb</code>/<code>ml</code>/
              <code>mx</code>/<code>my</code> (margin) e <code>p</code>/<code>pt</code>/<code>pr</code>/<code>pb</code>/<code>pl</code>/
              <code>px</code>/<code>py</code> (padding) como props diretas — no estilo Chakra UI/styled-system. De <code>1</code> a{" "}
              <code>7</code> usa os mesmos tokens <code>--sp-1</code>..<code>--sp-7</code> do resto do design system; qualquer outro
              número (px) ou string CSS (<code>"1rem"</code>) passa direto. Sem precisar escrever <code>style</code> pra ajustes
              rápidos de espaçamento.
            </p>

            <h3 className="sub">margin por lado, sem depender de Flex/gap</h3>
            <p className="muted">
              Cada <code>Badge</code> aqui empurra o próximo com <code>ml</code> — útil quando não dá pra (ou não vale a pena)
              envolver os elementos num <code>Flex</code>.
            </p>
            <div className="row">
              <Badge>Sem espaçamento</Badge>
              <Badge variant="info" ml={2}>ml={"{2}"}</Badge>
              <Badge variant="ok" ml={6}>ml={"{6}"}</Badge>
            </div>

            <h3 className="sub">padding sobrescrevendo o espaçamento padrão do componente</h3>
            <p className="muted">
              <code>p</code>/<code>px</code>/<code>py</code> têm prioridade sobre o padding que o componente já define via CSS —
              é uma sobrescrita deliberada, não uma soma. Útil pra dar mais (ou menos) respiro num caso específico, sem criar uma
              variante nova do componente.
            </p>
            <div className="row" style={{ alignItems: "flex-start" }}>
              <Card title="Padding padrão" colorFrom="#333" colorTo="#666" tags={<Badge variant="muted">p padrão</Badge>} />
              <Card title="Mais respiro" colorFrom="#333" colorTo="#666" p={6} tags={<Badge variant="info">p={"{6}"}</Badge>} />
            </div>

            <CodeWindow code={`
import { Badge, Card } from "ember-ui";

<Badge ml={2}>Com margem</Badge>
<Card title="Mais respiro" colorFrom="#333" colorTo="#666" p={6} />
            `} />
          </section>

          <section className="sec" id="flex" aria-labelledby="h-flex">
            <h2 id="h-flex">Sistema de Flex</h2>
            <p className="muted">
              <code>Flex</code> e <code>FlexItem</code> normalizam o uso de flexbox pra não escrever <code>display: flex</code> e
              companhia na mão em todo canto — direção, alinhamento, espaçamento (nos tokens <code>--sp-1</code> a{" "}
              <code>--sp-7</code>) e quebra de linha ficam só props, e funcionam compondo com qualquer outro componente da
              biblioteca (aqui embaixo, com <code>Badge</code>).
            </p>

            <h3 className="sub">Exemplo prático: linha de usuário</h3>
            <p className="muted">
              Avatar, um bloco de texto que cresce pra preencher o espaço livre (<code>FlexItem grow</code>) e um botão de
              ação, tudo alinhado numa única linha — o padrão clássico de "linha de item com ação" (lista de amigos,
              notificação, item de configuração).
            </p>
            <Flex
              align="center"
              gap={3}
              style={{
                padding: "var(--sp-4)",
                maxWidth: 420,
                background: "var(--bg-raised)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-md)",
              }}
            >
              <Avatar status="online" label="Lucas, online">L</Avatar>
              <FlexItem grow>
                <div style={{ fontWeight: 600, color: "var(--text-strong)" }}>Lucas</div>
                <div className="muted" style={{ fontSize: "var(--fs-sm)" }}>Jogando Forja das Brasas</div>
              </FlexItem>
              <Button variant="secondary" size="sm">Chamar pra jogar</Button>
            </Flex>

            <h3 className="sub">align="center" + justify="between" + gap={3}</h3>
            <p className="muted">Distribui nas pontas e centraliza no eixo cruzado — útil pra barras de ação, cabeçalhos de card etc.</p>
            <Flex
              gap={3}
              align="center"
              justify="between"
              style={{ padding: "var(--sp-3)", background: "var(--bg-inset)", borderRadius: "var(--r-sm)" }}
            >
              <Badge>Esquerda</Badge>
              <Badge variant="info">Centro</Badge>
              <Badge variant="ok">Direita</Badge>
            </Flex>

            <h3 className="sub">direction="column" + FlexItem grow</h3>
            <p className="muted">
              O primeiro <code>FlexItem</code> tem <code>grow</code>, então ele consome todo o espaço livre da coluna; o
              segundo fica no tamanho natural do conteúdo.
            </p>
            <Flex direction="column" gap={2} style={{ maxWidth: 280 }}>
              <FlexItem grow style={{ padding: "var(--sp-3)", background: "var(--bg-inset)", borderRadius: "var(--r-sm)" }}>
                Cresce pra ocupar o espaço (grow)
              </FlexItem>
              <FlexItem style={{ padding: "var(--sp-3)", background: "var(--bg-inset)", borderRadius: "var(--r-sm)" }}>
                Tamanho natural
              </FlexItem>
            </Flex>

            <CodeWindow code={`
import { Flex, FlexItem, Button } from "ember-ui";

<Flex align="center" gap={3}>
  <FlexItem grow>Cresce pra ocupar o espaço</FlexItem>
  <Button variant="secondary" size="sm">Ação</Button>
</Flex>
            `} />
          </section>

          <section className="sec" id="scrollbar" aria-labelledby="h-scrollbar">
            <h2 id="h-scrollbar">Scrollbar</h2>
            <div className="scroll-box" tabIndex={0} role="region" aria-label="Área rolável">
              <p>Notas da versão 2.4. Corrigimos falhas de conexão, melhoramos o desempenho de downloads e atualizamos a interface da biblioteca.</p>
              <p>O thumb fica laranja ao passar o mouse e mais escuro ao arrastar.</p>
              <p>Novo modo compacto para listas longas.</p>
              <p>Suporte a atalhos de teclado em menus e modais.</p>
              <p>Ajustes de contraste no tema claro.</p>
              <p>Várias correções menores de estabilidade.</p>
            </div>
          </section>

          <section className="sec" id="botoes" aria-labelledby="h-botoes">
            <h2 id="h-botoes">Botões</h2>
            <h3 className="sub">Variantes</h3>
            <Flex gap={3} wrap>
              <Button variant="primary">Instalar</Button>
              <Button variant="secondary">Cancelar</Button>
              <Button variant="ghost">Ver mais</Button>
              <Button variant="danger">Excluir</Button>
              <Button variant="secondary" icon aria-label="Configurações"><Icon name="settings" /></Button>
            </Flex>
            <h3 className="sub">Tamanhos</h3>
            <div className="row">
              <Button variant="primary" size="sm">Pequeno</Button>
              <Button variant="primary">Médio</Button>
              <Button variant="primary" size="lg">Grande</Button>
              <Button variant="secondary" icon size="sm" aria-label="Adicionar"><Icon name="plus" size="sm" /></Button>
              <Button variant="secondary" icon size="lg" aria-label="Adicionar"><Icon name="plus" /></Button>
            </div>
            <h3 className="sub">Com ícone, carregando e desabilitado</h3>
            <div className="row">
              <Button variant="primary"><Icon name="download" />Baixar</Button>
              <Button variant="primary" loading>Carregando</Button>
              <Button variant="secondary" loading>Salvando</Button>
              <Button variant="primary" disabled>Desabilitado</Button>
              <Button variant="secondary" disabled>Desabilitado</Button>
              <Button variant="ghost" disabled>Desabilitado</Button>
              <Button variant="danger" disabled>Desabilitado</Button>
            </div>

            <CodeWindow code={`
import { Button, Icon } from "ember-ui";

<Button variant="primary">Instalar</Button>
<Button variant="secondary" loading>Salvando</Button>
<Button variant="secondary" icon aria-label="Configurações">
  <Icon name="settings" />
</Button>
            `} />
          </section>

          <section className="sec" id="inputs" aria-labelledby="h-inputs">
            <h2 id="h-inputs">Inputs</h2>
            <div className="grid-2">
              <Field label="Nome de usuário" htmlFor="i-nome">
                <Input id="i-nome" placeholder="Digite seu nome" />
              </Field>
              <Field label="Senha" htmlFor="i-senha">
                <PasswordInput id="i-senha" defaultValue="segredo123" />
              </Field>
              <Field label="Busca" htmlFor="i-busca">
                <Input id="i-busca" type="search" placeholder="Buscar na loja" leadingIcon="search" />
              </Field>
              <Field label="Select" htmlFor="i-sel">
                <Select id="i-sel">
                  <option>Todos os jogos</option>
                  <option>Instalados</option>
                  <option>Favoritos</option>
                </Select>
              </Field>
              <Field label="E-mail (erro)" htmlFor="i-err" state="error" hint="Informe um e-mail válido." hintIcon="circle-alert">
                <Input id="i-err" type="email" defaultValue="usuario@" aria-invalid="true" />
              </Field>
              <Field label="Apelido (sucesso)" htmlFor="i-ok" state="success" hint="Apelido disponível." hintIcon="circle-check">
                <Input id="i-ok" defaultValue="ember_player" />
              </Field>
              <Field label="Desabilitado" htmlFor="i-dis">
                <Input id="i-dis" defaultValue="Somente leitura" disabled />
              </Field>
              <Field label="Mensagem" htmlFor="i-ta">
                <Textarea id="i-ta" placeholder="Escreva aqui..." />
              </Field>
            </div>

            <CodeWindow code={`
import { Field, Input, PasswordInput } from "ember-ui";

<Field label="Nome de usuário" htmlFor="nome">
  <Input id="nome" placeholder="Digite seu nome" />
</Field>
<Field label="Senha" htmlFor="senha">
  <PasswordInput id="senha" />
</Field>
            `} />
          </section>

          <section className="sec" id="selecao" aria-labelledby="h-selecao">
            <h2 id="h-selecao">Checkbox, radio, switch e slider</h2>
            <div className="grid-2">
              <fieldset className="stack" style={{ border: 0, padding: 0, margin: 0 }}>
                <legend className="label" style={{ marginBottom: 8 }}>Checkbox</legend>
                <Checkbox>Normal</Checkbox>
                <Checkbox defaultChecked>Marcado</Checkbox>
                <Checkbox disabled>Desabilitado</Checkbox>
                <Checkbox defaultChecked disabled>Marcado desabilitado</Checkbox>
              </fieldset>
              <fieldset className="stack" style={{ border: 0, padding: 0, margin: 0 }}>
                <legend className="label" style={{ marginBottom: 8 }}>Radio</legend>
                <Radio name="q" defaultChecked>Alta</Radio>
                <Radio name="q">Média</Radio>
                <Radio name="q">Baixa</Radio>
                <Radio name="q" disabled>Desabilitado</Radio>
              </fieldset>
              <fieldset className="stack" style={{ border: 0, padding: 0, margin: 0 }}>
                <legend className="label" style={{ marginBottom: 8 }}>Switch</legend>
                <Switch>Desligado</Switch>
                <Switch defaultChecked>Ligado</Switch>
                <Switch disabled>Desabilitado</Switch>
              </fieldset>
              <div className="stack">
                <span className="label" id="l-vol">Slider</span>
                <Slider min={0} max={100} defaultValue={60} aria-labelledby="l-vol" />
                <Slider min={0} max={100} defaultValue={30} disabled aria-label="Slider desabilitado" />
              </div>
            </div>

            <CodeWindow code={`
import { Checkbox, Radio, Switch, Slider } from "ember-ui";

<Checkbox defaultChecked>Marcado</Checkbox>
<Radio name="q" defaultChecked>Alta</Radio>
<Switch defaultChecked>Ligado</Switch>
<Slider min={0} max={100} defaultValue={60} aria-label="Volume" />
            `} />
          </section>

          <section className="sec" id="tabs" aria-labelledby="h-tabs">
            <h2 id="h-tabs">Tabs e menu lateral</h2>
            <Tabs value={tab} onChange={setTab}>
              <TabList aria-label="Exemplo de tabs">
                <Tab value="loja">Loja</Tab>
                <Tab value="biblioteca">Biblioteca</Tab>
                <Tab value="comunidade">Comunidade</Tab>
                <Tab value="em-breve" disabled>Em breve</Tab>
              </TabList>
              <TabPanel value="loja">Destaques e promoções da semana.</TabPanel>
              <TabPanel value="biblioteca">Seus jogos instalados e favoritos.</TabPanel>
              <TabPanel value="comunidade">Grupos, fóruns e screenshots.</TabPanel>
            </Tabs>
            <h3 className="sub">Menu lateral</h3>
            <SideNav>
              <SideNavTitle>Navegação</SideNavTitle>
              <SideNavLink href="#tabs" current><Icon name="store" size="sm" /> Loja</SideNavLink>
              <SideNavLink href="#tabs"><Icon name="library" size="sm" /> Biblioteca</SideNavLink>
              <SideNavLink href="#tabs"><Icon name="users" size="sm" /> Amigos</SideNavLink>
              <SideNavButton disabled><Icon name="settings" size="sm" /> Ajustes (indisponível)</SideNavButton>
            </SideNav>

            <CodeWindow code={`
import { Tabs, TabList, Tab, TabPanel } from "ember-ui";
import { useState } from "react";

const [tab, setTab] = useState("loja");

<Tabs value={tab} onChange={setTab}>
  <TabList aria-label="Exemplo de tabs">
    <Tab value="loja">Loja</Tab>
    <Tab value="biblioteca">Biblioteca</Tab>
  </TabList>
  <TabPanel value="loja">Destaques da semana.</TabPanel>
  <TabPanel value="biblioteca">Seus jogos instalados.</TabPanel>
</Tabs>
            `} />
          </section>

          <section className="sec" id="janela" aria-labelledby="h-janela">
            <h2 id="h-janela">Janela</h2>
            <Window title="Configurações">
              <Switch defaultChecked>Iniciar com o sistema</Switch>
              <Switch>Mostrar notificações</Switch>
              <div className="row" style={{ justifyContent: "flex-end" }}>
                <Button variant="secondary">Cancelar</Button>
                <Button variant="primary">Aplicar</Button>
              </div>
            </Window>

            <CodeWindow code={`
import { Window, Switch, Button } from "ember-ui";

<Window title="Configurações">
  <Switch defaultChecked>Iniciar com o sistema</Switch>
  <Button variant="primary">Aplicar</Button>
</Window>
            `} />
          </section>

          <section className="sec" id="modal" aria-labelledby="h-modal">
            <h2 id="h-modal">Modais</h2>
            <div className="row">
              <Button variant="primary" onClick={() => setOpenModal("basic")}>Modal simples</Button>
              <Button variant="secondary" onClick={() => setOpenModal("confirm")}>Confirmação</Button>
              <Button variant="danger" onClick={() => setOpenModal("error")}>Erro</Button>
            </div>

            <Modal
              open={openModal === "basic"}
              onClose={() => setOpenModal(null)}
              titleId="m-basic-t"
              title="Atualização disponível"
              footer={<>
                <Button variant="secondary" onClick={() => setOpenModal(null)}>Depois</Button>
                <Button variant="primary" onClick={() => setOpenModal(null)}>Instalar</Button>
              </>}
            >
              <p>Uma nova versão do cliente está pronta. Deseja instalar agora?</p>
            </Modal>

            <Modal
              open={openModal === "confirm"}
              onClose={() => setOpenModal(null)}
              titleId="m-confirm-t"
              title="Confirmar desinstalação"
              variant="warn"
              icon="triangle-alert"
              footer={<>
                <Button variant="secondary" onClick={() => setOpenModal(null)}>Cancelar</Button>
                <Button variant="danger" onClick={() => setOpenModal(null)}>Desinstalar</Button>
              </>}
            >
              <p>O jogo será removido deste computador. Seus saves na nuvem serão mantidos.</p>
            </Modal>

            <Modal
              open={openModal === "error"}
              onClose={() => setOpenModal(null)}
              titleId="m-error-t"
              title="Falha na conexão"
              variant="danger"
              icon="circle-alert"
              footer={<>
                <Button variant="secondary" onClick={() => setOpenModal(null)}>Fechar</Button>
                <Button variant="primary" onClick={() => setOpenModal(null)}>Tentar novamente</Button>
              </>}
            >
              <p>Não foi possível alcançar o servidor. Verifique sua internet e tente de novo.</p>
              <p className="muted">Código: ERR_TIMEOUT (408)</p>
            </Modal>

            <CodeWindow code={`
import { Modal, Button } from "ember-ui";
import { useState } from "react";

const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Modal simples</Button>
<Modal
  open={open}
  onClose={() => setOpen(false)}
  titleId="t"
  title="Atualização disponível"
  footer={<Button onClick={() => setOpen(false)}>Instalar</Button>}
>
  <p>Uma nova versão do cliente está pronta.</p>
</Modal>
            `} />
          </section>

          <section className="sec" id="dropdown" aria-labelledby="h-dropdown">
            <h2 id="h-dropdown">Dropdown e menu de contexto</h2>
            <div className="row" style={{ alignItems: "flex-start" }}>
              <Dropdown trigger="Ações" mb={3}>
                <MenuItem icon="play" shortcut="Enter" onSelect={() => toast({ title: "Jogando...", variant: "info" })}>Jogar</MenuItem>
                <MenuItem icon="copy" shortcut="Ctrl+C">Copiar link</MenuItem>
                <MenuItem icon="download" disabled>Baixar (indisponível)</MenuItem>
                <MenuSeparator />
                <MenuItem icon="trash" danger onSelect={() => toast({ title: "Desinstalado", variant: "ok" })}>Desinstalar</MenuItem>
              </Dropdown>
            </div>

            <h3 className="sub">Menu de contexto (clique direito ou tecla Menu)</h3>
            <ContextMenu
              menu={<>
                <MenuItem icon="play" shortcut="Enter">Abrir</MenuItem>
                <MenuItem shortcut="F2">Renomear</MenuItem>
                <MenuSeparator />
                <MenuItem icon="trash" shortcut="Del" danger>Excluir</MenuItem>
              </>}
            >
              <div
                className="ctx-area"
                tabIndex={0}
                aria-label="Área de teste do menu de contexto"
                style={{ display: "grid", placeItems: "center", minHeight: 100, border: "1px dashed var(--border-strong)", borderRadius: "var(--r-md)", color: "var(--text-2)" }}
              >
                Clique com o botão direito aqui
              </div>
            </ContextMenu>

            <CodeWindow code={`
import { Dropdown, MenuItem, MenuSeparator } from "ember-ui";

<Dropdown trigger="Ações">
  <MenuItem icon="play" shortcut="Enter" onSelect={() => {}}>Jogar</MenuItem>
  <MenuSeparator />
  <MenuItem icon="trash" danger onSelect={() => {}}>Desinstalar</MenuItem>
</Dropdown>
            `} />
          </section>

          <section className="sec" id="tooltip" aria-labelledby="h-tooltip">
            <h2 id="h-tooltip">Tooltip e popover</h2>
            <div className="row" style={{ minHeight: 140, alignItems: "flex-start" }}>
              <Tooltip label="Ativar alertas">
                <Button variant="secondary" icon aria-label="Favoritar"><Icon name="bell" /></Button>
              </Tooltip>
              <Tooltip label="Também aparece com o teclado">
                <Button variant="secondary">Passe o mouse ou foque</Button>
              </Tooltip>
              <Popover trigger="Popover">
                <h4>Resumo do jogo</h4>
                <p className="muted">Aventura cooperativa para até 4 jogadores, com suporte a controle.</p>
                <Button variant="primary" size="sm">Ver detalhes</Button>
              </Popover>
            </div>

            <CodeWindow code={`
import { Tooltip, Popover, Button } from "ember-ui";

<Tooltip label="Ativar alertas">
  <Button variant="secondary">Favoritar</Button>
</Tooltip>

<Popover trigger="Popover">
  <p>Conteúdo do popover.</p>
</Popover>
            `} />
          </section>

          <section className="sec" id="cards" aria-labelledby="h-cards">
            <h2 id="h-cards">Cards</h2>
            <CardGrid>
              <Card
                title="Forja das Brasas"
                href="#cards"
                colorFrom="#7a2e00"
                colorTo="#ff6a00"
                tags={<><Tag>Ação</Tag><Tag>Co-op</Tag></>}
                price={<><Discount>-50%</Discount><PriceOld>R$ 79,90</PriceOld><PriceNow>R$ 39,95</PriceNow></>}
              />
              <Card
                title="Maré Profunda"
                href="#cards"
                colorFrom="#0b3b4a"
                colorTo="#2bb8d4"
                tags={<><Tag>Aventura</Tag><Badge variant="info">Novo</Badge></>}
                price={<PriceNow>R$ 59,90</PriceNow>}
              />
              <Card
                title="Noite Violeta"
                href="#cards"
                colorFrom="#2d1b4e"
                colorTo="#7a4fd1"
                tags={<Tag>RPG</Tag>}
                price={<><Discount>-25%</Discount><PriceOld>R$ 120,00</PriceOld><PriceNow>R$ 90,00</PriceNow></>}
              />
              <Card
                title="Indisponível"
                colorFrom="#333"
                colorTo="#666"
                disabled
                tags={<Badge variant="muted">Em breve</Badge>}
                price={<span className="muted">Sem preço</span>}
              />
            </CardGrid>

            <CodeWindow code={`
import { Card, CardGrid, Tag, PriceNow } from "ember-ui";

<CardGrid>
  <Card
    title="Forja das Brasas"
    href="#"
    colorFrom="#7a2e00"
    colorTo="#ff6a00"
    tags={<Tag>Ação</Tag>}
    price={<PriceNow>R$ 39,95</PriceNow>}
  />
</CardGrid>
            `} />
          </section>

          <section className="sec" id="lista" aria-labelledby="h-lista">
            <h2 id="h-lista">Lista de itens</h2>
            <LibraryList aria-label="Biblioteca de jogos">
              <LibraryItem colorFrom="#7a2e00" colorTo="#ff6a00" name="Forja das Brasas" meta="12 h" />
              <LibraryItem colorFrom="#0b3b4a" colorTo="#2bb8d4" name="Maré Profunda" meta="3 h" current />
              <LibraryItem colorFrom="#2d1b4e" colorTo="#7a4fd1" name="Noite Violeta" meta="48 h" />
              <LibraryItem colorFrom="#333" colorTo="#555" name="Pacote bloqueado" meta="-" disabled />
            </LibraryList>

            <CodeWindow code={`
import { LibraryList, LibraryItem } from "ember-ui";

<LibraryList aria-label="Biblioteca de jogos">
  <LibraryItem colorFrom="#7a2e00" colorTo="#ff6a00" name="Forja das Brasas" meta="12 h" current />
</LibraryList>
            `} />
          </section>

          <section className="sec" id="progresso" aria-labelledby="h-progresso">
            <h2 id="h-progresso">Barra de progresso e download</h2>
            <div className="stack" style={{ maxWidth: 420 }}>
              <Progress value={65} label="Progresso" />
              <Progress value={100} variant="ok" label="Concluído" />
              <Progress value={30} variant="paused" label="Pausado" />
            </div>
            <h3 className="sub">Download</h3>
            <Download
              title="Forja das Brasas"
              status="Baixando"
              percent={42}
              speed="18,4 MB/s"
              sizeText="3,2 de 7,6 GB"
              etaText="4 min restantes"
            />

            <CodeWindow code={`
import { Progress, Download } from "ember-ui";

<Progress value={65} label="Progresso" />
<Download
  title="Forja das Brasas"
  status="Baixando"
  percent={42}
  speed="18,4 MB/s"
  sizeText="3,2 de 7,6 GB"
  etaText="4 min restantes"
/>
            `} />
          </section>

          <section className="sec" id="badges" aria-labelledby="h-badges">
            <h2 id="h-badges">Badges, tags e avatar</h2>
            <h3 className="sub">Badges</h3>
            <div className="row">
              <Badge>Destaque</Badge>
              <Badge variant="ok">Instalado</Badge>
              <Badge variant="err">Erro</Badge>
              <Badge variant="warn">Atualizar</Badge>
              <Badge variant="info">Novo</Badge>
              <Badge variant="muted">Beta</Badge>
            </div>
            <h3 className="sub">Tags</h3>
            <div className="row">
              <Tag>Indie</Tag>
              <Tag>Multiplayer</Tag>
              <Tag onRemove={() => {}} removeLabel="Remover tag Removível">Removível</Tag>
            </div>
            <h3 className="sub">Avatar com status</h3>
            <div className="row" style={{ gap: 24 }}>
              <Avatar size="lg" status="online" label="Lucas, online">L</Avatar>
              <Avatar status="away" label="Ana, ausente">A</Avatar>
              <Avatar status="offline" label="Bruno, offline">B</Avatar>
            </div>

            <CodeWindow code={`
import { Badge, Tag, Avatar } from "ember-ui";

<Badge variant="ok">Instalado</Badge>
<Tag onRemove={() => {}} removeLabel="Remover tag Indie">Indie</Tag>
<Avatar status="online" label="Lucas, online">L</Avatar>
            `} />
          </section>

          <section className="sec" id="icone-piscante" aria-labelledby="h-icone-piscante">
            <h2 id="h-icone-piscante">Ícone piscante</h2>
            <div className="row" style={{ gap: 24 }}>
              <BlinkingIcon name="bell" size="sm" label="Notificação, pequeno" />
              <BlinkingIcon name="bell" size="md" label="Notificação, médio" />
              <BlinkingIcon name="bell" size="lg" label="Notificação, grande" />
            </div>

            <CodeWindow code={`
import { BlinkingIcon } from "ember-ui";

<BlinkingIcon name="bell" size="sm" label="Notificação" />
<BlinkingIcon name="bell" size="md" label="Notificação" />
<BlinkingIcon name="bell" size="lg" label="Notificação" />
            `} />
          </section>

          <section className="sec" id="toasts" aria-labelledby="h-toasts">
            <h2 id="h-toasts">Notificações (toasts)</h2>
            <DemoToasts />
            <Flex gap={3} mt={4}>
              <Button variant="secondary" size="sm" onClick={() => toast({ title: "Amigo online", text: "Ana entrou e está jogando Maré Profunda.", variant: "info", animated: true })}>
                Disparar toast (com animação)
              </Button>
              <Button variant="secondary" size="sm" onClick={() => toast({ title: "Amigo online", text: "Ana entrou e está jogando Maré Profunda.", variant: "info", animated: false })}>
                Disparar toast (sem animação)
              </Button>
            </Flex>

            <CodeWindow code={`
import { ToastProvider, useToast, Button } from "ember-ui";

function Exemplo() {
  const toast = useToast();
  return (
    <Button onClick={() => toast({ title: "Amigo online", variant: "info" })}>
      Disparar toast
    </Button>
  );
}

<ToastProvider>
  <Exemplo />
</ToastProvider>
            `} />
          </section>

          <section className="sec" id="paginacao" aria-labelledby="h-paginacao">
            <h2 id="h-paginacao">Paginação e breadcrumb</h2>
            <Breadcrumb>
              <BreadcrumbItem href="#paginacao">Loja</BreadcrumbItem>
              <BreadcrumbItem href="#paginacao">Ação</BreadcrumbItem>
              <BreadcrumbItem current>Forja das Brasas</BreadcrumbItem>
            </Breadcrumb>
            <Pagination page={page} totalPages={12} onChange={setPage} mt={4} />

            <CodeWindow code={`
import { Pagination, Breadcrumb, BreadcrumbItem } from "ember-ui";
import { useState } from "react";

const [page, setPage] = useState(1);

<Breadcrumb>
  <BreadcrumbItem href="#">Loja</BreadcrumbItem>
  <BreadcrumbItem current>Forja das Brasas</BreadcrumbItem>
</Breadcrumb>
<Pagination page={page} totalPages={12} onChange={setPage} />
            `} />
          </section>

          <section className="sec" id="qrcode" aria-labelledby="h-qrcode">
            <h2 id="h-qrcode">QR code</h2>
            <p className="muted">
              <code>QRCode</code> codifica texto/URL numa imagem (SVG), sem depender de canvas ou de rede — tudo acontece no
              cliente. Cor e fundo já usam os tokens do tema por padrão, então funciona nos dois temas sem configurar nada.
            </p>

            <h3 className="sub">Exemplo prático: card de convite</h3>
            <p className="muted">
              O padrão mais comum de uso: um QRCode ao lado de um texto e um botão de ação, pra compartilhar um link de
              verdade (convite pra partida, evento, cupom). O botão copia o mesmo link que está codificado no QR.
            </p>
            <div
              className="row"
              style={{
                alignItems: "center",
                gap: "var(--sp-4)",
                padding: "var(--sp-5)",
                maxWidth: 440,
                background: "var(--bg-raised)",
                border: "1px solid var(--border)",
                borderRadius: "var(--r-md)",
              }}
            >
              <QRCode value="https://ember-ui.example/convite/forja-das-brasas" size={96} />
              <div style={{ display: "grid", gap: "var(--sp-2)" }}>
                <strong style={{ color: "var(--text-strong)" }}>Convite para Forja das Brasas</strong>
                <p className="muted" style={{ fontSize: "var(--fs-sm)", margin: 0 }}>
                  Aponte a câmera do celular ou copie o link abaixo pra entrar na partida.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigator.clipboard?.writeText("https://ember-ui.example/convite/forja-das-brasas")}
                >
                  <Icon name="copy" size="sm" />
                  Copiar link
                </Button>
              </div>
            </div>

            <h3 className="sub">Link (nível de correção padrão)</h3>
            <p className="muted">
              Caso de uso mais comum: codificar uma URL pra escanear com o celular. O nível de correção de erro padrão
              (<code>"M"</code>) já é suficiente pra isso.
            </p>
            <QRCode value="https://ember-ui.example/convite" />

            <h3 className="sub">Código curto, com correção de erro alta</h3>
            <p className="muted">
              Pra um código que vai ser impresso e pode sujar/arranhar (etiqueta, crachá, caixa física), vale subir o{" "}
              <code>level</code> pra <code>"H"</code> — tolera mais dano, ao custo de um QR mais denso. Nesse exemplo também
              reduzimos o <code>size</code>, já que o conteúdo é bem mais curto que uma URL.
            </p>
            <QRCode value="ID-4821-FORJA-DAS-BRASAS" size={96} level="H" />

            <CodeWindow code={`
import { QRCode } from "ember-ui";

<QRCode value="https://ember-ui.example/convite" />
<QRCode value="ID-4821-FORJA-DAS-BRASAS" size={96} level="H" />
            `} />
          </section>
        </main>
      </div>
    </>
  );
}
