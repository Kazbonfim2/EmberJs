import { useState, type HTMLAttributes } from "react";
import { Button } from "../Button";
import { Icon } from "../Icon";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./CodeWindow.css";

export type CodeWindowProps = HTMLAttributes<HTMLDivElement> &
  SpacingProps & {
    code: string;
    title?: string;
  };

/**
 * Bloco de código com barra de título (metáfora visual de Window, sem os controles de
 * minimizar/maximizar/fechar) e botão de copiar.
 */
export function CodeWindow({ code, title = "Exemplo de uso", style, ...rest }: CodeWindowProps) {
  const [spacing, domRest] = splitSpacingProps(rest);
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
    <div className="code-window" style={{ ...spacingStyle(spacing), ...style }} {...domRest}>
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
