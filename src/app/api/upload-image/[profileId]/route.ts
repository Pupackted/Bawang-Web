import { db } from "@/backend/drizzle/config";
import { CostumesTable, UsersTable } from "@/backend/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(request:NextRequest, {params}) {

    const data = await request.json()

    const profileId = params.profileId

    const res = await db.update(UsersTable).set({
        image: data.image
    }).where(eq(UsersTable.userId,parseInt(profileId))).returning()

    return Response.json(res,{status:200})
}   