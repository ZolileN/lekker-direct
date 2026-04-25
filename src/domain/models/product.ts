export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  images?: string[];
  inStock: boolean;
  stockCount: number;
  sku: string;
  features?: string[];
}

export interface IProductRepository {
  getAll(limit?: number): Promise<Product[]>;
  getByCategory(category: string, limit?: number): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
}


