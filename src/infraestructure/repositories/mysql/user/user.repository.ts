import { PrismaClient } from "@prisma/client/extension";
import { IUserRepository } from "../../../../data/protocols/repositories/user";
import { IUser } from "../../../../domain/models/user";

export class UserRepository implements IUserRepository {
    constructor(
        private readonly prisma: PrismaClient
    ) {};

    async create(user: IUser): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async someByEmail(email: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}