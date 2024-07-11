import { getPostsByUserName } from "@/lib/server/db/queries.js";

export async function load(event) {
  const name = event.params.name;

  return {
    isOwner: event.locals.user?.name === name,
    posts: await getPostsByUserName(name)
  };
}

export const actions = {
  async default() {}
};
