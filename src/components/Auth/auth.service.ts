import { IUser } from "./dto/register.user.interface";
import UserModel from "../User/models/user.model";
import TokenService from "../JWT/token.service";
import { compare } from "bcrypt";
import { JWT } from "../JWT/models/jwt.refresh.model";
import tokenModel from "../JWT/models/jwt.refresh.model";
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

    const removeToken = TokenService.findAndRemoveToken(
      candidate._id.toString()
    );
    if (!removeToken) return { status: 400, message: "bad request" };
    const tokens = await TokenService.generateTokens(user);
    await TokenService.saveRefreshToken(tokens.RefToken, candidate._id);

    return {
      RefreshToken: tokens.RefToken,
      AccToken: tokens.AccToken,
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

  async refresh(RefreshToken: string) {
    const validateResult = await TokenService.validateRefreshToken(
      RefreshToken
    );
    const tokenFromDB: JWT | null = await TokenService.findTokenInDb(
      RefreshToken
    );

    if (!validateResult || !tokenFromDB) {
      return { status: 400, message: "Invalid Token" };
    }
    const userID = tokenFromDB.user.toString();
    const tokens = await TokenService.generateTokens({ userID });
    await TokenService.saveRefreshToken(tokens.RefToken, userID);

    return {
      RefreshToken: tokens.RefToken,
      AccesToken: tokens.AccToken,
      status: 200,
      message: "Tokens generation is ok",
    };
  }
}

export default new AuthService();
