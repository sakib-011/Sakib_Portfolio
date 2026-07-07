import React from 'react';

export default function Timeline() {
  const education = [
    {
      year: '2023 (Mid) - 2027 (Mid)',
      title: 'B.Sc. in Computer Science & Engineering',
      institution: 'Southeast University',
      description: 'Currently completing undergraduate studies, currently in the 10th semester. Deepening knowledge in core computing, software engineering systems, and practical laboratory assignments.',
      gpa: 'CGPA: 3.87'
    },
    {
      year: '2020 - 2022',
      title: 'Higher Secondary Certificate (HSC)',
      institution: 'Khilgaon Model University College',
      description: 'Science Group. Completed higher secondary curriculum with a strong focus on mathematics and physics foundation.',
      gpa: 'GPA: 5.00 / 5.00'
    }
  ];

  const skills = [
    { name: 'C++', percentage: 85 },
    { name: 'Java & Spring Boot', percentage: 80 },
    { name: 'JavaScript & React', percentage: 75 },
    { name: 'Databases (MongoDB, PostgreSQL, SQL)', percentage: 78 },
    { name: 'Node.js, Next.js & Express', percentage: 72 },
    { name: 'C Programming', percentage: 70 },
    { name: 'Python & Data Science Stack', percentage: 70 }
  ];

  // Config for scattered floating badges (random positions and animation offsets)
  const floatingTagsConfig = [
    { name: 'MongoDB', top: '10%', left: '5%', scale: 1.1, delay: '0s' },
    { name: 'C++', top: '25%', left: '75%', scale: 1.0, delay: '1s' },
    { name: 'Node.js', top: '55%', left: '10%', scale: 1.2, delay: '0.5s' },
    { name: 'React', top: '70%', left: '60%', scale: 0.9, delay: '1.5s' },
    { name: 'PostgreSQL', top: '15%', left: '45%', scale: 1.0, delay: '2s' },
    { name: 'Spring Boot', top: '80%', left: '20%', scale: 1.1, delay: '2.5s' },
    { name: 'SQL', top: '40%', left: '80%', scale: 1.3, delay: '1s' },
    { name: 'Next.js', top: '90%', left: '70%', scale: 1.0, delay: '0s' },
  ];

  return (
    <>
      {/* CSS styles: Floating animation and new teal theme */}
      <style>{`
        @keyframes fillProgress {
          from { width: 0%; }
          to { width: var(--target-width); }
        }
        @keyframes scatterFloat {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -15px); }
          50% { transform: translate(-5px, -25px); }
          75% { transform: translate(-12px, -10px); }
        }
        .text-teal-bright { color: #00e6b8; }
        .badge-teal-bright { background: rgba(0, 230, 184, 0.15); color: #00e6b8; border: 1px solid rgba(0, 230, 184, 0.3); }
        .progress-bar-container {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          height: 8px;
          width: 100%;
          overflow: hidden;
          position: relative;
        }
        .progress-bar-fill-teal {
          height: 100%;
          border-radius: 8px;
          background: linear-gradient(90deg, #008f7a, #00e6b8);
          box-shadow: 0 0 10px rgba(0, 230, 184, 0.3);
          animation: fillProgress 1.5s cubic-bezier(0.1, 0.8, 0.2, 1) forwards;
          width: 0%;
        }
        .scatter-badge {
          position: absolute;
          display: inline-block;
          background: rgba(0, 230, 184, 0.08);
          color: rgba(0, 230, 184, 0.8);
          border: 1px solid rgba(0, 230, 184, 0.2);
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 500;
          pointer-events: none; /* Let clicks pass through */
          animation: scatterFloat 10s ease-in-out infinite;
          opacity: 0.8;
          z-index: 1; /* Behind the progress bars */
        }
      `}</style>

      <section id="experience" className="experience-section">
        <div className="container">
          <h2 className="section-title">Education & Technical Focus</h2>
          <p className="section-subtitle">
            A summary of my academic background and engineering skill sets.
          </p>

          <div className="timeline-grid">
            {/* Education Timeline */}
            <div className="timeline-column">
              <h3 className="column-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"></path>
                </svg>
                <span>Academic Education</span>
              </h3>
              
              <div className="timeline-items">
                {education.map((item, idx) => (
                  <div key={idx} className="timeline-item premium-card">
                    <div className="timeline-marker"></div>
                    <span className="timeline-date">{item.year}</span>
                    <h4 className="timeline-title-text">{item.title}</h4>
                    <p className="timeline-institution">{item.institution}</p>
                    <p className="timeline-desc">{item.description}</p>
                    <span className="timeline-badge badge-teal">{item.gpa}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills Column with Teal Theme and Scattered Floating Tags */}
            <div className="timeline-column">
              <h3 className="column-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-bright">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
                <span>Technical Skills</span>
              </h3>

              <div className="timeline-items">
                {/* Relative container for the scattered floaters */}
                <div className="timeline-item premium-card" style={{ position: 'relative', minHeight: '350px', padding: '30px 20px', overflow: 'hidden' }}>
                  
                  {/* Distributed Scattered Floating Tags (Background layer) */}
                  {floatingTagsConfig.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="scatter-badge"
                      style={{ 
                        top: tag.top, 
                        left: tag.left, 
                        transform: `scale(${tag.scale})`,
                        animationDelay: tag.delay 
                      }}
                    >
                      {tag.name}
                    </span>
                  ))}

                  {/* Animated Progress Bars (Foreground layer) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative', zIndex: '2' }}>
                    {skills.map((skill, idx) => (
                      <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span className="timeline-institution" style={{ margin: 0, fontWeight: '500', fontSize: '0.85rem' }}>
                            {skill.name}
                          </span>
                          <span className="timeline-badge badge-teal-bright" style={{ fontSize: '0.7rem', padding: '1px 6px' }}>
                            {skill.percentage}%
                          </span>
                        </div>
                        <div className="progress-bar-container">
                          <div 
                            className="progress-bar-fill-teal" 
                            style={{ '--target-width': `${skill.percentage}%` }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}