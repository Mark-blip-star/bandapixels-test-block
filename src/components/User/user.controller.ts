import { Request, Response } from 'express';
import { signDTO } from '../Auth/dto/register.zod.validation';
import UserService from './user.service';

class userController {
  async register(req: Request, res: Response): Promise<any> {
    const userData = signDTO(req.body);
    if (!userData) return res.status(400).json({ Error: 'Invalid user Data' });

    const user = await UserService.createUser(userData);
    if (!user.tokens) return res.status(400).json('The user is alredy exists');

    res.cookie('RefreshToken', user.tokens.RefToken, {
      maxAge: 25 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(user.status).json(`${user.message}  ${user.tokens.AccToken}`);
  }
}

export default new userController();
