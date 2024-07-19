"use server";
import { eq } from "drizzle-orm";
import { db } from "../drizzle/config";
import { UsersTable, VendorsTable, lower } from "../drizzle/schema";

export default async function getUser(id: number) {
  return await db.query.UsersTable.findFirst({
    where: eq(UsersTable.userId, id),
    with: {
        vendor: true
    }
  });
}

export async function getUserByEmail(email: string) {
  return await db.query.UsersTable.findFirst({
    where: eq(lower(UsersTable.email), email.toLowerCase()),
    with: {
        vendor: true
    }
  });
}
