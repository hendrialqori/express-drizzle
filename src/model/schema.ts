import { mysqlTable, varchar, serial, timestamp, text } from 'drizzle-orm/mysql-core';
import { uuid } from '../utils/helpers';
import { time } from 'console';
import { relations } from 'drizzle-orm';

const USERS = "users" as const;
const CREDENTIALS = "credentials" as const

export const users = mysqlTable(USERS, {
    id: varchar("id", { length: 16 }).primaryKey(),
    username: varchar("username", { length: 225 }).notNull(),
    email: varchar("email", { length: 100 }).notNull(),
    password: varchar("password", { length: 225 }).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("update_at").defaultNow()
})

export const usersRelations = relations(users, ({ one }) => ({
    credential: one(credentials),
}));

export const credentials = mysqlTable(CREDENTIALS, {
    id: varchar("id", { length: 16 }).primaryKey(),
    userId: varchar("user_id", { length: 16 }).unique().notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    loginAt: timestamp("login_at").defaultNow()
})

export const credentialsRelations = relations(credentials, ({ one }) => ({
    user: one(users, {
        fields: [credentials.userId],
        references: [users.id]
    })
}))