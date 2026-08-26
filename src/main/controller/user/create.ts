import { Controller, created } from "..";
import { IHttpResponse } from "../../../data/protocols/http";
import { CreateUserUseCase } from "../../../data/use-cases/user/create-user.use-case";
import { createUserSchema, CreateUserSchema } from "../schema/zod/user/create.schema";

export class CreateUserController extends Controller<CreateUserSchema> {
    protected schema = createUserSchema;

    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
    ) { 
        super() 
    };

    protected async handle(data: CreateUserSchema): Promise<IHttpResponse> {
        const user = await this.createUserUseCase.execute(data);

        return created(user);
    }
}