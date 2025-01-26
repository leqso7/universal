-- Drop existing table
DROP TABLE IF EXISTS public.access_requests;

-- Create access_requests table
CREATE TABLE IF NOT EXISTS public.access_requests (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    access_code TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending'
);

-- Enable RLS
ALTER TABLE public.access_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Enable all access" ON public.access_requests
    FOR ALL
    USING (true)
    WITH CHECK (true);

-- Create auth schema if it doesn't exist
CREATE SCHEMA IF NOT EXISTS auth;

-- Create users view
CREATE OR REPLACE VIEW auth.users AS
SELECT 
    id,
    email,
    raw_user_meta_data
FROM auth.users;
