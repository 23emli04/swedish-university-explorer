# SportHub

A responsive React application that fetches and visualizes sports data (leagues, standings, teams, events) using Vite, Tailwind CSS and DaisyUI. The app is component-driven with custom hooks for fetching and transforming data.

> Note: The repository is named `swedish-university-explorer` but the project inside is a sports explorer (SportHub). Consider renaming the repo or this README to match project intent.

## Demo
(If you have a deployed demo, add the link here — e.g. Vercel / Netlify / GitHub Pages)
- Demo: https://example.com

## Features
- Browse leagues, teams and game/event details
- Filter by sport and season
- Responsive UI with Tailwind CSS and DaisyUI themes (dark/light)
- Reusable React components and custom hooks
- Skeleton loaders and graceful error handling
- Icon support (SVG) and accessible UI components

## Tech stack
- React 19 + Vite
- React Router
- Tailwind CSS + DaisyUI
- Lucide icons
- ESLint for linting
- Vite for dev server & build

## Table of contents
- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Available scripts](#available-scripts)
- [Configuration / API keys](#configuration--api-keys)
- [Project structure](#project-structure)
- [Testing & linting](#testing--linting)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Roadmap & suggestions](#roadmap--suggestions)
- [License](#license)
- [Contact](#contact)

## Requirements
- Node.js 18+ (or the version you use in CI)
- npm or Yarn

## Getting started (local)
1. Clone the repo
   ```bash
   git clone https://github.com/23emli04/swedish-university-explorer.git
   cd swedish-university-explorer
   ```
2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```
3. Configure environment / API key (see next section)
4. Start dev server
   ```bash
   npm run dev
   # or
   yarn dev
   ```
5. Open http://localhost:5173 (default Vite port) and explore.

## Available scripts
- `npm run dev` — start Vite dev server
- `npm run build` — build production bundle
- `npm run preview` — preview local build
- `npm run lint` — run ESLint across the project

Adjust scripts in `package.json` if you add testing or formatting steps.

## Configuration / API keys
This project integrates with an external sports API (example: everysport.com). Keep secrets out of source control.

- Recommended: create a `.env` file (added to `.gitignore`) with keys such as:
  ```
  VITE_SPORTS_API_KEY=your_api_key_here
  VITE_SPORTS_API_BASE=https://api.example.com
  ```
- The app currently uses a `config.js` to centralize API endpoints and keys — inspect `src/config.js` and adapt to use environment variables via `import.meta.env.VITE_...`.

Example usage inside code:
```js
const API_KEY = import.meta.env.VITE_SPORTS_API_KEY;
```

If the project includes mock data, you can run without an API key using `src/features/sports/MockData.js` for local development.

## Project structure (high level)
```
src
├── app
│   ├── App.jsx
│   └── main.jsx
├── assets
│   └── icons/*.svg
├── features
│   └── sports
│       ├── api.jsx
│       ├── components/         # UI components for pages and widgets
│       ├── hooks/              # custom hooks (EventHooks, LeagueHooks, TeamHooks)
│       ├── MockData.js
│       └── pages/              # Route pages (Home, League, Team, Event, Info)
└── lib
    └── fetcher.jsx
```

Keep components small and focused; prefer presentational + container separation for complex components.

## Coding conventions
- Use React functional components and hooks
- Keep logic in hooks (`hooks/`) and view in `components/`
- Use Tailwind utility classes; prefer small utility components for repeated patterns
- Add TypeScript or PropTypes if you want stricter prop validation (optional)

## Linting & formatting
- ESLint is already in devDependencies. Add a Prettier config and a format script if desired.
- Example: add `"format": "prettier --write ."` to package.json and configure `.prettierrc`.

## Testing
- There are no tests yet. Recommended options:
  - Jest + React Testing Library for unit/component tests
  - Playwright or Cypress for end-to-end tests
- Add a GitHub Actions workflow to run tests and lint on PRs.

## Accessibility
- Use semantic HTML and ensure interactive elements are keyboard accessible.
- Add aria labels where necessary and test with Lighthouse / axe.

## Deployment
- Build: `npm run build`
- Deploy the `dist` folder to Vercel, Netlify or serve with any static host.
- Example Vercel setup: connect the repo and set the environment variables in project settings.

## Contributing
- Add CONTRIBUTING.md and CODE_OF_CONDUCT.md when you intend to accept external contributions.
- Use conventional commits and open PRs per feature.
- Suggested pull request checklist:
  - [ ] PR has description and screenshots (if UI changes)
  - [ ] Lint passes
  - [ ] No sensitive data in commits
  - [ ] Added/updated tests (if applicable)

## Roadmap & suggestions
- Add TypeScript for improved maintainability
- Add tests (unit + e2e)
- Add CI (GH Actions) for lint/test/build
- Add Dependabot or renovate for dependency updates
- Provide a deployed demo & browser screenshots in README

## License
Add an explicit license file (e.g. MIT). If you want, use:
```
MIT License
```
and include a LICENSE file at project root.

## Contact
- Maintainer: 23emli04
- Repository: https://github.com/23emli04/swedish-university-explorer

---

If you want, I can:
- Create a branch and push this README as a replacement (open a PR)
- Add a basic GitHub Actions workflow for lint/build
- Add CONTRIBUTING.md and LICENSE files

Tell me which of those you'd like me to create next.
```
