## Для сборки и запуска приложения в фоне выбираем команду:
```bash
docker compose up -d --build
```

## Для запуска приложения выбираем команду:
```bash
docker compose up
```

## При этом backend работает на 8000 порту, frontend работает на 9133 порту

## После сборки нужно установить зависимости:
```bash
docker compose exec app composer install
docker compose exec app php artisan key:generate
docker compose exec app php artisan migrate
```

## Для очистки конфигурации и кэша:
```bash
docker compose exec app php artisan config:clear
docker compose exec app php artisan cache:clear
```

## Далее устанавливаем в контейнер Sanctum:
```bash
docker compose exec -u $(id -u):$(id -g) app composer require laravel/sanctum
```

## Далее публикуем конфиг и миграции:
```bash
docker compose exec -u $(id -u):$(id -g) app php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

## Прогоняем миграции:
```bash
docker compose exec -u $(id -u):$(id -g) app php artisan migrate
```

## Создаём модель и миграцию для Category:
```bash
docker compose exec -u $(id -u):$(id -g) app php artisan make:model Category -m
```

## Создаём модель и миграцию для Product:
```bash
docker compose exec -u $(id -u):$(id -g) app php artisan make:model Product -m
```

## Запускаем сиды:
```bash
docker compose exec -u $(id -u):$(id -g) app php artisan db:seed
```

## Создаём API Resource:
```bash
docker compose exec -u $(id -u):$(id -g) app php artisan make:resource CategoryResource
```

## Создаём контроллер CategoryController:
```bash
docker compose exec -u $(id -u):$(id -g) app php artisan make:controller Api/CategoryController
```

## Создаём ProductResource:
```bash
docker compose exec -u $(id -u):$(id -g) app php artisan make:resource ProductResource
```

## Создаём ProductController:
```bash
docker compose exec -u $(id -u):$(id -g) app php artisan make:controller Api/ProductController
```

## Создаём товар:
```bash
docker compose exec -u $(id -u):$(id -g) app php artisan make:request StoreProductRequest
```

## Обновление товара:
```bash
docker compose exec -u $(id -u):$(id -g) app php artisan make:request UpdateProductRequest
```
