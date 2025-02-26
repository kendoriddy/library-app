# 📚 Library API Documentation

This is the API documentation for the **Library App** built with **Next.js API Routes** and **Prisma**.

## 🚀 Features
- User authentication with JWT
- CRUD operations for books and categories
- Borrowing system to track book loans
- Protected routes for authenticated users

---

## 🛠 Setup & Running
1. Install dependencies:
   ```bash
   npm install
   ```
2. Run database migrations:
   ```bash
   npx prisma migrate dev --name init
   ```
3. Seed the database:
   ```bash
   npm run seed
   ```
4. Start the Next.js server:
   ```bash
   npm run dev
   ```

---

## 🔐 Authentication

### 🔹 Register a User
**Endpoint:** `POST /api/user/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "studentId": "S12345",
   "department":"Computer Engineering",
   "faculty":"Faculty of engineering",
   "session_of_entry":"2020/2021"
}

```
**Response:**
```json
{
  "id": 1,
    "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "studentId": "S12345",
   "department":"Computer Engineering",
   "faculty":"Faculty of engineering",
   "session_of_entry":"2020/2021"
}
```

### 🔹 Login
**Endpoint:** `POST /api/user/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```
**Response:**
```json
{
  "token": "your-jwt-token"
}
```

### 🔹 Update Profile
**Endpoint:** `PUT /api/user/profile`

**Headers:**
`Authorization: Bearer <your-jwt-token>`

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "john@example.com"
}
```
**Response:**
```json
{
  "id": 1,
  "name": "John Updated",
  "email": "john@example.com"
}
```

---

## 📚 Books

### 🔹 Create a Book
**Endpoint:** `POST /api/books`

**Headers:**
`Authorization: Bearer <your-jwt-token>`

**Request Body:**
```json
{
  "title": "The Great Gatsby",
  "image": "https://example.com/book.jpg",
  "description": "A classic novel",
  "author": "F. Scott Fitzgerald",
  "quantity": 5,
  "categoryIds": [1, 2]
}
```
**Response:**
```json
{
  "id": 1,
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald"
}
```

### 🔹 Update a Book
**Endpoint:** `PUT /api/books/:id`

**Headers:**
`Authorization: Bearer <your-jwt-token>`

**Request Body:**
```json
{
  "title": "Updated Title",
  "quantity": 10
}
```
**Response:**
```json
{
  "id": 1,
  "title": "Updated Title",
  "quantity": 10
}
```

### 🔹 Delete a Book
**Endpoint:** `DELETE /api/books/:id`

**Headers:**
`Authorization: Bearer <your-jwt-token>`

**Response:**
```json
{
  "message": "Book deleted successfully"
}
```

### 🔹 Get All Books
**Endpoint:** `GET /api/books`

**Response:**
```json
[
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "quantity": 5
  }
]
```

### 🔹 Search Books
**Endpoint:** `GET /api/books/search?query=<book-title>`

**Response:**
```json
[
  {
    "id": 2,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "quantity": 5
  }
]
```

---

## 📂 Categories

### 🔹 Get All Categories
**Endpoint:** `GET /api/categories`

**Response:**
```json
[
  {
    "id": 1,
    "name": "Fiction"
  }
]
```

### 🔹 Get a Category by ID
**Endpoint:** `GET /api/category/:id`

**Response:**
```json
{
  "id": 1,
  "name": "Fiction"
}
```

---

## 📖 Borrowings

### 🔹 Borrow a Book
**Endpoint:** `POST /api/borrowings`

**Headers:**
`Authorization: Bearer <your-jwt-token>`

**Request Body:**
```json
{
  "studentId": 1,
  "bookId": 2
}
```
**Response:**
```json
{
  "id": 1,
  "studentId": 1,
  "bookId": 2,
  "borrowDate": "2025-02-25T12:00:00Z"
}
```

### 🔹 Return a Book
**Endpoint:** `PUT /api/borrowings/:id`

**Headers:**
`Authorization: Bearer <your-jwt-token>`

**Response:**
```json
{
  "message": "Book returned successfully"
}
```

### 🔹 Fetch Borrowings Per Book
**Endpoint:** `GET /api/borrowings/book/:bookId`

**Response:**
```json
[
  {
    "id": 1,
    "student": {
      "id": 2,
      "name": "Jane Doe",
      "email": "jane@example.com"
    }
  }
]
```

### 🔹 Fetch all Borrowings
**Endpoint:** `GET /api/borrowings`

**Response:**
```json
[
  {
    "id": 1,
    "book": {
      "id": 5,
      "title": "Moby Dick",
      "author": "Herman Melville"
    }
  }
]
### 🔹 Fetch Borrowings Per User
**Endpoint:** `GET /api/borrowings/user/:userId`

