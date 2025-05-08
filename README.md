# Node.js MongoDB Backend with User Roles and Equity Management

This is a Node.js backend application with MongoDB that implements user authentication with different roles (admin and regular user) and an equity management system.

## Features

- User authentication with JWT
- Role-based access control (Admin and User roles)
- Equity management (CRUD operations)
- Protected routes
- Error handling middleware

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/sigmatic_db
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=7d
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

## API Endpoints

### User Routes

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get current user
- `GET /api/users` - Get all users (admin only)

### Equity Routes

- `POST /api/equities` - Create new equity (admin only)
- `GET /api/equities` - Get all equities
- `GET /api/equities/:id` - Get single equity
- `PATCH /api/equities/:id` - Update equity (admin only)
- `DELETE /api/equities/:id` - Delete equity (admin only)

## Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_token>
```

## Example Usage

### Register a new user
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'
```

### Create new equity (admin only)
```bash
curl -X POST http://localhost:3000/api/equities \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{"symbol": "AAPL", "name": "Apple Inc.", "currentPrice": 150.25, "marketCap": 2500000000000, "volume": 1000000}'
``` 