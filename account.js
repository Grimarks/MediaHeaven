document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');

    if (username) {
        // display nama username yang kita pakai saat login
        const usernameElement = document.querySelector('.profile-container h1');
        usernameElement.textContent = username;
    } else {
        // jika dalam localStorage tidak ada data username, bakal di redirect ke login
        window.location.href = 'login.html';
    }

    // Logout
    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', () => {
        // ngapus data username dalam localStorage
        localStorage.removeItem('username');
        window.location.href = 'login.html';
    });
});
