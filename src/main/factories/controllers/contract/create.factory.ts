import { CreateContractController } from "../../../controller/contract/create.controller";
import { factoryCreateContractUseCase } from "../../use-cases/contract/create.factory";

export function factoryCreateContractController() {
    const useCase = factoryCreateContractUseCase();

    return new CreateContractController(useCase);
}
