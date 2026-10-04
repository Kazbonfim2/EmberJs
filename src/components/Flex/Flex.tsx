import type { CSSProperties, ElementType, HTMLAttributes } from "react";

export type FlexGap = 1 | 2 | 3 | 4 | 5 | 6 | 7 | string;
export type FlexAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type FlexJustify = "start" | "center" | "end" | "between" | "around" | "evenly";
export type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";

const ALIGN: Record<FlexAlign, CSSProperties["alignItems"]> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
};

const JUSTIFY: Record<FlexJustify, CSSProperties["justifyContent"]> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
};

/** Numero de 1-7 usa os tokens de espacamento (--sp-1..--sp-7); qualquer outra string passa direto. */
export const toGapValue = (gap?: FlexGap): string | undefined =>
  gap === undefined ? undefined : typeof gap === "number" ? `var(--sp-${gap})` : gap;

export type FlexProps = Omit<HTMLAttributes<HTMLElement>, "color"> & {
  as?: ElementType;
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  gap?: FlexGap;
  wrap?: boolean;
  inline?: boolean;
};

/** Container flexbox normalizado -- direction/align/justify/gap/wrap como props em vez de CSS cru. */
export function Flex({
  as: As = "div",
  direction = "row",
  align,
  justify,
  gap,
  wrap = false,
  inline = false,
  style,
  children,
  ...rest
}: FlexProps) {
  return (
    <As
      style={{
        display: inline ? "inline-flex" : "flex",
        flexDirection: direction,
        alignItems: align && ALIGN[align],
        justifyContent: justify && JUSTIFY[justify],
        flexWrap: wrap ? "wrap" : undefined,
        gap: toGapValue(gap),
        ...style,
      }}
      {...rest}
    >
      {children}
    </As>
  );
}
