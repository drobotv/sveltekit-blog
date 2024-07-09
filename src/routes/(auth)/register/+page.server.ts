import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { lucia } from "$lib/server/lucia";
import { registerSchema } from "$lib/valibot-schema";
import { m } from "@/lib/i18n.js";
import { fail, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { Argon2id } from "oslo/password";
import { setError, superValidate } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters";

export async function load(event) {
  if (event.locals.user) redirect(302, "/");
  return {
    form: await superValidate(valibot(registerSchema))
  };
}

export const actions = {
  default: async (event) => {
    if (event.locals.user) redirect(302, "/");
    const form = await superValidate(event, valibot(registerSchema));

    if (!form.valid) {
      return fail(400, {
        form
      });
    }

    const userExists = await db
      .select({ email: user.email })
      .from(user)
      .where(eq(user.email, form.data.email))
      .get();

    if (userExists) {
      return setError(form, "email", m.form_err_user_exists());
    }

    const hashedPassword = await new Argon2id().hash(form.data.password);

    const { id } = await db
      .insert(user)
      .values({
        email: form.data.email,
        name: form.data.name,
        hashedPassword
      })
      .returning({ id: user.id })
      .get();

    const session = await lucia.createSession(id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });

    redirect(302, "/");
  }
};
