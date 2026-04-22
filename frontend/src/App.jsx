import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import SubmitComplaint from './pages/SubmitComplaint';
import TrackComplaint from './pages/TrackComplaint';
import CitizenDashboard from './pages/CitizenDashboard';
import AdminDashboard from './pages/AdminDashboard';
import OfficerDashboard from './pages/OfficerDashboard';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Feedback from './pages/Feedback';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/track-complaint" element={<TrackComplaint />} />
              <Route path="/feedback" element={<Feedback />} />

              {/* Citizen Only Routes */}
              <Route path="/submit-complaint" element={
                <ProtectedRoute allowedRoles={['citizen']}>
                  <SubmitComplaint />
                </ProtectedRoute>
              } />
              
              <Route path="/citizen-dashboard" element={
                <ProtectedRoute allowedRoles={['citizen']}>
                  <CitizenDashboard />
                </ProtectedRoute>
              } />

              {/* Admin Only Routes */}
              <Route path="/admin-dashboard" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              {/* Officer Only Routes */}
              <Route path="/officer-dashboard" element={
                <ProtectedRoute allowedRoles={['officer']}>
                  <OfficerDashboard />
                </ProtectedRoute>
              } />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
