import tailwindcss from "@tailwindcss/vite";
import type { UserConfig } from "vite";

export default {
  base: "/homepage",
  plugins: [tailwindcss()],
} satisfies UserConfig;
