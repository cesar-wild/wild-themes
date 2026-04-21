import { definePlugin, runWorker } from "@paperclipai/plugin-sdk";

/** Average adult reading speed in words per minute. */
const WPM = 200;

function estimateReadingTime(text: string): { minutes: number; seconds: number; wordCount: number } {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const totalSeconds = Math.ceil((words / WPM) * 60);
  return {
    minutes: Math.floor(totalSeconds / 60),
    seconds: totalSeconds % 60,
    wordCount: words,
  };
}

const plugin = definePlugin({
  async setup(ctx) {
    ctx.logger.info("reading-time plugin setup complete");

    // Expose reading time estimate to the UI.
    // Skeleton: returns placeholder data.
    // Full implementation would read the active issue description or document body.
    ctx.data.register("readingTime", async (params: unknown) => {
      const { text } = (params as { text?: string }) ?? {};
      if (text) {
        return estimateReadingTime(text);
      }
      return { minutes: 0, seconds: 0, wordCount: 0 };
    });
  },

  async onHealth() {
    return { status: "ok", message: "reading-time active" };
  },
});

export default plugin;
runWorker(plugin, import.meta.url);
