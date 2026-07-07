import React from 'react';
import './Interests.css';

export default function Interests() {
  const aiSandbox = [
    { focus: 'Local AI Runtimes', description: 'Embedding optimized SLMs into native client apps.' },
    { focus: 'Agentic Architectures', description: 'Software workflows where LLMs act as state-machines.' },
    { focus: 'Intelligent Caching', description: 'Vector databases and semantic caching to reduce latency.' }
  ];

  const knowledge = [
    { area: 'Tech Blogs', description: 'System design case studies (Netflix, Uber, Meta).' },
    { area: 'Sci-Fi & Fiction', description: 'Hard science fiction and cyberpunk literature.' },
    { area: 'Biographies', description: 'Profiles of tech innovators and math pioneers.' },
    { area: 'Open Source', description: 'Exploring modern tooling and compiler optimizations.' },
  ];

  return (
    <section id="interests" className="interests-section">
      {/* Floating Glassmorphic Quotes */}
      <div className="interests-floating-container">
        <div className="interests-floating-box ifb-1">
          <span className="quote-text">"Agentic loops: Plan → Act → Observe"</span>
        </div>
        <div className="interests-floating-box ifb-2">
          <span className="quote-text">"Optimizing memory allocation in heap"</span>
        </div>
      </div>

      <h2 className="section-title">Interests & Curiosities</h2>
      <p className="section-subtitle">What keeps me driven and learning outside of routine development.</p>

      <div className="interests-grid">
        {/* Left Column */}
        <div className="column">
          <div className="premium-card">
            <h3>What Fuels My Curiosity</h3>
            {/* REMOVED INLINE STYLES HERE */}
            <p className="interests-quote">
              "An engineer's mind doesn't shut off at compiling; it finds systems to break and understand everywhere."
            </p>
            <p>Beyond standard coding, my mind naturally gravitated toward exploring how massive systems deal with scale, low latency, and real-time computation bottlenecks.</p>
          </div>

          <div className="premium-card">
            <div className="skill-category-header"><h4>Technical Deep Dives</h4></div>
            <div className="skill-tags">
              {['System Architecture', 'Distributed Systems', 'Database Optimization', 'Network Protocols', 'AI/ML Engineering'].map(t => (
                <span key={t} className="skill-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="column">
          <div className="premium-card">
            <div className="skill-category-header"><h4>The Sandbox: Software + AI</h4></div>
            {aiSandbox.map((item) => (
              <div key={item.focus}>
                <span className="interest-meta-title">{item.focus}</span>
                <p className="interest-meta-desc">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="premium-card">
            <div className="skill-category-header"><h4>Knowledge Streams</h4></div>
            {knowledge.map((item) => (
              <div key={item.area}>
                {/* REMOVED INLINE STYLES HERE */}
                <span className="interest-meta-title alternate-title">{item.area}</span>
                <p className="interest-meta-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}