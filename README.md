# DOOOD — Day One Or One Day

DOOOD is an AI-powered book completion platform that helps aspiring authors start, structure, and finish their books. 

## Features
- **AI Book Blueprint:** Generate a custom chapter outline and writing plan based on your idea.
- **Draft Import:** Paste or upload an existing `.txt`/`.md` manuscript and split it into chapter, page, and line edit modes.
- **Gamified Writing:** XP, streaks, and badges to keep you motivated.
- **Progress Dashboard:** Track your word count and upcoming milestones.
- **Community Campfire:** Connect with other authors and share your progress.

## Tech Stack
- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **AI:** Google Gemini API (via `@google/generative-ai`)
- **Deployment:** Vercel

## Local Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment variables:**
   Copy `.env.example` to `.env.local` if you want live Gemini generation:
   ```
   cp .env.example .env.local
   GEMINI_API_KEY=your_key_here
   ```
   The app works without `GEMINI_API_KEY` by returning a mock blueprint from the server route.

3. **Run locally:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000`.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Lint:**
   ```bash
   npm run lint
   ```

## GitHub Setup

```bash
git init
git add .
git commit -m "Initial DOOOD MVP"
git branch -M main
git remote add origin [MY_GITHUB_REPO_URL]
git push -u origin main
```

## Deployment on Vercel

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Vercel auto-detects Next.js and uses the default build command: `npm run build`.
4. Add `GEMINI_API_KEY` in Project Settings > Environment Variables only if live Gemini generation is enabled.
5. Deploy.
6. Add a custom domain later from Project Settings > Domains.

## Project Structure
- `/src/app`: Next.js App Router pages and API routes.
- `/src/components`: UI components, layouts, and sections.
- `/src/lib`: Utility functions and shared logic.
- `/docs`: Product roadmap and database schema documentation.

## Current Routes
- `/`: Landing page
- `/builder`: Multi-step book blueprint builder
- `/import`: Upload or paste an existing manuscript and split it into editable sections
- `/dashboard`: Saved-project dashboard
- `/projects`: Saved-project workspace
- `/community`: Campfire progress feed
- `/about`: Mission page
- `/waitlist`: Early access form
- `/signin`: Sign in page
- `/signup`: Sign up page
- `/api/generate-blueprint`: Server-only Gemini/mock blueprint endpoint
