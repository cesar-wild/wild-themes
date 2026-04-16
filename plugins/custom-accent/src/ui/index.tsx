import { usePluginData, usePluginAction } from "@paperclipai/plugin-sdk/ui";
import type { PluginSidebarProps } from "@paperclipai/plugin-sdk/ui";
import { useState } from "react";

interface AccentConfig {
  l: number;
  c: number;
  h: number;
}

const PANEL_STYLE: React.CSSProperties = {
  padding: "12px 16px",
  fontFamily: "inherit",
  color: "oklch(var(--color-text-primary-l) var(--color-text-primary-c) var(--color-text-primary-h))",
};

const HEADING_STYLE: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "oklch(var(--color-text-secondary-l) var(--color-text-secondary-c) var(--color-text-secondary-h))",
  marginBottom: "12px",
};

const FIELD_STYLE: React.CSSProperties = {
  marginBottom: "10px",
};

const LABEL_STYLE: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  fontSize: "12px",
  marginBottom: "4px",
  color: "oklch(var(--color-text-secondary-l) var(--color-text-secondary-c) var(--color-text-secondary-h))",
};

const SLIDER_STYLE: React.CSSProperties = {
  width: "100%",
  accentColor: "oklch(var(--color-accent-l) var(--color-accent-c) var(--color-accent-h))",
};

const PREVIEW_STYLE = (l: number, c: number, h: number): React.CSSProperties => ({
  width: "100%",
  height: "28px",
  borderRadius: "4px",
  background: `oklch(${l} ${c} ${h})`,
  marginBottom: "12px",
  border: "1px solid oklch(var(--color-border-l) var(--color-border-c) var(--color-border-h))",
});

const BUTTON_STYLE: React.CSSProperties = {
  fontSize: "12px",
  padding: "5px 10px",
  borderRadius: "4px",
  border: "1px solid oklch(var(--color-border-l) var(--color-border-c) var(--color-border-h))",
  background: "oklch(var(--color-accent-l) var(--color-accent-c) var(--color-accent-h))",
  color: "oklch(var(--color-text-on-accent-l, 1) var(--color-text-on-accent-c, 0) var(--color-text-on-accent-h, 0))",
  cursor: "pointer",
  marginRight: "8px",
};

const RESET_STYLE: React.CSSProperties = {
  ...BUTTON_STYLE,
  background: "transparent",
  color: "oklch(var(--color-text-secondary-l) var(--color-text-secondary-c) var(--color-text-secondary-h))",
};

export function CustomAccentPanel({ context }: PluginSidebarProps) {
  const { data, loading } = usePluginData<AccentConfig>("accentConfig", {});
  const { invoke: setAccent } = usePluginAction("setAccent");
  const { invoke: resetAccent } = usePluginAction("resetAccent");

  const [l, setL] = useState<number | null>(null);
  const [c, setC] = useState<number | null>(null);
  const [h, setH] = useState<number | null>(null);

  const currentL = l ?? data?.l ?? 0.6;
  const currentC = c ?? data?.c ?? 0.2;
  const currentH = h ?? data?.h ?? 260;

  if (loading) {
    return (
      <div style={PANEL_STYLE}>
        <div style={{ fontSize: "12px", opacity: 0.5 }}>Loading…</div>
      </div>
    );
  }

  return (
    <div style={PANEL_STYLE}>
      <div style={HEADING_STYLE}>Custom Accent</div>

      <div style={PREVIEW_STYLE(currentL, currentC, currentH)} />

      <div style={FIELD_STYLE}>
        <div style={LABEL_STYLE}>
          <span>Lightness (L)</span>
          <span>{currentL.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={currentL}
          onChange={(e) => setL(parseFloat(e.target.value))}
          style={SLIDER_STYLE}
        />
      </div>

      <div style={FIELD_STYLE}>
        <div style={LABEL_STYLE}>
          <span>Chroma (C)</span>
          <span>{currentC.toFixed(3)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={0.4}
          step={0.005}
          value={currentC}
          onChange={(e) => setC(parseFloat(e.target.value))}
          style={SLIDER_STYLE}
        />
      </div>

      <div style={FIELD_STYLE}>
        <div style={LABEL_STYLE}>
          <span>Hue (H)</span>
          <span>{Math.round(currentH)}°</span>
        </div>
        <input
          type="range"
          min={0}
          max={359}
          step={1}
          value={currentH}
          onChange={(e) => setH(parseFloat(e.target.value))}
          style={SLIDER_STYLE}
        />
      </div>

      <div>
        <button
          style={BUTTON_STYLE}
          onClick={() => setAccent({ l: currentL, c: currentC, h: currentH })}
        >
          Apply
        </button>
        <button
          style={RESET_STYLE}
          onClick={() => {
            setL(null);
            setC(null);
            setH(null);
            resetAccent({});
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
