import type { PaperclipPluginManifestV1 } from "@paperclipai/plugin-sdk";

const manifest: PaperclipPluginManifestV1 = {
  id: "wild-agents.word-count",
  apiVersion: 1,
  version: "0.1.0",
  displayName: "Word Count",
  description: "Live word and character count in a sidebar panel — see exactly how much you've written.",
  author: "Wild Agents",
  categories: ["ui"],
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
        id: "word-count-panel",
        displayName: "Word Count",
        exportName: "WordCountPanel",
      },
    ],
  },
};

export default manifest;
