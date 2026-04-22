import React from 'react';
import { ShieldCheck, ArrowRight, CheckCircle, Clock, MapPin, Search, PlusCircle, AlertCircle, FileText, BarChart, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const categories = [
        { name: 'Water Supply', icon: '💧', color: 'rgba(37, 99, 235, 0.1)', count: 120 },
        { name: 'Electricity', icon: '⚡', color: 'rgba(245, 158, 11, 0.1)', count: 85 },
        { name: 'Road Maintenance', icon: '🛣️', color: 'rgba(74, 85, 104, 0.1)', count: 450 },
        { name: 'Sanitation', icon: '🗑️', color: 'rgba(16, 185, 129, 0.1)', count: 320 },
        { name: 'Public Safety', icon: '👮', color: 'rgba(220, 38, 38, 0.1)', count: 180 },
        { name: 'Transport', icon: '🚌', color: 'rgba(139, 92, 246, 0.1)', count: 65 },
        { name: 'Healthcare', icon: '🏥', color: 'rgba(236, 72, 153, 0.1)', count: 110 },
        { name: 'Others', icon: '📂', color: 'rgba(107, 114, 128, 0.1)', count: 50 },
    ];

    const stats = [
        { label: 'Total Complaints', value: '1,245', icon: <PlusCircle size={28} style={{ color: 'var(--accent)' }}/>, change: '+12% this month' },
        { label: 'Resolved Issues', value: '890', icon: <CheckCircle size={28} style={{ color: 'var(--accent-green)' }}/>, change: '92% Satisfaction' },
        { label: 'Processing', value: '310', icon: <Clock size={28} style={{ color: 'var(--accent-saffron)' }}/>, change: 'Avg 3 days turnaround' },
        { label: 'Active Tasks', value: '45', icon: <AlertCircle size={28} style={{ color: '#ef4444' }}/>, change: 'Urgent response' },
    ];

    return (
        <div className="home-advanced animate-up">
            {/* HERO SECTION */}
            <section className="hero-advanced" style={{ 
                backgroundImage: 'url("/hero-bg.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center 30%', 
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                paddingTop: '12rem',
                paddingBottom: '10rem'
            }}>
                {/* Dark Overlay for readability */}
                <div style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    background: 'linear-gradient(to bottom, rgba(255,255,255,0.7), rgba(248, 250, 252, 1))',
                    zIndex: 0 
                }}></div>

                <div className="hero-shapes">
                    <div className="shape-1"></div>
                    <div className="shape-2"></div>
                </div>
                
                <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1.25rem', background: 'rgba(37, 99, 235, 0.08)', borderRadius: '30px', color: 'var(--accent)', fontWeight: '700', fontSize: '0.85rem', marginBottom: '2.5rem', border: '1px solid rgba(37, 99, 235, 0.15)', textTransform: 'uppercase', letterSpacing: '1px', backdropFilter: 'blur(5px)' }}>
                        <ShieldCheck size={18} /> Official JanSewa Tracking Desk
                    </div>
                    
                    <h1 style={{ fontSize: '4.8rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: '1', textShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                        Empowering Bharat Through <br /> <span className="text-gradient">JanSewa Digitalization</span>
                    </h1>
                    
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '3.5rem', maxWidth: '800px', margin: '0 auto 3.5rem auto', lineHeight: '1.7' }}>
                        Report public issues, track resolution timelines, and connect with government departments in real-time. Transparent, accountable, and citizen-first.
                    </p>
                    
                    <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                        <Link to="/submit-complaint" className="btn btn-primary animate-float" style={{ padding: '1.1rem 2.8rem', fontSize: '1.1rem', borderRadius: '50px' }}>
                            File a Grievance <ArrowRight size={20} />
                        </Link>
                        <Link to="/track-complaint" className="btn btn-secondary glass-panel" style={{ padding: '1.1rem 2.8rem', fontSize: '1.1rem', borderRadius: '50px', background: 'var(--primary)', color: 'white' }}>
                            Track Status <Search size={20} />
                        </Link>
                    </div>

                    {/* Quick Stats Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem', marginTop: '6rem' }} className="stats-grid">
                        {stats.map((stat, i) => (
                            <div key={i} className="glass-card" style={{ textAlign: 'left', padding: '2rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                    {stat.icon}
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.05)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>LIVE</span>
                                </div>
                                <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.25rem', color: 'var(--primary)' }}>{stat.value}</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '600', marginBottom: '1rem' }}>{stat.label}</p>
                                <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 'bold', borderTop: '1px solid #f1f5f9', paddingTop: '0.75rem' }}>
                                    {stat.change}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SERVICES CATEGORIES */}
            <section style={{ padding: '8rem 0', background: 'white' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5rem' }}>
                        <div style={{ maxWidth: '600px' }}>
                            <div style={{ color: 'var(--accent)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', marginBottom: '1rem' }}>Sectors & Departments</div>
                            <h2 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--primary)' }}>Select Category for Registration</h2>
                        </div>
                        <Link to="/services" style={{ color: 'var(--accent)', fontWeight: '700', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                             View All Services <ExternalLink size={18} />
                        </Link>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                        {categories.map((cat, i) => (
                            <div key={i} className="glass-card" style={{ textAlign: 'center', padding: '3.5rem 2rem', cursor: 'pointer', background: 'var(--bg-main)' }}>
                                <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: cat.color, width: '100px', height: '100px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>{cat.icon}</div>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.75rem', color: 'var(--primary)' }}>{cat.name}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>Access departmental grievance support and tracking portals.</p>
                                <div style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px' }}>{cat.count} Issues Active</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS VIDEO/STORY SECTION */}
            <section style={{ padding: '8rem 0', background: 'var(--primary)', color: 'white', position: 'relative' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
                         <div>
                             <h2 style={{ fontSize: '3.5rem', fontWeight: '900', color: 'white', marginBottom: '2rem' }}>State-of-the-Art <br /> Grievance System</h2>
                             <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', marginBottom: '3rem', lineHeight: '1.8' }}>
                                 Our portal utilizes AI-driven routing to ensure your concerns reach the correct department officer within minutes of submission. Track your complaint status transparently at every stage.
                             </p>
                             
                             <div style={{ display: 'grid', gap: '2rem' }}>
                                 <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                     <div style={{ background: 'var(--accent)', padding: '1rem', borderRadius: '15px' }}><FileText size={24} /></div>
                                     <div>
                                         <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Transparent Filing</h4>
                                         <p style={{ opacity: 0.6 }}>Every submission is logged with a permanent digital signature.</p>
                                     </div>
                                 </div>
                                 <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                     <div style={{ background: 'var(--accent-saffron)', padding: '1rem', borderRadius: '15px' }}><BarChart size={24} /></div>
                                     <div>
                                         <h4 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>Real-time Analytics</h4>
                                         <p style={{ opacity: 0.6 }}>Monitor department response times and performance benchmarks.</p>
                                     </div>
                                 </div>
                             </div>
                         </div>
                         <div className="glass-panel" style={{ borderRadius: '30px', padding: '1.5rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
                             <div style={{ background: 'var(--primary-light)', borderRadius: '25px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                                 <div style={{ textAlign: 'center' }}>
                                     <div style={{ width: '80px', height: '80px', background: 'var(--accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                                         <div style={{ width: 0, height: 0, borderTop: '12px solid transparent', borderBottom: '12px solid transparent', borderLeft: '20px solid white', marginLeft: '5px' }}></div>
                                     </div>
                                     <h3 style={{ color: 'white' }}>How We Solve Your Issues</h3>
                                     <p style={{ opacity: 0.5 }}>Official 2026 Process Video</p>
                                 </div>
                             </div>
                         </div>
                    </div>
                </div>
            </section>
            
            <style>{`
                @media (max-width: 1100px) {
                    .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
                    .heading-xl { font-size: 3rem !important; }
                }
                @media (max-width: 600px) {
                    .stats-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
};

export default Home;
