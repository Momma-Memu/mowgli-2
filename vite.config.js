import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import basicSsl from "@vitejs/plugin-basic-ssl"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes("-")
        }
      }
    }),
    vueJsx(),
    basicSsl({
      name: "test",
      // domains: [""],
      // certDir: ""
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    // https: {
    //   cert: "./certs/cert.pem",
    //   key: "./certs/key.pem",
    // },
    proxy: "https://localhost:3000"
    // proxy: {
    //   "/api": {
    //     target: "https://638a4d4f66a0.ngrok.app",
    //     changeOrigin: true,
    //     secure: true, 
    //     ws: true,
    //     rewrite: path => path.replace(/^\/api/, ''),
    //   }
    // }
  },
  assetsInclude: ["**/*.html", "**/*.svg"]
});
