import { Controller, ok } from "..";
import { IHttpResponse } from "../../../data/protocols/http";
import { FindAllProductsUseCase } from "../../../data/use-cases/product/find-all-products.use-case";
import { ZodType } from "zod";

export class FindAllProductsController extends Controller {
    protected schema: ZodType<undefined> = undefined;

    constructor(
        private readonly findAllProductsUseCase: FindAllProductsUseCase
    ) {
        super();
    }

    protected async handle(): Promise<IHttpResponse> {
        const products = await this.findAllProductsUseCase.execute();
        return ok(products);
    }
}
