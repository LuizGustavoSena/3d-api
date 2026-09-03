import { CreateContractUseCase } from "../../../../data/use-cases/contract/create-contract.use-case";
import { factoryContractRepository } from "../../repositories/mongo/contract/contract.factory";
import { FactoryStorage } from "../../storage/index.factory";
import { factoryUuid } from "../../uuid/index.factory";

export function factoryCreateContractUseCase() {
    const storage = FactoryStorage();
    const repository = factoryContractRepository();
    const uuid = factoryUuid();

    return new CreateContractUseCase(storage, repository, uuid);
}
