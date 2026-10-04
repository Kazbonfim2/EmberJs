import { useState } from "react";
import { Button } from "../components/Button";
import { Icon } from "../components/Icon";

export type CodeWindowProps = {
  code: string;
  title?: string;
};

/**
 * Janela de código só da página de demo (não faz parte da biblioteca) -- mostra um
 * exemplo de uso de um componente, com botão de copiar. Reusa a metáfora visual de
 * Window (barra de título com dots), sem os controles de minimizar/maximizar/fechar,
 * que não fazem sentido pra um bloco estático.
 */
export function CodeWindow({ code, title = "Exemplo de uso" }: CodeWindowProps) {
  const [copied, setCopied] = useState(false);
  const trimmed = code.trim();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(trimmed);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard indisponível (sem permissão, contexto não seguro): só não copia.
    }
  };

  return (
    <div className="code-window">
      <div className="code-window-bar">
        <span className="code-window-dot" aria-hidden="true" />
        <span className="code-window-title">{title}</span>
        <Button variant="ghost" size="sm" onClick={handleCopy}>
          <Icon name={copied ? "check" : "copy"} size="sm" />
          {copied ? "Copiado" : "Copiar"}
        </Button>
      </div>
      <pre className="code-window-body">
        <code>{trimmed}</code>
      </pre>
    </div>
  );
}
