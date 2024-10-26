import { type MySqlColumn } from "drizzle-orm/mysql-core";
import { DrizzleError, eq, } from "drizzle-orm";
import bcrypt from "bcrypt"

import { db } from "../model/db";
import { users as usersTable, credentials as credentialsTable } from "../model/schema";

import { Validation } from "../validation/validation";
import { AuthValidation } from "../validation/auth.validation";
import { ResponseError } from "../utils/response-error";

import type { InsertUser, InsertCredential } from "../@types";
import { Request } from "express";
import { DrizzleErrorResponse } from "../@types/drizzle";
import { uuid } from "../utils/helpers";


export default class AuthService {

    static async login(req: Request) {

        const request = req.body as Omit<InsertUser, 'email'>
        const loginRequest = Validation.validate(AuthValidation.LOGIN, request)

        const [currentUser] = await AuthService.selectUserIfExists(
            usersTable.username, loginRequest.username
        )

        if (!currentUser) {
            throw new ResponseError(404, 'User not found!')
        }

        const passwordCheck = await bcrypt.compare(
            loginRequest.password, currentUser.password
        )

        if (!passwordCheck) {
            throw new ResponseError(400, "Wrong password!")
        }

        // Create Credential
        const credentialPayload: InsertCredential = {
            id: uuid(),
            userId: currentUser.id
        }
        try {
            await db
                .insert(credentialsTable)
                .values(credentialPayload)

        } catch (error) {

            const duplicateError = "ER_DUP_ENTRY"
            const drizzleError = error as DrizzleErrorResponse

            if (drizzleError.code === duplicateError) {
                throw new ResponseError(403, "You has logged")
            }
        }

        return { username: currentUser.username }
    }

    static async register(request: InsertUser) {
        const registerRequest = Validation.validate(AuthValidation.REGISTER, request)

        const [userByName] = await AuthService.selectUserIfExists(
            usersTable.username, registerRequest.username
        )
        const [userByEmail] = await AuthService.selectUserIfExists(
            usersTable.email, registerRequest.email
        )

        if (userByName) {
            throw new ResponseError(400, "Username already exists!")
        }
        if (userByEmail) {
            throw new ResponseError(400, "Email already exists!")
        }

        const genSalt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(registerRequest.password, genSalt)

        const payload: InsertUser = {
            id: uuid(),
            username: registerRequest.username,
            email: registerRequest.email,
            password: hashPassword
        }

        const [newUser] =
            await db
                .insert(usersTable)
                .values(payload)
                .$returningId()

        return { ...newUser, ...registerRequest }
    }


    private static async selectUserIfExists(columTable: MySqlColumn, columnSelect: string) {
        return await db.
            select()
            .from(usersTable)
            .where(eq(columTable, columnSelect))
    }

}