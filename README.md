# Habit Building App

This is a full-stack application designed to help users build and track their habits.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

## Project Overview

The Habit Building App allows users to register, log in, and manage their habits. Users can create, update, delete, and track the completion of their habits. The application provides a summary of habit progress.

## Features

- User authentication (register, login, logout)
- Password management (forgot password, reset password)
- Profile management (view, update profile and password)
- Habit management (create, read, update, delete)
- Habit tracking (mark as complete)
- Habit summary

## Tech Stack

### Backend

- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **JWT** for authentication
- **Bcryptjs** for password hashing
- **Cloudinary** for image storage
- **Multer** for file uploads
- **Nodemailer** for sending emails

### Frontend

- To be determined.

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB
- Git

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd habit-building-app
    ```

2.  **Backend Setup:**
    ```bash
    cd backend
    npm install
    ```
    - Create a `.env` file in the `backend` directory and add the following environment variables:
      ```
      PORT=...
      MONGO_URI=...
      JWT_SECRET=...
      JWT_EXPIRE=...
      COOKIE_EXPIRE=...
      SMTP_HOST=...
      SMTP_PORT=...
      SMTP_SERVICE=...
      SMTP_MAIL=...
      SMTP_PASSWORD=...
      CLOUDINARY_NAME=...
      CLOUDINARY_API_KEY=...
      CLOUDINARY_API_SECRET=...
      ```
    - Start the backend server:
      ```bash
      npm start
      ```

3.  **Frontend Setup:**
    - (Instructions to be added once the frontend is developed)

## API Endpoints

The API endpoints are documented in the [ARCHITECTURE.md](ARCHITECTURE.md) file.

## Project Structure

A detailed project structure is available in the [ARCHITECTURE.md](ARCHITECTURE.md) file.
