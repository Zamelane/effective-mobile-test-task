<p align="center">
<a href="./readme.md">EN</a>
|
<a href="./readme_ru.md">RU</a>
</p>

<h1 align="center" style="font-weight: bold;">Тестовое задание Effective Mobile 💻</h1>

<p align="center">
<a href="#tech">Технологии</a>
<a href="#started">Начало работы</a>
<a href="#routes">API Эндпоинты</a>
<a href="#colab">Участники</a>
<a href="#contribute">Вклад в проект</a>
</p>


<p align="center">Тестовое задание от Effective Mobile</p>


<p align="center">
<a href="https://t.me/zamelane">📱 Связаться со мной</a>
</p>

<p align="center">
<a href="https://docs.360.yandex.ru/docs/view?url=ya-disk-public%3A%2F%2FG%2FsBR6g5Su%2Bg4Zy0ZkTVj%2FfUwmFav9FA38Wj3Dl0fQUUMR8W8zrvMeqtM0mvyhBBskEAmkQ4kXOg0TR8ZsXayQ%3D%3D&name=ТЗ_Node.js.docx">📝 Техническое задание</a>
</p>

<h2 id="technologies">💻 Технологии</h2>

- Vite (React Router v7)
- React
- Express
- TypeScript
- Drizzle ORM (PostgreSQL)

<h2 id="started">🚀 Начало работы</h2>

Проект включает несколько компонентов: базовое веб-приложение для взаимодействия с API, сервер API, а также пакеты, содержащие общие типы данных и доступ к базе данных.

Рекомендуется использовать веб-приложение в связке с сервером API через механизм статического контента.

Подробные инструкции по настройке и запуску проекта приведены в следующих разделах.

<h3>Предварительные требования</h3>

Для реализации проекта требуются следующие программные компоненты:

