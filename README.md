# 🚀 Habisium: Cultivate Your Best Self

## Build, Track, and Achieve Your Goals with Ease

Habisium is a comprehensive full-stack application designed to empower you on your journey to building lasting habits and achieving personal growth. Whether you're looking to start a new routine, break a bad habit, or simply stay consistent, Habisium provides the tools and insights you need to succeed.

## ✨ Features

*   **User Authentication & Authorization:** Secure registration, login, and session management.
*   **Robust Profile Management:**
    *   View and update personal information.
    *   Secure password changes and recovery (forgot/reset password).
    *   Profile picture uploads powered by Cloudinary.
*   **Intuitive Habit Management:**
    *   **Create:** Define new habits with customizable details.
    *   **Track:** Mark habits as complete with a single click.
    *   **Update & Delete:** Easily modify or remove habits as your goals evolve.
*   **Progress Visualization:** Gain insights into your consistency and progress with clear habit summaries.
*   **Email Notifications:** Password reset and other important communications.
*   **Responsive Design:** Seamless experience across various devices.
*   **Offline Support (PWA):** Access core functionalities even without an internet connection.

## 🛠️ Tech Stack

Habisium is built with a modern and robust technology stack, ensuring a scalable and performant application.

### Frontend

*   **React.js:** A declarative, component-based JavaScript library for building dynamic user interfaces.
*   **React Router DOM:** For efficient and declarative routing within the application.
*   **Redux Toolkit:** Streamlined and opinionated state management for predictable application behavior.
*   **Axios:** A powerful, promise-based HTTP client for making API requests.
*   **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.
*   **Framer Motion:** A production-ready motion library for React, enabling fluid animations and transitions.
*   **React Icons:** A collection of popular icon packs for easy integration.
*   **@react-oauth/google:** For seamless Google authentication integration.
*   **PWA (Progressive Web App):** Enhanced user experience with offline capabilities and installability.

### Backend

*   **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
*   **Express.js:** A fast, unopinionated, minimalist web framework for Node.js.
*   **MongoDB:** A flexible NoSQL document database for storing application data.
*   **Mongoose:** An elegant MongoDB object modeling tool for Node.js.
*   **JSON Web Tokens (JWT):** For secure and stateless authentication.
*   **Bcryptjs:** A library for hashing passwords securely.
*   **Cloudinary:** Cloud-based image and video management for profile picture storage.
*   **Multer:** Middleware for handling `multipart/form-data`, primarily used for file uploads.
*   **Nodemailer:** A module for Node.js applications to allow easy email sending.

## 🚀 Getting Started

Follow these steps to set up and run Habisium on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

*   [Node.js](https://nodejs.org/en/) (LTS version recommended) and npm
*   [MongoDB](https://www.mongodb.com/try/download/community) (Community Server)
*   [Git](https://git-scm.com/downloads)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url> # Replace with your actual repository URL
    cd "Habit Building" # Or the name of your cloned directory
    ```

2.  **Backend Setup:**

    ```bash
    cd backend
    npm install
    ```

    -   Create a `.env` file in the `backend` directory. You can use `.env.example` as a template. Populate it with your environment variables:
        ```
        PORT=5000
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=a_strong_secret_key_for_jwt
        JWT_EXPIRE=5d
        COOKIE_EXPIRE=5
        SMTP_HOST=your_smtp_host (e.g., smtp.gmail.com)
        SMTP_PORT=your_smtp_port (e.g., 465 or 587)
        SMTP_SERVICE=your_smtp_service (e.g., gmail)
        SMTP_MAIL=your_email@example.com
        SMTP_PASSWORD=your_email_password_or_app_specific_password
        CLOUDINARY_NAME=your_cloudinary_cloud_name
        CLOUDINARY_API_KEY=your_cloudinary_api_key
        CLOUDINARY_API_SECRET=your_cloudinary_api_secret
        ```
    -   Start the backend server:
        ```bash
        npm start
        ```
        The backend server will run on `http://localhost:5000`.

3.  **Frontend Setup:**

    ```bash
    cd ../frontend
    npm install
    ```

    -   Create a `.env` file in the `frontend` directory. Populate it with your environment variables:
        ```
        REACT_APP_API_URL=http://localhost:5000/api/v1
        REACT_APP_GOOGLE_CLIENT_ID=your_google_oauth_client_id
        ```
    -   Start the frontend development server:
        ```bash
        npm start
        ```
        The frontend application will open in your browser at `http://localhost:3000`.

## 📸 Screenshots / Demo

*(To be added)*

## 💡 Usage

Once both the backend and frontend servers are running, navigate to `http://localhost:3000` in your web browser.

1.  **Register** a new account or **Log In** if you already have one.
2.  **Create New Habits** from your dashboard.
3.  **Track Your Progress** by marking habits as complete daily.
4.  **Monitor Your Journey** through the habit summary and visualizations.
5.  **Update Your Profile** and settings as needed.

## 🔗 Link

[Habisium ](https://habisium.vercel.app/)

## 🤝 Contributing

This is a solo project for Chingu. While direct contributions are not expected, feedback and suggestions are always welcome!

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details. 



## 👤 Author

**[Noman Sajid]**
*   [GitHub Profile](https://github.com/noman-sajid)
*   [LinkedIn Profile](https://www.linkedin.com/in/noman-sajid01/)


---

## 🏛️ Architecture

*   [Backend Architecture](backend/ARCHITECTURE.md)
*   [Frontend Architecture](frontend/ARCHITECTURE.md)

---
**Happy Habit Building!**