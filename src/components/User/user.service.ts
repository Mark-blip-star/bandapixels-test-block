import * as bcrypt from "bcrypt"
import TokenService from "../JWT/token.service";
import {IUser} from "../Auth/dto/register.user.interface";
import UserModel from "./models/user.model";

class UserService{
    async createUser(userDTO:IUser):Promise<any>{
        if(!userDTO) return {status: 400, message: "Bad request"}
        const hashPass:string = await bcrypt.hash(userDTO.password,4)
        const candidate = await UserModel.findOne({login:userDTO.login})

        if(candidate) return {status: 409, message: "The user is already exists"}


        userDTO.password = hashPass
        await UserModel.create(userDTO)
        const tokens = await TokenService.generateTokens(userDTO)

        return {
            status:201,
            message:'The user is created',
            tokens

        }
    }


}

export default new UserService()