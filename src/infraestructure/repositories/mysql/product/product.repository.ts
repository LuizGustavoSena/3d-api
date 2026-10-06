import { PrismaClient } from "../../../../../generated/prisma/client";
import { IProductRepository } from "../../../../data/protocols/repositories/product";
import { IProduct } from "../../../../domain/models/product";
import { GetALlProductParams } from "../../../../domain/use-cases/product/find-all-products.interface";

export class ProductRepository implements IProductRepository {
    constructor(
        private readonly prisma: PrismaClient
    ) {};

    async create(product: IProduct): Promise<void> {
        const { id, imageKey, material, name, printingTime, value} = product;

        await this.prisma.product.create({
            data: {
                id: id,
                name: name,
                imageKey: imageKey,
                material: material,
                printingTime: printingTime,
                value: value
            }
        });
    }

    async findAll(params: GetALlProductParams): Promise<IProduct[]> {
        const products = await this.prisma.product.findMany({
            take: params.limit,
            skip: params.page - 1,
        });
        
        return products.map(product => ({
            ...product,
            value: product.value.toNumber()
        }));
    }
}