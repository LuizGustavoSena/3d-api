import { Controller } from "..";
import type { Response } from "express";
import { loginUserSchema, LoginUserSchema } from "../schema/zod/user/login.schema";
import { LoginUserUseCase } from "../../../data/use-cases/user/login-user.use-case";

export class LoginUserController extends Controller<LoginUserSchema> {
    protected schema = loginUserSchema;

    constructor(
        private readonly loginUserUseCase: LoginUserUseCase,
    ) { 
        super() 
    };

    protected async handle(data: LoginUserSchema, res: Response): Promise<Response> {
        const user = await this.loginUserUseCase.execute(data);

        return res.status(201).json(user);
    }
}