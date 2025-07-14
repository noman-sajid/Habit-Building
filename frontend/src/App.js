import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { load } from './reducers/authReducer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/authPages/RegisterPage';
import Navbar from './components/layout/Navbar'; 
import Footer from './components/layout/Footer'; 
import Home from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log('[App] Dispatching loadUser()');
    dispatch(load());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-stone-800 dark:text-stone-100">
        Loading app...
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
          <Route path="/" element={<Home />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
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
