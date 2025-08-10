# Frontend Architecture

This document provides a detailed overview of the frontend architecture for the Habit Building application.

## Tech Stack

- **React:** A JavaScript library for building user interfaces.
- **React Router:** For declarative routing in a React application.
- **Redux:** For predictable state management, using Redux Toolkit for efficiency.
- **Axios:** A promise-based HTTP client for making API requests to the backend.
- **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
- **PostCSS:** A tool for transforming CSS with JavaScript plugins.
- **Workbox:** A library for adding offline support to web applications.

## Project Structure

```
frontend/
├── public/               # Static assets and the main HTML file.
│   ├── favicon.ico       # Favicon for the application.
│   ├── index.html        # The entry point for the React application.
│   ├── logo192.png       # Logo for the application (192x192).
│   ├── logo512.png       # Logo for the application (512x512).
│   ├── manifest.json     # Web app manifest for PWA features.
│   ├── robots.txt        # Instructions for web crawlers.
│   └── images/           # Publicly accessible images.
├── src/
│   ├── actions/          # Redux action creators (Thunks).
│   │   ├── authActions.js  # Async actions related to user authentication.
│   │   └── habitActions.js # Async actions related to habit management.
│   ├── assets/           # Images, icons, and other static assets used within components.
│   │   ├── celebrating_mascot.png
│   │   ├── chill_mascot1.png
│   │   ├── chill_mascot2.png
│   │   ├── HiboMascot-1-removebg-preview.png
│   │   ├── smiling_mascot.png
│   │   ├── thinking_mascot.png
│   │   └── waving_mascot.png
│   ├── components/       # Reusable UI components.
│   │   ├── auth/         # Components for user authentication.
│   │   │   ├── EmailStep.jsx
│   │   │   ├── PasswordStep.jsx
│   │   │   └── ProfileStep.jsx
│   │   ├── common/         # Generic, reusable components.
│   │   │   ├── Alert.jsx
│   │   │   ├── AssistBlock.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── InfoTooltip.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── ProfileAvatar.jsx
│   │   │   └── Tooltip.jsx
│   │   ├── dashboard/      # Components for the user dashboard.
│   │   │   ├── GoalCompletionPage.jsx
│   │   │   ├── HabitCard.jsx
│   │   │   ├── HabitList.jsx
│   │   │   ├── ProgressRing.jsx
│   │   │   ├── QuickActionButton.jsx
│   │   │   ├── StatsGrid.jsx
│   │   │   ├── SummaryChart.jsx
│   │   │   └── WelcomeBanner.jsx
│   │   ├── feedback/       # Components for user feedback.
│   │   │   └── Modal.jsx
│   │   ├── form/           # Form-related components.
│   │   │   ├── Checkbox.jsx
│   │   │   ├── FileUpload.jsx
│   │   │   ├── Select.jsx
│   │   │   ├── TextArea.jsx
│   │   │   └── TextInput.jsx
│   │   ├── habits/         # Components related to habit management.
��   │   │   ├── AllHabits.jsx
│   │   │   ├── CreateHabitForm.jsx
│   │   │   └── steps/      # Components for the multi-step habit creation form.
│   │   │       ├── descriptionSuggestions.js
│   │   │       ├── EmojiSelector.jsx
│   │   │       ├── StepDescription.jsx
│   │   │       ├── StepFrequency.jsx
│   │   │       ├── StepGoal.jsx
│   │   │       ├── StepReview.jsx
│   │   │       └── StepTitle.jsx
│   │   ├── layout/         # Components that define the page structure.
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── OfflineBanner.jsx # A banner to indicate offline status.
│   │   │   ├── PageLayout.jsx
│   │   │   └── tabs/       # Tab components for navigation.
│   │   │       ├── tabs.jsx
│   │   │       ├── ToggleGroup.jsx
│   │   │       └── VerticalTabs.jsx
│   │   └── theme/          # Components related to theme switching.
│   │       └── ThemeToggle.jsx
│   ├── constants/        # Application-wide constants.
│   │   ├── authConstants.js # Constants related to authentication actions.
│   │   └── habitConstants.js# Constants related to habit actions.
│   ├── context/          # React context providers.
│   │   ├── AlertContext.js # Context for managing global alerts.
│   │   └── ThemeContext.js # Context for managing the application's theme.
│   ├── pages/            # Top-level page components.
│   │   ├── DashboardPage.jsx # The main dashboard for authenticated users.
│   │   ├── Home.jsx        # The home page.
│   │   ├── LandingPage.jsx # The landing page for new users.
│   │   └── authPages/      # Pages related to user authentication.
│   │       ├── ForgotPasswordPage.jsx
│   │       ├── LoginPage.jsx
│   │       ├── PasswordResetSent.jsx
│   │       ├── Register.jsx
│   │       ├── RegisterPage.jsx
│   │       └── ResetPasswordPage.jsx
│   ├── reducers/         # Redux reducers.
│   │   ├── authReducer.js  # Reducer for managing authentication state.
│   │   ├── habitReducer.js # Reducer for managing habit state.
│   │   └── offlineReducer.js # Reducer for managing offline state.
│   ├── routes/           # Routing-related components.
│   │   └── ProtectedRoute.jsx # A component to protect routes that require authentication.
│   ├── services/         # Services for interacting with external APIs.
│   │   └── axiosInstance.js # A pre-configured Axios instance for making API requests.
│   ├── utils/            # Utility functions.
│   │   ├── constants.js    # Application-wide constants.
│   │   └── networkStatus.js# Functions for checking network status.
│   ├── store.js          # Redux store configuration.
│   ├── App.css           # Main application styles.
│   ├── App.js            # The main application component, containing the router setup.
│   ├── index.css         # Global styles.
│   ├── index.js          # The entry point of the React application.
│   └── reportWebVitals.js# Performance measurement.
└── ...
```

