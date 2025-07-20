import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { load } from './reducers/authReducer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/authPages/RegisterPage';
import LoginPage from './pages/authPages/LoginPage';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './routes/ProtectedRoute';
import Loader from './components/common/Loader';
import api from './services/axiosInstance';
import ForgotPasswordPage from './pages/authPages/ForgotPasswordPage';
import PasswordResetSent from './pages/authPages/PasswordResetSent';
import ResetPasswordPage from './pages/authPages/ResetPasswordPage';
import CreateHabitForm from './components/habits/CreateHabitForm';
import AllHabits from './components/habits/AllHabits';

function App() {
  const dispatch = useDispatch();
  const { initialized } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkAuthThenLoad = async () => {
      try {
        const res = await api.get('/users/auth/check');
        if (res?.data?.authenticated) {
          dispatch(load());
        } else {
          dispatch(load.rejected({ message: 'Not authenticated' }));
        }
      } catch (err) {
        console.error('[App] Silent auth check failed:', err?.response?.status, err?.message);
        dispatch({ type: 'auth/load/rejected', error: { message: 'Auth check failed' } });
      }
    };

    checkAuthThenLoad();
  }, [dispatch]);


  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-stone-800 dark:text-stone-100">

        <Loader />
      </div>
    );
  }

  return (
    <Router>
      <div className="relative min-h-screen transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/test-landing" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/password-reset-sent" element={<PasswordResetSent />} />
          <Route path="/reset/:token" element={<ResetPasswordPage />} />


          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-habit"
            element={
              <ProtectedRoute>
                <CreateHabitForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/habits"
            element={
              <ProtectedRoute>
                <AllHabits />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
