import { boolean, date, pgEnum, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-typebox'

export const roleEnum = pgEnum('role', ['admin', 'user'])

export const users = pgTable('users', {
  id: serial('id').primaryKey(),

  firstName: varchar('first_name', { length: 128 }).notNull(),
  lastName: varchar('last_name', { length: 128 }).notNull(),
  middleName: varchar('middle_name', { length: 128 }).notNull(),

  birthDate: date('birth_date', { mode: 'date' }).notNull(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  role: roleEnum('role').default('user').notNull(),

  status: boolean('is_active').default(true).notNull(),
  password: varchar('password', { length: 256 }).notNull(),

  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow().notNull(),
})

export const DBUserSelectModel = createSelectSchema(users)
export type DBUserSelectModel = typeof DBUserSelectModel.static

export const DBUserUpdateModel = createUpdateSchema(users)
export type DBUserUpdateModel = typeof DBUserUpdateModel.static

export const DBUserInsertModel = createInsertSchema(users)
export type DBUserInsertModel = typeof DBUserInsertModel.static