# MERU – Invoice & Finance Management System

---

## 👤 Candidate Details

- Name: Yuvraj Singh
- Role Applied For: Full Stack Developer
- Email: yuvrajsingh3112s2@gmail.com
- Contact: +91-9555103969
- GitHub: https://github.com/YUVRAJSINGH3112

---

# 📌 Project Overview

MERU is a full-stack invoice and finance management application built using React, Node.js, Express, and MongoDB.

It supports:

- User Registration & Login
- JWT-based Authentication(I've used local Storage to storing token for simplity as it's just an intership assignment)
- Protected Routes
- Invoice Creation
- Dashboard View
- Secure API Integration
- Clean UI using Tailwind + shadcn/ui

---

# 🏗 Project Structure

meru/
├── backend/ → Node.js + Express API
└── frontend/ → React (Vite) Application


---

# 🛠 Tech Stack

## Frontend
- React (Vite)
- React Router DOM
- Axios (with Interceptors)
- Tailwind CSS
- shadcn/ui

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- CORS

---

#  How To Run The Project (Step-by-Step)

Make sure you have:

- Node.js installed (v18+ recommended)
- MongoDB installed locally OR MongoDB Atlas URI

---

#  Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/meru.git
cd meru
```
#  Step 2: Backend Setup

  prerequisites:
    - Node.js (v18 or above recommended)
    - MongoDB (local installation or MongoDB Atlas)

steps:

  ```bash
  cd backend
  ```
  Install dependencies
  ```bash
 npm install
  ```

    - step: Create .env file inside backend folder
      file_name: .env
      file_content:
        PORT: 3000
        MONGO_URI: mongodb://127.0.0.1:27017/meru
        JWT_SECRET: mysecretkey

    - step: Start backend server
      command: npm start

    - step: (Optional) If using nodemon
      command: npm run dev

  server_url: http://localhost:3000


frontend_setup:

  prerequisites:
    - Node.js (v18 or above recommended)

  steps:

    - step: Open new terminal
      note: Make sure backend is already running

    - step: Navigate to frontend folder
      command: cd frontend

    - step: Install dependencies
      command: npm install

    - step: Start development server
      command: npm run dev

  development_server:
    url: http://localhost:5173
    note: Open this URL in your browser after running npm run dev


