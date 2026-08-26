import express from "express";
import { factoryCreateUserController } from "../../../factories/controllers/user/create.factory";
import { factoryController } from "../../../factories/controllers/index.factory";
import { factoryLoginUserController } from "../../../factories/controllers/user/login.factory";

const publicUserRouter = express.Router();

publicUserRouter.post('/create', factoryController(factoryCreateUserController()));
publicUserRouter.post('/login', factoryController(factoryLoginUserController()));

export { publicUserRouter };