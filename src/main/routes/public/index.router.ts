import express from "express";
import { publicUserRouter } from "./user/index.router";
import { publicProductRouter } from "./product/index.router";

const publicRouters = express.Router();

publicRouters.use('/user', publicUserRouter);
publicRouters.use('/product', publicProductRouter);

export default publicRouters;