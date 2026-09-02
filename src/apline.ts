import persist from "@alpinejs/persist";
import type { Alpine, AlpineComponent, InterceptorObject } from "alpinejs";

type Theme = "auto" | "light" | "dark";

type AlpineThemeStore = AlpineComponent<{
	theme: InterceptorObject<Theme>;
	get: () => Theme;
	set: (value: Theme) => void;
	getRaw(): Theme;
}>;

export default (Alpine: Alpine) => {
	Alpine.plugin(persist);
	Alpine.store("theme", {
		theme: Alpine.$persist<Theme>("auto").as("theme"),
		init() {
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			mediaQuery.addEventListener("change", () => {
				if (this.theme !== "auto") {
					return;
				}
			});
		},
		set(theme) {
			this.theme = theme;
		},
		get() {
			switch (this.theme) {
				case "light":
				case "dark":
					return this.theme;
				default:
					return window.matchMedia("(prefers-color-scheme: dark)").matches
						? "dark"
						: "light";
			}
		},
		getRaw() {
			return this.theme;
		},
	} satisfies AlpineThemeStore);
};
