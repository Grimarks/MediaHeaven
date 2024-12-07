const apiKey = 'f8658389b2915edf093d1cbd33cfdec9';
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

//manggil API
const fetchMovieDetails = async () => {
    if (movieId) {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`);
            if (!response.ok) throw new Error('Failed to fetch movie details');

            const movie = await response.json();

            // masukin data dari API lalu kirim paket ke html nyaaaaa
            document.querySelector('.image img').src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            document.querySelector('.details h1').textContent = movie.title;
            document.querySelector('.details .tag').textContent = `Genre: ${movie.genres.map(genre => genre.name).join(', ')}`;
            document.querySelector('.description').textContent = movie.overview;
            document.querySelector('.release-date').textContent = movie.release_date;
            document.querySelector('.rating').textContent = movie.vote_average;

            // jadi misal kita tekan add movio, ini bakal ngambil data id film nya dan di simpan dulu
            const addToWishlistButton = document.querySelector('button[type="submit"]');
            addToWishlistButton.addEventListener('click', () => addToWishlist(movieId));
        } catch (error) {
            console.error('Error, detail Movie tidak ada', error);
        }
    } else {
        console.error('Tidak ada id di URL');
    }
};

const addToWishlist = (id_movie) => {
    const username = localStorage.getItem('username');
    if (!username) {
        alert('Anda harus login untuk menambahkan film ke Wishlist.');
        return;
    }

    fetch('http://localhost:3001/add-to-wishlist', { // Pastikan URL benar
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_movie, username }), // Kirim id_movie dan username
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.message || 'Gagal menambahkan film ke wishlist');
                });
            }
            return response.json();
        })
        .then(data => {
            alert(data.message);
        })
        .catch(error => {
            console.error('Error:', error);
            alert(error.message || 'Terjadi kesalahan saat menambahkan film ke Wishlist.');
        });
};

const toggleFavorite = () => {
    const favoriteIcon = document.querySelector('.favorite');
    favoriteIcon.classList.toggle('active');
    favoriteIcon.textContent = favoriteIcon.classList.contains('active') ? '💔' : '❤️';
};

fetchMovieDetails();
