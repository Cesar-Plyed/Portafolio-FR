// Initialize theme to avoid FOUC: add `dark` class when appropriate
;(function () {
    try {
        var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
        var stored = localStorage.getItem("theme");
        // stored can be: 'dark', 'light', 'system' or null
        if (stored === 'dark') {
            document.documentElement.classList.add('dark');
        } else if (stored === 'light') {
            document.documentElement.classList.remove('dark');
        } else {
            // 'system' or null -> follow OS preference
            if (prefersDark) document.documentElement.classList.add('dark');
            else document.documentElement.classList.remove('dark');
        }
    } catch (e) {
        // ignore errors (e.g., localStorage not available)
    }
})();
