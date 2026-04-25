import { IProductRepository, Product } from '../../domain/models/product';

export class GetProducts {
  constructor(private readonly repo: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.repo.getAll();
  }
}
