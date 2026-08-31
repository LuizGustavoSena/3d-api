import { authMiddleware } from "../../middlewares/auth.middleware";
import { factoryJwt } from "../jwt/index.factory.";

export function factoryAuthMiddleware() {
    const jwt = factoryJwt();

    return authMiddleware(jwt);
}
