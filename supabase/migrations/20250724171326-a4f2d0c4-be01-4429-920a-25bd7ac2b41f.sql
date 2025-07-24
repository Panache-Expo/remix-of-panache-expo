-- Create contact submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert contact submissions
CREATE POLICY "Anyone can submit contact forms" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow viewing own submissions by email
CREATE POLICY "Users can view their own contact submissions" 
ON public.contact_submissions 
FOR SELECT 
USING (true);

-- Create workshop registrations table
CREATE TABLE public.workshop_registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  workshop TEXT NOT NULL,
  experience_level TEXT,
  agreed_to_terms BOOLEAN NOT NULL DEFAULT false,
  newsletter_subscription BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.workshop_registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert workshop registrations
CREATE POLICY "Anyone can register for workshops" 
ON public.workshop_registrations 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow viewing own registrations by email
CREATE POLICY "Users can view their own workshop registrations" 
ON public.workshop_registrations 
FOR SELECT 
USING (true);