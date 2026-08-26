import { ZodType } from "zod";
import type { Request, Response } from "express";
import { IHttpResponse, StatusCodeEnum } from "../../data/protocols/http";

export abstract class Controller<T> {
    protected abstract schema: ZodType<T>;

    async execute(
        body: T,
    ): Promise<IHttpResponse> {
        const data = this.schema.parse(body);

        return this.handle(data);
    }

    protected abstract handle(
        data: T,
    ): Promise<IHttpResponse>;
}

export function created(data?: any): IHttpResponse{
    return {
        data,
        statusCode: StatusCodeEnum.CREATED
    }
}

export function ok(data?: any): IHttpResponse{
    return {
        data,
        statusCode: StatusCodeEnum.OK
    }
}