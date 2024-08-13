import type { NextFunction, Request, Response } from 'express'
import { db } from '../model/db'
import UserService from '../services/users.service'

export default class UsersController {

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            // const users = await UserService.getAll()
            return res.status(200).json({ status: 200, message: "Successfully" })

        } catch (error) {
            next(error)
        }

    }
}