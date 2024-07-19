import { db } from "@/backend/drizzle/config";
import { VendorsTable } from "@/backend/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    await db.update(VendorsTable).set({
      displayname: data.displayname,
      igName: data.igName,
      contact: data.contact,
      province: data.province,
      city: data.city,
      sendOverseas: data.sendOverseas,
      weekdays: data.weekdays,
      description: data.description,
    }).where(eq(VendorsTable.vendorId, data.vendorId));
  
    return Response.json({},{status:200})
  } catch (error) {
    return Response.json(error,{status:400})
  }
}