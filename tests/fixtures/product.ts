import { IProduct } from "../../src/domain/models/product";

export function factoryValidProductData(overrides?: Partial<IProduct>): IProduct {
    return {
        id: '550e8400-e29b-41d4-a716-446655440000',
        material: 1,
        name: 'Test Product',
        printingTime: 120,
        value: 50,
        imageKey: 'images/test.png',
        ...overrides,
    };
}
