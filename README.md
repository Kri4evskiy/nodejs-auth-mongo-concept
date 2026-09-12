# Node.js + MongoDB Authentication Concept (REST API)

Концептуальный проект и шаблон реализации аутентификации и авторизации пользователей с использованием **Node.js**, **Express**, **MongoDB** (Mongoose) и **JWT (JSON Web Tokens)**.

---

## 📌 Особенности

- **Регистрация и Вход (Sign Up / Sign In)** с валидацией входных данных.
- **Хеширование паролей** с помощью `bcrypt` / `bcryptjs` (пароли никогда не хранятся в открытом виде).
- **JWT Аутентификация**:
  - Генерация токенов доступа.
  - Защищенные маршруты (Protected Routes) через middleware проверки токена.
- **Ролевая модель доступа (RBAC)**: разграничение прав доступа для обычных пользователей и администраторов (`USER`, `ADMIN`).
- **Работа с базой данных**: интеграция с MongoDB через ODM **Mongoose**.
- **Безопасность**: изоляция переменных окружения и базовая валидация запросов.

---

## 🛠 Стек технологий

- **Runtime:** Node.js
- **Фреймворк:** Express.js
- **База данных:** MongoDB + Mongoose
- **Безопасность и криптография:** JSON Web Token (`jsonwebtoken`), `bcryptjs` / `bcrypt`
- **Валидация данных:** `express-validator`
- **Конфигурация:** `dotenv`

---

## 📁 Структура проекта

```text
├── src/
│   ├── config/             # Конфигурации (подключение к БД, константы)
│   │   └── db.js
│   ├── controllers/        # Контроллеры обработки запросов
│   │   └── authController.js
│   ├── middleware/         # Промежуточные обработчики (authMiddleware, roleMiddleware)
│   │   └── authMiddleware.js
│   ├── models/             # Mongoose схемы и модели (User, Role)
│   │   ├── User.js
│   │   └── Role.js
│   ├── routes/             # Маршрутизация API
│   │   └── authRouter.js
│   └── index.js            # Точка входа в приложение (сервер Express)
├── .env.example            # Пример переменных окружения
├── .gitignore
├── package.json
└── README.md
