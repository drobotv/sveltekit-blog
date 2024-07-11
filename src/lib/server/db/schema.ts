import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";
import { generateIdFromEntropySize } from "lucia";

const primaryId = text("id")
  .primaryKey()
  .$defaultFn(() => generateIdFromEntropySize(10));

const createdAt = integer("created_at")
  .notNull()
  .$defaultFn(() => sql`(current_timestamp)`);
const updatedAt = integer("updated_at")
  .notNull()
  .$onUpdateFn(() => sql`(current_timestamp)`);

export const user = sqliteTable(
  "user",
  {
    id: primaryId,
    email: text("email").notNull().unique(),
    name: text("name").notNull().unique(),
    hashedPassword: text("hashed_password").notNull(),
    createdAt,
    updatedAt
  },
  (table) => ({
    emailIndex: uniqueIndex("user_email_idx").on(table.email),
    nameIndex: uniqueIndex("user_name_idx").on(table.name)
  })
);

export const session = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  expiresAt: integer("expires_at").notNull(),
  createdAt
});

export const post = sqliteTable(
  "post",
  {
    id: primaryId,
    hash: text("hash").notNull().unique(),
    userName: text("user_name")
      .notNull()
      .references(() => user.name),
    title: text("title").notNull(),
    markdown: text("markdown").notNull(),
    html: text("html").notNull(),
    likesCount: integer("likes_count").notNull(),
    createdAt,
    updatedAt
  },
  (table) => ({
    titleIndex: uniqueIndex("post_title_idx").on(table.title)
  })
);
