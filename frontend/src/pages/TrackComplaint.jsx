import React, { useState } from 'react';
import axios from 'axios';
import { 
  Search, Loader, AlertCircle, Clock, CheckCircle, 
  MapPin, Tag, User, MessageCircle, ArrowRight, ShieldCheck, 
  ArrowLeft, FileText, ChevronRight, Activity, Calendar
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const TrackComplaint = () => {
  const locationState = useLocation();
  const [trackingId, setTrackingId] = useState(locationState.state?.trackingId || '');
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = async (e) => {
    if (e) e.preventDefault();
    if (!trackingId.trim()) return;
    setLoading(true);
    setError('');
    setComplaint(null);
    try {
      const res = await axios.get(`http://localhost:5000/api/complaints/track/${trackingId}`);
      setComplaint(res.data);
    } catch (err) {
      setError('Official Record Not Found: Please verify the Tracking ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (locationState.state?.trackingId) {
      handleTrack();
    }
  }, []);

  const getStatusStep = (status) => {
    const steps = ['Pending', 'In Progress', 'Resolved'];
    const currentIdx = steps.indexOf(status);
    return currentIdx === -1 ? 0 : currentIdx;
  };

  return (
    <div className="animate-up" style={{ minHeight: '100vh', background: '#f1f5f9', padding: '5rem 0' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        {/* Header and Search */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', fontWeight: '800', color: 'var(--accent)', textDecoration: 'none', marginBottom: '2rem' }}>
             <ArrowLeft size={18} /> Home Services
          </Link>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>Track Your Petition</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '3.5rem', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>Enter your official 8-digit tracking ID to receive a real-time progress report from the state department.</p>

          <form onSubmit={handleTrack} style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', gap: '1rem', background: 'white', padding: '0.75rem', borderRadius: '24px', boxShadow: '0 25px 50px -15px rgba(0,0,0,0.1)', border: '1px solid #eef2f6' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem', paddingLeft: '1.5rem' }}>
              <Search size={24} color="var(--accent)" />
              <input 
                type="text" 
                placeholder="Ex: COMP-A1B2C3D4..." 
                value={trackingId} 
                onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
                style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary)' }}
              />
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading} style={{ borderRadius: '15px', padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
              {loading ? <Loader className="animate-spin" /> : 'Retrieve Record'}
            </button>
          </form>
        </div>

        {error && (
            <div className="glass-panel" style={{ background: '#fef2f2', border: '1px solid #fee2e2', color: '#dc2626', padding: '2rem', borderRadius: '24px', display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
                <AlertCircle size={32} />
                <div>
                    <h4 style={{ fontWeight: '800', marginBottom: '0.25rem' }}>Database Retrieval Failed</h4>
                    <p style={{ opacity: 0.8 }}>{error}</p>
                </div>
            </div>
        )}

        {complaint && (
          <div className="animate-up" style={{ display: 'grid', gap: '2rem' }}>
            
            {/* Main Status Header */}
            <div className="glass-panel" style={{ background: 'white', padding: '3.5rem', borderRadius: '35px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: '400px', height: '100%', background: 'linear-gradient(to left, rgba(37,99,235,0.03), transparent)', pointerEvents: 'none' }}></div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                             <span style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent)', fontWeight: '900', padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.9rem' }}>{complaint.trackingId}</span>
                             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800', color: 'var(--text-muted)', fontSize: '0.85rem' }}><Activity size={18} /> LIVE CASE STATUS</div>
                        </div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)', lineHeight: '1.2' }}>{complaint.title}</h2>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                         <span className={`status-badge-lg ${complaint.status.toLowerCase().replace(' ', '-')}`}>
                             {complaint.status}
                         </span>
                         <p style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)', marginTop: '1rem' }}>Last updated: {new Date(complaint.updatedAt).toLocaleDateString()}</p>
                    </div>
                </div>

                {/* ADVANCED TIMELINE */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', position: 'relative', marginBottom: '4rem' }}>
                    <div style={{ position: 'absolute', top: '24px', left: '16%', right: '16%', height: '4px', background: '#e2e8f0', zIndex: 0 }}>
                         <div style={{ width: `${(getStatusStep(complaint.status) / 2) * 100}%`, height: '100%', background: 'var(--accent)', transition: 'width 1s ease 0.5s' }}></div>
                    </div>
                    
                    {['Petition Received', 'Official Review', 'Grievance Resolved'].map((step, i) => {
                        const currentIdx = getStatusStep(complaint.status);
                        const isDone = i <= currentIdx;
                        const isActive = i === currentIdx;
                        
                        return (
                            <div key={i} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                                <div style={{ width: '52px', height: '52px', background: isDone ? 'var(--accent)' : 'white', borderRadius: '50%', border: `4px solid ${isActive ? 'var(--accent)' : isDone ? 'var(--accent)' : '#e2e8f0'}`, margin: '0 auto 1.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDone ? 'white' : '#cbd5e1', transition: 'all 0.3s ease' }}>
                                    {isDone ? <CheckCircle size={24} /> : i + 1}
                                </div>
                                <h4 style={{ fontSize: '1rem', fontWeight: '800', color: isDone ? 'var(--primary)' : 'var(--text-muted)' }}>{step}</h4>
                            </div>
                        );
                    })}
                </div>

                {/* Info Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', borderTop: '1px solid #f1f5f9', paddingTop: '3rem' }}>
                     <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                         <div style={{ color: 'var(--accent)' }}><Tag size={24} /></div>
                         <div>
                             <p style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.5, textTransform: 'uppercase' }}>Subject Area</p>
                             <p style={{ fontWeight: '800', fontSize: '1.1rem' }}>{complaint.category}</p>
                         </div>
                     </div>
                     <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                         <div style={{ color: 'var(--accent)' }}><MapPin size={24} /></div>
                         <div>
                             <p style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.5, textTransform: 'uppercase' }}>Primary Location</p>
                             <p style={{ fontWeight: '800', fontSize: '1.1rem' }}>{complaint.location}</p>
                         </div>
                     </div>
                     <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                         <div style={{ color: 'var(--accent)' }}><User size={24} /></div>
                         <div>
                             <p style={{ fontSize: '0.75rem', fontWeight: '800', opacity: 0.5, textTransform: 'uppercase' }}>Assigned Officer</p>
                             <p style={{ fontWeight: '800', fontSize: '1.1rem' }}>{complaint.assignedTo?.name || 'In Allocation Queue'}</p>
                         </div>
                     </div>
                </div>
            </div>

            {/* Content & History */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '2rem', alignItems: 'start' }}>
                <div style={{ display: 'grid', gap: '2rem' }}>
                    <div className="glass-panel" style={{ background: 'white', padding: '3rem', borderRadius: '30px' }}>
                         <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><FileText size={24} color="var(--accent)" /> Detailed Account</h3>
                         <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-main)', opacity: 0.8 }}>{complaint.description}</p>
                    </div>

                    <div className="glass-panel" style={{ background: 'white', padding: '3rem', borderRadius: '30px' }}>
                         <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><MessageCircle size={24} color="var(--accent-saffron)" /> Official Remarks & Updates</h3>
                         {(!complaint.remarks || complaint.remarks.length === 0) ? (
                             <div style={{ padding: '2rem', background: 'var(--bg-main)', borderRadius: '20px', border: '1px dashed #e2e8f0', textAlign: 'center' }}>
                                 <p style={{ color: 'var(--text-muted)', fontWeight: '600' }}>No administrative remarks have been added to this dossier yet.</p>
                             </div>
                         ) : (
                             <div style={{ display: 'grid', gap: '1.5rem' }}>
                                 {complaint.remarks.map((r, i) => (
                                     <div key={i} style={{ display: 'flex', gap: '1.5rem' }}>
                                          <div style={{ width: '40px', height: '40px', background: 'var(--accent)', color: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><ShieldCheck size={20} /></div>
                                          <div style={{ background: 'var(--bg-main)', padding: '1.5rem', borderRadius: '0 20px 20px 20px', flex: 1 }}>
                                               <p style={{ fontWeight: '700', marginBottom: '0.75rem', lineHeight: '1.6' }}>{r.text}</p>
                                               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', opacity: 0.5, fontWeight: '800' }}>
                                                   <span>OFFICIAL UPDATE</span>
                                                   <span>{new Date(r.at).toLocaleString()}</span>
                                               </div>
                                          </div>
                                     </div>
                                 ))}
                             </div>
                         )}
                    </div>
                </div>

                {/* Side Card Image/Evidence */}
                <div style={{ position: 'sticky', top: '120px' }}>
                    <div className="glass-panel" style={{ background: 'white', padding: '2rem', borderRadius: '30px' }}>
                         <h4 style={{ fontWeight: '900', marginBottom: '1.5rem' }}>Visual Evidence</h4>
                         {complaint.image ? (
                             <div style={{ borderRadius: '20px', overflow: 'hidden', height: '250px', border: '1px solid #eef2f6' }}>
                                 <img src={`http://localhost:5000/${complaint.image}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Dossier Evidence" />
                             </div>
                         ) : (
                             <div style={{ height: '250px', background: 'var(--bg-main)', borderRadius: '20px', border: '2px dashed #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
                                 <FileText size={48} style={{ color: '#cbd5e1', marginBottom: '1rem' }} />
                                 <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '700' }}>No visual documentation uploaded with this petition.</p>
                             </div>
                         )}
                    </div>
                    
                    <div style={{ background: 'var(--primary)', color: 'white', padding: '2.5rem', borderRadius: '30px', marginTop: '2rem' }}>
                         <h3 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '1.5rem', color: 'var(--accent-saffron)' }}>Direct Channel</h3>
                         <p style={{ fontSize: '0.9rem', opacity: 0.7, lineHeight: '1.6', marginBottom: '3rem' }}>Need to add more details? Use the official communication channel by contacting the assigned state officer.</p>
                         <button className="btn btn-primary" style={{ width: '100%', padding: '1.1rem', fontSize: '0.9rem' }}>Secure Message Link</button>
                    </div>
                </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .status-badge-lg {
            padding: 0.75rem 1.5rem;
            border-radius: 50px;
            font-size: 0.95rem;
            font-weight: 900;
            text-transform: uppercase;
            letter-spacing: 2px;
            display: inline-block;
        }
        .status-badge-lg.pending { background: #fef3c7; color: #92400e; box-shadow: 0 10px 15px -5px rgba(245, 158, 11, 0.2); }
        .status-badge-lg.in-progress { background: #dbeafe; color: #1e40af; box-shadow: 0 10px 15px -5px rgba(37, 99, 235, 0.2); }
        .status-badge-lg.resolved { background: #d1fae5; color: #065f46; box-shadow: 0 10px 15px -5px rgba(16, 185, 129, 0.2); }
      `}</style>
    </div>
  );
};

export default TrackComplaint;
