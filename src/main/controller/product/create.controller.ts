import { Controller, created } from "..";
import { IHttpResponse } from "../../../data/protocols/http";
import { CreateProductUseCase } from "../../../data/use-cases/product/create-product.use-case";
import { CreateProductSchema, createProductSchema } from "../../../infraestructure/validations/zod/product/create.schema";

export class CreateProductController extends Controller<CreateProductSchema> {
    protected schema = createProductSchema;

    constructor(
        private createProductUseCase: CreateProductUseCase
    ){
        super();
    }

    protected async handle(data: CreateProductSchema): Promise<IHttpResponse>{
        const response = await this.createProductUseCase.execute(data.body);

        return created(response);
    }
}