# Broadway-Clone Backend

This is the **backend** of the **Broadway-Clone** project, built using **NestJS**. It provides APIs to manage the pizza shop's operations, including **order processing, user authentication, and admin functionalities**.

## 🚀 Tech Stack
- **NestJS** (Backend Framework)
- **MongoDB** (Database)
- **Mongoose** (MongoDB ODM)
- **Cloudinary** (For image uploads)
- **JWT** (Authentication)
- **Swagger** (API Documentation)

## 📂 Project Structure
```
└── 📁backend
    └── 📁src
        └── 📁admins
        └── 📁cloudinary
        └── 📁orders
        └── 📁products
        └── 📁Schemas
        └── 📁section
        └── 📁user
        └── app.controller.spec.ts
        └── app.controller.ts
        └── app.module.ts
        └── app.service.ts
        └── main.ts
    └── 📁test
    └── .env
        └── cloudnary.config.ts
    └── .gitignore
    └── .prettierrc
    └── eslint.config.mjs
    └── nest-cli.json
    └── package-lock.json
    └── package.json
    └── README.md
    └── tsconfig.build.json
    └── tsconfig.json
```

## ⚙️ Setting Up Environment Variables

Create a `.env` file in the **root of the backend folder** and define the following variables:

```env
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
VITE_URL=http://localhost:5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

## Explanation:

- **CLOUD_NAME, API_KEY, API_SECRET** → Cloudinary credentials for image uploads.

- **VITE_URL** → Frontend base URL.

- **MONGO_URI** → MongoDB connection string.

- **JWT_SECRET** → Secret key for JWT authentication.

# 🚀 Getting Started

## 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/broadway-clone.git
cd broadway-clone/backend
```

## 2️⃣ Install Dependencies
```sh
npm install
```

## 3️⃣ Run the Development Server
```sh
npm run start:dev
```
The backend will run on http://localhost:3000 by default.

## 🌟 Features

- Admin Panel APIs for managing products, orders, and users.

- Order Processing System with order-receiver and rider functionalities.

- Secure Authentication using JWT & Role-Based Access Control (RBAC).

- Image Uploads via Cloudinary.

- Optimized and Scalable NestJS architecture.

💡 This backend works alongside the Vite + React frontend. Make sure to set up the frontend before running the complete application. 🚀