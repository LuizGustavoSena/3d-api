import { Controller, ok } from "..";
import { IHttpResponse } from "../../../data/protocols/http";
import { FindAllProductsUseCase } from "../../../data/use-cases/product/find-all-products.use-case";
import { findAllProductSchema, FindAllProductsSchema } from "../../../infraestructure/validations/zod/product/get-all.schema";

export class FindAllProductsController extends Controller<FindAllProductsSchema> {
    protected schema = findAllProductSchema;

    constructor(
        private readonly findAllProductsUseCase: FindAllProductsUseCase
    ) {
        super();
    }

    protected async handle(data: FindAllProductsSchema): Promise<IHttpResponse> {
        const params = data.query;
        
        const products = await this.findAllProductsUseCase.execute(params);
        return ok(products);
    }
}
