import { definePlugin, runWorker } from "@paperclipai/plugin-sdk";

const plugin = definePlugin({
  async setup(ctx) {
    ctx.logger.info("word-count plugin setup complete");

    // Expose word/character count data to the UI
    ctx.data.register("counts", async () => {
      // Skeleton: returns placeholder counts.
      // Full implementation would read the active issue/document body
      // and compute real counts from the content.
      return {
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
      };
    });
  },

  async onHealth() {
    return { status: "ok", message: "word-count active" };
  },
});

export default plugin;
runWorker(plugin, import.meta.url);
