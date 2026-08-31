import express from "express";
import { privateAdminProductRouter } from "./product/create.router";

const privateAdminRouters = express.Router();

privateAdminRouters.use('/product', privateAdminProductRouter);

export default privateAdminRouters;