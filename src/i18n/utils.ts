import { getAbsoluteLocaleUrl } from "astro:i18n";
import { defaultLang, hreflang, languages } from "./i18n";
import { routes, ui } from "./ui";

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
	const prefix = `/${currentLang}`;
	const basePath = pathname.startsWith(prefix)
		? pathname.slice(prefix.length) || "/"
		: pathname;

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

export function useTranslatedPath(lang: keyof typeof ui) {
	return function translatePath(path: string, l: string = lang) {
		const pathName = path.replaceAll("/", "");
		const routeMap: Record<string, string> | undefined =
			l !== defaultLang && l in routes
				? routes[l as keyof typeof routes]
				: undefined;
		const translatedPath = routeMap?.[pathName]
			? "/" + routeMap[pathName]
			: path;

		return `/${l}${translatedPath}`;
	};
}

export function getRouteFromUrl(url: URL): string | undefined {
	const pathname = new URL(url).pathname;
	const parts = pathname?.split("/");
	const path = parts.pop() || parts.pop();

	if (path === undefined) {
		return undefined;
	}

	const currentLang = getLangFromUrl(url);

	if (defaultLang === currentLang) {
		const route = Object.values(routes)[0] as Record<string, string>;
		return route[path];
	}

	const getKeyByValue = (
		obj: Record<string, string>,
		value: string,
	): string | undefined => {
		return Object.keys(obj).find((key) => obj[key] === value);
	};

	const reversedKey = getKeyByValue(routes[currentLang], path);

	if (reversedKey !== undefined) {
		return reversedKey;
	}

	return undefined;
}
