import { LoginUserUseCase } from "../../../../data/use-cases/user/login-user.use-case";
import { factoryEncrypt } from "../../encrypt/index..factory";
import { factoryJwt } from "../../jwt/index.factory.";
import { factoryUserRepository } from "../../repositories/mysql/user/create.factory.";
import { factoryUuid } from "../../uuid/index.factory";

export function factoryLoginUserUseCase() {
    const userRepository = factoryUserRepository();
    const encrypt = factoryEncrypt();
    const jwt = factoryJwt();
    const uuid = factoryUuid();

    return new LoginUserUseCase(userRepository, encrypt, jwt, uuid);
}