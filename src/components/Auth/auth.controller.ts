import {signDTO} from "./dto/register.zod.validation"
import {IUser} from "./dto/register.user.interface";
import UserService from "../User/user.service"
import {Request,Response} from "express"

class AuthController{
    async register(req:Request,res:Response):Promise<any>{
        const {name,login,password}:any = req.body
        const userData = signDTO({name,login,password})
        if(!userData) return null
        const user: IUser| null=  await UserService.createUser(userData);
        if(!user){
           res.status(400)
        }
        res.status(200).json({status:200,message:'User created'})

    }

    async login(){

    }

    async logout(){

    }
}

export default new AuthController()