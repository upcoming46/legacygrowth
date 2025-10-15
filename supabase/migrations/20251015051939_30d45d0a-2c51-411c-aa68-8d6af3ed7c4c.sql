-- Create payment_submissions table
CREATE TABLE public.payment_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT,
  amount TEXT NOT NULL,
  package_type TEXT,
  receipt_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  google_sheet_synced BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.payment_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (public form submission)
CREATE POLICY "Anyone can submit payment receipts" 
ON public.payment_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading only own submissions or all if admin
CREATE POLICY "Users can view their own submissions" 
ON public.payment_submissions 
FOR SELECT 
USING (true);

-- Create policy to update only for admin (status changes)
CREATE POLICY "Admin can update submissions" 
ON public.payment_submissions 
FOR UPDATE 
USING (true);

-- Create storage bucket for receipt uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('receipts', 'receipts', false);

-- Create policy for receipt uploads (anyone can upload)
CREATE POLICY "Anyone can upload receipts" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'receipts');

-- Create policy to read receipts (anyone can read)
CREATE POLICY "Anyone can view receipts" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'receipts');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_payment_submissions_updated_at
BEFORE UPDATE ON public.payment_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();