import { db } from "@/backend/drizzle/config";
import { CostumesTable } from "@/backend/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request:NextRequest, {params}) {

    const data = await db.query.CostumesTable.findMany({
        where: eq(CostumesTable.VendorId, parseInt(params.vendorId))
    })

    return Response.json(data,{status:200})
}