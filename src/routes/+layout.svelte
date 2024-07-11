<script lang="ts">
  import { i18n } from "$lib/i18n";
  import "$lib/styles/markdown.css";
  import "@/app.css";
  import { ParaglideJS } from "@inlang/paraglide-sveltekit";

  let { children } = $props();
</script>

<ParaglideJS {i18n}>
  {@render children()}
</ParaglideJS>
