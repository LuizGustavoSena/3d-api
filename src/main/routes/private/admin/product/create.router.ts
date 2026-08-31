import express from "express";
import { factoryController } from "../../../../factories/controllers/index.factory";
import { factoryCreateProductController } from "../../../../factories/controllers/product/create.factory";

const privateAdminProductRouter = express.Router();

privateAdminProductRouter.post('/create', factoryController(factoryCreateProductController()));

export { privateAdminProductRouter };