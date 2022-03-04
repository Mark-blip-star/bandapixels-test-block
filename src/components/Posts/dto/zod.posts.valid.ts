import { z } from 'zod';
import { PostsInterface } from './posts.interface';

export function ZodPostsValid(postData: PostsInterface): any {
  const Schema = z.object({
    title: z.string().min(1).max(200).nonempty(),
    description: z.string().min(1).max(2000).nonempty(),
  });

  const res = Schema.safeParse(postData);
  if (!res.success) return false;
  return res.data;
}
