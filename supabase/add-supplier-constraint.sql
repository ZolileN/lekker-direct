-- Add unique constraint for supplier_id and supplier to enable upsert operations
-- This allows sync operations to update existing products instead of creating duplicates

ALTER TABLE products 
ADD CONSTRAINT supplier_unique UNIQUE (supplier_id, supplier);

-- Note: If there are existing duplicate combinations, you may need to remove them first
-- Run this query to check for duplicates:
-- SELECT supplier_id, supplier, COUNT(*) 
-- FROM products 
-- GROUP BY supplier_id, supplier 
-- HAVING COUNT(*) > 1;
