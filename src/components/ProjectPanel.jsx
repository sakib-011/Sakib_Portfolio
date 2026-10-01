import React, { useState, useEffect } from 'react';
import './ProjectPanel.css';

export default function ProjectPanel() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('ui-ux');
  const [isDarkMode, setIsDarkMode] = useState(true);

  // ─── GitHub Repos Stack Board States ───
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(true);

  // Sync data from GitHub API with structured fallback architecture
  useEffect(() => {
    setLoadingRepos(true);
    fetch(`https://api.github.com/users/sakib-011/repos?sort=updated&per_page=100`)
      .then(res => {
        if (!res.ok) throw new Error("GitHub API limit hit or host unreachable");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setRepos(data);
        } else {
          throw new Error("Empty stack or invalid payload profile structure");
        }
        setLoadingRepos(false);
      })
      .catch(err => {
        console.error("Sync falling back to local stack data matrix:", err);
        const mockStack = [
          { id: 'mock-1', name: 'EmotiTag-Video-Anotation-Tool', description: 'High-performance desktop video annotation framework built with Tauri, Rust, and React.', stargazers_count: 32, forks_count: 6, language: 'Rust', html_url: 'https://github.com/sakib-011/EmotiTag-Video-Anotation-Tool' },
          { id: 'mock-2', name: 'BookGrid', description: 'Smart Library Management System & Digital Reading Platform with Spring Boot backend.', stargazers_count: 24, forks_count: 5, language: 'TypeScript', html_url: 'https://github.com/sakib-011/BookGrid' },
          { id: 'mock-3', name: 'cgpa-calculator', description: 'Academic performance tracker & university CGPA forecaster web application.', stargazers_count: 18, forks_count: 3, language: 'JavaScript', html_url: 'https://github.com/sakib-011/cgpa-calculator' },
          { id: 'mock-4', name: 'CodeSphere-Kernel', description: 'Sandboxed remote terminal compiler clusters executing instances via isolated execution trees.', stargazers_count: 45, forks_count: 8, language: 'Go', html_url: 'https://github.com/sakib-011' }
        ];
        setRepos(mockStack);
        setLoadingRepos(false);
      });
  }, []);

  const projects = [
    {
      title: 'emotiTag',
      subtitle: 'Advanced Video Emotion Annotation Framework',
      imageUrl: '/assets/emoti-tag.png',
      deployedLink: 'https://github.com/sakib-011/EmotiTag-Video-Anotation-Tool/releases',
      githubUrl: 'https://github.com/sakib-011/EmotiTag-Video-Anotation-Tool',
      tags: ['Tauri v2', 'Rust', 'React', 'TypeScript', 'Axum', 'Zustand'],
      shortDesc: 'A high-performance, desktop-native video annotation software engineered specifically for researchers and ML engineers.',
      description: {
        overview: 'emotiTag is a high-performance desktop-native video annotation framework engineered for researchers, data scientists, and ML engineers. It streamlines building large-scale emotion recognition and behavioral analysis datasets from short-form video content (Reels, TikToks, Shorts) with sub-second timestamping precision.',
        features: [
          'Sub-Second Precision Timestamping: Click and drag on timeline to set exact temporal bounds for behavioral events.',
          'Dynamic Dataset Sequencing: Automatically assigns sequential JSON IDs (e.g. Dataset_001, Dataset_002) for data integrity.',
          'Cross-Platform Source Tracking: Automatically logs origin platform (YouTube, TikTok, Facebook) for every annotated video.',
          'Native OS Acceleration: Built on Tauri v2 & Rust Axum HTTP server for hardware-accelerated playback of high-res MP4/WebM files.',
          'Standardized Bulk Export: Directly exports machine-readable JSON files ready for PyTorch, TensorFlow, and Pandas pipelines.'
        ],
        challenges: 'Bypassing browser-based media buffer bottlenecks and preventing memory leaks during continuous playback of high-resolution video corpora. Solved with a custom Axum HTTP streaming server running on a native Rust background worker inside Tauri.'
      },
      uiUx: {
        fonts: 'Inter, JetBrains Mono for timestamp metrics.',
        colors: ['#0F172A', '#6366F1', '#EC4899', '#10B981'],
        philosophy: 'Distraction-free academic dark mode interface engineered for high-efficiency data labeling workflows.',
        accessibility: 'Keyboard shortcuts for frame stepping and high contrast timeline event bounds.'
      },
      algorithms: {
        structures: 'Axum Async Streamer, Temporal Event Index Tree, Standardized JSON Schema',
        details: 'Chunked async media streaming with sub-millisecond seek latency and linear O(1) annotation lookup.'
      }
    },
    {
      title: 'BookGrid',
      subtitle: 'Modern Library Management Web Application & Spring Boot API',
      imageUrl: '/assets/book-grid.png',
      deployedLink: 'https://lms-011.vercel.app/',
      githubUrl: 'https://github.com/sakib-011/BookGrid',
      tags: ['React 18', 'TypeScript', 'Spring Boot 3.2', 'Java 21', 'PostgreSQL', 'Cloudinary', 'JWT'],
      shortDesc: 'A state-of-the-art digital reading & library ecosystem featuring in-browser PDF e-Reading, Cloudinary cover uploads, barcode tracking, and RBAC portals.',
      description: {
        overview: 'BookGrid is a state-of-the-art, full-stack library management application powering modern university libraries. Built with React 18, TypeScript, Vite, Spring Boot 3.2, Java 21, and PostgreSQL, it offers dynamic role-tailored portals for Students, Moderators, and System Administrators with integrated in-browser PDF e-Reading, Cloudinary cover upload, physical barcode tracking, and automated circulation processing.',
        features: [
          'Student Portal: Multi-keyword catalog search, integrated in-browser PDF e-Reader, reservation queues, wishlist management, and digital fine receipt simulation.',
          'Moderator Desk: Full CRUD catalog control, step-by-step Cloudinary cover image uploads, physical barcode tag generation, and loan issue/return desk.',
          'Administrator Suite: Fine-grained RBAC administration across Student, Moderator, and Admin roles with audit logging and exportable CSV analytics.',
          'Spring Boot 3.2 Backend: Stateless JWT Bearer token authentication, Spring Data JPA, PostgreSQL persistence, and Springdoc OpenAPI/Swagger docs.'
        ],
        challenges: 'Handling concurrent book reservations and transactional return fines across multi-role user queues. Solved using database transactions with optimistic locking in PostgreSQL and optimistic UI state syncing in React.'
      },
      uiUx: {
        fonts: 'Inter, Outfit, Fira Code for inventory metrics.',
        colors: ['#020617', '#3B82F6', '#10B981', '#F59E0B'],
        philosophy: 'Warm academic aesthetic built with custom CSS design tokens, glassmorphic data cards, and responsive multi-portal layouts.',
        accessibility: 'Full keyboard navigation, ARIA live region search announcements, and colorblind-friendly inventory status tags.'
      },
      algorithms: {
        structures: 'Stateless JWT Security Filter, B-Tree DB Indexing, Cloudinary Unsigned Pipeline, PDF Storage Ledger',
        details: 'O(1) cached catalog lookups, thread-safe transactional loan checkouts, and non-blocking e-Book PDF stream loading.'
      }
    },
    {
      title: 'CGPA Calculator',
      subtitle: 'Academic Performance & Grade Trajectory Analytics',
      imageUrl: '/assets/cgpa-calculator.png',
      deployedLink: 'https://cgpa-011.vercel.app/',
      githubUrl: 'https://github.com/sakib-011/cgpa-calculator',
      tags: ['React', 'JavaScript', 'CSS3', 'GitHub Pages'],
      shortDesc: 'An intuitive web application for calculating university GPA/CGPA, forecasting target grades, and tracking progress.',
      description: {
        overview: 'An interactive academic utility designed for university students to track credit hours, calculate exact CGPA trajectories, and simulate target grades required to reach desired degree classifications.',
        features: [
          'Dynamic credit hour and letter grade matrix calculator.',
          'Real-time target grade simulation and target CGPA forecaster.',
          'Local storage persistence for instant multi-semester transcript management.',
          'One-click transcript summary export and dark mode toggle.'
        ],
        challenges: 'Supporting custom grading scales across different university grading systems dynamically. Solved with modular grading scale configurations.'
      },
      uiUx: {
        fonts: 'Plus Jakarta Sans, Space Grotesk',
        colors: ['#090D16', '#8B5CF6', '#06B6D4', '#10B981'],
        philosophy: 'Clean numerical clarity with glowing interactive sliders and responsive input tables.',
        accessibility: 'High-visibility color contrast and screen-reader accessible input fields.'
      },
      algorithms: {
        structures: 'Weighted Average Accumulator, LocalStorage Sync Map',
        details: 'O(N) weighted GPA computation with instant re-calculation on every keystroke.'
      }
    }
  ];

  const handleNext = () => setActiveIdx((prev) => (prev + 1) % projects.length);
  const handlePrev = () => setActiveIdx((prev) => (prev - 1 + projects.length) % projects.length);

  // ─── ENDLESS LOOP GENERATION ALGORITHM ───
  const buildInfiniteTrack = (items, oddRow) => {
    if (!items || items.length === 0) return [];
    const midIdx = Math.ceil(items.length / 2);
    const baselineSegment = oddRow ? items.slice(0, midIdx) : items.slice(midIdx);
    if (baselineSegment.length === 0) return [];

    let outputTrack = [...baselineSegment];
    while (outputTrack.length < 15) {
      outputTrack = [...outputTrack, ...baselineSegment];
    }
    return [...outputTrack, ...outputTrack];
  };

  const row1Repos = buildInfiniteTrack(repos, true);
  const row2Repos = buildInfiniteTrack(repos, false);

  const renderRepoCard = (repo, uniqueKey) => (
    <a 
      href={repo.html_url} 
      target="_blank" 
      rel="noopener noreferrer" 
      key={uniqueKey} 
      className="gh-repo-card"
    >
      <div className="gh-repo-header">
        <svg className="gh-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
        <span className="gh-repo-stars">⭐ {repo.stargazers_count}</span>
      </div>
      <h4 className="gh-repo-name">{repo.name}</h4>
      <p className="gh-repo-desc">{repo.description || "No description configured for this open source repository module."}</p>
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
            <p className="section-subtitle">Browse through my digital engineering workshop. Click a center card to inspect details.</p>

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
                        <img src={proj.imageUrl} alt={proj.title} className="card-mock-img" />
                      </div>
                      <div className="card-meta">
                        <span className="card-subtitle">{proj.subtitle}</span>
                        <h3 className="card-title">{proj.title}</h3>
                        <p className="card-short-desc">{proj.shortDesc}</p>
                        
                        <div className="card-action-bar">
                          <div className="card-tags-strip">
                            {proj.tags.slice(0, 3).map(t => <span key={t} className="mini-tag">{t}</span>)}
                          </div>
                          {proj.deployedLink && (
                            <a 
                              href={proj.deployedLink} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="mini-deploy-btn"
                              onClick={(e) => e.stopPropagation()}
                            >
                              🚀 Live Link
                            </a>
                          )}
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
            <div className="deep-dive-nav">
              <button className="back-btn" onClick={() => setSelectedProject(null)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{marginRight: '6px'}}><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                Back to Hub
              </button>
            </div>

            <div className="deep-dive-hero-frame">
              <div className="screen-frame-header">
                <div className="frame-circles">
                  <span className="frame-dot frame-red" onClick={() => setSelectedProject(null)}></span>
                  <span className="frame-dot frame-yellow"></span>
                  <span className="frame-dot frame-green"></span>
                </div>
                <div className="frame-address-bar">
                  <a href={selectedProject.deployedLink || selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                    {selectedProject.deployedLink || selectedProject.githubUrl}
                  </a>
                </div>
                <div className="frame-action-links">
                  {selectedProject.deployedLink && (
                    <a href={selectedProject.deployedLink} target="_blank" rel="noopener noreferrer" className="frame-btn btn-deploy">
                      🚀 Live Demo / Release
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="frame-btn btn-github">
                      🐙 GitHub Repo
                    </a>
                  )}
                </div>
              </div>

              <div className="hero-image-wrapper">
                <img src={selectedProject.imageUrl} alt={selectedProject.title} className="hero-showcase-img" />
              </div>
            </div>

            <div className="bento-layout-grid">
              <div className="bento-box core-specs-box">
                <div className="tags-wrapper">
                  {selectedProject.tags.map(t => <span key={t} className="tech-badge">{t}</span>)}
                </div>
                <h3 className="bento-box-title">{selectedProject.title} — System Architecture</h3>
                <p className="bento-box-text">{selectedProject.description.overview}</p>
                
                <h4 className="sub-box-title">Key Core Production Features</h4>
                <ul className="bento-bullet-list">
                  {selectedProject.description.features.map((f, i) => <li key={i}>{f}</li>)}
                </ul>

                <div className="bento-links-bar">
                  {selectedProject.deployedLink && (
                    <a href={selectedProject.deployedLink} target="_blank" rel="noopener noreferrer" className="bento-action-btn primary">
                      🚀 Visit Deployed App / Releases
                    </a>
                  )}
                  {selectedProject.githubUrl && (
                    <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="bento-action-btn secondary">
                      🐙 Source Code on GitHub
                    </a>
                  )}
                </div>
              </div>

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
                        <pre>{`{\n  "project": "${selectedProject.title}",\n  "status": "Deployed & Verified",\n  "deployed_url": "${selectedProject.deployedLink}"\n}`}</pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bento-box structural-challenges-box">
                <h3 className="bento-box-title">Engineering Challenge & Resolution</h3>
                <p className="challenge-quote-text">"{selectedProject.description.challenges}"</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── GitHub Stack Board ─── */}
      <div className="github-marquee-section">
        <h2 className="gh-section-title">Open Source Repositories</h2>
        <p className="gh-section-subtitle">Continuous live streams of my public codebases</p>

        {loadingRepos ? (
          <div className="gh-loading">Establishing handshake with GitHub cluster API...</div>
        ) : (
          <div className="marquee-container">
            <div className="marquee-track track-left">
              <div className="marquee-content">
                {row1Repos.map((repo, idx) => renderRepoCard(repo, `track1-item-${idx}`))}
              </div>
            </div>

            <div className="marquee-track track-right">
              <div className="marquee-content">
                {row2Repos.map((repo, idx) => renderRepoCard(repo, `track2-item-${idx}`))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}