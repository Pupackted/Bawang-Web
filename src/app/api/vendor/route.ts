import { db } from "@/backend/drizzle/config";
import { VendorsTable } from "@/backend/drizzle/schema";
import { eq } from "drizzle-orm";
import { useSearchParams } from "next/navigation";
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

export async function GET(request:NextRequest) {

  const qp = request.nextUrl.searchParams

    const data = await db.query.VendorsTable.findMany({
      ...(qp.get('limit') && {limit: 10}),
      with: {
        user: {
          columns: {
            image: true
          }
        },
        costumes: {
          columns: {
            costumeId: true
          }
        }
      }
    })

    return Response.json(data,{status:200})
}