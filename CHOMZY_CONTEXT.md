# Chomzy Context

## Project Goal
Chomzy is a private AI librarian agent for a personal novel, PDF, and diary web app.

## GitHub Repository
- **URL**: [https://github.com/nongwen-afk/MyNovelbyChomzy.git](https://github.com/nongwen-afk/MyNovelbyChomzy.git)

## Branch Rules
- `main` = stable / production branch.
- `dev` = development / testing branch (current active branch).
- **Rule**: All new work must happen on `dev` first.
- **Rule**: Only merge `dev` into `main` after thorough testing.

## Current Stack
- **Framework**: Next.js (App Router, src/ directory, TypeScript, ESLint)
- **Database/Storage**: Supabase (Project: `chomzy-dev` in Singapore region)
- **Styling**: Vanilla CSS (Next.js defaults)

## Completed Steps
- **Step 1**: Scaffolded a clean Next.js project in the root folder with TypeScript, App Router, src/ directory, and ESLint.
- **Step 1**: Created required folders (`src/agents/chomzy`, `src/agents/chomzy/tools`, `src/agents/chomzy/workflows`, `src/agents/chomzy/prompts`, `src/lib`, `src/server`, `scripts`).
- **Step 1**: Created `CHOMZY_CONTEXT.md` and `README.md`.
- **Step 2**: Created Chomzy agent foundation (types, system prompt, import novel workflow placeholders, tools description readme, index exports, and lint verification).
- **Git Setup**: Initialized local git, committed existing files, connected origin to GitHub, and set up tracked `main` and `dev` branches.
- **Step 3**: Designed Supabase architecture documents (database tables, storage buckets, RLS/auth setup, configuration).

## Pending Steps
- **Future Steps**:
  - Step 4 — Install Supabase SDK and Drizzle.
  - Build UI layout and foundations.
  - Implement private agent workflows, tools, and prompts.
  - Integrate PDF extraction and OCR (when requested).
  - Add secure database / diary storage solutions (Supabase / database code when requested).
  - Configure AI model integrations (OpenAI when requested).

## Important Rules
- **Always read `CHOMZY_CONTEXT.md` before future work.**
- **Always update `CHOMZY_CONTEXT.md` after future work.**
- Do not build future steps early.
- Do not add Supabase yet.
- Do not add OpenAI yet.
- Do not add PDF extraction yet.
- Do not add OCR yet.
- Do not add database code yet.

## Last Changes Made
- Created directory `docs/architecture/` and design documents: `database.md`, `storage.md`, `auth.md`, and `supabase.md`.
- Updated `CHOMZY_CONTEXT.md` to reflect architecture planning.

## Next Recommended Step
- **Step 4** — Install Supabase SDK and Drizzle, configure Drizzle schemas, setup database client connection, and write local environment configuration scripts.
