import { CreateProductController } from "../../../controller/product/create.controller";
import { factoryCreateProductUseCase } from "../../use-cases/product/create.factory";

export function factoryCreateProductController() {
    const useCase = factoryCreateProductUseCase();

    return new CreateProductController(useCase);
}