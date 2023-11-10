document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#add-todo-form");
  const todoList = document.querySelector("#todo-list");

  // Load todos from local storage
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  for (let todo of savedTodos) {
    addTodoToList(todo);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // create a new todo
    const newTodo = document.querySelector("#new-todo").value;
    addTodoToList(newTodo);

    // save the new todo to localStorage
    savedTodos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));

    // clear the input field once clicked on the submit button
    document.querySelector("#new-todo").value = "";
  });

  function addTodoToList(todo) {
    const li = document.createElement("li");
    const text = document.createElement("div");
    text.textContent = todo;
    li.appendChild(text);

    // Add buttons
    const buttons = document.createElement("div");
    li.appendChild(buttons);

    // Add delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      todoList.removeChild(li);

      // Remove todo from local storage
      const index = savedTodos.indexOf(todo);
      savedTodos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(savedTodos));
    });
    buttons.appendChild(deleteButton);

    // Add edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", function () {
      const newTodo = prompt("Edit your todo", todo);
      if (newTodo) {
        // Update todo in list
        text.textContent = newTodo;

        // Update todo in local storage
        const index = savedTodos.indexOf(todo);
        savedTodos[index] = newTodo;
        localStorage.setItem("todos", JSON.stringify(savedTodos));
      }
    });
    buttons.appendChild(editButton);

    // Add mark as completed button
    const completedButton = document.createElement("button");
    completedButton.textContent = "Completed";
    completedButton.addEventListener("click", function () {
      text.style.textDecoration = "line-through";
      editButton.style.display = "none";
      completedButton.style.display = "none";
    });
    buttons.appendChild(completedButton);

    // Add todo item to list
    todoList.appendChild(li);
  }
});
