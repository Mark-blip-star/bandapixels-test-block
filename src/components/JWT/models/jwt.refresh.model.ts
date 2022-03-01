import { Schema, model, Document, Types } from "mongoose";
import { connection } from "../../../config/connection/connection";

export interface JWT extends Document {
  tokenData: string;
  user: Types.ObjectId;
  _id: string;
}

const jwt = new Schema<JWT>({
  tokenData: {
    type: String,
    unique: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});
jwt.set(`timestamps`, true);

export default connection.model<JWT>("tokens", jwt);
