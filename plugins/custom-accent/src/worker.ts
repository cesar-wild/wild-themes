import { definePlugin, runWorker } from "@paperclipai/plugin-sdk";

const ACCENT_STATE_KEY = "accentConfig";

/** OKLCH components for the accent token override. */
interface AccentConfig {
  l: number; // lightness  0–1
  c: number; // chroma     0–0.4
  h: number; // hue        0–360
}

const DEFAULT_ACCENT: AccentConfig = { l: 0.6, c: 0.2, h: 260 };

const plugin = definePlugin({
  async setup(ctx) {
    ctx.logger.info("custom-accent plugin setup complete");

    // Read current accent configuration
    ctx.data.register("accentConfig", async () => {
      const stored = await ctx.state.get({
        scopeKind: "user",
        stateKey: ACCENT_STATE_KEY,
      });
      return (stored?.value as AccentConfig) ?? DEFAULT_ACCENT;
    });

    // Persist a new accent configuration chosen by the user
    ctx.actions.register(
      "setAccent",
      async (payload: unknown) => {
        const config = payload as AccentConfig;
        // Skeleton: clamp values to valid OKLCH ranges before storing
        const safe: AccentConfig = {
          l: Math.max(0, Math.min(1, config.l)),
          c: Math.max(0, Math.min(0.4, config.c)),
          h: ((config.h % 360) + 360) % 360,
        };
        await ctx.state.set(
          { scopeKind: "user", stateKey: ACCENT_STATE_KEY },
          safe,
        );
        return { saved: true, accent: safe };
      },
    );

    // Reset to plugin default
    ctx.actions.register("resetAccent", async () => {
      await ctx.state.set(
        { scopeKind: "user", stateKey: ACCENT_STATE_KEY },
        DEFAULT_ACCENT,
      );
      return { saved: true, accent: DEFAULT_ACCENT };
    });
  },

  async onHealth() {
    return { status: "ok", message: "custom-accent active" };
  },
});

export default plugin;
runWorker(plugin, import.meta.url);
