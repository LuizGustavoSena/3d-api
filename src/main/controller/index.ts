import { ZodType } from "zod";
import type { Request, Response } from "express";

export abstract class Controller<T> {
    protected abstract schema: ZodType<T>;

    async execute(
        req: Request,
        res: Response,
    ): Promise<Response> {
        const data = this.schema.parse(req.body);

        return this.handle(data, res);
    }

    protected abstract handle(
        data: T,
        res: Response,
    ): Promise<Response>;
}