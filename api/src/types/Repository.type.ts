export interface RepoMetaData {
    owner: string,
    repoName: string,
    defaultBranch: string,
    stars: number,
    forks: number,
    languages: string[],
    size: number,
    description: string
}

export interface CloneJob {
    repositoryId: string,
    repoURL: string
}