import React, { useState } from 'react';

export default function Testimonials() {
  const list = [
    {
      text: "Sakib’s sharp analytical skills completely turned around our database performance. He rewrote our legacy SQL queries and indexed the core tables, dropping API response times from 1.2 seconds down to under 200ms.",
      name: "ARM Abir Hassan",
      role: "Backend Engineer at TechNexus",
      avatar: "https://media.craiyon.com/2025-09-27/AY7rOZnYRLeWdVmhjchUxw.webp"
    },
    {
      text: "Sakib is an absolute powerhouse when it comes to frontend architecture. During our last major product overhaul, his expertise in React state management and component optimization saved us weeks of refactoring.",
      name: "Jihad Mia",
      role: "UI/UX Tech Lead",
      avatar: "https://avatarfiles.alphacoders.com/225/225869.png"
    },
    {
      text: "Working alongside Sakib during the national hackathon was a masterclass in clean coding. Under massive time pressure, he managed to write flawlessly documented, modular node services that didn't break once.",
      name: "Naimur Rahman",
      role: "Full Stack Developer & Collaborator",
      avatar: "https://img.magnific.com/premium-photo/cute-anime-boy-wallpaper_776894-110627.jpg?semt=ais_hybrid&w=740&q=80"
    },
    {
      text: "Sakib brings deep theoretical knowledge into practical engineering. He didn't just implement our machine learning pipelines; he optimized the underlying data structures to handle millions of streaming data points concurrently.",
      name: "Shihabur Rahman",
      role: "Data Platform Architect",
      avatar: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      text: "Sakib has a rare eye for both system security and scalability. He spearheaded the migration of our monolithic system into a microservices architecture on AWS, ensuring strict IAM compliance and flawless CI/CD automation.",
      name: "Jibon Ahamed",
      role: "DevOps Lead at CloudScale",
      avatar: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      text: "Sakib's debugging skills are legendary. Whenever the team hit an impossible bottleneck in our WebRTC integration, he was the one who could trace the memory leak right down to the network socket layer.",
      name: "Niloy Ahamed",
      role: "Senior Systems Engineer",
      avatar: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=100&h=100&q=80"
    },
    {
      text: "Sakib bridges the gap between client requirements and complex technical design. As a product owner, I could always rely on him to translate abstract business logic into deterministic, highly performant code.",
      name: "Tanvir Hassan",
      role: "Product Director at DevFlow",
      avatar: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?auto=format&fit=crop&w=100&h=100&q=80"
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % list.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="container">
        <h2 className="section-title">Testimonials</h2>
        <p className="section-subtitle">
          Feedback and recommendations from mentors, teammates, and engineering leads regarding Sakib.
        </p>

        <div className="testimonials-slider-container">
          <div className="testimonial-card premium-card animate-fade">
            <div className="quote-mark text-teal">“</div>
            <p className="testimonial-text">{list[activeIndex].text}</p>
            <div className="quote-mark text-teal text-right">”</div>
            
            <div className="testimonial-author">
              <img 
                src={list[activeIndex].avatar} 
                alt={list[activeIndex].name} 
                className="author-avatar" 
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
              <div className="author-info">
                <h4 className="author-name">{list[activeIndex].name}</h4>
                <p className="author-role">{list[activeIndex].role}</p>
              </div>
            </div>
          </div>

          <div className="slider-controls">
            <button onClick={prevTestimonial} className="slider-btn" aria-label="Previous Testimonial">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>
            <div className="slider-indicators">
              {list.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`slider-indicator ${activeIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                ></span>
              ))}
            </div>
            <button onClick={nextTestimonial} className="slider-btn" aria-label="Next Testimonial">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}