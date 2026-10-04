import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { IconSprite } from "./components/Icon";
import { ThemeProvider } from "./theme";
import { ToastProvider } from "./components/Toast";
import { App } from "./App";
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <IconSprite />
    <ThemeProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
);
