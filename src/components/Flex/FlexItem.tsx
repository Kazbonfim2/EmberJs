import type { CSSProperties, ElementType, HTMLAttributes } from "react";

export type FlexItemProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  /** true = 1, false = 0, numero = valor exato de flex-grow. */
  grow?: boolean | number;
  /** true = 1, false = 0, numero = valor exato de flex-shrink. */
  shrink?: boolean | number;
  basis?: CSSProperties["flexBasis"];
  order?: number;
};

const toFlexFactor = (value: boolean | number | undefined): number | undefined =>
  typeof value === "boolean" ? (value ? 1 : 0) : value;

/** Item de dentro de um <Flex> -- controla grow/shrink/basis/order sem CSS cru. */
export function FlexItem({ as: As = "div", grow, shrink, basis, order, style, children, ...rest }: FlexItemProps) {
  return (
    <As
      style={{
        flexGrow: toFlexFactor(grow),
        flexShrink: toFlexFactor(shrink),
        flexBasis: basis,
        order,
        ...style,
      }}
      {...rest}
    >
      {children}
    </As>
  );
}
