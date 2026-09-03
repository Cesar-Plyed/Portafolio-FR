export interface GitHubRepository {
    id: number;
    name: string;
    description: string | null;
    stargazers_count: number;
    html_url: string ;
    language?: string | null;
}

export interface RepositoryName{
    name: string
}

export interface GitHubDeploymentStatus {
  id: number;
  state: string;
  environment_url?: string;
  target_url?: string;
  repository_url?: string;
  repository_name?: string;
}