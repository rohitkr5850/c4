const apiKey = "YOUR_API_KEY";  // Replace with your OMDb API key
let currentPage = 1;
let currentSearch = "";

async function searchMovies() {
    const movieInput = document.getElementById("movie-input").value.trim();
    if (!movieInput) return;

    currentSearch = movieInput;
    currentPage = 1;
    await fetchMovies();
}

async function fetchMovies() {
    const url = https://www.omdbapi.com/?s=${currentSearch}&page=${currentPage}&apikey=${apiKey};
    const moviesContainer = document.getElementById("movies-container");
    const errorMessage = document.getElementById("error-message");

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "False") {
            errorMessage.innerText = data.Error;
            moviesContainer.innerHTML = "";
            document.getElementById("next-btn").disabled = true;
            document.getElementById("prev-btn").disabled = true;
            return;
        }

        displayMovies(data.Search);
        errorMessage.innerText = "";
        updatePagination(data.totalResults);
    } catch (error) {
        errorMessage.innerText = "Failed to fetch data. Please try again later.";
        console.error("Error:", error);
    }
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById("movies-container");
    moviesContainer.innerHTML = "";

    movies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie-item");

        movieElement.innerHTML = `
            <h2>${movie.Title} (${movie.Year})</h2>
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
            <p>Type: ${movie.Type}</p>
        `;
        moviesContainer.appendChild(movieElement);
    });
}

function updatePagination(totalResults) {
    const totalPages = Math.ceil(totalResults / 10);
    document.getElementById("page-info").innerText = Page ${currentPage} of ${totalPages};
    document.getElementById("next-btn").disabled = currentPage >= totalPages;
    document.getElementById("prev-btn").disabled = currentPage <= 1;
}

function nextPage() {
    if (currentPage < Math.ceil(1000 / 10)) {  // API max result limit is 1000 items
        currentPage++;
        fetchMovies();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        fetchMovies();
    }
}