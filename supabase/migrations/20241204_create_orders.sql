-- Create orders table
create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null, -- Changing to auth.users to be safe, or should I stick to profiles? User said profiles.
  -- Let's stick to profiles if it exists, but if not, it might fail. 
  -- Actually, usually profiles.id is a foreign key to auth.users.id. 
  -- If I reference auth.users directly it is safer for now unless profiles has specific data we need.
  -- The user said "fk to profiles". I will try to reference profiles. 
  -- If it fails, I can't easily fix it without knowing the profiles schema.
  -- I will use a safe approach: Check if profiles exists, if not, maybe just use auth.users?
  -- No, SQL migrations are static. I will use `profiles` as requested.
  amount integer not null,
  status text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add foreign key to profiles if it exists, otherwise this might error if I run it. 
-- But since I am just writing the file for the user to run/apply, I will follow instructions.
-- Wait, the user said "fk to profiles".
-- I'll write it as:
-- user_id uuid references profiles(id) not null

-- Actually, I'll check if I can see any other evidence of profiles.
-- If not, I'll write the SQL but add a comment.
-- Re-reading: "fk to profiles". I will do exactly that.

create table if not exists orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) not null,
  amount integer not null,
  status text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table orders enable row level security;

-- Policies
create policy "Users can view their own orders"
  on orders for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own orders"
  on orders for insert
  with check ( auth.uid() = user_id );
