import { defineConfig } from "vite";
import webExtension from "@samrum/vite-plugin-web-extension";

import pkg from "./package.json";

export default defineConfig(({ mode }) => {
  return ({
    define: {
      "process.env.NODE_ENV": mode === "production" ? "'production'" : "'developpement'",
    },
    plugins: [
      webExtension({
        manifest: {
          name: pkg.name,
          description: "oui",
          version: pkg.version,
          manifest_version: 2,
          icons: {
            "48": "icons/icon-48.jpg",
          },
          background: {
            scripts: ["src/background.ts"],
            persistent: false,
          },
          content_scripts: [{
            matches: ["https://*.twitch.tv/*"],
            js: ["src/content-script.ts"],
            css: ["src/main.css"],
          }],
          browser_specific_settings: {
            gecko: {
              id: "ptsd-webext@exemple.com",
            }
          }
        }
      })
    ],
  });
});
