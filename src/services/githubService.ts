import type { GitHubRepository } from "../types/Github";

// Helper function to handle potential errors
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return "Unknown error occurred";
}

// Build headers including an optional GitHub token.
// In a server context you can set GITHUB_TOKEN as an env var. In client
// code you would need to expose a value with the `VITE_` prefix (e.g.
// VITE_GITHUB_TOKEN) which will be bundled into the browser code.  
//
// A 403 from GitHub usually means you’ve hit the unauthenticated rate
// limit (60 requests/hour) or the token is missing/invalid.  Logging the
// full response body helps with debugging.
function makeGitHubHeaders(): Record<string, string> {
  let token: string | undefined;

  if (typeof process !== 'undefined' && process.env.GITHUB_TOKEN) {
    token = process.env.GITHUB_TOKEN;
  }
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    // Vite prefixes env vars exposed to the client with VITE_
    token = token || (import.meta.env.GITHUB_TOKEN as string) || (import.meta.env.VITE_GITHUB_TOKEN as string);
  }

  return token ? { Authorization: `token ${token}` } : {};
}

export const fetchRepositories = async (username: string): Promise<GitHubRepository[] | Error> => {
  try {
    const url = `https://api.github.com/users/${username}/repos`;
    const response = await fetch(url, { headers: makeGitHubHeaders() });

    if (!response.ok) {
      let msg = `GitHub API responded with status: ${response.status}`;
      if (response.status === 403) {
        try {
          const body = await response.json();
          msg += ` – ${body?.message || 'forbidden'}`;
        } catch {}
      }
      throw new Error(msg);
    }

    const data: Array<GitHubRepository> = await response.json();
    return data;

  } catch (error) {
    return new Error(getErrorMessage(error));
  }
};

export const fetchRepositoryLanguages = async (
  username: string,
  repo: string
): Promise<Record<string, number> | Error> => {
  try {
    const url = `https://api.github.com/repos/${username}/${repo}/languages`;
    const response = await fetch(url, { headers: makeGitHubHeaders() });

    if (!response.ok) {
      let msg = `GitHub API responded with status: ${response.status}`;
      if (response.status === 403) {
        try {
          const body = await response.json();
          msg += ` – ${body?.message || 'forbidden'}`;
        } catch {}
      }
      throw new Error(msg);
    }

    const data: Record<string, number> = await response.json();
    return data;

  } catch (error) {
    return new Error(getErrorMessage(error));
  }
};