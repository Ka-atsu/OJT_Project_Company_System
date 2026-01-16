# OJT_Project_Company_System — Documentation

## Overview

**OJT_Project_Company_System** is a web-based company system built with:

- **Backend:** Laravel (REST API)
- **Frontend:** React + Vite

The backend provides API endpoints, and the frontend consumes these endpoints using the configured `VITE_API_URL`.

---

## Tech Stack

- **Laravel** (Backend API)
- **React** (Frontend UI)
- **Vite** (Frontend build tool)
- **MySQL/MariaDB** (Database)
- **Composer** (PHP dependency manager)
- **Node.js + npm** (JavaScript dependency manager)

---

## Prerequisites

Install the following before setup:

- Git
- PHP (recommended 8.x)
- Composer
- MySQL / MariaDB
- Node.js + npm
- XAMPP

---

## Project Directory Structure

```txt
OJT_Project_Company_System/
├── backend/     # Laravel REST API
└── frontend/    # React + Vite application
```

Setup Guide
Step 1 — Clone the Repository
git clone <GITHUB LINK>

Backend Documentation (Laravel API)
Step 2 — Install Dependencies
Navigate into the backend folder:
cd backend
Install PHP dependencies:
composer install

    Step 3 — Configure Environment
        Create the Laravel .env file:
            cp .env.example .env

        Generate the application key:
            php artisan key:generate

    Step 4 — Database Setup
        Open backend/.env and update the database credentials:
            DB_CONNECTION=mysql
            DB_HOST=127.0.0.1
            DB_PORT=3306
            DB_DATABASE=your_database_name
            DB_USERNAME=your_database_user
            DB_PASSWORD=your_database_password

        Run migrations (only if migrations exist):
            php artisan migrate

        (Optional) Run seeders (only if seeders exist):
            php artisan db:seed

    Step 5 — Start the Backend Server
        Option A: Laravel built-in server
            php artisan serve

    Option B: XAMPP/WAMP/Laragon (htdocs)
        If the project is inside htdocs, the API base may be:
            http://localhost/OJT_Project_Company_System/backend/public

Frontend Documentation (React + Vite)
Step 6 — Install Dependencies
Navigate into the frontend folder:
cd ../frontend

    Install Node dependencies:
        npm install

    ✅ Important: You do not need to run npm install react-router-dom separately if it already exists in frontend/package.json.
    npm install installs all dependencies listed there.
    - npm i three
    - npm install react-router-dom
    - npm install axios
    - npm install react-bootstrap bootstrap

    Step 7 — Configure Frontend Environment (Vite)
    Create a .env file inside the frontend folder:
    Path:
        frontend/.env

    Add this line:
    VITE_API_URL=http://localhost/OJT_Project_Company_System/backend/public/api

    If you are using php artisan serve, use:
    VITE_API_URL=http://127.0.0.1:8000/api

    Step 8 — Run the Frontend App
    Start the Vite development server:
    npm run dev

    Vite usually runs at:
    http://localhost:5173

    Running the Full System (Recommended Flow)

        Start the backend:
            cd backend
            php artisan serve (or run using XAMPP)

        Start the frontend:
            cd frontend
            npm run dev

        Open the frontend in your browser:
            http://localhost:5173

        Configuration Notes
        API Base URL

        The frontend reads the API base URL from:
            frontend/.env → VITE_API_URL

            Example:
            VITE_API_URL=http://localhost/OJT_Project_Company_System/backend/public/api
