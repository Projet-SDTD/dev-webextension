import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  return ({
    define: {
      "process.env.NODE_ENV": mode === "production" ? "'production'" : "'developpement'",
    },
    build: {
      lib: {
        entry: resolve(__dirname, 'src/main.ts'),
        name: 'ptsd-webext',
        formats: ["umd"]
      },
      minify: false,
    }
  });
});
