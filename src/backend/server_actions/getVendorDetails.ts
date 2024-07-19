"use server";

import { eq } from "drizzle-orm";
import { db } from "../drizzle/config";
import { VendorsTable } from "../drizzle/schema";

export default async function getDetails(userId: number) {
  console.log(userId)

  return await db.query.VendorsTable.findFirst({
    where: eq(VendorsTable.userId, userId),
  });
}
