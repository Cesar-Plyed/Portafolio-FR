export interface GitHubRepository {
    id: number;
    name: string;
    description: string | null;
    stargazers_count: number;
    html_url: string;
}

export interface RepositoryName{
    name: string
}