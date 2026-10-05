import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cx } from "../../lib/classnames";
import { Icon, type IconName } from "../Icon";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./Card.css";

export type CardProps = HTMLAttributes<HTMLElement> &
  SpacingProps & {
    title: string;
    href?: string;
    /** Imagem de capa, em qualquer tamanho/proporção (recorta com object-fit: cover). Quando informada, substitui o ícone/gradiente. */
    image?: string;
    imageAlt?: string;
    /** Usados só quando `image` não é informada -- fundo em gradiente atrás do ícone. */
    colorFrom?: string;
    colorTo?: string;
    icon?: IconName;
    disabled?: boolean;
    tags?: ReactNode;
    price?: ReactNode;
  };

export function Card({ title, href, image, imageAlt, colorFrom, colorTo, icon = "gamepad", disabled = false, tags, price, className, style, ...rest }: CardProps) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <article
      className={cx("card", disabled && "is-disabled", className)}
      aria-disabled={disabled || undefined}
      style={{ ...spacingStyle(spacing), ...style }}
      {...domRest}
    >
      <div className="card-img" style={image ? undefined : ({ "--c1": colorFrom, "--c2": colorTo } as CSSProperties)}>
        {image ? <img src={image} alt={imageAlt ?? title} loading="lazy" /> : <Icon name={icon} style={{ width: 40, height: 40, strokeWidth: 1.5 }} />}
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

export type CardGridProps = HTMLAttributes<HTMLDivElement> & SpacingProps;

export function CardGrid({ children, className, style, ...rest }: CardGridProps) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <div className={cx("cards", className)} style={{ ...spacingStyle(spacing), ...style }} {...domRest}>
      {children}
    </div>
  );
}

export const Discount = ({ children }: { children: ReactNode }) => <span className="discount">{children}</span>;
export const PriceOld = ({ children }: { children: ReactNode }) => <span className="price-old">{children}</span>;
export const PriceNow = ({ children }: { children: ReactNode }) => <span className="price-now">{children}</span>;
