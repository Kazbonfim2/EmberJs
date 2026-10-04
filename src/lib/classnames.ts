export type ClassValue = string | false | null | undefined;

export const cx = (...classes: ClassValue[]): string => classes.filter(Boolean).join(" ");
