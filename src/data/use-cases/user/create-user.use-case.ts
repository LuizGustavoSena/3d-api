import { UnprocessedEmailError } from "../../../domain/errors/user/unprocessed-email.error";
import { RequestCreateUser, ResponseCreateUser } from "../../../domain/use-cases/user/create-user.use-case.interface";
import { IUsecase } from "../../../domain/use-cases/use-cases.interface";
import { IEncrypt } from "../../protocols/encrypt";
import { IUserRepository } from "../../protocols/repositories/user";
import { IUuid } from "../../protocols/uuid";

export class CreateUserUseCase implements IUsecase<RequestCreateUser, ResponseCreateUser> {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly uuid: IUuid,
        private readonly encrypt: IEncrypt,
    ){};
    
    async execute(params: RequestCreateUser): Promise<ResponseCreateUser> {
        const { email } = params;

        const user = await this.userRepository.findByEmail(email);

        if (!!user)
            throw new UnprocessedEmailError();

        const userId = this.uuid.generate();

        await this.userRepository.create({
            id: userId,
            email,
            password: this.encrypt.encrypt(params.password),
            username: params.username,
            birthdate: params.birthdate,
            levelAccess: 1
        });

        return { id: userId };
    }
}