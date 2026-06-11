import { Octokit } from "@octokit/rest";
import { RepoMetaData } from "../types/Repository.type";
import { RepositorySchema } from "../validators/Repository.validator";
import ENV from "../validators/env.validator";


export class MetaDataService {

    private static octokit = new Octokit({
        auth: ENV.GITHUB_TOKEN,
    });

    static async VerifyRepoData(
        data: RepoMetaData
    ): Promise<RepoMetaData> {

        try {
            const githubURL =
            `https://github.com/${data.owner}/${data.repoName}`;


            RepositorySchema.shape.githubURL.parse(
                githubURL
            );

            RepositorySchema.shape.repoName.parse(
                data.repoName
            );

            RepositorySchema.shape.repoOwner.parse(
                data.owner
            );


            const response =
            await this.octokit.rest.repos.get({

                owner:data.owner,

                repo:data.repoName

            });



            // 3. get languages

            const languagesResponse =
            await this.octokit.rest.repos.listLanguages({

                owner:data.owner,

                repo:data.repoName

            });

            const totalBytes = Object.values(languagesResponse.data).reduce(
                (sum, val) => sum + (val as number),
                0
            );

            const languages = Object.entries(languagesResponse.data).map(([name, bytes]) => ({
                name,
                percentage: totalBytes > 0 ? Math.round(((bytes as number) / totalBytes) * 100) : 0,
            }));

            return {

                owner:
                response.data.owner.login,


                repoName:
                response.data.name,


                defaultBranch:
                response.data.default_branch,


                stars:
                response.data.stargazers_count,


                forks:
                response.data.forks_count,


                languages,


                size:
                response.data.size,


                description:
                response.data.description ?? "",

            };


        } catch(error){

            console.error(
                "Metadata verification failed",
                error
            );

            throw error;
        }
    }
}