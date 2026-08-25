import { RequestCreateProduct, ResponseCreateProduct } from "../../../domain/use-cases/product/create-product.interface";
import { IUsecase } from "../../../domain/use-cases/use-cases.interface";
import { IStorage } from "../../protocols/storage";

export class CreateProductUseCase implements IUsecase<RequestCreateProduct, ResponseCreateProduct> {
    constructor(
        private readonly storage: IStorage
    ){};
    
    async execute(params: RequestCreateProduct): Promise<ResponseCreateProduct> {
        const { image } = params;

        const imageKey = this.storage.setItem({
            contentType: 'image/jpeg', 
            file: image, 
            key: `products/${params.name}`
        });

        throw new Error("Method not implemented.");
    }
}