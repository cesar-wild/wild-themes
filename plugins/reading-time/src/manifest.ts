import type { PaperclipPluginManifestV1 } from "@paperclipai/plugin-sdk";

const manifest: PaperclipPluginManifestV1 = {
  id: "wild-agents.reading-time",
  apiVersion: 1,
  version: "0.1.0",
  displayName: "Reading Time",
  description: "Shows estimated reading time for the current note — know before you publish.",
  author: "Wild Agents",
  categories: ["ui"],
  capabilities: [
    "ui.sidebar.register",
    "issues.read",
    "issue.documents.read",
  ],
  entrypoints: {
    worker: "./dist/worker.js",
    ui: "./dist/ui",
  },
  ui: {
    slots: [
      {
        type: "sidebarPanel",
        id: "reading-time-panel",
        displayName: "Reading Time",
        exportName: "ReadingTimePanel",
      },
    ],
  },
};

export default manifest;
