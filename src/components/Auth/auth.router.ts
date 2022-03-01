import { Router } from "express";
import AuthController from "./auth.controller";
import { authCheck } from "./middleweares/auth.check";
const router: Router = Router();

router.post(`/login`, AuthController.login);
router.post(`/refresh`, AuthController.refresh);
router.delete(`/logout`, AuthController.logout);
router.get(`/some`, authCheck, AuthController.some);

export default router;
