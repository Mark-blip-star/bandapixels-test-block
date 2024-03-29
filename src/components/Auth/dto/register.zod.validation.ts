import { z } from 'zod';
import {IUser} from "./register.user.interface";

export function signDTO (user: IUser) {
    const registerSchema = z.object({
        login:z
            .string()
            .email()
            .min(4)
            .max(25)
            .nonempty(),
        password:z
            .string()
            .nonempty()
            .min(6)
            .max(100),
        name:z
            .string()
            .min(2)
            .max(50)

    })
    const res = registerSchema.safeParse(user)
    if(!res.success) return null
    return res.data
}