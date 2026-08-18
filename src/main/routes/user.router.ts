import express from "express";
import { factoryCreateUser, factoryCreateUserController } from "../factories/controllers/user/create.factory";

const router = express.Router();

router.post('/create_account', factoryCreateUserController());

export default router;