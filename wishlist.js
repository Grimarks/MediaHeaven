const apiKey = 'f8658389b2915edf093d1cbd33cfdec9';
let wishlistMovies = []; // Menyimpan semua film dalam wishlist

// Ambil data wishlist dari database
const fetchWishlist = async () => {
    const username = localStorage.getItem('username');

    if (!username) {
        alert('You must be logged in to view your wishlist.');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3001/wishlist?username=${username}`);
        if (!response.ok) {
            throw new Error('Failed to fetch wishlist');
        }

        const wishlist = await response.json();
        await fetchMoviesDetails(wishlist);
    } catch (error) {
        console.error('Error fetching wishlist:', error);
        alert('Failed to load wishlist. Please try again later.');
    }
};

// Mengambil detail film berdasarkan ID dari wishlist
const fetchMoviesDetails = async (wishlist) => {
    wishlistMovies = []; // Reset data
    for (const { id_movie } of wishlist) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id_movie}?api_key=${apiKey}&language=en-US`);
            if (!response.ok) {
                throw new Error(`Failed to fetch movie details for ID: ${id_movie}`);
            }

            const movie = await response.json();
            wishlistMovies.push(movie); // Tambahkan film ke array
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    }
    displayWishlist(wishlistMovies); // Tampilkan semua film
};

// Fungsi untuk menampilkan film ke halaman
const displayWishlist = (moviesList) => {
    const grid = document.querySelector('.grid');
    grid.innerHTML = '';
    const movieCards = moviesList.map(movie => `
        <div class="card">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <h2>${movie.title}</h2>
            <p>Rating: ${movie.vote_average}</p>
            <p>${movie.release_date}</p>
            <button onclick="removeFromWishlist(${movie.id})">Remove</button>
        </div>
    `).join('');
    grid.innerHTML = movieCards;
};

// Sorting berdasarkan tanggal rilis terbaru
document.getElementById('newButton').addEventListener('click', () => {
    const sortedByDate = [...wishlistMovies].sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    displayWishlist(sortedByDate);
});

// Sorting berdasarkan rating tertinggi
document.getElementById('ratingButton').addEventListener('click', () => {
    const sortedByRating = [...wishlistMovies].sort((a, b) => b.vote_average - a.vote_average);
    displayWishlist(sortedByRating);
});

// Highlight tombol yang aktif
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

// Fungsi untuk menghapus film dari wishlist
const removeFromWishlist = async (id_movie) => {
    try {
        const username = localStorage.getItem('username');
        if (!username) {
            alert('You must be logged in to remove movies from your wishlist.');
            return;
        }

        const response = await fetch('http://localhost:3001/wishlist', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_movie, username }),
        });

        if (!response.ok) {
            throw new Error('Failed to remove movie from wishlist');
        }

        alert('Movie removed from wishlist!');
        fetchWishlist();
    } catch (error) {
        console.error('Error removing movie from wishlist:', error);
        alert('Failed to remove movie. Please try again later.');
    }
};

// Panggil fetch wishlist saat halaman dimuat
fetchWishlist();
