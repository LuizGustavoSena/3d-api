import { PrismaClient } from "@prisma/client/extension";
import { IUserRepository, UpdateRefreshtokenParams } from "../../../../data/protocols/repositories/user";
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

    async findByEmail(email: string): Promise<IUser> {
        const user = await this.prisma.user.findByUnique({
            where: { email }
        });
        
        return user;
    }

    async updateRefreshtoken(params: UpdateRefreshtokenParams): Promise<void> {
        const { email, refreshToken } = params;
        
        await this.prisma.user.update({
            where: { email },
            data: { refreshToken }
        });
    }
;
}