import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  ShieldCheck, FileText, Clock, CheckCircle, 
  Settings, UserCheck, AlertTriangle, Search, 
  BarChart2, MoreVertical, LogOut, LayoutGrid, 
  Table, Filter, Download, ArrowRight, Bell
} from 'lucide-react';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:5000/api/complaints/all', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setComplaints(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    const filtered = complaints.filter(c => {
        const matchFilter = filter === 'All' || c.status === filter;
        const matchSearch = c.trackingId.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.citizen?.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchFilter && matchSearch;
    });

    const stats = {
        total: complaints.length,
        pending: complaints.filter(c => c.status === 'Pending').length,
        resolved: complaints.filter(c => c.status === 'Resolved').length,
        unassigned: complaints.filter(c => !c.assignedTo).length,
    };

    if (loading) return (
        <div style={{ padding: '5rem', textAlign: 'center' }}>
            <Loader className="animate-spin" size={48} color="var(--accent)" />
            <p style={{ marginTop: '1rem', fontWeight: '800' }}>Accessing Central Database...</p>
        </div>
    );

    return (
        <div className="dashboard-layout animate-up" style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '280px 1fr', background: '#f8fafc' }}>
            {/* Admin Sidebar */}
            <aside style={{ background: 'var(--primary)', color: 'white', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh' }}>
                <div style={{ marginBottom: '3.5rem' }}>
                    <div style={{ color: 'var(--accent)', fontWeight: '900', fontSize: '1.4rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ background: 'white', padding: '0.4rem', borderRadius: '8px' }}><ShieldCheck size={20} color="var(--accent)" /></div>
                        CENTRAL ADMIN
                    </div>
                </div>

                <nav style={{ flex: 1, display: 'grid', gap: '0.5rem' }}>
                    <button className="sidebar-link active"><LayoutGrid size={20} /> Dashboard Home</button>
                    <button className="sidebar-link"><FileText size={20} /> All Petitions</button>
                    <button className="sidebar-link"><UserCheck size={20} /> Officer Personnel</button>
                    <button className="sidebar-link"><BarChart2 size={20} /> Regional Insights</button>
                    <button className="sidebar-link"><Settings size={20} /> Portal Settings</button>
                </nav>

                <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', padding: '0 0.5rem' }}>
                        <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><ShieldCheck size={20} color="var(--accent-saffron)" /></div>
                        <div>
                            <div style={{ fontWeight: '700', fontSize: '0.9rem' }}>{user?.name.split(' ')[0]}</div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>Chief Administrator</div>
                        </div>
                    </div>
                    <button onClick={() => logout()} className="sidebar-btn-logout">
                        <LogOut size={18} /> Official Exit
                    </button>
                </div>
            </aside>

            {/* Admin Content */}
            <main style={{ padding: '3.5rem 4rem' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                             <AlertTriangle size={20} />
                             <span style={{ fontWeight: '800', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>National Monitoring Interface</span>
                        </div>
                        <h1 style={{ fontSize: '2.8rem', fontWeight: '900', color: 'var(--primary)', letterSpacing: '-0.02em', lineHeight: '1.1' }}>Governance Overview</h1>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <div style={{ position: 'relative', width: '350px' }}>
                             <Search style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4 }} size={20} />
                             <input 
                                type="text" 
                                className="modern-input" 
                                placeholder="Search by Tracking ID, Title or Citizen..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{ paddingLeft: '3.5rem', boxShadow: 'var(--shadow-md)', border: 'none' }}
                             />
                        </div>
                        <div style={{ background: 'white', padding: '0.8rem', borderRadius: '15px', color: 'var(--primary)', border: '1px solid #eef2f6', position: 'relative', cursor: 'pointer' }}>
                             <Bell size={24} />
                             <span style={{ position: 'absolute', top: '10px', right: '10px', width: '10px', height: '10px', background: '#e53e3e', border: '2px solid white', borderRadius: '50%' }}></span>
                        </div>
                    </div>
                </header>

                {/* KPI Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
                    <div className="admin-stat-card">
                        <div style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent)', width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}><FileText size={28} /></div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900' }}>{stats.total}</h2>
                        <p style={{ fontWeight: '700', opacity: 0.5, fontSize: '0.85rem' }}>TOTAL GRIEVANCES</p>
                    </div>
                    <div className="admin-stat-card">
                        <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent-saffron)', width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}><Clock size={28} /></div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900' }}>{stats.pending}</h2>
                        <p style={{ fontWeight: '700', opacity: 0.5, fontSize: '0.85rem' }}>PENDING REVIEW</p>
                    </div>
                    <div className="admin-stat-card">
                        <div style={{ background: 'rgba(220, 38, 38, 0.1)', color: '#ef4444', width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}><AlertTriangle size={28} /></div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900' }}>{stats.unassigned}</h2>
                        <p style={{ fontWeight: '700', opacity: 0.5, fontSize: '0.85rem' }}>UNALLOCATED CASES</p>
                    </div>
                    <div className="admin-stat-card">
                        <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-green)', width: '50px', height: '50px', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}><CheckCircle size={28} /></div>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '900' }}>{stats.resolved}</h2>
                        <p style={{ fontWeight: '700', opacity: 0.5, fontSize: '0.85rem' }}>SUCCESSFUL CLOSURES</p>
                    </div>
                </div>

                {/* Main Records Table */}
                <div style={{ background: 'white', borderRadius: '30px', padding: '3rem', boxShadow: '0 30px 60px -25px rgba(0,0,0,0.1)', border: '1px solid #eef2f6' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                         <h3 style={{ fontSize: '1.6rem', fontWeight: '900' }}>Grievance Dossier</h3>
                         <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ display: 'flex', background: '#f1f5f9', padding: '0.4rem', borderRadius: '12px' }}>
                                <button onClick={() => setFilter('All')} className={`tab-btn-modern ${filter === 'All' ? 'active' : ''}`}>All</button>
                                <button onClick={() => setFilter('Pending')} className={`tab-btn-modern ${filter === 'Pending' ? 'active' : ''}`}>Pending</button>
                                <button onClick={() => setFilter('In Progress')} className={`tab-btn-modern ${filter === 'In Progress' ? 'active' : ''}`}>Review</button>
                                <button onClick={() => setFilter('Resolved')} className={`tab-btn-modern ${filter === 'Resolved' ? 'active' : ''}`}>Resolved</button>
                            </div>
                            <button className="btn btn-outline" style={{ borderRadius: '12px', padding: '0.6rem 1.25rem' }}><Download size={18} /> Export</button>
                         </div>
                     </div>

                     <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 0.75rem' }}>
                         <thead>
                             <tr style={{ textAlign: 'left', color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                 <th style={{ padding: '0 1.5rem 1rem 1.5rem' }}>ID & Title</th>
                                 <th style={{ padding: '0 1.5rem 1rem 1.5rem' }}>Citizen Details</th>
                                 <th style={{ padding: '0 1.5rem 1rem 1.5rem' }}>Assigned To</th>
                                 <th style={{ padding: '0 1.5rem 1rem 1.5rem' }}>Current Status</th>
                                 <th style={{ padding: '0 1.5rem 1rem 1.5rem', textAlign: 'right' }}>Actions</th>
                             </tr>
                         </thead>
                         <tbody>
                             {filtered.map((c, i) => (
                                 <tr key={i} className="record-row" style={{ background: '#f8fafc', borderRadius: '20px' }}>
                                     <td style={{ padding: '1.75rem 1.5rem', borderTopLeftRadius: '20px', borderBottomLeftRadius: '20px' }}>
                                         <div style={{ fontSize: '0.75rem', fontWeight: '900', color: 'var(--accent)', marginBottom: '0.4rem' }}>ID: {c.trackingId}</div>
                                         <div style={{ fontWeight: '800', fontSize: '1.05rem', color: 'var(--primary)' }}>{c.title}</div>
                                     </td>
                                     <td style={{ padding: '1.75rem 1.5rem' }}>
                                         <div style={{ fontWeight: '700' }}>{c.citizen?.name}</div>
                                         <div style={{ fontSize: '0.85rem', opacity: 0.6 }}>{c.citizen?.email}</div>
                                     </td>
                                     <td style={{ padding: '1.75rem 1.5rem' }}>
                                         {c.assignedTo ? (
                                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                   <div style={{ background: 'var(--accent)', width: '32px', height: '32px', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>{c.assignedTo.name.charAt(0)}</div>
                                                   <span style={{ fontWeight: '700' }}>{c.assignedTo.name}</span>
                                              </div>
                                         ) : (
                                              <span style={{ background: '#fef2f2', color: '#dc2626', fontSize: '12px', fontWeight: '900', padding: '0.25rem 0.75rem', borderRadius: '30px' }}>UNALLOCATED</span>
                                         )}
                                     </td>
                                     <td style={{ padding: '1.75rem 1.5rem' }}>
                                         <span className={`status-badge-modern ${c.status.toLowerCase().replace(' ', '-')}`}>
                                             {c.status}
                                         </span>
                                     </td>
                                     <td style={{ padding: '1.75rem 1.5rem', borderTopRightRadius: '20px', borderBottomRightRadius: '20px', textAlign: 'right' }}>
                                         <button className="icon-btn-advanced"><MoreVertical size={20} /></button>
                                     </td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                     
                     {filtered.length === 0 && (
                         <div style={{ textAlign: 'center', padding: '6rem', opacity: 0.4 }}>
                              <Search size={64} style={{ marginBottom: '1.5rem' }} />
                              <h3 style={{ fontSize: '1.5rem', fontWeight: '900' }}>No Corresponding Records Found</h3>
                              <p>Adjust your filters or search criteria to locate specific petitions.</p>
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
                .sidebar-link.active { background: var(--accent); color: white; box-shadow: 0 10px 15px -10px rgba(37, 99, 235, 0.5); }
                .sidebar-btn-logout { width: 100%; padding: 1rem; background: #dc2626; color: white; border: none; border-radius: 12px; font-weight: 800; display: flex; align-items: center; justify-content: center; gap: 0.75rem; cursor: pointer; transition: all 0.2s ease; }
                .admin-stat-card { background: white; padding: 2.5rem 2rem; border-radius: 25px; border: 1px solid #eef2f6; transition: all 0.3s ease; }
                .admin-stat-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-xl); }
                .tab-btn-modern { background: none; border: none; padding: 0.6rem 1.25rem; font-weight: 800; font-size: 0.85rem; color: var(--text-muted); cursor: pointer; border-radius: 10px; transition: all 0.2s ease; }
                .tab-btn-modern.active { background: white; color: var(--primary); box-shadow: var(--shadow-sm); }
                .record-row:hover { background: #f1f5f9 !important; transform: scale(1.01); transition: all 0.2s ease; }
                .status-badge-modern { padding: 0.4rem 0.9rem; border-radius: 30px; font-size: 11px; font-weight: 900; text-transform: uppercase; letter-spacing: 1.5px; }
                .status-badge-modern.pending { background: #fef3c7; color: #92400e; }
                .status-badge-modern.in-progress { background: #dbeafe; color: #1e40af; }
                .status-badge-modern.resolved { background: #d1fae5; color: #065f46; }
                .icon-btn-advanced { background: none; border: none; color: var(--text-muted); cursor: pointer; padding: 0.5rem; border-radius: 50%; }
                .icon-btn-advanced:hover { background: #e2e8f0; color: var(--primary); }
            `}</style>
        </div>
    );
};

export default AdminDashboard;
