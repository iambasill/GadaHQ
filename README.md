# Task Management API

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D14.0.0-brightgreen.svg)

A RESTful API for managing tasks with user authentication and authorization built with Node.js and Express.

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Task Management](#task-management)
- [Error Handling](#error-handling)


## ✨ Features

- User authentication with JWT
- CRUD operations for tasks
- Secure password handling
- Role-based access control
- RESTful API design

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (>= 14.0.0)
- npm or yarn
- MongoDB or your preferred database

## 📦 Installation

1. Clone the repository
```bash
git clone  https://github.com/iambasill/GadaHQ.git
cd GadaHQ
```

2. Install dependencies
```bash
npm install
```

3. edit a `.env.example` file in the root directory

4. Start the server
```bash
npm start
```

The API will be running at Port `5000`

## 🚀 API Endpoints

### Base URL
```
http://localhost:5000/api  || gadahq.myport.com.ng/api
```

---

## 🔐 Authentication

### Register a New User

**POST** `/auth/signup`

Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "password": "securePassword123",
  "role": "software"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "23a62928-f3e4-48e3-aa73-ea8f078aebf2",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "software"
  }
}
```

---

### Login

**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIzYTYyOTI4LWYzZTQtNDhlMy1hYTczLWVhOGYwNzhhZWJmMiIsImlhdCI6MTc1OTg1MDYzNiwiZXhwIjoxNzU5ODc5NDM2fQ.zY2IF-lS4p-ytv6iq_SaGkC3rIrfvzrgwXbl6osOhes",
}
```

> **Note:** Save the token! You'll need it for all task operations.

---

## 📝 Task Management

All task endpoints require authentication. Include the JWT token in your requests:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

### Create Task

**POST** `/task`

Create a new task.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "Complete API Documentation",
  "description": "Write comprehensive API documentation for the task management system",
  "status": "pending",
  "priority": "high",
  "dueDate": "2023-12-31T23:59:59.000Z",
  "createBy": "userId",
  "assignedTo": "userId"
}
```

**Response:** `201 Created`
```json
{
  "success": true,
  "message": "Task created successfully",
  "data": {
    "id": "eab00f92-8ab1-4eee-87ed-e71623dfe7ce",
    "title": "Complete API Documentation",
    "description": "Write comprehensive API documentation for the task management system",
    "status": "pending",
    "priority": "high",
    "dueDate": "2023-12-31T23:59:59.000Z",
    "createdAt": "2023-12-01T10:00:00.000Z"
  }
}
```

---

### Get All Tasks

**GET** `/task`

Retrieve all tasks for the authenticated user.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": [
    {
      "id": "eab00f92-8ab1-4eee-87ed-e71623dfe7ce",
      "title": "Complete API Documentation",
      "description": "Write comprehensive API documentation",
      "status": "pending",
      "priority": "high",
      "dueDate": "2023-12-31T23:59:59.000Z",
      "createdAt": "2023-12-01T10:00:00.000Z"
    }
  ],
  "count": 1
}
```

---

### Get Task by ID

**GET** `/task/:id`

Retrieve a specific task by its ID.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**URL Parameters:**
- `id` (required) - Task UUID

**Example Request:**
```
GET /task/eab00f92-8ab1-4eee-87ed-e71623dfe7ce
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "id": "eab00f92-8ab1-4eee-87ed-e71623dfe7ce",
    "title": "Complete API Documentation",
    "description": "Write comprehensive API documentation",
    "status": "pending",
    "priority": "high",
    "dueDate": "2023-12-31T23:59:59.000Z",
    "createdAt": "2023-12-01T10:00:00.000Z",
    "updatedAt": "2023-12-01T10:00:00.000Z"
  }
}
```

---

### Update Task

**PUT** `/task/:id`

Update an existing task.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

**URL Parameters:**
- `id` (required) - Task UUID

**Request Body:**
```json
{
  "title": "Complete API Documentation - Updated",
  "description": "Write comprehensive API documentation with examples",
  "status": "in-progress",
  "priority": "high",
  "dueDate": "2023-12-31T23:59:59.000Z",
  "createBy": "userId",
  "assignedTo": "userId"
}
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Task updated successfully",
  "data": {
    "id": "eab00f92-8ab1-4eee-87ed-e71623dfe7ce",
    "title": "Complete API Documentation - Updated",
    "description": "Write comprehensive API documentation with examples",
    "status": "in-progress",
    "priority": "high",
    "dueDate": "2023-12-31T23:59:59.000Z",
    "updatedAt": "2023-12-02T14:30:00.000Z"
  }
}
```

---

### Delete Task

**DELETE** `/task/:id`

Delete a task by its ID.

**Headers:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

**URL Parameters:**
- `id` (required) - Task UUID

**Example Request:**
```
DELETE /task/eab00f92-8ab1-4eee-87ed-e71623dfe7ce
```

**Response:** `200 OK`
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```


---

## 📊 Data Models

### User
| Field | Type | Description |
|-------|------|-------------|
| id | UUID | Unique user identifier |
| email | String | User email (unique) |
| firstName | String | User's first name |
| lastName | String | User's last name |
| password | String | Hashed password |
| role | String | User role |

### Task
| Field | Type | Description | Required |
|-------|------|-------------|----------|
| id | UUID | Unique task identifier | Auto-generated |
| title | String | Task title | Yes |
| description | String | Detailed description | Yes |
| status | String | Task status: `pending`, `in-progress`, `completed` | Yes |
| priority | String | Priority level: `low`, `medium`, `high` | Yes |
| dueDate | ISO 8601 Date | Task due date | Yes |
| createBy | String | Creator user ID | Yes |
| assignedTo | String | Assigned user ID | Yes |
| createdAt | ISO 8601 Date | Creation timestamp | Auto-generated |
| updatedAt | ISO 8601 Date | Last update timestamp | Auto-generated |

---

## ⚠️ Error Handling

The API uses standard HTTP status codes:

| Status Code | Description |
|-------------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing or invalid token |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server error |

### Error Response Format
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error information"
}
```

### Common Errors

#### Unauthorized (401)
```json
{
  "success": false,
  "message": "Unauthorized",
  "error": "No token provided or token is invalid"
}
```

#### Not Found (404)
```json
{
  "success": false,
  "message": "Task not found",
  "error": "Task with ID eab00f92-8ab1-4eee-87ed-e71623dfe7ce does not exist"
}
```

#### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}




---

<<<<<<< HEAD
**Happy Coding! 🚀**
=======
**Happy Coding! 🚀**
>>>>>>> 30542e67f8dafd35d7de274e6729f0df31dae310
