import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CustomNavbar from './components/Navbar';
import Navbar2 from './components/Navbar2';
import Home from './components/Home';
import About from './components/About';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard'; // Import Dashboard component

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// PrivateRoute component to protect the dashboard route
const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("access_token");
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated (by checking the presence of the access token)
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      {/* Conditionally render Navbar or Navbar2 based on authentication */}
      {isAuthenticated ? <Navbar2 /> : <CustomNavbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/portfolio" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard/:userId"
          element={
            <PrivateRoute>
              <Home />
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
