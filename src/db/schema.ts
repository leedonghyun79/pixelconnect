import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// connectivity 어드민에서 발행 → push 로 동기화되는 칼럼
export const columns = pgTable("columns", {
  id: text("id").primaryKey(), // connectivity의 Column.id (cuid)
  title: text("title").notNull(),
  category: text("category").notNull(),
  contentHtml: text("content_html").notNull(),
  thumbnail: text("thumbnail"),
  publishedAt: timestamp("published_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
