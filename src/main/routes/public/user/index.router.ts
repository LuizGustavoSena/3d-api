import express from "express";
import { factoryCreateUserController } from "../../../factories/controllers/user/create.factory";
import { factoryController } from "../../../factories/controllers/index.factory";

const router = express.Router();

router.use('/user');

router.post('/create', factoryController(factoryCreateUserController()));

export default router;