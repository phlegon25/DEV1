// Get references to HTML elements
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const totalTasks = document.getElementById("total-tasks");
const completedTasks = document.getElementById("completed-tasks");

// Variables to track tasks
let total = 0;
let completed = 0;

// Function to update task statistics
function updateStats() {
    totalTasks.textContent = `Total: ${total}`;
    completedTasks.textContent = `Completed: ${completed}`;
}

// Function to create a new task
function addTask() {
    const taskText = todoInput.value.trim();

    // Prevent adding empty tasks
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create list item
    const li = document.createElement("li");
    li.className = "todo-item";

    // Create task text
    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = taskText;

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "X";

    // Mark task as completed when clicked
    span.addEventListener("click", () => {
        if (!li.classList.contains("completed")) {
            li.classList.add("completed");
            completed++;
        } else {
            li.classList.remove("completed");
            completed--;
        }
        updateStats();
    });

    // Delete task
    deleteBtn.addEventListener("click", () => {
        if (li.classList.contains("completed")) {
            completed--;
        }
        todoList.removeChild(li);
        total--;
        updateStats();
    });

    // Add elements to list item
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // Add task to the list
    todoList.appendChild(li);

    // Update counts
    total++;
    updateStats();

    // Clear input field
    todoInput.value = "";
}

// Add task when button is clicked
addBtn.addEventListener("click", addTask);

// Add task when Enter key is pressed
todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});
