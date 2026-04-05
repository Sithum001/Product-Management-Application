# Product Management Frontend

A responsive product management web app built with Next.js App Router and TypeScript.

Main capabilities:
- Add, edit, and delete products
- Grid and table views
- Search, filter, and sort
- Inventory stats overview
- Dark and light mode toggle
- Toast notifications for user actions

## Setup Instructions

### Prerequisites
- Node.js 20 or newer
- npm 10 or newer

### 1. Install dependencies

```bash
npm install
```

### 2. Run the app locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 3. Lint the codebase

```bash
npm run lint
```

### 4. Production build (optional)

```bash
npm run build
npm run start
```

## Tech Stack Used

Core framework and language:
- Next.js 16 (App Router)
- React 19
- TypeScript 5

Styling and UI:
- Tailwind CSS 4
- Custom reusable UI components

Developer tooling:
- ESLint 9 with eslint-config-next
- PostCSS via @tailwindcss/postcss

Utilities:
- clsx
- tailwind-merge

Architecture highlights:
- Client-side state with React hooks
- Browser persistence with localStorage
- Path alias support via @/* in TypeScript config

## Assumptions

- This frontend is currently local-first and does not depend on a backend API.
- Product data is persisted in browser localStorage per user and per browser.
- No authentication or authorization is required for current usage.
- Image URLs may point to external hosts and are rendered in the UI.

## Improvements

Suggested next improvements:
- Integrate a real backend (REST/GraphQL) and database persistence.
- Add user authentication and role-based access control.
- Add form-level and business-rule validation shared with backend.
- Add unit and integration tests (for hooks, components, and flows).
- Add end-to-end tests for add/edit/delete/search/filter journeys.
- Add pagination or virtualization for large product lists.
- Add optimistic updates and better loading/error states for networked mode.
- Improve accessibility audit coverage (keyboard, focus, ARIA, contrast).
