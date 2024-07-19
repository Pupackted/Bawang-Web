'use server'

import { db } from "@/backend/drizzle/config"
import { UsersTable } from "@/backend/drizzle/schema"

export async function sendCustomerToDB(email: string, username: string) {
    console.log(email, username)

    await db.insert(UsersTable).values({
        username: username,
        email: email,
        role: "customer"
    }).catch((e)=>console.log(e))
}

