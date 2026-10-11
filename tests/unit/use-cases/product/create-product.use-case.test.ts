import { describe, it, expect, beforeEach, vi } from 'vitest';
import { StorageMock } from '../../../mocks/storage';
import { ProductRepositoryMock } from '../../../mocks/repositories/product';
import { UuidMock } from '../../../mocks/uuid';
import { CreateProductUseCase } from '../../../../src/data/use-cases/product/create-product.use-case';

describe('CreateProductUseCase', () => {
    let storageMock: StorageMock;
    let productRepositoryMock: ProductRepositoryMock;
    let uuidMock: UuidMock;
    let sut: CreateProductUseCase;

    beforeEach(() => {
        vi.clearAllMocks();
        storageMock = new StorageMock();
        productRepositoryMock = new ProductRepositoryMock();
        uuidMock = new UuidMock();
        sut = new CreateProductUseCase(storageMock, productRepositoryMock, uuidMock);
    });

    describe('success scenarios', () => {
        it('should successfully create a product and return its id', async () => {
            // ARRANGE
            const request = {
                name: 'Test Product',
                material: 1,
                printingTime: 120,
                value: 50,
                image: Buffer.from('fake-image')
            };
            const mockImageKey = 'products/Test Product';
            const mockUuid = '123e4567-e89b-12d3-a456-426614174000';

            storageMock.setItem.mockResolvedValue(mockImageKey);
            uuidMock.generate.mockReturnValue(mockUuid);
            productRepositoryMock.create.mockResolvedValue(undefined);

            // ACT
            const result = await sut.execute(request);

            // ASSERT
            expect(result).toEqual({ id: mockUuid });
            expect(storageMock.setItem).toHaveBeenCalledWith({
                contentType: 'image/jpeg',
                file: request.image,
                key: `products/${request.name}`
            });
            expect(uuidMock.generate).toHaveBeenCalledTimes(1);
            expect(productRepositoryMock.create).toHaveBeenCalledWith({
                id: mockUuid,
                imageKey: mockImageKey,
                material: request.material,
                name: request.name,
                printingTime: request.printingTime,
                value: request.value
            });
        });
    });

    describe('integration scenarios', () => {
        it('should correctly orchestrate storage upload, uuid generation, and repository persistence', async () => {
            // ARRANGE
            const request = {
                name: 'Complex Figurine',
                material: 2,
                printingTime: 300,
                value: 150,
                image: Buffer.from('complex-image')
            };
            storageMock.setItem.mockResolvedValue('products/Complex Figurine');
            uuidMock.generate.mockReturnValue('uuid-xyz-789');
            productRepositoryMock.create.mockResolvedValue();

            // ACT
            const result = await sut.execute(request);

            // ASSERT
            expect(result).toEqual({ id: 'uuid-xyz-789' });
            expect(storageMock.setItem).toHaveBeenCalledTimes(1);
            expect(uuidMock.generate).toHaveBeenCalledTimes(1);
            expect(productRepositoryMock.create).toHaveBeenCalledTimes(1);
        });
    });

    describe('error scenarios', () => {
        it('should propagate storage errors', async () => {
            // ARRANGE
            const request = {
                name: 'Error Product',
                material: 1,
                printingTime: 60,
                value: 20,
                image: Buffer.from('image')
            };
            storageMock.setItem.mockRejectedValue(new Error('Storage failure'));

            // ACT & ASSERT
            await expect(sut.execute(request)).rejects.toThrow('Storage failure');
            expect(productRepositoryMock.create).not.toHaveBeenCalled();
        });

        it('should propagate repository errors', async () => {
            // ARRANGE
            const request = {
                name: 'Error Product',
                material: 1,
                printingTime: 60,
                value: 20,
                image: Buffer.from('image')
            };
            storageMock.setItem.mockResolvedValue('products/Error Product');
            uuidMock.generate.mockReturnValue('some-id');
            productRepositoryMock.create.mockRejectedValue(new Error('Database failure'));

            // ACT & ASSERT
            await expect(sut.execute(request)).rejects.toThrow('Database failure');
        });
    });
});
