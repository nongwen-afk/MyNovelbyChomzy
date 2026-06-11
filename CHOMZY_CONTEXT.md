# Chomzy Context

## Project Goal
Chomzy is a private AI librarian agent for a personal novel, PDF, and diary web app.

## Current Stack
- **Framework**: Next.js (App Router, src/ directory, TypeScript, ESLint)
- **Styling**: Vanilla CSS (Next.js defaults)

## Completed Steps
- **Step 1**: Scaffolded a clean Next.js project in the root folder with TypeScript, App Router, src/ directory, and ESLint.
- **Step 1**: Created required folders (`src/agents/chomzy`, `src/agents/chomzy/tools`, `src/agents/chomzy/workflows`, `src/agents/chomzy/prompts`, `src/lib`, `src/server`, `scripts`).
- **Step 1**: Created `CHOMZY_CONTEXT.md` and `README.md`.
- **Step 2**: Created Chomzy agent foundation (types, system prompt, import novel workflow placeholders, tools description readme, index exports, and lint verification).

## Pending Steps
- **Future Steps**:
  - Step 3 — Supabase planning and environment setup.
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
- Created `src/agents/chomzy/types.ts` containing core interfaces.
- Created `src/agents/chomzy/prompts/system.ts` containing `CHOMZY_SYSTEM_PROMPT`.
- Created `src/agents/chomzy/workflows/importNovelWorkflow.ts` containing typed workflow function placeholders.
- Created `src/agents/chomzy/tools/README.md` containing planned tool specifications.
- Created `src/agents/chomzy/index.ts` exporting agent types, prompts, and workflows.
- Ran lint tests and verified project compiles and passes eslint rules.

## Next Recommended Step
- **Step 3** — Supabase planning and environment setup.
