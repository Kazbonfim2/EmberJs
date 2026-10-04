import type { HTMLAttributes } from "react";
import { cx } from "../../lib/classnames";
import { Icon } from "../Icon";
import "./Badge.css";

export type TagProps = HTMLAttributes<HTMLSpanElement> & {
  /** Rótulo acessível do botão de remover, ex.: "Remover tag Indie". */
  onRemove?: () => void;
  removeLabel?: string;
};

export function Tag({ className, children, onRemove, removeLabel, ...rest }: TagProps) {
  return (
    <span className={cx("tag", className)} {...rest}>
      {children}
      {onRemove && (
        <button type="button" aria-label={removeLabel} onClick={onRemove}>
          <Icon name="x" size="sm" style={{ width: 12, height: 12 }} />
        </button>
      )}
    </span>
  );
}
