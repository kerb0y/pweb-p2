# Sistem Data Mahasiswa (PWEB)

Aplikasi web untuk manajemen data mahasiswa Universitas Gunadarma, dibuat menggunakan React.js untuk frontend dan PHP Native untuk backend.

## Fitur
- **CRUD Data Mahasiswa**: Tambah, Lihat, Ubah, dan Hapus data mahasiswa.
- **Import CSV**: Fitur untuk mengimport banyak data sekaligus dari file CSV.
- **Responsive Design**: Tampilan yang menyesuaikan dengan perangkat (Desktop & Mobile).
- **Modern UI**: Menggunakan Tailwind CSS untuk tampilan yang menarik.

## Teknologi yang Digunakan
- **Frontend**: React.js, Tailwind CSS, Axios, React Router.
- **Backend**: PHP Native (REST API).
- **Database**: MySQL.

## Persyaratan Sistem
Sebelum menjalankan aplikasi, pastikan Anda telah menginstal:
1. **Node.js** (untuk menjalankan React).
2. **Laragon** atau **XAMPP** (untuk menjalankan PHP dan MySQL).

## Cara Menjalankan Program (Dari Awal)

### 1. Setup Backend & Database

1.  Pastikan **Laragon** atau **XAMPP** sudah berjalan (Start All).
2.  Buat database baru di phpMyAdmin dengan nama: `pweb_bintang`.
3.  Jalankan query SQL berikut untuk membuat tabel yang dibutuhkan:

    ```sql
    CREATE TABLE mhs_bintang (
        id INT AUTO_INCREMENT PRIMARY KEY,
        npm VARCHAR(20) NOT NULL,
        nama VARCHAR(100) NOT NULL,
        kelas VARCHAR(20) NOT NULL
    );
    ```

4.  Pastikan file backend PHP (`connection.php`, `read.php`, dll) berada di root folder server lokal Anda.
    *   Jika menggunakan Laragon: `C:\laragon\www\pweb_bintang\`
    *   Pastikan file `connection.php` sudah sesuai dengan konfigurasi database Anda:
        ```php
        $host = "localhost";
        $username = "root";
        $password = ""; // Sesuaikan dengan password database Anda (kosongkan jika default XAMPP/Laragon)
        $database = "pweb_bintang";
        ```

### 2. Setup Frontend

1.  Buka terminal (CMD/PowerShell/Git Bash).
2.  Masuk ke folder frontend (`fe2`):
    ```bash
    cd fe2
    ```
3.  Install dependencies (hanya perlu dilakukan sekali):
    ```bash
    npm install
    ```
4.  Jalankan aplikasi:
    ```bash
    npm start
    ```
5.  Browser akan otomatis terbuka di `http://localhost:3000`.

## Struktur Folder

- `/` (Root): Berisi file backend PHP (`read.php`, `create.php`, dll).
- `/fe2`: Berisi source code frontend React.
  - `/src/pages`: Halaman-halaman aplikasi.
  - `/src/components`: Komponen reusable (Navbar, Modal, dll).

## Catatan Penting
- Pastikan backend berjalan di `http://localhost/pweb_bintang`. Jika URL berbeda, sesuaikan variabel `API_URL` di file `src/pages/DataMahasiswaPage.jsx`.
