import type { HTMLAttributes } from "react";
import { cx } from "../../lib/classnames";
import { Button } from "../Button";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import { Progress } from "./Progress";
import "./Progress.css";

export type DownloadProps = HTMLAttributes<HTMLDivElement> &
  SpacingProps & {
    title: string;
    status: string;
    percent: number;
    speed: string;
    sizeText: string;
    etaText: string;
    onPause?: () => void;
    onCancel?: () => void;
  };

export function Download({ title, status, percent, speed, sizeText, etaText, onPause, onCancel, className, style, ...rest }: DownloadProps) {
  const [spacing, domRest] = splitSpacingProps(rest);
  return (
    <div className={cx("download", className)} style={{ ...spacingStyle(spacing), ...style }} {...domRest}>
      <div className="download-head"><strong>{title}</strong><span style={{ color: "var(--text-2)" }}>{status}</span></div>
      <Progress variant="live" value={percent} label={`Download de ${title}`} />
      <div className="download-stats">
        <span><b>{speed}</b></span>
        <span>{sizeText}</span>
        <span>{etaText}</span>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "var(--sp-3)" }}>
        <Button variant="secondary" size="sm" onClick={onPause}>Pausar</Button>
        <Button variant="ghost" size="sm" onClick={onCancel}>Cancelar</Button>
      </div>
    </div>
  );
}
