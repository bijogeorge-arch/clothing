-- Add role column to profiles
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role text DEFAULT 'user';

-- RLS for Orders: Admin can view all orders
CREATE POLICY "Admins can view all orders"
ON orders FOR SELECT
USING (
  auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  )
);

-- RLS for Orders: Admin can update orders
CREATE POLICY "Admins can update orders"
ON orders FOR UPDATE
USING (
  auth.uid() IN (
    SELECT id FROM public.profiles WHERE role = 'admin'
  )
);

-- Seed command to promote a user (Run this manually in Supabase SQL Editor)
-- UPDATE public.profiles SET role = 'admin' WHERE id = 'YOUR_USER_ID';
-- OR
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'your_email@example.com';
