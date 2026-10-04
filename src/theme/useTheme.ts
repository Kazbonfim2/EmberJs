import { useContext } from "react";
import { ThemeContext, type ThemeContextValue } from "./ThemeProvider";

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme precisa estar dentro de um <ThemeProvider>");
  return ctx;
}
