# Offline Functionality Architecture

This document provides a comprehensive overview of the application's offline capabilities, detailing the architecture, folder structure, data flow, and key components involved in allowing users to interact with the app without a stable network connection.

## High-Level Goal

The primary objective is to provide a seamless user experience, even when offline. This is achieved through three main strategies:
1.  **Asset Caching:** The application shell (HTML, CSS, JavaScript) and static assets are cached, allowing the app to load instantly without a network connection after the first visit.
2.  **Data Caching:** API responses, particularly the user's habit data, are cached. This allows users to view their existing habits while offline.
3.  **Background Synchronization:** Actions that modify data (like creating, completing, or updating a habit) are queued up locally when the user is offline and are automatically synced with the server once connectivity is restored.

---

## Folder Structure: `src/offline/`

This directory contains the core logic for the offline functionality.

-   **`indexedDB.js`**
    -   **Purpose:** Manages the client-side database (IndexedDB), which is essential for persisting data locally.
    -   **Responsibilities:**
        -   Initializes the database and creates object stores (`habits-store`, `queue-store`).
        -   Provides methods to save and retrieve habit data from the `habits-store`.
        -   Provides methods to add, retrieve, and clear actions from the `queue-store` (the background sync queue).

-   **`serviceWorker.js`**
    -   **Purpose:** This is the script that runs in the background, separate from the web page, and is the foundation of the PWA features.
    -   **Responsibilities:**
        -   Intercepts all outgoing network requests from the application.
        -   Serves cached assets (HTML, JS, CSS) for fast loads and offline access.
        -   Implements caching strategies for API calls (e.g., "Network First" for habit data).
        -   *(Future)* Will handle background sync events to process the queue even if the user has closed the app tab.

-   **`syncQueue.js`**
    -   **Purpose:** Manages the queue of actions to be synced with the server.
    -   **Responsibilities:**
        -   Provides a high-level `addToQueue` function that saves a failed API request to the IndexedDB `queue-store`.
        -   Contains the `flushQueue` logic, which is responsible for processing each item in the queue, re-attempting the API call, and clearing the queue upon successful synchronization.

-   **`workbox-config.js`**
    -   **Purpose:** This is a configuration file for Workbox, a set of libraries that simplifies service worker development.
    -   **Responsibilities:**
        -   Defines which files and assets (`globPatterns`) should be pre-cached.
        -   Defines runtime caching strategies for different URL patterns. For example, it configures a `NetworkFirst` strategy for `/api/habits`, meaning the service worker will always try to fetch the latest data from the network, but if it's unavailable, it will serve the last-known cached version.

---

## Integration with the Application

The offline system is integrated into the main application in several key places:

-   **`src/index.js`**: This is where the service worker should be registered to be installed by the browser.
-   **`src/utils/networkStatus.js`**: This utility listens for the browser's native `online` and `offline` events. When the network status changes, it dispatches an action to the Redux store to keep the application state aware of the current connectivity.
-   **`src/reducers/offlineReducer.js`**: A dedicated Redux slice that holds all offline-related state, such as `isOnline` and the current `queue` of actions waiting to be synced. This allows UI components to react to changes in connectivity (e.g., by disabling certain buttons or showing an "Offline" banner).
-   **`src/services/axiosInstance.js`**: The central Axios instance for making API calls. It should be configured with an interceptor to automatically catch network errors. When a request fails due to a network issue, the interceptor prevents the app from crashing and instead redirects the failed request to the `syncQueue` to be handled later.

---

## Data Flow & Scenarios

#### Scenario 1: User Goes Offline

1.  The user loses their internet connection.
2.  The `window.addEventListener('offline', ...)` in `networkStatus.js` fires.
3.  An action is dispatched to the Redux store: `setOnlineStatus(false)`.
4.  The UI can now react to the `isOnline: false` state (e.g., display an "Offline" banner).

#### Scenario 2: User Creates a Habit While Offline

1.  The user fills out the "Create Habit" form and clicks "Save".
2.  An action is dispatched to create the habit, and an API call is made via `axiosInstance`.
3.  The API call fails because the user is offline.
4.  The **Axios interceptor** (critical implementation piece) catches this specific network error.
5.  Instead of throwing an error to the UI, the interceptor calls `addToQueue()` from `syncQueue.js`, passing along the necessary information about the failed request (e.g., the endpoint, method, and payload).
6.  `syncQueue.js` saves this action to the `queue-store` in IndexedDB.
7.  The UI can be updated optimistically to show the new habit immediately, making the app feel responsive despite being offline.

#### Scenario 3: User Comes Back Online

1.  The user reconnects to the internet.
2.  The `window.addEventListener('online', ...)` in `networkStatus.js` fires.
3.  An action is dispatched: `setOnlineStatus(true)`.
4.  A listener (e.g., in a top-level React component) that observes the `isOnline` state change triggers the `flushQueue()` function from `syncQueue.js`.
5.  `flushQueue()` retrieves all pending actions from the IndexedDB `queue-store`.
6.  It iterates through the queue, re-executing each API call.
7.  As each call succeeds, the server is updated.
8.  Once all actions are successfully synced, the `queue-store` in IndexedDB is cleared.

---

## Missing Implementation Details

While the skeleton is well-structured, the following critical pieces need to be implemented to make the functionality complete:

1.  **Service Worker Registration**: The service worker is not currently being registered. Logic must be added to `src/index.js` to check the environment and register `service-worker.js`.
2.  **Axios Interceptor**: The `axiosInstance.js` needs an error-handling interceptor to catch network failures and route them to the `syncQueue`. This is the most critical link for background sync.
3.  **`flushQueue` Logic**: The `flushQueue` function in `syncQueue.js` needs to be implemented with the logic to actually perform the API requests based on the queued action data.
4.  **UI Feedback**: Components should use the `isOnline` state from the `offlineReducer` to provide clear feedback to the user (e.g., banners, disabled buttons, queue status indicators).
5.  **Build Process Integration**: The build script (`package.json`) needs to be updated to run the Workbox CLI (`workbox-cli generate:sw`) after the standard `react-scripts build` to inject the generated service worker into the `build` directory.
