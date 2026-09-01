import { privateAdminRouterMiddleware } from "../../middlewares/private-admin-router.middleware";
import { factoryUserRepository } from "../repositories/mysql/user/create.factory.";

export function factoryPrivateAdminRouterMiddleware() {
    const userRepository = factoryUserRepository();

    return privateAdminRouterMiddleware(userRepository);
}
