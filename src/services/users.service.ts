import { type Request } from 'express'
import { db } from '../model/db'
import { users as usersTable } from '../model/schema'

class UserService {
    static async getAll(request: Request) {
        const users = await db.select({ id: usersTable.id, username: usersTable.username, email: usersTable.email })
            .from(usersTable)

        return users
    }
}

export default UserService