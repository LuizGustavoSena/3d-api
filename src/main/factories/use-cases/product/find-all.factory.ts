import { FindAllProductsUseCase } from "../../../../data/use-cases/product/find-all-products.use-case";
import { factoryProductRepository } from "../../repositories/mysql/product/product.factory";
import { FactoryStorage } from "../../storage/index.factory";

export function factoryFindAllProductsUseCase() {
    const repository = factoryProductRepository();
    const storage = FactoryStorage();

    return new FindAllProductsUseCase(repository, storage);
}
