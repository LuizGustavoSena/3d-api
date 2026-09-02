import { PrismaClient } from "../../../../../generated/prisma/client";
import { IProductRepository } from "../../../../data/protocols/repositories/product";
import { IProduct } from "../../../../domain/models/product";

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

    async findAll(): Promise<IProduct[]> {
        const products = await this.prisma.product.findMany();
        
        return products.map(product => ({
            ...product,
            value: product.value.toNumber()
        }));
    }
}