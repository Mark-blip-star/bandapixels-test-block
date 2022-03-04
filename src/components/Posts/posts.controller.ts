import { Request, Response } from 'express';
import { ZodPostsValid } from './dto/zod.posts.valid';
import PostsSerivce from './posts.serivce';
import { string } from 'zod';

class PostsController {
  async createPost(req: Request, res: Response) {
    const postValidationData = ZodPostsValid(req.body);
    const AccesToken = req.headers.authorization;

    if (!AccesToken) return res.status(400).json('Invalid token');
    if (postValidationData === false) res.status(400).json('Invalid data');

    const posts = await PostsSerivce.createPost(postValidationData, AccesToken);

    if (!posts) return res.status(400).json('Bad request');

    res.status(200).json('Created succes');
  }

  async findPosts(req: Request, res: Response) {
    const posts = await PostsSerivce.findPosts(req.query);

    if (!posts) return res.status(400).json('Bad Request');
    res.status(200).json(posts);
  }

  async search(req: Request, res: Response) {
    const { skip, offset, searchValue } = req.params;

    const posts = await PostsSerivce.search(+skip, +offset, searchValue);
    if (!posts) return res.status(400).json('Bad Request');
    res.status(200).json(posts);
  }

  async findPostsByUserId(req: Request, res: Response) {
    const posts = await PostsSerivce.findManyPosts(req.query);
    res.status(200).json(posts);
  }
}

export default new PostsController();
