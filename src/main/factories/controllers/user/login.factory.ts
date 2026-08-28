import { LoginUserController } from "../../../controller/user/login.controller";
import { factoryLoginUserUseCase } from "../../use-cases/user/login.factory";

export function factoryLoginUserController() {
    const useCase = factoryLoginUserUseCase();

    return new LoginUserController(useCase);
}