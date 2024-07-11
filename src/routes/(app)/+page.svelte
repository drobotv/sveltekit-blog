<script>
  import Post from "@/lib/components/Post.svelte";
  import Button from "@/lib/components/ui/button/button.svelte";
  import { m } from "@/lib/i18n";

  let { data } = $props();
</script>

<nav>
  <div class="markdown-body mb-6 flex flex-col">
    <div class="w-full text-center">
      <h1 class="font-semibold">{m.latest()}</h1>
    </div>
  </div>
</nav>
<div class="grid grid-cols-1 gap-4">
  {#each data.posts as post}
    <Post {post} />
  {/each}
</div>
