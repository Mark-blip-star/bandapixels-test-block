import { Router } from 'express';
import { authCheck } from '../Auth/middleweares/auth.check';
import PostsController from './posts.controller';

const router: Router = Router();

router.post(`/createpost`, authCheck, PostsController.createPost);
router.get(`/getposts`, authCheck, PostsController.findPosts);
router.get(`/getmanyposts`, authCheck, PostsController.findPostsByUserId);
router.get(`/search/:skip/:offset/:searchValue`, authCheck, PostsController.search);

export default router;
