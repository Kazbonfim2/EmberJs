import type { ButtonHTMLAttributes, CSSProperties, HTMLAttributes } from "react";
import { cx } from "../../lib/classnames";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./LibraryList.css";

export type LibraryListProps = HTMLAttributes<HTMLUListElement> & SpacingProps;

export function LibraryList({ className, children, style, ...rest }: LibraryListProps) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <ul className={cx("lib", className)} style={{ ...spacingStyle(spacing), ...style }} {...domRest}>
      {children}
    </ul>
  );
}

export type LibraryItemProps = ButtonHTMLAttributes<HTMLButtonElement> &
  SpacingProps & {
    colorFrom: string;
    colorTo: string;
    name: string;
    meta: string;
    current?: boolean;
  };

export function LibraryItem({ colorFrom, colorTo, name, meta, current, type = "button", style, ...rest }: LibraryItemProps) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <li style={spacingStyle(spacing)}>
      <button type={type} className="lib-item" aria-current={current || undefined} style={style} {...domRest}>
        <span className="lib-thumb" style={{ "--c1": colorFrom, "--c2": colorTo } as CSSProperties} />
        <span className="lib-name">{name}</span>
        <span className="lib-meta">{meta}</span>
      </button>
    </li>
  );
}
