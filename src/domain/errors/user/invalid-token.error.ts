import { StatusCodeEnum } from "../../../data/protocols/http";
import { AppErrorCodes } from "../../constants/app-error";
import { AppError } from "../app.error";

export class InvalidTokenError extends AppError {
    constructor() {
        super(
            'Token inválido ou expirado',
            StatusCodeEnum.UNAUTHORIZED,
            AppErrorCodes.INVALID_TOKEN
        );

        this.name = 'InvalidTokenError';
    }
}
