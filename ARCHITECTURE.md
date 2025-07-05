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
├── app.js                # Main application file. Initializes the Express app, connects to the database, and sets up middleware and routes.
├── config/               # Configuration files
│   └── cloudinary.js     # Configures Cloudinary for image uploads.
├── controllers/          # Request handlers that contain the business logic.
│   ├── habitController.js # Handles all CRUD operations for habits.
│   └── userController.js  # Manages user registration, login, profile updates, and password management.
├── middleware/           # Custom middleware for Express.
│   ├── authMiddleware.js # Protects routes by verifying JWT tokens.
│   ├── catchAsyncErrors.js # Wraps async functions to catch and forward errors.
│   ├── error.js          # Global error handler for Express.
│   └── multer.js         # Handles multipart/form-data for file uploads.
├── models/               # Mongoose schemas and models.
│   ├── Habit.js          # Defines the schema for habits.
│   └── User.js           # Defines the schema for users, including password hashing.
├── routes/               # Defines the API routes.
│   ├── habitRoutes.js    # Routes for all habit-related endpoints.
│   └── userRoutes.js     # Routes for all user-related endpoints.
└── utils/                # Utility functions used across the application.
    ├── errorhander.js    # Custom error handler class.
    ├── jwtToken.js       # Utility for creating and sending JWT tokens.
    └── sendEmail.js      # Utility for sending emails (e.g., for password reset).
```

### API Endpoints

#### User Routes (`/api/users`)

- `POST /register`: Register a new user. Controller: `registerUser`.
- `POST /login`: Log in a user. Controller: `loginUser`.
- `GET /logout`: Log out a user. Controller: `logout`.
- `GET /profile`: Get the user's profile. Controller: `getProfile`.
- `POST /forgot-password`: Send a password reset email. Controller: `forgotPassword`.
- `PUT /reset/:token`: Reset the user's password. Controller: `resetPassword`.
- `PATCH /update-profile`: Update the user's profile. Controller: `updateProfile`.
- `PATCH /update-password`: Update the user's password. Controller: `updatePassword`.
- `PATCH /request-email-change`: Request an email change. Controller: `requestEmailChange`.
- `PATCH /confirm-email/:token`: Confirm an email change. Controller: `confirmEmailChange`.


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