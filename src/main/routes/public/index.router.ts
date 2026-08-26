import express from "express";
import { publicUserRouter } from "./user/index.router";

const publicRouters = express.Router();

publicRouters.use('/user', publicUserRouter);

export default publicRouters;