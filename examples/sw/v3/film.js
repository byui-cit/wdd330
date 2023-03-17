/*
  get detailed info on film
        output film details
        for each planet
            get planet info
            render planet with planet template
        for each species
            get species info
            render with template
        for each starship
            get info
            render with template
        for each vehicle
            get info
            render with template

*/
import { renderFilmDetails } from "./swapiHelper.mjs";
console.log(window.location);
// if you inspect the location logged above you will see that everything in the URL after a ? gets put into search.
const queryString = window.location.search;
// use the built in URLSearchParams object to parse the search string for use
const urlParams = new URLSearchParams(queryString);
// then we can use the .get() method to retrieve the specific param we need.
const filmId = urlParams.get("filmId");

renderFilmDetails(filmId, "#output");
