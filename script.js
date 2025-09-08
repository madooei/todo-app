// App state
const todos = [
    { id: 1, text: "Buy milk", completed: false },
    { id: 2, text: "Buy bread", completed: false },
    { id: 3, text: "Buy jam", completed: true }
];
let nextTodoId = 4;
let currentFilter = "all";

// DOM elements
const todoListElement = document.getElementById("todo-list");
const newTodoInput = document.getElementById("new-todo");
const todoNav = document.getElementById("todo-nav");
const todoCount = document.getElementById("todo-count");

// Render todos based on current filter
function renderTodos() {
    // Clear the todo list container
    todoListElement.innerHTML = "";
    
    // Filter todos based on current filter
    let filteredTodos = [];
    for (let i = 0; i < todos.length; i++) {
        const todo = todos[i];
        if (currentFilter === "all") {
            filteredTodos.push(todo);
        } else if (currentFilter === "active" && !todo.completed) {
            filteredTodos.push(todo);
        } else if (currentFilter === "completed" && todo.completed) {
            filteredTodos.push(todo);
        }
    }
    
    // Render filtered todos
    for (let i = 0; i < filteredTodos.length; i++) {
        const todo = filteredTodos[i];
        
        const todoItem = document.createElement("div");
        todoItem.classList.add("todo-item");
        
        const todoText = document.createElement("div");
        todoText.classList.add("todo-text");
        todoText.id = `todo-text-${todo.id}`;
        todoText.textContent = todo.text;
        if (todo.completed) {
            todoText.classList.add("completed");
        }
        
        const todoEdit = document.createElement("input");
        todoEdit.classList.add("todo-edit", "hidden");
        todoEdit.value = todo.text;
        
        todoItem.appendChild(todoText);
        todoItem.appendChild(todoEdit);
        todoListElement.appendChild(todoItem);
    }
    
    // Update todo counter
    updateTodoCount();
}

// Update the todo count display
function updateTodoCount() {
    const activeTodos = todos.filter(todo => !todo.completed);
    const count = activeTodos.length;
    todoCount.textContent = `${count} item${count !== 1 ? 's' : ''} left`;
}

// Handle adding new todo
function handleNewTodo(event) {
    if (event.key === "Enter") {
        const text = event.target.value.trim();
        if (text) {
            todos.push({
                id: nextTodoId++,
                text: text,
                completed: false
            });
            event.target.value = "";
            renderTodos();
        }
    }
}

// Handle clicking on todo list (toggle completion)
function handleTodoClick(event) {
    if (event.target.classList.contains("todo-text")) {
        const todoId = parseInt(event.target.id.split("-").pop());
        
        for (let i = 0; i < todos.length; i++) {
            if (todos[i].id === todoId) {
                todos[i].completed = !todos[i].completed;
                break;
            }
        }
        
        renderTodos();
    }
}

// Handle filter navigation
function handleFilterClick(event) {
    if (event.target.classList.contains("filter-link")) {
        event.preventDefault();
        
        // Update the currentFilter variable
        const href = event.target.getAttribute("href");
        
        if (href === "#/") {
            currentFilter = "all";
        } else if (href === "#/active") {
            currentFilter = "active";
        } else if (href === "#/completed") {
            currentFilter = "completed";
        }
        
        // Remove active class from all filter links
        const allLinks = document.querySelectorAll(".filter-link");
        allLinks.forEach(link => link.classList.remove("active"));
        
        // Add active class to clicked element
        event.target.classList.add("active");
        
        renderTodos();
    }
}

// Event listeners
newTodoInput.addEventListener("keydown", handleNewTodo);
todoListElement.addEventListener("click", handleTodoClick);
todoNav.addEventListener("click", handleFilterClick);

// Initial render
renderTodos();