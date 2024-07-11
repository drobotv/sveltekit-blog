<script lang="ts">
  import { page } from "$app/stores";
  import Post from "@/lib/components/Post.svelte";
  import type { PageData } from "./$types";

  const { data }: { data: PageData } = $props();
</script>

<div class="mb-6 rounded-lg bg-white p-4 shadow-lg">
  <div class="flex items-center space-x-4">
    <div class="flex-shrink-0">
      <div class="h-12 w-12 rounded-full bg-gray-100"></div>
    </div>
    <div>
      <div class="font-medium">
        <a href="/{$page.params.name}">{$page.params.name}</a>
      </div>
    </div>
  </div>
</div>

<div class="grid grid-cols-1 gap-4">
  {#each data.posts as post}
    <Post {post} />
  {/each}
</div>
