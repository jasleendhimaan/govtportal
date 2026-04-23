import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../axios';
import { Mail, Lock, LogIn, ShieldAlert, ArrowRight, ShieldCheck, Loader, XCircle, ArrowLeft, Info } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';
  const message = location.state?.message;

  useEffect(() => {
    if (user) {
      navigate(user.role === 'admin' ? '/admin-dashboard' : user.role === 'officer' ? '/officer-dashboard' : '/citizen-dashboard', { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/auth/login', { email, password });
      login(res.data.user, res.data.token);
      
      const role = res.data.user.role;
      if (from !== '/') {
        navigate(from, { replace: true });
      } else {
        if (role === 'admin') navigate('/admin-dashboard');
        else if (role === 'officer') navigate('/officer-dashboard');
        else navigate('/citizen-dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page animate-up" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at top right, rgba(37, 99, 235, 0.05), transparent), radial-gradient(circle at bottom left, rgba(255, 153, 51, 0.03), transparent)', padding: '2rem' }}>
       <div style={{ width: '100%', maxWidth: '1000px', display: 'grid', gridTemplateColumns: '450px 1fr', background: 'white', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)' }}>
            
            {/* Left Brand Panel */}
            <div style={{ background: 'var(--primary)', padding: '4rem 3rem', color: 'white', position: 'relative', overflow: 'hidden' }}>
                 <div style={{ position: 'absolute', top: -100, left: -100, width: '300px', height: '300px', background: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                 <div style={{ position: 'absolute', bottom: -50, right: -50, width: '200px', height: '200px', background: 'rgba(37, 99, 235, 0.2)', borderRadius: '50%' }}></div>
                 
                 <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', textDecoration: 'none', marginBottom: '4rem', zIndex: 1, position: 'relative' }}>
                    <ArrowLeft size={20} /> <span style={{ fontWeight: '600' }}>Back to Home</span>
                 </Link>

                 <div style={{ zIndex: 1, position: 'relative' }}>
                    <div style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}><ShieldCheck size={56} /></div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.2' }}>Secure Gateway to JanSewa Services</h2>
                    <p style={{ opacity: 0.7, fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '3rem' }}>
                        Access your digital identity to report grievances, track progress, and communicate with departments securely.
                    </p>
                    
                    <ul style={{ display: 'grid', gap: '1rem', padding: 0, listStyle: 'none' }}>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', opacity: 0.8 }}><ShieldCheck size={18} /> End-to-end encrypted session</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', opacity: 0.8 }}><ShieldCheck size={18} /> Unified Sign-in & Authentication</li>
                        <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', opacity: 0.8 }}><ShieldCheck size={18} /> Real-time grievance tracking</li>
                    </ul>
                 </div>
            </div>

            {/* Right Form Panel */}
            <div style={{ padding: '5rem 4rem' }}>
                <div style={{ marginBottom: '3.5rem' }}>
                    <h1 style={{ fontSize: '2.4rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>Access Gateway</h1>
                    <p style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '1.1rem' }}>Log in to your account. New users are registered automatically.</p>
                </div>

                {message && (
                    <div style={{ background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.2)', color: 'var(--accent)', padding: '1rem', borderRadius: '12px', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', fontWeight: '700' }}>
                        <Info size={20} /> {message}
                    </div>
                )}

                {error && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '12px', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', fontWeight: '600' }}>
                        <XCircle size={20} /> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="label">Your Email Identity</label>
                        <div style={{ position: 'relative' }}>
                             <Mail style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
                             <input 
                                type="email" 
                                className="modern-input" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                placeholder="citizen@email.com"
                                style={{ paddingLeft: '3rem' }}
                             />
                        </div>
                    </div>

                    <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                             <label className="label" style={{ marginBottom: 0 }}>Portal Access Password</label>
                             <a href="#" style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: '700', textDecoration: 'none' }}>Forgot?</a>
                        </div>
                        <div style={{ position: 'relative' }}>
                             <Lock style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
                             <input 
                                type="password" 
                                className="modern-input" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                placeholder="••••••••"
                                style={{ paddingLeft: '3rem' }}
                             />
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
  <p style={{ color: 'var(--text-muted)', fontWeight: '500' }}>
    Don’t have an account?{' '}
    <Link 
      to="/register" 
      style={{ color: 'var(--accent)', fontWeight: '700', textDecoration: 'none' }}
    >
      Register here
    </Link>
  </p>
</div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
                        <input type="checkbox" id="remember" style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                        <label htmlFor="remember" style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500', cursor: 'pointer' }}>Remember this official session</label>
                    </div>

                    <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', padding: '1.1rem', fontSize: '1.1rem', borderRadius: '15px' }}>
                        {loading ? <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}><Loader className="animate-spin" size={20} /> Authenticating...</div> : <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', justifyContent: 'center' }}><LogIn size={20} /> Continue to Portal <ArrowRight size={18} /></div>}
                    </button>
                </form>

                <div style={{ textAlign: 'center', marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid #f1f5f9' }}>
                    <p style={{ color: 'var(--text-muted)', fontWeight: '500', fontSize: '0.9rem', lineHeight: '1.6' }}>
                         By continuing, you agree to the JanSewa digital terms. Your identity and grievance data are encrypted and stored in our secure state database.
                    </p>
                </div>
            </div>
       </div>

       <style>{`
          .animate-spin { animation: spin 1s linear infinite; }
          @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          @media (max-width: 900px) {
              .login-page > div { grid-template-columns: 1fr !important; }
              .login-page > div > div:first-child { display: none !important; }
          }
       `}</style>
    </div>
  );
};

export default Login;