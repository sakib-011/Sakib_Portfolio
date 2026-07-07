import React from 'react';
import './About.css';

export default function About() {
  const skillCategories = [
    {
      title: 'Languages',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
      skills: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'SQL', 'PL/SQL', 'Bash', 'Assembly'],
    },
    {
      title: 'Web Technologies & Frameworks',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
          <polyline points="2 12 12 17 22 12"></polyline>
        </svg>
      ),
      skills: ['Spring Boot', 'React', 'Next.js', 'Node.js', 'Thymeleaf', 'RESTful APIs', 'HTML5 & CSS3', 'Tailwind CSS', 'Bootstrap'],
    },
    {
      title: 'Tools & Databases',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
        </svg>
      ),
      skills: ['Git & GitHub', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Linux/Unix'],
    },
  ];

  const cpSolvedMetrics = [
    { tag: 'Implementation', count: 162 },
    { tag: 'Math', count: 140 },
    { tag: 'Greedy', count: 93 },
    { tag: 'Brute Force', count: 61 },
    { tag: 'Strings', count: 42 },
    { tag: 'Sortings', count: 41 },
    { tag: 'Constructive Alg.', count: 27 },
    { tag: 'Number Theory', count: 22 },
    { tag: 'Binary Search', count: 10 },
    { tag: 'DP', count: 9 },
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">
          A look into my journey, passion, and the core skill sets that define my development profile.
        </p>

        <div className="about-grid">
          {/* Left Column: Image Area & Bio Card */}
          <div className="about-main-info">

            {/* Interactive Picture Container with Floating SVG Logos */}
            <div className="profile-image-container">
              <div className="image-wrapper">
                <img
                  src="/assets/my_image.jpg"
                  alt="Profile"
                  className="profile-img"
                />
              </div>

              {/* Floating slow-moving quotes (glasstransparent box) */}
              <div className="floating-quote-box fqb-1" title="Code Quote">
                <span>"solve();"</span>
              </div>
              <div className="floating-quote-box fqb-2" title="Code Quote">
                <span>"O(N)"</span>
              </div>

              {/* CLICKABLE: Codeforces Link Badge */}
              <a
                href="https://codeforces.com/profile/sakib_001" /* Replace with your Codeforces link */
                target="_blank"
                rel="noopener noreferrer"
                className="floating-badge badge-cf clickable-badge"
                title="View Codeforces Profile"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="10" width="4" height="12" rx="0.5" fill="#3182ce" />
                  <rect x="9" y="4" width="4" height="18" rx="0.5" fill="#e53e3e" />
                  <rect x="16" y="8" width="4" height="14" rx="0.5" fill="#dd6b20" />
                </svg>
              </a>

              {/* CLICKABLE: GitHub Link Badge */}
              <a
                href="http://github.com/sakib-011" /* Replace with your GitHub link */
                target="_blank"
                rel="noopener noreferrer"
                className="floating-badge badge-git clickable-badge"
                title="View GitHub Profile"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>

              {/* CLICKABLE: LinkedIn Link Badge */}
              <a
                href="https://www.linkedin.com/in/sakib-71b491367" /* Replace with your LinkedIn link */
                target="_blank"
                rel="noopener noreferrer"
                className="floating-badge badge-linkedin clickable-badge"
                title="Connect on LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>

              {/* NON-CLICKABLE: Java Tech Badge */}
              <div className="floating-badge badge-java" title="Java">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                  <line x1="6" y1="1" x2="6" y2="4" />
                  <line x1="10" y1="1" x2="10" y2="4" />
                  <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
              </div>

              {/* NON-CLICKABLE: Spring Boot Tech Badge */}
              <div className="floating-badge badge-spring" title="Spring Boot">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                  <path d="M7 14C9 10 11 8 15 7C13 11 11 13 7 14Z" fill="currentColor" />
                </svg>
              </div>

              {/* NON-CLICKABLE: React Tech Badge */}
              <div className="floating-badge badge-react" title="React">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>
              </div>
            </div>

            <div className="about-bio premium-card transparent-glass">
              <h3>My Passion & Philosophy</h3>
              <blockquote className="bio-quote">
                "Driven by logic, refined by optimization, building for performance."
              </blockquote>

              <p>
                I am a software developer with an analytical mindset deeply rooted in <strong>Competitive Programming</strong>.
                My foundation taught me to focus heavily on performance constraints, ensuring I write highly optimal, resource-efficient code.
              </p>
              <p>
                Today, I bridge that computational efficiency into robust software engineering—building responsive frontends with React/Next.js and powerful backend pipelines with Spring Boot and Node.js.
              </p>

              <div className="about-details">
                <div className="detail-item">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">Dhaka, Bangladesh</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value text-teal">Open to Opportunities</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Preferred Role:</span>
                  <span className="detail-value">Software Engineer</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Dynamic Metrics & Updated Skills */}
          <div className="about-skills-wrapper">

            {/* Competitive Programming Counter Block */}
            <div className="skill-category premium-card transparent-glass">
              <div className="skill-category-header">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
                <h4>Competitive Programming Breakdown</h4>
              </div>

              <div className="skill-tags"> {/* Using the same class as skill categories */}
                {cpSolvedMetrics.map((item) => (
                  <span key={item.tag} className="skill-tag">
                    {item.tag} <span className="metric-count">+{item.count}</span>
                  </span>
                ))}
                {/* Keep the fallback tag if you still want it */}
                <span className="skill-tag dynamic-fallback-tag">
                  Two Pointers, Games, Bitmasks, Graphs & More
                </span>
              </div>
            </div>

            {/* Standard Skill Sections */}
            {skillCategories.map((category) => (
              <div key={category.title} className="skill-category premium-card transparent-glass">
                <div className="skill-category-header">
                  {category.icon}
                  <h4>{category.title}</h4>
                </div>
                <div className="skill-tags">
                  {category.skills.map((skill) => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}