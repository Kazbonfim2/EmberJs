import { getPaginationRange, ELLIPSIS } from "../../lib/pagination";
import { Icon } from "../Icon";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./Pagination.css";

export type PaginationProps = SpacingProps & {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  "aria-label"?: string;
};

export function Pagination({ page, totalPages, onChange, siblingCount = 1, "aria-label": ariaLabel = "Paginação", ...rest }: PaginationProps) {
  const items = getPaginationRange(page, totalPages, siblingCount);
  const [spacing] = splitSpacingProps(rest);
  return (
    <nav aria-label={ariaLabel} style={spacingStyle(spacing)}>
      <ul className="pager">
        <li>
          <button type="button" disabled={page <= 1} aria-label="Página anterior" onClick={() => onChange(page - 1)}>
            <Icon name="chevron-left" size="sm" />
          </button>
        </li>
        {items.map((item, i) =>
          item === ELLIPSIS ? (
            <li key={`e-${i}`}>
              <button type="button" aria-label="Mais páginas" disabled>
                <Icon name="ellipsis" size="sm" />
              </button>
            </li>
          ) : (
            <li key={item}>
              <button type="button" aria-current={item === page ? "page" : undefined} onClick={() => onChange(item)}>
                {item}
              </button>
            </li>
          ),
        )}
        <li>
          <button type="button" disabled={page >= totalPages} aria-label="Próxima página" onClick={() => onChange(page + 1)}>
            <Icon name="chevron-right" size="sm" />
          </button>
        </li>
      </ul>
    </nav>
  );
}
