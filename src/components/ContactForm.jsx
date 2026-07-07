import React, { useState, useEffect } from 'react';
import './ContactForm.css'; // সিএসএস ফাইল ইম্পোর্ট করা হলো

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const [greetingIndex, setGreetingIndex] = useState(0);
  const greetings = [
    "✨ Let's build something epic together!",
    " Got a brilliant idea? Drop it below!",
    " Open for software & contest collaborations.",
    " Say hello! Let's connect right now."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((prevIndex) => (prevIndex + 1) % greetings.length);
    }, 5000); 
    return () => clearInterval(interval);
  }, [greetings.length]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    
    if (!name || !email || !subject || !message) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    
    try {
      const response = await fetch('https://formspree.io/f/mlgykjnr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name, email, subject, message, to: "sakibshourov001@gmail.com" })
      });
      if (response.ok) {
        setLoading(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error();
      }
    } catch (err) {
      setLoading(false);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <section className="contact-section modern-theme" id="contact">
      {/* Background Glowing Neon Orbs */}
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>
      
      {/* FLOATING LOGO 1: Left Background (Fixed syntax closing tag) */}
      <div className="bg-floating-logo bg-logo-left">
        <span>{"<S/>"}</span>
      </div>

      {/* FLOATING LOGO 2: Right Background (Fixed curly braces parsing error) */}
      <div className="bg-floating-logo bg-logo-right">
        <span>{"{ }"}</span>
      </div>

      <div className="contact-main-wrapper">
        <div className="contact-header">
          <h2 className="section-title">Get In Touch</h2>
          
          {/* FLOATING WELCOME MESSAGE IN GLASS TRANSPARENT CARD */}
          <div className="welcome-glass-card">
            <p className="dynamic-greeting">{greetings[greetingIndex]}</p>
          </div>
        </div>

        <div className="contact-grid-container">
          
          {/* Contact Info Card */}
          <div className="contact-info glass-morphism">
            
            {/* FLOATING GMAIL CARD */}
            <div className="floating-card gmail-float">
              <div className="floating-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gmail">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div className="floating-text">
                <span className="float-tag">Gmail Verified</span>
                <span className="float-status">Online</span>
              </div>
            </div>

            <h3 className="card-title">Contact Information</h3>
            <p className="info-desc">
              I am open to software development opportunities, algorithm consulting, and collaborative hackathons. 
            </p>

            <div className="info-details">
              <div className="glass-item">
                <div className="icon-box icon-teal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                </div>
                <div className="info-text">
                  <span className="info-label">Direct Mail</span>
                  <a href="mailto:sakibshourov001@gmail.com" className="info-value">sakibshourov001@gmail.com</a>
                </div>
              </div>

              <div className="glass-item">
                <div className="icon-box icon-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                </div>
                <div className="info-text">
                  <span className="info-label">Call Me</span>
                  <a href="tel:+8801307638741" className="info-value">+880 1307-638741</a>
                </div>
              </div>

              <div className="glass-item">
                <div className="icon-box icon-emerald">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div className="info-text">
                  <span className="info-label">Base Location</span>
                  <span className="info-value">Dhaka, Bangladesh</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form Block Wrapper */}
          <div className="contact-form-wrapper glass-morphism">
            <h3 className="card-title">Send a Message</h3>
            
            {submitted ? (
              <div className="submit-success">
                <h4>Message Sent!</h4>
                <p>Thank you, Sakib. I'll get back to you shortly.</p>
                <button onClick={() => setSubmitted(false)} className="form-submit-btn">Send Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form-layout">
                {error && <div className="form-error">{error}</div>}
                
                <div className="form-group">
                  <label className="modern-label">Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className="modern-input" />
                </div>

                <div className="form-group">
                  <label className="modern-label">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="modern-input" />
                </div>

                <div className="form-group">
                  <label className="modern-label">Subject</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Project Inquiry" className="modern-input" />
                </div>

                <div className="form-group">
                  <label className="modern-label">Message</label>
                  <textarea name="message" rows="4" value={formData.message} onChange={handleChange} placeholder="Describe your project..." className="modern-input"></textarea>
                </div>

                {/* EXACT DEAD CENTER FIXED BUTTON */}
                <div className="form-actions-absolute-center">
                  <button type="submit" className="form-submit-btn" disabled={loading}>
                    {loading ? <span>Sending...</span> : <span>Send Message</span>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}