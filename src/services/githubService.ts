import type { GitHubRepository } from "../types/github.ts";

// Helper function to handle potential errors
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Unknown error occurred";
}

export const fetchRepositories = async (username: string): Promise<GitHubRepository[] | Error> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos`);

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    // Cast the JSON response to your defined TypeScript type
    const data: Array<GitHubRepository> = await response.json();
    return data;

  } catch (error) {
    return new Error(getErrorMessage(error));
  }
};

