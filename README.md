# Todo API — Express.js + Drizzle ORM

REST API untuk manajemen todo berbasis Express.js dengan MySQL dan Drizzle ORM.

## Tech Stack

- **Runtime:** Node.js >= 18
- **Framework:** Express.js
- **Database:** MySQL
- **ORM:** Drizzle ORM
- **Deploy:** Railway

## Prasyarat

- Node.js >= 18
- MySQL server
- npm

## Instalasi

```bash
git clone <repo-url>
cd project-kd35
npm install
```

## Konfigurasi

Salin file `.env` dan sesuaikan dengan lingkungan Anda:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=sekolah
PORT=3000
```

| Variable | Deskripsi | Default |
|----------|-----------|---------|
| `DB_HOST` | Host MySQL | `localhost` |
| `DB_USER` | User MySQL | `root` |
| `DB_PASSWORD` | Password MySQL | (kosong) |
| `DB_NAME` | Nama database | `sekolah` |
| `PORT` | Port server | `3000` |

## Database

### Setup database

Buat database MySQL terlebih dahulu:

```sql
CREATE DATABASE sekolah;
```

### Migrasi

```bash
npx drizzle-kit push
```

### Seed data contoh

```bash
npm run seed
```

## Menjalankan Aplikasi

```bash
# Development (dengan auto-reload)
npm run dev

# Production
npm start
```

Server akan berjalan di `http://localhost:3000`.

## API Endpoints

| Method | Endpoint | Deskripsi | Request Body |
|--------|----------|-----------|-------------|
| `GET` | `/` | Root — status API | — |
| `GET` | `/todos` | Ambil semua todo | — |
| `POST` | `/todos` | Tambah todo baru | `{ "title": "string" }` |
| `PUT` | `/todos/:id` | Update status selesai | — |
| `DELETE` | `/todos/:id` | Hapus todo | — |

### Contoh Request

```bash
# Ambil semua todo
curl http://localhost:3000/todos

# Tambah todo
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Belajar Express.js"}'

# Update status
curl -X PUT http://localhost:3000/todos/1

# Hapus todo
curl -X DELETE http://localhost:3000/todos/1
```

## Struktur Folder

```
project-kd35/
├── server.js              # Entry point aplikasi
├── routes/
│   └── todoRoutes.js      # Definisi routing
├── controllers/
│   └── todoController.js  # Logic handler route
├── models/
│   └── todoModel.js       # Akses database (Drizzle ORM)
├── schema/
│   └── todos.js           # Definisi tabel todo
├── db/
│   └── index.js           # Config koneksi MySQL (pool)
├── seed.js                # Data contoh
├── drizzle.config.js      # Konfigurasi Drizzle Kit
├── drizzle/               # Hasil migrasi (auto-generated)
├── railway.toml           # Konfigurasi Railway
├── .env                   # Environment variables (tidak di-commit)
├── .gitignore
└── package.json
```

## Deploy ke Railway

1. Push repository ke GitHub.
2. Di Railway dashboard, buat project baru → pilih **Deploy from GitHub repo**.
3. Set environment variables di Railway:
   - `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
4. Railway otomatis mendeteksi `npm start` dan menjalankan server.
   - Port diatur otomatis oleh Railway (`process.env.PORT`).
5. Untuk migrasi database, jalankan via Railway shell:
   ```bash
   npx drizzle-kit push
   ```
   Atau tambahkan script `postinstall` di `package.json` jika ingin otomatis.
