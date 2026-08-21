import express from "express";
import { publickUserRouter } from "./user/index.router";

const publicRouters = express.Router();

publicRouters.use('/user', publickUserRouter);

export default publicRouters;