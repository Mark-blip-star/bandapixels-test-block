import {Request, Response} from "express";
import {signDTO} from "../Auth/dto/register.zod.validation";
import UserService from "./user.service";

class userController{
    async register(req:Request,res:Response):Promise<any>{
        try{
            const {name,login,password} = req.body
            const userData = signDTO({name,login,password})
            if(!userData) return res.json({"Error":"Invalid user Data"})
            const user =  await UserService.createUser(userData);

            res.status(user.status).json(`${user.message}`)
        }catch (e){
            throw e
        }

    }
}

export default new userController()