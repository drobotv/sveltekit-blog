import { getPost } from "@/lib/server/db/queries.js";

export async function load(event) {
  const name = event.params.name;
  const hash = event.params.hash;

  return {
    isOwner: event.locals.user?.name === name,
    post: await getPost(name, hash)
  };
}

export const actions = {
  async default() {}
};
