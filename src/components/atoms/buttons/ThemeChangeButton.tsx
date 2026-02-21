import React from "react";

export const ThemeChangeButton = () => {
    const toggleTheme = () => {
        const isDark = document.documentElement.classList.toggle("dark");
        try {
            localStorage.setItem("theme", isDark ? "dark" : "light");
        } catch (e) {
            // ignore
        }
    };

    return (
        <button
            id="theme-toggle"
            className="p-2 text-gray-800 bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-white"
            onClick={toggleTheme}
        >
            <span className="dark:hidden">🌙</span>
            <span className="hidden dark:block">☀️</span>
        </button>
    );
};
