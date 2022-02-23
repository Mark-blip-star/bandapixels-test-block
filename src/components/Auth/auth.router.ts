import {Router} from "express";
import AuthController from "./auth.controller";

const router:Router = Router()

router.post(`/register`,AuthController.register)
router.post(`/login`,AuthController.login())
router.delete(`/logout`,AuthController.logout())