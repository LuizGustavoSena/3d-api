import express from "express";
import { factoryCreateUserController } from "../../../factories/controllers/user/create.factory";
import { factoryController } from "../../../factories/controllers/index.factory";

const publickUserRouter = express.Router();

publickUserRouter.post('/create', factoryController(factoryCreateUserController()));

export { publickUserRouter };