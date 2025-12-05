-- ⚠️ INSTRUCTIONS:
-- 1. Go to Supabase Dashboard > Authentication > Users.
-- 2. Copy your User UUID.
-- 3. Replace 'YOUR_USER_ID_HERE' below with your UUID.
-- 4. Run this script in the SQL Editor.

DO $$
DECLARE
  -- PASTE YOUR UUID HERE 👇
  v_user_id uuid := 'YOUR_USER_ID_HERE'; 
  
  v_order_id_1 uuid;
  v_order_id_2 uuid;
  v_product_1 uuid;
  v_product_2 uuid;
  v_product_3 uuid;
BEGIN
  -- Get some product IDs (assuming products exist from previous seed)
  SELECT id INTO v_product_1 FROM products LIMIT 1 OFFSET 0;
  SELECT id INTO v_product_2 FROM products LIMIT 1 OFFSET 1;
  SELECT id INTO v_product_3 FROM products LIMIT 1 OFFSET 2;

  -- Create Order 1: Shipped
  INSERT INTO orders (user_id, amount, status)
  VALUES (v_user_id, 11700, 'Shipped')
  RETURNING id INTO v_order_id_1;

  -- Items for Order 1
  INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
  VALUES 
    (v_order_id_1, v_product_1, 1, 8500), 
    (v_order_id_1, v_product_2, 1, 3200); 

  -- Create Order 2: Processing
  INSERT INTO orders (user_id, amount, status)
  VALUES (v_user_id, 12000, 'Processing')
  RETURNING id INTO v_order_id_2;

  -- Items for Order 2
  INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase)
  VALUES 
    (v_order_id_2, v_product_3, 1, 12000); 

END $$;
