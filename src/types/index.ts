import { users } from "../model/schema"

export type SelectUser = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert
