import { IContract } from "../../../../domain/models/contract";

export interface IContractRepository {
    create(contract: IContract): Promise<void>;
}
