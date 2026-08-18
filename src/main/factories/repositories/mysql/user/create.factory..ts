import { factoryMysqlRepository } from "../index.factory.";
import { UserRepository } from "../../../../../infraestructure/repositories/mysql/user/user.repository";

export function factoryUserRepository() {
    return new UserRepository(factoryMysqlRepository());
}