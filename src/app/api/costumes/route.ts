import { db } from "@/backend/drizzle/config";
import { CostumesTable } from "@/backend/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const data = await db.query.CostumesTable.findMany({
    with: {
      vendor: {
        with: {
          user: {
            columns: {
              image: true
            }
          }
        }
      },
    },
  });

  return Response.json(data, { status: 200 });
}
