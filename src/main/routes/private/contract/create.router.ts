import express from "express";
import { factoryController } from "../../../factories/controllers/index.factory";
import { factoryCreateContractController } from "../../../factories/controllers/contract/create.factory";

const contractRouter = express.Router();

contractRouter.post('/', factoryController(factoryCreateContractController()));

export { contractRouter };
