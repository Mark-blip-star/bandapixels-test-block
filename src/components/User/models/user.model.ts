import {Schema,model} from "mongoose";
import {connection} from "../../../config/connection/connection";
import {IUser} from "../../Auth/dto/register.user.interface";

const user = new Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    login: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true
    }
})

export default connection.model('User',user)