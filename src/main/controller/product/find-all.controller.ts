import { Controller, ok } from "..";
import { IHttpResponse } from "../../../data/protocols/http";
import { FindAllProductsUseCase } from "../../../data/use-cases/product/find-all-products.use-case";
import { FindAllProductsSchema, findAllProductsSchema } from "../../../infraestructure/validations/zod/product/find-all.schema";

export class FindAllProductsController extends Controller<FindAllProductsSchema> {
    protected schema = findAllProductsSchema;

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
