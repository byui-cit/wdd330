/* Always good to stop at the beginning of a new project and think about what needs to be done.
We would like to build a simple expense tracker that will give a running total of the money spent in a month.
It should be flexible enough to accomodate more than one month.

When the page loads:
    for each month we are tracking:
        create expense tracker
        render out expense tables
    
    attach event listener to submit button

When the enter button is clicked:
    get the contents of the description, amount, and month inputs
    construct an expense object
    check the month and add the expense to the correct expense tracker
    recalculate the total
    re-render the expenses table


    */

import ExpenseTracker from "./ExpenseTracker.js";

const myExpense = new ExpenseTracker("Jan", "output");
// look how easy it is to re-use our module: We add a new div with id="output2" to our html...then create a new instance of our module class.
const febExpense = new ExpenseTracker("Feb", "febOutput");

function submit() {
  const description = document.getElementById("description");
  const amount = document.getElementById("amount");
  const month = document.getElementById("month");
  // notice the difference between .log and .dir. Outputting this because I can never remember where the select element records the selected option!
  console.log(month);
  console.dir(month);
  const expense = { description: description.value, amount: amount.value };
  // to re-use this we need to add a month to our input, and call the add method for the right instance of our class
  switch (month.value) {
    case "jan":
      myExpense.addExpense(expense);
      break;
    case "feb":
      febExpense.addExpense(expense);
      break;
  }
  // clear out our form values
  description.value = "";
  amount.value = "";
}

document.getElementById("submit").addEventListener("click", submit);
