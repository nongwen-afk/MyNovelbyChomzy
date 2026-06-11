# Database Architecture Schema

This document outlines the planned database schema for the Chomzy system using Supabase (PostgreSQL).

## Entity Designs

### 1. `users`
- **Purpose**: Extends Supabase Auth metadata and stores application-specific user profile configurations.
- **Fields**:
  - `id`: `uuid` (Primary Key, references `auth.users.id` on delete cascade)
  - `email`: `varchar(255)` (Unique, not null)
  - `display_name`: `varchar(255)` (Nullable)
  - `created_at`: `timestamp with time zone` (Not null, default `now()`)
  - `updated_at`: `timestamp with time zone` (Not null, default `now()`)
- **Relationships**:
  - One-to-One with Supabase `auth.users`.
- **Indexes**:
  - `email` (Unique index)

---

### 2. `library_items`
- **Purpose**: Represents cataloged documents in the user's private library (e.g., novels, books, notebooks).
- **Fields**:
  - `id`: `uuid` (Primary Key, default `gen_random_uuid()`)
  - `user_id`: `uuid` (Not null, foreign key references `users.id` on delete cascade)
  - `title`: `varchar(255)` (Not null)
  - `author`: `varchar(255)` (Nullable)
  - `description`: `text` (Nullable)
  - `cover_url`: `text` (Nullable, points to Supabase Storage path)
  - `language`: `varchar(50)` (Not null, default `'th'`)
  - `created_at`: `timestamp with time zone` (Not null, default `now()`)
  - `updated_at`: `timestamp with time zone` (Not null, default `now()`)
- **Relationships**:
  - Belongs to `users` (`user_id`).
  - Has many `source_files`.
  - Has many `chapters`.
- **Indexes**:
  - `user_id` (Foreign key index for RLS verification)
  - `title` (Search index)

---

### 3. `source_files`
- **Purpose**: Keeps track of original uploaded documents associated with library items.
- **Fields**:
  - `id`: `uuid` (Primary Key, default `gen_random_uuid()`)
  - `library_item_id`: `uuid` (Not null, foreign key references `library_items.id` on delete cascade)
  - `user_id`: `uuid` (Not null, foreign key references `users.id` on delete cascade)
  - `file_name`: `varchar(255)` (Not null)
  - `file_path`: `text` (Not null, points to private Supabase Storage object)
  - `file_size`: `integer` (Not null, size in bytes)
  - `mime_type`: `varchar(100)` (Not null, e.g. `'application/pdf'`, `'text/plain'`)
  - `status`: `varchar(50)` (Not null, e.g., `'uploaded'`, `'processed'`, `'failed'`)
  - `created_at`: `timestamp with time zone` (Not null, default `now()`)
  - `updated_at`: `timestamp with time zone` (Not null, default `now()`)
- **Relationships**:
  - Belongs to `library_items` (`library_item_id`).
  - Belongs to `users` (`user_id`).
- **Indexes**:
  - `library_item_id` (Foreign key index)
  - `user_id` (RLS index)

---

### 4. `chapters`
- **Purpose**: Contains the parsed story text content of individual chapters within a novel/book.
- **Fields**:
  - `id`: `uuid` (Primary Key, default `gen_random_uuid()`)
  - `library_item_id`: `uuid` (Not null, foreign key references `library_items.id` on delete cascade)
  - `user_id`: `uuid` (Not null, foreign key references `users.id` on delete cascade)
  - `chapter_number`: `integer` (Not null)
  - `title`: `varchar(255)` (Not null)
  - `content`: `text` (Not null)
  - `created_at`: `timestamp with time zone` (Not null, default `now()`)
  - `updated_at`: `timestamp with time zone` (Not null, default `now()`)
- **Relationships**:
  - Belongs to `library_items` (`library_item_id`).
  - Belongs to `users` (`user_id`).
- **Indexes**:
  - `library_item_id`, `chapter_number` (Composite unique index)
  - `user_id` (RLS index)

---

### 5. `diary_entries`
- **Purpose**: Stores personal diary logs, notes, and diary entries.
- **Fields**:
  - `id`: `uuid` (Primary Key, default `gen_random_uuid()`)
  - `user_id`: `uuid` (Not null, foreign key references `users.id` on delete cascade)
  - `date`: `timestamp with time zone` (Not null, default `now()`)
  - `title`: `varchar(255)` (Nullable)
  - `content`: `text` (Not null)
  - `tags`: `text[]` (Not null, default `'{}'`)
  - `created_at`: `timestamp with time zone` (Not null, default `now()`)
  - `updated_at`: `timestamp with time zone` (Not null, default `now()`)
- **Relationships**:
  - Belongs to `users` (`user_id`).
- **Indexes**:
  - `user_id`, `date` (Ordering and filtering index)
  - `tags` (Gin index for array search queries)

---

### 6. `document_chunks`
- **Purpose**: Stores granular segments of text (from novels or diary entries) for vector search indexing.
- **Fields**:
  - `id`: `uuid` (Primary Key, default `gen_random_uuid()`)
  - `user_id`: `uuid` (Not null, foreign key references `users.id` on delete cascade)
  - `parent_type`: `varchar(50)` (Not null, e.g., `'chapter'`, `'diary_entry'`)
  - `parent_id`: `uuid` (Not null, ID referencing either `chapters.id` or `diary_entries.id`)
  - `content`: `text` (Not null, text snippet)
  - `embedding`: `vector(1536)` (Nullable, vector embedding column for OpenAI/Gemini text-embedding-3-small)
  - `metadata`: `jsonb` (Not null, default `'{}'`)
  - `created_at`: `timestamp with time zone` (Not null, default `now()`)
- **Relationships**:
  - Belongs to `users` (`user_id`).
- **Indexes**:
  - `user_id` (RLS index)
  - `parent_type`, `parent_id` (Foreign entity resolution index)

---

## Future pgvector Integration Notes

To enable AI semantic search over documents and diaries, the database needs vector search capabilities:

1. **pgvector extension**: Run `CREATE EXTENSION IF NOT EXISTS vector;` in the database.
2. **Dimension sizing**: The standard size is `1536` dimensions (for OpenAI `text-embedding-3-small` or standard models).
3. **Indexing**: 
   - HNSW index should be added once scale grows:
     ```sql
     CREATE INDEX document_chunks_embedding_hnsw_idx 
     ON document_chunks 
     USING hnsw (embedding vector_cosine_ops);
     ```
   - HNSW is preferred over IVFFlat for dynamic datasets because it doesn't require index rebuilding as rows are added.
