import { Request, type Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../model/db";
import { users as usersTable } from "../model/schema";
import { Validation } from "../validation/validation";
import { AuthValidation } from "../validation/auth.validation";
import { ResponseError } from "../utils/response-error";
import { type InsertUser } from "../types";
import { authentication, random, winstonLogger } from "../utils/helpers";
import UserService from "./users.service";

export default class AuthService {

    static async login(request: Omit<InsertUser, 'username'>, response: Response) {

        const loginRequest = Validation.validate(AuthValidation.LOGIN, request)

        const checkEmail = await AuthService.emailChecker(loginRequest.email)
        if (!checkEmail || !checkEmail.length) {
            throw new ResponseError(404, 'Email not found!')
        }

        const user = checkEmail[0]
        const expectHash = authentication(user.salt, loginRequest.password)
        if (user.password !== expectHash) {
            throw new ResponseError(400, "Wrong password!")
        }

        user.sessionToken = authentication(random(), user.password)

        await UserService.update(user.id, user)

        const oneWeek = 7 * 24 * 3600 * 1000; //1 weeks

        response.cookie(process.env.SESSION_NAME, user.sessionToken, {
            domain: process.env.DOMAIN,
            path: "/",
            expires: new Date(Date.now() + oneWeek),
            httpOnly: true,
            secure: true,
        })

    }

    static async register(request: InsertUser) {

        const registerRequest = Validation.validate(AuthValidation.REGISTER, request)

        const checkEmail = await AuthService.emailChecker(registerRequest.email)
        const checkUsername = await AuthService.usernameChecker(registerRequest.username)

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

    static async logout(request: Request, response: Response) {

        const session_name = process.env.SESSION_NAME
        const session = request.cookies[session_name]

        const sessionChecker = await AuthService.sessionTokenChecker(session)
        const users = sessionChecker

        if (!users || !users.length) {
            throw new ResponseError(404, "User not found")
        }

        const currentUSer = users[0]
        currentUSer.sessionToken = null

        await UserService.update(currentUSer.id, currentUSer)

        response.clearCookie(session_name, {
            domain: process.env.DOMAIN,
            path: "/",
        })

    }

    private static async emailChecker(email: string) {
        return await db.select().from(usersTable).where(eq(usersTable.email, email))
    }

    private static async usernameChecker(username: string) {
        return await db.select().from(usersTable).where(eq(usersTable.username, username))
    }

    static async sessionTokenChecker(sessionToken: string) {
        return await db.select().from(usersTable).where(eq(usersTable.sessionToken, sessionToken))
    }
}