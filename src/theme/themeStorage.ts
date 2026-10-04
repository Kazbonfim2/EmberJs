import type { Theme } from "./ThemeProvider";

const STORAGE_KEY = "ember-theme";

type ReadableStorage = { getItem(key: string): string | null };
type WritableStorage = { setItem(key: string, value: string): void };

/** `storage` so o teste pode injetar um mock -- no browser usa o localStorage real. */
export function readStoredTheme(storage: ReadableStorage = localStorage): Theme {
  try {
    return storage.getItem(STORAGE_KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function writeStoredTheme(theme: Theme, storage: WritableStorage = localStorage): void {
  try {
    storage.setItem(STORAGE_KEY, theme);
  } catch {
    // armazenamento indisponível (modo privado, cota excedida): tema só não persiste
  }
}
