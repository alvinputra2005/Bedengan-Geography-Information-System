FROM php:8.3-cli

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y \
    git curl unzip libpq-dev libzip-dev nodejs npm \
    && docker-php-ext-install pdo pdo_pgsql zip \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY composer.json composer.lock package*.json ./

RUN composer install --no-dev --prefer-dist --optimize-autoloader --no-interaction
RUN npm install

COPY . .

RUN npm run build

RUN mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views bootstrap/cache

CMD sh -c "php artisan key:generate --force || true; php artisan migrate --seed --force || true; php artisan serve --host=0.0.0.0 --port=${PORT:-10000}"