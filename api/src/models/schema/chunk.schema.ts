import { integer, pgTable, text, timestamp, uuid, vector } from "drizzle-orm/pg-core";

export const repositoryChunks = pgTable(
  "repository_chunks",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    repositoryId: uuid("repository_id")
      .notNull(),

    fileId: uuid("file_id")
      .notNull(),

    chunkIndex: integer("chunk_index")
      .notNull(),

    content: text("content")
      .notNull(),

    startLine: integer("start_line"),

    endLine: integer("end_line"),

    tokenCount: integer("token_count"),

    createdAt: timestamp("created_at")
      .defaultNow(),
  }
);

export const chunkEmbeddings = pgTable(
  "chunk_embeddings",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    chunkId: uuid("chunk_id")
      .notNull(),

    embedding: vector("embedding", {
      dimensions: 1536,
    }),
  }
);