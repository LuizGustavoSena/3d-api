import { IUser } from "../../../../domain/models/user";

export interface IUserRepository {
    create(user: IUser): Promise<void>;
    findByEmail(email: string): Promise<IUser>;
    updateRefreshtoken(params: UpdateRefreshtokenParams): Promise<void>;
}

export interface UpdateRefreshtokenParams {
    email: string;
    refreshToken: string;
}