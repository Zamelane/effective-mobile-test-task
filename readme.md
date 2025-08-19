<p align="center">
<a href="./readme.md">EN</a>
|
<a href="./readme_ru.md">RU</a>
</p>

<h1 align="center" style="font-weight: bold;">Effective Mobile Test Task 💻</h1>

<p align="center">
<a href="#tech">Technologies</a>
<a href="#started">Getting Started</a>
<a href="#routes">API Endpoints</a>
<a href="#colab">Collaborators</a>
<a href="#contribute">Contribute</a> 
</p>


<p align="center">A test task from effective mobile</p>


<p align="center">
<a href="https://t.me/zamelane">📱 Contact with me</a>
</p>

<p align="center">
<a href="https://docs.360.yandex.ru/docs/view?url=ya-disk-public%3A%2F%2FG%2FsBR6g5Su%2Bg4Zy0ZkTVj%2FfUwmFav9FA38Wj3Dl0fQUUMR8W8zrvMeqtM0mvyhBBskEAmkQ4kXOg0TR8ZsXayQ%3D%3D&name=ТЗ_Node.js.docx">📝 Technical specification</a>
</p>

<h2 id="layout">🎨 Layout</h2>

<p align="center">

<img src="https://picsum.photos/1080/1920" alt="Random Image" width="400px">
<img src="https://picsum.photos/1080/1920" alt="Random Image" width="400px">
</p>

<h2 id="technologies">💻 Technologies</h2>

- Vite (React Router v7)
- React
- Express
- TypeScript
- Drizzle ORM (PostgreSQL)

<h2 id="started">🚀 Getting started</h2>

The project includes several components: a basic web application for interacting with the API, an API server, as well as packages containing common data types and database access.

It is recommended to use the web application in conjunction with the API server through the static content mechanism.

Detailed instructions on how to set up and launch the project are provided in the following sections.

<h3>Prerequisites</h3>

To implement the project, the following software components are required:

- [NodeJS](https://nodejs.org/)
- [Git](https://git-scm.com/)

<h3>Cloning</h3>

Copy this repository and go to its root directory

```bash
git clone https://github.com/Zamelane/effective-mobile-test-task
```

<h3>Config .env variables</h2>

It is necessary to create a configuration file with the ".env" extension.

To do this, use the .env.example file as a template. In the created .env file, you need to enter your credentials for accessing the database and other parameters, if necessary.

During the system initialization task, it is recommended to make changes exclusively to the section on DATABASE configuration. It is important to specify the correct connection parameters to your database.

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

<h3>Starting</h3>

Before starting the project, the following steps must be performed::

###### 1. Creating a database structure and initializing it with test data:

* Make sure that the database specified in the .env configuration file exists.
* Check the availability of the public schema in the database and its current state (it should be empty).

###### 2. Generating tables in the database:

Run the command in the root of the repository to create the table structure:

```bash
npm run db:migrate
```

###### 3. Populating the database with test data:

To enter the test data, run the following command:

```bash
npm run db:seed
```

###### 4. Building the web part of the project:

Assemble the web components of the project using the command:

```bash
npm run web:build
```

###### 5. Server startup and health check:

After completing the above steps, start the server and follow the link displayed in the console.

```bash
npm run api:dev
```

<h2 id="routes">📍 API Endpoints</h2>

The main API routes are shown here and the expected request types are indicated.

For clarity, the prefix "/api" is omitted. Take this into account before using!
​
| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>POST /login</kbd> | User authentication in the system. For more information, see [the request details section](#login-detail).
| <kbd>POST /registration</kbd> | Registration of a new user in the system. For more information, see [the request details section](#registration-detail).
| <kbd>GET /users/:id</kbd> | Getting information about a specific user by their ID. For more information, see [the request details section](#get-user-detail).
| <kbd>POST /users/:id</kbd> | Updating user profile data with the specified ID. For more information, see [the request details section](#update-user-detail).
| <kbd>POST /users/:id/ban</kbd> | Blocking (ban) the user by ID. For more information, see [the request details section](#ban-user-detail).
| <kbd>POST /users/:id/unban</kbd> | Unblocking (removing ban) a user by ID. For more information, see [the request details section](#unban-user-detail).
| <kbd>GET /usersList/:page?pageSize={number}</kbd> | Getting a page-by-page list of users with the ability to specify the page size. For more information, see [the request details section](#users-list-detail).

<h3 id="login-detail">POST /login</h3>

**REQUEST**
```json
{
  "email": "admin@admin.com",
  "password": "admin!"
}
```

**RESPONSE**
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

**REQUEST**
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

**RESPONSE**
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

**RESPONSE**
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

**REQUEST**
```json
{
  "firstName": "Имя",
  "lastName": "Фамилия",
  "middleName": "Отчество",
  "birthDate": "2025-08-01T00:00:00.000Z",
  "email": "superTest@mail.ru"
}
```

**RESPONSE**
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

**RESPONSE**
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

**RESPONSE**
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

**RESPONSE**
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

<h2 id="colab">🤝 Collaborators</h2>

<p>Special thank you for all people that contributed for this project.</p>
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

<h2 id="contribute">📫 Contribute</h2>

To contribute to the project, follow these steps:

1. `git clone https://github.com/zamelane/effective-mobile-test-task.git`
2. `git checkout -b feature/NAME`
3. Follow the commit templates
4. Open a pool request with a description of the solved problem or implemented function, if any, attach a screenshot of the visual changes and wait for verification!

<h3>Documentations that might help</h3>

[📝 How to create a Pull Request](https://www.atlassian.com/br/git/tutorials/making-a-pull-request)

[💾 Commit pattern](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
