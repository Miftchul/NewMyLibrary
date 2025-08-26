# MyLibrary App

MyLibrary adalah aplikasi mobile untuk menelusuri, membaca, dan mengelola koleksi buku digital. Aplikasi ini dibangun sebagai bagian dari proses seleksi magang, menunjukkan implementasi aplikasi full-stack menggunakan React Native dan Supabase.

---

## 📖 Tentang Proyek

Aplikasi ini memungkinkan pengguna untuk mendaftar dan login, menelusuri daftar buku, menambahkan buku ke koleksi pribadi ("MyBooks"), dan membacanya. Terdapat juga sistem hak akses di mana seorang **Admin** dapat mengelola data buku (Tambah, Edit, Hapus) langsung dari dalam aplikasi melalui panel admin khusus.

Proyek ini dibangun dari nol dalam semalam untuk memenuhi tantangan seleksi, dengan fokus pada implementasi backend yang aman, fungsionalitas *real-time*, dan *user experience* yang bersih.

## ✨ Fitur Utama

-   **Autentikasi User**: Sistem registrasi dan login yang aman menggunakan Supabase Auth.
-   **Katalog Buku**: Menampilkan daftar buku dari database PostgreSQL yang bisa ditelusuri.
-   **Koleksi Pribadi (MyBooks)**: Setiap user dapat menyimpan buku pilihannya ke dalam daftar bacaan pribadi.
-   **Mode Baca**: Halaman simpel untuk membaca konten buku.
-   **Panel Admin dengan Fitur CRUD**:
    -   User dengan role Admin memiliki akses ke panel khusus di halaman profil.
    -   **Create**: Menambah data buku baru melalui form di dalam aplikasi.
    -   **Read**: Melihat daftar semua buku yang ada di database.
    -   **Update**: Mengedit informasi buku yang sudah ada.
    -   **Delete**: Menghapus buku dari database.
-   **Keamanan Database (RLS)**: Implementasi Row Level Security di Supabase untuk memastikan:
    -   User hanya bisa melihat dan mengelola data pinjaman miliknya sendiri.
    -   Hanya Admin yang bisa melakukan operasi CUD (Create, Update, Delete) pada data buku.

## 🛠️ Teknologi yang Digunakan

-   **Frontend**: React Native, Expo, TypeScript
-   **Backend & Database**: Supabase
-   **Tipe Database**: PostgreSQL
-   **Navigasi**: Expo Router
-   **State Management**: React Context
-   **Styling**: React Native StyleSheet

## 🚀 Konsep Kunci yang Diimplementasikan

-   **Full-stack Mobile Development**: Mengintegrasikan aplikasi frontend dengan layanan backend dan database.
-   **Otentikasi Real-time**: Mengelola sesi login user secara *real-time* menggunakan Supabase Auth Listener.
-   **Operasi Database SQL**: Melakukan query `SELECT`, `INSERT`, `UPDATE`, dan `DELETE` ke database PostgreSQL dari aplikasi React Native.
-   **Role-Based Access Control (RBAC)**: Membedakan fitur yang tersedia untuk user biasa dan Admin berdasarkan hak akses.
-   **Keamanan Data**: Menerapkan Row Level Security untuk melindungi data user dan membatasi operasi berbahaya.

## ⚙️ Setup & Instalasi Lokal

1.  **Clone repository ini:**
    ```bash
    git clone [URL_REPOSITORY_KAMU]
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Setup Environment Variables:**
    Buat file bernama `.env` di root project dan isi dengan kunci Supabase-mu.
    ```
    EXPO_PUBLIC_SUPABASE_URL=URL_PROYEK_SUPABASE_KAMU
    EXPO_PUBLIC_SUPABASE_ANON_KEY=ANON_PUBLIC_KEY_KAMU
    ```
    Kemudian, ubah file `supabaseClient.ts` untuk membaca variabel ini.

4.  **Jalankan aplikasi:**
    ```bash
    npx expo start
    ```

## 🔮 Rencana Pengembangan Selanjutnya

-   **Upload Gambar Lokal**: Mengganti input URL gambar manual dengan fitur upload dari galeri HP menggunakan `expo-image-picker` dan Supabase Storage.
-   **Panel Admin Berbasis Web**: Membangun dashboard admin terpisah di web untuk manajemen yang lebih komprehensif.
-   **Sistem Rating & Ulasan**: Memungkinkan user untuk memberikan rating dan ulasan pada buku yang telah mereka baca.

---

Dibuat dengan semangat oleh **[Nama Lengkap Kamu]**
-   [LinkedIn Kamu](https://www.linkedin.com/in/agus-miftachul-huda/)
-   [GitHub Kamu](https://github.com/Miftchul)