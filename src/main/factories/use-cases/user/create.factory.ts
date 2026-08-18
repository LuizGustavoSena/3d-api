import { CreateUserUseCase } from "../../../../data/use-cases/user/create-user.use-case";
import { factoryEncrypt } from "../../encrypt/index..factory";
import { factoryUserRepository } from "../../repositories/mysql/user/create.factory.";
import { factoryUuid } from "../../uuid/index.factory";

export function factoryCreateUserUseCase() {
    return new CreateUserUseCase(
        factoryUserRepository(),
        factoryUuid(),
        factoryEncrypt(),
    );
}