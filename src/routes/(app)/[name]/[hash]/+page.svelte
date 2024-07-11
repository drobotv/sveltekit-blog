<script lang="ts">
  import { m } from "@/lib/i18n";
  import { PreRendered } from "carta-md";

  const { data } = $props();
</script>

{#if data.post}
  <div class="markdown-body flex flex-col gap-6">
    <div class="w-full text-center">
      <h1 class="font-semibold">{data.post.title}</h1>
    </div>
    <div class="rounded-lg bg-white p-4 shadow-lg">
      <div class="flex items-center space-x-4">
        <div class="flex-shrink-0">
          <div class="h-12 w-12 rounded-full bg-gray-100"></div>
        </div>
        <div>
          <div class="font-medium">
            <a href="/{data.post.userName}">{data.post.userName}</a>
          </div>
          <div class="text-sm text-gray-500">{data.post.createdAt}</div>
        </div>
      </div>
    </div>

    <div
      class="mb-6 h-[45vh] rounded-lg bg-white p-4 shadow-lg md:mb-0 md:flex md:flex-col md:overflow-y-auto"
    >
      <PreRendered html={data.post.html} />
    </div>
  </div>
{:else}
  <div class="flex h-full justify-center">
    <h1 class="text-2xl">{m.not_found()}</h1>
  </div>
{/if}
