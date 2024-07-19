import { db } from "@/backend/drizzle/config";
import { CostumesTable, ImagesTable } from "@/backend/drizzle/schema";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest, { params }) {
  const data = await db.query.CostumesTable.findFirst({
    where: eq(CostumesTable.costumeId, params.cid),
    with: {
      costumeImages: true,
      vendor: {
        columns: {
          displayname: true,
          igName: true,
          province: true,
          city: true,
          contact: true,
        },
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

export async function POST(request: NextRequest) {
  const data = (await request.json());

  console.log(data)

  const transaction = await db.transaction(async (tx) => {
    const costume = await tx.insert(CostumesTable).values({
      image: data.image,
      title: data.title,
      price: data.price,
      tag: data.tag,
      sauce: data.sauce,
      size: data.size,
      gender: data.gender,
      details: data.details,
      rules: data.rules,
      disclaimer: data.disclaimer,
      VendorId: data.vendorId,
    }).returning({id: CostumesTable.costumeId}).catch(e=>console.log(e));
    for (const image of data.costumeImages) {
      switch (image.op) {
        case "DELETE":
          await tx
            .delete(ImagesTable)
            .where(eq(ImagesTable.costumeId, data.costumeId)).catch(e=>console.log(e));
          break;
        case "CREATE":
          await tx.insert(ImagesTable).values({
            imageUrl: image.imageUrl,
            costumeId: costume[0].id,
          }).catch(e=>console.log(e));
          break;
        case "UPDATE":
          await tx
            .update(ImagesTable)
            .set({
              imageUrl: image.imageUrl,
            })
            .where(eq(ImagesTable.costumeId, data.costumeId)).catch(e=>console.log(e));
          break;
        default:
          break;
      }
    }
    
  });
  return Response.json({}, { status: 200 });
}

export async function PATCH(request: NextRequest) {
  const data = (await request.json());


  try {
    const transaction = await db.transaction(async (tx) => {
      for (const image of data.costumeImages) {
        // console.log(image)
        switch (image.op) {
          case "DELETE":
            const gay = await tx
              .delete(ImagesTable)
              .where(eq(ImagesTable.imageId, parseInt(data.imageId))).catch(e=>console.log(e));
              console.log(gay)
            break;
          case "CREATE":
            await tx.insert(ImagesTable).values({
              imageUrl: image.imageUrl,
              costumeId: data.costumeId,
            });
            break;
          case "UPDATE":
            await tx
              .update(ImagesTable)
              .set({
                imageUrl: image.imageUrl,
              })
              .where(eq(ImagesTable.imageId, data.imageId));
            break;
          default:
            break;
        }
      }
      await tx
        .update(CostumesTable)
        .set({
          image: data.image,
          title: data.title,
          price: data.price,
          tag: data.tag,
          sauce: data.sauce,
          size: data.size,
          gender: data.gender,
          details: data.details,
          rules: data.rules,
          disclaimer: data.disclaimer,
        })
        .where(eq(CostumesTable.costumeId, data.costumeId));
    });
    return Response.json({}, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json(e, { status: 400 });
  }
}
