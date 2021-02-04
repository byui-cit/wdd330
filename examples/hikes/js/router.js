import ListMaker from './ListMaker.js';
const routes = [
  { controller: new ListMaker('hikes'), file: 'partials/hikes.html', label: 'Hiking' },
  { controller: new ListMaker(), file: 'partials/park.html', label: 'Parks' }
];

// function to create a navigation for the items found in routes.
// creates element, add a touchend event listener and appends it to parent
export default function buildNavigation(parent) {
  routes.forEach(route => {
    let item = document.createElement('li');
    item.innerHTML = `<a href="#${route.label}">${route.label}</a>`;
    parent.appendChild(item);
    addNavEvent(item, route.file, route.controller);
  });
}

// makes an AJAX request for the html file found at viewPath and returns it as text
async function getView(viewPath) {
  try {
    const response = await fetch(viewPath);
    const text = await response.text();
    //debugger;
    return text;
  } catch (err) {
    console.log('Something went wrong', err);
  }
}

// adds a touchend event to element that will insert the view found at path into the content area of the index.html
function addNavEvent(element, path, controller) {
  element.addEventListener('click', e => {
    insertView(getView(path), controller);
  });
}

// inserts the view into the content area of index.html
// remember that getView returns a promise!
// runs a function from the controller to load any dynamic elements
async function insertView(viewPromise, controller) {
  const contentElement = document.getElementById('content');
  //debugger;
  contentElement.innerHTML = viewPromise;
  const itemTemplate = document.getElementById('itemTemplate');
  controller.init(itemTemplate);
}
