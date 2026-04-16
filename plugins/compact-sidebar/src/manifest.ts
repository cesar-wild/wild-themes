import type { PaperclipPluginManifestV1 } from "@paperclipai/plugin-sdk";

const manifest: PaperclipPluginManifestV1 = {
  id: "wild-agents.compact-sidebar",
  apiVersion: 1,
  version: "0.1.0",
  displayName: "Compact Sidebar",
  description: "Tighter sidebar density for power users — less padding, smaller item heights, more content visible at once.",
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
        id: "compact-sidebar-toggle",
        displayName: "Compact Sidebar",
        exportName: "CompactSidebarToggle",
      },
    ],
  },
};

export default manifest;
