-- Add sizes column to products if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'sizes') THEN
        ALTER TABLE products ADD COLUMN sizes text[];
    END IF;
END $$;

-- Create storage bucket for products if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects if not already enabled (usually it is)
-- ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated uploads
-- Drop existing policy if it exists to avoid conflicts or just create if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND schemaname = 'storage' 
        AND policyname = 'Authenticated users can upload product images'
    ) THEN
        CREATE POLICY "Authenticated users can upload product images"
        ON storage.objects FOR INSERT
        TO authenticated
        WITH CHECK ( bucket_id = 'products' );
    END IF;
END $$;

-- Policy for public read
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'objects' 
        AND schemaname = 'storage' 
        AND policyname = 'Public can view product images'
    ) THEN
        CREATE POLICY "Public can view product images"
        ON storage.objects FOR SELECT
        TO public
        USING ( bucket_id = 'products' );
    END IF;
END $$;
