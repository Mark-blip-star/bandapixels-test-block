import {signDTO} from "./dto/register.zod.validation"
import AuthService from "./auth.service";
import {Request,Response} from "express"

class AuthController{
    async login(req:Request,res:Response){
        try{
            const {name,login,password} = req.body
            const userData = signDTO({name,login,password})
            if(!userData) return res.json({"Error":"Invalid user Data"})
            const userLogin = await AuthService.login(userData)
            return res.status(userLogin.status).json(`${userLogin.message}`)
        }catch(e){
            throw e
        }
    }

    async logout(req:Request,res:Response){
        try{
            // const bearerHeader: string = req.headers['authorization'] || '';
            // if(!bearerHeader){
            //     res.json({"Error":"User is not auth"})
            // }
            // const bearer:string[] = bearerHeader.split(` `)
            // await AuthService.logout(bearer[1]);
            res.clearCookie(`RefreshToken`)
            res.json({'Succes':`Logout succes` });
        }catch (e){
            throw e
        }
    }
}

export default new AuthController()