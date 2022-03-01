import * as jwt from "jsonwebtoken";
import { env } from "../../config/env/env.config";
import TokenModel, { JWT } from "./models/jwt.refresh.model";

class tokenService {
  async generateTokens(payload: {}) {
    const AccToken = jwt.sign(payload, env.JWT_ACCES_SECRET, {
      expiresIn: "2h",
    });
    const RefToken = jwt.sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: "25d",
    });

    return {
      AccToken,
      RefToken,
    };
  }

  async saveRefreshToken(RefreshToken: string, userID: string) {
    const findToken = await TokenModel.findOne({ user: userID }).exec();
    if (findToken) {
      findToken.tokenData = RefreshToken;
      await findToken.save();
    }
    await TokenModel.create({ tokenData: RefreshToken, user: userID });
  }

  async removeTokenFromDB(RefreshToken: string) {
    const token = await TokenModel.deleteOne({
      tokenData: RefreshToken,
    });
    return token;
  }

  async validateAccesToken(accesToken: string) {
    const token = await jwt.verify(accesToken, env.JWT_ACCES_SECRET);
    if (!token) return { status: 400, message: "Invalid Acces Token" };
    return true;
  }

  async validateRefreshToken(refreshToken: string) {
    const token = await jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
    if (!token) return { status: 400, message: "Invalid Acces Token" };

    const candidate = TokenModel.findOne({ tokenData: refreshToken });
    if (!candidate) return { status: 400, message: "Invalid Refresh Token" };

    return { status: 200, message: "Verify compleate" };
  }

  async findTokenInDb(refreshToken: string) {
    const candidate: JWT | null = await TokenModel.findOne({
      tokenData: refreshToken,
    }).exec();
    return candidate;
  }

  async findAndRemoveToken(user: string) {
    const candidate = await TokenModel.findOneAndDelete({ user }).exec();
    if (candidate) {
      await candidate.delete();
    }
    return candidate;
  }
}

export default new tokenService();
