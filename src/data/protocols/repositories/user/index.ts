import { IUser } from "../../../../domain/models/user";

export interface IUserRepository {
    create(user: IUser): Promise<void>;
    someByEmail(email: string): Promise<boolean>;
}