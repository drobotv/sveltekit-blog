<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Form from "$lib/components/ui/form/index.js";
  import { Input } from "$lib/components/ui/input";
  import { registerSchema } from "$lib/valibot-schema";
  import { m } from "@/lib/i18n";
  import { superForm } from "sveltekit-superforms";
  import { valibotClient } from "sveltekit-superforms/adapters";
  import AuthPage from "../auth-page.svelte";

  const { data } = $props();

  const form = superForm(data.form, {
    validators: valibotClient(registerSchema)
  });

  const { form: formData, enhance, errors } = form;
</script>

<AuthPage>
  <div class="flex flex-col space-y-2 text-center">
    <h1 class="text-2xl font-semibold tracking-tight">{m.create_account()}</h1>
  </div>
  <form method="POST" use:enhance class="w-full space-y-2">
    <Form.Field {form} name="email">
      <Form.Control let:attrs>
        <Form.Label>{m.email()}</Form.Label>
        <Input type="text" {...attrs} bind:value={$formData.email} />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Field {form} name="name">
      <Form.Control let:attrs>
        <Form.Label>{m.username()}</Form.Label>
        <Input type="text" {...attrs} bind:value={$formData.name} />
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
    <Form.Field {form} name="confirmPassword">
      <Form.Control let:attrs>
        <Form.Label>{m.confirm_password()}</Form.Label>
        <Input
          type="password"
          {...attrs}
          bind:value={$formData.confirmPassword}
        />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>
    <Form.Errors errors={$errors._errors} />
    <Form.Button class="w-full">{m.register()}</Form.Button>
  </form>
  <Button variant="link" class="flex justify-end" href="/login">
    {m.already_have_an_account()}
  </Button>
</AuthPage>
