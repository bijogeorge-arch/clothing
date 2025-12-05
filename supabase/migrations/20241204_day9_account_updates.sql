-- Create order_items table
create table if not exists order_items (
  id uuid default gen_random_uuid() primary key,
  order_id uuid references orders(id) on delete cascade not null,
  product_id uuid references products(id) not null,
  quantity integer not null default 1,
  price_at_purchase integer not null
);

-- Enable RLS on order_items
alter table order_items enable row level security;

-- Policy: Users can view their own order items
create policy "Users can view their own order items"
  on order_items for select
  using (
    exists (
      select 1 from orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- Update profiles table with new fields
alter table public.profiles 
add column if not exists full_name text,
add column if not exists shipping_address text,
add column if not exists city text,
add column if not exists phone text;
