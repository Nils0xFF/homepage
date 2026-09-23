import { type SEOProps } from "astro-seo";

const avatarURL =
	"https://2.gravatar.com/avatar/7155ff2473c37f279e7bedb0181584aa2e5f608c892b1efd7e05934f3f625ae2?size=800";

export const defaultSEO = {
	title: "Nils Geschwinde",
	description: "Personal homepage of Nils Geschwinde",
	charset: "utf-8",
	openGraph: {
		basic: {
			type: "website",
			title: "Nils Geschwinde",
			image: avatarURL,
		},
		image: {
			url: avatarURL,
		},
		optional: {
			siteName: "Nils Geschwinde",
		},
	},
	twitter: {
		title: "Nils Geschwinde",
		image: avatarURL,
		imageAlt: "Nils Geschwinde",
		card: "summary",
		creator: "Nils Geschwinde",
	},
	extend: {
		meta: [
			{ name: "viewport", content: "width=device-width" },
			{ name: "charset", content: "utf-8" },
			{ name: "keywords", content: "Nils Geschwinde" },
			{
				name: "google-site-verification",
				content: "EDpE2_redPZFC3LTPMxxHubyiG6IhDgrGbRsY7vze74",
			},
		],
		link: [
			{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
			{ rel: "icon", href: "/favicon.ico" },
			{ rel: "sitemap", href: "/sitemap-index.xml" },
		],
	},
} satisfies SEOProps;

export function mergeSEO(overrides: Partial<SEOProps>): SEOProps {
	const title = overrides.title ?? defaultSEO.title;
	const description = overrides.description ?? defaultSEO.description;

	return {
		...defaultSEO,
		...overrides,
		openGraph: {
			basic: {
				...defaultSEO.openGraph?.basic,
				title,
				...overrides.openGraph?.basic,
			},
			optional: {
				...defaultSEO.openGraph?.optional,
				description,
				...overrides.openGraph?.optional,
			},
			image: overrides.openGraph?.image ?? defaultSEO.openGraph?.image,
		},
		twitter: {
			...defaultSEO.twitter,
			title,
			description,
			...overrides.twitter,
		},
	};
}

export function getPersonJsonLd(url: URL | string) {
	return {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Nils Geschwinde",
		url: url.toString(),
		image: avatarURL,
		jobTitle: "Software Engineer",
		worksFor: {
			"@type": "Organization",
			name: "Inside M2M",
			url: "https://www.inside-m2m.com",
		},
		sameAs: [
			"https://www.linkedin.com/in/nilsgeschwinde/",
			"https://github.com/Nils0xFF",
		],
	};
}
