#!/bin/bash
set -e

APP_DIR="/var/www/app"
BACKEND_DIR="$APP_DIR/backend"
FRONTEND_DIR="$APP_DIR/frontend"

echo "=============================="
echo " Starting Deployment..."
echo "=============================="

# 1. Pull latest code
echo "[1/6] Pulling latest code..."
cd "$APP_DIR"
git pull origin main

# 2. Build Frontend
echo "[2/6] Building frontend..."
cd "$FRONTEND_DIR"
npm ci --silent
npm run build

# 3. Install Backend Dependencies
echo "[3/6] Installing PHP dependencies..."
cd "$BACKEND_DIR"
composer install --no-dev --optimize-autoloader --no-interaction

# 4. Run Migrations
echo "[4/6] Running database migrations..."
php artisan migrate --force

# 5. Clear & Cache configs
echo "[5/6] Caching config, routes, and views..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 6. Set storage permissions
echo "[6/6] Setting storage permissions..."
chmod -R 775 "$BACKEND_DIR/storage"
chmod -R 775 "$BACKEND_DIR/bootstrap/cache"

echo ""
echo "=============================="
echo " Deployment Complete!"
echo "=============================="
