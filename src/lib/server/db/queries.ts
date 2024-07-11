import { db } from "@/lib/server/db";
import { post, user } from "@/lib/server/db/schema";
import { and, asc, desc, eq, lt } from "drizzle-orm";

export async function getPosts(page: number = 1, limit: number = 10) {
  return db
    .select({
      hash: post.hash,
      title: post.title,
      createdAt: post.createdAt,
      userName: post.userName
    })
    .from(post)
    .orderBy(desc(post.createdAt))
    .limit(limit)
    .offset((page - 1) * limit);
}

export async function getPostsAfter(next: string) {
  return db
    .select()
    .from(post)
    .where(lt(post.id, next))
    .orderBy(desc(post.createdAt))
    .limit(10);
}

export async function getPostsByUserName(name: string) {
  return db
    .select()
    .from(post)
    .where(eq(post.userName, name))
    .orderBy(desc(post.createdAt));
}

export async function getPost(name: string, hash: string) {
  return db
    .select()
    .from(post)
    .where(and(eq(post.userName, name), eq(post.hash, hash)))
    .get();
}
