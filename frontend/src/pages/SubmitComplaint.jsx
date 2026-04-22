import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../axios';
import { 
  FileText, MapPin, Tag, Upload, Send, ArrowLeft, 
  CheckCircle, Loader, MessageSquare, ShieldCheck, 
  AlertCircle, ChevronRight, Home, LayoutDashboard, Languages, Clock
} from 'lucide-react';
import { translations } from '../utils/translations';

const SubmitComplaint = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [trackingId, setTrackingId] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    image: null
  });

  const categories = translations.en.categories;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  const data = new FormData();
  data.append('title', formData.title);
  data.append('description', formData.description);
  data.append('category', formData.category);
  data.append('location', formData.location);
  if (formData.image) data.append('image', formData.image);

  try {
    const token = localStorage.getItem('token');

    await axios.post(
      'http://localhost:5000/api/complaints/submit',
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert('Complaint submitted successfully');
    navigate('/citizen-dashboard');

  } catch (err) {
    setError(err.response?.data?.message || 'Error submitting complaint');
  } finally {
    setLoading(false);
  }
};

  if (success) return (
    <div className="animate-up" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9', padding: '2rem' }}>
        <div className="glass-panel" style={{ maxWidth: '600px', width: '100%', padding: '4rem 3rem', textAlign: 'center', borderRadius: '40px' }}>
            <div style={{ background: 'var(--accent-green)', color: 'white', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem auto', boxShadow: '0 20px 30px -10px rgba(16, 185, 129, 0.4)' }}>
                <CheckCircle size={56} />
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '1rem' }}>{t.successTitle}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '3rem', lineHeight: '1.6' }}>{t.successMsg}</p>
            
            <div style={{ background: 'var(--bg-main)', padding: '2rem', borderRadius: '24px', border: '2px dashed var(--accent)', marginBottom: '3.5rem' }}>
                 <p style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)', marginBottom: '0.75rem' }}>{t.trackingIdLabel}</p>
                 <h2 style={{ fontSize: '2.8rem', fontWeight: '900', letterSpacing: '2px', color: 'var(--primary)' }}>{trackingId}</h2>
            </div>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
                <button onClick={() => navigate('/citizen-dashboard')} className="btn btn-primary" style={{ padding: '1.1rem', fontSize: '1.1rem', borderRadius: '15px' }}>
                    <LayoutDashboard size={20} /> {t.btnDashboard}
                 </button>
                 <Link to="/track-complaint" state={{ trackingId }} style={{ fontWeight: '800', color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontSize: '1rem' }}>
                    {t.btnTrack} <ArrowRight size={20} />
                 </Link>
            </div>
        </div>
    </div>
  );

  return (
    <div className="animate-up" style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      <div className="container" style={{ padding: '5rem 2rem', maxWidth: '1100px' }}>
        
        {/* Header Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
             <Link to="/citizen-dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: '800', color: 'var(--primary)', textDecoration: 'none', fontSize: '1rem', background: 'white', padding: '0.75rem 1.25rem', borderRadius: '50px', boxShadow: 'var(--shadow-md)' }}>
                <ArrowLeft size={18} /> {t.backDashboard}
             </Link>

             {/* Language Switcher */}
             <div style={{ display: 'flex', gap: '0.5rem', background: 'white', padding: '0.4rem', borderRadius: '50px', boxShadow: 'var(--shadow-sm)' }}>
                <button 
                  onClick={() => setLang('en')} 
                  style={{ border: 'none', background: lang === 'en' ? 'var(--accent)' : 'transparent', color: lang === 'en' ? 'white' : 'var(--text-main)', padding: '0.5rem 1rem', borderRadius: '50px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  English
                </button>
                <button 
                  onClick={() => setLang('hi')} 
                  style={{ border: 'none', background: lang === 'hi' ? 'var(--accent)' : 'transparent', color: lang === 'hi' ? 'white' : 'var(--text-main)', padding: '0.5rem 1rem', borderRadius: '50px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  हिन्दी
                </button>
                <button 
                  onClick={() => setLang('pa')} 
                  style={{ border: 'none', background: lang === 'pa' ? 'var(--accent)' : 'transparent', color: lang === 'pa' ? 'white' : 'var(--text-main)', padding: '0.5rem 1rem', borderRadius: '50px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  ਪੰਜਾਬੀ
                </button>
             </div>

             <div className="desktop-verified-badge" style={{ display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.5, fontWeight: '800', fontSize: '0.9rem' }}>
                <span>{t.idVerified}</span>
                <div style={{ width: '40px', height: '1px', background: 'black' }}></div>
                <span>{t.entryPortal}</span>
             </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '4rem', alignItems: 'start' }} className="form-grid-layout">
            
            {/* Form Section */}
            <div className="glass-panel" style={{ padding: '4rem', borderRadius: '30px', background: 'white' }}>
                <div style={{ marginBottom: '3.5rem' }}>
                    <div style={{ color: 'var(--accent)', marginBottom: '1rem' }}><FileText size={40} /></div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '0.75rem' }}>{t.formTitle}</h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: '500' }}>{t.formSubtitle}</p>
                </div>

                {error && (
                    <div style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#dc2626', padding: '1rem', borderRadius: '12px', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.9rem', fontWeight: '600' }}>
                        <AlertCircle size={20} /> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '2rem' }}>
                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="label">{t.fieldTitle}</label>
                        <div style={{ position: 'relative' }}>
                            <FileText style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
                            <input type="text" name="title" className="modern-input" value={formData.title} onChange={handleChange} required placeholder={t.placeholderTitle} style={{ paddingLeft: '3.5rem' }} />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="form-row-2">
                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <label className="label">{t.fieldCategory}</label>
                            <div style={{ position: 'relative' }}>
                                <Tag style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
                                <select name="category" className="modern-input" value={formData.category} onChange={handleChange} required style={{ paddingLeft: '3.5rem', appearance: 'none' }}>
                                    <option value="">{t.selectCategory}</option>
                                    {categories.map((c, idx) => (
                                      <option key={c} value={c}>{t.categories[idx]}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="input-group" style={{ marginBottom: 0 }}>
                            <label className="label">{t.fieldLocation}</label>
                            <div style={{ position: 'relative' }}>
                                <MapPin style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} size={20} />
                                <input type="text" name="location" className="modern-input" value={formData.location} onChange={handleChange} required placeholder={t.placeholderLocation} style={{ paddingLeft: '3.5rem' }} />
                            </div>
                        </div>
                    </div>

                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="label">{t.fieldDescription}</label>
                        <textarea name="description" className="modern-input" value={formData.description} onChange={handleChange} required placeholder={t.placeholderDescription} style={{ height: '180px', lineHeight: '1.6', resize: 'none' }}></textarea>
                    </div>

                    <div className="input-group" style={{ marginBottom: 0 }}>
                        <label className="label">{t.fieldFile}</label>
                        <div style={{ border: '3px dashed #e2e8f0', borderRadius: '15px', padding: '3.5rem', textAlign: 'center', transition: 'all 0.2s ease', position: 'relative' }} className="file-drop-zone">
                             <input type="file" onChange={handleFileChange} accept="image/*" style={{ opacity: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }} />
                             <div className="animate-float" style={{ color: 'var(--accent)', marginBottom: '1rem' }}><Upload size={48} /></div>
                             <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.5rem' }}>{formData.image ? formData.image.name : t.placeholderFile}</h4>
                             <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t.maxSize}</p>
                        </div>
                    </div>

                    <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%', padding: '1.2rem', fontSize: '1.2rem', borderRadius: '15px', marginTop: '2rem', boxShadow: '0 20px 30px -10px rgba(37, 99, 235, 0.4)' }}>
                        {loading ? <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Loader className="animate-spin" size={20} /> {t.btnSubmitting}</div> : <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Send size={24} /> {t.btnSubmit}</div>}
                    </button>
                </form>
            </div>

            {/* Sidebar Guidance */}
            <aside style={{ position: 'sticky', top: '120px' }}>
                <div style={{ background: 'var(--primary)', color: 'white', padding: '2.5rem', borderRadius: '25px', marginBottom: '2rem' }}>
                    <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--accent-saffron)' }}><ShieldCheck size={24} /> {t.sidebarTitle}</h3>
                    <p style={{ fontSize: '0.9rem', opacity: 0.7, lineHeight: '1.6', marginBottom: '2rem' }}>{t.sidebarText}</p>
                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.25rem', borderRadius: '15px' }}>
                             <h5 style={{ fontWeight: '800', fontSize: '0.8rem', color: 'white', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{t.responseTarget}</h5>
                             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                 <span style={{ fontSize: '1.2rem', fontWeight: '900' }}>{t.hoursTarget}</span>
                                 <Clock size={20} style={{ opacity: 0.4 }} />
                             </div>
                        </div>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '2rem', border: '1px solid #eef2f6', background: 'white', borderRadius: '25px' }}>
                    <h4 style={{ fontWeight: '800', marginBottom: '1.25rem', color: 'var(--primary)' }}>{t.assistance}</h4>
                    <Link to="/contact" className="btn btn-outline" style={{ width: '100%', fontSize: '0.9rem' }}><MessageSquare size={18} /> {t.helpdesk}</Link>
                </div>
            </aside>
        </div>
      </div>
      
      <style>{`
        .file-drop-zone:hover { border-color: var(--accent); background: #f0f7ff; }
        .animate-spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
            .form-grid-layout { grid-template-columns: 1fr !important; }
            .form-row-2 { grid-template-columns: 1fr !important; }
            .desktop-verified-badge { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default SubmitComplaint;
