// @ts-check
import tailwindcss from "@tailwindcss/vite";
import robotsTxt from "astro-robots-txt";
import { defineConfig, envField, fontProviders } from "astro/config";
import { loadEnv } from "vite";

import sitemap from "@astrojs/sitemap";

import { defaultLang, hreflang, languages } from "@/i18n/i18n";
import node from "@astrojs/node";

const { SITE_URL } = loadEnv(
	process.env.NODE_ENV || "development",
	process.cwd(),
	"",
);

// https://astro.build/config
export default defineConfig({
	site: SITE_URL ?? "https://localhost:4321",
	output: "server",
	adapter: node({
		mode: "standalone",
	}),
	i18n: {
		locales: Object.keys(languages),
		defaultLocale: defaultLang,
		routing: {
			prefixDefaultLocale: true,
		},
	},

	vite: {
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

	integrations: [
		sitemap({
			i18n: {
				defaultLocale: defaultLang,
				locales: hreflang,
			},
		}),
		robotsTxt(),
	],

	env: {
		schema: {
			SITE_URL: envField.string({
				context: "server",
				access: "secret",
				default: "https://localhost:4321",
			}),
		},
	},
});
