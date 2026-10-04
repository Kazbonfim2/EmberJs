import { describe, expect, test } from "bun:test";
import { cx } from "../src/lib/classnames";

describe("cx", () => {
  test("junta classes verdadeiras com espaço", () => {
    expect(cx("btn", "btn-primary")).toBe("btn btn-primary");
  });

  test("ignora false, null e undefined", () => {
    expect(cx("btn", false, null, undefined, "btn-sm")).toBe("btn btn-sm");
  });

  test("string vazia não aparece no resultado", () => {
    expect(cx("btn", "")).toBe("btn");
  });
});
