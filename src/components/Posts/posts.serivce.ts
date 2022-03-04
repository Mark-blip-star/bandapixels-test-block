import { PostsInterface } from './dto/posts.interface';
import PostsModel from './models/posts.model';
import TokenService from '../JWT/token.service';

enum StringSortParam {
  ASC = 'asc',
  DESC = `desc `,
}
class PostsSerivce {
  async createPost(data: PostsInterface, token: string) {
    const DECODE_TOKEN = await TokenService.decodeToken(token);

    if (DECODE_TOKEN === false) return { status: 400, message: 'Invalid Token' };

    data.user = DECODE_TOKEN._id;

    const post = await PostsModel.create(data);
    if (!post) return { status: 400, message: 'Error to create' };

    return post;
  }

  private StringSortParamToNumber = { [StringSortParam.ASC]: 1, [StringSortParam.DESC]: -1 };

  async findPosts(params: any) {
    let { skip, offset, createdAt, userid = '' } = params;
    createdAt === 'ASC' ? (createdAt = 1) : (createdAt = -1);
    if (userid === '') {
      return await PostsModel.find().limit(offset).skip(skip).sort({ createdAt });
    }

    return await PostsModel.find({ $or: [{ user: userid }] })
      .limit(offset)
      .skip(skip)
      .sort({ createdAt });
  }

  async search(skip: number = 0, offset: number = 30, searchValue: string) {
    const token = await PostsModel.find({ title: { $regex: searchValue } })
      .limit(offset)
      .skip(skip)
      .sort({ createdAt: 1 });

    return token;
  }

  async findManyPosts(params: any) {
    let { skip, offset, createdAt, userid = '' } = params;

    createdAt === 'ASC' ? (createdAt = 1) : (createdAt = -1);
    if (userid === '')
      return await PostsModel.find()
        .limit(offset)
        .skip(skip)
        .sort({ createdAt: this.StringSortParamToNumber[createdAt] });

    return await PostsModel.find({ user: { $in: userid } });
  }
}

export default new PostsSerivce();
