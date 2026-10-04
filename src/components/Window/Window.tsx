import type { ReactNode } from "react";
import { Icon } from "../Icon";
import { spacingStyle, splitSpacingProps, type SpacingProps } from "../../lib/spacing";
import "./Window.css";

export type WindowProps = SpacingProps & {
  title: string;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  children: ReactNode;
};

export function Window({ title, onMinimize, onMaximize, onClose, children, ...rest }: WindowProps) {
  const [spacing] = splitSpacingProps(rest);
  return (
    <div className="win" role="group" aria-label={title} style={spacingStyle(spacing)}>
      <div className="win-bar">
        <span className="win-dot" aria-hidden="true" />
        <span className="win-title">{title}</span>
        <div className="win-ctl">
          <button type="button" aria-label="Minimizar" onClick={onMinimize}><Icon name="minus" size="sm" /></button>
          <button type="button" aria-label="Maximizar" onClick={onMaximize}><Icon name="square" size="sm" /></button>
          <button type="button" className="close" aria-label="Fechar" onClick={onClose}><Icon name="x" size="sm" /></button>
        </div>
      </div>
      <div className="win-body">{children}</div>
    </div>
  );
}
