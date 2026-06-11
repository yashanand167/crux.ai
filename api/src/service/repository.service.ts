import { MetaDataService } from "./meta-data.service";
import { db } from "../db";
import { repositories, repositoryLanguages } from "../models/schema/Repositories.schema";

function parseGithubURL(url: string) {
    const match = url.replace(/\/$/, "").match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
        throw new Error("Invalid GitHub URL");
    }
    return {
        owner: match[1],
        repoName: match[2],
    };
}

export class RepositoryService {
    static async create(githubUrl: string) {
        const parsed = parseGithubURL(githubUrl);

        const metadata = await MetaDataService.VerifyRepoData({
            owner: parsed.owner,
            repoName: parsed.repoName,
            defaultBranch: "main",
            stars: 0,
            forks: 0,
            languages: [],
            size: 0,
            description: "",
        });

        return await db.transaction(async (tx) => {
            const [insertedRepo] = await tx
                .insert(repositories)
                .values({
                    githubUrl,
                    owner: metadata.owner,
                    name: metadata.repoName,
                    description: metadata.description,
                    defaultBranch: metadata.defaultBranch,
                    stars: metadata.stars,
                    forks: metadata.forks,
                    status: "PENDING",
                })
                .returning();

            if (metadata.languages.length > 0) {
                await tx.insert(repositoryLanguages).values(
                    metadata.languages.map((lang) => ({
                        repositoryId: insertedRepo.id,
                        language: lang.name,
                        percentage: lang.percentage,
                    }))
                );
            }

            return insertedRepo;
        });
    }
}