import { type SEOProps } from "astro-seo";

export const defaultSEO = {
	title: "Nils Geschwinde",
	titleTemplate: "%s - Homepage",
	description: "This is my personal homepage",
	charset: "utf-8",
	openGraph: {
		basic: {
			type: "website",
			title: "Nils Geschwinde - Homepage",
			image:
				"https://2.gravatar.com/avatar/7155ff2473c37f279e7bedb0181584aa2e5f608c892b1efd7e05934f3f625ae2?size=800",
		},
		image: {
			url: "https://2.gravatar.com/avatar/7155ff2473c37f279e7bedb0181584aa2e5f608c892b1efd7e05934f3f625ae2?size=800",
		},
		optional: {
			siteName: "Nils Geschwinde",
		},
	},
	twitter: {
		title: "Nils Geschwinde",
		image:
			"https://2.gravatar.com/avatar/7155ff2473c37f279e7bedb0181584aa2e5f608c892b1efd7e05934f3f625ae2?size=800",
		imageAlt: "Nils Geschwinde",
		description: "Personal Homepage",
		card: "summary",
		creator: "Nils Geschwinde",
	},
	extend: {
		meta: [
			{ name: "viewport", content: "width=device-width" },
			{ name: "charset", content: "utf-8" },
			{ name: "keywords", content: "Nils Geschwinde" },
		],
		link: [
			{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
			{ rel: "icon", href: "/favicon.ico" },
			{ rel: "sitemap", href: "/sitemap-index.xml" },
		],
	},
} satisfies SEOProps;

export function mergeSEO(overrides: Partial<SEOProps>): SEOProps {
	return {
		...defaultSEO,
		...overrides,
		openGraph: {
			basic: { ...defaultSEO.openGraph?.basic, ...overrides.openGraph?.basic },
			optional: {
				...defaultSEO.openGraph?.optional,
				...overrides.openGraph?.optional,
			},
			image: overrides.openGraph?.image ?? defaultSEO.openGraph?.image,
		},
		twitter: { ...defaultSEO.twitter, ...overrides.twitter },
	};
}
