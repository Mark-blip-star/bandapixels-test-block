import * as jwt from "jsonwebtoken";
import { env } from "../../config/env/env.config";
import TokenModel from "./models/jwt.refresh.model";

class tokenService {
  async generateTokens(payload: {}) {
    const AccToken = jwt.sign(payload, env.JWT_ACCES_SECRET, {
      expiresIn: "10m",
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
}

export default new tokenService();
