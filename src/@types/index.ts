import { credentials, users } from "../model/schema"

export type User = typeof users.$inferSelect
export type InsertUser = typeof users.$inferInsert

export type Credential = typeof credentials.$inferSelect
export type InsertCredential = typeof credentials.$inferInsert