import React from 'react';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, Twitter, Facebook, Globe, Youtube, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ background: 'var(--primary)', color: 'white', padding: '8rem 0 3rem 0', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', background: 'linear-gradient(90deg, #ff9933, #ffffff, #138808)' }}></div>
            
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '4rem', marginBottom: '5rem' }}>
                    
                    {/* Brand Column */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem', fontWeight: '800', marginBottom: '2.5rem' }}>
                            <div style={{ background: 'var(--accent)', color: 'white', padding: '0.4rem', borderRadius: '10px' }}><ShieldCheck size={24} /></div>
                             JanSewa Portal
                        </div>
                        <p style={{ opacity: 0.6, lineHeight: '1.8', marginBottom: '3rem', fontSize: '1rem', maxWidth: '350px' }}>
                             The official digital gateway for citizen grievance redressal and departmental accountability across the state.
                        </p>
                        <div style={{ display: 'flex', gap: '1.25rem' }}>
                             <a href="#" className="social-icon"><Twitter size={20} /></a>
                             <a href="#" className="social-icon"><Facebook size={20} /></a>
                             <a href="#" className="social-icon"><Youtube size={20} /></a>
                             <a href="#" className="social-icon"><Globe size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Access */}
                    <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '2rem', color: 'var(--accent-saffron)' }}>Portal Services</h4>
                        <ul className="footer-links" style={{ listStyle: 'none', padding: 0 }}>
                            <li><Link to="/submit-complaint">Register Grievance</Link></li>
                            <li><Link to="/track-complaint">Track Progress</Link></li>
                            <li><Link to="/services">Department Directory</Link></li>
                            <li><Link to="/citizen-dashboard">My Portfolio</Link></li>
                            <li><Link to="/about">About the Portal</Link></li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '2rem', color: 'white', paddingBottom: '0.75rem', display: 'inline-block', position: 'relative' }}>
                            Quick Links
                            <span style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', background: 'var(--accent-saffron)' }}></span>
                        </h4>
                        <ul className="footer-links" style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1.5rem' }}>
                            <li><Link to="/track-complaint" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', opacity: 1 }}><ExternalLink size={18} /> Track Status</Link></li>
                            <li><Link to="/about" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', opacity: 1 }}><ExternalLink size={18} /> Terms & Conditions</Link></li>
                            <li><Link to="/feedback" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'white', opacity: 1 }}><ExternalLink size={18} /> Feedback</Link></li>
                        </ul>
                    </div>

                    {/* Direct Contact */}
                    <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '2rem', color: 'var(--accent-saffron)' }}>Official Contacts</h4>
                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ color: 'var(--accent)', marginTop: '0.2rem' }}><Phone size={18} /></div>
                                <div><p style={{ fontWeight: '700' }}>1800-123-4567</p><p style={{ fontSize: '0.8rem', opacity: 0.5 }}>Official Toll-Free (24/7)</p></div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ color: 'var(--accent)', marginTop: '0.2rem' }}><Mail size={18} /></div>
                                <div><p style={{ fontWeight: '700' }}>help@gov.portal</p><p style={{ fontSize: '0.8rem', opacity: 0.5 }}>Response within 24hr</p></div>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <div style={{ color: 'var(--accent)', marginTop: '0.2rem' }}><MapPin size={18} /></div>
                                <div><p style={{ fontWeight: '700' }}>Secretariat, Block A</p><p style={{ fontSize: '0.8rem', opacity: 0.5 }}>New Delhi, 110001</p></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <p style={{ fontSize: '0.85rem', opacity: 0.5 }}>© 2026 National E-Governance Division. All Rights Reserved. Managed by NIC.</p>
                     <div style={{ display: 'flex', gap: '2rem', fontSize: '0.85rem', opacity: 0.5 }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Made for digital citizens with <Heart size={14} color="#e53e3e" /></span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Globe size={14} /> Regional Access India (English)</span>
                     </div>
                </div>
            </div>

            <style>{`
                .footer-links li { margin-bottom: 1rem; }
                .footer-links a { color: white; opacity: 0.5; text-decoration: none; font-weight: 500; font-size: 0.95rem; transition: all 0.2s ease; }
                .footer-links a:hover { opacity: 1; color: var(--accent); padding-left: 0.5rem; }
                .social-icon { width: 45px; height: 45px; background: rgba(255,255,255,0.05); color: white; border-radius: 12px; display: flex; alignItems: center; justifyContent: center; transition: all 0.3s ease; }
                .social-icon:hover { background: var(--accent); color: white; transform: translateY(-5px); }
                @media (max-width: 1000px) {
                    footer > .container > div:first-child { grid-template-columns: 1fr 1fr !important; }
                }
                @media (max-width: 600px) {
                    footer > .container > div:first-child { grid-template-columns: 1fr !important; }
                    footer > .container > div:last-child { flexDirection: column !important; gap: 2rem !important; textAlign: center !important; }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
