import { usePluginData } from "@paperclipai/plugin-sdk/ui";
import type { PluginSidebarProps } from "@paperclipai/plugin-sdk/ui";

interface ReadingTime {
  minutes: number;
  seconds: number;
  wordCount: number;
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

const TIME_STYLE: React.CSSProperties = {
  fontSize: "22px",
  fontWeight: 700,
  color: "oklch(var(--color-accent-l) var(--color-accent-c) var(--color-accent-h))",
  lineHeight: 1.1,
};

const LABEL_STYLE: React.CSSProperties = {
  fontSize: "12px",
  color: "oklch(var(--color-text-secondary-l) var(--color-text-secondary-c) var(--color-text-secondary-h))",
  marginTop: "2px",
};

function formatTime(minutes: number, seconds: number): string {
  if (minutes === 0) return `${seconds}s`;
  if (seconds === 0) return `${minutes} min`;
  return `${minutes}m ${seconds}s`;
}

export function ReadingTimePanel({ context }: PluginSidebarProps) {
  const { data, loading } = usePluginData<ReadingTime>("readingTime", {});

  const timeStr = data ? formatTime(data.minutes, data.seconds) : "—";
  const wordStr = data?.wordCount ? `${data.wordCount} words` : "No content";

  return (
    <div style={PANEL_STYLE}>
      <div style={HEADING_STYLE}>Reading Time</div>
      {loading ? (
        <div style={{ fontSize: "12px", opacity: 0.5 }}>Loading…</div>
      ) : (
        <>
          <div style={TIME_STYLE}>~{timeStr}</div>
          <div style={LABEL_STYLE}>{wordStr} · {data?.minutes ?? 0 > 0 ? "long read" : "quick read"}</div>
        </>
      )}
    </div>
  );
}
