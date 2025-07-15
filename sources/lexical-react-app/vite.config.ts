import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-oxc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: false,
    minify: true,
    rollupOptions: {
      output: {
        advancedChunks: {
          groups: [
            { name: "react-router", test: "react-router" },
            { name: "react", test: "react|react-dom" },
          ],
        },
      },
    },
  },
});
