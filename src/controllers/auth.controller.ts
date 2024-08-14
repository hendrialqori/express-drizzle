import { type Request, Response, NextFunction } from "express";
import AuthService from "../services/auth.service";
import { type InsertUser } from "../types";


export default class AuthController {

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as InsertUser
            const response = await AuthService.register(request)

            return res
                .status(200)
                .json({ data: response, message: "Successfully add new user:)" })

        } catch (error) {
            next(error)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request = req.body as Omit<InsertUser, 'username'>
            await AuthService.login(request, res)

            return res.status(200)
                .json({ message: "Login successfully!" })

        } catch (error) {
            next(error)
        }
    }

    static async logout(req: Request, res: Response, next: NextFunction) {
        try {
            await AuthService.logout(req, res)
            return res.sendStatus(200)

        } catch (error) {
            next(error)
        }
    }
}