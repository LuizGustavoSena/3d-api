import { ZodType } from "zod";
import type { Request, Response } from "express";
import { IHttpResponse, StatusCodeEnum } from "../../data/protocols/http";

export abstract class Controller<T> {
    protected abstract schema: ZodType<T>;

    async execute(
        req: Request,
        res: Response
    ): Promise<Response> {
        const data = this.schema.parse(req.body);

        const response = await this.handle(data);

        return res.status(response.statusCode).json(response.data);
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