- [NodeJS](https://nodejs.org/)
- [Git](https://git-scm.com/)

<h3>Клонирование</h3>

Скопируйте этот репозиторий и перейдите в его корневую директорию:

```bash
git clone https://github.com/Zamelane/effective-mobile-test-task
```

<h3>Настройка переменных .env</h2>

Необходимо создать файл конфигурации с расширением ".env".

Для этого используйте файл .env.example в качестве шаблона. В созданном файле .env нужно ввести ваши учётные данные для доступа к базе данных и другие параметры, при необходимости.

В ходе задачи инициализации системы рекомендуется вносить изменения исключительно в раздел конфигурации DATABASE. Важно указать правильные параметры подключения к вашей базе данных.

```yaml
############
# DATABASE #
############
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_PORT=5432
DB_NAME=emtt

#######
# API #
#######
API_PORT=3000
API_JWT_SECRET=zR8J0MA9jh6lfyQMAeeYFUknQdPS6lM7

NODE_ENV=production # development
```

<h3>Запуск</h3>

Перед запуском проекта необходимо выполнить следующие шаги:

###### 1. Создание структуры базы данных и инициализация её тестовыми данными:

* Убедитесь, что база данных, указанная в файле конфигурации .env, существует.
* Проверьте наличие публичной схемы (public schema) в базе данных и её текущее состояние (она должна быть пустой).

###### 2. Генерация таблиц в базе данных:

Выполните команду в корне репозитория для создания структуры таблиц:

```bash
npm run db:migrate
```

###### 3. Заполнение базы данных тестовыми данными:

Для ввода тестовых данных выполните следующую команду:

```bash
npm run db:seed
```

###### 4. Сборка веб-части проекта:

Соберите веб-компоненты проекта с помощью команды:

```bash
npm run web:build
```

###### 5. Запуск сервера и проверка работоспособности:

После выполнения вышеуказанных шагов запустите сервер и перейдите по ссылке, отображаемой в консоли.

```bash
npm run api:dev
```

<h2 id="routes">📍 API Эндпоинты</h2>

Здесь показаны основные маршруты API и указаны ожидаемые типы запросов.

Для наглядности префикс "/api" опущен. Учитывайте это перед использованием!
​
| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>POST /login</kbd> | Аутентификация пользователя в системе. Подробнее см. [в разделе с деталями запроса](#login-detail).
| <kbd>POST /registration</kbd> | Регистрация нового пользователя в системе. Подробнее см. [в разделе с деталями запроса](#registration-detail).
| <kbd>GET /users/:id</kbd> | Получение информации о конкретном пользователе по его ID. Подробнее см. [в разделе с деталями запроса](#get-user-detail).
| <kbd>POST /users/:id</kbd> | Обновление данных профиля пользователя с указанным ID. Подробнее см. [в разделе с деталями запроса](#update-user-detail).
| <kbd>POST /users/:id/ban</kbd> | Блокировка (бан) пользователя по ID. Подробнее см. [в разделе с деталями запроса](#ban-user-detail).
| <kbd>POST /users/:id/unban</kbd> | Разблокировка (снятие бана) пользователя по ID. Подробнее см. [в разделе с деталями запроса](#unban-user-detail).
| <kbd>GET /usersList/:page?pageSize={number}</kbd> | Получение постраничного списка пользователей с возможностью указания размера страницы. Подробнее см. [в разделе с деталями запроса](#users-list-detail).

<h3 id="login-detail">POST /login</h3>

**ЗАПРОС**
```json
{
  "email": "admin@admin.com",
  "password": "admin!"
}
```

**ОТВЕТ**
```json
{
  "userInfo": {
    "id": 853,
    "firstName": "Admin",
    "lastName": "Adminovich",
    "middleName": "",
    "birthDate": "2010-10-09T00:00:00.000Z",
    "email": "admin@admin.com",
    "role": "admin",
    "isActive": true,
    "createdAt": "2025-08-19T15:59:26.943Z",
    "updatedAt": "2025-08-19T15:59:26.943Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

<h3 id="registration-detail">POST /registration</h3>

**ЗАПРОС**
```json
{
  "firstName": "Имя",
  "lastName": "Фамилия",
  "middleName": "Отчество",
  "birthDate": "2025-08-01T00:00:00.000Z",
  "email": "superTest@mail.ru",
  "password": "TestPass1!"
}
```

**ОТВЕТ**
```json
{
  "userInfo": {
    "id": 956,
    "firstName": "Имя",
    "lastName": "Фамилия",
    "middleName": "Отчество",
    "birthDate": "2025-08-01T00:00:00.000Z",
    "email": "superTest@mail.ru",
    "role": "user",
    "isActive": true,
    "createdAt": "2025-08-19T18:06:20.273Z",
    "updatedAt": "2025-08-19T18:06:20.273Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

<h3 id="get-user-detail">GET /users/:id</h3>

**ОТВЕТ**
```json
{
  "id": 956,
  "firstName": "Имя",
  "lastName": "Фамилия",
  "middleName": "Отчество",
  "birthDate": "2025-08-01T00:00:00.000Z",
  "email": "superTest@mail.ru",
  "role": "user",
  "isActive": true,
  "createdAt": "2025-08-19T18:06:20.273Z",
  "updatedAt": "2025-08-19T18:06:20.273Z"
}
```

<h3 id="update-user-detail">POST /users/:id</h3>

**ЗАПРОС**
```json
{
  "firstName": "Имя",
  "lastName": "Фамилия",
  "middleName": "Отчество",
  "birthDate": "2025-08-01T00:00:00.000Z",
  "email": "superTest@mail.ru"
}
```

**ОТВЕТ**
```json
{
  "id": 956,
  "firstName": "Имя",
  "lastName": "Фамилия",
  "middleName": "Отчество",
  "birthDate": "2025-08-01T00:00:00.000Z",
  "email": "superTest@mail.ru",
  "role": "user",
  "isActive": true,
  "createdAt": "2025-08-19T18:06:20.273Z",
  "updatedAt": "2025-08-19T18:06:20.273Z"
}
```

<h3 id="ban-user-detail">POST /users/:id/ban</h3>

**ОТВЕТ**
```json
{
  "id": 956,
  "firstName": "Имя",
  "lastName": "Фамилия",
  "middleName": "Отчество",
  "birthDate": "2025-08-01T00:00:00.000Z",
  "email": "superTest@mail.ru",
  "role": "user",
  "isActive": false,
  "createdAt": "2025-08-19T18:06:20.273Z",
  "updatedAt": "2025-08-19T18:06:20.273Z"
}
```

<h3 id="unban-user-detail">POST /users/:id/unban</h3>

**ОТВЕТ**
```json
{
  "id": 855,
  "firstName": "Андрей",
  "lastName": "Васильев",
  "middleName": "Петровна",
  "birthDate": "1992-10-01T00:00:00.000Z",
  "email": "peter.johnson.474@hotmail.com",
  "role": "user",
  "isActive": true,
  "createdAt": "2025-08-19T15:59:27.046Z",
  "updatedAt": "2025-08-19T15:59:27.046Z"
}
```

<h3 id="users-list-detail">GET /usersList/:page?pageSize={number}</h3>

**ОТВЕТ**
```json
{
  "data": [
    {
      "id": 853,
      "firstName": "Admin",
      "lastName": "Adminovich",
      "middleName": "",
      "birthDate": "2010-10-09T00:00:00.000Z",
      "email": "admin@admin.com",
      "role": "admin",
      "isActive": true,
      "createdAt": "2025-08-19T15:59:26.943Z",
      "updatedAt": "2025-08-19T15:59:26.943Z"
    },
    <...>
  ],
  "page": 1,
  "pageSize": 8
}
```

<h2 id="colab">🤝 Участники</h2>

<p>Отдельная благодарность всем, кто принял участие в этом проекте.</p>
<table>
<tr>

<td align="center">
<a href="https://github.com/zamelane">
<img src="https://avatars.githubusercontent.com/u/39529518?v=4" width="100px;" alt="Evgeny Malinin Profile Picture"/><br>
<sub>
<b>Evgeny Malinin</b>
</sub>
</a>
</td>

</tr>
</table>

<h2 id="contribute">📫 Вклад в проект</h2>

Чтобы внести вклад в проект, выполните следующие действия:

1. `git clone https://github.com/zamelane/effective-mobile-test-task.git`
2. `git checkout -b feature/NAME`
3. Следуйте шаблонам коммитов (commit templates)
4. Откройте пул-реквест (pool request -> Pull Request) с описанием решённой проблемы или реализованной функции, если есть, приложите скриншот визуальных изменений и ждите проверки!

<h3>Документация, которая может помочь</h3>

[📝 Как создать Pull Request](https://www.atlassian.com/br/git/tutorials/making-a-pull-request)

[💾 Шаблон коммитов (Commit pattern)](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
