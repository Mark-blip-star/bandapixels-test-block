import { Schema, Document, Types } from 'mongoose';
import { connection } from '../../../config/connection/connection';

export interface PostsInterface extends Document {
  title: string;
  description: string;
  user: Types.ObjectId;
}

const posts = new Schema<PostsInterface>(
  {
    title: {
      type: String,
      index: true,
    },
    description: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

posts.index({ title: 'text', description: 'text' });

export default connection.model<PostsInterface>('Posts', posts);
