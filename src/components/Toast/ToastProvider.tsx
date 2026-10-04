import { createContext, useCallback, useRef, useState, type ReactNode } from "react";
import type { SpacingProps } from "../../lib/spacing";
import { Toast, type ToastVariant } from "./Toast";
import "./Toast.css";

export type ToastInput = SpacingProps & { title: string; text?: string; variant?: ToastVariant; animated?: boolean };
type ToastItem = ToastInput & { id: number };

export const ToastContext = createContext<((toast: ToastInput) => void) | null>(null);

export type ToastProviderProps = {
  children: ReactNode;
  /** Default de animação pros toasts que não especificarem `animated` no show(). */
  animated?: boolean;
};

export function ToastProvider({ children, animated: defaultAnimated = true }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(0);

  const dismiss = useCallback((id: number) => {
    setToasts((items) => items.filter((t) => t.id !== id));
  }, []);

  const show = useCallback((toast: ToastInput) => {
    const id = ++nextId.current;
    setToasts((items) => [...items, { ...toast, id }]);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="toasts" style={{ position: "fixed", bottom: "var(--sp-5)", right: "var(--sp-5)", zIndex: 50 }}>
        {toasts.map(({ id, title, text, variant, animated, ...spacing }) => (
          <Toast
            key={id}
            title={title}
            text={text}
            variant={variant ?? "info"}
            animated={animated ?? defaultAnimated}
            onDismiss={() => dismiss(id)}
            {...spacing}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
