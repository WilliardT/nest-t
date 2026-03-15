# Auth — описание для фронтенда

## Схема работы

- **accessToken** — возвращается в теле ответа, фронт хранит его сам (память / localStorage)
- **refreshToken** — устанавливается сервером в `httpOnly` cookie автоматически, фронт его не видит и не трогает

---

## Эндпоинты

### `POST /auth/register` — регистрация

**Body:**
```json
{
  "name": "Valera Petrov",
  "email": "valera@mail.ru",
  "password": "valera123"
}
```

| Поле | Тип | Ограничения |
|------|-----|-------------|
| `name` | string | обязательно, макс. 50 символов |
| `email` | string | обязательно, валидный email |
| `password` | string | обязательно, 6–128 символов |

**Ответ `201`:**
```json
{ "accessToken": "eyJ..." }
```

**Ошибки:**
- `400` — невалидные данные
- `409` — пользователь с таким email уже существует

---

### `POST /auth/login` — вход

**Body:**
```json
{
  "email": "valera@mail.ru",
  "password": "valera123"
}
```

**Ответ `200`:**
```json
{ "accessToken": "eyJ..." }
```

**Ошибки:**
- `400` — невалидные данные
- `404` — неверный email или пароль

---

### `POST /auth/refresh` — обновление токена

Не требует body. Читает `refreshToken` из cookie автоматически.

> Запрос нужно делать с `credentials: 'include'` (или `withCredentials: true` в axios), чтобы cookie передался.

**Ответ `200`:**
```json
{ "accessToken": "eyJ..." }
```

**Ошибки:**
- `401` — refreshToken отсутствует или недействителен

---

### `POST /auth/logout` — выход

Не требует body. Очищает cookie с refreshToken на сервере.

**Ответ `200`:** `true`

---

### `GET /auth/me` — текущий пользователь

Требует авторизации.

**Ответ `200`:**
```json
{
  "id": "uuid",
  "name": "Valera Petrov",
  "email": "valera@mail.ru",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

---

## Как использовать accessToken

Все защищённые маршруты требуют заголовок:

```
Authorization: Bearer <accessToken>
```

Пример (fetch):
```js
fetch('/movies', {
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
})
```

---

## Типичный сценарий

```
1. POST /auth/login → получить accessToken, сохранить его
2. Запросы к API → передавать в заголовке Authorization: Bearer <accessToken>
3. Если API вернул 401 → POST /auth/refresh → получить новый accessToken
4. POST /auth/logout → выйти из системы
```

---

## Важно

- Запросы к `/auth/refresh` и `/auth/logout` **обязательно** делать с передачей cookie:
  - `fetch`: `credentials: 'include'`
  - `axios`: `withCredentials: true`
- `refreshToken` в cookie — `httpOnly`, JS-код на фронте его не читает — это намеренно
