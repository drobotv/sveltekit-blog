<script lang="ts">
  import * as Form from "$lib/components/ui/form";
  import { postSchema } from "$lib/valibot-schema";
  import { Input } from "@/lib/components/ui/input";
  import { m } from "@/lib/i18n";
  import { code } from "@cartamd/plugin-code";
  import { Carta, MarkdownEditor } from "carta-md";
  import "carta-md/default.css";
  import { superForm } from "sveltekit-superforms";
  import { valibotClient } from "sveltekit-superforms/adapters";

  const carta = new Carta({
    extensions: [code()],
    sanitizer: false
  });

  let value = $state(
    `# Hello, world!
\`\`\`js
console.log('Hello, world!');
\`\`\`
`
  );

  let { data } = $props();

  const form = superForm(data.form, {
    validators: valibotClient(postSchema)
  });
  const { form: formData, enhance } = form;

  $effect(() => {
    $formData.markdown = value;
  });
</script>

<form method="POST" use:enhance>
  <Form.Field {form} name="title">
    <Form.Control let:attrs>
      <Form.Label>{m.title()}</Form.Label>
      <div
        class="flex-col justify-between gap-2 sm:flex sm:flex-row sm:items-start"
      >
        <span class="space-y-2">
          <Input class="w-full sm:w-96" {...attrs} bind:value={$formData.title} />
          <Form.Description />
          <Form.FieldErrors />
        </span>
        <Form.Button class="mt-2 w-full sm:mt-0 sm:w-32"
          >{m.confirm()}</Form.Button
        >
      </div>
    </Form.Control>
  </Form.Field>

  <Form.Field {form} name="markdown">
    <Form.Control let:attrs>
      <div class="flex items-center justify-between">
        <textarea {...attrs} hidden bind:value={$formData.markdown}></textarea>
      </div>
    </Form.Control>
    <MarkdownEditor mode="auto" theme="default" {carta} bind:value />

    <div class="flex justify-between">
      <Form.FieldErrors />
      <Form.Description />
      <span class="text-xs text-gray-500">
        {value.length}/10000
      </span>
    </div>
  </Form.Field>
</form>

<svelte:head>
  <title>{m.create_new_post()}</title>
</svelte:head>

<style>
  :global(.carta-font-code) {
    font-size: 1.1rem;
  }
</style>
