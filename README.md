# Planning Poker - Monorepo

A modern, real-time Planning Poker application built with a Monorepo architecture. This project uses TypeScript across the entire stack, ensuring type safety between the Frontend, Backend, and Shared logic.

## 🛠 Tech Stack

- **Monorepo Manager:** [Turborepo](https://turbo.build/)
- **Package Manager:** [pnpm](https://pnpm.io/)
- **Frontend:** React, Vite, TypeScript, TailwindCSS
- **Backend:** Node.js (ESM), Express, Socket.io
- **Shared:** Shared TypeScript interfaces (DTOs, Events) & Zod validation
- **Code Quality:** ESLint, Prettier, TypeScript Strict Mode

## 📂 Project Structure

The project follows a standard Turborepo structure:

```text
.
├── apps/
│   ├── web/            # Frontend application (React + Vite)
│   └── api/            # Backend server (Node.js + Express + Socket.io)
├── packages/
│   └── shared/         # Shared TypeScript configurations, types, and constants
├── .vscode/            # Workspace configuration (ESLint/Prettier auto-fix)
├── package.json        # Root manifest
└── turbo.json          # Turborepo pipeline configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js: Version 18 or higher.
- pnpm: This project uses pnpm workspaces. Install it globally:

```Bash
npm install -g pnpm
```

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd planning-poker-monorepo
```

2. Install dependencies (this installs dependencies for all apps and packages):

```bash
pnpm install
```

### Running the Project

To start the development environment:

```bash
pnpm dev
```

This command uses **Turborepo** to run both the frontend and backend in parallel:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Other Commands

- `pnpm build` - Builds all apps and packages.
- `pnpm lint` - Runs ESLint across the monorepo.
- `pnpm format` - Runs Prettier to format code.

## 🤝 Contribution Guidelines

To maintain a clean history and facilitate automated versioning/changelogs, we follow the **Conventional Commits** specification.

### Commit Messages:

Each commit message must follow this format:

```text
type(scope): short description
```

#### Allowed Types (type):

- `feat`: A new feature (e.g., adding voting cards).
- `fix`: A bug fix.
- `docs`: Documentation only changes.
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc).
- `refactor`: A code change that neither fixes a bug nor adds a feature.
- `chore`: Changes to the build process or auxiliary tools/libraries (e.g., updating dependencies).

#### Allowed Scopes (scope):

- `web`: Changes inside apps/web.
- `api`: Changes inside apps/api.
- `shared`: Changes inside packages/shared.
- `repo`: Root level configuration (Turbo, ESLint, Git).

#### Examples:

- ✅ feat(web): add user login form
- ✅ fix(api): handle socket disconnection gracefully
- ✅ refactor(shared): simplify GameState interface
- ✅ chore(repo): update turbo version

### Pull Requests

The Pull Request title should follow the same **Conventional Commits** format as above.

#### Description Template

When opening a PR, please ensure the description includes:

- What? (Summary of changes)
- Why? (Context or motivation)
- How to test? (Steps to verify the functionality)

#### Example

Please check out our [PR Example](./PR_EXAMPLE.md) that you can follow

## 💻 Development Environment (VS Code)

This repository includes a `.vscode` folder with recommended settings.

- **Extensions**: It is highly recommended to install the ESLint and Prettier extensions.
- **Auto-Fix**: The project is configured to automatically format code and fix linting errors on save (Ctrl+S / Cmd+S).
