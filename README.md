# 🏪 POS-NEW (Point of Sales System)

Aplikasi **Point of Sales (POS)** modern berbasis web dengan arsitektur decoupled menggunakan **Next.js** untuk Frontend dan **Express.js** untuk Backend. Proyek ini dirancang untuk memiliki performa tinggi, keamanan yang solid, dan UI/UX dashboard yang interaktif menggunakan template **TailAdmin Next.js**.

---

## 🏗️ Struktur Proyek

```
POS-NEW/
├── backend/      ← RESTful API (Express.js + Prisma + PostgreSQL)
├── frontend/     ← Client Application (Next.js + React + Tailwind CSS)
└── template/     ← TailAdmin UI Template (referensi komponen dashboard)
```

| Folder | Deskripsi |
| :--- | :--- |
| `backend/` | RESTful API Server dengan **Express.js v5**, **TypeScript**, dan **Prisma ORM** terhubung ke **PostgreSQL** |
| `frontend/` | Aplikasi client-side berbasis **Next.js 16** (App Router), **React 19**, dan **Tailwind CSS v4** |
| `template/` | Template UI **TailAdmin Next.js** (Free) lengkap dengan komponen dashboard, charts, tables, dan dark mode |

---

## 🛠️ Tech Stack & Fitur Utama

### Backend (`/backend`)
| Kategori | Teknologi |
| :--- | :--- |
| Runtime & Language | Node.js & TypeScript (`tsx` dev, `tsc` build) |
| Framework | Express.js v5.2.1 |
| Database ORM | Prisma Client v7.8.0 |
| Database Engine | PostgreSQL |
| Autentikasi | JWT — **Access Token** & **Refresh Token** (tersimpan di DB) |
| Password Hashing | `bcrypt` |
| Validasi Data | `Zod` |
| Testing | Vitest |
| Fitur Lain | CORS, Dotenv, Healthcheck `/up`, Morgan, Winston Logger |

### Frontend (`/frontend`)
| Kategori | Teknologi |
| :--- | :--- |
| Framework | Next.js 16.2.6 (App Router) |
| Library | React 19.2.4 & TypeScript |
| CSS Framework | Tailwind CSS v4 (+ PostCSS) |

### Template Dashboard (`/template`)
- **TailAdmin Next.js** — Template admin dashboard gratis & open-source:
  - Sidebar interaktif & responsive
  - Dukungan **Dark Mode** 🕶️
  - Visualisasi data dengan **ApexCharts**
  - Form elements, alerts, modals, profile page, dan modern tables

---

## 🗄️ Skema Database

Diagram relasi antar model:

```
User ──────────────────────────────┐
 └── Order (1:N)                   │
      ├── OrderDetail (1:N)        │
      │    └── ProductVariant (N:1)│
      └── Customer? (N:1)          │
                                   │
Category ──── Product (1:N)        │
               └── ProductVariant  │
                    (1:N) ─────────┘
RefreshToken (N:1) ──── User
```

| Model | Deskripsi |
| :--- | :--- |
| `User` | Akun pengguna sistem (Admin / Kasir) |
| `RefreshToken` | Menyimpan refresh token JWT untuk kontrol sesi |
| `Customer` | Data pelanggan toko |
| `Category` | Kategori produk |
| `Product` | Data produk dengan relasi ke kategori |
| `ProductVariant` | Varian produk (ukuran, rasa, dll.) dengan harga & stok |
| `Order` | Transaksi penjualan |
| `OrderDetail` | Detail item pada setiap transaksi |

---

## 🚀 Panduan Instalasi & Konfigurasi

### Prasyarat Sistem
- **Node.js** versi 18.x ke atas (sangat disarankan 20.x LTS)
- **PostgreSQL Server** yang sudah terpasang dan berjalan aktif

---

### 1. Setup Backend (REST API)

```bash
# 1. Masuk ke direktori backend
cd backend

# 2. Instal semua dependensi
npm install

# 3. Buat file .env dan sesuaikan konfigurasi
```

Isi file `.env`:
```env
# Konfigurasi Token JWT
ACCESS_TOKEN_SECRET="ganti_dengan_secret_key_akses_anda"
REFRESH_TOKEN_SECRET="ganti_dengan_secret_key_refresh_anda"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# Koneksi Database PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/nama_database?schema=public"

# Port Server (gunakan 5000 agar tidak bentrok dengan Next.js di port 3000)
PORT=5000
```

```bash
# 4. Jalankan migrasi Prisma untuk membuat skema tabel
npx prisma migrate dev --name init

# 5. Lakukan seeding data awal (users, categories, products, orders, dll.)
npm run seed

# 6. Jalankan backend dalam mode pengembangan
npm run dev
```

Server backend berjalan di **`http://localhost:5000`**.

---

### 2. Setup Frontend (Next.js Application)

```bash
# 1. Masuk ke direktori frontend
cd ../frontend

# 2. Instal semua dependensi
npm install

# 3. Jalankan server pengembangan
npm run dev
```

Aplikasi frontend berjalan di **`http://localhost:3000`**.

---

## 👥 Akun Bawaan (Default Seed Users)

Setelah `npm run seed`, akun berikut tersedia di database:

| Nama Lengkap | Username | Password | Role |
| :--- | :--- | :--- | :--- |
| Admin Utama | `admin_pos` | `passwordAdmin` | **`ADMIN`** |
| Kasir Satu | `kasir_toko` | `passwordKasir` | **`KASIR`** |
| Kasir Dua | `kasir_dua` | `passwordKasir2` | **`KASIR`** |

