import { Request, Response } from "express";
import { ZodPostsValid } from "./dto/zod.posts.valid";
import { PostsInterface } from "./dto/posts.interface";
import PostsSerivce from "./posts.serivce";

class PostsController {
  async createPost(req: Request, res: Response) {
    const postValidationData: PostsInterface | null = ZodPostsValid(req.body);
    if (!postValidationData) res.status(400).json("Invalid data");

    const posts = await PostsSerivce.createPost(postValidationData);
    if (!posts) return res.status(400).json("Bad request");

    res.status(200).json("Created succes");
  }
}

export default new PostsController();
