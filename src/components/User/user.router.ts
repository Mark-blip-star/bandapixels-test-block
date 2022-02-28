import { Router } from "express";
import userController from "./user.controller";

const router: Router = Router();

router.post(`/register`, userController.register);

export default router;
