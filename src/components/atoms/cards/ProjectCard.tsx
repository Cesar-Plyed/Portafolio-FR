import { useEffect, useState } from "react";
import { Star, ExternalLink } from "lucide-react";
import type { GitHubRepository } from "../../../types/Github";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { getRelativeLocaleUrl } from 'astro:i18n';
import detectLanguage from '@shared/languageDetector';
import { fetchRepositoryLanguages } from "src/services/githubService";
import { Icon } from "@iconify/react";
import { languageIcons } from "@typings/languageIcons";

interface ProjectCardProps {
    repo: GitHubRepository;
}

export default function ProjectCard({ repo }: ProjectCardProps) {

    const [languages, setLanguages] = useState<Record<string, number>>({});

    useEffect(() => {
        async function loadLanguages() {
            const data = await fetchRepositoryLanguages("Cesar-Plyed", repo.name);
            if (!(data instanceof Error)) {
                setLanguages(data);
            }
        }
        loadLanguages();
    }, [repo.name]);

    const languageList = Object.keys(languages);
    const languageIconList = languageList
        .map(lang => languageIcons[lang])
        .filter(Boolean);

    return (
        <article className="group relative flex flex-col gap-4 p-6 bg-white dark:bg-(--color-dark-surface) rounded-lg border border-(--color-neutral-200) dark:border-(--color-neutral-800) shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">

            {/* Header */}
            <div className="flex items-start justify-between gap-3">
                <SecondaryButton className="max-w-48" onClick={() => {
                    try {
                        const lang = (typeof window !== 'undefined') ? detectLanguage() : 'en-GB';
                        document.location.href = `/${lang}/${repo.name}`;
                    } catch (e) {
                        document.location.href = `/en-GB/${repo.name}`;
                    }
                }}>
                    <h3 className="text-xl font-semibold text-(--color-neutral-900) dark:text-(--color-neutral-100) group-hover:text-(--color-primary) transition-colors duration-200">
                        {repo.name}
                    </h3>
                </SecondaryButton>

                <PrimaryButton className="items-center px-1 py-2 h-lg">
                    <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="shrink-0 rounded-md text-(--color-neutral-500) hover:text-(--color-primary) hover:bg-(--color-neutral-100) dark:hover:bg-(--color-dark-surface-elevated) transition-colors duration-200"
                    >
                        <ExternalLink style={{ width: "20px", height: "20px" }} />
                    </a>
                </PrimaryButton>
            </div>

            {/* Description */}
            <p className="text-sm text-(--color-neutral-600) dark:text-(--color-neutral-400) line-clamp-2 grow">
                {repo.description || "No description available"}
            </p>

            {/* Footer */}
            <div className="flex items-center gap-2 pt-2 border-t border-(--color-neutral-200) dark:border-(--color-neutral-800)">
                <div className="flex items-center gap-1.5 text-sm text-(--color-neutral-600) dark:text-(--color-neutral-400)">
                    <Star
                        style={{
                            width: "16px",
                            height: "16px",
                            color: "var(--color-accent-ice-dark)",
                            fill: repo.stargazers_count > 0 ? "var(--color-accent-ice-dark)" : "none",
                        }}
                    />
                    <span className="font-medium">{repo.stargazers_count}</span>

                    {/* Language Icons */}
                    <div className="flex gap-2 ml-3">
                        {languageIconList.map(icon => (
                            <Icon
                                key={icon}
                                icon={icon}
                                width="22"
                                height="22"
                                className="transition-all duration-200 dark:brightness-90 dark:contrast-125 hover:scale-110"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </article>
    );
}
