import React, { useState, useEffect } from 'react';

// Fallback Anime Avatar (Goku Ultra Instinct)
const GOKU_FALLBACK = "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcT6JuIpZuPR0MlkSuM6ftmcCbHrMMtBQIXT1GrU6sYPhk_hW5KmRfN0G43jKDkDssiTXoDkmQNvHMR8xgs";

const FALLBACK_REPOS = [
  { name: 'Sakib_Portfolio', visibility: 'Public', language: 'JavaScript', updated_text: 'Updated 37 minutes ago', langColor: '#f1e05a', html_url: '#' },
  { name: 'Easy_TO_LET', visibility: 'Private', language: 'HTML', updated_text: 'Updated 3 weeks ago', langColor: '#e34c26', html_url: '#' },
  { name: 'Recon-Scanner', visibility: 'Private', language: 'Python', description: 'Recon Scanner is an automated cybersecurity tool that performs reconnaissance, endpoint discovery, technology detection, crawling, and vulnerability scanning for web targets...', updated_text: 'Updated on May 16', langColor: '#3572A5', html_url: '#' },
  { name: 'Advance_java_Final_Project_1', visibility: 'Public', language: 'Java', updated_text: 'Updated on Feb 2', langColor: '#b07219', html_url: '#' },
  { name: 'Advance_java_Final_project_2', visibility: 'Public', language: 'HTML', updated_text: 'Updated on Feb 2', langColor: '#e34c26', html_url: '#' },
  { name: 'MicroService_Customer', visibility: 'Public', language: 'Java', updated_text: 'Updated on Jan 26', langColor: '#b07219', html_url: '#' }
];

const generateSparseStaticGrid = () => {
  const grid = Array.from({ length: 7 }, () => Array(30).fill(0));
  grid[1][5] = 1; grid[2][5] = 2; grid[2][6] = 1;
  grid[5][10] = 3; grid[6][10] = 1;
  grid[3][15] = 1; grid[3][16] = 2; grid[4][16] = 1;
  grid[1][20] = 1; grid[0][25] = 2; grid[1][28] = 1;
  grid[6][29] = 2;
  return grid;
};

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

const buildGitHubGridFromEvents = (events) => {
  if (!events || events.length === 0) return generateSparseStaticGrid();
  const counts = {};
  events.forEach(ev => {
    if (ev.created_at) {
      const dateStr = ev.created_at.split('T')[0];
      counts[dateStr] = (counts[dateStr] || 0) + 1;
    }
  });

  const grid = Array.from({ length: 7 }, () => Array(30).fill(0));
  const today = new Date();
  const currentDayOfWeek = today.getDay(); 
  let daysAgo = 0;
  let hasAnyData = false;
  
  for (let col = 29; col >= 0; col--) {
    const startRow = (col === 29) ? currentDayOfWeek : 6;
    for (let row = startRow; row >= 0; row--) {
      const d = new Date();
      d.setDate(today.getDate() - daysAgo);
      const dateStr = d.toISOString().split('T')[0];
      
      const val = counts[dateStr] || 0;
      grid[row][col] = val;
      if (val > 0) hasAnyData = true;
      daysAgo++;
    }
  }
  return hasAnyData ? grid : generateSparseStaticGrid();
};

const getLangColor = (lang) => {
  const colors = { JavaScript: '#f1e05a', HTML: '#e34c26', Python: '#3572A5', Java: '#b07219', CSS: '#563d7c', TypeScript: '#3178c6', C: '#555555', 'C++': '#f34b7d' };
  return colors[lang] || '#8b949e';
};

const timeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Updated just now';
  if (diffInSeconds < 3600) return `Updated ${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `Updated ${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `Updated on ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
};

export default function StatsDashboard({ isDark = true }) {
  const [ghUser, setGhUser] = useState('sakib-011');
  const [cfUser, setCfUser] = useState('sakib_001');
  
  const [ghLoading, setGhLoading] = useState(false);
  const [cfLoading, setCfLoading] = useState(false);
  const [ghError, setGhError] = useState('');
  const [cfError, setCfError] = useState('');

  const [ghData, setGhData] = useState({
    login: 'sakib-011', name: 'Sakib', avatar_url: '', bio: 'Never compare yourself to others. You are unique and your journey is your own.', public_repos: 28, followers: 1, following: 1, html_url: 'https://github.com/sakib-011'
  });
  
  const [ghGrid, setGhGrid] = useState(generateSparseStaticGrid());
  const [cfGrid, setCfGrid] = useState(generateSparseStaticGrid());
  const [ghRepos, setGhRepos] = useState(FALLBACK_REPOS);

  const [cfData, setCfData] = useState({
    handle: 'sakib_001', rating: 840, maxRating: 1001, rank: 'Newbie', maxRank: 'Newbie', contribution: 0, organization: 'Southeast University', avatar: '', titlePhoto: ''
  });

  const theme = {
    bg: isDark ? '#0d1117' : '#f6f8fa',
    cardBg: isDark ? '#161b22' : '#ffffff',
    textMain: isDark ? '#c9d1d9' : '#24292f',
    textMuted: isDark ? '#8b949e' : '#57606a',
    border: isDark ? '#30363d' : '#d0d7de',
    accent: isDark ? '#58a6ff' : '#0969da',
    cfYellow: isDark ? '#ffd700' : '#d09f00',
    gridEmpty: isDark ? '#161b22' : '#ebedf0',
    gridL1: isDark ? '#0e4429' : '#9be9a8',
    gridL2: isDark ? '#006d32' : '#40c463',
    gridL3: isDark ? '#26a641' : '#30a14e',
    gridL4: isDark ? '#39d353' : '#216e39',
    title: isDark ? '#ffffff' : '#000000',
    inputBg: isDark ? '#0d1117' : '#ffffff',
  };

  const fetchGitHub = async (username, isActive) => {
    if (!username || !username.trim()) {
      if (isActive) {
        setGhGrid(generateSparseStaticGrid());
        setGhRepos(FALLBACK_REPOS);
      }
      return;
    }
    setGhLoading(true);
    setGhError(''); 
    try {
      const profileRes = await fetch(`https://api.github.com/users/${username}`);
      if (!profileRes.ok) throw new Error(profileRes.status === 403 ? 'Rate Limit Exceeded' : 'User Not Found');
      const pData = await profileRes.json();
      if (isActive) setGhData(pData);

      const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public`);
      if (eventsRes.ok && isActive) {
        const eventsData = await eventsRes.json();
        setGhGrid(buildGitHubGridFromEvents(eventsData));
      } else if (isActive) {
        setGhGrid(generateSparseStaticGrid());
      }

      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
      if (reposRes.ok && isActive) {
        const reposData = await reposRes.json();
        const formattedRepos = reposData.map(repo => ({
          name: repo.name, visibility: repo.private ? 'Private' : 'Public', language: repo.language || 'Markdown', description: repo.description, updated_text: timeAgo(repo.updated_at), langColor: getLangColor(repo.language), html_url: repo.html_url
        }));
        setGhRepos(formattedRepos.length > 0 ? formattedRepos : FALLBACK_REPOS);
      }
    } catch (e) {
      if (isActive) {
        setGhError(`GitHub sync failed (${e.message}).`);
        setGhGrid(generateSparseStaticGrid());
        setGhRepos(FALLBACK_REPOS);
      }
    } finally {
      if (isActive) setGhLoading(false);
    }
  };

  const fetchCodeforces = async (handle, isActive) => {
    if (!handle || !handle.trim()) {
      if (isActive) setCfGrid(generateSparseStaticGrid());
      return;
    }
    setCfLoading(true);
    setCfError('');
    try {
      const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'OK' && data.result && data.result[0] && isActive) {
          setCfData(data.result[0]);
          setCfGrid(generateMockGrid(4));
        } else if (isActive) {
          throw new Error('Handle not found');
        }
      } else {
        throw new Error('API failed');
      }
    } catch (e) {
      if (isActive) {
        setCfError('Codeforces sync failed.');
        setCfGrid(generateSparseStaticGrid());
      }
    } finally {
      if (isActive) setCfLoading(false);
    }
  };

  useEffect(() => {
    let isActive = true;
    const delayDebounceFn = setTimeout(() => { fetchGitHub(ghUser, isActive); }, 600); 
    return () => { isActive = false; clearTimeout(delayDebounceFn); };
  }, [ghUser]);

  useEffect(() => {
    let isActive = true;
    const delayDebounceFn = setTimeout(() => { fetchCodeforces(cfUser, isActive); }, 600);
    return () => { isActive = false; clearTimeout(delayDebounceFn); };
  }, [cfUser]);

  const days = ['Sun', '', 'Tue', '', 'Thu', '', 'Sat'];

  const getCfRankColor = (rank) => {
    if (!rank) return theme.textMuted;
    const r = rank.toLowerCase();
    if (r.includes('legendary') || r.includes('grandmaster') || r.includes('master')) {
      if (r.includes('candidate')) return '#aa00aa'; 
      if (r.includes('legendary')) return '#ff0000'; 
      return '#ff8c00'; 
    }
    if (r.includes('expert')) return '#0000ff'; 
    if (r.includes('specialist')) return '#03a89e'; 
    if (r.includes('pupil')) return '#008000'; 
    return theme.textMuted; 
  };

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

  return (
    <section id="dashboard" className="dashboard-section" style={{ 
      backgroundColor: theme.bg, 
      padding: 'max(4vw, 20px) 20px', 
      minHeight: '100vh', 
      color: theme.textMain, 
      fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif', 
      transition: 'background-color 0.3s ease, color 0.3s ease',
      boxSizing: 'border-box'
    }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <h2 className="section-title" style={{ textAlign: 'center', color: theme.title, marginBottom: '10px', fontSize: 'clamp(24px, 5vw, 32px)' }}>Developer Stack Boards</h2>
        <p className="section-subtitle" style={{ textAlign: 'center', color: theme.textMuted, marginBottom: '40px', fontSize: 'clamp(14px, 3vw, 16px)' }}>
          Real-time analytics boards synced with GitHub and Codeforces.
        </p>

        {/* Dynamic Input Form */}
        <div className="sync-form premium-card" style={{ 
          backgroundColor: theme.cardBg, 
          padding: '20px', 
          borderRadius: '12px', 
          marginBottom: '40px', 
          border: `1px solid ${theme.border}`, 
          transition: 'all 0.3s ease' 
        }}>
          <div className="sync-inputs" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div className="sync-input-group" style={{ flex: '1 1 min(100%, 250px)' }}>
              <label htmlFor="gh-input" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: theme.textMain }}>GitHub Username</label>
              <input 
                id="gh-input"
                type="text" 
                value={ghUser} 
                onChange={(e) => setGhUser(e.target.value)} 
                placeholder="Search a user (e.g. sakib-011)"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: `1px solid ${theme.border}`, backgroundColor: theme.inputBg, color: theme.textMain, boxSizing: 'border-box' }}
              />
            </div>
            <div className="sync-input-group" style={{ flex: '1 1 min(100%, 250px)' }}>
              <label htmlFor="cf-input" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: theme.textMain }}>Codeforces Handle</label>
              <input 
                id="cf-input"
                type="text" 
                value={cfUser} 
                onChange={(e) => setCfUser(e.target.value)} 
                placeholder="Search a handle (e.g. sakib_001)"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: `1px solid ${theme.border}`, backgroundColor: theme.inputBg, color: theme.textMain, boxSizing: 'border-box' }}
              />
            </div>
          </div>
        </div>

        {/* Boards Grid */}
        <div className="boards-grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', 
          gap: '30px' 
        }}>
          
          {/* GitHub Stack Board */}
          <div className="board-card premium-card" style={{ backgroundColor: theme.cardBg, borderRadius: '12px', border: `1px solid ${theme.border}`, overflow: 'hidden', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '20px', borderBottom: `1px solid ${theme.border}`, flex: '1' }}>
              {ghLoading && <div style={{ color: theme.accent, marginBottom: '10px', fontSize: '14px' }}>Syncing GitHub...</div>}
              {ghError && <div style={{ color: '#f85149', marginBottom: '10px', fontSize: '14px' }}>{ghError}</div>}
              
              <div className="board-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2ea043" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                  <h3 style={{ margin: 0, color: theme.title, fontSize: '18px' }}>GitHub Stack</h3>
                </div>
                <a href={ghData.html_url || `https://github.com/${ghData.login}`} target="_blank" rel="noopener noreferrer" style={{ color: theme.accent, textDecoration: 'none', fontSize: '14px', whiteSpace: 'nowrap' }}>
                  View Profile
                </a>
              </div>

              <div className="profile-summary" style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', marginBottom: '20px' }}>
                <img 
                  src={ghData.avatar_url || GOKU_FALLBACK} 
                  alt={ghData.name} 
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                  onError={(e) => { e.target.src = GOKU_FALLBACK; }} 
                />
                <div style={{ wordBreak: 'break-word' }}>
                  <h4 style={{ margin: '0 0 4px 0', color: theme.title, fontSize: 'clamp(16px, 4vw, 18px)' }}>{ghData.name || ghData.login}</h4>
                  <p style={{ margin: '0 0 8px 0', color: theme.textMuted, fontSize: '14px' }}>@{ghData.login}</p>
                  <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.4', color: theme.textMain }}>{ghData.bio || 'No biography available.'}</p>
                </div>
              </div>

              <div className="profile-stats" style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', borderTop: `1px solid ${theme.border}`, paddingTop: '15px' }}>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontWeight: 'bold', color: theme.title, fontSize: '18px' }}>{ghData.public_repos || 0}</div>
                  <div style={{ color: theme.textMuted, fontSize: '12px' }}>Repos</div>
                </div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontWeight: 'bold', color: theme.title, fontSize: '18px' }}>
                    {ghData.followers >= 1000 ? `${(ghData.followers/1000).toFixed(1)}k` : (ghData.followers || 0)}
                  </div>
                  <div style={{ color: theme.textMuted, fontSize: '12px' }}>Followers</div>
                </div>
                <div style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{ fontWeight: 'bold', color: theme.title, fontSize: '18px' }}>{ghData.following || 0}</div>
                  <div style={{ color: theme.textMuted, fontSize: '12px' }}>Following</div>
                </div>
              </div>
            </div>

            <div className="contrib-section" style={{ padding: '20px', width: '100%', boxSizing: 'border-box' }}>
              <h4 style={{ margin: '0 0 15px 0', fontSize: '14px', color: theme.title }}>Contributions Activity</h4>
              
              {/* Force Full Stack To Fit Horizontally */}
              <div style={{ display: 'flex', gap: 'min(8px, 2vw)', width: '100%' }}>
                {/* Y-Axis Days Label */}
                <div style={{ display: 'grid', gridTemplateRows: 'repeat(7, 1fr)', gap: 'clamp(1px, 0.5vw, 3px)', color: theme.textMuted }}>
                  {days.map((d, i) => (
                    <span key={i} style={{ display: 'flex', alignItems: 'center', fontSize: 'clamp(9px, 2vw, 11px)' }}>
                      {d}
                    </span>
                  ))}
                </div>
                
                {/* Grid Cells Wrapper - minmax(0, 1fr) strictly forces it to fit without scrolling */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(30, minmax(0, 1fr))', gap: 'clamp(1px, 0.5vw, 3px)', flex: 1, width: '100%' }}>
                  {ghGrid.map((row, rIdx) => (
                    <React.Fragment key={rIdx}>
                      {row.map((commits, cIdx) => {
                        let bg = theme.gridEmpty;
                        if (commits === 1) bg = theme.gridL1;
                        else if (commits === 2) bg = theme.gridL2;
                        else if (commits === 3) bg = theme.gridL3;
                        else if (commits >= 4) bg = theme.gridL4;
                        
                        return (
                          <div 
                            key={`${rIdx}-${cIdx}`} 
                            style={{ 
                              width: '100%', 
                              aspectRatio: '1 / 1', 
                              backgroundColor: bg, 
                              borderRadius: '2px', 
                              gridRow: rIdx + 1, 
                              gridColumn: cIdx + 1, 
                              transition: 'background-color 0.3s ease' 
                            }}
                            title={`${commits} contributions`}
                          ></div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Codeforces Stack Board */}
          <div className="board-card premium-card" style={{ backgroundColor: theme.cardBg, borderRadius: '12px', border: `1px solid ${theme.border}`, padding: '20px', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease' }}>
            {cfLoading && <div style={{ color: theme.cfYellow, marginBottom: '10px', fontSize: '14px' }}>Syncing Codeforces...</div>}
            {cfError && <div style={{ color: '#f85149', marginBottom: '10px', fontSize: '14px' }}>{cfError}</div>}

            <div className="board-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={theme.cfYellow} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20"></path>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <h3 style={{ margin: 0, color: theme.title, fontSize: '18px' }}>Codeforces Stack</h3>
              </div>
              <a href={`https://codeforces.com/profile/${cfData.handle}`} target="_blank" rel="noopener noreferrer" style={{ color: theme.accent, textDecoration: 'none', fontSize: '14px', whiteSpace: 'nowrap' }}>
                View Profile
              </a>
            </div>

            <div className="profile-summary" style={{ display: 'flex', alignItems: 'flex-start', gap: '15px', marginBottom: '20px', flex: '1' }}>
              <img 
                src={cfData.titlePhoto || cfData.avatar || GOKU_FALLBACK} 
                alt={cfData.handle} 
                style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                onError={(e) => { e.target.src = GOKU_FALLBACK; }} 
              />
              <div style={{ wordBreak: 'break-word' }}>
                <h4 style={{ margin: '0 0 4px 0', fontSize: 'clamp(16px, 4vw, 18px)', color: theme.title }}>
                  {renderCfHandle(cfData.handle, cfData.rank)}
                </h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold', color: getCfRankColor(cfData.rank) }}>
                  {cfData.rank ? cfData.rank.toUpperCase() : 'NEWBIE'}
                </p>
                <p style={{ margin: 0, fontSize: '13px', color: theme.textMain }}>
                  {cfData.organization || 'Independent Competitive Programmer'}
                </p>
              </div>
            </div>

            <div className="profile-stats" style={{ display: 'flex', gap: '10px', justifyContent: 'space-between', borderTop: `1px solid ${theme.border}`, paddingTop: '15px', marginBottom: '20px' }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '18px', color: getCfRankColor(cfData.rank) }}>
                  {cfData.rating || 'N/A'}
                </div>
                <div style={{ color: theme.textMuted, fontSize: '12px' }}>Rating</div>
              </div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontWeight: 'bold', fontSize: '18px', color: getCfRankColor(cfData.maxRank) }}>
                  {cfData.maxRating || 'N/A'}
                </div>
                <div style={{ color: theme.textMuted, fontSize: '12px' }}>Max Rating</div>
              </div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div style={{ fontWeight: 'bold', color: theme.title, fontSize: '18px' }}>{cfData.contribution || 0}</div>
                <div style={{ color: theme.textMuted, fontSize: '12px' }}>Contribution</div>
              </div>
            </div>

            <div className="contrib-section" style={{ marginBottom: '20px', width: '100%', boxSizing: 'border-box' }}>
              <h4 style={{ margin: '0 0 15px 0', fontSize: '14px', color: theme.title }}>Submissions & Solves</h4>
              
              {/* Force Full Stack To Fit Horizontally */}
              <div style={{ display: 'flex', gap: 'min(8px, 2vw)', width: '100%' }}>
                {/* Y-Axis Days Label */}
                <div style={{ display: 'grid', gridTemplateRows: 'repeat(7, 1fr)', gap: 'clamp(1px, 0.5vw, 3px)', color: theme.textMuted }}>
                  {days.map((d, i) => (
                    <span key={i} style={{ display: 'flex', alignItems: 'center', fontSize: 'clamp(9px, 2vw, 11px)' }}>
                      {d}
                    </span>
                  ))}
                </div>
                
                {/* Grid Cells Wrapper - minmax(0, 1fr) strictly forces it to fit without scrolling */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(30, minmax(0, 1fr))', gap: 'clamp(1px, 0.5vw, 3px)', flex: 1, width: '100%' }}>
                  {cfGrid.map((row, rIdx) => (
                    <React.Fragment key={rIdx}>
                      {row.map((solves, cIdx) => {
                        let bg = theme.gridEmpty;
                        if (solves === 1) bg = theme.gridL1;
                        else if (solves === 2) bg = theme.gridL2;
                        else if (solves === 3) bg = theme.gridL3;
                        else if (solves >= 4) bg = theme.gridL4;
                        
                        return (
                          <div 
                            key={`${rIdx}-${cIdx}`} 
                            style={{ 
                              width: '100%', 
                              aspectRatio: '1 / 1', 
                              backgroundColor: bg, 
                              borderRadius: '2px', 
                              gridRow: rIdx + 1, 
                              gridColumn: cIdx + 1, 
                              transition: 'background-color 0.3s ease' 
                            }}
                            title={`${solves} problems solved`}
                          ></div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            <div className="cf-rank-progress">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                <span style={{ color: theme.textMuted }}>Rank Tier Progress</span>
                <span style={{ color: theme.cfYellow, fontWeight: 'bold' }}>{cfData.rating ? `${cfData.rating} pts` : '0 pts'}</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: theme.gridEmpty, borderRadius: '4px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    height: '100%',
                    width: `${Math.min(100, Math.max(5, (cfData.rating || 0) / 4000 * 100))}%`,
                    backgroundColor: getCfRankColor(cfData.rank),
                    transition: 'width 0.5s ease-in-out'
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