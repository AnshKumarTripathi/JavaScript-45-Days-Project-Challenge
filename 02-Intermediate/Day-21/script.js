function searchMovie() {
  const searchTerm = document.getElementById("search").value;
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${searchTerm}`
  )
    .then((response) => response.json())
    .then((data) => {
      const movie = data.results[0];
      const movieInfo = `
              <h2>${movie.title}</h2>
              <p>Release Date: ${movie.release_date}</p>
              <p>Overview: ${movie.overview}</p>
              <p>Rating: ${movie.vote_average}</p>
          `;
      document.getElementById("movie-info").innerHTML = movieInfo;
    })
    .catch((error) => console.error("Error:", error));
}
