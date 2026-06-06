# DOOOD Session Handoff

Last saved: June 6, 2026

## Current Status

- App name: DOOOD.
- Meaning: Day One Or One Day.
- Local repo: `/Users/regalia/doood`.
- GitHub: `https://github.com/PabloPratt/doood`.
- Vercel production: `https://doood-xi.vercel.app`.
- Vercel project: `signalinput25-s-projects/doood`.
- Current branch: `main`.
- Git remote: `origin https://github.com/PabloPratt/doood.git`.
- Current data storage: browser `localStorage`.
- Real database/auth: not implemented yet.
- Paid APIs: not required.
- Optional AI env var: `GEMINI_API_KEY`.

## Product Rules Learned

- DOOOD should be fully free. Do not present a free tier, pricing page, subscriptions, or paid upgrade prompts.
- DOOOD should be easy to use immediately.
- Primary user flow should include importing an existing draft, not only starting from scratch.
- Do not show fake users, fake community posts, or fake books.
- Starter projects may use actual book concepts provided by the user, but avoid using the user's personal name in UI.

## Current User Flows

- `/signup`: local sign-up, then sends user toward `/import`.
- `/signin`: local sign-in, then opens `/projects`.
- `/import`: paste/upload an existing `.txt` or `.md` manuscript.
- `/builder`: create a project from an idea using the server-side blueprint API.
- `/projects`: lists actual starter book concepts plus local saved projects.
- `/dashboard`: reads real/starter project state.
- `/editor/[id]`: opens a project and edits manuscript text.
- `/community`: working channel tabs with empty state, no fake posts.

## Import Workflow

The import workflow is implemented in:

- `src/app/import/page.tsx`
- `src/lib/import-manuscript.ts`
- `src/lib/storage.ts`

Behavior:

- Supports `.txt`, `.md`, and pasted manuscript text.
- Does not support `.docx` yet.
- Splits imported text into `sections`:
  - `chapter`
  - `page`
  - `line`
- Editor lets users switch between chapter/page/line edit modes.
- Imported projects save to `localStorage` under `doood_projects`.

## Actual Starter Book Concepts

Implemented in `src/lib/starter-projects.ts`:

- `Heart of the Hemisphere`
- `Of Stones and Stars`
- `Yachay Pacha`
- `Chronicles of the Veil: The Fractured Veil`
- `The Shattering of Maps`
- `The SUERTE Companion Book`

## Verification

Last successful checks:

```bash
cd /Users/regalia/doood
npm run lint
npm run build
curl -I https://doood-xi.vercel.app/import
```

`/import` returned `200 OK` on Vercel.

## Deployment

Use:

```bash
cd /Users/regalia/doood
git status --short --branch
npm run lint
npm run build
git push
vercel --prod --yes --scope signalinput25-s-projects
```

GitHub auth:

```bash
gh auth status
gh auth login -h github.com -p https -w --git-protocol https
```

Note: sandboxed `gh auth status` may report a stale invalid token. Normal/escalated terminal access sees the valid keyring token.

## Next Practical Improvements

1. Add `.docx` import support.
2. Add real Supabase auth/database only if the user approves using the existing/free Supabase project.
3. Persist imported sections and edits server-side.
4. Add section rename/reorder/delete controls.
5. Add export back to `.docx` or `.pdf`.
6. Add real Gemini prefill for imported drafts only if `GEMINI_API_KEY` is intentionally configured.
