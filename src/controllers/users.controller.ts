import type { NextFunction, Request, Response } from 'express'
import UserService from '../services/users.service'

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

    static async credentials(req: Request, res: Response, next: NextFunction) {
        try {
            const users = await UserService.credentials()
            return res.status(200)
                .json({ data: users, message: "Successfully" })

        } catch (error) {
            next(error)
        }

    }

    static async get(req: Request, res: Response, next: NextFunction) {
        const params = req.params as unknown as { id: string }
        try {
            const user = await UserService.get(params.id)
            return res.status(200)
                .json({ data: user, message: "Successfully" })

        } catch (error) {
            next(error)
        }

    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        const params = req.params as unknown as { id: string }
        try {
            await UserService.remove(params.id)
            return res.status(200)
                .json({ data: null, message: `Successfully remove user with id ${params.id}` })

        } catch (error) {
            next(error)
        }
    }
}