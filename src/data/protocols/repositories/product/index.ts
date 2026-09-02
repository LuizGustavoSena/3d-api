import { IProduct } from "../../../../domain/models/product";

export interface IProductRepository {
    create(product: IProduct): Promise<void>;
    findAll(): Promise<IProduct[]>;
}