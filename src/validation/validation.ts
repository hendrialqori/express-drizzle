import { ZodType } from "zod";

export class Validation {
    static validate<T extends {}>(schema: ZodType, data: T): T {
        return schema.parse(data)
    }
}