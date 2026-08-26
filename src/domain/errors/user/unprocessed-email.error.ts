import { StatusCodeEnum } from "../../../data/protocols/http";
import { AppErrorCodes } from "../../constants/app-error";
import { AppError } from "../app.error";

export class UnprocessedEmailError extends AppError {
    constructor() {
        super(
            'Email não elegível ao uso',
            StatusCodeEnum.PRECONDITION_FAILED,
            AppErrorCodes.UNPROCESSED_EMAIL
        );

        this.name = 'UnprocessedEmailError';
    }
}