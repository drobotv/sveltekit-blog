import type { ParaglideLocals } from "@inlang/paraglide-sveltekit";
import type { AvailableLanguageTag } from "../../lib/paraglide/runtime";
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      paraglide: ParaglideLocals<AvailableLanguageTag>;
      user: import("lucia").User | null;
      session: import("lucia").Session | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
