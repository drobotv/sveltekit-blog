<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Form from "$lib/components/ui/form/index.js";
  import { Input } from "$lib/components/ui/input";
  import { loginSchema } from "$lib/valibot-schema";
  import { m } from "@/lib/i18n";
  import { superForm } from "sveltekit-superforms";
  import { valibotClient } from "sveltekit-superforms/adapters";
  import AuthPage from "../auth-page.svelte";

  const { data } = $props();

  const form = superForm(data.form, {
    validators: valibotClient(loginSchema)
  });

  const { form: formData, enhance, errors } = form;
</script>

<AuthPage>
  <div class="flex flex-col space-y-2 text-center">
    <h1 class="text-2xl font-semibold tracking-tight">
      {m.auth_login_to_account()}
    </h1>
  </div>
  <form method="POST" use:enhance class="w-full space-y-2">
    <Form.Field {form} name="email">
      <Form.Control let:attrs>
        <Form.Label>{m.email()}</Form.Label>
        <Input type="text" {...attrs} bind:value={$formData.email} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="password">
      <Form.Control let:attrs>
        <Form.Label>{m.password()}</Form.Label>
        <Input type="password" {...attrs} bind:value={$formData.password} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Errors errors={$errors._errors} />
    <Form.Button class="w-full">{m.login()}</Form.Button>
  </form>
  <Button variant="link" class="flex justify-end" href="/register">
    {m.auth_no_account()}
  </Button>
</AuthPage>
