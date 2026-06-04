import {
  pgTable,
  uuid,
  text,
  timestamp,
  varchar,
  jsonb
} from "drizzle-orm/pg-core";

export const repositoryAnalysis = pgTable(
  "repository_analysis",
  {
    id: uuid("id")
      .defaultRandom()
      .primaryKey(),

    repositoryId: uuid("repository_id")
      .notNull(),

    framework: varchar("framework", {
      length: 100,
    }),

    architecture: varchar("architecture", {
      length: 100,
    }),

    overview: text("overview"),

    entryPoints: jsonb("entry_points"),

    authSystem: text("auth_system"),

    databaseLayer: text("database_layer"),

    stateManagement: text("state_management"),

    generatedAt: timestamp("generated_at")
      .defaultNow(),
  }
);