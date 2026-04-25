-- Update product categories directly in Supabase SQL Editor

-- Electronics
UPDATE products SET category = 'Electronics' WHERE title = 'Smart Fit Active Smartwatch';
UPDATE products SET category = 'Electronics' WHERE title = '65 Functions Intelligent Kids Laptop Learning Machine Toy';

-- Fashion
UPDATE products SET category = 'Fashion' WHERE title = 'Wearable USB Heated Shawl for Winter';
UPDATE products SET category = 'Fashion' WHERE title = 'Winter Solid Zipper USB Heated Electric Hoodie Shawl';

-- Home (all other products)
UPDATE products SET category = 'Home' WHERE title = 'Folding 2-Tier Wall Mounted Desk';
UPDATE products SET category = 'Home' WHERE title = 'Childrens Playhouse Slide Playground Set';
UPDATE products SET category = 'Home' WHERE title = 'Alloy Construction Vehicles Friction Toy Set';
UPDATE products SET category = 'Home' WHERE title = 'Stainless Steel Waterfall Nano Kitchen Sink';
UPDATE products SET category = 'Home' WHERE title = 'Iron Grip Full Metal Survival Folding Knife';
UPDATE products SET category = 'Home' WHERE title = 'Matte Black Single Handle Kitchen Sink Faucet';
UPDATE products SET category = 'Home' WHERE title = 'Home Office Computer Writing Work Desk 120cm';
UPDATE products SET category = 'Home' WHERE title = '1100W Foldable Handheld Clothes Steamer';
UPDATE products SET category = 'Home' WHERE title = 'Stylish PP Charger Plate - Elevate Your Table Settings';
UPDATE products SET category = 'Home' WHERE title = 'Colorful Plastic Four Wheel Drive Double-Sided Stunt Car';
UPDATE products SET category = 'Home' WHERE title = 'Engraved Wilderness Tactical Folding Knife';
UPDATE products SET category = 'Home' WHERE title = 'Childrens Modular City Parking Building Playset';
UPDATE products SET category = 'Home' WHERE title = 'Childrens Handmade Plastic Crystal Gem Toy Set';
UPDATE products SET category = 'Home' WHERE title = 'Stainless Steel Rainfall Waterfall Shower Panel';
UPDATE products SET category = 'Home' WHERE title = 'Set of 6 Stainless Steel Fruit Forks with Wooden Handles';
UPDATE products SET category = 'Home' WHERE title = 'Hand Tool Combination Set - Complete Toolkit for Home & Auto';
UPDATE products SET category = 'Home' WHERE title = 'Reinforced Leather Safety Gloves';
UPDATE products SET category = 'Home' WHERE title = 'Single Bowl Stainless Steel Kitchen Sink';
UPDATE products SET category = 'Home' WHERE title = 'Golden Stainless Steel LED Shower Panel System';
UPDATE products SET category = 'Home' WHERE title = 'Chrome Plated Brass Bib Tap with Ceramic Valve Core';
UPDATE products SET category = 'Home' WHERE title = 'Silver Stainless Steel Shower Column Panel';
UPDATE products SET category = 'Home' WHERE title = 'Test Product';

-- Verify the updates
SELECT category, COUNT(*) as count FROM products GROUP BY category;
