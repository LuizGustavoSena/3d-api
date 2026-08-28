import { Controller, created } from "..";
import { LoginUserUseCase } from "../../../data/use-cases/user/login-user.use-case";
import { IHttpResponse } from "../../../data/protocols/http";
import { LoginUserSchema, loginUserSchema } from "../../../infraestructure/validations/zod/user/login.schema";

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