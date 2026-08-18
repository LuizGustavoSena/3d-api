import { prisma } from "../../../../infraestructure/repositories/mysql/prisma";

export function factoryMysqlRepository() {
    return prisma;
}