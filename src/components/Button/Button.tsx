import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cx } from "../../lib/classnames";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Botão quadrado, só com ícone (precisa de aria-label). */
  icon?: boolean;
  loading?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", icon = false, loading = false, className, children, disabled, type = "button", ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(
        "btn",
        `btn-${variant}`,
        size === "sm" && "btn-sm",
        size === "lg" && "btn-lg",
        icon && "btn-icon",
        loading && "is-loading",
        className,
      )}
      disabled={disabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {children}
    </button>
  );
});
