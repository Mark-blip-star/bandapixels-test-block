import { Request, Response } from "express";

class JWTController {
  async(req: Request, res: Response) {
    const authHeader = req.headers.authorization;
  }
}

export default new JWTController();
