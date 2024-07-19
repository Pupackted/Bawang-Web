import { db } from "@/backend/drizzle/config"
import { UsersTable } from "@/backend/drizzle/schema"
import { eq } from "drizzle-orm"
import { NextRequest } from "next/server"

export async function GET(request:NextRequest) {
    const userId = request.nextUrl.searchParams.get('uid')
    const data = await db.query.UsersTable.findFirst({
      where: eq(UsersTable.userId,parseInt(userId)),
      with: {
        vendor: true
      }
    })
    return Response.json(data,{status:200})
  }