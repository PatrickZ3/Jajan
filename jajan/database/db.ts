import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core'

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

export type Category = typeof categories.$inferSelect
export type Expense = typeof expenses.$inferSelect
