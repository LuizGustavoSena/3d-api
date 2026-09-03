import { IContractRepository } from "../../protocols/repositories/contract";
import { IStorage } from "../../protocols/storage";
import { IUuid } from "../../protocols/uuid";
import { IUsecase } from "../../../domain/use-cases/use-cases.interface";
import { RequestCreateContract, ResponseCreateContract } from "../../../domain/use-cases/contract/create-contract.interface";
import { ContractStatusEnum } from "../../../domain/models/contract";

export class CreateContractUseCase implements IUsecase<RequestCreateContract, ResponseCreateContract> {
    constructor(
        private readonly storage: IStorage,
        private readonly contractRepository: IContractRepository,
        private readonly uuid: IUuid,
    ) {}

    async execute(params: RequestCreateContract): Promise<ResponseCreateContract> {
        const contractId = this.uuid.generate();

        const uploadedFiles = await Promise.all(
            params.files.map(async (fileData) => {
                const key = await this.storage.setItem({
                    contentType: fileData.type,
                    file: fileData.file,
                    key: `contracts/${fileData.name}`
                });

                return {
                    type: fileData.type,
                    name: fileData.name,
                    key,
                };
            })
        );

        await this.contractRepository.create({
            id: contractId,
            userId: params.userId,
            files: uploadedFiles,
            material: params.material,
            quantity: params.quantity,
            porcentageFilling: params.porcentageFilling,
            observations: params.observations,
            status: ContractStatusEnum.PENDING,
        });

        return { id: contractId };
    }
}
