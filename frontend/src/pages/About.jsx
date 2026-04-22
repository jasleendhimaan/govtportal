import React from 'react';
import { ShieldCheck, Users, Target, CheckCircle, ArrowRight, ShieldAlert, FileText, BarChart, ExternalLink, Activity, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="about-page animate-up" style={{ background: '#f8fafc', padding: '10rem 0 8rem 0' }}>
            <div className="container" style={{ maxWidth: '1100px' }}>
                
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.6rem 1.25rem', background: 'rgba(37, 99, 235, 0.08)', borderRadius: '30px', color: 'var(--accent)', fontWeight: '700', fontSize: '0.85rem', marginBottom: '2rem', border: '1px solid rgba(37, 99, 235, 0.15)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        <ShieldCheck size={18} /> Official Portal Monograph
                    </div>
                    <h1 style={{ fontSize: '4.5rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: '1.1' }}>
                        A New Era of <span className="text-gradient">Citizen Trust</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '750px', margin: '0 auto', lineHeight: '1.7', fontWeight: '500' }}>
                        Empowering the state's digital ecosystem by bridging the gap between citizen needs and departmental action. Our platform is a state-guaranteed mechanism for grievance redressal.
                    </p>
                </div>

                {/* Core Mission Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 450px', gap: '5rem', alignItems: 'center', marginBottom: '10rem' }}>
                    <div style={{ display: 'grid', gap: '2rem' }}>
                         <div className="glass-panel" style={{ padding: '3rem', background: 'white', borderRadius: '30px' }}>
                             <div style={{ background: 'rgba(37, 99, 235, 0.1)', color: 'var(--accent)', width: '60px', height: '60px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}><Target size={32} /></div>
                             <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1rem', color: 'var(--primary)' }}>Our Official Mandate</h3>
                             <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', opacity: 0.7, lineHeight: '1.8' }}>
                                 To provide a centralized, secure, and transparent digital infrastructure for all citizens to report issues related to public utilities and governance. We ensure every petition is tracked with a permanent digital signature.
                             </p>
                         </div>
                         <div className="glass-panel" style={{ padding: '3rem', background: 'white', borderRadius: '30px' }}>
                             <div style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--accent-saffron)', width: '60px', height: '60px', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}><Award size={32} /></div>
                             <h3 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1rem', color: 'var(--primary)' }}>State Guarantee</h3>
                             <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', opacity: 0.7, lineHeight: '1.8' }}>
                                 We are committed to a strict Service Level Agreement (SLA). Every grievance must be reviewed by a department officer within 72 hours of registration, with status updates logged in real-time.
                             </p>
                         </div>
                    </div>
                    <div style={{ position: 'relative' }}>
                         <div style={{ background: 'var(--primary)', borderRadius: '40px', height: '650px', padding: '3rem', display: 'flex', flexDirection: 'column', color: 'white', position: 'relative', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: -100, right: -100, width: '400px', height: '400px', background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }}></div>
                            
                            <h4 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '2.5rem', color: 'var(--accent-saffron)' }}>Portal Performance</h4>
                            <div style={{ display: 'grid', gap: '2.5rem' }}>
                                 <div>
                                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontWeight: '700' }}>
                                         <span>Resolution Rate</span>
                                         <span>94%</span>
                                     </div>
                                     <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                                         <div style={{ width: '94%', height: '100%', background: '#10b981' }}></div>
                                     </div>
                                 </div>
                                 <div>
                                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontWeight: '700' }}>
                                         <span>Citizen Satisfaction</span>
                                         <span>91%</span>
                                     </div>
                                     <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                                         <div style={{ width: '91%', height: '100%', background: 'var(--accent)' }}></div>
                                     </div>
                                 </div>
                                 <div>
                                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontWeight: '700' }}>
                                         <span>Dept Engagement</span>
                                         <span>100%</span>
                                     </div>
                                     <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', overflow: 'hidden' }}>
                                         <div style={{ width: '100%', height: '100%', background: 'var(--accent-saffron)' }}></div>
                                     </div>
                                 </div>
                            </div>
                            
                            <div style={{ marginTop: 'auto', background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '25px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                 <p style={{ fontSize: '0.9rem', opacity: 0.6, lineHeight: '1.6' }}>"The digital transformation of our grievance system is a testament to our commitment to a transparent and citizen-first state."</p>
                                 <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                      <div style={{ width: '45px', height: '45px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
                                      <div>
                                          <p style={{ fontWeight: '800', fontSize: '0.9rem' }}>Chief Secretary</p>
                                          <p style={{ fontSize: '0.75rem', opacity: 0.5 }}>State Governance Division</p>
                                      </div>
                                 </div>
                            </div>
                         </div>
                    </div>
                </div>

                {/* Values Section */}
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                     <h2 style={{ fontSize: '3rem', fontWeight: '900', color: 'var(--primary)', marginBottom: '5rem' }}>Our Governing Principles</h2>
                     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>
                          <div className="glass-card" style={{ padding: '3rem 2rem' }}>
                               <div style={{ color: 'var(--accent)', marginBottom: '1.5rem' }}><Activity size={40} /></div>
                               <h4 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '0.75rem' }}>Responsiveness</h4>
                               <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Rapid action within time-bound official benchmarks.</p>
                          </div>
                          <div className="glass-card" style={{ padding: '3rem 2rem' }}>
                               <div style={{ color: 'var(--accent-green)', marginBottom: '1.5rem' }}><ShieldCheck size={40} /></div>
                               <h4 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '0.75rem' }}>Transparency</h4>
                               <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Real-time visibility into the official review process.</p>
                          </div>
                          <div className="glass-card" style={{ padding: '3rem 2rem' }}>
                               <div style={{ color: 'var(--accent-saffron)', marginBottom: '1.5rem' }}><CheckCircle size={40} /></div>
                               <h4 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '0.75rem' }}>Accountability</h4>
                               <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Direct responsibility of the assigned department officer.</p>
                          </div>
                          <div className="glass-card" style={{ padding: '3rem 2rem' }}>
                               <div style={{ color: '#ef4444', marginBottom: '1.5rem' }}><Users size={40} /></div>
                               <h4 style={{ fontSize: '1.2rem', fontWeight: '900', marginBottom: '0.75rem' }}>Inclusivity</h4>
                               <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>Equal priority for all citizens across all state regions.</p>
                          </div>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default About;
