import {
  html,
  useState,
  useEffect
} from "https://cdn.skypack.dev/htm/preact/standalone";

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
function AuthorSelect({ authors, onchange }) {
  return html`<select onchange=${onchange}>
    <option>Pick an Author</option>
    ${authors.map(
      (author) => html`<option value="${author}">${author}</option>`
    )}
  </select>`;
}

function Quote({ data }) {
  return html`<section class="quote">
    <p>${data.text}</p>
    <p>${data.author}</p>
  </section>`;
}

function QuoteList({ quotes }) {
  return html`${quotes.map((quote) => html`<${Quote} data=${quote} />`)}`;
}

// modes: random || authors
export default function QuoteGetter({ mode }) {
  // what should become state? Anything that should result in an update of the view when it changes
  const [author, setAuthor] = useState();
  const [quotes, setQuotes] = useState([]);
  const [filteredQuotes, setFilteredQuotes] = useState([]);
  // const filteredQuotes = author
  //   ? quotes.filter((quote) => quote.author === author)
  //   : [];
  // get the distinct list of author names...will be blank the first time the component renders...but when init runs and quotes updates it will force a re-render and this time quotes will exist and we will get names
  const authorNames = distinctAuthors(quotes);

  // console.log(quotes);

  // this is the change event handler for our select
  const handleChange = (e) => {
    setAuthor(e.target.value);
  };

  // we need a function to do some initialization like get the list of quotes
  async function init() {
    // get the quotes
    const data = await getQuotes();
    // set the state variable with the quotes...this will trigger  re-render
    setQuotes(data);
  }
  //we need a function that will update filteredQuotes according to the current value of author
  function filterQuotes() {
    const filtered = quotes.filter((quote) => quote.author === author);
    setFilteredQuotes(filtered);
  }

  // sometimes we only need the component to re-render when some state changes...sometimes we need other things to happen as well. useEffect is for when we need other things to happen with a state update.
  // In this case we had some setup that we needed to run with the initial load to get the list of quotes, etc
  //When we put an empty dependency list it will run only on the initial mount.
  // If we put no dependency list then it will run everytime the component reloads!
  useEffect(init, []);

  // this one only needs to run if the currently selected author changes.  Notice the dependency list [author]
  // when author changes then this will call the filterQuotes function which will update the filteredQuotes variable.
  // since filteredQuotes is a state variable the component will automatically reload when it changes, displaying the new list.
  useEffect(filterQuotes, [author]);

  return mode === "author"
    ? html`<${AuthorSelect} authors=${authorNames} onchange=${handleChange} />
        <${QuoteList} quotes=${filteredQuotes} />`
    : html`<${QuoteList} quotes=${quotes} />`;
}

// html`<${AuthorSelect} authors=${authorNames} onchange=${handleChange} />
//         <${QuoteList} quotes = ${filteredQuotes} />`

// this is how it would look in JSX
// <AuthorSelect authors={authorNames} onchange={handleChange} />
// <QuoteList quotes={filteredQuotes}>
