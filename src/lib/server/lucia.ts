import { dev } from "$app/environment";
import { db } from "@/lib/server/db";
import { session, user } from "@/lib/server/db/schema";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { Lucia, TimeSpan } from "lucia";

const adapter = new DrizzleSQLiteAdapter(db, session, user);

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(2, "w"),
  sessionCookie: {
    attributes: {
      secure: !dev
    }
  },
  getUserAttributes: (attributes) => ({
    id: attributes.id,
    email: attributes.email,
    name: attributes.name
  })
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    // DatabaseSessionAttributes: DatabaseSessionAttributes;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

type DatabaseUserAttributes = {
  id: string;
  email: string;
  name: string;
};
