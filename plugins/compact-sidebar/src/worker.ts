import { definePlugin, runWorker } from "@paperclipai/plugin-sdk";

const COMPACT_STATE_KEY = "compactEnabled";

const plugin = definePlugin({
  async setup(ctx) {
    ctx.logger.info("compact-sidebar plugin setup complete");

    // Read current compact state
    ctx.data.register("compactState", async () => {
      const stored = await ctx.state.get({
        scopeKind: "user",
        stateKey: COMPACT_STATE_KEY,
      });
      return { enabled: (stored?.value as boolean) ?? false };
    });

    // Toggle compact density on/off
    ctx.actions.register("toggleCompact", async () => {
      const stored = await ctx.state.get({
        scopeKind: "user",
        stateKey: COMPACT_STATE_KEY,
      });
      const current = (stored?.value as boolean) ?? false;
      await ctx.state.set(
        { scopeKind: "user", stateKey: COMPACT_STATE_KEY },
        !current,
      );
      return { enabled: !current };
    });
  },

  async onHealth() {
    return { status: "ok", message: "compact-sidebar active" };
  },
});

export default plugin;
runWorker(plugin, import.meta.url);
