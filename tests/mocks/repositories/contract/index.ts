import { vi } from 'vitest';
import { IContractRepository } from "../../../../src/data/protocols/repositories/contract";
import { IContract } from "../../../../src/domain/models/contract";

export class ContractRepositoryMock implements IContractRepository {
    create = vi.fn<[IContract], Promise<void>>();
}
