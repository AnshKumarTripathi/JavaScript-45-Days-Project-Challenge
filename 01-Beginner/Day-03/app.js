// Day 3: To-Do List Application

/*
 * Theory:
 * A to-do list application allows users to manage their tasks by adding and removing items.
 * This project will help you understand the following concepts:
 *
 * 1. HTML Structure:
 *    - Creating a form for inputting new tasks.
 *    - Displaying the tasks in a list format.
 *
 * 2. CSS Styling:
 *    - Adding basic styling to make the application visually appealing.
 *    - Using classes and IDs to target specific elements for styling.
 *
 * 3. JavaScript Interactivity:
 *    - Handling user inputs to add new tasks.
 *    - Removing tasks from the list.
 *    - Updating the DOM (Document Object Model) to reflect changes.
 */

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  if (taskInput.value.trim() !== "") {
    const li = document.createElement("li");
    li.innerHTML = `${taskInput.value} <button onclick="removeTask(this)">Remove</button>`;
    taskList.appendChild(li);
    taskInput.value = "";
  }
}

function removeTask(button) {
  const li = button.parentElement;
  li.remove();
}
