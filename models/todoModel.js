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

const updateStatus = async (id) => {
  const existing = await db.select().from(todos).where(eq(todos.id, id));
  if (existing.length === 0) return null;

  const newStatus = !existing[0].completed;
  await db.update(todos).set({ completed: newStatus }).where(eq(todos.id, id));
  return { ...existing[0], completed: newStatus };
};

const deleteTodo = async (id) => {
  const existing = await db.select().from(todos).where(eq(todos.id, id));
  if (existing.length === 0) return null;

  await db.delete(todos).where(eq(todos.id, id));
  return existing[0];
};

module.exports = { getAll, create, updateStatus, deleteTodo };
