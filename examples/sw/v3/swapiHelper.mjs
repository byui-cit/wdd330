const baseUrl = "https://swapi.dev/api/";

// this is just used to map the episode_id to the correct movie poster image.
const posters = [
  "phantom-menace.jpg",
  "attack-of-the-clones.jpg",
  "revenge-of-the-sith.jpg",
  "a-new-hope.jpg",
  "empire-strikes-back.jpg",
  "return-of-the-jedi.jpg"
];
/*************TEMPLATES************/
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
  // note that we have a function embeded in out template literal string...
  return `<li><a href="film.html?filmId=${getFilmId(film.url)}"><img src="${
    posters[film.episode_id - 1]
  }" alt="Movie poster for ${film.title}"> ${film.title}</a></li>`;
}

function movieDetailsTemplate(film) {
  return `<h2 class="film__title">${film.title}</h2>
  <p class="film__crawl">${film.opening_crawl}</p>
  <img class="film-poster" src="${
    posters[film.episode_id - 1]
  }" alt="Movie poster for ${film.title}">
  <p class="film__director">Director: ${film.director}</p>
  <p class="film__producer">Producer: ${film.producer}</p>
  <p class="release__date">Release: ${film.release_date}</p>
<section class="film__planets">
    <h3>Planets</h3>
    <ul class="film__planets-list"></ul>
  </section>
  <section class="film__starships">
    <h3>Starships</h3>
    <ul class="film__starships-list"></ul>
  </section>`;
}

/*************EXPORTS************/

// pass in the element selector you would like the list rendered in
export async function renderFilmList(elementSelector) {
  const element = document.querySelector(elementSelector);
  let films = await makeRequest(baseUrl + "films");
  films = films.results;
  console.log(films);

  element.innerHTML = films.map(movieListTemplate).join("");
}

// pass in the ID of the film you want details on, and the selector of the element you want the details rendered in.
export async function renderFilmDetails(filmId, elementSelector) {
  let film = await makeRequest(baseUrl + `films/${filmId}`);
  const el = document.querySelector(elementSelector);
  try {
    if (!film) {
      throw new Error("Film not found");
    }
    console.log(film);
    // insert the main template and film info
    el.insertAdjacentHTML("afterBegin", movieDetailsTemplate(film));
    //add planets
    addCategoryDetails(film.planets, ".film__planets-list", planetTemplate);
    // add starships
    addCategoryDetails(
      film.starships,
      ".film__starships-list",
      starshipTemplate
    );
  } catch (err) {
    console.log(err);
  }
}

/*************HELPER FUNCTIONS************/

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

async function addCategoryDetails(categoryUrls, selector, template) {
  try {
    //get  category details
    const details = await getListDetails(categoryUrls);
    const detailsHtml = details.map(template);
    document
      .querySelector(selector)
      .insertAdjacentHTML("afterbegin", detailsHtml.join(""));
  } catch (err) {
    console.log(err);
  }
}
async function getListDetails(list) {
  // by calling map with our makeRequest method we will end up with an array of Promises. We have only ever resolved one promise at a time. To resolve a list of Promises we need to use Promise.all(listOfPromises)
  const detailsPromises = list.map((url) => makeRequest(url));
  const details = await Promise.all(detailsPromises);
  console.log(details);
  return details;
}

// this function exists because the episodeId of the film is NOT the same as the ID we would use to make a request for just this movie's details.  We have to extract that from the URL provided instead.
function getFilmId(filmUrl) {
  const parts = filmUrl.split("/");
  //the id will always be the second to last entry in the array because there is a trailing slash...
  console.log(parts[parts.length - 2]);
  return parts[parts.length - 2];
}
