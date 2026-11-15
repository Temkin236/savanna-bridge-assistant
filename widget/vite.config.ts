import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/bridge-assistant.ts"),
      name: "SavannaBridgeAssistant",
      formats: ["es", "iife"],
      fileName: (format) => (format === "iife" ? "widget.iife.js" : "widget.js"),
    },
    target: "es2020",
    sourcemap: true,
    minify: "esbuild",
  },
});

