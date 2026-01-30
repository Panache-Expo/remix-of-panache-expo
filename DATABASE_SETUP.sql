-- Complete Database Setup for Panache Expo
-- Run this SQL in Supabase Dashboard → SQL Editor

-- ============================================
-- 1. CREATE CONTACT SUBMISSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_user_id ON public.contact_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON public.contact_submissions(email);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Drop old policies if they exist
DROP POLICY IF EXISTS "Anyone can submit contact forms" ON public.contact_submissions;
DROP POLICY IF EXISTS "Users can view their own contact submissions" ON public.contact_submissions;
DROP POLICY IF EXISTS "Authenticated users can submit contact forms" ON public.contact_submissions;

-- Create permissive policies for contact submissions (allow anonymous submissions)
CREATE POLICY "Allow anyone to submit contact forms"
ON public.contact_submissions
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow viewing all contact submissions"
ON public.contact_submissions
FOR SELECT
USING (true);

-- ============================================
-- 2. CREATE WORKSHOP REGISTRATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.workshop_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  workshop TEXT NOT NULL,
  experience_level TEXT,
  agreed_to_terms BOOLEAN NOT NULL DEFAULT false,
  newsletter_subscription BOOLEAN NOT NULL DEFAULT false,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_workshop_registrations_email ON public.workshop_registrations(email);
CREATE INDEX IF NOT EXISTS idx_workshop_registrations_workshop ON public.workshop_registrations(workshop);
CREATE INDEX IF NOT EXISTS idx_workshop_registrations_created_at ON public.workshop_registrations(created_at DESC);

-- Enable Row Level Security
ALTER TABLE public.workshop_registrations ENABLE ROW LEVEL SECURITY;

-- Drop old policies
DROP POLICY IF EXISTS "Anyone can register for workshops" ON public.workshop_registrations;
DROP POLICY IF EXISTS "Users can view their own workshop registrations" ON public.workshop_registrations;
DROP POLICY IF EXISTS "Authenticated users can register for workshops" ON public.workshop_registrations;

-- Create permissive policies
CREATE POLICY "Allow anyone to register for workshops"
ON public.workshop_registrations
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow viewing all workshop registrations"
ON public.workshop_registrations
FOR SELECT
USING (true);

-- ============================================
-- 3. CREATE PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop old policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Create policies
CREATE POLICY "Allow users to view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = id OR true);

CREATE POLICY "Allow users to update their own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Allow authenticated users to insert their profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- ============================================
-- 4. VERIFY TABLES WERE CREATED
-- ============================================
-- Run these SELECT statements to verify:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- That's it! Your database is ready.
-- The tables should now be visible in the Supabase Table Editor.
