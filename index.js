const form = document.querySelector(".search-form");
const input = document.querySelector(".search-input");
const resultsList = document.querySelector(".results-list");
const movieCards = document.querySelectorAll(".movie-card");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const searchValue = input.value.trim();
  fetch(`http://www.omdbapi.com/?apikey=9bb1d683&s=${searchValue}`)
    .then((response) => response.json())
    .then((data) => {
      resultsList.innerHTML = "";
      if (data.Response === "True") {
        const movies = data.Search;
        movies.forEach((movie) => {
          const li = document.createElement("li");
          li.innerHTML = `
                  <div class="movie-card" id="${movie.imdbID}">
                    <figure class="movie-poster">
                      <img src="${movie.Poster}" alt="${movie.Title}" />
                    </figure>
                    <div class="card-content">
                      <p class="movie-title">${movie.Title}</p>
                      <p class="movie-year">${movie.Year}</p>
                      <a href="moviepage.html" class="details-btn" data-imdb-id="${movie.imdbID}">Details</a>
                    </div>
                  </div>
                `;
          resultsList.appendChild(li);
          const detailsBtn = li.querySelector(".details-btn");
          detailsBtn.addEventListener("click", (event) => {
            event.preventDefault();
            const imdbID = event.target.dataset.imdbId;
            fetch(`http://www.omdbapi.com/?apikey=9bb1d683&i=${imdbID}`)
              .then((response) => response.json())
              .then((data) => {
                const movieTitle = document.querySelector(".movie-title");
                const movieYear = document.querySelector(".movie-year");
                const moviePlot = document.querySelector(".movie-plot");
                const moviePoster = document.querySelector(".movie-poster img");
                movieTitle.textContent = data.Title;
                movieYear.textContent = data.Year;
                moviePlot.textContent = data.Plot;
                moviePoster.setAttribute("src", data.Poster);
                console.log(document.querySelector(".movie-title"));
                console.log(document.querySelector(".movie-year"));
                console.log(document.querySelector(".movie-plot"));
              })
              .catch((error) => {
                console.error(error);
              });
          });
        });
      } else {
        resultsList.innerHTML = `<li>No results found for ${searchValue}.</li>`;
      }
    })
    .catch((error) => {
      console.error(error);
      resultsList.innerHTML = `<li>An error occurred while fetching results for ${searchValue}.</li>`;
    });
});
