import { useState } from "react";
import { Button } from "./components/Button";
import { Icon } from "./components/Icon";
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
import { ThemeToggle } from "./theme";

const SECTIONS = [
  ["cores", "Cores"],
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
  ["toasts", "Notificações"],
  ["paginacao", "Paginação"],
  ["scrollbar", "Scrollbar"],
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
        <div className="brand"><i aria-hidden="true" /> Ember UI</div>
        <span className="muted grow">Design system</span>
        <ThemeToggle />
      </header>

      <div className="shell">
        <nav className="demo-nav" aria-label="Seções do design system">
          <SideNav>
            <SideNavTitle>Componentes</SideNavTitle>
            {SECTIONS.map(([id, label]) => (
              <SideNavLink key={id} href={`#${id}`}>{label}</SideNavLink>
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

          <section className="sec" id="botoes" aria-labelledby="h-botoes">
            <h2 id="h-botoes">Botões</h2>
            <h3 className="sub">Variantes</h3>
            <div className="row">
              <Button variant="primary">Instalar</Button>
              <Button variant="secondary">Cancelar</Button>
              <Button variant="ghost">Ver mais</Button>
              <Button variant="danger">Excluir</Button>
              <Button variant="secondary" icon aria-label="Configurações"><Icon name="settings" /></Button>
            </div>
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
          </section>

          <section className="sec" id="dropdown" aria-labelledby="h-dropdown">
            <h2 id="h-dropdown">Dropdown e menu de contexto</h2>
            <div className="row" style={{ alignItems: "flex-start" }}>
              <Dropdown trigger="Ações">
                <MenuItem icon="play" shortcut="Enter" onSelect={() => toast({ title: "Jogando...", variant: "info" })}>Jogar</MenuItem>
                <MenuItem icon="copy" shortcut="Ctrl+C">Copiar link</MenuItem>
                <MenuItem icon="download" disabled>Baixar (indisponível)</MenuItem>
                <MenuSeparator />
                <MenuItem icon="trash" danger onSelect={() => toast({ title: "Desinstalado", variant: "ok" })}>Desinstalar</MenuItem>
              </Dropdown>
            </div>
            <br>
            </br>
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
          </section>

          <section className="sec" id="lista" aria-labelledby="h-lista">
            <h2 id="h-lista">Lista de itens</h2>
            <LibraryList aria-label="Biblioteca de jogos">
              <LibraryItem colorFrom="#7a2e00" colorTo="#ff6a00" name="Forja das Brasas" meta="12 h" />
              <LibraryItem colorFrom="#0b3b4a" colorTo="#2bb8d4" name="Maré Profunda" meta="3 h" current />
              <LibraryItem colorFrom="#2d1b4e" colorTo="#7a4fd1" name="Noite Violeta" meta="48 h" />
              <LibraryItem colorFrom="#333" colorTo="#555" name="Pacote bloqueado" meta="-" disabled />
            </LibraryList>
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
          </section>

          <section className="sec" id="toasts" aria-labelledby="h-toasts">
            <h2 id="h-toasts">Notificações (toasts)</h2>
            <DemoToasts />
            <div className="row" style={{ marginTop: "var(--sp-4)" }}>
              <Button variant="secondary" size="sm" onClick={() => toast({ title: "Amigo online", text: "Ana entrou e está jogando Maré Profunda.", variant: "info" })}>
                Disparar toast (useToast)
              </Button>
            </div>
          </section>

          <section className="sec" id="paginacao" aria-labelledby="h-paginacao">
            <h2 id="h-paginacao">Paginação e breadcrumb</h2>
            <Breadcrumb>
              <BreadcrumbItem href="#paginacao">Loja</BreadcrumbItem>
              <BreadcrumbItem href="#paginacao">Ação</BreadcrumbItem>
              <BreadcrumbItem current>Forja das Brasas</BreadcrumbItem>
            </Breadcrumb>
            <div style={{ marginTop: 16 }}>
              <Pagination page={page} totalPages={12} onChange={setPage} />
            </div>
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
        </main>
      </div>
    </>
  );
}
