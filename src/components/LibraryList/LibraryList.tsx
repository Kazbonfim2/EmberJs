import type { ButtonHTMLAttributes, CSSProperties, HTMLAttributes } from "react";
import { cx } from "../../lib/classnames";
import "./LibraryList.css";

export function LibraryList({ className, children, ...rest }: HTMLAttributes<HTMLUListElement>) {
  return <ul className={cx("lib", className)} {...rest}>{children}</ul>;
}

export type LibraryItemProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  colorFrom: string;
  colorTo: string;
  name: string;
  meta: string;
  current?: boolean;
};

export function LibraryItem({ colorFrom, colorTo, name, meta, current, type = "button", ...rest }: LibraryItemProps) {
  return (
    <li>
      <button type={type} className="lib-item" aria-current={current || undefined} {...rest}>
        <span className="lib-thumb" style={{ "--c1": colorFrom, "--c2": colorTo } as CSSProperties} />
        <span className="lib-name">{name}</span>
        <span className="lib-meta">{meta}</span>
      </button>
    </li>
  );
}
