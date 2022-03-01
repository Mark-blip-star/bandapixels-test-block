import { Router } from "express";
import { authCheck } from "../Auth/middleweares/auth.check";
import PostsController from "./posts.controller";

const router: Router = Router();

router.post(`/createPost`, authCheck, PostsController.createPost);

export default router;
