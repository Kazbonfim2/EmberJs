import { Button } from "../components/Button";
import { Icon } from "../components/Icon";
import { useTheme } from "./useTheme";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";
  return (
    <Button variant="secondary" size="sm" aria-pressed={isLight} onClick={toggleTheme}>
      <Icon name={isLight ? "moon" : "sun"} size="sm" />
      <span>{isLight ? "Tema escuro" : "Tema claro"}</span>
    </Button>
  );
}
