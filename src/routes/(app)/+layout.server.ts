import { getPosts } from "@/lib/server/db/queries.js";

export async function load(event) {
  return {
    user: event.locals.user,
    posts: await getPosts()
  };
}
