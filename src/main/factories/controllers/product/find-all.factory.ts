import { FindAllProductsController } from "../../../controller/product/find-all.controller";
import { factoryFindAllProductsUseCase } from "../../use-cases/product/find-all.factory";

export function factoryFindAllProductsController() {
    const useCase = factoryFindAllProductsUseCase();

    return new FindAllProductsController(useCase);
}
