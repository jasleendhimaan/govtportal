import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
    return (
        <div className="contact-page animate-fade" style={{ background: 'var(--bg-light)', padding: '5rem 0' }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Contact Official Support</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)' }}>Get in touch with the state Citizen Help desk for any queries or assistance.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
                    <div className="card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
                         <div style={{ background: 'var(--bg-light)', padding: '1.25rem', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto', color: 'var(--primary)' }}><Phone size={36} /></div>
                         <h3 style={{ marginBottom: '1rem' }}>Official Line</h3>
                         <p style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '0.75rem' }}>1800-123-4567</p>
                         <p style={{ color: 'var(--text-muted)' }}>Toll-free / Available 24/7</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
                         <div style={{ background: 'var(--bg-light)', padding: '1.25rem', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto', color: 'var(--primary)' }}><Mail size={36} /></div>
                         <h3 style={{ marginBottom: '1rem' }}>Email Support</h3>
                         <p style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '0.75rem' }}>help@gov.portal</p>
                         <p style={{ color: 'var(--text-muted)' }}>Response within 24 hours</p>
                    </div>
                    <div className="card" style={{ textAlign: 'center', padding: '3.5rem 2rem' }}>
                         <div style={{ background: 'var(--bg-light)', padding: '1.25rem', borderRadius: '50%', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem auto', color: 'var(--primary)' }}><MapPin size={36} /></div>
                         <h3 style={{ marginBottom: '1rem' }}>Physical Office</h3>
                         <p style={{ fontWeight: 'bold', fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '0.75rem' }}>Secretariat Block A</p>
                         <p style={{ color: 'var(--text-muted)' }}>New Delhi, India 110001</p>
                    </div>
                </div>

                <div className="card" style={{ padding: '0', overflow: 'hidden', display: 'grid', gridTemplateColumns: 'minmax(400px, 1fr) 500px' }}>
                    <div style={{ padding: '4rem' }}>
                         <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Send Official Message</h2>
                         <form>
                             <div className="form-group">
                                 <label className="label">Full Name</label>
                                 <input type="text" className="input" placeholder="Your Official Name" />
                             </div>
                             <div className="form-group">
                                 <label className="label">Official Email ID</label>
                                 <input type="email" className="input" placeholder="name@email.com" />
                             </div>
                             <div className="form-group">
                                 <label className="label">Query Description</label>
                                 <textarea className="textarea" style={{ height: '140px' }} placeholder="Describe your query or request for assistance..."></textarea>
                             </div>
                             <button className="btn btn-primary" style={{ width: '100%', padding: '1.1rem', fontSize: '1.1rem' }}>Secure Send Message</button>
                         </form>
                    </div>
                    <div style={{ background: 'var(--primary)', color: 'white', padding: '4rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                         <h2 style={{ color: 'white', marginBottom: '2rem' }}>Working Hours</h2>
                         <div style={{ display: 'grid', gap: '1.5rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                                   <span style={{ fontWeight: 'bold' }}>Monday - Friday</span>
                                   <span>9:00 AM - 6:00 PM</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                                   <span style={{ fontWeight: 'bold' }}>Saturday</span>
                                   <span>10:00 AM - 2:00 PM</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                                   <span style={{ fontWeight: 'bold' }}>Sunday</span>
                                   <span style={{ color: 'var(--accent-saffron)', fontWeight: 'bold' }}>OFFICIAL HOLIDAY</span>
                              </div>
                         </div>
                         <div style={{ marginTop: '3.5rem', background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '15px', border: '1px dashed rgba(255,255,255,0.3)' }}>
                              <h4 style={{ color: 'white', display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem' }}><Clock size={20} /> Emergency Response</h4>
                              <p style={{ fontSize: '0.9rem', opacity: 0.9 }}>For critical emergencies related to public safety, please call the state emergency response center at 100 or 101 immediately.</p>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
