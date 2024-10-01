import { html } from "https://esm.sh/htm/preact/standalone";

// helper functions
function distinctAuthors(quotes) {
  // Sets automatically remove duplicate records. So if we use .map to send just the author for each quote into a Set it will give us a distinct list.
  const authors = new Set(quotes.map((quote) => quote.author));
  // we need to turn our list back into an array.  Using the Spread operator is a slick way to do this.
  return [...authors];
}

async function getQuotes() {
  // https://type.fit/api/quotes
  return fetch("quotes.json")
    .then((response) => response.json())
    .then((data) => data);
}

// Components
// AuthorSelect: generate a select element with the distinct list of Author names
// Quote: output a single quote
// QuoteList: generate a list of Quotes

export default function QuoteGetter() {
  console.log("QuoteGetter");

  return html`<p>QuoteGetter</p>`;
}
