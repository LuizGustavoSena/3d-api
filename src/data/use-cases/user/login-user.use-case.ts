import { UnauthorizedUserError } from "../../../domain/errors/user/unauthorized-user.error";
import { IUsecase } from "../../../domain/use-cases/use-cases.interface";
import { RequestLoginUser, ResponseLoginUser } from "../../../domain/use-cases/user/login-user.interface";
import { IEncrypt } from "../../protocols/encrypt";
import { IUserRepository } from "../../protocols/repositories/user";

export class LoginUserUseCase implements IUsecase<RequestLoginUser, ResponseLoginUser> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly encrypt: IEncrypt,
    ){};

    async execute(params: any): Promise<any> {
        const user = await this.userRepository.findByEmail(params.email);

        if (!user)
            throw new UnauthorizedUserError();

        const password = this.encrypt.decrypt(user.password);

        if (password !== params.password)
            throw new UnauthorizedUserError();

        throw new Error("Method not implemented.");
    }
}