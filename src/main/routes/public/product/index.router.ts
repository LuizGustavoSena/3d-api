import express from "express";
import { factoryController } from "../../../factories/controllers/index.factory";
import { factoryFindAllProductsController } from "../../../factories/controllers/product/find-all.factory";

const publicProductRouter = express.Router();

publicProductRouter.get('/', factoryController(factoryFindAllProductsController()));

export { publicProductRouter };
