import type { AnchorHTMLAttributes, ReactNode } from "react";
import "./Pagination.css";

export function Breadcrumb({ children, "aria-label": ariaLabel = "Você está em" }: { children: ReactNode; "aria-label"?: string }) {
  return (
    <nav aria-label={ariaLabel}>
      <ol className="crumbs">{children}</ol>
    </nav>
  );
}

export type BreadcrumbItemProps = AnchorHTMLAttributes<HTMLAnchorElement> & { current?: boolean };

export function BreadcrumbItem({ current, children, ...rest }: BreadcrumbItemProps) {
  return <li>{current ? <span aria-current="page">{children}</span> : <a {...rest}>{children}</a>}</li>;
}
