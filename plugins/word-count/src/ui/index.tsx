import { usePluginData } from "@paperclipai/plugin-sdk/ui";
import type { PluginSidebarProps } from "@paperclipai/plugin-sdk/ui";

interface Counts {
  words: number;
  characters: number;
  charactersNoSpaces: number;
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
  marginBottom: "10px",
};

const ROW_STYLE: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "baseline",
  fontSize: "13px",
  paddingBottom: "6px",
};

const VALUE_STYLE: React.CSSProperties = {
  fontVariantNumeric: "tabular-nums",
  color: "oklch(var(--color-accent-l) var(--color-accent-c) var(--color-accent-h))",
  fontWeight: 600,
};

export function WordCountPanel({ context }: PluginSidebarProps) {
  const { data, loading } = usePluginData<Counts>("counts", {});

  return (
    <div style={PANEL_STYLE}>
      <div style={HEADING_STYLE}>Word Count</div>
      {loading ? (
        <div style={{ fontSize: "12px", opacity: 0.5 }}>Loading…</div>
      ) : (
        <>
          <div style={ROW_STYLE}>
            <span>Words</span>
            <span style={VALUE_STYLE}>{data?.words ?? 0}</span>
          </div>
          <div style={ROW_STYLE}>
            <span>Characters</span>
            <span style={VALUE_STYLE}>{data?.characters ?? 0}</span>
          </div>
          <div style={ROW_STYLE}>
            <span>No spaces</span>
            <span style={VALUE_STYLE}>{data?.charactersNoSpaces ?? 0}</span>
          </div>
        </>
      )}
    </div>
  );
}
