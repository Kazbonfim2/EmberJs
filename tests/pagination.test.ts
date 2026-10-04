import { describe, expect, test } from "bun:test";
import { getPaginationRange, ELLIPSIS } from "../src/lib/pagination";

describe("getPaginationRange", () => {
  test("sem elipse quando todas as páginas cabem", () => {
    expect(getPaginationRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  test("elipse só do lado direito quando a atual está no início", () => {
    expect(getPaginationRange(1, 12)).toEqual([1, 2, 3, 4, 5, ELLIPSIS, 12]);
  });

  test("elipse só do lado esquerdo quando a atual está no fim", () => {
    expect(getPaginationRange(12, 12)).toEqual([1, ELLIPSIS, 8, 9, 10, 11, 12]);
  });

  test("elipse dos dois lados quando a atual está no meio", () => {
    expect(getPaginationRange(6, 12)).toEqual([1, ELLIPSIS, 5, 6, 7, ELLIPSIS, 12]);
  });
});
