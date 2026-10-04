import { cx } from "../../lib/classnames";
import { Button } from "../Button";
import { Icon, type IconName } from "../Icon";
import "./Toast.css";

export type ToastVariant = "ok" | "err" | "warn" | "info";

const VARIANT_ICON: Record<ToastVariant, IconName> = {
  ok: "circle-check",
  err: "circle-alert",
  warn: "triangle-alert",
  info: "info",
};

export type ToastProps = {
  title: string;
  text?: string;
  variant: ToastVariant;
  onDismiss: () => void;
  /** Anima a entrada (fade + slide sutil). Default true; respeita prefers-reduced-motion. */
  animated?: boolean;
};

export function Toast({ title, text, variant, onDismiss, animated = true }: ToastProps) {
  return (
    <div className={cx("toast", variant, animated && "is-animated")} role={variant === "err" ? "alert" : "status"}>
      <Icon name={VARIANT_ICON[variant]} className="kind" />
      <div>
        <div className="toast-title">{title}</div>
        {text && <div className="toast-text">{text}</div>}
      </div>
      <Button variant="ghost" icon size="sm" aria-label="Dispensar" onClick={onDismiss}>
        <Icon name="x" size="sm" />
      </Button>
    </div>
  );
}
