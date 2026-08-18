import { CreateUserController } from "../../../controller/user/create";
import { factoryCreateUserUseCase } from "../../use-cases/user/create.factory";

export function factoryCreateUserController() {
    const useCase = factoryCreateUserUseCase();

    return new CreateUserController(useCase);
}