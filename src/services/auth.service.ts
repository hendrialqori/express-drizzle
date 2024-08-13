import { eq } from "drizzle-orm";
import { db } from "../model/db";
import { users as usersTable } from "../model/schema";
import { Validation } from "../validation/validation";
import { AuthValidation } from "../validation/auth.validation";
import { ResponseError } from "../utils/response-error";
import { type InsertUser } from "../types";
import { authentication, random } from "../utils/helpers";

export default class AuthService {

    static async register(request: InsertUser) {

        const registerRequest = Validation.validate(AuthValidation.REGISTER, request)

        const checkEmail = await AuthService.checkEmailAlreadyExists(registerRequest.email)
        const checkUsername = await AuthService.checkUsernameAlreadyExists(registerRequest.username)

        if (checkUsername.length) {
            throw new ResponseError(400, "Username already exists!")
        }
        if (checkEmail.length) {
            throw new ResponseError(400, "Email already exists!")
        }

        const salt = random()

        const user = {
            username: registerRequest.username,
            email: registerRequest.email,
            salt,
            password: authentication(salt, registerRequest.password)
        }

        const insertNewUser =
            await db
                .insert(usersTable)
                .values(user)
                .$returningId()

        return { ...insertNewUser[0], ...registerRequest }
    }

    private static async checkEmailAlreadyExists(email: string) {
        return await db.select().from(usersTable).where(eq(usersTable.email, email))
    }

    private static async checkUsernameAlreadyExists(username: string) {
        return await db.select().from(usersTable).where(eq(usersTable.username, username))
    }
}