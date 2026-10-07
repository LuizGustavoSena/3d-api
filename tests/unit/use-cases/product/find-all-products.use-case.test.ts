import { describe, it, expect, beforeEach, vi } from 'vitest';

import { ProductRepositoryMock } from '../../../mocks/repositories/product';
import { StorageMock } from '../../../mocks/storage';
import { factoryValidProductData } from '../../../fixtures/product';
import { FindAllProductsUseCase } from '../../../../src/data/use-cases/product/find-all-products.use-case';

describe('FindAllProductsUseCase', () => {
    let productRepositoryMock: ProductRepositoryMock;
    let storageMock: StorageMock;
    let sut: FindAllProductsUseCase;

    beforeEach(() => {
        vi.clearAllMocks();
        productRepositoryMock = new ProductRepositoryMock();
        storageMock = new StorageMock();

        sut = new FindAllProductsUseCase(productRepositoryMock, storageMock);
    });

    describe('success scenarios', () => {
        it('should return an empty array when no products are found', async () => {
            // ARRANGE
            productRepositoryMock.findAll.mockResolvedValue([]);

            // ACT
            const result = await sut.execute({ limit: 10, page: 1 });

            // ASSERT
            expect(result).toEqual([]);
            expect(productRepositoryMock.findAll).toBeCalledWith({ limit: 10, page: 1 });
        });

        it('should return products with imageUrl from storage', async () => {
            // ARRANGE
            const mockProduct = factoryValidProductData();
            productRepositoryMock.findAll.mockResolvedValue([mockProduct]);
            storageMock.getUrlByKey('https://storage.test/images/test.png');

            // ACT
            const result = await sut.execute({ limit: 10, page: 1 });

            // ASSERT
            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({
                id: mockProduct.id,
                material: mockProduct.material,
                name: mockProduct.name,
                printingTime: mockProduct.printingTime,
                value: mockProduct.value,
                imageUrl: 'https://storage.test/images/test.png',
            });
            expect(productRepositoryMock.findAll).toBeCalledWith({ limit: 10, page: 1 });
        });

        it('should return multiple products with their respective image URLs', async () => {
            // ARRANGE
            const mockProducts = [
                factoryValidProductData({ id: '1', name: 'Product A', imageKey: 'img-a.png' }),
                factoryValidProductData({ id: '2', name: 'Product B', imageKey: 'img-b.png' }),
            ];

            productRepositoryMock.findAll.mockResolvedValue(mockProducts);
            storageMock.getUrlByKey.mockResolvedValue('');

            // ACT
            const result = await sut.execute({ limit: 10, page: 2 });

            // ASSERT
            expect(result).toHaveLength(2);
        });
    });

    describe('integration scenarios', () => {
        it('should map all products correctly with their image URLs', async () => {
            // ARRANGE
            const mockProducts = [
                factoryValidProductData({ id: '1', name: 'A', imageKey: 'a.png' }),
                factoryValidProductData({ id: '2', name: 'B', imageKey: 'b.png' }),
                factoryValidProductData({ id: '3', name: 'C', imageKey: 'c.png' }),
            ];

            productRepositoryMock.findAll.mockResolvedValue(mockProducts);
            storageMock.getUrlByKey.mockResolvedValue('https://storage.test/default.png');

            // ACT
            const result = await sut.execute({ limit: 5, page: 0 });

            // ASSERT
            expect(result).toHaveLength(3);
            expect(productRepositoryMock.findAll).toBeCalledWith({ limit: 5, page: 0 });
        });

        it('should return products with null imageUrl when storage returns null', async () => {
            // ARRANGE
            const mockProduct = factoryValidProductData();
            productRepositoryMock.findAll.mockResolvedValue([mockProduct]);
            storageMock.getUrlByKey.mockResolvedValue(null);

            // ACT
            const result = await sut.execute({ limit: 10, page: 1 });

            // ASSERT
            expect(result[0].imageUrl).toBeNull();
        });
    });

    describe('error scenarios', () => {
        it('should propagate repository errors', async () => {
            // ARRANGE
            const dbError = new Error('Database connection failed');
            productRepositoryMock.findAll.mockRejectedValue(dbError);

            // ACT & ASSERT
            await expect(sut.execute({ limit: 10, page: 1 })).rejects.toThrow('Database connection failed');
        });

        it('should propagate storage errors', async () => {
            // ARRANGE
            const mockProduct = factoryValidProductData();
            productRepositoryMock.findAll.mockResolvedValue([mockProduct]);
            storageMock.getUrlByKey.mockRejectedValue(new Error('Storage unavailable'));

            // ACT & ASSERT
            await expect(sut.execute({ limit: 10, page: 1 })).rejects.toThrow('Storage unavailable');
        });
    });
});
