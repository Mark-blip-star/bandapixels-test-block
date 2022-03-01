import { Schema, Document } from "mongoose";
import { connection } from "../../../config/connection/connection";

export interface PostsInterface extends Document {
  title: string;
  description: string;
}

const posts = new Schema<PostsInterface>({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
});

posts.set(`timestamps`, true);
export default connection.model<PostsInterface>("Posts", posts);