---

## 🌱 Data Seed Lengkap

Perintah `npm run seed` akan mengisi semua tabel secara otomatis. Berikut ringkasannya:

### 🧑‍🤝‍🧑 Customers (6 data)
| Nama | Telepon | Email |
| :--- | :--- | :--- |
| Budi Santoso | 081234567890 | budi@gmail.com |
| Siti Rahayu | 082345678901 | siti@gmail.com |
| Agus Permana | 083456789012 | agus@gmail.com |
| Dewi Lestari | 084567890123 | dewi@gmail.com |
| Roni Kurniawan | 085678901234 | — |
| Pelanggan Umum | — | — |

### 📂 Categories (5 data)
`Makanan` · `Minuman` · `Snack & Cemilan` · `Produk Segar` · `Kebutuhan Rumah Tangga`

### 📦 Products & Variants (12 produk, 33 varian)

| Kategori | Produk | Varian |
| :--- | :--- | :--- |
| Makanan | Nasi Goreng Spesial | Regular, Large, Extra Pedas |
| Makanan | Mie Ayam Bakso | Regular, Special |
| Makanan | Ayam Geprek | Level 1, Level 3, Level 5 |
| Minuman | Es Teh Manis | Small (250ml), Medium (500ml), Large (1000ml) |
| Minuman | Kopi Susu Kekinian | Es, Panas |
| Minuman | Jus Buah Segar | Jeruk, Mangga, Alpukat, Semangka |
| Snack & Cemilan | Keripik Singkong | Original, Pedas Original, BBQ (100g) |
| Snack & Cemilan | Biskuit Cokelat | 150g, 300g |
| Produk Segar | Telur Ayam | 1 Papan (30 butir), 1 Kg, 1 Butir |
| Produk Segar | Sayur Bayam | 1 Ikat (~250g) |
| Kebutuhan RT | Sabun Cuci Piring | 200ml, 800ml |
| Kebutuhan RT | Detergen Bubuk | 500g, 1 Kg, 5 Kg |

### 🧾 Orders (5 transaksi)

| Invoice | Kasir | Customer | Pembayaran |
| :--- | :--- | :--- | :--- |
| INV-YYYYMMDD-0001 | admin_pos | — (umum) | CASH |
| INV-YYYYMMDD-0002 | kasir_toko | Budi Santoso | CASH |
| INV-YYYYMMDD-0003 | kasir_toko | Siti Rahayu | QRIS |
| INV-YYYYMMDD-0004 | kasir_dua | Pelanggan Umum | TRANSFER |
| INV-YYYYMMDD-0005 | kasir_dua | Agus Permana | CASH |

> **Catatan:** Format invoice menyesuaikan tanggal eksekusi seed, contoh: `INV-20260621-0001`.

---

## 🔌 API Endpoints

Semua endpoint menggunakan prefix `/api` (kecuali health check `/up`).

### 🔓 Public Endpoints (Tanpa Autentikasi)

| Method | Endpoint | Deskripsi | Request Body |
| :---: | :--- | :--- | :--- |
| `GET` | `/up` | Health check & response time | — |
| `POST` | `/api/auth/login` | Login & dapatkan Access + Refresh Token | `{ "username": "...", "password": "..." }` |
| `POST` | `/api/auth/refresh` | Perbarui Access Token menggunakan Refresh Token | `{ "refreshToken": "..." }` |

### 🔒 Protected Endpoints (Memerlukan `Authorization: Bearer <access_token>`)

| Method | Endpoint | Deskripsi |
| :---: | :--- | :--- |
| `GET` | `/api/auth/me` | Ambil data profil user yang sedang login |
| `POST` | `/api/auth/logout` | Logout & hapus refresh token dari database |
| `GET` | `/api/categories` | Ambil semua kategori (support pagination & search) |
| `GET` | `/api/categories/:id` | Ambil satu kategori berdasarkan ID |
| `POST` | `/api/categories` | Buat kategori baru |
| `PUT` | `/api/categories/:id` | Perbarui kategori |
| `DELETE` | `/api/categories/:id` | Hapus kategori (soft delete) |

---

## 📜 NPM Scripts (Backend)

| Script | Perintah | Deskripsi |
| :--- | :--- | :--- |
| `dev` | `npm run dev` | Jalankan server dalam mode development (hot-reload) |
| `build` | `npm run build` | Kompilasi TypeScript ke JavaScript |
| `start` | `npm run start` | Jalankan server dari hasil build |
| `seed` | `npm run seed` | Jalankan seeding seluruh data ke database |
| `test` | `npm run test` | Jalankan unit test dengan Vitest |
| `test:watch` | `npm run test:watch` | Jalankan test dalam mode watch |
| `test:coverage` | `npm run test:coverage` | Jalankan test dengan laporan coverage |

---

## 🎨 Integrasi Template TailAdmin ke Frontend

Folder `/template` disediakan sebagai referensi komponen UI dashboard premium:

1. Salin folder `/src` dari `/template` ke `/frontend` (sesuaikan routing & komponen yang ada).
2. Tambahkan dependensi tambahan seperti `apexcharts` dan `react-apexcharts` dari `template/package.json` ke `frontend/package.json` jika diperlukan.
3. Manfaatkan ikon, grafik, dan UI elements dari template untuk tampilan dashboard POS yang menarik, responsif, dan modern bagi Admin maupun Kasir.

---

## 📝 Lisensi

Proyek ini menggunakan lisensi **ISC**.
