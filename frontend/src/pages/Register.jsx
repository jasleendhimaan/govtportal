import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../axios';
import {
  UserPlus,
  Mail,
  Lock,
  User,
  Loader,
  ShieldCheck,
  ArrowLeft,
  ArrowRight,
  XCircle,
  Activity,
  Globe
} from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'citizen'
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/auth/register', formData);
      alert('✅ Registration successful');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #e0f2fe, #f8fafc)',
      padding: '2rem'
    }}>

      <div style={{
        width: '100%',
        maxWidth: '1000px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        borderRadius: '25px',
        overflow: 'hidden',
        boxShadow: '0 25px 50px rgba(0,0,0,0.1)'
      }}>

        {/* LEFT PANEL */}
        <div style={{
          background: 'linear-gradient(135deg, #2563eb, #1e40af)',
          color: 'white',
          padding: '3rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Link to="/" style={{ color: 'white', marginBottom: '2rem' }}>
            <ArrowLeft /> Back
          </Link>

          <UserPlus size={50} />
          <h2 style={{ marginTop: '1rem' }}>Create Account</h2>
          <p style={{ opacity: 0.8 }}>
            Join JanSewa Portal to manage your complaints and services easily.
          </p>

          <div style={{ marginTop: '2rem' }}>
            <p><Globe /> All government services</p>
            <p><Activity /> Track complaints live</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div style={{ padding: '3rem', background: 'white' }}>

          <h1 style={{ marginBottom: '1.5rem' }}>Register</h1>

          {error && (
            <div style={{
              background: '#fee2e2',
              padding: '10px',
              borderRadius: '10px',
              color: '#dc2626',
              marginBottom: '1rem',
              display: 'flex',
              gap: '8px'
            }}>
              <XCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* NAME */}
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <User style={{ position: 'absolute', top: '12px', left: '10px' }} size={18} />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            {/* EMAIL */}
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <Mail style={{ position: 'absolute', top: '12px', left: '10px' }} size={18} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            {/* PASSWORD */}
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <Lock style={{ position: 'absolute', top: '12px', left: '10px' }} size={18} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            {/* ROLE */}
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
              <ShieldCheck style={{ position: 'absolute', top: '12px', left: '10px' }} size={18} />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="citizen">Citizen</option>
                <option value="officer">Officer</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              {loading ? <Loader className="animate-spin" /> : 'Register'}
            </button>

          </form>

          <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            Already have account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>

      <style>{`
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px 10px 10px 35px',
  borderRadius: '10px',
  border: '1px solid #ddd',
  outline: 'none'
};

export default Register;