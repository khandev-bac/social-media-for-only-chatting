-- This is an empty migration.
-- Enable the trigram extension
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create indexes for fuzzy search
CREATE INDEX user_name_trgm_idx ON "User" USING gin (name gin_trgm_ops);
CREATE INDEX user_email_trgm_idx ON "User" USING gin (email gin_trgm_ops);
