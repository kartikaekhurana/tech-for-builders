CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 120),
  email TEXT NOT NULL CHECK (char_length(email) BETWEEN 5 AND 254),
  phone TEXT NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 30),
  company TEXT NOT NULL CHECK (char_length(company) BETWEEN 2 AND 160),
  city TEXT NOT NULL CHECK (char_length(city) BETWEEN 2 AND 120),
  people_count INTEGER NOT NULL CHECK (people_count BETWEEN 1 AND 10000),
  looking_for TEXT NOT NULL CHECK (looking_for IN ('One laptop', 'Multiple laptops', 'Complete workspace', 'Monitors & peripherals', 'IT setup', 'Other')),
  budget TEXT NOT NULL CHECK (budget IN ('Under ₹25,000', '₹25,000–₹50,000', '₹50,000–₹1,00,000', '₹1,00,000–₹2,50,000', '₹2,50,000+', 'Not sure yet')),
  requirements TEXT NOT NULL CHECK (char_length(requirements) BETWEEN 10 AND 2000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.leads TO anon, authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a workspace request"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);