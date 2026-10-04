import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes } from "react";
import { cx } from "../../lib/classnames";
import "./SideNav.css";

export function SideNav({ className, children, ...rest }: HTMLAttributes<HTMLUListElement>) {
  return <ul className={cx("sidenav", className)} {...rest}>{children}</ul>;
}

export function SideNavTitle({ children, ...rest }: HTMLAttributes<HTMLLIElement>) {
  return <li className="nav-title" {...rest}>{children}</li>;
}

export type SideNavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { current?: boolean };

export function SideNavLink({ current, ...rest }: SideNavLinkProps) {
  return <li><a aria-current={current ? "page" : undefined} {...rest} /></li>;
}

export function SideNavButton({ type = "button", ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <li><button type={type} {...rest} /></li>;
}
