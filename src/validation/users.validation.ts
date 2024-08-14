import { ZodType, z } from "zod";

export class UsersValidation {
    static readonly GET: ZodType = z.object({
        id: z.number().nonnegative("Id cannot with negative number")
    })
}