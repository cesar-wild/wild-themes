import { definePlugin, runWorker } from "@paperclipai/plugin-sdk";

const FOCUS_STATE_KEY = "focusActive";

const plugin = definePlugin({
  async setup(ctx) {
    ctx.logger.info("focus-mode plugin setup complete");

    // Read current focus state
    ctx.data.register("focusState", async () => {
      const stored = await ctx.state.get({
        scopeKind: "instance",
        stateKey: FOCUS_STATE_KEY,
      });
      return { active: (stored?.value as boolean) ?? false };
    });

    // Toggle focus mode on/off
    ctx.actions.register("toggleFocus", async () => {
      const stored = await ctx.state.get({
        scopeKind: "instance",
        stateKey: FOCUS_STATE_KEY,
      });
      const current = (stored?.value as boolean) ?? false;
      await ctx.state.set(
        { scopeKind: "instance", stateKey: FOCUS_STATE_KEY },
        !current,
      );
      return { active: !current };
    });
  },

  async onHealth() {
    return { status: "ok", message: "focus-mode active" };
  },
});

export default plugin;
runWorker(plugin, import.meta.url);
