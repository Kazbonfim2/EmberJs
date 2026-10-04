import { describe, expect, test } from "bun:test";
import { spacingStyle, splitSpacingProps, toSpacingCSS } from "../src/lib/spacing";

describe("toSpacingCSS", () => {
  test("numero 1-7 usa o token --sp-N", () => {
    expect(toSpacingCSS(3)).toBe("var(--sp-3)");
  });

  test("numero fora de 1-7 e tratado como px literal", () => {
    expect(toSpacingCSS(10)).toBe("10");
  });

  test("string passa direto", () => {
    expect(toSpacingCSS("1rem")).toBe("1rem");
  });
});

describe("spacingStyle", () => {
  test("m vira margin", () => {
    expect(spacingStyle({ m: 2 })).toEqual({ margin: "var(--sp-2)" });
  });

  test("mx vira marginLeft + marginRight", () => {
    expect(spacingStyle({ mx: 3 })).toEqual({ marginLeft: "var(--sp-3)", marginRight: "var(--sp-3)" });
  });

  test("py vira paddingTop + paddingBottom", () => {
    expect(spacingStyle({ py: 4 })).toEqual({ paddingTop: "var(--sp-4)", paddingBottom: "var(--sp-4)" });
  });

  test("lado especifico sobrescreve o eixo quando os dois sao passados", () => {
    expect(spacingStyle({ mx: 2, ml: 5 })).toEqual({ marginLeft: "var(--sp-5)", marginRight: "var(--sp-2)" });
  });

  test("sem props de espacamento, objeto vazio", () => {
    expect(spacingStyle({})).toEqual({});
  });
});

describe("splitSpacingProps", () => {
  test("separa espacamento do resto", () => {
    const [spacing, rest] = splitSpacingProps({ m: 2, p: 3, className: "btn", onClick: () => {} });
    expect(spacing).toEqual({ m: 2, p: 3 });
    expect(Object.keys(rest)).toEqual(["className", "onClick"]);
  });

  test("sem nenhuma prop de espacamento, spacing fica vazio", () => {
    const [spacing, rest] = splitSpacingProps({ className: "btn" });
    expect(spacing).toEqual({});
    expect(rest).toEqual({ className: "btn" });
  });
});