**Response:**
```json
[
  {
    "id": 1,
    "book": {
      "id": 5,
      "title": "Moby Dick",
      "author": "Herman Melville"
    }
  }
]

```

---


## 📖 Reviews

### 🔹 Create a Review
**Endpoint:** `POST /api/reviews`

**Headers:**
`Authorization: Bearer <your-jwt-token>`

**Request Body:**
```json
{
  "review": "This book was amazing!",
  "bookId": 2
}
```
**Response:**
```json
{
  "id": 1,
  "review": "This book was amazing!",
  "bookId": 2,
  "studentId": 1
}
```

### 🔹 Get Reviews for a Book
**Endpoint:** `GET /api/reviews/book/:bookId`

**Response:**
```json
[
  {
    "id": 1,
    "review": "This book was amazing!",
    "student": {
      "id": 1,
      "name": "John Doe"
    }
  }
]
```

### 🔹 Get All Reviews
**Endpoint:** `GET /api/reviews`

**Response:**
```json
[
  {
    "id": 1,
    "review": "This book was amazing!",
    "book": {
      "id": 2,
      "title": "The Great Gatsby"
    },
    "student": {
      "id": 1,
      "name": "John Doe"
    }
  }
]
```

# CardCollection Model

Represents a card collection entity in the system.

## Fields

- `id` (Int): Primary key, auto-incrementing identifier
- `studentId` (Int): Unique identifier referencing the student User
- `student` (User): Relation to User model representing the student
- `collectionDate` (DateTime): Date and time when the card was collected
- `is_collected` (Int, optional): Collection status flag, defaults to 0

## Relations

- One-to-one relation with `User` model through `studentId` field

## Usage

Used to track card collections by students. Each student can have one card collection record.

### Create
### 🔹 Create Card Collection
**Endpoint:** `POST /api/card-collections`

**Headers:**
`Authorization: Bearer <your-jwt-token>`

**Request Body:**
```json
{
  "studentId": 1,
  "collectionDate": "2024-02-25T12:00:00Z"
}
```
**Response:**
```json
{
  "id": 1,
  "studentId": 1,
  "collectionDate": "2024-02-25T12:00:00Z",
  "is_collected": 0
}
```

### 🔹 Update Card Collection Status
**Endpoint:** `PUT /api/card-collections/:id`

**Headers:**
`Authorization: Bearer <your-jwt-token>`

**Request Body:**
```json
{
  "is_collected": 1
}
```
**Response:**
```json
{
  "id": 1,
  "studentId": 1,
  "is_collected": 1
}
```

### 🔹 Get Card Collection By Student
**Endpoint:** `GET /api/card-collections/student/:studentId`

**Response:**
```json
{
  "id": 1,
  "studentId": 1,
  "collectionDate": "2024-02-25T12:00:00Z",
  "is_collected": 1
}
```
---

## 🔒 Authentication Notes
- Use **JWT** for protected routes.
- Include `Authorization: Bearer <token>` in the headers for all secured routes.


## 📬 Automated Reminders

### Send Return Reminders
To send automated reminders for borrowed books:
```bash
node scripts/sendReminders.js
```
This script checks for overdue books and sends email notifications to borrowers.

---
