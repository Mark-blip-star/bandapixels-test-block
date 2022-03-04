import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { env } from '../../config/env/env.config';
import TokenModel, { JWT } from './models/jwt.refresh.model';
import jwtDecode from 'jwt-decode';

class tokenService {
  async generateTokens(payload: {}) {
    const AccToken = sign(payload, env.JWT_ACCES_SECRET, {
      expiresIn: '2h',
    });
    const RefToken = sign(payload, env.JWT_REFRESH_SECRET, {
      expiresIn: '25d',
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
    const token = await verify(accesToken, env.JWT_ACCES_SECRET);

    if (!token) return { status: 400, message: 'Invalid Acces Token' };
    return true;
  }

  async validateRefreshToken(refreshToken: string) {
    const token = await verify(refreshToken, env.JWT_REFRESH_SECRET);
    if (!token) return { status: 400, message: 'Invalid Acces Token' };

    const candidate = TokenModel.findOne({ tokenData: refreshToken });
    if (!candidate) return { status: 400, message: 'Invalid Refresh Token' };

    return { status: 200, message: 'Verify compleate' };
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

  async decodeToken(token: string) {
    if (token === undefined) return false;
    const decode: any = jwtDecode(token);
    return decode;
  }

  async decodeToken2(token: string) {
    const some = token.split(` `);
    const sss = some[1];
    const { id, login } = (await verify(sss, env.JWT_ACCES_SECRET)) as JwtPayload;
    console.log(id, login);
  }
}

export default new tokenService();
