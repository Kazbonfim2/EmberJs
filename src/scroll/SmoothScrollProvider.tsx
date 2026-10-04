import { Lenis as ReactLenis, type LenisProps } from "lenis/react";
import "lenis/dist/lenis.css";

export type SmoothScrollProviderProps = Omit<LenisProps, "root">;

/**
 * Suaviza o scroll da página inteira (inércia/easing no wheel/touch), via Lenis.
 * Já respeita prefers-reduced-motion por padrão (respectReducedMotion do Lenis) e
 * trata cliques em links de âncora (`<a href="#id">`) com o mesmo easing.
 */
export function SmoothScrollProvider({ options, ...rest }: SmoothScrollProviderProps) {
  return <ReactLenis root options={{ anchors: true, ...options }} {...rest} />;
}
