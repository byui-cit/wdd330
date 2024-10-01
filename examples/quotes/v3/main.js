/*
get list of quotes
get distinct list of authors from the quotes
populate dropdown with authors
When get button clicked...
     get currently selected author
    get a filtered list of quotes.
    show quotes

*/
import { html, render } from "https://cdn.skypack.dev/htm/preact/standalone";
import QuoteGetter from "./quoteGetter.mjs";

import "./quote-getter.mjs";

// register(QuoteGetter, "quote-getter");

// render(
//   html`<${QuoteGetter} mode="author" />`,
//   document.querySelector("#output")
// );
