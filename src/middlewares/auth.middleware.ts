import { Request, Response, NextFunction } from "express";
import { ResponseError } from "../utils/response-error";
import AuthService from "../services/auth.service";

export async function isAuthenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const session_name = process.env.SESSION_NAME
        const session = req.cookies[session_name]

        if (!session) {
            throw new ResponseError(403, "Session has expired!")
        }

        const sessionChecker = await AuthService.sessionTokenChecker(session)
        const user = sessionChecker

        if (!user || !user.length) {
            throw new ResponseError(404, "Forbidden!")
        }

        next()

    } catch (error) {
        next(error)
    }

}