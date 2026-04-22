import React, { useState } from 'react';
import { Send, MessageSquare, Star, ArrowLeft, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Feedback = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'suggestion',
        rating: 5,
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRating = (rating) => {
        setFormData({ ...formData, rating });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="animate-up" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '2rem' }}>
                <div style={{ maxWidth: '600px', width: '100%', padding: '5rem 4rem', textAlign: 'center', background: 'white', borderRadius: '40px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }}>
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-green)', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem auto' }}>
                        <CheckCircle size={56} />
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Thank You!</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3.5rem', lineHeight: '1.7' }}>
                        Your official feedback has been recorded. We value your input in helping us shape a better digital governance experience.
                    </p>
                    <Link to="/" className="btn btn-primary" style={{ padding: '1rem 3rem', borderRadius: '50px', fontSize: '1.1rem', fontWeight: '800' }}>
                        Return to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-up" style={{ minHeight: 'calc(100vh - 80px)', background: 'radial-gradient(circle at top right, rgba(37, 99, 235, 0.05), transparent), radial-gradient(circle at bottom left, rgba(255, 153, 51, 0.03), transparent)' }}>
            
            {/* Page Header */}
            <div style={{ background: 'var(--primary)', padding: '5rem 2rem 8rem 2rem', textAlign: 'center', color: 'white', position: 'relative' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', marginBottom: '2rem', fontWeight: '700' }}>
                        <ArrowLeft size={18} /> Back to Dashboard
                    </Link>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '20px' }}><MessageSquare size={40} color="var(--accent-saffron)" /></div>
                    </div>
                    <h1 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Citizen Feedback Portal</h1>
                    <p style={{ opacity: 0.8, fontSize: '1.2rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
                        Help us improve the JanSewa digital infrastructure. Your voice shapes the future of governance.
                    </p>
                </div>
            </div>

            {/* Form Section */}
            <div className="container" style={{ marginTop: '-4rem', paddingBottom: '5rem', position: 'relative', zIndex: 10 }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', background: 'white', padding: '4rem 5rem', borderRadius: '40px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem', padding: '1rem', background: 'rgba(37, 99, 235, 0.05)', borderRadius: '15px', color: 'var(--primary)' }}>
                        <Sparkles size={24} color="var(--accent)" />
                        <p style={{ fontWeight: '700', fontSize: '0.95rem' }}>All feedback is reviewed directly by the Central Technical Operations Team.</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '2.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="form-responsive">
                            <div className="input-group" style={{ marginBottom: 0 }}>
                                <label className="label">Full Name (Optional)</label>
                                <input type="text" name="name" className="modern-input" value={formData.name} onChange={handleChange} placeholder="e.g. Jasleen D." />
                            </div>
                            <div className="input-group" style={{ marginBottom: 0 }}>
                                <label className="label">Email Identity</label>
                                <input type="email" name="email" className="modern-input" value={formData.email} onChange={handleChange} required placeholder="citizen@email.com" />
                            </div>
                        </div>

                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <label className="label">Feedback Category</label>
                            <select name="type" className="modern-input" value={formData.type} onChange={handleChange} style={{ appearance: 'none' }}>
                                <option value="suggestion">System Suggestion / Feature Request</option>
                                <option value="bug">Report a Technical Issue (Bug)</option>
                                <option value="compliment">Compliment / Positive Feedback</option>
                                <option value="usability">UI & Usability Experience</option>
                                <option value="other">Other Official Inquiry</option>
                            </select>
                        </div>

                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <label className="label">Rate Your Experience</label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button 
                                        key={star} 
                                        type="button" 
                                        onClick={() => handleRating(star)} 
                                        style={{ 
                                            background: 'none', 
                                            border: 'none', 
                                            cursor: 'pointer', 
                                            padding: '0.5rem',
                                            transition: 'transform 0.2s',
                                            transform: formData.rating >= star ? 'scale(1.2)' : 'scale(1)'
                                        }}
                                    >
                                        <Star size={32} fill={formData.rating >= star ? 'var(--accent-saffron)' : 'transparent'} color={formData.rating >= star ? 'var(--accent-saffron)' : '#cbd5e1'} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <label className="label">Detailed Observation</label>
                            <textarea 
                                name="message" 
                                className="modern-input" 
                                value={formData.message} 
                                onChange={handleChange} 
                                required 
                                placeholder="Please describe your experience or suggestion in detail..." 
                                style={{ height: '200px', resize: 'none', lineHeight: '1.6' }}
                            ></textarea>
                        </div>

                        <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', borderRadius: '15px', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', boxShadow: '0 20px 30px -10px rgba(37, 99, 235, 0.4)' }}>
                            {loading ? 'Submitting to Servers...' : <><Send size={20} /> Submit Official Feedback</>}
                        </button>
                    </form>
                </div>
            </div>

            <style>{`
                @media (max-width: 768px) {
                    .form-responsive { grid-template-columns: 1fr !important; }
                    .container > div { padding: 3rem 2rem !important; }
                }
            `}</style>
        </div>
    );
};

export default Feedback;
