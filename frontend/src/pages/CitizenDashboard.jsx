import { ShieldCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  FileText, PlusCircle, Search, Clock, CheckCircle, 
  AlertCircle, ChevronRight, User, Settings, LogOut, 
  MapPin, Calendar, Tag, MessageSquare, ArrowRight, Home
} from 'lucide-react';

const CitizenDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchComplaints = async () => {
            try {
                const token = localStorage.getItem('token'); 
                const res = await axios.get('/complaints/my', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setComplaints(res.data);
            } catch (err) {
                console.error('Error fetching complaints:', err);
            } finally {
                setLoading(false);
            }
        };
        if (user) fetchComplaints();
    }, [user]);

    const stats = {
        total: complaints.length,
        pending: complaints.filter(c => c.status === 'Pending').length,
        resolved: complaints.filter(c => c.status === 'Resolved').length,
        inProgress: complaints.filter(c => c.status === 'In Progress').length,
    };

    if (loading) return (
        <div style={{ padding: '5rem', textAlign: 'center' }}>
            <Clock className="animate-spin" size={48} color="var(--accent)" />
            <p style={{ marginTop: '1rem', fontWeight: '800' }}>Loading Official Portfolio...</p>
        </div>
    );

    return (
        <div className="dashboard-layout animate-up" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '280px 1fr', background: '#f1f5f9' }}>
            {/* Sidebar */}
            <aside style={{ background: 'var(--primary)', color: 'white', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ marginBottom: '3rem' }}>
                    <div style={{ color: 'var(--accent)', fontWeight: '900', fontSize: '1.4rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ background: 'white', padding: '0.4rem', borderRadius: '8px' }}><ShieldCheck size={20} color="var(--accent)" /></div>
                        Citizen Desks
                    </div>
                </div>

                <nav style={{ flex: 1, display: 'grid', gap: '0.5rem' }}>
                    <Link to="/citizen-dashboard" className="sidebar-link active">
                        <Home size={20} /> Dashboard Overview
                    </Link>
                    <Link to="/submit-complaint" className="sidebar-link">
                        <PlusCircle size={20} /> Register Grievance
                    </Link>
                    <Link to="/track-complaint" className="sidebar-link">
                        <Search size={20} /> Track Case Status
                    </Link>
                    <Link to="/contact" className="sidebar-link">
                        <MessageSquare size={20} /> Contact Support
                    </Link>
                </nav>

                <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', padding: '0 0.5rem' }}>
                        <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><User size={20} /></div>
                        <div>
                            <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{user?.name.split(' ')[0]}</div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>Official Citizen</div>
                        </div>
                    </div>
                    <button onClick={() => logout()} className="sidebar-btn-logout">
                        <LogOut size={18} /> Official Exit
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{ padding: '3rem 4rem' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '0.5rem' }}>Official Citizen Dashboard</h1>
                        <p style={{ color: 'var(--text-muted)', fontWeight: '600', fontSize: '1.1rem' }}>Welcome, <span style={{ color: 'var(--accent)' }}>{user?.name}</span>. Manage your digital state interactions.</p>
                    </div>
                    <Link to="/submit-complaint" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem', borderRadius: '50px' }}>
                        <PlusCircle size={20} /> New Grievance
                    </Link>
                </header>

                {/* Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3.5rem' }}>
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <div style={{ color: 'var(--accent)', marginBottom: '1rem' }}><FileText size={28} /></div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.25rem' }}>{stats.total}</h2>
                        <p style={{ fontWeight: '700', opacity: 0.6, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Filings</p>
                    </div>
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <div style={{ color: 'var(--accent-saffron)', marginBottom: '1rem' }}><Clock size={28} /></div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.25rem' }}>{stats.pending}</h2>
                        <p style={{ fontWeight: '700', opacity: 0.6, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Pending Action</p>
                    </div>
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <div style={{ color: 'var(--accent)', marginBottom: '1rem' }}><AlertCircle size={28} /></div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.25rem' }}>{stats.inProgress}</h2>
                        <p style={{ fontWeight: '700', opacity: 0.6, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>In Pipeline</p>
                    </div>
                    <div className="glass-card" style={{ padding: '2rem' }}>
                        <div style={{ color: 'var(--accent-green)', marginBottom: '1rem' }}><CheckCircle size={28} /></div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.25rem' }}>{stats.resolved}</h2>
                        <p style={{ fontWeight: '700', opacity: 0.6, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Resolved Cases</p>
                    </div>
                </div>

                {/* Recent Complaints */}
                <div style={{ background: 'white', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 20px 40px -20px rgba(0,0,0,0.1)', border: '1px solid #eef2f6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Your Case Portfolio</h3>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-saffron)' }}></div> Pending
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-green)' }}></div> Resolved
                            </div>
                        </div>
                    </div>

                    {complaints.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '4rem', background: '#f8fafc', borderRadius: '20px', border: '2px dashed #e2e8f0' }}>
                            <PlusCircle size={48} style={{ color: '#cbd5e1', marginBottom: '1.5rem' }} />
                            <h4 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.5rem' }}>No Active Petitions</h4>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>You have not registered any grievances yet. Your records will appear here.</p>
                            <Link to="/submit-complaint" className="btn btn-primary">File First Case</Link>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gap: '1rem' }}>
                            {complaints.map((c, i) => (
                                <div key={i} className="complaint-list-item">
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.75rem' }}>
                                            <span style={{ fontSize: '0.75rem', fontWeight: '900', background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent)', padding: '0.25rem 0.6rem', borderRadius: '5px' }}>{c.trackingId}</span>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600' }}><Tag size={14} /> {c.category}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: '600' }}><Calendar size={14} /> {new Date(c.createdAt).toLocaleDateString()}</div>
                                        </div>
                                        <h4 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--primary)' }}>{c.title}</h4>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' }}>
                                            <MapPin size={16} /> {c.location}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
                                        <span className={`status-badge ${c.status.toLowerCase().replace(' ', '-')}`}>
                                            {c.status}
                                        </span>
                                        <Link to={`/track-complaint`} state={{ trackingId: c.trackingId }} className="icon-btn-circle" title="View Progress">
                                            <ArrowRight size={22} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
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
                    font-weight: 600;
                    border-radius: 12px;
                    transition: all 0.2s ease;
                    font-size: 0.95rem;
                }
                .sidebar-link:hover {
                    background: rgba(255,255,255,0.05);
                    color: white;
                }
                .sidebar-link.active {
                    background: var(--accent);
                    color: white;
                    box-shadow: 0 10px 15px -10px rgba(37, 99, 235, 0.5);
                }
                .sidebar-btn-logout {
                    width: 100%;
                    padding: 1rem;
                    background: #dc2626;
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-weight: 800;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.75rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }
                .sidebar-btn-logout:hover {
                    background: #b91c1c;
                    transform: scale(0.98);
                }
                .complaint-list-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 1.75rem 2rem;
                    background: #f8fafc;
                    border: 1px solid #eef2f6;
                    border-radius: 20px;
                    transition: all 0.3s ease;
                }
                .complaint-list-item:hover {
                    background: white;
                    border-color: var(--accent);
                    transform: translateX(10px);
                    box-shadow: 10px 15px 30px -15px rgba(0,0,0,0.1);
                }
                .status-badge {
                    padding: 0.5rem 1rem;
                    border-radius: 50px;
                    font-size: 0.8rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .status-badge.pending { background: #fef3c7; color: #92400e; }
                .status-badge.in-progress { background: #dbeafe; color: #1e40af; }
                .status-badge.resolved { background: #d1fae5; color: #065f46; }
                .icon-btn-circle {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: white;
                    color: var(--accent);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px solid #e2e8f0;
                    transition: all 0.2s ease;
                }
                .icon-btn-circle:hover {
                    background: var(--accent);
                    color: white;
                    transform: rotate(-15deg);
                }
            `}</style>
        </div>
    );
};

export default CitizenDashboard;
