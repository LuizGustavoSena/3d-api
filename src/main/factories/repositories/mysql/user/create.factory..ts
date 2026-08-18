import { factoryMysqlRepository } from "..";
import { UserRepository } from "../../../../../infraestructure/repositories/mysql/user/user.repository";

export function factoryUserRepository() {
    return new UserRepository(factoryMysqlRepository());
}