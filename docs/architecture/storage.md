# Storage Architecture Design

This document details the configuration and directory structure for Supabase Storage buckets in the Chomzy application.

## Storage Buckets

### 1. `novels`
- **Purpose**: Holds raw and processed source documents (PDFs, TXT files) uploaded by users for chapter parsing and librarian analysis.
- **Private/Public**: **Private** (Access tokens or authenticated request links only).
- **Suggested File Path Structure**:
  - `novels/{user_id}/{library_item_id}/{source_file_id}_{file_name}`
  - Example: `novels/a62d-45fb/c019-923c/f34b_my_thai_novel.pdf`
- **Access Rules**:
  - Read: Owner only (verified by `auth.uid() = user_id`).
  - Write: Owner only (uploads restricted to the user's directory).
  - Delete: Owner only.
- **Future Cleanup Strategy**:
  - If a `library_item` or `source_file` record is deleted from the database, a background database webhook or edge function must trigger to delete corresponding files in Storage.
  - Temporary files created during import processing should be expired or purged automatically after 24 hours.

---

### 2. `covers`
- **Purpose**: Stores image files for novel and book covers.
- **Private/Public**: **Public** (Read-only public URLs permitted for easy browser image display; writes are private).
- **Suggested File Path Structure**:
  - `covers/{user_id}/{library_item_id}/cover_{timestamp}.jpg`
- **Access Rules**:
  - Read: Public access (anyone can view covers if they have the link).
  - Write: Owner only (verified by `auth.uid() = user_id`).
  - Delete: Owner only.
- **Future Cleanup Strategy**:
  - When updating a novel's cover, delete the old cover file from the directory before uploading the new one to save space.
  - Cascade deletions: when a `library_item` is deleted, purge the entire directory `covers/{user_id}/{library_item_id}/`.

---

### 3. `diary-attachments`
- **Purpose**: Stores media (images, voice notes, PDFs) attached by users to their private diary entries.
- **Private/Public**: **Private** (Must use temporary signed URLs to view).
- **Suggested File Path Structure**:
  - `diary-attachments/{user_id}/{diary_entry_id}/{file_name}`
- **Access Rules**:
  - Read: Owner only (strict isolation verified by `auth.uid() = user_id`).
  - Write: Owner only.
  - Delete: Owner only.
- **Future Cleanup Strategy**:
  - Hard deletion is default. If a diary entry or an attachment reference is deleted, immediately delete the object from storage.
  - Periodic orphan check: A script or edge function can cross-reference storage contents with db attachment links and garbage-collect files not linked in any database records.
