<script lang="ts">
  import { Card } from "@/lib/components/ui/card";

  let { post }: { post: any } = $props();
</script>

<Card>
  <div class="p-6">
    <a href="/{post.userName}/{post.hash}">
      <h2 class="mb-2 text-xl font-semibold">{post.title}</h2>
    </a>
    <p class="mb-4 text-gray-600">
      by <a href="/{post.userName}">{post.userName}</a>
    </p>
    <div class="flex items-center space-x-4">
      <!-- <span>{post.likesCount} reactions</span> -->
      <span>
        {new Date(post.createdAt).toLocaleDateString()}
      </span>
    </div>
  </div>
</Card>
