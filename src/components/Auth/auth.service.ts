import { IUser } from "./dto/register.user.interface";
import UserModel from "../User/models/user.model";
import TokenService from "../JWT/token.service";
import { compare } from "bcrypt";

class AuthService {
  async login(user: IUser) {
    const { login, password } = user;
    const candidate = await UserModel.findOne({ login }).exec();

    if (!candidate) return { status: 200, message: "The user is not found" };

    const checkingResponse = await this.checkPassword(
      password,
      candidate.password
    );

    if (!checkingResponse)
      return { status: 400, message: "The password is false" };

    const tokens = await TokenService.generateTokens(user);
    await TokenService.saveRefreshToken(tokens.RefToken, candidate._id);

    return {
      RefreshToken: tokens.RefToken,
      AccesToken: tokens.AccToken,
      status: 200,
      message: "The login is the login is successful",
    };
  }

  async logout(RefreshToken: string) {
    const token = await TokenService.removeTokenFromDB(RefreshToken);
    return token;
  }

  private async checkPassword(password: string, hash: string) {
    return await compare(password, hash);
  }
}

export default new AuthService();
