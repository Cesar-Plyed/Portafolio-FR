import React, { useEffect, useState } from 'react';
import ProjectCard from '../atoms/cards/ProjectCard';
import type { GitHubRepository } from '@typings/Github';

type Props = {
  initialRepos?: GitHubRepository[];
};

export default function ListProjectsClient({ initialRepos = [] }: Props) {
  const [repos, setRepos] = useState<GitHubRepository[]>(initialRepos || []);

  useEffect(() => {
    const handler = (e: any) => {
      if (e?.detail) {
        setRepos(Array.isArray(e.detail) ? e.detail : []);
      }
    };

    window.addEventListener('repos-updated', handler as EventListener);
    return () => window.removeEventListener('repos-updated', handler as EventListener);
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {repos.map((repo) => (
        <ProjectCard key={repo.name} repo={repo} />
      ))}
    </div>
  );
}
