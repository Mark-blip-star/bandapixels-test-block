import {IUser} from "./dto/register.user.interface";
import UserModel from "../User/models/user.model";
import TokenService from "../JWT/token.service";
import {compare} from "bcrypt"


class AuthService{
    async login(user:IUser) {
        const candidate = await UserModel.findOne({login: user.login})

        if (!candidate) {
            return {status: 200, message: "The user is not found"}
        }

        const checkingResponse = await this.checkPassword(user.password, candidate.password);

        if (!checkingResponse) return {status: 400, message: "The password is false"};

        const tokens = await TokenService.generateTokens(user);

        return {status: 200, message: "The login is the login is successful",tokens}
    }

    private async checkPassword(password: string, hash: string) {
        return await compare(password, hash)
    }

    async logout(user:string){
        return true
    }

}

export default new AuthService()