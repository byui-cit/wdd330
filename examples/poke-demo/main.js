/*
When the page loads
    Get list of pokemon types.
    filter out types with no pokemon (shadow and unknown)
    render type list out (need type name and url to get all pokemon of that type)
    attach a listener to respond to a click on the type.
        when clicked it should pull the type url and retrieve the data
        render the list of pokemon
        style the clicked type as active


*/

// we have to convert the response fetch sends back into the appropriate type. In this case the API sends back json...so we process it as json and send it back
function convertToJson(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("bad response");
  }
}
// once we have the data, we need to do something with it. This won't always be the same thing though. With a callback (function passed into a function) we can change the behavior as needed.
function getData(url, callback) {
  //fetch returns a promise that we can process using .then()
  fetch(url)
    .then(convertToJson)
    .then((data) => {
      console.log(data);
      // notice this is where we execute the function passed in.
      callback(data);
    });
}

// create simple html markup to display a list
function renderTypeList(list) {
  const element = document.getElementById("typeList");
  // how did we know that we needed to look at list.results?  we looked at the data returned from the API!
  const cleanList = cleanTypeList(list.results);
  cleanList.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name}`;
    // our data contains the url we need to use to grab the pokemon of that type. We can embed it into our element using the data- prefix
    li.setAttribute("data-url", item.url);
    element.appendChild(li);
  });
}

// there are no pokemon in unknown and shadow. Let's remove them from the list.
function cleanTypeList(list) {
  return list.filter((item) => item.name != "shadow" && item.name != "unknown");
}
function renderPokeList(list) {
  const element = document.getElementById("pokeList");
  element.innerHTML = "";
  list.pokemon.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.pokemon.name}`;
    li.setAttribute("data-url", item.pokemon.url);
    element.appendChild(li);
  });
}

function setActive(type) {
  // use querySelectorAll to get all of the type li elements
  const allTypes = document.querySelectorAll(".types > li");
  allTypes.forEach((item) => {
    // check to see if this is the one to make active
    if (item.dataset.url === type) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

function typeClickedHandler(event) {
  // note the difference between event.target and event.currentTarget in this case.
  console.log(event.target);
  console.log("current:", event.currentTarget);
  const selectedType = event.target;

  // when we built the type list we embedded the url in the element, we can retrieve that through element.dataset
  const url = selectedType.dataset.url;
  // highlight the selected type. we have to remove any other active classes at the same time so let's pull this out into a function. We know the url will be unique...so we will send that as an identifier
  setActive(url);
  // then we call our getData function sending it the url we want, and the action we would like to have happen when the data is ready
  getData(url, renderPokeList);
}

// keep things from happening until the DOM is ready
// another alternative would be to add 'defer' to our script element
window.addEventListener("load", function () {
  //get and display the list of types
  getData("https://pokeapi.co/api/v2/type", renderTypeList);
  // watch for a click on a type and display the list of pokemon for that type
  document
    .getElementById("typeList")
    .addEventListener("click", typeClickedHandler);
});
