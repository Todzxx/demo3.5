const express = require("express");
const router = express.Router();
const {
  getTodos,
  createTodo,
  updateTodoStatus,
  deleteTodo,
} = require("../controllers/todoController");

router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodoStatus);
router.delete("/:id", deleteTodo);

module.exports = router;
