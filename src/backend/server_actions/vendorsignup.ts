'use server'

import { db } from "@/backend/drizzle/config"
import { UsersTable, VendorsTable } from "@/backend/drizzle/schema"

export async function sendToDB(email: string, username: string) {
    const data = await db.transaction(async tx=>{
        const vendor = await tx.insert(UsersTable).values({
            username: username,
            email: email,
            role: "vendor"
        }).returning({id: UsersTable.userId});
        await tx.insert(VendorsTable).values({
            userId: vendor[0].id
        })
        return vendor
    })
    return data
}

