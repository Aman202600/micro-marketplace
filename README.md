# 🛒 Micro Marketplace App

A modern, full-stack marketplace application built with the MERN stack, featuring product discovery, search, pagination, and a favorites system with optimistic UI updates and smooth animations.

## ✨ Tech Stack

### Backend
- **Core**: Node.js + Express.js
- **Database**: MongoDB + Mongoose
- **Security**: JWT, bcryptjs (12 rounds), Helmet, Rate Limiting
- **Validation**: express-validator
- **Logging**: Morgan

### Frontend
- **Core**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Network**: Axios (with interceptors)
- **State**: React Context API

## 📁 Project Structure

```
micro-marketplace/
├── backend/            # Express API
│   ├── config/         # DB connection
│   ├── controllers/    # Route handlers
│   ├── middleware/     # Auth, Error, Validation
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   ├── seed/           # Database seeder
│   └── utils/          # JWT generator
└── web/                # React Frontend
    ├── src/
    │   ├── api/        # Axios configuration
    │   ├── components/ # Reusable UI components
    │   ├── context/    # Auth state
    │   ├── hooks/      # Custom hooks (favorites)
    │   ├── pages/      # Route pages
    │   └── utils/      # Helpers
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB (Running locally or on Atlas)

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure `.env` (use `.env.example` as a template):
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/micro-marketplace
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=7d
   CLIENT_URL=http://localhost:5173
   NODE_ENV=development
   ```
4. Seed the database with initial data:
   ```bash
   npm run seed
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

### Web Setup
1. Navigate to the web directory:
   ```bash
   cd web
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure `.env`:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🛠️ API Documentation

| Method | Endpoint | Auth | Description |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Public | Register a new user |
| **POST** | `/api/auth/login` | Public | Login and get JWT token |
| **GET** | `/api/auth/me` | Protected | Get current user profile |
| **GET** | `/api/products` | Public | Get all products (supports search/page) |
| **GET** | `/api/products/:id` | Public | Get single product details |
| **POST** | `/api/products` | Protected | Create a new product |
| **PUT** | `/api/products/:id` | Protected | Update a product (owner only) |
| **DELETE** | `/api/products/:id` | Protected | Delete a product (owner only) |
| **GET** | `/api/favorites` | Protected | Get my favorite products |
| **POST** | `/api/favorites/:id` | Protected | Add product to favorites |
| **DELETE** | `/api/favorites/:id` | Protected | Remove product from favorites |

## 🔑 Test Credentials

Use these accounts after running the seed script:

- **User 1**: `user1@test.com` / `password123`
- **User 2**: `user2@test.com` / `password123`

## 🌟 Key Features

- **JWT Authentication**: Secure login with Bearer tokens and persistent sessions.
- **Product Discovery**: Search and pagination for browsing products.
- **Favorites System**: Heart products to save them to your personal list.
- **Responsive Design**: Premium UI that works beautifully on mobile and desktop.
- **Smooth Animations**: Powered by Framer Motion for a premium feel.
- **Skeleton Loaders**: Visual feedback during data fetching.
- **Secure Backend**: Rate limiting, Helmet headers, and input validation.
