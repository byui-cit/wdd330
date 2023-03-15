const baseUrl = "https://swapi.dev/api/";

// TEMPLATES
function planetTemplate(planet) {
  return `<li>
    <h4 class="planet-name">${planet.name}</h4>
    <p>Climate:<span class="planet-climate">${planet.climate}</span></p>
    <p>Terrain:<span class="planet-terrain">${planet.terrain}</span></p>
    <p>Year: <span class="planet-year">${planet.orbital_period} days</span></p>
    <p>Day: <span class="planet-day">${planet.rotation_period} hrs</span></p>
    <p>Population: <span class="planet-population">${planet.population}</span></p>
  </li>`;
}

function starshipTemplate(ship) {
  return `<li>
    <h4 class="ship-name">${ship.name}</h4>
    <p>Model:<span class="ship-model">${ship.model}</span></p>
    <p>Class:<span class="ship-class">${ship.starship_class}</span></p>
    <p>
      Crew/Passengers: <span class="ship-crew">${ship.crew}</span> /
      <span class="ship-passengers">${ship.passengers}</span>
    </p>
    <p>Length: <span class="ship-length">${ship.length}</span></p>
    <p>Speed: <span class="ship-speed">${ship.max_atmosphering_speed}</span></p>
  </li>`;
}

function movieListTemplate(film) {
  return `<li><a href="film.html?filmId=${film.episode_id}">${film.title}</a></li>`;
}

export async function renderFilmList(elementId) {
  const element = document.getElementById(elementId);
  let films = await makeRequest(baseUrl + "films");
  films = films.results;
  console.log(films);
  element.innerHTML = films.map(movieListTemplate).join("");
}

export async function renderFilmDetails(filmId, elementId) {
  let film = await makeRequest(baseUrl + `films/${filmId}`);
  console.log(film);
  prepareFilm(film, elementId);
}

async function makeRequest(url) {
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

async function prepareFilm(film, outputId) {
  try {
    if (!film) {
      throw new Error("Film not found");
    }
    const element = document.getElementById(outputId);
    // set film title and other info
    element.querySelector(".film-name").innerText = film.title;
    element.querySelector(".crawl").innerText = film.opening_crawl;
    // insert planets
    const planets = await getListDetails(film.planets);
    element
      .querySelector(".film-planets")
      .insertAdjacentHTML("afterbegin", planets.map(planetTemplate).join(""));

    // insert starships
    const ships = await getListDetails(film.starships);
    element
      .querySelector(".film-starships")
      .insertAdjacentHTML("afterbegin", ships.map(starshipTemplate).join(""));

    // do the same for the rest of the lists...
  } catch (err) {
    console.log(err);
  }
}
async function getListDetails(list) {
  // by calling map with our makeRequest method we will end up with an array of Promises. We have only ever resolved one promise at a time. To resolve a list of Promises we need to use Promise.all(listOfPromises)
  const details = await Promise.all(list.map((url) => makeRequest(url)));
  console.log(details);
  return details;
}
