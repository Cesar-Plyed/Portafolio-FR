import { Star, ExternalLink } from "lucide-react";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import detectLanguage from "@shared/languageDetector";
import { Icon } from "@iconify/react";
import { languageIcons } from "@typings/languageIcons";
import type { GitHubRepository } from "@typings/github";

interface ProjectCardProps {
  repo: GitHubRepository;
  className?: string;
}

export default function ProjectCard({ repo, className }: ProjectCardProps) {
  const languageIconList = repo.language
    ? [languageIcons[repo.language]].filter(Boolean)
    : [];

  return (
    <article
      className={`${className} group relative flex h-full min-h-56 min-w-0 flex-col gap-4 overflow-hidden rounded-lg border border-(--color-neutral-200) bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-(--color-neutral-800) dark:bg-(--color-dark-surface)`}
    >
      {/* Header */}
      <div className="flex min-w-0 items-start justify-between gap-3">
        <SecondaryButton
          className="min-w-0 flex-1 overflow-hidden"
          onClick={() => {
            try {
              const lang =
                typeof window !== "undefined" ? detectLanguage() : "en-GB";
              document.location.href = `/${lang}/${repo.name}`;
            } catch (e) {
              document.location.href = `/en-GB/${repo.name}`;
            }
          }}
        >
          <h3 className="min-w-0 truncate py-0 text-xl font-semibold text-(--color-neutral-900) transition-colors duration-200 group-hover:text-(--color-primary) dark:text-(--color-neutral-100)">
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
              fill:
                repo.stargazers_count > 0
                  ? "var(--color-accent-ice-dark)"
                  : "none",
            }}
          />
          <span className="font-medium">{repo.stargazers_count}</span>

          {/* Language Icons */}
          <div className="flex gap-2 ml-3">
            {languageIconList.map((icon) => (
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
