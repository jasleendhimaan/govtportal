import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  ShieldCheck, FileText, Clock, CheckCircle, 
  Settings, User, MapPin, Tag, Calendar, 
  MessageSquare, ChevronRight, LogOut, LayoutGrid, 
  Briefcase, Send, AlertTriangle, X, Loader
} from 'lucide-react';

const OfficerDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [statusUpdate, setStatusUpdate] = useState('');
    const [remarks, setRemarks] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const fetchQueue = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await axios.get('http://localhost:5000/api/complaints/all', {
                headers: { Authorization: `Bearer ${token}` }
            });
            // Filter only assigned to this officer
            setComplaints(res.data.filter(c => c.assignedTo?._id === user.id));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { if (user) fetchQueue(); }, [user]);

    const handleUpdate = async (e) => {
        if (!selected) return;
        e.preventDefault();
        setIsUpdating(true);
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:5000/api/complaints/status/${selected._id}`, 
                { status: statusUpdate, remarks },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            fetchQueue();
            setSelected(null);
            setStatusUpdate('');
            setRemarks('');
        } catch (err) { console.error(err); }
        finally { setIsUpdating(false); }
    };

    if (loading) return (
        <div style={{ padding: '5rem', textAlign: 'center' }}>
            <Briefcase className="animate-spin" size={48} color="var(--accent)" />
            <p style={{ marginTop: '1rem', fontWeight: '800' }}>Accessing Duty Desk...</p>
        </div>
    );

    return (
        <div className="dashboard-layout animate-up" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '280px 1fr', background: '#f8fafc' }}>
            {/* Officer Sidebar */}
            <aside style={{ background: 'var(--primary)', color: 'white', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }}>
                <div style={{ marginBottom: '3.5rem' }}>
                    <div style={{ color: 'var(--accent-saffron)', fontWeight: '900', fontSize: '1.4rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ background: 'white', padding: '0.4rem', borderRadius: '8px' }}><ShieldCheck size={20} color="var(--accent-saffron)" /></div>
                        DUTY DESK
                    </div>
                </div>

                <nav style={{ flex: 1, display: 'grid', gap: '0.5rem' }}>
                    <button className="sidebar-link active"><LayoutGrid size={20} /> Assigned Queue</button>
                    <button className="sidebar-link"><FileText size={20} /> Resolution History</button>
                    <button className="sidebar-link"><MessageSquare size={20} /> Field Comms</button>
                    <button className="sidebar-link"><Settings size={20} /> Officer Console</button>
                </nav>

                <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', padding: '0 0.5rem' }}>
                        <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={20} /></div>
                        <div>
                            <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{user?.name.split(' ')[0]}</div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>{user?.department} Dept Officer</div>
                        </div>
                    </div>
                    <button onClick={() => logout()} className="sidebar-btn-logout">
                        <LogOut size={18} /> Official Exit
                    </button>
                </div>
            </aside>

            {/* Officer Content Area */}
            <main style={{ padding: '3.5rem 4rem' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--accent-saffron)', marginBottom: '0.5rem' }}>
                             <Clock size={20} />
                             <span style={{ fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Department of {user?.department}</span>
                        </div>
                        <h1 style={{ fontSize: '2.8rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '-0.02em', lineHeight: '1.1' }}>Case Queue</h1>
                    </div>
                    <div className="glass-panel" style={{ padding: '0.75rem 1.5rem', borderRadius: '15px', color: 'var(--primary)', fontWeight: '800', fontSize: '0.9rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                         <div style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%' }}></div>
                         Active Duty Session
                    </div>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    {/* List View */}
                    <div style={{ background: 'white', borderRadius: '30px', padding: '2.5rem', border: '1px solid #eef2f6', boxShadow: 'var(--shadow-lg)' }}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                             <h3 style={{ fontSize: '1.6rem', fontWeight: '900' }}>Active Assignments ({complaints.length})</h3>
                         </div>
                         
                         {complaints.length === 0 ? (
                             <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.4 }}>
                                  <Briefcase size={64} style={{ marginBottom: '1.5rem' }} />
                                  <h3 style={{ fontSize: '1.5rem', fontWeight: '900' }}>Queue is Clear</h3>
                                  <p>All assigned grievances have been processed.</p>
                             </div>
                         ) : (
                             <div style={{ display: 'grid', gap: '1rem' }}>
                                 {complaints.map((c, i) => (
                                     <div key={i} onClick={() => { setSelected(c); setStatusUpdate(c.status); }} className={`officer-card ${selected?._id === c._id ? 'active' : ''}`}>
                                          <div style={{ flex: 1 }}>
                                               <div style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--accent)', marginBottom: '0.4rem' }}>{c.trackingId}</div>
                                               <h4 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--primary)' }}>{c.title}</h4>
                                               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700' }}><MapPin size={14} /> {c.location}</div>
                                                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '700' }}><Calendar size={14} /> {new Date(c.createdAt).toLocaleDateString()}</div>
                                               </div>
                                          </div>
                                          <div style={{ textAlign: 'right' }}>
                                              <span className={`status-badge-modern ${c.status.toLowerCase().replace(' ', '-')}`}>{c.status}</span>
                                              <div style={{ marginTop: '0.75rem', color: 'var(--accent)' }}><ChevronRight size={20} /></div>
                                          </div>
                                     </div>
                                 ))}
                             </div>
                         )}
                    </div>

                    {/* Detail / Action View */}
                    <div style={{ position: 'sticky', top: '120px' }}>
                        {selected ? (
                            <div className="glass-panel animate-up" style={{ padding: '3.5rem', background: 'white', borderRadius: '35px', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.1)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                                     <h3 style={{ fontSize: '1.8rem', fontWeight: '900' }}>Officer Action</h3>
                                     <button onClick={() => setSelected(null)} className="icon-btn-advanced"><X size={24} /></button>
                                </div>

                                <div style={{ marginBottom: '3rem' }}>
                                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                         <h4 style={{ fontWeight: '800', color: 'var(--primary)' }}>Petition Documentation</h4>
                                         <span style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--accent)' }}>REF: {selected.trackingId}</span>
                                     </div>
                                     <p style={{ fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-main)', opacity: 0.8, background: '#f8fafc', padding: '1.5rem', borderRadius: '15px', border: '1px solid #eef2f6' }}>
                                         {selected.description}
                                     </p>
                                </div>

                                <form onSubmit={handleUpdate} style={{ display: 'grid', gap: '1.5rem' }}>
                                     <div className="input-group">
                                         <label className="label">Disposition Status</label>
                                         <div style={{ position: 'relative' }}>
                                              <Tag style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} size={18} />
                                              <select className="modern-input" value={statusUpdate} onChange={(e) => setStatusUpdate(e.target.value)} style={{ paddingLeft: '3rem' }}>
                                                   <option value="Pending">Remains Pending</option>
                                                   <option value="In Progress">Move to Review / In-Progress</option>
                                                   <option value="Resolved">Grievance Resolved</option>
                                              </select>
                                         </div>
                                     </div>

                                     <div className="input-group">
                                         <label className="label">Official Remarks for Citizen Portfolio</label>
                                         <textarea className="modern-input" value={remarks} onChange={(e) => setRemarks(e.target.value)} placeholder="Provide specific details of action taken..." style={{ height: '140px', lineHeight: '1.6', resize: 'none' }}></textarea>
                                     </div>

                                     <button type="submit" disabled={isUpdating} className="btn btn-primary" style={{ width: '100%', padding: '1.1rem', fontSize: '1.1rem', borderRadius: '15px' }}>
                                          {isUpdating ? <Loader className="animate-spin" /> : <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Send size={20} /> Update Official Status</div>}
                                     </button>
                                </form>
                            </div>
                        ) : (
                            <div className="glass-panel" style={{ height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem', textAlign: 'center', borderRadius: '35px', border: '2px dashed #e2e8f0', background: 'rgba(255,255,255,0.5)' }}>
                                 <div>
                                     <div className="animate-float" style={{ color: '#cbd5e1', marginBottom: '2rem' }}><Briefcase size={64} /></div>
                                     <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#94a3b8', marginBottom: '1rem' }}>No Selection Made</h3>
                                     <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Select a petition from your active queue <br /> to manage its resolution process.</p>
                                 </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <style>{`
                .sidebar-link {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1.1rem 1.25rem;
                    color: rgba(255,255,255,0.6);
                    text-decoration: none;
                    background: none;
                    border: none;
                    width: 100%;
                    text-align: left;
                    font-weight: 600;
                    border-radius: 12px;
                    transition: all 0.2s ease;
                    font-size: 0.95rem;
                    cursor: pointer;
                }
                .sidebar-link:hover { background: rgba(255,255,255,0.05); color: white; }
                .sidebar-link.active { background: var(--accent-saffron); color: var(--primary); font-weight: 800; box-shadow: 0 10px 15px -10px rgba(245, 158, 11, 0.5); }
                .sidebar-btn-logout { width: 100%; padding: 1rem; background: #dc2626; color: white; border: none; border-radius: 12px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 0.75rem; cursor: pointer; transition: all 0.2s ease; }
                .officer-card {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.5rem 2rem;
                    background: #f8fafc;
                    border-radius: 20px;
                    border: 1px solid #eef2f6;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .officer-card:hover { transform: translateX(5px); background: #f1f5f9; border-color: var(--accent-saffron); }
                .officer-card.active { background: white; border: 2px solid var(--accent-saffron); box-shadow: 0 15px 30px -15px rgba(245, 158, 11, 0.25); }
                .status-badge-modern { padding: 0.35rem 0.75rem; border-radius: 30px; font-size: 10px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.2px; display: inline-block; }
                .status-badge-modern.pending { background: #fef3c7; color: #92400e; }
                .status-badge-modern.in-progress { background: #dbeafe; color: #1e40af; }
                .status-badge-modern.resolved { background: #d1fae5; color: #065f46; }
                .icon-btn-advanced { background: none; border: none; color: var(--text-muted); cursor: pointer; padding: 0.5rem; border-radius: 50%; }
                .icon-btn-advanced:hover { background: #f1f5f9; color: var(--primary); }
                .animate-spin { animation: spin 1s linear infinite; }
            `}</style>
        </div>
    );
};

export default OfficerDashboard;
