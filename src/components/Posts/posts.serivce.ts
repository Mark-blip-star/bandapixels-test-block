import { PostsInterface } from "./dto/posts.interface";
import PostsModel from "./models/posts.model";

class PostsSerivce {
  async createPost(data: PostsInterface | null) {
    const post = await PostsModel.create(data);
    if (!post) return { status: 400, message: "Error to create" };

    return post;
  }
}

export default new PostsSerivce();
