import { eq, param } from 'drizzle-orm'
import { db } from '../model/db'
import { users as usersTable } from '../model/schema'
import type { User } from '../types'
import radash from 'radash'
import { ResponseError } from '../utils/response-error'

class UserService {
    static async list() {
        const users = await db
            .select({ id: usersTable.id, username: usersTable.username, email: usersTable.email })
            .from(usersTable)

        return users
    }

    static async get(id: number) {

        const users = await db
            .select({ id: usersTable.id, username: usersTable.username, email: usersTable.email })
            .from(usersTable)
            .where(eq(usersTable.id, id))

        const user = users[0]

        if (!radash.isObject(user)) throw new ResponseError(404, `User not found with id ${id}`)
        return user
    }

    static async update(id: number, updateUser: User) {


        await db.update(usersTable)
            .set(updateUser)
            .where(eq(usersTable.id, id))
    }

    static async remove(id: number) {
        // check are there user ?
        await UserService.get(id)
        // if exist, remove it from db
        await db.delete(usersTable)
            .where(eq(usersTable.id, id))
    }

}

export default UserService