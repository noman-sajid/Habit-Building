# Backend Architecture

This document provides a detailed overview of the backend architecture for the Habit Building application.

## Tech Stack

- **Node.js:** JavaScript runtime environment.
- **Express.js:** Web application framework for Node.js.
- **MongoDB:** NoSQL database for data storage.
- **Mongoose:** ODM (Object Data Modeling) library for MongoDB and Node.js.
- **JSON Web Token (JWT):** For secure authentication and authorization.
- **Cloudinary:** Cloud-based image and video management.

## Project Structure

```
backend/
├── config/             # Configuration files (database, cloudinary, environment variables)
│   ├── cloudinary.js   # Cloudinary configuration
│   ├── config.env      # Environment variables
│   └── database.js     # Database connection setup
├── controllers/        # Business logic for handling requests
│   ├── habitController.js # Logic for habit-related operations
│   └── userController.js  # Logic for user-related operations
├── middleware/         # Express middleware functions (authentication, error handling)
│   ├── authMiddleware.js  # Middleware for authenticating users
│   ├── catchAsyncErrors.js # Utility for catching async errors
│   ├── error.js        # Centralized error handling middleware
│   ├── isAuthenticated.js # Checks if user is authenticated
│   └── multer.js       # Middleware for handling multipart/form-data (file uploads)
├── models/             # Mongoose models for database schemas
│   ├── Habit.js        # Schema for Habit model
│   └── User.js         # Schema for User model
├── routes/             # API routes
│   ├── habitRoutes.js  # Routes for habit-related API endpoints
│   └── userRoutes.js   # Routes for user-related API endpoints
├── utils/              # Utility functions (error handling, JWT token generation, email)
│   ├── errorhander.js  # Custom error handler class
│   ├── jwtToken.js     # Functions for JWT token generation and handling
│   └── sendEmail.js    # Utility for sending emails
├── .env                # Environment variables (local)
├── .env.example        # Example environment variables
├── .gitignore          # Git ignore file
├── index.js            # Main application entry point
├── package.json        # Project dependencies and scripts
├── package-lock.json   # Dependency lock file
└── vercel.json         # Vercel deployment configuration
```

## API Endpoints

The API is structured around RESTful principles, providing endpoints for user management and habit management.

-   `/api/v1/user`: User authentication and profile management.
-   `/api/v1/habits`: CRUD operations for habits.

## Authentication

Authentication is handled using JSON Web Tokens (JWT).

-   Users register and log in to receive a JWT.
-   The JWT is sent with subsequent requests to access protected routes.
-   `authMiddleware.js` and `isAuthenticated.js` are used to verify tokens and protect routes.

## Error Handling

A centralized error handling mechanism is implemented using `middleware/error.js` and `utils/errorhander.js` to provide consistent error responses. `catchAsyncErrors.js` wraps async route handlers to catch and forward errors to the error middleware.

## Database Interaction

MongoDB is used as the primary data store, with Mongoose providing an ODM layer for interacting with the database. Schemas are defined in the `models/` directory.
