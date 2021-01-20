import QuoteGetter from './QuoteGetter.js';

const myGetter = new QuoteGetter('authorSelect', 'output');

myGetter.init();

function submit() {
    const author = document.querySelector('#authorSelect').value;
    myGetter.filterByAuthor(author);
}

document.querySelector('#authorButton').addEventListener('click', submit);

