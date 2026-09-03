import { MongoContractRepository } from "../../../../../infraestructure/repositories/mongo/contract/contract.repository";

export function factoryContractRepository() {
    return new MongoContractRepository();
}
