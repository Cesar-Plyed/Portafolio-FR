// @ts-check
import { defineConfig } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";
import tsconfigPaths from "vite-tsconfig-paths";

// https://astro.build/config
export default defineConfig({
    vite: {
        plugins: [
            tailwindcss(),
            tsconfigPaths(), // respect tsconfig.json path aliases
        ],
    },

    i18n: {
        // Define supported languages using standard language codes (e.g., 'en', 'fr', 'zh-cn')
        locales: ["en", "es"],

        // Set the default language (fallback for missing translations)
        defaultLocale: "en",

        // Choose URL routing strategy:
        routing: {
            // true: Adds prefix to default language (e.g., /en/, /fr/)
            // false: Default language has no prefix (e.g., /, /fr/)
            prefixDefaultLocale: false,
        },
    },

    integrations: [react()],
});
