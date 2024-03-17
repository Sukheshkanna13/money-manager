// script.js
const expenseForm = document.getElementById("expense-form");
const expenseList = document.getElementById("expense-list");
const totalAmountElement = document.getElementById("total-amount");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// script.js

const Expense = require('./db'); // Import the Expense model

// Now you can use the Expense model to perform database operations
// For example, you can create a new expense like this:
const newExpense = new Expense({
    name: 'Groceries',
    amount: 50
});
newExpense.save().then(() => {
    console.log('Expense saved successfully');
}).catch(err => {
    console.error('Error saving expense:', err);
});


function renderExpenses() {
    expenseList.innerHTML = "";
    let totalAmount = 0;

    expenses.forEach((expense, index) => {
        const expenseRow = document.createElement("tr");
        expenseRow.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td class="delete-btn" data-id="${index}">Delete</td>
        `;
        expenseList.appendChild(expenseRow);
        totalAmount += expense.amount;
    });

    totalAmountElement.textContent = totalAmount.toFixed(2);
}

function addExpense(event) {
    event.preventDefault();

    const expenseNameInput = document.getElementById("expense-name");
    const expenseAmountInput = document.getElementById("expense-amount");
    const expenseName = expenseNameInput.value;
    const expenseAmount = parseFloat(expenseAmountInput.value);

    expenseNameInput.value = "";
    expenseAmountInput.value = "";

    if (expenseName === "" || isNaN(expenseAmount)) {
        alert("Please enter valid expense details.");
        return;
    }

    const expense = {
        name: expenseName,
        amount: expenseAmount
    };

    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    
    renderExpenses();
}

function deleteExpense(event) {
    if (event.target.classList.contains("delete-btn")) {
        const expenseIndex = parseInt(event.target.getAttribute("data-id"));
        expenses.splice(expenseIndex, 1);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        renderExpenses();
    }
}

expenseForm.addEventListener("submit", addExpense);
expenseList.addEventListener("click", deleteExpense);

renderExpenses();
