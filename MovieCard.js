
let movies = [];
const apiKey = 'f8658389b2915edf093d1cbd33cfdec9';
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;

// Ambil data dari API
const fetchMovies = async () => {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        movies = data.results;
        renderMovies(movies); // Tampilkan film pertama kali
    } catch (error) {
        console.error('Error fetching movie data:', error);
    }
};

// Fungsi render film ke grid
const renderMovies = (moviesList) => {
    const movieGrid = document.getElementById('movieGrid'); // Deklarasi di sini
    const movieCards = moviesList.map(movie => {
        const movieImage = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/500';
        return `
           <a href="MovieInfo.html?id=${movie.id}" target="_self">
               <div class="card">
                   <img src="${movieImage}" alt="${movie.title}">
                   <h3>${movie.title}</h3>
                   <h3>${movie.release_date}</h3>
                   <h3>${movie.vote_average}</h3>
                   <p>${movie.overview}</p>
               </div>
           </a>
        `;
    }).join('');
    movieGrid.innerHTML = movieCards;
};

// Event untuk tombol "New" (rilis terbaru)
document.getElementById('newButton').addEventListener('click', () => {
    const sortedByDate = [...movies].sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    renderMovies(sortedByDate);
});

// Event untuk tombol "Rating" (rating tertinggi)
document.getElementById('ratingButton').addEventListener('click', () => {
    const sortedByRating = [...movies].sort((a, b) => b.vote_average - a.vote_average);
    renderMovies(sortedByRating);
});

// Buat tombol aktif jadi hitam
document.addEventListener('DOMContentLoaded', function () {
    const newButton = document.getElementById('newButton');
    const ratingButton = document.getElementById('ratingButton');

    newButton.addEventListener('click', function () {
        newButton.classList.add('active');
        ratingButton.classList.remove('active');
    });

    ratingButton.addEventListener('click', function () {
        ratingButton.classList.add('active');
        newButton.classList.remove('active');
    });
});

// Panggil film
fetchMovies();
