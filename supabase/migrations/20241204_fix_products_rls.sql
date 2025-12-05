-- Enable insert/update/delete for authenticated users with admin role
-- For simplicity in this context, we'll allow all authenticated users to insert/update/delete
-- But ideally, you should check for the admin role:
-- (auth.jwt() ->> 'app_metadata')::jsonb ->> 'role' = 'admin'

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'products' 
        AND policyname = 'Admins can insert products'
    ) THEN
        CREATE POLICY "Admins can insert products"
        ON products FOR INSERT
        TO authenticated
        WITH CHECK ( 
            (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' 
        );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'products' 
        AND policyname = 'Admins can update products'
    ) THEN
        CREATE POLICY "Admins can update products"
        ON products FOR UPDATE
        TO authenticated
        USING ( 
            (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' 
        )
        WITH CHECK ( 
            (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' 
        );
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'products' 
        AND policyname = 'Admins can delete products'
    ) THEN
        CREATE POLICY "Admins can delete products"
        ON products FOR DELETE
        TO authenticated
        USING ( 
            (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin' 
        );
    END IF;
END $$;
