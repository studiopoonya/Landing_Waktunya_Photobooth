# FotoBooth Backend — Setup Guide

## Prerequisites
- PHP 8.2+
- Composer
- MySQL 8.0+ (or SQLite for quick start)
- Node.js (for Filament assets)

## 1. Install Dependencies

```bash
composer install
```

## 2. Configure Environment

```bash
cp .env.example .env
php artisan key:generate
```

Edit `.env` and fill in your database credentials:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=photobooth
DB_USERNAME=root
DB_PASSWORD=your_password
```

For SQLite (quick start):
```
DB_CONNECTION=sqlite
# create the file first: touch database/database.sqlite
```

## 3. Run Migrations

```bash
php artisan migrate
```

## 4. Create Admin User

```bash
php artisan make:filament-user
```
Fill in name, email, and password when prompted.

## 5. Start the Server

```bash
php artisan serve
# API available at http://localhost:8000/api
# Admin panel at http://localhost:8000/admin
```

## API Endpoint

### POST /api/leads
Submit a new lead from the landing page.

**Request Body:**
```json
{
  "name": "Budi Santoso",
  "phone": "+628123456789",
  "email": "budi@example.com"
}
```

**Accepted phone formats:** `+62xxx`, `62xxx`, `08xxx`

**Success Response (201):**
```json
{
  "message": "Data berhasil disimpan. Tim kami akan menghubungi Anda segera.",
  "data": {
    "id": 1,
    "name": "Budi Santoso",
    "phone": "+628123456789",
    "email": "budi@example.com",
    "created_at": "2024-01-01T10:00:00.000000Z"
  }
}
```

**Validation Error (422):**
```json
{
  "message": "Validasi gagal.",
  "errors": {
    "phone": ["Format nomor HP tidak valid."]
  }
}
```

## Admin Panel

Visit `http://localhost:8000/admin` and log in with your admin credentials.

Features:
- View all leads with search & date filter
- Delete individual or bulk leads
- Export selected leads to Excel (.xlsx)
- Badge count on sidebar navigation
