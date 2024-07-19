import {
  serial,
  text,
  timestamp,
  pgTable,
  uniqueIndex,
  boolean,
  integer,
  pgEnum,
  primaryKey,
  AnyPgColumn,
} from "drizzle-orm/pg-core";
import { relations, SQL, sql } from "drizzle-orm";

export const UsersTable = pgTable(
  "Users",
  {
    userId: serial("user_id").primaryKey(),
    image: text("image"),
    username: text("name"),
    email: text("email").notNull(),
    role: text("role").$type<"vendor" | "customer">(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(lower(users.email)),
    };
  }
);

export const usersRelations = relations(UsersTable, ({ one }) => ({
  vendor: one(VendorsTable, {
    fields: [UsersTable.userId],
    references: [VendorsTable.userId],
  }),
}));

export function lower(email: AnyPgColumn): SQL {
  return sql`lower(${email})`;
}

export const VendorsTable = pgTable("Vendors", {
  vendorId: serial("vendor_id").primaryKey(),
  displayname: text("display_name"),
  igName: text("ig_name"),
  contact: text("contact"),
  province: text("province"),
  city: text("city"),
  sendOverseas: boolean("send_overseas"),
  weekdays: boolean("weekdays"),
  description: text("description"),
  userId: integer("user_id")
    .references(() => UsersTable.userId, { onDelete: "cascade" })
    .unique(),
});

export const vendorsRelation = relations(VendorsTable, ({ many, one }) => ({
  costumes: many(CostumesTable),
  user: one(UsersTable),
}));

export const sizeEnum = pgEnum("size", ["XS", "S", "M", "L", "XL"]);

export const CostumesTable = pgTable("Costumes", {
  costumeId: serial("costume_id").primaryKey(),
  title: text("title").notNull(),
  image: text("image").notNull(),
  price: text("price").notNull(),
  tag: text("tag").notNull(),
  sauce: text("sauce").notNull(),
  size: sizeEnum("size").notNull(),
  gender: text("gender").$type<"Male" | "Female">().notNull(),
  details: text("details").notNull(),
  rules: text("rules").notNull(),
  disclaimer: text("disclaimer").notNull(),
  VendorId: integer("vendor_id").references(() => VendorsTable.vendorId, {
    onDelete: "set null",
  }),
});

export const CostumesRelations = relations(CostumesTable, ({ one, many }) => ({
  vendor: one(VendorsTable, {
    fields: [CostumesTable.VendorId],
    references: [VendorsTable.vendorId],
  }),
  costumeImages: many(ImagesTable),
}));

export const ImagesTable = pgTable("Images", {
  imageId: serial("image_id").primaryKey(),
  imageUrl: text("image_url"),
  costumeId: integer("costume_id").references(() => CostumesTable.costumeId, {
    onDelete: "cascade",
  }),
});

export const imagesRelations = relations(ImagesTable, ({ one }) => ({
  costume: one(CostumesTable, {
    fields: [ImagesTable.costumeId],
    references: [CostumesTable.costumeId],
  }),
}));

export const WishlistTable = pgTable(
  "Wishlist",
  {
    userId: integer("user_id").references(() => UsersTable.userId, {
      onDelete: "cascade",
    }),
    costumeId: integer("costume_id").references(() => CostumesTable.costumeId, {
      onDelete: "cascade",
    }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userId, table.costumeId] }),
    };
  }
);
