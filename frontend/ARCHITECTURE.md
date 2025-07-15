# Frontend Architecture

This document provides a detailed overview of the frontend architecture for the Habit Building application.

## Tech Stack

- **React:** A JavaScript library for building user interfaces.
- **React Router:** For declarative routing in a React application.
- **Redux:** For predictable state management, using Redux Toolkit for efficiency.
- **Axios:** A promise-based HTTP client for making API requests to the backend.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **PostCSS:** A tool for transforming CSS with JavaScript plugins.

## Project Structure

```
frontend/
├── public/               # Static assets and the main HTML file.
│   └── index.html        # The entry point for the React application.
├── src/
│   ├── actions/          # Redux action creators (Thunks).
│   │   └── authActions.js  # Async actions related to user authentication.
│   ├── assets/           # Images, icons, and other static assets.
│   ├── components/       # Reusable UI components.
│   │   ├── common/         # Generic, reusable components (e.g., Button, Card, Loader).
│   │   ├── feedback/       # Components for user feedback (e.g., Modal, Alert).
│   │   ├── form/           # Form-related components (e.g., TextInput, Checkbox).
│   │   ├── layout/         # Components that define the page structure (e.g., Navbar, Footer).
│   │   └── theme/          # Components related to theme switching.
│   ├── constants/        # Application-wide constants.
│   │   └── authConstants.js # Constants related to authentication actions.
│   ├── context/          # React context providers.
│   │   ├── AlertContext.js # Context for managing global alerts.
│   │   └── ThemeContext.js # Context for managing the application's theme.
│   ├── pages/            # Top-level page components.
│   │   ├── DashboardPage.jsx # The main dashboard for authenticated users.
│   │   ├── Home.jsx        # The home page.
│   │   ├── LandingPage.jsx # The landing page for new users.
│   │   └── authPages/      # Pages related to user authentication.
│   │       ├── LoginPage.jsx
│   │       └── RegisterPage.jsx
│   ├── reducers/         # Redux reducers.
│   │   └── authReducer.js  # Reducer for managing authentication state.
│   ├── routes/           # Routing-related components.
│   │   └── ProtectedRoute.jsx # A component to protect routes that require authentication.
│   ├── services/         # Services for interacting with external APIs.
│   │   └── axiosInstance.js # A pre-configured Axios instance for making API requests.
│   ├── store.js          # Redux store configuration.
│   ├── App.js            # The main application component, containing the router setup.
│   ├── index.js          # The entry point of the React application.
│   └── ...
└── ...
```

## State Management (Redux)

The application uses Redux for state management.

- **Store:** The single source of truth for the application's state. Configured in `src/store.js`.
- **Reducers:** Pure functions that specify how the application's state changes in response to actions. The `authReducer` in `src/reducers/authReducer.js` manages user authentication state, including loading and initialization status.
- **Actions:** Payloads of information that send data from the application to the Redux store. Asynchronous actions, such as API calls, are handled using Thunks in `src/actions/`.

## Routing

Routing is managed by `react-router-dom`.

- **`App.js`:** Defines the main routes for the application.
- **`ProtectedRoute.jsx`:** A higher-order component that checks if a user is authenticated before allowing access to a route. If the user is not authenticated, they are redirected to the login page.

## API Communication

All communication with the backend API is handled through a pre-configured Axios instance in `src/services/axiosInstance.js`. This allows for centralized handling of API requests, including setting base URLs and handling authentication tokens.
