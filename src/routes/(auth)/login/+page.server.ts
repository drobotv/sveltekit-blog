import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { lucia } from "$lib/server/lucia.js";
import { loginSchema } from "$lib/valibot-schema";
import { m } from "@/lib/i18n";
import { fail, redirect } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import { Argon2id } from "oslo/password";
import { setError, superValidate } from "sveltekit-superforms";
import { valibot } from "sveltekit-superforms/adapters";

export async function load(event) {
  if (event.locals.user) redirect(302, "/");
  return {
    form: await superValidate(valibot(loginSchema))
  };
}

export const actions = {
  default: async (event) => {
    if (event.locals.user) redirect(302, "/");
    const form = await superValidate(event, valibot(loginSchema));

    if (!form.valid) {
      return fail(400, {
        form
      });
    }

    const existingUser = await db
      .select()
      .from(user)
      .where(eq(user.email, form.data.email))
      .get();

    if (!existingUser) {
      return setError(form, "", m.form_err_invalid_data());
    }

    const validPassword = await new Argon2id().verify(
      existingUser.hashedPassword,
      form.data.password
    );

    if (!validPassword) {
      return setError(form, "", m.form_err_invalid_data());
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });

    redirect(302, "/");
  }
};
