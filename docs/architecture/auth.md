# Authentication & Security Architecture

This document describes the identity, access control, and privacy designs for the Chomzy application using Supabase Auth and PostgreSQL Row Level Security (RLS).

## Authentication Strategy

### Supabase Auth
We will utilize **Supabase Auth** as the primary identity provider:
- **Sign-in Options**: Email/Password and passwordless Magic Links for simple, secure sign-in.
- **Tokens**: JSON Web Tokens (JWT) issued by Supabase will be sent with frontend requests to authenticate users against PostgreSQL databases and storage APIs.

---

## Private-by-Default Data

Since Chomzy manages personal novels, PDFs, and diary entries, the application implements a **Zero Trust / Private-by-Default** security paradigm:
1. All database tables and storage buckets are locked down by default.
2. Direct access to raw database tables is disabled for anonymous public connections.
3. Every resource created is bound to a specific user account.

---

## user_id Ownership Model

Every user-owned table (e.g. `library_items`, `source_files`, `chapters`, `diary_entries`, `document_chunks`) MUST contain a `user_id` column referencing `auth.users.id`.
- The `user_id` field is populated automatically during insertions (via default bindings or server-side middleware).
- Users can never query, update, or delete records that do not match their own credentials.

---

## Row Level Security (RLS) Concepts

Row Level Security (RLS) will be enabled on all tables in PostgreSQL. The default policy restricts access to rows based on `auth.uid()`, a helper function provided by Supabase that retrieves the authenticated user's ID from the JWT request header.

### Schema Template for RLS Policies

```sql
-- Enable RLS
ALTER TABLE library_items ENABLE ROW LEVEL SECURITY;

-- Select Policy
CREATE POLICY "Users can view their own library items" 
ON library_items 
FOR SELECT 
USING (auth.uid() = user_id);

-- Insert Policy
CREATE POLICY "Users can create their own library items" 
ON library_items 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Update Policy
CREATE POLICY "Users can update their own library items" 
ON library_items 
FOR UPDATE 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

-- Delete Policy
CREATE POLICY "Users can delete their own library items" 
ON library_items 
FOR DELETE 
USING (auth.uid() = user_id);
```

Similar policies will be enforced on `chapters`, `diary_entries`, `source_files`, and `document_chunks`.

---

## Future Multi-User Support

Although Chomzy starts as a private diary/novel archive for a single user, the data model supports scaling to multiple independent users securely:
- **Tenant Isolation**: Because RLS policies are enforced directly inside the database kernel (PostgreSQL), data leakage between users is mathematically prevented at the storage layer, even if there are bugs in the Next.js frontend application code.
- **Sharing Capabilities (Future)**: Sharing permissions can be introduced by creating a `library_shares` join table, which links a `library_item` to secondary user IDs. RLS policies would then be expanded to check:
  ```sql
  USING (
    auth.uid() = user_id 
    OR EXISTS (
      SELECT 1 FROM library_shares 
      WHERE library_shares.library_item_id = id 
      AND library_shares.shared_user_id = auth.uid()
    )
  )
  ```
- **Shared Groups / Circles**: For diaries or family records, user circles can be mapped, ensuring multi-user collaboration while maintaining absolute confidentiality against uninvited users.
