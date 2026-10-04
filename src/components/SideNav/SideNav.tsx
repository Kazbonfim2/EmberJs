import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes } from "react";
import { cx } from "../../lib/classnames";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./SideNav.css";

export type SideNavProps = HTMLAttributes<HTMLUListElement> & SpacingProps;

export function SideNav({ className, children, style, ...rest }: SideNavProps) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <ul className={cx("sidenav", className)} style={{ ...spacingStyle(spacing), ...style }} {...domRest}>
      {children}
    </ul>
  );
}

export type SideNavTitleProps = HTMLAttributes<HTMLLIElement> & SpacingProps;

export function SideNavTitle({ children, style, ...rest }: SideNavTitleProps) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <li className="nav-title" style={{ ...spacingStyle(spacing), ...style }} {...domRest}>
      {children}
    </li>
  );
}

export type SideNavLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & SpacingProps & { current?: boolean };

export function SideNavLink({ current, style, ...rest }: SideNavLinkProps) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <li style={spacingStyle(spacing)}>
      <a aria-current={current ? "page" : undefined} style={style} {...domRest} />
    </li>
  );
}

export type SideNavButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & SpacingProps;

export function SideNavButton({ type = "button", style, ...rest }: SideNavButtonProps) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <li style={spacingStyle(spacing)}>
      <button type={type} style={style} {...domRest} />
    </li>
  );
}
