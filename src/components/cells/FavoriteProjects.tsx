import SecondaryButton from '@components/atoms/buttons/SecondaryButton';
import ProjectCard from '@components/atoms/cards/ProjectCard';
import type { GitHubRepository } from '@typings/Github';
import React, { useEffect, useState } from 'react'
import { fetchRepositories } from 'src/services/githubService';

interface FavoriteProjectsProps {
    /**
     * one or more repository names (case‑insensitive) that should be shown
     * as “favorites”.
     * if omitted or empty, all repositories are rendered.
     */
    favoriteNames?: string[];
}

export const FavoriteProjects = ({ favoriteNames }: FavoriteProjectsProps) => {

    const [repos, setRepos] = useState<GitHubRepository[]>([]);

    useEffect(() => {
        const loadRepos = async () => {
            const result = await fetchRepositories("Cesar-Plyed");

            // Manejo de error
            if (result instanceof Error) {
                console.error("Error al obtener repositorios:", result);
                setRepos([]);
            } else {
                setRepos(result);
            }
        };

        loadRepos();

        const handler = (e: any) => {
            if (e?.detail) {
                setRepos(Array.isArray(e.detail) ? e.detail : []);
            }
        };

        window.addEventListener('repos-updated', handler as EventListener);
        return () => window.removeEventListener('repos-updated', handler as EventListener);
    }, []);

    // filter using the `favoriteNames` array if provided
    const filtered = favoriteNames && favoriteNames.length > 0
        ? repos.filter(r =>
            favoriteNames.some(fn => fn.toLowerCase() === r.name.toLowerCase())
        )
        : repos;

    if (filtered.length === 0) {
        return <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 place-items-center">
            {filtered.map((repo) => (
                <SecondaryButton>
                    {repo.name}
                </SecondaryButton>
            ))}
        </div>
    }

    return (
        <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 place-items-center">
            {filtered.map((repo) => (
                <div key={repo.id}>
                    <ProjectCard className='max-h-50' repo={repo} />
                </div>
            ))}
        </div>
    );
};
