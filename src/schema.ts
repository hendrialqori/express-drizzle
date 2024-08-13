import { mysqlTable, varchar, serial } from 'drizzle-orm/mysql-core';

export const users = mysqlTable("users", {
    id: serial("id").primaryKey().autoincrement(),
    username: varchar("username", { length: 225 }).notNull(),
    email: varchar("email", { length: 100 }).notNull(),
    password: varchar("password", { length: 225 }).notNull(),
    salt: varchar("salt", { length: 225 }),
    sessionToken: varchar("sessionToken", { length: 225 })
})
