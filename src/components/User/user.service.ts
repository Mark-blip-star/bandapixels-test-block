import * as bcrypt from "bcrypt";
import TokenService from "../JWT/token.service";
import { IUser } from "../Auth/dto/register.user.interface";
import UserModel from "./models/user.model";

class UserService {
  async createUser(userDTO: IUser): Promise<any> {
    const { login, password, name } = userDTO;
    const hashPass = await bcrypt.hash(password, 4);
    const candidate = await UserModel.findOne({ login });

    if (candidate)
      return { status: 409, message: "The user is already exists" };

    const user = await UserModel.create({ name, login, password: hashPass });

    if (!user) return { status: 300, message: "SomeThink won't wrong" };

    const tokens = await TokenService.generateTokens({ login, id: user._id });
    await TokenService.saveRefreshToken(tokens.RefToken, user._id);

    return {
      status: 201,
      message: "The user is created",
      tokens,
    };
  }
}

export default new UserService();
