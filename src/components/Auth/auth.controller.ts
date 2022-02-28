import { signDTO } from "./dto/register.zod.validation";
import AuthService from "./auth.service";
import { Request, Response } from "express";

class AuthController {
  async login(req: Request, res: Response) {
    const userData = signDTO(req.body);
    if (!userData) return res.status(401).json({ Error: "Invalid user Data" });
    const userLogin = await AuthService.login(userData);
    if (!userLogin) res.status(400).json("Login error");
    res.cookie("RefreshToken", userLogin.RefreshToken, {
      maxAge: 25 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return res.status(userLogin.status).json(`${userLogin.message}`);
  }

  async logout(req: Request, res: Response) {
    const { RefreshToken } = req.cookies;
    if (!RefreshToken) return res.status(400).json("Invalid session");

    const deleteToken = await AuthService.logout(RefreshToken);
    res.clearCookie("RefreshToken");
    res.status(200).json(deleteToken);
  }
}

export default new AuthController();
