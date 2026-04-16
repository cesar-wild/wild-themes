import { usePluginData, usePluginAction } from "@paperclipai/plugin-sdk/ui";
import type { PluginToolbarButtonProps } from "@paperclipai/plugin-sdk/ui";

interface CompactState {
  enabled: boolean;
}

const BUTTON_BASE: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "5px",
  fontSize: "12px",
  padding: "4px 10px",
  borderRadius: "4px",
  border: "1px solid oklch(var(--color-border-l) var(--color-border-c) var(--color-border-h))",
  cursor: "pointer",
  fontFamily: "inherit",
  transition: "background 0.1s",
};

const BUTTON_INACTIVE: React.CSSProperties = {
  ...BUTTON_BASE,
  background: "transparent",
  color: "oklch(var(--color-text-secondary-l) var(--color-text-secondary-c) var(--color-text-secondary-h))",
};

const BUTTON_ACTIVE: React.CSSProperties = {
  ...BUTTON_BASE,
  background: "oklch(var(--color-accent-l) var(--color-accent-c) var(--color-accent-h))",
  color: "oklch(var(--color-text-on-accent-l, 1) var(--color-text-on-accent-c, 0) var(--color-text-on-accent-h, 0))",
  border: "1px solid transparent",
};

// Compact icon: stacked lines closer together
function CompactIcon({ active }: { active: boolean }) {
  const color = active
    ? "oklch(var(--color-text-on-accent-l, 1) var(--color-text-on-accent-c, 0) var(--color-text-on-accent-h, 0))"
    : "oklch(var(--color-text-secondary-l) var(--color-text-secondary-c) var(--color-text-secondary-h))";

  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <rect x="1" y="2" width="12" height="1.5" rx="0.75" fill={color} />
      <rect x="1" y="5" width="12" height="1.5" rx="0.75" fill={color} />
      <rect x="1" y="8" width="12" height="1.5" rx="0.75" fill={color} />
      <rect x="1" y="11" width="12" height="1.5" rx="0.75" fill={color} />
    </svg>
  );
}

export function CompactSidebarToggle({ context }: PluginToolbarButtonProps) {
  const { data, loading } = usePluginData<CompactState>("compactState", {});
  const { invoke: toggle } = usePluginAction("toggleCompact");

  const enabled = data?.enabled ?? false;

  return (
    <button
      style={enabled ? BUTTON_ACTIVE : BUTTON_INACTIVE}
      onClick={() => toggle({})}
      disabled={loading}
      title={enabled ? "Switch to normal density" : "Switch to compact density"}
      aria-pressed={enabled}
    >
      <CompactIcon active={enabled} />
      {enabled ? "Compact" : "Compact"}
    </button>
  );
}
