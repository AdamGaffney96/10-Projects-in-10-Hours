MOVIE_DB_API = "bd0fb127088553eb97da4a6aca554e65";

const movieList = document.querySelector(".movie-list");

async function getMovies(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

getMovies(`
https://api.themoviedb.org/3/discover/movie?api_key=bd0fb127088553eb97da4a6aca554e65&language=en-GB&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate`).then(
    data => {
        const movies = data.results;
        const baseLink = "https://image.tmdb.org/t/p/original/";
        movies.forEach(movie => {
            let container = document.createElement("div");
            let poster = document.createElement("img");
            let title = document.createElement("p");
            container.classList.add("movie-container");
            poster.classList.add("poster");
            title.classList.add("title");
            poster.src = `${baseLink}${movie.poster_path}`;
            title.innerHTML = movie.title;
            container.appendChild(poster);
            container.appendChild(title);
            movieList.appendChild(container);
        })
    }
);