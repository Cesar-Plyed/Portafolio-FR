# Portafolio Astro Project

This repository is a personal portfolio site built with [Astro](https://astro.build) and
React. It retrieves and displays GitHub repositories for a given user, with
client-side components and internationalization support.

## 🚧 Key Features

- **Astro framework** with React components for dynamic UI.
- **Internationalization (i18n)** for English (`en-GB`) and Spanish (`es-MX`).
- **TypeScript path aliases** (`@components`, `@typings`, etc.) for cleaner imports.
- **GitHub API integration** using fetch; handles authentication via token and
  rate‑limit errors.
- **Client-side interactivity**: update button, favorites list, language icons.
- Environment configuration through `.env` file.

## 📁 Directory Structure

```
/ (project root)
├─ astro.config.mjs          # Astro configuration (plugins, integrations)
├─ package.json
├─ tsconfig.json             # TypeScript config with path aliases
├─ .env                      # Environment variables (GITHUB_TOKEN)
├─ public/                   # Static assets
└─ src/
   ├─ components/            # React & Astro components
   │  ├─ atoms/              # Small reusable pieces (buttons, cards)
   │  ├─ cells/              # Stateful components (lists, favorites)
   │  ├─ organisms/          # Larger composed components (NavBar, Sidebar)
   │  └─ layouts/            # Layout components (main-layout.astro)
   ├─ pages/                 # Astro pages (language routes, repo pages)
   │  ├─ [lang]/             # Dynamic language directories
   │  │  ├─ index.astro       # Home page per language
   │  │  ├─ about.astro
   │  │  ├─ contact.astro
   │  │  └─ [repo]/           # Dynamic repo detail pages
   │  └─ index.astro          # redirect helper to default locale
   ├─ services/              # GitHub API helpers
   ├─ types/                 # TypeScript definitions
   ├─ locales/               # JSON translation files
   ├─ shared/                # Utility modules (languageDetector)
   └─ styles/                # Global stylesheet
```

## 🛠 Setup & Development

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Configure environment**
   Create a `.env` file at project root with your GitHub personal access token:
   ```env
   GITHUB_TOKEN=ghp_YOURTOKEN
   ```
   If you must make authenticated requests from the browser (not recommended),
   also add:
   ```env
   VITE_GITHUB_TOKEN=ghp_YOURTOKEN
   ```
3. **Run dev server**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000` (or whatever port Astro reports).

## ⚙️ Production & Deployment

- Ensure the environment variable `GITHUB_TOKEN` is set in your deployment
  platform (Vercel, Netlify, etc.).
- Do **not** expose the token to the client unless absolutely necessary.
- Build with `npm run build` and deploy the resulting `dist/` folder.

## 📝 Notes

- The GitHub API has strict rate limits for unauthenticated requests (60/hr).
  Authentication raises the limit to 5 000/hr.
- Path aliases require `vite-tsconfig-paths` plugin for Vite; the plugin is
  already configured in `astro.config.mjs`.

## 🧾 License

This project is licensed under the MIT License.
