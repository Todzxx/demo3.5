const todoModel = require("../models/todoModel");

const getTodos = async (req, res) => {
  try {
    const data = await todoModel.getAll();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title wajib diisi",
      });
    }

    await todoModel.create(title);
    res.status(201).json({ success: true, message: "Todo berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateTodoStatus = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await todoModel.updateStatus(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Todo tidak ditemukan",
      });
    }

    res.json({ success: true, message: "Status berhasil diubah", data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await todoModel.deleteTodo(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Todo tidak ditemukan",
      });
    }

    res.json({ success: true, message: "Todo berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getTodos, createTodo, updateTodoStatus, deleteTodo };
