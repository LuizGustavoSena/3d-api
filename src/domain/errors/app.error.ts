import { StatusCodeEnum } from "../../data/protocols/http";
import { AppErrorCodes } from "../constants/app-error";

export type ErrorDetails = Record<string, unknown> | Array<Record<string, unknown>>;

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly code: string;
    public readonly details?: ErrorDetails;

    constructor(message: string, statusCode: StatusCodeEnum, code: AppErrorCodes, details?: ErrorDetails) {
        super(message);
        this.name = 'AppError';
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
    }
}