import { CreateUserUseCase } from "../../../../data/use-cases/user/create-user.use-case";
import { factoryEncrypt } from "../../encrypt";
import { factoryUserRepository } from "../../repositories/mysql/user/create";
import { factoryUuid } from "../../uuid";

export function factoryCreateUserUseCase() {
    return new CreateUserUseCase(
        factoryUserRepository(),
        factoryUuid(),
        factoryEncrypt(),
    );
}