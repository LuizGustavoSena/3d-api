import { describe, it, expect, beforeEach, vi } from 'vitest';
import { UserRepositoryMock } from '../../../mocks/repositories/user';
import { EncryptMock } from '../../../mocks/encrypt';
import { JwtMock } from '../../../mocks/jwt';
import { UuidMock } from '../../../mocks/uuid';
import { LoginUserUseCase } from '../../../../src/data/use-cases/user/login-user.use-case';
import { UnauthorizedUserError } from '../../../../src/domain/errors/user/unauthorized-user.error';
import { IUser } from '../../../../src/domain/models/user';

describe('LoginUserUseCase', () => {
    let userRepositoryMock: UserRepositoryMock;
    let encryptMock: EncryptMock;
    let jwtMock: JwtMock;
    let uuidMock: UuidMock;
    let sut: LoginUserUseCase;

    beforeEach(() => {
        vi.clearAllMocks();
        userRepositoryMock = new UserRepositoryMock();
        encryptMock = new EncryptMock();
        jwtMock = new JwtMock();
        uuidMock = new UuidMock();
        sut = new LoginUserUseCase(userRepositoryMock, encryptMock, jwtMock, uuidMock);
    });

    describe('success scenarios', () => {
        it('should successfully login a user and return tokens', async () => {
            // ARRANGE
            const request = {
                email: 'test@example.com',
                password: 'password123'
            };
            const mockUser: IUser = {
                id: 'user-id',
                email: request.email,
                password: 'encrypted-password',
                username: 'testuser',
                birthdate: new Date('1990-01-01'),
                levelAccess: 1,
                refreshtoken: undefined
            };
            const decryptedPassword = 'password123';
            const mockToken = 'jwt-token-string';
            const mockRefreshToken = 'refresh-uuid-string';

            userRepositoryMock.findByEmail.mockResolvedValue(mockUser);
            encryptMock.decrypt.mockReturnValue(decryptedPassword);
            jwtMock.generate.mockReturnValue({ token: mockToken });
            uuidMock.generate.mockReturnValue(mockRefreshToken);
            userRepositoryMock.updateRefreshtoken.mockResolvedValue(undefined);

            // ACT
            const result = await sut.execute(request);

            // ASSERT
            expect(result).toEqual({
                accessToken: mockToken,
                refreshToken: mockRefreshToken
            });
            expect(userRepositoryMock.findByEmail).toHaveBeenCalledWith(request.email);
            expect(encryptMock.decrypt).toHaveBeenCalledWith(mockUser.password);
            expect(jwtMock.generate).toHaveBeenCalledWith({ email: mockUser.email });
            expect(uuidMock.generate).toHaveBeenCalledTimes(1);
            expect(userRepositoryMock.updateRefreshtoken).toHaveBeenCalledWith({
                email: mockUser.email,
                refreshToken: mockRefreshToken
            });
        });
    });

    describe('integration scenarios', () => {
        it('should correctly orchestrate findByEmail, password decryption, token generation, and refresh token persistence', async () => {
            // ARRANGE
            const request = {
                email: 'integration@example.com',
                password: 'myPassword'
            };
            const mockUser: IUser = {
                id: 'int-id',
                email: request.email,
                password: 'encryptedMyPassword',
                username: 'intUser',
                birthdate: new Date('1992-02-02'),
                levelAccess: 1
            };
            userRepositoryMock.findByEmail.mockResolvedValue(mockUser);
            encryptMock.decrypt.mockReturnValue('myPassword');
            jwtMock.generate.mockReturnValue({ token: 'access-token-123' });
            uuidMock.generate.mockReturnValue('refresh-token-456');
            userRepositoryMock.updateRefreshtoken.mockResolvedValue();

            // ACT
            const result = await sut.execute(request);

            // ASSERT
            expect(result).toEqual({
                accessToken: 'access-token-123',
                refreshToken: 'refresh-token-456'
            });
            expect(userRepositoryMock.findByEmail).toHaveBeenCalledTimes(1);
            expect(encryptMock.decrypt).toHaveBeenCalledTimes(1);
            expect(jwtMock.generate).toHaveBeenCalledTimes(1);
            expect(uuidMock.generate).toHaveBeenCalledTimes(1);
            expect(userRepositoryMock.updateRefreshtoken).toHaveBeenCalledTimes(1);
        });
    });

    describe('error scenarios', () => {
        it('should throw UnauthorizedUserError when user is not found by email', async () => {
            // ARRANGE
            const request = {
                email: 'notfound@example.com',
                password: 'password123'
            };
            userRepositoryMock.findByEmail.mockResolvedValue(null as any);

            // ACT & ASSERT
            await expect(sut.execute(request)).rejects.toThrow(UnauthorizedUserError);
            expect(encryptMock.decrypt).not.toHaveBeenCalled();
            expect(jwtMock.generate).not.toHaveBeenCalled();
        });

        it('should throw UnauthorizedUserError when password does not match', async () => {
            // ARRANGE
            const request = {
                email: 'test@example.com',
                password: 'wrongPassword'
            };
            const mockUser: IUser = {
                id: 'user-id',
                email: request.email,
                password: 'encrypted-password',
                username: 'testuser',
                birthdate: new Date('1990-01-01'),
                levelAccess: 1
            };
            userRepositoryMock.findByEmail.mockResolvedValue(mockUser);
            encryptMock.decrypt.mockReturnValue('correctPassword');

            // ACT & ASSERT
            await expect(sut.execute(request)).rejects.toThrow(UnauthorizedUserError);
            expect(jwtMock.generate).not.toHaveBeenCalled();
            expect(userRepositoryMock.updateRefreshtoken).not.toHaveBeenCalled();
        });

        it('should propagate repository errors during findByEmail', async () => {
            // ARRANGE
            const request = {
                email: 'test@example.com',
                password: 'password123'
            };
            userRepositoryMock.findByEmail.mockRejectedValue(new Error('Database error'));

            // ACT & ASSERT
            await expect(sut.execute(request)).rejects.toThrow('Database error');
        });
    });
});
