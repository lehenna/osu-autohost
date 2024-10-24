import path from "path";
import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
  if (mode === "development") {
    config.server = {};
    config.server.proxy = {
      "/api": "http://localhost:4000",
    };
  }
  return config;
});
