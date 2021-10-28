/*
  create a list to hold the names of the pokemon
  create a container to hold the details of the pokemon
  place the containers side by side, make them each the size of the screen
  hide the details element (overflow:hidden on main)

  get the list of pokemon
  display the list of pokemon in the list element
      make sure to include the url for the pokemon details in the html
  attach a listener to the pokemon list when clicked:
      get the details for the correct pokemon
      insert the details into the details element
      slide the list and the details elements left 100vw
  Add a back button to the details element.
  attach a listener to the button, when clicked:
      slide list and details 100vw right
*/
function getJSON(url) {
  return fetch(url)
    .then(function (response) {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

function revealDetails(e) {
  //console.log(this.attr('data-url'));
  const list = document.querySelector(".listbox");
  const details = document.getElementById("detailsbox");
  getPokemonDetails(e.target.getAttribute("data-url"));
  list.style.transform = "translateX(-100vw)";
  details.style.transform = "translateX(-100vw)";
}

function hideDetails() {
  const list = document.querySelector(".listbox");
  const details = document.getElementById("detailsbox");
  list.style.transform = "translateX(0)";
  details.style.transform = "translateX(100vw)";
}
function pokemonFromApi() {
  getJSON("https://pokeapi.co/api/v2/type/3").then(function (data) {
    console.log(data);

    var type = data.name;
    var pokelist = document.getElementById("pokelist");
    document.getElementById("type").innerHTML = type;
    data.pokemon.forEach(function (value) {
      let item = document.createElement("li");
      // semantically we should probably wrap the pokemon name in an <a>, then the URL could just be placed in the href, with an event listener to preventDefault...But I wanted to show how to add custom data- attributes.
      item.innerHTML = value.pokemon.name;
      item.dataset.url = value.pokemon.url;
      pokelist.appendChild(item);
    });
    pokelist.addEventListener("click", revealDetails);
  });
}

function getPokemonDetails(url) {
  getJSON(url).then(function (data) {
    console.log(data);

    document.querySelector(".name").innerHTML = data.name;
    document.querySelector(".number").innerHTML = data.id;
    document.querySelector(".pokeimg").src = data.sprites.front_default;
  });
}
pokemonFromApi();
const backButton = document.getElementById("back");
backButton.addEventListener("click", hideDetails);
