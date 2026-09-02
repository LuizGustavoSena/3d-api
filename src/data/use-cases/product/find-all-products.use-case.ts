import { ResponseFindAllProducts } from "../../../domain/use-cases/product/find-all-products.interface";
import { IUsecase } from "../../../domain/use-cases/use-cases.interface";
import { IProductRepository } from "../../protocols/repositories/product";
import { IStorage } from "../../protocols/storage";

export class FindAllProductsUseCase implements IUsecase<void, ResponseFindAllProducts[]> {
    constructor(
        private readonly productRepository: IProductRepository,
        private readonly storage: IStorage
    ) {}

    async execute(): Promise<ResponseFindAllProducts[]> {
        const products = await this.productRepository.findAll();

        return Promise.all(
            products.map(async (product) => {
                const imageUrl = await this.storage.getUrlByKey(product.imageKey);
                return {
                    id: product.id,
                    material: product.material,
                    name: product.name,
                    printingTime: product.printingTime,
                    value: product.value,
                    imageUrl,
                };
            })
        );
    }
}
