import * as runtime from "$lib/paraglide/runtime.js";
import { createI18n } from "@inlang/paraglide-sveltekit";

export const i18n = createI18n(runtime, { prefixDefaultLanguage: "always" });
export * as m from "$lib/paraglide/messages.js";
