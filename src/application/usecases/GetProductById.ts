import { IProductRepository, Product } from '../../domain/models/product';

export class GetProductById {
  constructor(private readonly repo: IProductRepository) {}

  async execute(id: string): Promise<Product | null> {
    return this.repo.getById(id);
  }
}
