## Для сборки и запуска приложения в фоне выбираем команду:
```bash
docker-compose up -d --build
```

## Для запуска приложения выбираем команду:
```bash
docker-compose up
```

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

<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework. You can also check out [Laravel Learn](https://laravel.com/learn), where you will be guided through building a modern Laravel application.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

