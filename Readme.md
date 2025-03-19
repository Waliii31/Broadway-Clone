# Broadway-Clone

Broadway-Clone is a full-stack web application that replicates the functionalities of a real-world pizza shop, **Broadway Pizza**. This project is my first full-stack development experience, built using **Vite + React** for the frontend and **NestJS** for the backend. It features a fully functional **admin panel**, an **order-receiver panel**, and a **rider panel** to simulate the complete order processing workflow.

## 🚀 Features

### 🛠 Admin Panel
The **admin panel** allows authorized users to:
- **Add products** to the website.
- **Create and manage sections** (like categories, offers, etc.).
- **Manage admin accounts** to grant access to new administrators.
- Perform various other administrative tasks.

### 🍕 Order Processing Flow
1. **Order Placement:** Customers place an order through the website.
2. **Order Receiver Panel (`/order-receiver`):**  
   - This panel is used by the **kitchen staff (cooks)** who receive new orders.
   - Once the pizza is prepared, they mark the order as **ready for delivery**.
3. **Rider Panel (`/rider`):**  
   - The **delivery riders** receive the completed orders from the kitchen.
   - They deliver the order to the customer.
   - After successful delivery, they mark the order as **delivered**, completing the order lifecycle.

### 📌 Additional Functionalities
- Role-based authentication for **admins, order receivers, and riders**.
- Real-time order status updates.
- A structured and scalable backend using **NestJS**.
- A modern, optimized frontend built with **Vite + React**.

## 📂 Project Structure

`````
└── 📁Broadway Clone
        └── backend
        └── frontend
`````


Each of the **frontend** and **backend** folders contains its own `README.md` with more details about the respective parts of the project.

## 🏆 My Experience
This was a **huge** project for me, and it significantly polished my skills in full-stack development. Working with **React, NestJS, authentication, and real-time order tracking** was a great learning experience. I explored complex state management, API design, and scalable backend architecture, making this project a major milestone in my development journey.

---

💡 *Feel free to explore and contribute!*
