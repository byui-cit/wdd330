// function to add the base of our table to the html page.
// why isn't this part of the class?

let expenses = [];
let total = 0;
let outputId = "";
const key = "expenses";

function tableTemplate() {
  return `<h2>Expenses</h2>
  <table>
  <thead>
    <tr>
      <th>Description</th>
      <th>Amount</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody class="outputBody"></tbody>
  
  </table>`;
}
function inputTemplate() {
  return `<section id="input">
  <input id="description" type="text" placeholder="Description" />
  <input id="amount" type="text" placeholder="Amount" />
  <button id="submit">Enter</button>
</section>`;
}

function expenseTemplate(expense) {
  return `<tr>
  <td>${expense.description}</td>
  <td>$${expense.amount}</td>
  <td>$${expense.total}</td></tr>`;
}

function renderTracker(elementId, input = true) {
  const element = document.getElementById(elementId);
  element.innerHTML = tableTemplate();
  if (input) {
    // when we change the value of innerHTML directly it destroys any listeners that might have been attached...this works in our favor in this case.
    element.innerHTML += inputTemplate();
    // add a listener to the button
    document.querySelector("#submit").addEventListener("click", addExpense);
  }
}

function renderExpenses(expenses, elementId) {
  const element = document.querySelector(`#${elementId} .outputBody`);
  // clear out contents
  element.innerHTML = "";
  const expenseHtml = expenses.map(expenseTemplate);
  element.innerHTML = expenseHtml.join("");
}

function buildExpense() {
  const description = document.getElementById("description");
  const amount = document.getElementById("amount");
  const expense = { description: description.value, amount: amount.value };
  description.value = "";
  amount.value = "";
  return expense;
}
function addExpense() {
  const expense = buildExpense();
  // add the expense to the array of expenses;
  expenses.push(expense);
  // recalculate running total
  calculate();
  // store new list in localStorage
  localStorage.setItem(key, JSON.stringify(expenses));
  // output updated expenses
  renderExpenses(expenses, outputId);
  // clear out our form values
}
function calculate() {
  // loop through all our expenses to calculate the running total
  expenses.forEach((expense, index) => {
    // if it is the first row then the total is the amount.
    if (index === 0) {
      total = parseFloat(expense.amount);
    } else {
      total += parseFloat(expense.amount);
    }
    expense.total = total;
  });
}

// notice the export default? That will make the class available outside the module to be imported
export default function expenseTracker(id, input) {
  outputId = id;
  renderTracker(outputId, input);
  // grab any expenses from localStorage
  expenses = JSON.parse(localStorage.getItem(key)) || [];
  renderExpenses(expenses, outputId);
}
