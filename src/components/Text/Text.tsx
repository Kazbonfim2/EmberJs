import type { CSSProperties, ElementType, HTMLAttributes } from "react";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";

export type TextSize = "xs" | "sm" | "md" | "lg" | "xl";
export type TextWeight = "normal" | "medium" | "semibold" | "bold";
export type TextColor = "default" | "strong" | "muted" | "off" | "accent" | "ok" | "err" | "warn" | "info";
export type TextAlign = "left" | "center" | "right" | "justify";

const SIZE: Record<TextSize, string> = {
  xs: "var(--fs-xs)",
  sm: "var(--fs-sm)",
  md: "var(--fs-md)",
  lg: "var(--fs-lg)",
  xl: "var(--fs-xl)",
};

const WEIGHT: Record<TextWeight, number> = { normal: 400, medium: 500, semibold: 600, bold: 700 };

const COLOR: Record<TextColor, string> = {
  default: "var(--text)",
  strong: "var(--text-strong)",
  muted: "var(--text-2)",
  off: "var(--text-off)",
  accent: "var(--accent-fg)",
  ok: "var(--ok-fg)",
  err: "var(--err-fg)",
  warn: "var(--warn-fg)",
  info: "var(--info-fg)",
};

export type TextProps = Omit<HTMLAttributes<HTMLElement>, "color"> &
  SpacingProps & {
    /** Elemento/componente a renderizar -- "p" (default), "span", "h1".."h4", "strong", "label", etc. */
    as?: ElementType;
    size?: TextSize;
    weight?: TextWeight;
    color?: TextColor;
    align?: TextAlign;
    italic?: boolean;
    /** Corta com "..." numa linha só. */
    truncate?: boolean;
  };

/** Texto genérico da biblioteca -- tamanho/peso/cor/alinhamento nos tokens do design system, mais m/p como os demais componentes. */
export function Text({
  as: As = "p",
  size,
  weight,
  color,
  align,
  italic = false,
  truncate = false,
  style,
  children,
  ...rest
}: TextProps) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <As
      style={{
        fontSize: size && SIZE[size],
        fontWeight: weight && WEIGHT[weight],
        color: color && COLOR[color],
        textAlign: align,
        fontStyle: italic ? "italic" : undefined,
        ...(truncate ? ({ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } as CSSProperties) : null),
        ...spacingStyle(spacing),
        ...style,
      }}
      {...domRest}
    >
      {children}
    </As>
  );
}
