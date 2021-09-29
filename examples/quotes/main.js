/*
get list of quotes
get distinct list of authors from the quotes
populate dropdown with authors
When get button clicked...
     get currently selected author
    get a filtered list of quotes.
    show quotes

*/

import QuoteGetter from "./QuoteGetter.js";

const myGetter = new QuoteGetter("authorSelect", "output");

myGetter.init();

function submit() {
  const author = document.querySelector("#authorSelect").value;
  myGetter.filterByAuthor(author);
}

document.querySelector("#authorButton").addEventListener("click", submit);
