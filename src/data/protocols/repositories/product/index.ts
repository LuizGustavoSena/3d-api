import { IProduct } from "../../../../domain/models/product";
import { GetALlProductParams } from "../../../../domain/use-cases/product/find-all-products.interface";

export interface IProductRepository {
    create(product: IProduct): Promise<void>;
    findAll(params?: GetALlProductParams): Promise<IProduct[]>;
}