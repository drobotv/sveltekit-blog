import { lucia } from "$lib/server/lucia";
import { redirect } from "@sveltejs/kit";

// Memo: if you intend to skip actions and use logout as a route, add `data-sveltekit-reload` to the navigation link so that sveltekit will not logout the user on hover.

export const prerender = false;

export async function load(event) {
  const { session } = event.locals;

  if (!session) {
    redirect(302, "/");
  }
  await lucia.invalidateSession(session.id);
  const sessionCookie = lucia.createBlankSessionCookie();
  event.cookies.set(sessionCookie.name, sessionCookie.value, {
    path: ".",
    ...sessionCookie.attributes
  });
  redirect(302, "/");
}
