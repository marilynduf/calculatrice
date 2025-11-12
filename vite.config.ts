import { defineConfig } from "vite";

export default defineConfig({
  base: "./",             // chemins relatifs stables en dev & prod
  build: { outDir: "dist", emptyOutDir: true }
});