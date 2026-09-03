import { IContract } from "../../../../domain/models/contract";
import { IContractRepository } from "../../../../../src/data/protocols/repositories/contract";
import { ContractModel } from "./contract.model";

export class MongoContractRepository implements IContractRepository {
    async create(contract: IContract): Promise<void> {
        await ContractModel.create(contract);
    }
}
