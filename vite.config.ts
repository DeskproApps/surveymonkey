import { defineConfig } from "vite";
import copy from "rollup-plugin-copy";
import path from "path";
import react from "@vitejs/plugin-react";


// https://vitejs.dev/config/
export default defineConfig({
  base: "",
  plugins: [react()],
  server:{
    allowedHosts: true
  },
  resolve:{
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
      plugins: [
        copy({
          hook: "writeBundle",
          targets: [
            { src: "./manifest.json", dest: "./dist/" },
            { src: "./DESCRIPTION.md", dest: "./dist/" },
            { src: "./SETUP.md", dest: "./dist/" },
            { src: "./icon.svg", dest: "./dist/" },
            { src: "./docs", dest: "./dist/" },
          ],
        }),
      ],
    }
  },
});
