import { factoryMysqlRepository } from "../index.factory.";
import { ProductRepository } from "../../../../../infraestructure/repositories/mysql/product/product.repository";

export function factoryProductRepository() {
    return new ProductRepository(factoryMysqlRepository());
}