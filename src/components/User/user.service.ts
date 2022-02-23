import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

class UserService{
    async createUser(userDTO){
        if(!userDTO) return null
        const hashPass:string = bcrypt.hash(userDTO.password,4)

    }


}

export default new UserService()