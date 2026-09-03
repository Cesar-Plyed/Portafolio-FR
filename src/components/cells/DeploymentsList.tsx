import type { GitHubDeploymentStatus } from "@typings/github";
import { useState } from "react";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import en from "../../locales/en-GB.json";
import es from "../../locales/es-MX.json";
import detectLanguage from "@shared/languageDetector";

type Props = {
  initialRepos?: GitHubDeploymentStatus[];
};

export const DeploymentsList = ({ initialRepos }: Props) => {
  const [deploymentsList, setDeploymentsList] = useState<
    GitHubDeploymentStatus[]
  >(initialRepos || []);
  const [isVisible, setIsVisible] = useState(true);
  const deployLabel = (detectLanguage() === "es-MX" ? es : en)["deploy.label"];
  const toggleLabel = isVisible ? "Ocultar despliegues" : "Mostrar despliegues";

  const toggleButton = (
    <button
      type="button"
      onClick={() => setIsVisible((visible) => !visible)}
      aria-label={toggleLabel}
      title={toggleLabel}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
    >
      {isVisible ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
    </button>
  );

  if (!isVisible) {
    return <div className="flex justify-end">{toggleButton}</div>;
  }

  return (
    <div className="rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
          Despliegues Activos
        </h3>
        {toggleButton}
      </div>

      <ul className="space-y-3">
        {deploymentsList.map(
          ({ state, environment_url, repository_url, repository_name }) => (
            <li
              key={repository_url}
              className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-neutral-800/80 border border-neutral-100 dark:border-neutral-700/50 text-sm"
            >
              <div className="flex flex-col min-w-0 pr-2">
                <span className="font-bold text-neutral-800 dark:text-neutral-200 truncate">
                  {repository_name || repository_url}
                </span>
                {environment_url ? (
                  <a
                    href={environment_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline truncate"
                  >
                    {deployLabel}
                  </a>
                ) : (
                  <span className="text-xs text-neutral-400">Sin URL</span>
                )}
              </div>

              <span
                className={`px-2 py-0.5 text-xs font-semibold rounded-full capitalize shrink-0 ${
                  state === "success"
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                    : state === "failure" || state === "error"
                      ? "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                      : "bg-neutral-100 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300"
                }`}
              >
                {state}
              </span>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};
