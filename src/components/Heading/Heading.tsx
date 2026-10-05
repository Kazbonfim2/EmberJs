import { cx } from "../../lib/classnames";
import { Text, type TextProps, type TextSize } from "../Text";

export type HeadingLevel = 1 | 2 | 3 | 4;
export type HeadingVariant = "default" | "sub";

const LEVEL_TAG = { 1: "h1", 2: "h2", 3: "h3", 4: "h4" } as const;
const LEVEL_SIZE: Record<HeadingLevel, TextSize> = { 1: "xl", 2: "md", 3: "sm", 4: "xs" };

export type HeadingProps = Omit<TextProps, "as"> & {
  /** Nível semântico, h1..h4 -- também define o tamanho padrão (sobrescrevível via `size`). @default 2 */
  level?: HeadingLevel;
  /** "sub" é o rótulo pequeno, maiúsculo e discreto usado pra títulos de subseção. @default "default" */
  variant?: HeadingVariant;
};

/** Heading da biblioteca -- nível semântico (h1..h4) com tamanho/peso/cor já nos tokens certos, mais m/p e o resto das props do Text. */
export function Heading({ level = 2, variant = "default", size, weight, color, className, style, ...rest }: HeadingProps) {
  const isSub = variant === "sub";
  return (
    <Text
      as={LEVEL_TAG[level]}
      size={size ?? (isSub ? "xs" : LEVEL_SIZE[level])}
      weight={weight ?? "semibold"}
      color={color ?? (isSub ? "muted" : "strong")}
      className={cx(isSub && "sub", className)}
      style={isSub ? { textTransform: "uppercase", letterSpacing: ".1em", ...style } : style}
      {...rest}
    />
  );
}
