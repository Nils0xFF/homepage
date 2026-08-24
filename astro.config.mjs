// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";

// https://astro.build/config
export default defineConfig({
  vite: {
    base: "/homepage",
    plugins: [tailwindcss()],
  },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Inter",
      cssVariable: "--font-inter",
      options: {
        variants: [
          {
            weight: "100 900",
            style: "normal",
            src: ["./src/assets/fonts/Inter.ttf"],
          },
          {
            weight: "100 900",
            style: "italic",
            src: ["./src/assets/fonts/Inter-Italic.ttf"],
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "CalSans",
      cssVariable: "--font-cal",
      options: {
        variants: [
          {
            weight: "100 900",
            style: "normal",
            src: ["./src/assets/fonts/CalSans-Regular.ttf"],
          },
        ],
      },
    },
  ],
});
