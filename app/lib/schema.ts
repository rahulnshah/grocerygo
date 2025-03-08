import { 
    pgTable, serial, integer, varchar, text, timestamp, boolean, unique, check
  } from "drizzle-orm/pg-core";
  import { sql } from "drizzle-orm";

// Users Table
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: varchar("email", { length: 255 }).unique(),
    password: varchar("password", { length: 255 }),
    name: varchar("name", { length: 255 }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  });
  
  // Lists Table
  export const lists = pgTable("lists", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),
    createdAt: timestamp("created_at", { withTimezone: false }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: false }).defaultNow(),
  });
  
  // Items Table
  export const items = pgTable("items", {
    id: serial("id").primaryKey(),
    listId: integer("list_id").notNull().references(() => lists.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    isChecked: boolean("is_checked").default(false),
    assignedTo: integer("assigned_to").references(() => users.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: false }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: false }).defaultNow()
  });
  
  // Shared Lists Table
  export const sharedLists = pgTable(
    "shared_lists",
    {
      id: serial("id").primaryKey(),
      ownerId: integer("owner_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      sharedWithId: integer("shared_with_id").notNull().references(() => users.id, { onDelete: "cascade" }),
      listId: integer("list_id").notNull().references(() => lists.id, { onDelete: "cascade" }),
      sharedAt: timestamp("shared_at", { withTimezone: false }).defaultNow(),
    },
    (table) => [
      unique().on(table.sharedWithId, table.listId), // Prevents duplicate shares
      check("no_self_sharing", sql`${table.ownerId} <> ${table.sharedWithId}`), // Prevents self-sharing
    ]
  );

export const favorites = pgTable(
  "favorites",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    listId: integer("list_id").notNull().references(() => lists.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: false }).defaultNow(),
  },
  (table) => [
    unique().on(table.userId, table.listId), // Ensures a user can't favorite the same list more than once
  ]
);

