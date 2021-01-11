// function to add the base of our table to the html page.
// why isn't this part of the class?
function renderTable(label, elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = `<h2>${label}</h2>
    <table>
    <thead>
      <tr>
        <th>Description</th>
        <th>Amount</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody class="outputBody"></tbody>
    
    </table>`
}

function  renderExpenses(expenses, elementId) {
    const element = document.querySelector(`#${elementId} .outputBody`);
    // clear out contents
    element.innerHTML = '';
    const expenseHtml = expenses.map(expense => `<tr><td>${expense.description}</td><td>$${expense.amount}</td><td>$${expense.total}</td></tr>`)
    element.innerHTML = expenseHtml.join('');
        
}
// notice the export default? That will make the class available outside the module to be imported
export default class ExpenseTracker {
    constructor(label, outputId){
        this.label = label;
        this.expenses = [];
        this.total = 0;
        this.outputId = outputId;
        renderTable(this.label, this.outputId);
    }
    addExpense(expense) {
        // add the expense to the array of expenses;
        this.expenses.push(expense);
        // recalculate running total
        this.calculate();
        // output updated expenses
        renderExpenses(this.expenses, this.outputId);
    }
    calculate(){
        // loop through all our expenses to calculate the running total
        this.expenses.forEach((expense, index) => {
            // if it is the first row then the total is the amount.
            if(index === 0) {
                this.total = parseFloat(expense.amount);
            } else {
                this.total+= parseFloat(expense.amount);
            }
            expense.total = this.total;
        })
    }
   
}