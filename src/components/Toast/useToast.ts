import { useContext } from "react";
import { ToastContext, type ToastInput } from "./ToastProvider";

export function useToast(): (toast: ToastInput) => void {
  const show = useContext(ToastContext);
  if (!show) throw new Error("useToast precisa estar dentro de um <ToastProvider>");
  return show;
}
