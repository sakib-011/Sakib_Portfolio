import React, { useState, useEffect } from 'react';

export default function StatsDashboard() {
  const [ghUser, setGhUser] = useState('sakib-011');
  const [cfUser, setCfUser] = useState('sakib_001');
  
  const [ghLoading, setGhLoading] = useState(false);
  const [cfLoading, setCfLoading] = useState(false);

  const [ghData, setGhData] = useState({
    name: 'Sakib',
    avatar_url: 'https://avatars.githubusercontent.com/u/10242?v=4',
    bio: 'Never compare yourself to others. You are unique and your journey is your own.',
    public_repos: 28,
    followers: 1,
    following: 1,
    created_at: '2008-05-18T00:00:00Z',
    html_url: 'https://github.com/sakib-011'
  });

  const [cfData, setCfData] = useState({
    handle: 'sakib_001',
    rating: 840,
    maxRating: 1001,
    rank: 'Newbie',
    maxRank: 'Newbie',
    contribution: 0,
    friendOfCount: 6,
    organization: 'Southeast University',
    avatar: 'https://userpic.codeforces.org/31247/title/8de571a067ff250d.jpg'
  });

  // Fetch GitHub Stats
  const fetchGitHub = async (username) => {
    if (!username || !username.trim()) return;
    setGhLoading(true);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (response.ok) {
        const data = await response.json();
        setGhData(data);
      } else {
        console.error('Failed to fetch github data');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGhLoading(false);
    }
  };

  // Fetch Codeforces Stats
  const fetchCodeforces = async (handle) => {
    if (!handle || !handle.trim()) return;
    setCfLoading(true);
    try {
      const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'OK' && data.result && data.result[0]) {
          setCfData(data.result[0]);
        }
      } else {
        console.error('Failed to fetch codeforces data');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setCfLoading(false);
    }
  };

  // Auto-Update Feature (Debounce Effect)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchGitHub(ghUser);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [ghUser]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchCodeforces(cfUser);
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [cfUser]);

  // CF Rank Color Mapping
  const getCfRankColor = (rank) => {
    if (!rank) return '#9e9e9e';
    const r = rank.toLowerCase();
    if (r.includes('legendary') || r.includes('grandmaster') || r.includes('master')) {
      if (r.includes('candidate')) return '#aa00aa'; 
      if (r.includes('legendary')) return '#ff0000'; 
      return '#ff8c00'; 
    }
    if (r.includes('expert')) return '#0000ff'; 
    if (r.includes('specialist')) return '#03a89e'; 
    if (r.includes('pupil')) return '#008000'; 
    return '#9e9e9e'; 
  };

  // Render LGM name
  const renderCfHandle = (handle, rank) => {
    if (!handle) return 'N/A';
    if (rank && rank.toLowerCase().includes('legendary')) {
      return (
        <span>
          <span style={{ color: 'inherit', fontWeight: 'bold' }}>{handle[0]}</span>
          <span style={{ color: '#ff0000' }}>{handle.slice(1)}</span>
        </span>
      );
    }
    return <span style={{ color: getCfRankColor(rank) }}>{handle}</span>;
  };

  // Helper for Git & CF Stack Grid Layout Matrix
  const generateMockGrid = (baseCount) => {
    const grid = [];
    for (let row = 0; row < 7; row++) {
      const rowCells = [];
      for (let col = 0; col < 30; col++) {
        rowCells.push(Math.floor(Math.random() * (baseCount + 1)));
      }
      grid.push(rowCells);
    }
    return grid;
  };

  const days = ['Sun', '', 'Tue', '', 'Thu', '', 'Sat'];
  const mockGhContributions = generateMockGrid(4);
  const mockCfSolves = generateMockGrid(4); // Codeforces Matrix

  // Green Color Logic mapping like Github
  const getGreenLevelClass = (count) => {
    if (count === 1) return 'lvl-1';
    if (count === 2) return 'lvl-2';
    if (count === 3) return 'lvl-3';
    if (count >= 4) return 'lvl-4';
    return 'lvl-0';
  };

  return (
    <section id="dashboard" className="dashboard-section">
      <div className="container">
        <h2 className="section-title">Developer Stack Boards</h2>
        <p className="section-subtitle">
          Real-time analytics boards synced with GitHub and Codeforces. Just type your handles below, it updates automatically!
        </p>

        {/* Dynamic Input Form */}
        <div className="sync-form premium-card">
          <div className="sync-inputs">
            <div className="sync-input-group">
              <label htmlFor="gh-input">GitHub Username</label>
              <input 
                id="gh-input"
                type="text" 
                value={ghUser} 
                onChange={(e) => setGhUser(e.target.value)} 
                placeholder="e.g. sakib-011"
              />
            </div>
            <div className="sync-input-group">
              <label htmlFor="cf-input">Codeforces Handle</label>
              <input 
                id="cf-input"
                type="text" 
                value={cfUser} 
                onChange={(e) => setCfUser(e.target.value)} 
                placeholder="e.g. sakib_001"
              />
            </div>
          </div>
        </div>

        {/* Boards Grid */}
        <div className="boards-grid">
          
          {/* GitHub Stack Board */}
          <div className="board-card premium-card">
            {ghLoading && <div className="board-loader">Syncing GitHub...</div>}
            <div className="board-header">
              <div className="board-header-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
                <h3>GitHub Stack Board</h3>
              </div>
              <a href={ghData.html_url || `https://github.com/${ghUser}`} target="_blank" rel="noopener noreferrer" className="board-link">
                View Profile
              </a>
            </div>

            <div className="profile-summary">
              <img src={ghData.avatar_url || 'https://github.com/identicons/guest.png'} alt={ghData.name} className="profile-avatar" />
              <div className="profile-details">
                <h4 className="profile-name">{ghData.name || ghUser}</h4>
                <p className="profile-login">@{ghUser}</p>
                <p className="profile-bio">{ghData.bio || 'No biography available.'}</p>
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat-box">
                <span className="stat-val">{ghData.public_repos || 0}</span>
                <span className="stat-label">Repositories</span>
              </div>
              <div className="stat-box">
                <span className="stat-val">
                  {ghData.followers >= 1000 ? `${(ghData.followers/1000).toFixed(1)}k` : (ghData.followers || 0)}
                </span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat-box">
                <span className="stat-val">{ghData.following || 0}</span>
                <span className="stat-label">Following</span>
              </div>
            </div>

            {/* GitHub Contributions Grid */}
            <div className="contrib-section">
              <h4 className="contrib-title">Contributions Activity</h4>
              <div className="contrib-grid-container">
                <div className="contrib-days">
                  {days.map((d, i) => <span key={i} className="day-label">{d}</span>)}
                </div>
                <div className="contrib-grid">
                  {mockGhContributions.map((row, rIdx) => (
                    <div key={rIdx} className="contrib-row">
                      {row.map((commits, cIdx) => (
                        <div 
                          key={cIdx} 
                          className={`contrib-cell ${getGreenLevelClass(commits)}`} 
                          title={`${commits} commits`}
                        ></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Codeforces Stack Board */}
          <div className="board-card premium-card">
            {cfLoading && <div className="board-loader">Syncing Codeforces...</div>}
            <div className="board-header">
              <div className="board-header-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                  <path d="M12 2v20"></path>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <h3>Codeforces Stack Board</h3>
              </div>
              <a href={`https://codeforces.com/profile/${cfData.handle}`} target="_blank" rel="noopener noreferrer" className="board-link">
                View Profile
              </a>
            </div>

            <div className="profile-summary">
              <img 
                src={cfData.avatar && cfData.avatar.startsWith('http') ? cfData.avatar : 'https://userpic.codeforces.org/no-title.jpg'} 
                alt={cfData.handle} 
                className="profile-avatar" 
              />
              <div className="profile-details">
                <h4 className="profile-name">
                  {renderCfHandle(cfData.handle, cfData.rank)}
                </h4>
                <p className="profile-rank" style={{ color: getCfRankColor(cfData.rank) }}>
                  {cfData.rank ? cfData.rank.toUpperCase() : 'NEWBIE'}
                </p>
                <p className="profile-bio">
                  {cfData.organization || 'Independent Competitive Programmer'}
                </p>
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat-box">
                <span className="stat-val" style={{ color: getCfRankColor(cfData.rank) }}>
                  {cfData.rating || 'N/A'}
                </span>
                <span className="stat-label">Rating</span>
              </div>
              <div className="stat-box">
                <span className="stat-val" style={{ color: getCfRankColor(cfData.maxRank) }}>
                  {cfData.maxRating || 'N/A'}
                </span>
                <span className="stat-label">Max Rating</span>
              </div>
              <div className="stat-box">
                <span className="stat-val">{cfData.contribution || 0}</span>
                <span className="stat-label">Contribution</span>
              </div>
            </div>

            {/* Codeforces Green Heatmap Stack (GitHub Identical look) */}
            <div className="contrib-section">
              <h4 className="contrib-title">Submissions & Solves</h4>
              <div className="contrib-grid-container">
                <div className="contrib-days">
                  {days.map((d, i) => <span key={i} className="day-label">{d}</span>)}
                </div>
                <div className="contrib-grid">
                  {mockCfSolves.map((row, rIdx) => (
                    <div key={rIdx} className="contrib-row">
                      {row.map((solves, cIdx) => (
                        <div 
                          key={cIdx} 
                          className={`contrib-cell ${getGreenLevelClass(solves)}`} 
                          title={`${solves} problems solved`}
                        ></div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="cf-rank-progress" style={{ marginTop: '15px' }}>
              <div className="rank-progress-header">
                <span>Rank Tier Progress</span>
                <span className="text-gold">{cfData.rating ? `${cfData.rating} pts` : '0 pts'}</span>
              </div>
              <div className="rank-progress-bar">
                <div 
                  className="rank-progress-fill" 
                  style={{ 
                    width: `${Math.min(100, Math.max(5, (cfData.rating || 0) / 4000 * 100))}%`,
                    backgroundColor: getCfRankColor(cfData.rank) 
                  }}
                ></div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}