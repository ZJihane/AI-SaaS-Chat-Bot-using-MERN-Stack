# AI SaaS Chat Bot using MERN Stack

![image](https://github.com/user-attachments/assets/e473b60f-0c82-4f10-8c53-788d5e5ebbee)
![image](https://github.com/user-attachments/assets/da6a0ec2-9202-44bd-bf49-c44983160f01)



This project implements an AI-powered SaaS chat bot using the **MERN stack** (MongoDB, Express, React, and Node.js). The chat bot leverages OpenAI services for conversational abilities and includes JWT-based authentication with cookies for secure user sessions.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)


---

## Features
- JWT authentication with **HTTP cookies** for secure sessions.
- User registration, login, and chat management.
- Communication with OpenAI API for dynamic conversations.
- **Axios** integration for API calls between frontend and backend.
- Clean and modular codebase using TypeScript.

---

## Tech Stack
- **Frontend:** React, TypeScript, Axios  
- **Backend:** Node.js, Express, MongoDB, TypeScript  
- **Authentication:** JWT (JSON Web Tokens), HTTP Cookies  
- **Database:** MongoDB (Mongoose ORM)  
- **AI Service:** OpenAI API  

---

## Prerequisites
Ensure you have the following installed:
- Node.js (v16+)
- npm (v8+) or Yarn
- MongoDB Community Edition or Atlas (remote DB)


---

## Project Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/ZJihane/AI-SaaS-Chat-Bot-using-MERN-Stack.git
   cd AI-SaaS-Chat-Bot-using-MERN-Stack-main
2. Install dependencies for both backend and frontend:
    ```bash
    cd backend && npm install
    cd ../frontend && npm install
## Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
2. Set up MongoDB connection in
    ```bash
   /backend/src/db/connection.ts.
3. Create a .env file in the backend directory with the following:
    ```bash
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/chatbot
   JWT_SECRET=<your-secret-key>
   OPENAI_API_KEY=<your-openai-api-key>
4. Start the backend server
    ```bash
    npm run dev

## Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend

3. Create a .env file in the frontend directory with the following:
    ```bash
   REACT_APP_BACKEND_URL=http://localhost:5000

4. Start the backend server
    ```bash
    npm run dev



