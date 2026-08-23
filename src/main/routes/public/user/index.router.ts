import express from "express";
import { factoryCreateUserController } from "../../../factories/controllers/user/create.factory";
import { factoryController } from "../../../factories/controllers/index.factory";
import { factoryLoginUserController } from "../../../factories/controllers/user/login.factory";

const publickUserRouter = express.Router();

publickUserRouter.post('/create', factoryController(factoryCreateUserController()));
publickUserRouter.post('/login', factoryController(factoryLoginUserController()));

export { publickUserRouter };