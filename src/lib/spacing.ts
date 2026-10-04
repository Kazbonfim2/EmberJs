import type { CSSProperties } from "react";

/** 1-7 usa os tokens --sp-1..--sp-7; qualquer outro número (px) ou string CSS passa direto. */
export type SpacingValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | number | string;

/** Props de espaçamento rápido, no estilo Chakra UI/styled-system: m/p + variantes por lado e por eixo. */
export type SpacingProps = {
  /** margin (todos os lados) */
  m?: SpacingValue;
  mt?: SpacingValue;
  mr?: SpacingValue;
  mb?: SpacingValue;
  ml?: SpacingValue;
  /** margin horizontal (left + right) */
  mx?: SpacingValue;
  /** margin vertical (top + bottom) */
  my?: SpacingValue;
  /** padding (todos os lados) */
  p?: SpacingValue;
  pt?: SpacingValue;
  pr?: SpacingValue;
  pb?: SpacingValue;
  pl?: SpacingValue;
  /** padding horizontal (left + right) */
  px?: SpacingValue;
  /** padding vertical (top + bottom) */
  py?: SpacingValue;
};

export const SPACING_KEYS = ["m", "mt", "mr", "mb", "ml", "mx", "my", "p", "pt", "pr", "pb", "pl", "px", "py"] as const;

export const toSpacingCSS = (value: SpacingValue): string =>
  typeof value === "number" && value >= 1 && value <= 7 ? `var(--sp-${value})` : String(value);

/** Converte as props de espaçamento presentes num objeto de style CSS (margin/padding). */
/** Ordem importa: m/p primeiro (menos específico), eixo (mx/my) depois, lado especifico (ml/mr/...) por último -- o mais específico sempre vence. */
export function spacingStyle(props: SpacingProps): CSSProperties {
  const style: CSSProperties = {};
  if (props.m !== undefined) style.margin = toSpacingCSS(props.m);
  if (props.p !== undefined) style.padding = toSpacingCSS(props.p);
  if (props.mx !== undefined) {
    style.marginLeft = toSpacingCSS(props.mx);
    style.marginRight = toSpacingCSS(props.mx);
  }
  if (props.my !== undefined) {
    style.marginTop = toSpacingCSS(props.my);
    style.marginBottom = toSpacingCSS(props.my);
  }
  if (props.px !== undefined) {
    style.paddingLeft = toSpacingCSS(props.px);
    style.paddingRight = toSpacingCSS(props.px);
  }
  if (props.py !== undefined) {
    style.paddingTop = toSpacingCSS(props.py);
    style.paddingBottom = toSpacingCSS(props.py);
  }
  if (props.mt !== undefined) style.marginTop = toSpacingCSS(props.mt);
  if (props.mr !== undefined) style.marginRight = toSpacingCSS(props.mr);
  if (props.mb !== undefined) style.marginBottom = toSpacingCSS(props.mb);
  if (props.ml !== undefined) style.marginLeft = toSpacingCSS(props.ml);
  if (props.pt !== undefined) style.paddingTop = toSpacingCSS(props.pt);
  if (props.pr !== undefined) style.paddingRight = toSpacingCSS(props.pr);
  if (props.pb !== undefined) style.paddingBottom = toSpacingCSS(props.pb);
  if (props.pl !== undefined) style.paddingLeft = toSpacingCSS(props.pl);
  return style;
}

type AnyProps = Record<string, unknown>;

/** Separa m/mt/.../py do resto das props -- pra elas não sobrarem como atributo DOM inválido no elemento nativo. */
export function splitSpacingProps<T extends AnyProps>(props: T): [SpacingProps, Omit<T, keyof SpacingProps>] {
  const spacing: AnyProps = {};
  const rest: AnyProps = {};
  for (const key in props) {
    if ((SPACING_KEYS as readonly string[]).includes(key)) spacing[key] = props[key];
    else rest[key] = props[key];
  }
  return [spacing as SpacingProps, rest as Omit<T, keyof SpacingProps>];
}
