import { describe, expect, test } from "bun:test";
import { readStoredTheme, writeStoredTheme } from "../src/theme/themeStorage";

function mockStorage() {
  const store = new Map<string, string>();
  return {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => store.set(key, value),
  };
}

describe("readStoredTheme", () => {
  test("sem nada salvo, assume dark", () => {
    expect(readStoredTheme(mockStorage())).toBe("dark");
  });

  test("le 'light' salvo", () => {
    const storage = mockStorage();
    storage.setItem("ember-theme", "light");
    expect(readStoredTheme(storage)).toBe("light");
  });

  test("qualquer valor que não seja 'light' cai pra dark", () => {
    const storage = mockStorage();
    storage.setItem("ember-theme", "qualquer-coisa");
    expect(readStoredTheme(storage)).toBe("dark");
  });

  test("storage que lança erro (modo privado) cai pra dark", () => {
    const throwing = { getItem: () => { throw new Error("blocked"); } };
    expect(readStoredTheme(throwing)).toBe("dark");
  });
});

describe("writeStoredTheme", () => {
  test("grava o tema na chave certa", () => {
    const storage = mockStorage();
    writeStoredTheme("light", storage);
    expect(storage.getItem("ember-theme")).toBe("light");
  });

  test("storage que lança erro não propaga", () => {
    const throwing = { setItem: () => { throw new Error("quota exceeded"); } };
    expect(() => writeStoredTheme("dark", throwing)).not.toThrow();
  });
});
