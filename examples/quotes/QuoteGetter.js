function pullAuthors(quotes) {
    // Sets automatically remove duplicate records. So if we use .map to send just the author for each quote into a Set it will give us a distinct list.
    const authors = new Set(quotes.map(quote=> quote.author));
    // we need to turn our list back into an array.  Using the Spread operator is a slick way to do this.
    return [...authors];
}

function buildAuthorSelect(authors, authorId) {
    const element = document.getElementById(authorId);
    const authorHtml = authors.map(author => `<option value="${author}">${author}</option>`);
    element.innerHTML = authorHtml.join('');
}

function renderQuotes(quotes, quoteId) {
    const element = document.getElementById(quoteId);
    element.innerHTML = quotes.map(quote => `<li>${quote.text}</li>`).join('');
}

export default class QuoteGetter {
    constructor(authorId, quotesId) {
        this.authorId = authorId;
        this.quotesId = quotesId;
        this.quotes = [];
        
        this.quoteAuthors = [];
    }
    async init() {
        // you could argue that all of this could be done in the contructor...and you would be right. I've found that it is nice sometimes to have control over when some things happen.  So I often move some things into a init method that I can call when I am ready.
        // Also you can't using async/await in the constructor...
        this.quotes = await this.getQuotes();
        this.quoteAuthors = await pullAuthors(this.quotes);
        buildAuthorSelect(this.quoteAuthors, this.authorId);
    }
    getQuotes() {
        return fetch("https://type.fit/api/quotes")
                .then((response) =>response.json())
                .then((data) => data);
    }
    
    getAuthors() {
        return this.quoteAuthors;
    }
    filterByAuthor(author) {
        const filtered =  this.quotes.filter(quote=> quote.author === author);
        renderQuotes(filtered, this.quotesId);
    }
}