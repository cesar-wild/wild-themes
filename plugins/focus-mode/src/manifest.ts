import type { PaperclipPluginManifestV1 } from "@paperclipai/plugin-sdk";

const manifest: PaperclipPluginManifestV1 = {
  id: "wild-agents.focus-mode",
  apiVersion: 1,
  version: "0.1.0",
  displayName: "Focus Mode",
  description: "Toggle a distraction-free writing view — hide the sidebar and toolbar to focus on the words.",
  author: "Wild Agents",
  categories: ["ui"],
  capabilities: [
    "ui.action.register",
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
        type: "globalToolbarButton",
        id: "focus-mode-toggle",
        displayName: "Focus Mode",
        exportName: "FocusModeToggle",
      },
    ],
  },
};

export default manifest;
