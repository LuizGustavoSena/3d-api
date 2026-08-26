import { RequestCreateProduct, ResponseCreateProduct } from "../../../domain/use-cases/product/create-product.interface";
import { IUsecase } from "../../../domain/use-cases/use-cases.interface";
import { IProductRepository } from "../../protocols/repositories/product";
import { IStorage } from "../../protocols/storage";
import { IUuid } from "../../protocols/uuid";

export class CreateProductUseCase implements IUsecase<RequestCreateProduct, ResponseCreateProduct> {
    constructor(
        private readonly storage: IStorage,
        private readonly productRepository: IProductRepository,
        private readonly uuid: IUuid,
    ){};
    
    async execute(params: RequestCreateProduct): Promise<ResponseCreateProduct> {
        const { image } = params;

        const imageKey = await this.storage.setItem({
            contentType: 'image/jpeg', 
            file: image, 
            key: `products/${params.name}`
        });

        const productId = this.uuid.generate();

        await this.productRepository.create({
            id: productId,
            imageKey,
            material: params.material,
            name: params.name,
            printingTime: params.printingTime,
            value: params.value
        })

        return { id: productId };
    }
}