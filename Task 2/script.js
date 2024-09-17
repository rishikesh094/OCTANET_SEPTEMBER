document.addEventListener('DOMContentLoaded', () => {
  const inputValue = document.getElementById("inputValue");
  const maintodo = document.querySelector(".todo-lists-elem");
  const addBtn = document.getElementById("btn");

  let localTodoLists = getTodoListFromLocal();

  // Load todos on page load
  showTodoList();

  addBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const todoValue = inputValue.value.trim();

      if (todoValue === "") {
          alert("Please enter a todo item.");
          return;
      }

      if (!localTodoLists.some(todo => todo.text === todoValue)) {
          const newTodo = { text: todoValue, isCompleted: false };
          localTodoLists.push(newTodo);
          updateLocalStorage();
          addTodoDynamicElem(newTodo);
      }

      inputValue.value = "";
  });

  function getTodoListFromLocal() {
      return JSON.parse(localStorage.getItem("TodoList")) || [];
  }

  function updateLocalStorage() {
      localStorage.setItem("TodoList", JSON.stringify(localTodoLists));
  }

  function showTodoList() {
      maintodo.innerHTML = ''; // Clear existing elements
      localTodoLists.forEach(todo => addTodoDynamicElem(todo));
  }

  function addTodoDynamicElem(todo) {
      const { text, isCompleted } = todo;
      const divElem = document.createElement("div");
      divElem.classList.add("main-todo-div");

      const todoItem = document.createElement("li");
      todoItem.textContent = text;
      todoItem.classList.toggle("completed", isCompleted);

      const completeBtn = createButton("Complete", () => {
          todoItem.classList.toggle("completed");
          todo.isCompleted = !todo.isCompleted;
          updateLocalStorage();
      });

      const editBtn = createButton("Edit", () => {
          const newValue = prompt("Edit your todo", text);
          if (newValue && newValue.trim() !== "") {
              todoItem.textContent = newValue;
              todo.text = newValue;
              updateLocalStorage();
          }
      });

      const deleteBtn = createButton("Delete", () => {
          maintodo.removeChild(divElem);
          localTodoLists = localTodoLists.filter(item => item.text !== text);
          updateLocalStorage();
      });

      divElem.append(todoItem, completeBtn, editBtn, deleteBtn);
      maintodo.append(divElem);
  }

  function createButton(text, onClick) {
      const btn = document.createElement("button");
      btn.textContent = text;
      btn.addEventListener("click", onClick);
      return btn;
  }
});
