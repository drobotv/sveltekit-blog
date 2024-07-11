<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import * as Select from "$lib/components/ui/select";
  import {
    availableLanguageTags,
    languageTag,
    setLanguageTag
  } from "$lib/paraglide/runtime.js";
  import { Button } from "@/lib/components/ui/button";
  import * as DropdownMenu from "@/lib/components/ui/dropdown-menu";
  import { Separator } from "@/lib/components/ui/separator";
  import { m } from "@/lib/i18n";
  import { CircleUser } from "lucide-svelte";

  let { children, data } = $props();
</script>

<div class="flex min-h-screen flex-col">
  <header
    class="flex w-full items-center justify-between bg-slate-50 px-4 py-4 lg:px-[200px]"
  >
    <Button class="px-0 text-3xl font-bold" variant="link" href="/">s-blog</Button
    >
    <div class="flex items-center space-x-4">
      {#if data.user}
        <Button variant="outline" size="sm" href="/new"
          >{m.create_new_post()}</Button
        >

        <Select.Root
          portal={null}
          onSelectedChange={(e) => {
            goto(`/${e?.value}/` + $page.url.pathname.slice(4));
          }}
        >
          <Select.Trigger class="h-9 w-16 ">
            <Select.Value placeholder={languageTag()} />
          </Select.Trigger>
          <Select.Content>
            <Select.Group>
              {#each availableLanguageTags as tag}
                <Select.Item value={tag} label={tag}>{tag}</Select.Item>
              {/each}
            </Select.Group>
          </Select.Content>
        </Select.Root>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild let:builder>
            <Button
              builders={[builder]}
              variant="secondary"
              size="icon"
              class="rounded-full"
            >
              <CircleUser class="h-6 w-6" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            <DropdownMenu.Label>{data.user.email}</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Item href="/{data.user.name}"
              >{m.profile()}</DropdownMenu.Item
            >
            <DropdownMenu.Item data-sveltekit-reload href="/logout"
              >{m.logout()}</DropdownMenu.Item
            >
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      {:else}
        <Button variant="outline" size="sm" href="/login">{m.login()}</Button>
        <Button size="sm" href="/register">{m.register()}</Button>
      {/if}
    </div>
  </header>
  <Separator />
  <main class="w-full flex-1 space-y-2 bg-stone-100 px-4 py-4 lg:px-[200px]">
    {@render children()}
  </main>
</div>
