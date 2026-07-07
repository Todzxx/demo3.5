const { eq } = require("drizzle-orm");
const { db } = require("../db");
const { todos } = require("../schema/todos");

const getAll = async () => {
  return await db.select().from(todos);
};

const create = async (title) => {
  const result = await db.insert(todos).values({ title });
  return result;
};

const update = async (id, data) => {
  const existing = await db.select().from(todos).where(eq(todos.id, id));
  if (existing.length === 0) return null;

  const updateData = {};
  if (data.title !== undefined) updateData.title = data.title;
  if (data.completed !== undefined) updateData.completed = data.completed;

  if (Object.keys(updateData).length > 0) {
    await db.update(todos).set(updateData).where(eq(todos.id, id));
  }

  const updated = await db.select().from(todos).where(eq(todos.id, id));
  return updated[0];
};

const deleteTodo = async (id) => {
  const existing = await db.select().from(todos).where(eq(todos.id, id));
  if (existing.length === 0) return null;

  await db.delete(todos).where(eq(todos.id, id));
  return existing[0];
};

module.exports = { getAll, create, update, deleteTodo };
