import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserRepositoryMock } from '../../../mocks/repositories/user';
import { UuidMock } from '../../../mocks/uuid';
import { EncryptMock } from '../../../mocks/encrypt';
import { CreateUserUseCase } from '../../../../src/data/use-cases/user/create-user.use-case';
import { UnprocessedEmailError } from '../../../../src/domain/errors/user/unprocessed-email.error';

describe('CreateUserUseCase', () => {
    let userRepositoryMock: UserRepositoryMock;
    let uuidMock: UuidMock;
    let encryptMock: EncryptMock;
    let sut: CreateUserUseCase;

    beforeEach(() => {
        vi.clearAllMocks();
        userRepositoryMock = new UserRepositoryMock();
        uuidMock = new UuidMock();
        encryptMock = new EncryptMock();
        sut = new CreateUserUseCase(userRepositoryMock, uuidMock, encryptMock);
    });

    describe('success scenarios', () => {
        it('should successfully create a user and return its id', async () => {
            // ARRANGE
            const request = {
                email: 'test@example.com',
                password: 'password123',
                username: 'testuser',
                birthdate: new Date('1990-01-01')
            };
            const mockUuid = '123e4567-e89b-12d3-a456-426614174000';
            const encryptedPassword = 'hashed-password';

            userRepositoryMock.findByEmail.mockResolvedValue(null as any);
            uuidMock.generate.mockReturnValue(mockUuid);
            encryptMock.encrypt.mockReturnValue(encryptedPassword);
            userRepositoryMock.create.mockResolvedValue(undefined);

            // ACT
            const result = await sut.execute(request);

            // ASSERT
            expect(result).toEqual({ id: mockUuid });
            expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(request.email);
            expect(uuidMock.generate).toHaveBeenCalledTimes(1);
            expect(encryptMock.encrypt).toHaveBeenCalledWith(request.password);
            expect(userRepositoryMock.create).toHaveBeenCalledWith({
                id: mockUuid,
                email: request.email,
                password: encryptedPassword,
                username: request.username,
                birthdate: request.birthdate,
                levelAccess: 1
            });
        });
    });

    describe('integration scenarios', () => {
        it('should correctly orchestrate email check, uuid generation, encryption, and persistence', async () => {
            // ARRANGE
            const request = {
                email: 'integration@example.com',
                password: 'securePassword',
                username: 'integrationUser',
                birthdate: new Date('1995-05-05')
            };
            userRepositoryMock.findByEmail.mockResolvedValue(null as any);
            uuidMock.generate.mockReturnValue('uuid-xyz-123');
            encryptMock.encrypt.mockReturnValue('encrypted-secure-password');
            userRepositoryMock.create.mockResolvedValue();

            // ACT
            const result = await sut.execute(request);

            // ASSERT
            expect(result).toEqual({ id: 'uuid-xyz-123' });
            expect(userRepositoryMock.findByEmail).toHaveBeenCalledTimes(1);
            expect(uuidMock.generate).toHaveBeenCalledTimes(1);
            expect(encryptMock.encrypt).toHaveBeenCalledTimes(1);
            expect(userRepositoryMock.create).toHaveBeenCalledTimes(1);
        });
    });

    describe('error scenarios', () => {
        it('should throw UnprocessedEmailError when email already exists', async () => {
            // ARRANGE
            const request = {
                email: 'existing@example.com',
                password: 'password123',
                username: 'existingUser',
                birthdate: new Date('1990-01-01')
            };
            userRepositoryMock.findByEmail.mockResolvedValue({ id: 'existing-id', email: request.email } as any);

            // ACT & ASSERT
            await expect(sut.execute(request)).rejects.toThrow(UnprocessedEmailError);
            expect(userRepositoryMock.create).not.toHaveBeenCalled();
        });

        it('should propagate repository errors during findByEmail', async () => {
            // ARRANGE
            const request = {
                email: 'test@example.com',
                password: 'password123',
                username: 'testuser',
                birthdate: new Date('1990-01-01')
            };
            userRepositoryMock.findByEmail.mockRejectedValue(new Error('Database error'));

            // ACT & ASSERT
            await expect(sut.execute(request)).rejects.toThrow('Database error');
            expect(userRepositoryMock.create).not.toHaveBeenCalled();
        });

        it('should propagate repository errors during create', async () => {
            // ARRANGE
            const request = {
                email: 'test@example.com',
                password: 'password123',
                username: 'testuser',
                birthdate: new Date('1990-01-01')
            };
            userRepositoryMock.findByEmail.mockResolvedValue(null as any);
            uuidMock.generate.mockReturnValue('some-id');
            encryptMock.encrypt.mockReturnValue('hashed');
            userRepositoryMock.create.mockRejectedValue(new Error('Persistence error'));

            // ACT & ASSERT
            await expect(sut.execute(request)).rejects.toThrow('Persistence error');
        });
    });
});
