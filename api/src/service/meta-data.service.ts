import { Octokit } from "@octokit/rest";
import { RepoMetaData } from "../types/Repository.type";
import { RepositorySchema } from "../validators/Repository.validator";

export class MetaDataService {
    private static octokit = new Octokit();

    static async VerifyRepoData(data: RepoMetaData): Promise<RepoMetaData> {
        try {
            const githubURL = `https://github.com/${data.owner}/${data.repoName}`;
            RepositorySchema.shape.githubURL.parse(githubURL);
            RepositorySchema.shape.repoName.parse(data.repoName);
            RepositorySchema.shape.repoOwner.parse(data.owner);
            RepositorySchema.shape.defaultBranch.parse(data.defaultBranch);

            const response = await this.octokit.repos.get({
                owner: data.owner,
                repo: data.repoName,
            });

            const languagesResponse = await this.octokit.repos.listLanguages({
                owner: data.owner,
                repo: data.repoName,
            });

            return {
                owner: response.data.owner.login,
                repoName: response.data.name,
                defaultBranch: response.data.default_branch,
                stars: response.data.stargazers_count,
                forks: response.data.forks_count,
                languages: Object.keys(languagesResponse.data),
                size: response.data.size,
                description: response.data.description || "",
            };
        } catch (error) {
            console.error("Error fetching metadata from GitHub:", error);
            throw error;
        }
    }
}