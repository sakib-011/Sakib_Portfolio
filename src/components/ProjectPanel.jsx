import React, { useState, useEffect, useRef } from 'react';
import './ProjectPanel.css';

export default function ProjectPanel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('ui-ux');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const videoRef = useRef(null);

  // ─── গিটহাব রেপোর জন্য স্টেট ───
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);

  // গিটহাব থেকে সব পাবলিক রেপো ফেচ করার ইফেক্ট
  useEffect(() => {
    // per_page=100 দিয়ে সর্বোচ্চ সংখ্যক রেপো আনা হচ্ছে
    fetch(`https://api.github.com/users/sakib-011/repos?sort=updated&per_page=100`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
        setLoadingRepos(false);
      })
      .catch(err => {
        console.error("Error fetching repos:", err);
        setLoadingRepos(false);
      });
  }, []);

  const projects = [
    {
      title: 'CodeSphere IDE',
      subtitle: 'Cloud-Based Collaborative Code Editor',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-34285-large.mp4',
      fallbackText: 'CodeSphere IDE Live Simulation: Running Compiler Services...',
      tags: ['React', 'Node.js', 'WebSockets', 'Docker', 'C++ Compiler'],
      shortDesc: 'A real-time collaborative development environment sandboxed with Docker containers for isolated code execution.',
      description: {
        overview: 'CodeSphere IDE is a real-time collaborative development environment designed for competitive programmers and teams. It allows users to write, compile, and execute code in 15+ programming languages, with integrated contest trackers and collaborative whiteboard utilities.',
        features: [
          'Real-time collaborative editing using Operational Transformation (OT) algorithms.',
          'Isolated code execution environment sandboxed with Docker containers.',
          'Integrated competitive programming test-case runner supporting custom input/output checks.',
          'Live video/audio calling and chat integration for pair programming.'
        ],
        challenges: 'Handling concurrent edits without merge conflicts and executing arbitrary code safely within 1.0 second execution limits. Solved using shared WebSockets, redis queues, and strict CPU/Memory quotas inside Docker.'
      },
      uiUx: {
        fonts: 'JetBrains Mono for editor, Inter for dashboard interface.',
        colors: ['#0F172A', '#38BDF8', '#10B981', '#F1F5F9'],
        philosophy: 'A ultra-minimalist developer workspace. Elements fade out during typing to maximize focus.',
        accessibility: 'Fully WCAG compliant, keyboard-only navigation supported.'
      },
      algorithms: {
        structures: 'Segment Trees, Trie Data Structure, OT Queue.',
        details: 'Autocomplete powered by a compressed Trie querying in O(L) time. Document edits use an OT queue ensuring convergence.'
      }
    },
    {
      title: 'PathFindr.io',
      subtitle: 'Interactive Algorithm Visualizer',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-programmer-typing-on-a-keyboard-40614-large.mp4',
      fallbackText: 'PathFindr Live Grid: running Dijkstra / A* Search...',
      tags: ['HTML5 Canvas', 'React', 'TypeScript', 'Algorithms'],
      shortDesc: 'An interactive simulator for exploring classical graph algorithms and procedural maze generation.',
      description: {
        overview: 'An interactive simulator for exploring classical graph algorithms and maze generation. It allows users to place walls, start/end nodes, and watch step-by-step visualizations.',
        features: [
          'Visualizes Dijkstra, A* Search, BFS, DFS, and Bidirectional Search.',
          'Generate randomized mazes using Recursive Division and Kruskal’s algorithm.',
          'Web Worker-based calculation thread to prevent UI freezing.'
        ],
        challenges: 'Animating transitions at 60fps on large grids without lag. Solved by rendering the grid on HTML5 Canvas.'
      },
      uiUx: {
        fonts: 'Plus Jakarta Sans for controls, Fira Code for metrics.',
        colors: ['#0B0F19', '#06B6D4', '#F59E0B', '#EC4899'],
        philosophy: 'Neomorphic sliders and controllers styled with soft borders.',
        accessibility: 'Includes colorblind-friendly color themes, ARIA tags on sliders.'
      },
      algorithms: {
        structures: 'Min-Heap Priority Queue, Adjacency List.',
        details: 'Dijkstra and A* use a binary Min-Heap to fetch the next closest node in O(log V) time.'
      }
    },
    {
      title: 'ContestTracker',
      subtitle: 'Competitive Programming Unified Hub',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-writing-programming-code-on-a-computer-screen-1726-large.mp4',
      fallbackText: 'ContestTracker Syncing: scraping Codeforces, CodeChef, AtCoder...',
      tags: ['Next.js', 'Express', 'Redis', 'Web Scraping'],
      shortDesc: 'A unified aggregation calendar and real-time rating prediction hub.',
      description: {
        overview: 'A unified calendar and statistics tracker for competitive programmers. Aggregates upcoming contests and predicts rating changes.',
        features: [
          'Unified interactive calendar syncing.',
          'Real-time rating prediction engine.',
          'Personalized recommendations based on past failures.'
        ],
        challenges: 'Scraping contest pages without rate-limiting. Solved using rotating proxies and Redis caching.'
      },
      uiUx: {
        fonts: 'Outfit for headers, Space Grotesk for metrics.',
        colors: ['#090D16', '#6366F1', '#10B981', '#1E293B'],
        philosophy: 'Dashboard-centric design inspired by financial trading terminals.',
        accessibility: 'Responsive mobile layouts and descriptive ALT tags.'
      },
      algorithms: {
        structures: 'Interval Trees, Hash Maps.',
        details: 'Upcoming contests stored in an Interval Tree for rapid range queries in O(log N + K) time.'
      }
    }
  ];

  useEffect(() => {
    if (videoRef.current && selectedProject) {
      if (isPlaying) videoRef.current.play().catch(() => {});
      else videoRef.current.pause();
    }
  }, [isPlaying, selectedProject]);

  const handleNext = () => setActiveIdx((prev) => (prev + 1) % projects.length);
  const handlePrev = () => setActiveIdx((prev) => (prev - 1 + projects.length) % projects.length);

  // ডেটাকে সমান দুইভাগে ভাগ করার লজিক (Infinite Loop এর জন্য ডেটা ডুপ্লিকেট করা হয়েছে)
  const halfLength = Math.ceil(repos.length / 2);
  const row1Repos = [...repos.slice(0, halfLength), ...repos.slice(0, halfLength)];
  const row2Repos = [...repos.slice(halfLength), ...repos.slice(halfLength)];

  const renderRepoCard = (repo, index) => (
    <a 
      href={repo.html_url} 
      target="_blank" 
      rel="noopener noreferrer" 
      key={`${repo.id}-${index}`} 
      className="gh-repo-card"
    >
      <div className="gh-repo-header">
        <svg className="gh-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
        <span className="gh-repo-stars">⭐ {repo.stargazers_count}</span>
      </div>
      <h4 className="gh-repo-name">{repo.name}</h4>
      <p className="gh-repo-desc">{repo.description || "No description provided."}</p>
      <div className="gh-repo-footer">
        {repo.language && (
          <span className="gh-repo-lang">
            <span className="lang-dot"></span>{repo.language}
          </span>
        )}
        <span className="gh-repo-forks">🍴 {repo.forks_count}</span>
      </div>
    </a>
  );

  return (
    <section id="projects" className={`projects-section ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="container">
        
        {!selectedProject ? (
          <div className="carousel-stage animate-fade-in">
            <h2 className="section-title">Project Showcase</h2>
            <p className="section-subtitle">Browse through my digital engineering workshop. Click a center card to drill down.</p>

            <div className="carousel-view-container">
              <button className="nav-arrow left" onClick={handlePrev} aria-label="Previous Project">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              
              <div className="carousel-track-3d">
                {projects.map((proj, idx) => {
                  let offset = idx - activeIdx;
                  if (offset < -1) offset += projects.length;
                  if (offset > 1) offset -= projects.length;
                  
                  let cardClass = `project-card-3d ${offset === 0 ? "center" : offset === -1 ? "left-curve" : offset === 1 ? "right-curve" : "hidden"}`;
                  
                  return (
                    <div key={proj.title} className={cardClass} onClick={() => offset === 0 && setSelectedProject(proj)}>
                      <div className="card-mock-media">
                        <span className="media-abstract-icon">⚡</span>
                      </div>
                      <div className="card-meta">
                        <span className="card-subtitle">{proj.subtitle}</span>
                        <h3 className="card-title">{proj.title}</h3>
                        <p className="card-short-desc">{proj.shortDesc}</p>
                        <div className="card-tags-strip">
                          {proj.tags.slice(0, 3).map(t => <span key={t} className="mini-tag">{t}</span>)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="nav-arrow right" onClick={handleNext} aria-label="Next Project">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>

            <div className="carousel-circles">
              {projects.map((_, idx) => (
                <button key={idx} className={`circle-dot ${activeIdx === idx ? 'active' : ''}`} onClick={() => setActiveIdx(idx)} />
              ))}
            </div>
          </div>
        ) : (
          <div className="deep-dive-stage animate-fade-in">
            {/* Context Subbar */}
            <div className="deep-dive-nav">
              <button className="back-btn" onClick={() => setSelectedProject(null)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{marginRight: '6px'}}><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                Back to Hub
              </button>
            </div>

            {/* Top Browser Mockup Media Frame */}
            <div className="deep-dive-hero-frame">
              <div className="screen-frame-header">
                <div className="frame-circles">
                  <span className="frame-dot frame-red" onClick={() => setSelectedProject(null)}></span>
                  <span className="frame-dot frame-yellow"></span>
                  <span className="frame-dot frame-green"></span>
                </div>
                <div className="frame-address-bar">https://sakib.dev/vault/{selectedProject.title.toLowerCase()}</div>
              </div>
              <div className="hero-video-wrapper">
                <video ref={videoRef} src={selectedProject.videoUrl} loop muted playsInline autoPlay />
                <button className="floating-play-pause" onClick={() => setIsPlaying(!isPlaying)}>
                  {isPlaying ? 'PAUSE WALKTHROUGH' : 'PLAY WALKTHROUGH'}
                </button>
              </div>
            </div>

            {/* Asymmetrical Spec Bento Grid */}
            <div className="bento-layout-grid">
              {/* Box 1: Core System Architecture */}
              <div className="bento-box core-specs-box">
                <div className="tags-wrapper">
                  {selectedProject.tags.map(t => <span key={t} className="tech-badge">{t}</span>)}
                </div>
                <h3 className="bento-box-title">System Architecture</h3>
                <p className="bento-box-text">{selectedProject.description.overview}</p>
                
                <h4 className="sub-box-title">Key Core Production Features</h4>
                <ul className="bento-bullet-list">
                  {selectedProject.description.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>
              </div>

              {/* Box 2: Tabbed Design & Complexity Specs */}
              <div className="bento-box dynamic-details-box">
                <div className="bento-tabs-header">
                  <button className={`bento-tab-btn ${activeTab === 'ui-ux' ? 'active' : ''}`} onClick={() => setActiveTab('ui-ux')}>UI/UX Blueprint</button>
                  <button className={`bento-tab-btn ${activeTab === 'algorithms' ? 'active' : ''}`} onClick={() => setActiveTab('algorithms')}>Runtime Optimization</button>
                </div>
                
                <div className="bento-tab-content-area">
                  {activeTab === 'ui-ux' ? (
                    <div className="pane-content animate-fade-in">
                      <p className="bento-box-text"><strong>Philosophy:</strong> {selectedProject.uiUx.philosophy}</p>
                      <p className="bento-box-text"><strong>Typography:</strong> {selectedProject.uiUx.fonts}</p>
                      <p className="bento-box-text"><strong>Accessibility:</strong> {selectedProject.uiUx.accessibility}</p>
                      <h4 className="sub-box-title">Design Color Swatches</h4>
                      <div className="bento-swatch-strip">
                        {selectedProject.uiUx.colors.map((c, i) => (
                          <div key={i} className="bento-swatch-item">
                            <div className="swatch-color" style={{ backgroundColor: c }}></div>
                            <span className="swatch-lbl">{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="pane-content animate-fade-in">
                      <p className="bento-box-text"><strong>Core Structures:</strong> <code className="inline-code-accent">{selectedProject.algorithms.structures}</code></p>
                      <p className="bento-box-text"><strong>Implementation Rules:</strong> {selectedProject.algorithms.details}</p>
                      <div className="bento-terminal-mock">
                        <pre>{`{\n  "engine": "V8 Sandbox Execution",\n  "cache_layer": "Redis Distributed",\n  "latency_target": "< 50ms"\n}`}</pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Box 3: Production Bottlenecks & Code Challenges */}
              <div className="bento-box structural-challenges-box">
                <h3 className="bento-box-title">Engineering Challenge & Resolution</h3>
                <p className="challenge-quote-text">"{selectedProject.description.challenges}"</p>
              </div>
            </div>
          </div>
        )}

        {/* ─── নতুন মডিফাইড GitHub Marquee স্লাইডার সেকশন ─── */}
        <div className="github-marquee-section">
          <h2 className="gh-section-title">Open Source Repositories</h2>
          <p className="gh-section-subtitle">Continuous live streams of my public codebases</p>

          {loadingRepos ? (
            <div className="gh-loading">Syncing ecosystem with GitHub...</div>
          ) : (
            <div className="marquee-container">
              {/* Row 1: Left moving row */}
              <div className="marquee-track track-left">
                <div className="marquee-content">
                  {row1Repos.map((repo, idx) => renderRepoCard(repo, `r1-${idx}`))}
                </div>
              </div>

              {/* Row 2: Right moving row */}
              <div className="marquee-track track-right">
                <div className="marquee-content">
                  {row2Repos.map((repo, idx) => renderRepoCard(repo, `r2-${idx}`))}
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}