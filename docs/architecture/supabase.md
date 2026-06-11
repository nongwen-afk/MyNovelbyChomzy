# Supabase Configuration & Environments

This document details the configuration properties, regions, and environment variable requirements for the Supabase integration in the Chomzy application.

## Project Details
- **Project Name**: `chomzy-dev`
- **Primary Hosting Region**: `Southeast Asia / Singapore` (ap-southeast-1)
- **Deployment Status**: Infrastructure planned; SDK installation and live bindings are scheduled for Step 4.

## Required Environment Variables

Chomzy connects to Supabase using client-side and server-side configurations. Create a local `.env.local` file containing these keys.

> [!WARNING]
> Never check actual API keys or credential secrets into Git version control. Ensure `.env.local` is added to `.gitignore`.

### Frontend Environment Variables
These keys are exposed to the browser and are used by the Supabase client SDK:

```bash
# The API endpoint url of the Supabase project
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co

# Public anonymous key for client side reads and updates (restricted by RLS)
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Backend (Server-Only) Environment Variables
This key is kept private to the server runtime (API routes, server components) and bypasses Row Level Security:

```bash
# Service Role Key (NEVER expose to the browser/client-side code)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Security Best Practices for Keys
1. **Anon Key**: Safe to expose to the client-side code because Row Level Security (RLS) is enabled. It allows basic queries matching the current user's JWT.
2. **Service Role Key**: Used only on server-side functions (e.g. background import jobs, OCR operations) where administrative capabilities are required. It bypasses RLS, so it must **never** be exposed in client code or written to variables prefixed with `NEXT_PUBLIC_`.
