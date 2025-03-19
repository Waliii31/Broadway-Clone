# Broadway-Clone Frontend

This is the **frontend** of the **Broadway-Clone** project, a full-stack web application that replicates a real-world pizza shop. The frontend is built using **Vite + React**, providing a fast and optimized development experience.

## 🚀 Tech Stack
- **Vite** (for fast build & development)
- **React** (UI components & state management)
- **React Router** (for navigation)
- **Axios** (for API requests)
- **Tailwind CSS** (for styling)
- **Context API / Redux** (if applicable)

## 📂 Project Structure

```
└── 📁frontend
    └── 📁public
    └── 📁src
        └── App.tsx
        └── 📁assets
        └── 📁Components
        └── 📁context
        └── index.css
        └── main.tsx
        └── 📁Pages
        └── vite-env.d.ts
    └── .env // should be here
    └── .gitignore
    └── eslint.config.js
    └── index.html
    └── package-lock.json
    └── package.json
    └── README.md
    └── tsconfig.app.json
    └── tsconfig.json
    └── tsconfig.node.json
    └── vite.config.ts
```

## ⚙️ Setting Up Environment Variables

To configure environment variables, create a `.env` file in the **root of the frontend folder** and define the following variables:

```env
VITE_PORT=any-port-number
VITE_NEST_BASE_URL=http://localhost:any-other-port-number
```

## 🚀 Getting Started

**1️⃣ Clone the Repository**
```
git clone https://github.com/Waliii31/Broadway-Clone.git
cd broadway-clone/frontend
```

**2️⃣ Install Dependencies**

```
npm install
```

**3️⃣ Run the Development Server**

```
npm run dev
```

## 🌟 Features
- Admin Panel for managing products, sections, and admins.

- Order Receiver Panel for kitchen staff to manage orders.

- Rider Panel for tracking and completing deliveries.

- Fully responsive UI with smooth user experience.

- Efficient API calls using Axios with environment-based configuration.

*💡 This frontend works alongside the NestJS backend. Make sure to set up the backend before running the frontend. 🚀*

- This README is detailed, structured, and professional, making it easy for anyone to set up and understand your project. Let me know if you need any modifications! 🚀