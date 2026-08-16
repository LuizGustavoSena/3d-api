import { PrismaClient } from "@prisma/client/extension";
import { IUserRepository } from "../../../../data/protocols/repositories/user";
import { IUser } from "../../../../domain/models/user";

export class UserRepository implements IUserRepository {
    constructor(
        private readonly prisma: PrismaClient
    ) {};

    async create(user: IUser): Promise<void> {
        await this.prisma.user.create({
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                password: user.password,
                birthdate: user.birthdate
            }
        });
    }

    async someByEmail(email: string): Promise<boolean> {
        const user = await this.prisma.user.findByUnique({
            where: { email }
        });
        
        return !!user;
    }
}