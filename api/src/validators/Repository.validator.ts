import { z } from 'zod';

const githubURLregex = /^(https?:\/\/)?(www\.)?github\.com\/[^\/]+\/[^\/]+$/;

const Repository = z.object({
    id: z.string(),
    githubURL: z.url().regex(githubURLregex),
    repoName: z.string(),
    defaultBranch: z.string(),
    status: z.enum(["PENDING", "FETCHING_METADATA", "CLONING", "SCANNING", "GENERATING_OVERVIEW", "CHUNKING", "ANALYZING_FILES", "EMBEDDING", "READY", "FAILED"]),
    repoOwner: z.string(),
    language: z.string(),
    framework: z.string(),
    packageManager: z.string(),
    createdAt: z.date(),
});

const RepositoryLanguage = z.object({
    id: z.string(),
    repositoryId: z.string(),
    language: z.string(),
    percentage: z.number(),
})

export type Repository = z.infer<typeof Repository>;
export type RepositoryLanguage = z.infer<typeof RepositoryLanguage>;

