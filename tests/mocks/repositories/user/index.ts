import { vi } from 'vitest';
import { IUserRepository, UpdateRefreshtokenParams } from "../../../../src/data/protocols/repositories/user";
import { IUser } from "../../../../src/domain/models/user";

export class UserRepositoryMock implements IUserRepository {
    create = vi.fn<[IUser], Promise<void>>();
    findByEmail = vi.fn<[string], Promise<IUser>>();
    updateRefreshtoken = vi.fn<[UpdateRefreshtokenParams], Promise<void>>();
    getLevalAccessByEmail = vi.fn<[string], Promise<number>>();
}
