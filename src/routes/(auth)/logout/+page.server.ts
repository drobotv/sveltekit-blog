import { lucia } from "$lib/server/lucia";
import { redirect } from "@sveltejs/kit";

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
