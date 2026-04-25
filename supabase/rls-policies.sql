-- Enable RLS on products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable read access for all users" ON products;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON products;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON products;
DROP POLICY IF EXISTS "Enable delete for authenticated users" ON products;

-- Allow public read access to products
CREATE POLICY "Enable read access for all users" 
ON products FOR SELECT 
USING (true);

-- Allow authenticated users to insert products
CREATE POLICY "Enable insert for authenticated users" 
ON products FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update products
CREATE POLICY "Enable update for authenticated users" 
ON products FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete products
CREATE POLICY "Enable delete for authenticated users" 
ON products FOR DELETE 
USING (auth.role() = 'authenticated');
