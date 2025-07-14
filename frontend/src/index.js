import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from './context/ThemeContext';
import { AlertProvider } from './context/AlertContext'; 
import { Provider } from 'react-redux'; // ← Import Redux Provider
import store from './store'; // ← Your configured Redux store

// 🌓 Apply saved theme before React renders
const storedTheme = localStorage.getItem('theme');

if (storedTheme === 'dark') {
  document.documentElement.classList.add('dark');
} else if (storedTheme === 'light') {
  document.documentElement.classList.remove('dark');
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (prefersDark) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}> {/* ✅ Wrap in Redux Provider */}
      <AlertProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AlertProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
