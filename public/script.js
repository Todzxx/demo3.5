const API_URL = "/todos";

const form = document.getElementById("todoForm");
const input = document.getElementById("titleInput");
const list = document.getElementById("todoList");

async function loadTodos() {
  const res = await fetch(API_URL);
  const result = await res.json();

  if (result.success) {
    renderTodos(result.data);
  }
}

function renderTodos(todos) {
  list.innerHTML = "";

  for (const todo of todos) {
    const li = document.createElement("li");
    li.dataset.id = todo.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const span = document.createElement("span");
    span.textContent = todo.title;
    if (todo.completed) {
      span.classList.add("completed");
    }

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit");
    editBtn.addEventListener("click", () => startEdit(li, todo));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Hapus";
    deleteBtn.classList.add("delete");
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    const actions = document.createElement("div");
    actions.classList.add("actions");
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(actions);
    list.appendChild(li);
  }
}

function startEdit(li, todo) {
  const span = li.querySelector("span");
  const actions = li.querySelector(".actions");

  const input = document.createElement("input");
  input.type = "text";
  input.value = todo.title;
  input.classList.add("edit-input");

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Simpan";
  saveBtn.classList.add("save");
  saveBtn.addEventListener("click", () => saveEdit(li, todo.id, input.value));

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Batal";
  cancelBtn.classList.add("cancel");
  cancelBtn.addEventListener("click", () => loadTodos());

  span.replaceWith(input);
  actions.innerHTML = "";
  actions.appendChild(saveBtn);
  actions.appendChild(cancelBtn);

  input.focus();
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveEdit(li, todo.id, input.value);
    if (e.key === "Escape") loadTodos();
  });
}

async function saveEdit(li, id, newTitle) {
  const title = newTitle.trim();
  if (!title) return;

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  const result = await res.json();

  if (result.success) {
    loadTodos();
  } else {
    alert(result.message);
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = input.value.trim();
  if (!title) return;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  const result = await res.json();

  if (result.success) {
    input.value = "";
    loadTodos();
  } else {
    alert(result.message);
  }
});

async function toggleTodo(id) {
  const li = list.querySelector(`li[data-id="${id}"]`);
  const checkbox = li.querySelector('input[type="checkbox"]');

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: checkbox.checked }),
  });

  const result = await res.json();

  if (result.success) {
    loadTodos();
  }
}

async function deleteTodo(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  const result = await res.json();

  if (result.success) {
    loadTodos();
  }
}

loadTodos();
