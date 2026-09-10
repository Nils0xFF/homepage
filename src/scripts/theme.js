// @ts-check

/**
 * Resolves the color theme before the first paint.
 *
 * Alpine also binds `data-theme` on <html>, but only once it has downloaded
 * and hydrated — which paints the page in the light theme first and then flips
 * it for dark-mode visitors. Running this synchronously in <head> sets the
 * attribute up front, so Alpine's later binding is a no-op.
 *
 * Reads the same localStorage key that `$persist(...).as("theme")` writes, in
 * the same JSON encoding. Keep it dependency-free and small.
 *
 * This is .js rather than .ts on purpose: layout.astro injects it verbatim via
 * `?raw` so it can block the first paint, which means whatever is written here
 * is what the browser executes — there is no compile step to strip type
 * annotations. `// @ts-check` above gives the file the same strict checking a
 * .ts file would get, using JSDoc for the few types worth naming.
 */

/** @typedef {"auto" | "light" | "dark"} ThemePreference */

(() => {
	/** @type {ThemePreference} */
	let pref = "auto";

	try {
		const stored = localStorage.getItem("theme");
		if (stored) {
			const parsed = JSON.parse(stored);
			if (parsed === "light" || parsed === "dark" || parsed === "auto") {
				pref = parsed;
			}
		}
	} catch {
		// Storage blocked, or a value we did not write — fall back to auto.
	}

	const root = document.documentElement;

	root.dataset.theme =
		pref === "light" || pref === "dark"
			? pref
			: window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";

	root.dataset.themePref = pref;
})();
