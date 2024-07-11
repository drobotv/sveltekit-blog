import { postSchema } from "$lib/valibot-schema.js";
import { carta } from "@/lib/server/carta";
import { db } from "@/lib/server/db/index.js";
import { post, user } from "@/lib/server/db/schema.js";
import { fail, redirect } from "@sveltejs/kit";
import { generateIdFromEntropySize } from "lucia";
import { superValidate } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters";

export async function load(event) {
  return {
    form: await superValidate(valibot(postSchema))
  };
}

export const actions = {
  async default(event) {
    const form = await superValidate(event, valibot(postSchema));

    if (!form.valid) {
      return fail(400, {
        form
      });
    }

    const { title, markdown } = form.data;

    const newPost = await db
      .insert(post)
      .values({
        title,
        markdown,
        html: await carta.render(markdown),
        likesCount: 0,
        userName: event.locals.user!.name,
        hash: `${title.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${generateIdFromEntropySize(5)}`
      })
      .returning();

    redirect(302, `/`);
  }
};
