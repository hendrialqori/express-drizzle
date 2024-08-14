import { z, ZodType } from "zod";

export class AuthValidation {
    static readonly REGISTER: ZodType = z.object({
        username: z.string().min(1).max(225).regex(/^[^\s]+(\s+[^\s]+)*$/),
        email: z.string().email().max(100),
        password: z.string().min(1).max(225)
    })

    static readonly LOGIN: ZodType = z.object({
        email: z.string().email().max(100),
        password: z.string().min(1).max(225)
    })
}