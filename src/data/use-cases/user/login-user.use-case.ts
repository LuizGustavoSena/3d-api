import { UnauthorizedUserError } from "../../../domain/errors/user/unauthorized-user.error";
import { IUsecase } from "../../../domain/use-cases/use-cases.interface";
import { RequestLoginUser, ResponseLoginUser } from "../../../domain/use-cases/user/login-user.interface";
import { IEncrypt } from "../../protocols/encrypt";
import { IJwt } from "../../protocols/jwt";
import { IUserRepository } from "../../protocols/repositories/user";
import { IUuid } from "../../protocols/uuid";

export class LoginUserUseCase implements IUsecase<RequestLoginUser, ResponseLoginUser> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly encrypt: IEncrypt,
        private readonly jwt: IJwt,
        private readonly uuid: IUuid,
    ){};

    async execute(params: RequestLoginUser): Promise<ResponseLoginUser> {
        const user = await this.userRepository.findByEmail(params.email);

        if (!user)
            throw new UnauthorizedUserError();

        const password = this.encrypt.decrypt(user.password);

        if (password !== params.password)
            throw new UnauthorizedUserError();

        const token = this.jwt.generate({ email: user.email });
        const refreshToken = this.uuid.generate();

        await this.userRepository.updateRefreshtoken({
            email: user.email,
            refreshToken,
        });

        return {
            accessToken: token.token,
            refreshToken,
        };
    }
}