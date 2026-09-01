import express from "express";
import { privateAdminProductRouter } from "./product/create.router";
import { factoryPrivateAdminRouterMiddleware } from "../../../factories/middlewares/private-admin-router.factory";

const privateAdminRouters = express.Router();

privateAdminRouters.use(factoryPrivateAdminRouterMiddleware());
privateAdminRouters.use('/product', privateAdminProductRouter);

export default privateAdminRouters;