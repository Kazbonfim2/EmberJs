import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/classnames";
import { Icon, type IconName } from "../Icon";
import "./Card.css";

export type CardProps = HTMLAttributes<HTMLElement> & {
  title: string;
  href?: string;
  colorFrom: string;
  colorTo: string;
  icon?: IconName;
  disabled?: boolean;
  tags?: ReactNode;
  price?: ReactNode;
};

export function Card({ title, href, colorFrom, colorTo, icon = "gamepad", disabled = false, tags, price, className, ...rest }: CardProps) {
  return (
    <article className={cx("card", disabled && "is-disabled", className)} aria-disabled={disabled || undefined} {...rest}>
      <div className="card-img" style={{ "--c1": colorFrom, "--c2": colorTo } as CSSProperties}>
        <Icon name={icon} style={{ width: 40, height: 40, strokeWidth: 1.5 }} />
      </div>
      <div className="card-body">
        <h3 className="card-title">
          {href ? <a href={href} tabIndex={disabled ? -1 : undefined}>{title}</a> : title}
        </h3>
        {tags && <div className="card-tags">{tags}</div>}
      </div>
      {price && <div className="price">{price}</div>}
    </article>
  );
}

export function CardGrid({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx("cards", className)} {...rest}>{children}</div>;
}

export const Discount = ({ children }: { children: ReactNode }) => <span className="discount">{children}</span>;
export const PriceOld = ({ children }: { children: ReactNode }) => <span className="price-old">{children}</span>;
export const PriceNow = ({ children }: { children: ReactNode }) => <span className="price-now">{children}</span>;
