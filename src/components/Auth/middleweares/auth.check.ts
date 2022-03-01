import { NextFunction, Request, Response } from "express";
import TokenService from "../../JWT/token.service";
export async function authCheck(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(400).json("Invalid Token");
  const AccesToken = authHeader.split(` `);
  const tokenData = await TokenService.validateAccesToken(AccesToken[1]);
  if (!tokenData) return res.status(400).json("Invalid Token 2");
  next();
}
