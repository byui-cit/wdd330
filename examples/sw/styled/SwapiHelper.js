const baseUrl = "https://swapi.dev/api/";
function setActive(parent, target) {
  // will add a class of active to the list item clicked...and will remove it from all others.
  const children = [...parent.childNodes];
  children.forEach((node) => node.classList.remove("active"));
  target.classList.add("active");
}
function clickableList(list, elementId, callback) {
  const element = document.getElementById(elementId);
  element.innerHTML = list.map((film) => `<li>${film.title}</li>`).join("");
  element.addEventListener("click", (e) => {
    console.log(e.target);
    setActive(element, e.target);
    callback(e.target.innerText);
  });
}

// making template functions like this would be an alternate to using the <template> element in HTML we learned about.
function planetTemplate(planet) {
  return `<li>
    <h4 class="planet-name">${planet.name}</h4>
    <p>Climate:${planet.climate}</p>
    <p>Terrain: ${planet.terrain}</p>
    <p>Year: ${planet.orbital_period}</p>
    <p>Day: ${planet.rotation_period}</p>
    <p>Population: ${planet.population}</p>
  </li>`;
}

function shipTemplate(ship) {
  return `<li>
    <h4 class="ship-name">${ship.name}</h4>
    <p>Model: ${ship.model}</p>
    <p>Class: ${ship.starship_class}</p>
    <p>
      Crew/Passengers: ${ship.crew} / ${ship.passengers}
    </p>
    <p>Length: ${ship.length}</p>
    <p>Speed: ${ship.max_atmosphering_speed}</p>
  </li>`;
}

function pageTemplate() {
  return `<h2 class="film-name"></h2>
    <p class="crawl"></p>
    <section class="planets">
      <h3>Planets</h3>
      <ul class="detail-list film-planets"></ul>
      </section>
      <section class="ships">
      <h3>Starships</h3>
      <ul class="detail-list film-starships"></ul>
      </section>
    </section>`;
}

function renderList(list, template, outputId) {
  const element = document.querySelector(outputId);
  element.innerHTML = "";
  // notice that the template that was passed in was a function that will return am HTML string with the proper values already embedded
  const htmlString = list.map((item) => template(item));
  element.insertAdjacentHTML("afterbegin", htmlString.join(""));
}

export default class SwapiHelper {
  // expects an id for the output element, the element where we want the list of films displayed, and an element that will show during the initial load.
  constructor(outputId, filmId, loadingId) {
    this.outputId = outputId;
    this.outputElement = document.getElementById(outputId);
    this.filmId = filmId;
    this.filmElement = document.getElementById(filmId);
    this.loadingId = loadingId;
    this.loadingElement = document.getElementById(loadingId);
    this.films = [];
  }
  async init() {
    // the api is sometimes slow...lets give the users something to look at while they wait...
    this.outputElement.style.display = "none";
    this.loadingElement.style.display = "block";
    this.films = await this.makeRequest(baseUrl + "films");
    this.films = this.films.results;
    console.log(this.films);
    // once we have our film data remove loading indicator.
    this.outputElement.style.display = "initial";
    this.loadingElement.style.display = "none";
    // why .bind(this) right here?
    clickableList(this.films, this.filmId, this.filmSelected.bind(this));
  }
  async makeRequest(url) {
    // we wrap our attempt to get our data from the API in a try/catch block. This gives us better control over what happens if something goes wrong. We can handle errors gracefully instead of things crashing
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      } else {
        const error = await response.text();
        throw new Error(error);
      }
    } catch (err) {
      // normally we would do more than just log out the error...it's always good to notify the user that something went wrong and if it's something they need to worry about or if it is outside of their control.
      console.log(err);
    }
  }
  async filmSelected(filmTitle) {
    try {
      const film = this.films.find((item) => item.title === filmTitle);
      if (!film) {
        throw new Error("Film not found");
      }
      // setup the initial html structure for the film
      this.outputElement.innerHTML = pageTemplate();
      // set film title and other info
      this.outputElement.querySelector(".film-name").innerText = film.title;
      this.outputElement.querySelector(".crawl").innerText = film.opening_crawl;
      // insert planets
      const planets = await this.getListDetails(film.planets);
      renderList(planets, planetTemplate, ".film-planets");

      // insert starships
      const ships = await this.getListDetails(film.starships);
      renderList(ships, shipTemplate, ".film-starships");
      // do the same for the rest of the lists...
    } catch (err) {
      console.log(err);
    }
  }
  async getListDetails(list) {
    // by calling map with our makeRequest method we will end up with an array of Promises. We have only ever resolved one promise at a time. To resolve a list of Promises we need to use Promise.all(listOfPromises)
    const details = await Promise.all(list.map((url) => this.makeRequest(url)));
    console.log(details);
    return details;
  }
}
