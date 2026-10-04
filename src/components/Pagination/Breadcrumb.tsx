import type { AnchorHTMLAttributes, ReactNode } from "react";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./Pagination.css";

export type BreadcrumbProps = SpacingProps & { children: ReactNode; "aria-label"?: string };

export function Breadcrumb({ children, "aria-label": ariaLabel = "Você está em", ...rest }: BreadcrumbProps) {
  const [spacing] = splitSpacingProps(rest);
  return (
    <nav aria-label={ariaLabel} style={spacingStyle(spacing)}>
      <ol className="crumbs">{children}</ol>
    </nav>
  );
}

export type BreadcrumbItemProps = AnchorHTMLAttributes<HTMLAnchorElement> & SpacingProps & { current?: boolean };

export function BreadcrumbItem({ current, children, style, ...rest }: BreadcrumbItemProps) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <li style={spacingStyle(spacing)}>
      {current ? <span aria-current="page">{children}</span> : <a style={style} {...domRest}>{children}</a>}
    </li>
  );
}
