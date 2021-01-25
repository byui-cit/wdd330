const baseUrl = 'https://swapi.dev/api/';

function clickableList(list, elementId, callback) {
    const element = document.getElementById(elementId);
    element.innerHTML = list.map(film => `<li>${film.title}</li>`).join('');
    element.addEventListener('click', (e) => {
        console.log(e.target);
        callback(e.target.innerText);
    })

}
function renderListWithTemplate(templateId, parent, list, prepareCallback) {
    const template = document.getElementById(templateId);
    list.forEach(item => {
        // this is really important. We need to clone the template content each time we use it so each instance is separate and unique. If we forget then we may only end up with the last item we want outputted.
      const clone = template.content.cloneNode(true);
      const templateWithData = prepareCallback(clone, item);
      parent.appendChild(templateWithData);
    })
  }

  function preparePlanetTemplate(template, data) {
    // notice the use of template here instead of document. You can restrict your search within an element in this way. our querySelector will look for a class of '.planet-name' INSIDE of our template.
    template.querySelector('.planet-name').innerText +=  data.name;
    template.querySelector('.planet-climate').innerText = data.climate;
    template.querySelector('.planet-terrain').innerText = data.terrain;
    template.querySelector('.planet-year').innerText = data.orbital_period + ' days';
    template.querySelector('.planet-day').innerText = data.rotation_period + ' hrs';
    template.querySelector('.planet-population').innerText = data.population;
    return template;
  }
  function prepareShipTemplate(template, data) {
    
    template.querySelector('.ship-name').innerText =  data.name;
    template.querySelector('.ship-model').innerText = data.model;
    template.querySelector('.ship-class').innerText = data.starship_class;
    template.querySelector('.ship-crew').innerText = data.crew;
    template.querySelector('.ship-passengers').innerText = data.passengers ;
    template.querySelector('.ship-length').innerText = data.length;
    template.querySelector('.ship-speed').innerText = data.max_atmosphering_speed;
    return template;
  }
  

export default class SwapiHelper {
    constructor(outputId, filmId) {
        this.outputId = outputId;
        this.filmId = filmId;
        this.films = [];
    }
    async init() {
        this.films = await this.makeRequest(baseUrl+'films');
        this.films = this.films.results;
        console.log(this.films);
        clickableList(this.films, this.filmId, this.filmSelected.bind(this));
    }
    async makeRequest(url) {
        // we wrap our attempt to get our data from the API in a try/catch block. This gives us better control over what happens if something goes wrong. We can handle errors gracefully instead of things crashing
        try {
            const response = await fetch(url);
            if(response.ok) {
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
   async filmSelected(filmTitle){
        try {
            const film = this.films.find(item => item.title === filmTitle);
            if(!film) {
                throw new Error('Film not found');
            }
            const element = document.getElementById(this.outputId);
            // set film title and other info
            element.querySelector('.film-name').innerText = film.title;
            element.querySelector('.crawl').innerText = film.opening_crawl;
            // insert planets
            const planets = await this.getListDetails(film.planets);
            renderListWithTemplate('planet', element.querySelector('.film-planets'), planets, preparePlanetTemplate);
            // insert starships
            const ships = await this.getListDetails(film.starships);
            renderListWithTemplate('starship', element.querySelector('.film-starships'), ships, prepareShipTemplate);
            // do the same for the rest of the lists...
            
        } catch(err) {
            console.log(err);
        }
    }
    async getListDetails(list) {
        // by calling map with our makeRequest method we will end up with an array of Promises. We have only ever resolved one promise at a time. To resolve a list of Promises we need to use Promise.all(listOfPromises)
        const details = await Promise.all(list.map( url =>  this.makeRequest(url)));
        console.log(details);
        return details;
    }
    renderTemplate(template) {

    }
    
}