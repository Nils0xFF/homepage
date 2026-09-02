import { getAbsoluteLocaleUrl } from "astro:i18n";
import { defaultLang, hreflang, languages } from "./i18n";
import { ui } from "./ui";

export function useTranslations(lang: keyof typeof ui) {
	const localizedUI: Record<string, string> = ui[lang];
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return key in localizedUI ? localizedUI[key] : ui[defaultLang][key];
	};
}

export function getLangFromUrl(url: URL) {
	const [, lang] = url.pathname.split("/");
	if (lang in ui) return lang as keyof typeof ui;
	return defaultLang;
}

export function getLanguageAlternates(pathname: string, currentLang: string) {
	const basePath = getBasePathFromPath(pathname, currentLang);

	const links = Object.keys(languages).map((lang) => ({
		hrefLang: hreflang[lang as keyof typeof hreflang],
		href: getAbsoluteLocaleUrl(lang, basePath),
	}));

	return [
		...links,
		{
			hrefLang: "x-default",
			href: getAbsoluteLocaleUrl(defaultLang, basePath),
		},
	];
}

export function getBasePathFromPath(
	pathname: string,
	currentLang: string,
): string {
	const prefix = `/${currentLang}`;
	const basePath = pathname.startsWith(prefix)
		? pathname.slice(prefix.length) || "/"
		: pathname;

	return basePath;
}
