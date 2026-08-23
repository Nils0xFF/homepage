import tailwindcss from "@tailwindcss/vite";
import type { UserConfig } from "vite";

export default {
  base: "/",
  plugins: [tailwindcss()],
} satisfies UserConfig;
