import express from "express";
import { factoryAuthMiddleware } from "../../factories/middlewares/auth.factory";
import privateAdminRouters from "./admin/index.router";
import { contractRouter } from "./contract/create.router";

const privateRouters = express.Router();

privateRouters.use(factoryAuthMiddleware());

privateRouters.use(privateAdminRouters);

privateRouters.use('/contract', contractRouter);

export default privateRouters;