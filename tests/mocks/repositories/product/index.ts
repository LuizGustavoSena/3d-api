import { IProductRepository } from "../../../../src/data/protocols/repositories/product";
import { IProduct } from "../../../../src/domain/models/product";
import { GetALlProductParams } from "../../../../src/domain/use-cases/product/find-all-products.interface";


export class ProductRepositoryMock implements IProductRepository {
    create = vi.fn<[IProduct], Promise<void>>();

    findAll = vi.fn<[GetALlProductParams], Promise<IProduct[]>>();
}
