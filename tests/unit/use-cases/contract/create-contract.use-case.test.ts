import { describe, it, expect, beforeEach, vi } from 'vitest';
import { StorageMock } from '../../../mocks/storage';
import { ContractRepositoryMock } from '../../../mocks/repositories/contract';
import { UuidMock } from '../../../mocks/uuid';
import { CreateContractUseCase } from '../../../../src/data/use-cases/contract/create-contract.use-case';
import { ContractStatusEnum } from '../../../../src/domain/models/contract';

describe('CreateContractUseCase', () => {
    let storageMock: StorageMock;
    let contractRepositoryMock: ContractRepositoryMock;
    let uuidMock: UuidMock;
    let sut: CreateContractUseCase;

    beforeEach(() => {
        vi.clearAllMocks();
        storageMock = new StorageMock();
        contractRepositoryMock = new ContractRepositoryMock();
        uuidMock = new UuidMock();
        sut = new CreateContractUseCase(storageMock, contractRepositoryMock, uuidMock);
    });

    describe('success scenarios', () => {
        it('should successfully create a contract with files and return its id', async () => {
            const request = {
                userId: 'user-123',
                files: [
                    { name: 'file1.stl', type: 'model/stl', file: Buffer.from('file1') },
                    { name: 'file2.obj', type: 'model/obj', file: Buffer.from('file2') }
                ],
                material: 1,
                quantity: 2,
                porcentageFilling: 20,
                observations: 'test observations'
            };

            const mockUuid = 'contract-uuid-123';
            uuidMock.generate.mockReturnValue(mockUuid);
            storageMock.setItem
                .mockResolvedValueOnce('contracts/file1.stl')
                .mockResolvedValueOnce('contracts/file2.obj');
            contractRepositoryMock.create.mockResolvedValue(undefined);

            const result = await sut.execute(request);

            expect(result).toEqual({ id: mockUuid });
            expect(uuidMock.generate).toHaveBeenCalledTimes(1);
            expect(storageMock.setItem).toHaveBeenCalledTimes(2);
            expect(storageMock.setItem).toHaveBeenNthCalledWith(1, {
                contentType: 'model/stl',
                file: request.files[0].file,
                key: 'contracts/file1.stl'
            });
            expect(storageMock.setItem).toHaveBeenNthCalledWith(2, {
                contentType: 'model/obj',
                file: request.files[1].file,
                key: 'contracts/file2.obj'
            });
            expect(contractRepositoryMock.create).toHaveBeenCalledWith({
                id: mockUuid,
                userId: request.userId,
                files: [
                    { type: 'model/stl', name: 'file1.stl', key: 'contracts/file1.stl' },
                    { type: 'model/obj', name: 'file2.obj', key: 'contracts/file2.obj' }
                ],
                material: request.material,
                quantity: request.quantity,
                porcentageFilling: request.porcentageFilling,
                observations: request.observations,
                status: ContractStatusEnum.PENDING
            });
        });
    });

    describe('error scenarios', () => {
        it('should propagate storage errors', async () => {
            const request = {
                userId: 'user-123',
                files: [{ name: 'file1.stl', type: 'model/stl', file: Buffer.from('file1') }],
                material: 1,
                quantity: 1,
                porcentageFilling: 10
            };

            uuidMock.generate.mockReturnValue('contract-uuid-123');
            storageMock.setItem.mockRejectedValue(new Error('Storage failure'));

            await expect(sut.execute(request)).rejects.toThrow('Storage failure');
            expect(contractRepositoryMock.create).not.toHaveBeenCalled();
        });

        it('should propagate repository errors', async () => {
            const request = {
                userId: 'user-123',
                files: [{ name: 'file1.stl', type: 'model/stl', file: Buffer.from('file1') }],
                material: 1,
                quantity: 1,
                porcentageFilling: 10
            };

            uuidMock.generate.mockReturnValue('contract-uuid-123');
            storageMock.setItem.mockResolvedValue('contracts/file1.stl');
            contractRepositoryMock.create.mockRejectedValue(new Error('Database failure'));

            await expect(sut.execute(request)).rejects.toThrow('Database failure');
        });
    });
});
