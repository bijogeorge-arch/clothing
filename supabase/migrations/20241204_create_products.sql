-- Create products table
create table if not exists products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  price integer not null,
  description text,
  category text not null,
  images text[] not null,
  inventory integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table products enable row level security;

-- Create policy for public read access
create policy "Products are viewable by everyone"
  on products for select
  using ( true );

-- Seed data
insert into products (name, price, description, category, images, inventory)
values
  (
    'Cyber-Goth Cargo',
    8500,
    'Heavyweight cotton cargo pants with neon accents and multiple utility pockets. Perfect for the urban explorer.',
    'Pants',
    ARRAY['https://images.unsplash.com/photo-1552160753-117159821e01?auto=format&fit=crop&w=800&q=80'],
    50
  ),
  (
    'Neon Oversized Tee',
    3200,
    'Oversized fit t-shirt featuring high-density neon print. 100% organic cotton.',
    'T-Shirts',
    ARRAY['https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=80'],
    100
  ),
  (
    'Tech-Wear Windbreaker',
    12000,
    'Water-resistant windbreaker with reflective details. Designed for night city vibes.',
    'Jackets',
    ARRAY['https://images.unsplash.com/photo-1551488852-7a304bece3de?auto=format&fit=crop&w=800&q=80'],
    30
  ),
  (
    'Holographic Hoodie',
    6500,
    'Premium fleece hoodie with a holographic chest patch. Comfortable and futuristic.',
    'Hoodies',
    ARRAY['https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80'],
    45
  ),
  (
    'Acid Wash Denim Jacket',
    9500,
    'Vintage inspired acid wash denim jacket with modern cut. A timeless classic reinvented.',
    'Jackets',
    ARRAY['https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=800&q=80'],
    25
  ),
  (
    'Future-Step Sneakers',
    15000,
    'Chunky sole sneakers with breathable mesh upper. Walk on clouds.',
    'Footwear',
    ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'],
    20
  );
