import {
    pgTable,
    uuid,
    text,
    timestamp,
    integer,
    varchar
} from "drizzle-orm/pg-core";

export enum RepositoryStatus {
  PENDING = "PENDING",

  FETCHING_METADATA = "FETCHING_METADATA",

  CLONING = "CLONING",

  SCANNING = "SCANNING",

  GENERATING_OVERVIEW = "GENERATING_OVERVIEW",

  CHUNKING = "CHUNKING",

  ANALYZING_FILES = "ANALYZING_FILES",

  EMBEDDING = "EMBEDDING",

  READY = "READY",

  FAILED = "FAILED",
}

export const repositories = pgTable("repositories", {
    id: uuid("id").defaultRandom().primaryKey(),

    githubUrl: text("github_url").notNull(),

    owner: varchar("owner", { length: 255 }).notNull(),

    name: varchar("name", { length: 255 }).notNull(),

    description: text("description"),

    defaultBranch: varchar("default_branch", {
        length: 255,
    }),

    stars: integer("stars").default(0),

    forks: integer("forks").default(0),

    status: varchar("status", {
        length: 50,
    }).default("pending"),

    createdAt: timestamp("created_at")
        .defaultNow()
        .notNull(),

    updatedAt: timestamp("updated_at")
        .defaultNow()
        .notNull(),
});

export const repositoryLanguages = pgTable(

    "repository_languages",

    {
        id: uuid("id")
            .defaultRandom()
            .primaryKey(),

        repositoryId: uuid("repository_id")
            .notNull(),

        language: varchar("language", {
            length: 100,
        }).notNull(),

        percentage: integer("percentage")
            .notNull(),
    }
);