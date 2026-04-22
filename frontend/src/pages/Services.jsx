import React from 'react';
import { ShieldCheck, ArrowRight, ExternalLink, Activity, Award, Briefcase, FileText, Globe, Heart, LayoutGrid, MapPin, Search, Tag, User, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
    const services = [
        { 
          title: 'Public Grievance Registration', 
          description: 'Easily lodge complaints against various public utilities and departments with real-time tracking.',
          icon: <FileText size={32} />,
          color: 'var(--accent)'
        },
        { 
          title: 'Status Tracking (Live)', 
          description: 'Monitor the exact progress of your registered petition throughout the official review process.',
          icon: <Activity size={32} />,
          color: 'var(--accent-saffron)'
        },
        { 
          title: 'Departmental Access', 
          description: 'Connect directly with over 45 state departments according to the relevant subject area.',
          icon: <Globe size={32} />,
          color: 'var(--accent-green)'
        },
        { 
          title: 'Citizen Identity Desk', 
          description: 'Manage your official profile, verified data, and records under a single secure gateway.',
          icon: <User size={32} />,
          color: '#ef4444'
        },
        { 
          title: 'Responsive Redressal', 
          description: 'Time-bound response guarantees from the state government for all high-priority grievances.',
          icon: <Award size={32} />,
          color: '#8b5cf6'
        },
        { 
          title: 'Officer Connectivity', 
          description: 'Communicate directly with assigned state officers within the official dossier interface.',
          icon: <Users size={32} />,
          color: '#db2777'
        }
    ];

    const departments = [
        'Water Supply & Sewerage', 'Electricity & Power Distribution', 'Road Infrastructure', 
        'Sanitation & Waste Management', 'Public Safety & Security', 'Urban Transport', 
        'Public Health Services', 'School Education Board', 'Environmental Regulation'
    ];

    return (
        <div className="services-page animate-up" style={{ padding: '10rem 0 8rem 0', background: '#f8fafc' }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                
                {/* Header Section */}
                <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1.25rem', background: 'rgba(37, 99, 235, 0.08)', borderRadius: '30px', color: 'var(--accent)', fontWeight: '700', fontSize: '0.85rem', marginBottom: '2.5rem', border: '1px solid rgba(37, 99, 235, 0.15)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <ShieldCheck size={18} /> Official Service Directory 2026
                    </div>
                    <h1 style={{ fontSize: '4.5rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: '1.1' }}>
                        Comprehensive <span className="text-gradient">Citizen Solutions</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto', lineHeight: '1.7', fontWeight: '500' }}>
                        Access our full suite of digital governance tools. From grievance registration to legal tracking, our portal offers a streamlined interface for all your state interactions.
                    </p>
                </div>

                {/* Main Services Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '10rem' }}>
                    {services.map((s, i) => (
                        <div key={i} className="glass-card" style={{ padding: '4rem 3rem', background: 'white', display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
                             <div style={{ background: `${s.color}15`, color: s.color, width: '80px', height: '80px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem auto' }}>{s.icon}</div>
                             <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '1rem', color: 'var(--primary)' }}>{s.title}</h3>
                             <p style={{ opacity: 0.6, lineHeight: '1.8', marginBottom: '2.5rem', fontSize: '1.05rem' }}>{s.description}</p>
                             <div style={{ marginTop: 'auto' }}>
                                 <Link to={s.title.includes('Registration') ? '/submit-complaint' : s.title.includes('Tracking') ? '/track-complaint' : '/login'} className="btn btn-outline" style={{ borderRadius: '12px', fontSize: '0.9rem', width: '100%', fontWeight: '800' }}>
                                      Access Service <ArrowRight size={18} />
                                 </Link>
                             </div>
                        </div>
                    ))}
                </div>

                {/* Sub-Section Departments */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 450px', gap: '5rem', alignItems: 'center' }}>
                    <div>
                         <div style={{ color: 'var(--accent)', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', marginBottom: '1rem' }}>Sector Coverage</div>
                         <h2 style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '2.5rem', lineHeight: '1.2' }}>Integrated State <br /> Department Queue</h2>
                         <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '3.5rem' }}>
                              All state departments are officially integrated into the portal to ensure unified tracking and accountability. If you cannot find your specific department below, select "Other" during registration.
                         </p>
                         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                              {departments.map((dept, i) => (
                                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: '700', fontSize: '1rem', color: 'var(--primary)', opacity: i > 5 ? 0.4 : 1 }}>
                                       <div style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }}></div>
                                       {dept}
                                  </div>
                              ))}
                         </div>
                    </div>
                    <div style={{ background: 'var(--primary)', color: 'white', padding: '4rem', borderRadius: '40px', position: 'relative', overflow: 'hidden' }}>
                         <div style={{ position: 'absolute', top: -50, right: -50, width: '200px', height: '200px', background: 'rgba(37, 99, 235, 0.2)', borderRadius: '50%' }}></div>
                         <div style={{ position: 'relative', zIndex: 1 }}>
                             <ShieldCheck size={56} style={{ color: 'var(--accent-saffron)', marginBottom: '2rem' }} />
                             <h3 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '1.5rem', lineHeight: '1.2' }}>State Verification Protocol</h3>
                             <p style={{ opacity: 0.6, lineHeight: '1.8', marginBottom: '3rem' }}>
                                 All digital services on this portal are governed by the Official Electronic Governance Provision. Your data is encrypted and verification is mandatory for all high-value petitions.
                             </p>
                             <div style={{ display: 'grid', gap: '1.5rem' }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                       <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.6rem', borderRadius: '10px' }}><ShieldCheck size={20} /></div>
                                       <span style={{ fontWeight: '700' }}>256-bit Secure Layer</span>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                       <div style={{ background: 'rgba(255,255,255,0.1)', padding: '0.6rem', borderRadius: '10px' }}><LayoutGrid size={20} /></div>
                                       <span style={{ fontWeight: '700' }}>Unified Architecture</span>
                                  </div>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Services;
