import React, { useEffect, useState } from "react";

export const ThemeChangeButton = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("theme");
            const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
            const initialDark = stored === "dark" || (!stored && prefersDark);
            if (initialDark) document.documentElement.classList.add("dark");
            else document.documentElement.classList.remove("dark");
            setIsDark(initialDark);
        } catch (e) {
            // ignore
        }
    }, []);

    const toggleTheme = () => {
        const next = !document.documentElement.classList.contains("dark");
        if (next) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
        try {
            localStorage.setItem("theme", next ? "dark" : "light");
        } catch (e) {
            // ignore
        }
        setIsDark(next);
    };

    return (
        <button
            id="theme-toggle"
            className="p-2 text-gray-800 bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-white"
            onClick={toggleTheme}
        >
            {isDark ? <span>☀️</span> : <span>🌙</span>}
        </button>
    );
};
