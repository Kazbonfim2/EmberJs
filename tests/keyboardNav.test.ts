import { describe, expect, test } from "bun:test";
import { wrapIndex, tabKeyDelta, menuKeyDelta } from "../src/lib/keyboardNav";

describe("wrapIndex", () => {
  test("avança dentro dos limites", () => {
    expect(wrapIndex(0, 1, 4)).toBe(1);
  });

  test("volta pro início ao passar do último", () => {
    expect(wrapIndex(3, 1, 4)).toBe(0);
  });

  test("volta pro final ao ir antes do primeiro", () => {
    expect(wrapIndex(0, -1, 4)).toBe(3);
  });

  test("lista vazia não explode", () => {
    expect(wrapIndex(0, 1, 0)).toBe(0);
  });
});

describe("tabKeyDelta", () => {
  test("ArrowRight é +1, ArrowLeft é -1", () => {
    expect(tabKeyDelta("ArrowRight")).toBe(1);
    expect(tabKeyDelta("ArrowLeft")).toBe(-1);
  });

  test("outras teclas não tem delta", () => {
    expect(tabKeyDelta("Enter")).toBeUndefined();
  });
});

describe("menuKeyDelta", () => {
  test("ArrowDown é +1, ArrowUp é -1", () => {
    expect(menuKeyDelta("ArrowDown")).toBe(1);
    expect(menuKeyDelta("ArrowUp")).toBe(-1);
  });
});
