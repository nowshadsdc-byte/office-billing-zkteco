# Docker setup for OfficeBilling

Quick start (build and run):

```bash
docker compose up --build -d
```

Shell into app container (for artisan/composer):

```bash
docker compose exec app sh
# inside: composer install
# inside: php artisan key:generate
# inside: php artisan migrate --seed
```

Open the app at: http://localhost:8080

Notes:
- DB credentials are in `docker-compose.yml` (MYSQL_ROOT_PASSWORD, etc.).
- Volumes mount the project into the container for live edits.
- If you change PHP extensions, rebuild the `app` image.
