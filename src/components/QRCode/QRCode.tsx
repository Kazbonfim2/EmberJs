import { useMemo, type CSSProperties, type ReactNode } from "react";
import { create as createQRCode, type QRCodeErrorCorrectionLevel } from "qrcode";
import { cx } from "../../lib/classnames";
import { spacingStyle, type SpacingProps } from "../../lib/spacing";
import "./QRCode.css";

export type QRCodeProps = SpacingProps & {
  /** Texto, URL ou qualquer conteudo a codificar. */
  value: string;
  /** Tamanho do lado em px. */
  size?: number;
  /** Nivel de correcao de erro -- mais alto tolera mais dano/sujeira, mas gera um QR mais denso. */
  level?: QRCodeErrorCorrectionLevel;
  /** Quantidade de modulos de margem (zona de silencio) em volta do codigo. */
  margin?: number;
  /** Cor dos modulos escuros. */
  color?: string;
  /** Cor de fundo. */
  background?: string;
  className?: string;
  style?: CSSProperties;
};

export function QRCode({
  value,
  size = 160,
  level = "M",
  margin = 2,
  color = "var(--text-strong)",
  background = "var(--bg-raised)",
  className,
  style,
  ...spacing
}: QRCodeProps) {
  const modules = useMemo(() => createQRCode(value, { errorCorrectionLevel: level }).modules, [value, level]);
  const count = modules.size;
  const total = count + margin * 2;

  const cells: ReactNode[] = [];
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (modules.get(row, col)) {
        cells.push(<rect key={`${row}-${col}`} x={col + margin} y={row + margin} width={1} height={1} />);
      }
    }
  }

  return (
    <svg
      role="img"
      aria-label={`QR code: ${value}`}
      width={size}
      height={size}
      viewBox={`0 0 ${total} ${total}`}
      shapeRendering="crispEdges"
      className={cx("qrcode", className)}
      style={{ ...spacingStyle(spacing), ...style }}
    >
      <rect width={total} height={total} fill={background} />
      <g fill={color}>{cells}</g>
    </svg>
  );
}
