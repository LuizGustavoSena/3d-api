import { JsonWebToken } from "../../../infraestructure/jwt/json-web-token";

export function factoryJwt() {
    return new JsonWebToken();
}