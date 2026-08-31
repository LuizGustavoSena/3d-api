import express from "express";
import privateAdminRouters from "./admin/index.router";

const privateRouters = express.Router();

privateRouters.use(privateAdminRouters);

export default privateRouters;