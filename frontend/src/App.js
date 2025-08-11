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
import OfflineBanner from './components/layout/OfflineBanner';
import { listenNetworkStatus } from './utils/networkStatus';
import GoalCompletionPage from './components/dashboard/GoalCompletionPage';
import Register from './pages/authPages/Register';
import ProfilePage from './pages/authPages/ProfilePage';


function App() {
  const dispatch = useDispatch();
  const { initialized } = useSelector((state) => state.auth);

  useEffect(() => {
    listenNetworkStatus(dispatch);
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
      {/* ✅ Flex layout to push footer down */}
      <div className="flex flex-col min-h-screen transition-colors duration-300">
        <OfflineBanner />
        <Navbar />

        {/* ✅ Main grows to push footer */}
        <main className="flex-grow">
          <Routes>
            <Route path="/test-landing" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Home />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/password-reset-sent" element={<PasswordResetSent />} />
            <Route path="/reset/:token" element={<ResetPasswordPage />} />
            <Route path="/goal-complete" element={<GoalCompletionPage />} />

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
                path="/profile"
                element={
                  <ProtectedRoute>  
                    <ProfilePage />
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
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
