# MediaHeaven

## Tentang Proyek
MediaHeaven adalah aplikasi web interaktif yang dirancang untuk meningkatkan pengalaman menonton film Anda. Dengan mudah, Anda dapat menjelajahi katalog film yang kaya, dilengkapi dengan informasi detail seperti sinopsis, tanggal rilis, dan daftar pemeran, semua didukung oleh API eksternal. Salah satu fitur unggulan MediaHeaven adalah kemampuan bagi pengguna terdaftar untuk membuat dan mengelola daftar tontonan pribadi, membantu Anda melacak dan mengatur film yang ingin Anda tonton. MediaHeaven dibangun menggunakan HTML, CSS, dan JavaScript untuk pengembangan front-end, serta Node.js untuk backend dan MySQL untuk penyimpanan data yang aman.

## Fitur Utama
1. **Katalog Film Lengkap:** Akses ke basis data film yang luas melalui API terintegrasi.
2. **Daftar Tontonan Pribadi:** Buat dan kelola daftar film khusus untuk ditonton.
3. **Akun Pengguna:** Pendaftaran dan login yang aman untuk pengalaman yang dipersonalisasi.
4. **Informasi Film Detail:** Detail mendalam tentang setiap film, termasuk plot, pemeran, dan kru.
5. **Antarmuka Ramah Pengguna:** Desain yang intuitif dan menarik untuk pengalaman yang menyenangkan.

## Cara Menjalankan Proyek
Untuk menjalankan proyek MediaHeaven secara lokal, ikuti langkah-langkah berikut:

### 1. Unduh Repository
Unduh atau clone repository ini ke komputer Anda:
```bash
git clone https://github.com/username/mediaheaven.git
cd mediaheaven
```

### 2. Setup Database MySQL
- Pastikan MySQL telah terinstal di komputer Anda.
- Buka tool seperti phpMyAdmin, DataGrip, atau MySQL Workbench.
- Buat database baru dengan nama `mediaheaven`.
- Impor file `mediaheaven.sql` yang terdapat di folder `DATABASE` ke dalam database tersebut.

### 3. Instalasi Dependencies Node.js
Jalankan perintah berikut di terminal untuk menginstal dependencies:
```bash
npm install express body-parser cors mysql2
```

### 4. Jalankan Server Node.js
Pastikan database MySQL telah berjalan, lalu jalankan server Node.js:
```bash
node server.js
```

### 5. Akses Website
Buka browser Anda dan akses website melalui URL:
```
http://localhost:3001
```

## Penjelasan Dependencies
1. **express:** Framework untuk membangun aplikasi web di Node.js.
2. **body-parser:** Middleware untuk memparsing body request, terutama untuk format JSON dan URL-encoded.
3. **cors:** Middleware untuk mengatur Cross-Origin Resource Sharing.
4. **mysql2:** Library untuk menghubungkan Node.js dengan MySQL.

## Endpoint API

### 1. Root Endpoint
- **URL:** `/`
- **Metode:** GET
- **Deskripsi:** Menampilkan pesan selamat datang untuk API MediaHeaven.

### 2. Registrasi
- **URL:** `/register`
- **Metode:** POST
- **Body:** `{ username, email, password }`
- **Deskripsi:** Menambahkan pengguna baru ke database.

### 3. Login
- **URL:** `/login`
- **Metode:** POST
- **Body:** `{ username, password }`
- **Deskripsi:** Memeriksa kredensial login pengguna.

### 4. Tambah ke Wishlist
- **URL:** `/add-to-wishlist`
- **Metode:** POST
- **Body:** `{ id_movie, username }`
- **Deskripsi:** Menambahkan film ke wishlist pengguna.

### 5. Lihat Wishlist
- **URL:** `/wishlist`
- **Metode:** GET
- **Query Parameter:** `username`
- **Deskripsi:** Menampilkan daftar film di wishlist pengguna.

### 6. Hapus Wishlist
- **URL:** `/wishlist`
- **Metode:** DELETE
- **Body:** `{ id_movie, username }`
- **Deskripsi:** Menghapus film dari wishlist pengguna.

### 7. Tambahkan Postingan Komunitas
- **URL:** `/addPost`
- **Metode:** POST
- **Body:** `{ comment }`
- **Deskripsi:** Menambahkan komentar ke komunitas.

### 8. Lihat Postingan Komunitas
- **URL:** `/getPosts`
- **Metode:** GET
- **Deskripsi:** Menampilkan semua komentar komunitas.

## Catatan Penting
- Proyek ini membutuhkan MySQL yang berjalan di mesin lokal.
- Gunakan editor teks seperti WebStorm atau VS Code untuk kemudahan pengembangan.
- Pastikan untuk mengganti konfigurasi koneksi database jika diperlukan.
- Dikarenakan GitHub tidak dapat running file Node, jadi diharapkan user untuk mengunduh file nya dan menjalankan nya di local

