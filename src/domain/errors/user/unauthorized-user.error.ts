import { StatusCodeEnum } from "../../../data/protocols/http";
import { AppErrorCodes } from "../../constants/app-error";
import { AppError } from "../app.error";

export class UnauthorizedUserError extends AppError {
    constructor() {
        super(
            'Usuário não autorizado',
            StatusCodeEnum.UNAUTHORIZED,
            AppErrorCodes.UNAUTHORIZED_USER
        );

        this.name = 'UnauthorizedUserError';
    }
}