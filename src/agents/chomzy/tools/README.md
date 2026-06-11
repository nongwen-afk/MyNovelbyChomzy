# Chomzy Agent Tools

This directory is reserved for tools that the Chomzy agent uses to interact with external services, databases, and filesystem interfaces. Currently, the tools are in the planning stage (placeholders) to adhere to the project's phased implementation plan.

## Planned Tools & Responsibilities

1. **Text Extraction & Parsing (`textParser.ts`)**
   - Detects chapter bounds, headers, and metadata in raw text blocks.
   - Cleans up common copy-paste formatting anomalies and spacing issues.

2. **PDF Extraction (`pdfExtractor.ts`)**
   - Extract raw text from standard PDF files.
   - *Note: To be implemented in a future step; do not add PDF extraction libraries yet.*

3. **OCR Tool (`ocrTool.ts`)**
   - Scans and converts image-based PDFs or screenshots of novel pages or diary entries into clean text.
   - *Note: To be implemented in a future step; do not add OCR yet.*

4. **Database Client Tool (`dbClient.ts`)**
   - Connects to the primary datastore (Supabase/PostgreSQL) to retrieve, update, and persist novels, chapters, and diary entries.
   - *Note: To be implemented in a future step; do not add database code or Supabase SDK yet.*

5. **Diary Categorizer (`diaryCategorizer.ts`)**
   - Performs automated tagging, sentiment analysis, or category mapping for diary inputs.

6. **Knowledge Search & Retrieval (`librarySearch.ts`)**
   - Performs text search and vector similarity retrieval over cataloged novels and diary entries for private librarian responses.
