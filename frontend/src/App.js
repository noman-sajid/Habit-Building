import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterPage from './pages/authPages/RegisterPage';
import Navbar from './components/layout/Navbar'; // ✅ Import Navbar
import Footer from './components/layout/Footer'; // Optional, can be added later

function App() {
  return (
    <Router>
      <div className="relative min-h-screen transition-colors duration-300">
        <Navbar /> 
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        {/* Footer can be added here if needed */}
         <Footer /> 
      </div>
    </Router>
  );
}

export default App;
