# Sistem Data Mahasiswa (PWEB)

Dokumentasi lengkap untuk instalasi dan menjalankan aplikasi Sistem Data Mahasiswa (React + PHP Native).

## Prasyarat (Requirements)
Pastikan software berikut sudah terinstall di komputer Anda:
1.  **Git**: Untuk clone repository. [Download Git](https://git-scm.com/downloads)
2.  **Node.js** (LTS Version): Untuk menjalankan React Frontend. [Download Node.js](https://nodejs.org/)
3.  **Laragon** atau **XAMPP**: Untuk server PHP dan Database MySQL. [Download Laragon](https://laragon.org/download/)

---

## Panduan Instalasi (Step-by-Step)

### 1. Clone Repository
Buka terminal (CMD / PowerShell / Git Bash) dan jalankan perintah berikut untuk mengunduh source code:

```bash
# Clone repository ke komputer lokal
git clone https://github.com/kerb0y/pweb-p2

# Masuk ke folder project
cd pweb-p2
```
*(Ganti URL di atas dengan URL repository GitHub Anda yang sebenarnya)*

### 2. Setup Backend & Database
Aplikasi ini membutuhkan database MySQL agar dapat berjalan.

1.  **Jalankan Server Local**:
    *   Buka **Laragon** atau **XAMPP**.
    *   Klik **Start All** (Apache & MySQL).

2.  **Buat Database**:
    *   Buka browser dan akses **phpMyAdmin** (biasanya di `http://localhost/phpmyadmin`).
    *   Buat database baru dengan nama: `pweb_bintang`.

3.  **Import Tabel**:
    *   Pilih database `pweb_bintang` yang baru dibuat.
    *   Masuk ke tab **SQL**.
    *   Copy dan Paste query berikut, lalu klik **Go/Kirim**:

    ```sql
    CREATE TABLE mhs_bintang (
        id INT AUTO_INCREMENT PRIMARY KEY,
        npm VARCHAR(20) NOT NULL,
        nama VARCHAR(100) NOT NULL,
        kelas VARCHAR(20) NOT NULL
    );
    ```

4.  **Konfigurasi Koneksi**:
    *   Pastikan file `connection.php` di root folder project sudah sesuai dengan settingan database Anda.
    *   Default (XAMPP/Laragon):
        ```php
        $host = "localhost";
        $username = "root";
        $password = ""; // Kosongkan jika tidak ada password
        $database = "pweb_bintang";
        ```

5.  **Penempatan File (PENTING)**:
    *   Jika menggunakan **Laragon**, pastikan folder project berada di `C:\laragon\www\pweb_bintang`.
    *   Jika menggunakan **XAMPP**, pindahkan folder project ke `C:\xampp\htdocs\pweb_bintang`.
    *   Backend dapat diakses di: `http://localhost/pweb_bintang/read.php` (Coba buka di browser untuk tes, jika muncul JSON kosong/error berarti sudah jalan).

### 3. Setup Frontend (React)
Setelah backend siap, sekarang kita setup tampilan antarmuka.

1.  **Buka Terminal di Folder Frontend**:
    Pastikan Anda berada di dalam folder `fe2`.
    ```bash
    cd fe2
    ```

2.  **Install Dependencies**:
    Download semua library yang dibutuhkan (dilakukan sekali saja).
    ```bash
    npm install
    ```

3.  **Jalankan Aplikasi**:
    ```bash
    npm start
    ```

4.  **Selesai!**:
    Browser akan otomatis terbuka di `http://localhost:3000`.

---

## Struktur Project
```
pweb_bintang/
├── connection.php      # Koneksi ke Database
├── read.php            # API Read Data
├── create.php          # API Create Data
├── update.php          # API Update Data
├── delete.php          # API Delete Data
└── fe2/                # Folder Frontend (React)
    ├── public/
    ├── src/
    │   ├── components/ # Komponen (Navbar, Modal, dll)
    │   ├── pages/      # Halaman (Home, DataMahasiswa)
    │   └── App.js
    └── package.json
```

## Troubleshooting
- **Error "Network Error"**: Pastikan Apache/MySQL di Laragon/XAMPP sudah berjalan.
- **Data tidak muncul**: Cek konfigurasi database di `connection.php` dan pastikan nama database sesuai.
- **npm start gagal**: Coba hapus folder `node_modules` dan file `package-lock.json`, lalu jalankan `npm install` ulang.
