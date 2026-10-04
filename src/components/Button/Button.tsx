import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cx } from "../../lib/classnames";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./Button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  SpacingProps & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    /** Botão quadrado, só com ícone (precisa de aria-label). */
    icon?: boolean;
    loading?: boolean;
  };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", icon = false, loading = false, className, children, disabled, type = "button", style, ...rest },
  ref,
) {
  const [spacing, domRest] = splitSpacingProps(rest);
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
      style={{ ...spacingStyle(spacing), ...style }}
      {...domRest}
    >
      {children}
    </button>
  );
});