## State Management (Redux)

The application uses Redux Toolkit for efficient and predictable state management.

- **Store:** The single source of truth for the application's state, configured in `src/store.js`. It combines multiple reducers into a single root reducer.
- **Reducers:** Pure functions that specify how the application's state changes in response to actions.
  - `authReducer`: Manages user authentication state, including loading and initialization status.
  - `habitReducer`: Manages the state for habits, including creating, reading, updating, and deleting habits.
  - `offlineReducer`: Manages the application's offline state, including tracking offline status and queuing actions to be synced later.
- **Actions:** Asynchronous actions, such as API calls, are handled using Thunks defined in the `src/actions/` directory. These thunks dispatch actions to the reducers to update the state.

## Habit Management

Habit management is a core feature of the application and has its own set of components, actions, and reducer.

- **Components:**
  - `CreateHabitForm`: A multi-step form for creating new habits.
  - `HabitList`: Displays a list of all the user's habits.
  - `HabitCard`: A component that displays a single habit and allows the user to interact with it (e.g., mark as complete, view details).
- **Actions:** The `habitActions.js` file contains thunks for all habit-related API calls, including:
  - `createHabit`
  - `getHabits`
  - `getHabitDetails`
  - `updateHabit`
  - `deleteHabit`
  - `markHabitComplete`
  - `getHabitSummary`
- **Reducer:** The `habitReducer.js` file manages the state for habits, including the list of habits, a single habit's details, and loading/error states.

## Routing

Routing is managed by `react-router-dom`.

- **`App.js`:** Defines the main routes for the application, including public routes and protected routes.
- **`ProtectedRoute.jsx`:** A higher-order component that checks if a user is authenticated before allowing access to a route. If the user is not authenticated, they are redirected to the login page.

## API Communication

All communication with the backend API is handled through a pre-configured Axios instance in `src/services/axiosInstance.js`. This allows for centralized handling of API requests, including setting base URLs and automatically including authentication tokens in the headers of requests.

## Offline Support

The application provides offline support using a service worker and Redux for state management.

- **Service Worker:** The service worker, configured in `workbox-config.js` and generated by Workbox, caches application assets and API responses to make the application available offline.
- **Offline Reducer:** The `offlineReducer` manages the application's offline state, including tracking the online/offline status and queuing actions that are dispatched while the application is offline.
- **Network Status:** The `utils/networkStatus.js` file contains functions to check the network status and dispatch actions accordingly.
- **Offline Banner:** The `OfflineBanner.jsx` component is displayed when the application is offline to inform the user.