# DOOOD Database Schema

## Users
- `id`: uuid (PK)
- `email`: string
- `full_name`: string
- `avatar_url`: string
- `xp`: integer
- `streak`: integer
- `created_at`: timestamp

## Projects
- `id`: uuid (PK)
- `user_id`: uuid (FK -> users.id)
- `title`: string
- `book_type`: string
- `genre`: string
- `audience`: string
- `tone`: string
- `idea`: text
- `blueprint`: jsonb (The AI generated output)
- `progress`: float (0-100)
- `word_count`: integer
- `status`: string (active, finished, archived)
- `created_at`: timestamp

## Chapters
- `id`: uuid (PK)
- `project_id`: uuid (FK -> projects.id)
- `title`: string
- `order`: integer
- `content`: text
- `status`: string (todo, drafting, polishing, completed)
- `word_count`: integer

## Milestones
- `id`: uuid (PK)
- `project_id`: uuid (FK -> projects.id)
- `title`: string
- `description`: text
- `is_completed`: boolean
- `target_date`: timestamp

## Writing Sessions
- `id`: uuid (PK)
- `user_id`: uuid (FK -> users.id)
- `project_id`: uuid (FK -> projects.id)
- `word_count`: integer
- `duration_minutes`: integer
- `created_at`: timestamp

## Badges
- `id`: uuid (PK)
- `name`: string
- `description`: string
- `icon_url`: string

## Waitlist
- `id`: uuid (PK)
- `email`: string
- `name`: string
- `book_type`: string
- `reason`: text
- `created_at`: timestamp

## Community Posts
- `id`: uuid (PK)
- `user_id`: uuid (FK -> users.id)
- `project_id`: uuid (FK -> projects.id, nullable)
- `channel`: string (milestone, word_count, help_needed, success_story)
- `content`: text
- `metadata`: jsonb
- `created_at`: timestamp

## Agent Profiles
- `id`: uuid (PK)
- `user_id`: uuid (FK -> users.id)
- `agency_name`: string
- `genres`: text[]
- `submission_preferences`: text
- `is_verified`: boolean
- `created_at`: timestamp

## Publisher Profiles
- `id`: uuid (PK)
- `user_id`: uuid (FK -> users.id)
- `publisher_name`: string
- `imprints`: text[]
- `genres`: text[]
- `submission_preferences`: text
- `is_verified`: boolean
- `created_at`: timestamp

## Messages
- `id`: uuid (PK)
- `sender_id`: uuid (FK -> users.id)
- `recipient_id`: uuid (FK -> users.id)
- `project_id`: uuid (FK -> projects.id, nullable)
- `body`: text
- `read_at`: timestamp
- `created_at`: timestamp
