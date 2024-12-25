// script.js

// Select DOM elements
const form = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const expenseChart = document.getElementById("expense-chart").getContext("2d");
const generateChartButton = document.getElementById("generate-chart");

// Expenses array
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Event listener for form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  // Create expense object
  const expense = { amount, category, date };

  // Add expense to array and local storage
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // Clear form
  form.reset();

  // Update UI
  displayExpenses();
});

// Event listener for generate chart button
generateChartButton.addEventListener("click", () => {
  generateChart();
});

// Display expenses
function displayExpenses() {
  expenseList.innerHTML = "";
  expenses.forEach((expense, index) => {
    const expenseItem = document.createElement("div");
    expenseItem.classList.add("expense-item");
    expenseItem.innerHTML = `
            <span>${expense.amount}</span>
            <span>${expense.category}</span>
            <span>${expense.date}</span>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
    expenseList.appendChild(expenseItem);
  });
}

// Delete expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  displayExpenses();
}

// Generate chart
function generateChart() {
  const categories = [...new Set(expenses.map((expense) => expense.category))];
  const data = categories.map((category) => {
    return expenses
      .filter((expense) => expense.category === category)
      .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  });

  // Destroy the previous chart instance if it exists
  if (window.myChart) {
    window.myChart.destroy();
  }

  // Create a new chart instance
  window.myChart = new Chart(expenseChart, {
    type: "pie",
    data: {
      labels: categories,
      datasets: [
        {
          data: data,
          backgroundColor: [
            "#ff6384",
            "#36a2eb",
            "#cc65fe",
            "#ffce56",
            "#2e7d32",
            "#d32f2f",
            "#7b1fa2",
          ],
        },
      ],
    },
  });
}

// Initial display
displayExpenses();
