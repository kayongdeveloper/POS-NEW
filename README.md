# 🏪 POS-NEW (Point of Sales System)

Aplikasi **Point of Sales (POS)** modern berbasis web dengan arsitektur decoupled menggunakan **Next.js** untuk Frontend dan **Express.js** untuk Backend. Proyek ini dirancang untuk memiliki performa tinggi, keamanan yang solid, dan UI/UX dashboard yang interaktif menggunakan template **TailAdmin Next.js**.

---

## 🏗️ Struktur Proyek

Proyek ini dibagi menjadi tiga bagian utama:

1. **`backend/`**: RESTful API Server yang dibangun dengan **Express.js (v5)**, **TypeScript**, dan **Prisma ORM** yang terhubung ke database **PostgreSQL**.
2. **`frontend/`**: Aplikasi client-side berbasis **Next.js 16** (App Router), **React 19**, dan **Tailwind CSS v4** yang akan menyajikan antarmuka pengguna untuk kasir dan admin.
3. **`template/`**: Folder template UI **TailAdmin Next.js** (Free Version) lengkap dengan component dashboard, charts, tables, sidebar, dan dark mode yang siap diintegrasikan ke folder `frontend/`.

---

## 🛠️ Tech Stack & Fitur Utama

### Backend (`/backend`)
- **Runtime & Language**: Node.js & TypeScript (`tsx` untuk development, `tsc` untuk build)
- **Framework**: Express.js (v5.2.1)
- **Database ORM**: Prisma Client (v7.8.0)
- **Database Engine**: PostgreSQL
- **Keamanan & Autentikasi**:
  - Hashing password menggunakan `bcrypt`.
  - JSON Web Token (`JWT`) dengan mekanisme **Access Token** & **Refresh Token** (yang disimpan di database untuk kontrol invalidasi token di masa depan).
- **Validasi Data**: Schema validation menggunakan `Zod`.
- **Fitur Tambahan**: Cors, Dotenv, Healthcheck endpoint (`/up`) yang mengukur response time.

### Frontend (`/frontend`)
- **Framework**: Next.js 16.2.6 (App Router)
- **Library**: React 19.2.4 & TypeScript
- **CSS Framework**: Tailwind CSS v4 (dilengkapi dengan PostCSS)

### Template Dashboard (`/template`)
- **TailAdmin Next.js**: Template admin dashboard gratis & open-source yang memiliki:
  - Sidebar interaktif & responsive.
  - Dukungan **Dark Mode** 🕶️.
  - Komponen visualisasi data menggunakan **ApexCharts**.
  - Form elements, alert, modals, profile page, dan tables modern.

---

## 🚀 Panduan Instalasi & Konfigurasi

### Prasyarat Sistem
- **Node.js** versi 18.x ke atas (sangat disarankan versi 20.x atau terbaru).
- **PostgreSQL Server** yang sudah terpasang dan berjalan aktif.

---

### 1. Setup Backend (REST API)

1. Masuk ke direktori `backend`:
   ```bash
   cd backend
   ```
2. Instal semua dependensi:
   ```bash
   npm install
   ```
3. Duplikat file konfigurasi environment variables (buat file `.env` di dalam folder `backend` jika belum ada) dan sesuaikan pengaturannya:
   ```env
   # Konfigurasi Token JWT
   ACCESS_TOKEN_SECRET="ganti_dengan_secret_key_akses_anda"
   REFRESH_TOKEN_SECRET="ganti_dengan_secret_key_refresh_anda"
   JWT_EXPIRES_IN="15m"
   JWT_REFRESH_EXPIRES_IN="7d"

   # Koneksi Database PostgreSQL
   DATABASE_URL="postgresql://username:password@localhost:5432/nama_database?schema=public"

   # Port Server
   PORT=3000
   ```
4. Jalankan migrasi Prisma untuk membuat skema tabel ke dalam database PostgreSQL Anda:
   ```bash
   npx prisma migrate dev --name init
   ```
5. Lakukan seeding data awal (memasukkan akun default admin dan kasir ke database):
   ```bash
   npm run seed
   ```
6. Jalankan backend dalam mode pengembangan:
   ```bash
   npm run dev
   ```
   Server backend akan berjalan di **`http://localhost:3000`**.

---

### 2. Setup Frontend (Next.js Application)

1. Masuk ke direktori `frontend`:
   ```bash
   cd ../frontend
   ```
2. Instal semua dependensi:
   ```bash
   npm install
   ```
3. Jalankan server pengembangan Next.js:
   ```bash
   npm run dev
   ```
   Aplikasi frontend akan berjalan di **`http://localhost:3000`** secara default.
   *(Catatan: Anda disarankan mengubah port backend di `.env` menjadi `5000` atau port lain agar tidak bentrok dengan default port Next.js `3000`)*.

---

## 👥 Akun Bawaan (Default Seed Users)

Setelah Anda menjalankan perintah `npm run seed`, akun-akun berikut akan tersedia di database untuk keperluan login uji coba:

| Username | Password | Role | Nama Lengkap / Email |
| :--- | :--- | :--- | :--- |
| **`admin_pos`** | `passwordAdmin` | **`ADMIN`** | admin@pos.com |
| **`kasir_toko`** | `passwordKasir` | **`KASIR`** | kasir@pos.com |

---

## 🔌 API Endpoints yang Tersedia

Semua endpoint API backend menggunakan prefix `/api` (kecuali health check `/up`).

| HTTP Method | Endpoint | Deskripsi | Autentikasi | Request Body (JSON) / Keterangan |
| :--- | :--- | :--- | :---: | :--- |
| **GET** | `/up` | Cek status kesehatan aplikasi & waktu respon. | ❌ Tidak | - |
| **POST** | `/api/auth/login` | Login user untuk mendapatkan Access & Refresh Token. | ❌ Tidak | `{ "username": "...", "password": "..." }` |
| **GET** | `/api/auth/me` | Mendapatkan data profil user yang sedang login. |  Ya (Bearer Token) | Menyertakan header `Authorization: Bearer <access_token>` |

---

## 🎨 Integrasi Template TailAdmin ke Frontend

Folder `/template` disediakan sebagai referensi komponen UI dashboard premium. Untuk menggunakannya pada folder `/frontend`:
1. Anda dapat menyalin folder `/src` dari `/template` ke `/frontend` (sesuaikan dengan file routing dan komponen yang sudah ada).
2. Salin dependensi tambahan seperti `apexcharts`, `react-apexcharts`, dan konfigurasi tailwind/postcss pendukung dari `template/package.json` ke `frontend/package.json` jika diperlukan.
3. Gunakan aset-aset ikon, grafik, dan UI elements dari template untuk membuat tampilan dashboard Point of Sales yang menarik, responsif, dan modern bagi Admin maupun Kasir.

---
