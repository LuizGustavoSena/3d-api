import express from "express";
import { factoryAuthMiddleware } from "../../factories/middlewares/auth.factory";
import privateAdminRouters from "./admin/index.router";

const privateRouters = express.Router();

privateRouters.use(factoryAuthMiddleware());
privateRouters.use(privateAdminRouters);

export default privateRouters;