import { pgTable, uuid, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const conversations = pgTable(
  "conversations",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    repositoryId: uuid("repository_id")
      .notNull(),

    title: text("title"),

    createdAt: timestamp("created_at")
      .defaultNow(),
  }
);

export const messages = pgTable(
  "messages",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    conversationId: uuid("conversation_id")
      .notNull(),

    role: varchar("role", {
      length: 20,
    }).notNull(),

    content: text("content")
      .notNull(),

    createdAt: timestamp("created_at")
      .defaultNow(),
  }
);
