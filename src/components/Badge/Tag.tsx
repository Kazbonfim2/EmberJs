import type { HTMLAttributes } from "react";
import { cx } from "../../lib/classnames";
import { Icon } from "../Icon";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./Badge.css";

export type TagProps = HTMLAttributes<HTMLSpanElement> &
  SpacingProps & {
    /** Rótulo acessível do botão de remover, ex.: "Remover tag Indie". */
    onRemove?: () => void;
    removeLabel?: string;
  };

export function Tag({ className, children, onRemove, removeLabel, style, ...rest }: TagProps) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <span className={cx("tag", className)} style={{ ...spacingStyle(spacing), ...style }} {...domRest}>
      {children}
      {onRemove && (
        <button type="button" aria-label={removeLabel} onClick={onRemove}>
          <Icon name="x" size="sm" style={{ width: 12, height: 12 }} />
        </button>
      )}
    </span>
  );
}
