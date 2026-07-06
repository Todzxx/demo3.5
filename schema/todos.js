const { mysqlTable, int, varchar, boolean, timestamp } = require("drizzle-orm/mysql-core");

const todos = mysqlTable("todos", {
  id: int("id").primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  completed: boolean("completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

module.exports = { todos };
