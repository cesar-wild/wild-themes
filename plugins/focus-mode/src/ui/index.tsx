import { usePluginData, usePluginAction } from "@paperclipai/plugin-sdk/ui";
import type { PluginSidebarProps } from "@paperclipai/plugin-sdk/ui";

interface FocusState {
  active: boolean;
}

export function FocusModeToggle({ context }: PluginSidebarProps) {
  const { data } = usePluginData<FocusState>("focusState", {});
  const toggleFocus = usePluginAction("toggleFocus");

  const active = data?.active ?? false;

  const buttonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid",
    borderColor: active
      ? "oklch(var(--color-accent-l) var(--color-accent-c) var(--color-accent-h))"
      : "oklch(var(--color-border-l) var(--color-border-c) var(--color-border-h))",
    background: active
      ? "oklch(var(--color-accent-l) var(--color-accent-c) var(--color-accent-h) / 0.12)"
      : "transparent",
    color: active
      ? "oklch(var(--color-accent-l) var(--color-accent-c) var(--color-accent-h))"
      : "oklch(var(--color-text-secondary-l) var(--color-text-secondary-c) var(--color-text-secondary-h))",
    cursor: "pointer",
    fontSize: "13px",
    fontFamily: "inherit",
    fontWeight: active ? 600 : 400,
    transition: "all 0.15s ease",
  };

  return (
    <button style={buttonStyle} onClick={() => toggleFocus({})}>
      {active ? "✦ Focus" : "◎ Focus"}
    </button>
  );
}
