import { drizzle } from 'drizzle-orm/expo-sqlite'
import { openDatabaseSync } from 'expo-sqlite'
import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'

// Initialize DB
const sqlite = openDatabaseSync('jajan.db')
export const db = drizzle(sqlite)

// Tables
export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  emoji: text('emoji').notNull(),
})

export const expenses = sqliteTable('expenses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  date: text('date').notNull(),
  name: text('name').notNull(),
  price: real('price').notNull(),
  category_id: integer('category_id')
    .notNull()
    .references(() => categories.id),
})

// Types
export type Category = typeof categories.$inferSelect
export type Expense = typeof expenses.$inferSelect
