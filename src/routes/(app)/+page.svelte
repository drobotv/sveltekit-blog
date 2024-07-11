<script>
  import Post from "@/lib/components/Post.svelte";
  import Button from "@/lib/components/ui/button/button.svelte";
  import { m } from "@/lib/i18n";

  let { data } = $props();
</script>

<nav>
  <ul class="flex space-x-4">
    <li>
      <Button variant="link">{m.relevant()}</Button>
    </li>
    <li>
      <Button variant="link" disabled>{m.latest()}</Button>
    </li>
  </ul>
</nav>
<div class="grid grid-cols-1 gap-4">
  {#each data.posts as post}
    <Post {post} />
  {/each}
</div>
