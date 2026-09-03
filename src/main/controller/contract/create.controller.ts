import { Controller, created } from "..";
import { IHttpResponse } from "../../../data/protocols/http";
import { CreateContractUseCase } from "../../../data/use-cases/contract/create-contract.use-case";
import { CreateContractSchema, createContractSchema } from "../../../infraestructure/validations/zod/contract/create.schema";

export class CreateContractController extends Controller<CreateContractSchema> {
    protected schema = createContractSchema;

    constructor(
        private createContractUseCase: CreateContractUseCase
    ) {
        super();
    }

    protected async handle(data: CreateContractSchema): Promise<IHttpResponse> {
        const response = await this.createContractUseCase.execute({
            userId: data.user.id,
            ...data.body,
        });

        return created(response);
    }
}
