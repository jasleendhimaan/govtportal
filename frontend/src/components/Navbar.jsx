import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, User, LogOut, LayoutDashboard, Search, Menu, X, Bell } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={`nav-advanced ${scrolled ? 'nav-scrolled' : ''}`} style={{ padding: '0 4rem' }}>
      <div style={{ width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* LOGO */}
        <Link to="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.7rem', fontWeight: '900', textDecoration: 'none' }}>
          <div style={{ background: 'var(--accent)', color: 'white', padding: '0.6rem', borderRadius: '15px', display: 'flex' }}>
            <ShieldCheck size={30} />
          </div>
          <span className="text-gradient">JanSewa Portal</span>
        </Link>

        {/* DESKTOP MENU */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="nav-desktop">
          <Link to="/" className="nav-link-modern">Home</Link>
          <Link to="/about" className="nav-link-modern">About</Link>
          <Link to="/services" className="nav-link-modern">Services</Link>
          <Link to="/track-complaint" className="nav-link-modern" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Search size={18} /> Track Status
          </Link>

          <div style={{ height: '30px', width: '1px', background: 'rgba(0,0,0,0.1)' }}></div>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              
              <Bell size={20} style={{ cursor: 'pointer' }} />

              <Link
                to={
                  user.role === 'citizen'
                    ? '/citizen-dashboard'
                    : user.role === 'admin'
                    ? '/admin-dashboard'
                    : '/officer-dashboard'
                }
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'rgba(37, 99, 235, 0.08)',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '30px',
                  textDecoration: 'none'
                }}
              >
                {user.role === 'citizen' ? <User size={18} /> : <LayoutDashboard size={18} />}
                <span>{user.name.split(' ')[0]}</span>
              </Link>

              <button onClick={handleLogout} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn btn-primary"
              style={{
                padding: '0.75rem 2rem',
                borderRadius: '50px',
                fontSize: '0.95rem'
              }}
            >
              Login
            </Link>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="mobile-toggle" style={{ border: 'none', background: 'none' }}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <style>{`
        .nav-link-modern {
          font-weight: 600;
          color: var(--text-main);
          text-decoration: none;
        }

        @media (max-width: 1024px) {
          .nav-desktop { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;