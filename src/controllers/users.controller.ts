import type { NextFunction, Request, Response } from 'express'
import { db } from '../model/db'
import UserService from '../services/users.service'
import { winstonLogger } from '../utils/helpers'
import radash from 'radash'
import { ResponseError } from '../utils/response-error'

export default class UsersController {

    static async list(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserService.list()
            return res.status(200)
                .json({ data: users, message: "Successfully" })

        } catch (error) {
            next(error)
        }

    }
    static async get(req: Request, res: Response, next: NextFunction) {
        const params = req.params as unknown as { id: number }
        try {
            const user = await UserService.get(params.id)
            return res.status(200)
                .json({ data: user, message: "Successfully" })

        } catch (error) {
            next(error)
        }

    }



    static async remove(req: Request, res: Response, next: NextFunction) {
        const params = req.params as unknown as { id: number }
        try {
            await UserService.remove(params.id)
            return res.status(200)
                .json({ data: null, message: `Successfully remove user with id ${params.id}` })

        } catch (error) {
            next(error)
        }
    }
}