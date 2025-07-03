# Project Architecture

This document provides a high-level overview of the project's architecture, covering both the backend and frontend components.

## Backend

The backend is a Node.js application built with the Express framework. It handles user authentication, habit tracking, and data persistence.

### Tech Stack

- **Node.js:** JavaScript runtime environment
- **Express:** Web application framework
- **MongoDB:** NoSQL database
- **Mongoose:** ODM for MongoDB
- **JSON Web Tokens (JWT):** For user authentication
- **Bcryptjs:** For password hashing
- **Cloudinary:** For image storage
- **Multer:** For file uploads
- **Nodemailer:** For sending emails
- **Dotenv:** For environment variable management

### Project Structure

```
backend/
├── app.js                # Main application file
├── config/               # Configuration files
│   └── cloudinary.js     # Cloudinary configuration
├── controllers/          # Request handlers
│   ├── habitController.js # Habit-related logic
│   └── userController.js  # User-related logic
├── middleware/           # Express middleware
│   ├── authMiddleware.js # Authentication middleware
│   ├── catchAsyncErrors.js # Error handling middleware
│   └── multer.js         # File upload middleware
├── models/               # Mongoose models
│   ├── Habit.js          # Habit schema
│   └── User.js           # User schema
├── routes/               # API routes
│   ├── habitRoutes.js    # Habit-related routes
│   └── userRoutes.js     # User-related routes
└── utils/                # Utility functions
    ├── errorhander.js    # Error handling utility
    ├── jwtToken.js       # JWT utility
    └── sendEmail.js      # Email utility
```

### API Endpoints

#### User Routes (`/api/users`)

- `POST /register`: Register a new user.
- `POST /login`: Log in a user.
- `GET /logout`: Log out a user.
- `GET /profile`: Get the user's profile.
- `POST /forgot-password`: Send a password reset email.
- `PUT /reset/:token`: Reset the user's password.
- `PATCH /update-profile`: Update the user's profile.
- `PATCH /update-password`: Update the user's password.

#### Habit Routes (`/api/habits`)

- `POST /`: Create a new habit.
- `GET /`: Get all habits for the logged-in user.
- `PUT /:id`: Update a habit.
- `PATCH /:id/complete`: Mark a habit as complete.
- `DELETE /:id`: Delete a habit.
- `GET /summary`: Get a summary of the user's habits.

## Frontend

The frontend currently consists of a single test file. It is expected to be a single-page application (SPA) that interacts with the backend API.

### Tech Stack

- To be determined.

### Project Structure

```
frontend/
└── first.txt # Placeholder file
```
