import { CreateProductUseCase } from "../../../../data/use-cases/product/create-product.use-case";
import { factoryProductRepository } from "../../repositories/mysql/product/product.factory";
import { FactoryStorage } from "../../storage/index.factory";
import { factoryUuid } from "../../uuid/index.factory";

export function factoryCreateProductUseCase(){
    const storage = FactoryStorage();
    const repository = factoryProductRepository();
    const uuid = factoryUuid();

    return new CreateProductUseCase(storage, repository, uuid);
}