import { Controller } from "..";
import { CreateUserUseCase } from "../../../data/use-cases/user/create-user.use-case";
import { createUserSchema, CreateUserSchema } from "../schema/zod/user/create.schema";
import type { Response } from "express";

export class CreateUserController extends Controller<CreateUserSchema> {
    protected schema = createUserSchema;

    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
    ) { 
        super() 
    };

    protected async handle(data: CreateUserSchema, res: Response): Promise<Response> {
        const user = await this.createUserUseCase.execute(data);

        return res.status(201).json(user);
    }
}