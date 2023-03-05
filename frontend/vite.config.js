import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
    },
  },
});
