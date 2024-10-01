/*
get list of quotes
get distinct list of authors from the quotes
populate dropdown with authors
When get button clicked...
     get currently selected author
    get a filtered list of quotes.
    show quotes

*/
import { html, render } from "https://esm.sh/htm/preact/standalone";
import QuoteGetter from "./quoteGetter.mjs";

render(html`<${QuoteGetter} />`, document.querySelector("#output"));
