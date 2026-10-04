import { createContext, useCallback, useRef, useState, type ReactNode } from "react";
import { Toast, type ToastVariant } from "./Toast";
import "./Toast.css";

export type ToastInput = { title: string; text?: string; variant?: ToastVariant };
type ToastItem = ToastInput & { id: number };

export const ToastContext = createContext<((toast: ToastInput) => void) | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
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
        {toasts.map((t) => (
          <Toast key={t.id} title={t.title} text={t.text} variant={t.variant ?? "info"} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
