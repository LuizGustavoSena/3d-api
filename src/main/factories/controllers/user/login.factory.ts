import { LoginUserController } from "../../../controller/user/login";
import { factoryLoginUserUseCase } from "../../use-cases/user/login.factory";

export function factoryLoginUserController() {
    const useCase = factoryLoginUserUseCase();

    return new LoginUserController(useCase);
}