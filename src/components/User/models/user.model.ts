import { Schema, model, Document } from "mongoose";
import { connection } from "../../../config/connection/connection";
import { IUser } from "../../Auth/dto/register.user.interface";

export interface IUserModel extends Document {
  name: string;
  login: string;
  password: string;
}

const user = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  login: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

user.set(`timestamps`, true);

export default connection.model<IUserModel>("User", user);
