import { Controller, created } from "..";
import type { Response } from "express";
import { loginUserSchema, LoginUserSchema } from "../schema/zod/user/login.schema";
import { LoginUserUseCase } from "../../../data/use-cases/user/login-user.use-case";
import { IHttpResponse } from "../../../data/protocols/http";

export class LoginUserController extends Controller<LoginUserSchema> {
    protected schema = loginUserSchema;

    constructor(
        private readonly loginUserUseCase: LoginUserUseCase,
    ) { 
        super() 
    };

    protected async handle(data: LoginUserSchema): Promise<IHttpResponse> {
        const user = await this.loginUserUseCase.execute(data);

        return created(user);
    }
}