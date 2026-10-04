export const ELLIPSIS = "ellipsis" as const;
export type PageItem = number | typeof ELLIPSIS;

const range = (start: number, end: number): number[] =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

/** Janela de páginas com elipses, padrão "1 ... 4 5 6 ... 12". */
export function getPaginationRange(current: number, total: number, siblingCount = 1): PageItem[] {
  const totalVisible = siblingCount * 2 + 5; // primeira + última + atual + irmãs + 2 elipses
  if (total <= totalVisible) return range(1, total);

  const leftSibling = Math.max(current - siblingCount, 1);
  const rightSibling = Math.min(current + siblingCount, total);
  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < total - 1;

  if (!showLeftDots && showRightDots) {
    return [...range(1, 3 + siblingCount * 2), ELLIPSIS, total];
  }
  if (showLeftDots && !showRightDots) {
    return [1, ELLIPSIS, ...range(total - (3 + siblingCount * 2) + 1, total)];
  }
  return [1, ELLIPSIS, ...range(leftSibling, rightSibling), ELLIPSIS, total];
}
