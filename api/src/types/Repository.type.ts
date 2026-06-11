export interface RepoMetaData {
    owner: string,
    repoName: string,
    defaultBranch: string,
    stars: number,
    forks: number,
    languages: { name: string; percentage: number }[],
    size: number,
    description: string
}

export interface CloneJob {
    repositoryId: string,
    repoURL: string
}