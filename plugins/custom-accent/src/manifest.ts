import type { PaperclipPluginManifestV1 } from "@paperclipai/plugin-sdk";

const manifest: PaperclipPluginManifestV1 = {
  id: "wild-agents.custom-accent",
  apiVersion: 1,
  version: "0.1.0",
  displayName: "Custom Accent",
  description: "Pick a custom accent color via OKLCH token override — personalize the interface without hardcoded values.",
  author: "Wild Agents",
  categories: ["ui", "theming"],
  capabilities: [
    "ui.sidebar.register",
    "plugin.state.read",
    "plugin.state.write",
  ],
  entrypoints: {
    worker: "./dist/worker.js",
    ui: "./dist/ui",
  },
  ui: {
    slots: [
      {
        type: "sidebarPanel",
        id: "custom-accent-panel",
        displayName: "Custom Accent",
        exportName: "CustomAccentPanel",
      },
    ],
  },
};

export default manifest;
