import PublicUserRouter from "./user/index.router";
import express from "express";

const publicRouters = express.Router();

publicRouters.use(PublicUserRouter);

export default publicRouters;