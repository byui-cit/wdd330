/* Always good to stop at the beginning of a new project and think about what needs to be done.
We would like to build a simple expense tracker that will give a running total of the money spent in a month.
It should be flexible enough to accomodate more than one month.

When the page loads:
    get the checked state of allowInput
    create expense tracker
      render out expense tables
      if allowInput is checked render out the inputs and attach event listener to submit button
    read any expenses out of localStorage
    render out any expenses we already have.
    
When the enter button is clicked:
    get the contents of the description and amount inputs
    construct an expense object
    add the expense to the expense tracker
    recalculate the total
    update local storage
    re-render the expenses table
*/

import expenseTracker from "./expenseTracker.js";

const inputCheck = document.querySelector("#allowInput");
const storedAllowInput = localStorage.getItem("allow-input");
inputCheck.checked = storedAllowInput;

expenseTracker("output", storedAllowInput);
inputCheck.addEventListener("change", function () {
  localStorage.setItem("allow-input", this.checked);
  expenseTracker("output", this.checked);
});
