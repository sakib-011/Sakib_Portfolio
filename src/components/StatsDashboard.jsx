import React, { useState, useEffect } from 'react';

// Fallback Anime Avatar (Goku Ultra Instinct)
const GOKU_FALLBACK = "https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcT6JuIpZuPR0MlkSuM6ftmcCbHrMMtBQIXT1GrU6sYPhk_hW5KmRfN0G43jKDkDssiTXoDkmQNvHMR8xgs";

// Fallback Repositories
const FALLBACK_REPOS = [
  { name: 'Sakib_Portfolio', visibility: 'Public', language: 'JavaScript', updated_text: 'Updated 37 minutes ago', langColor: '#f1e05a', html_url: '#' },
  { name: 'Easy_TO_LET', visibility: 'Private', language: 'HTML', updated_text: 'Updated 3 weeks ago', langColor: '#e34c26', html_url: '#' },
  { name: 'Recon-Scanner', visibility: 'Private', language: 'Python', description: 'Recon Scanner is an automated cybersecurity tool that performs reconnaissance, endpoint discovery, technology detection, crawling, and vulnerability scanning for web targets. It integrates tools li...', updated_text: 'Updated on May 16', langColor: '#3572A5', html_url: '#' },
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

export default function StatsDashboard() {
  // FIXED: Set initial states to empty strings so fallback data is preserved on mount
  const [ghUser, setGhUser] = useState('sakib-011');
  const [cfUser, setCfUser] = useState('sakib_001');
  
  const [ghLoading, setGhLoading] = useState(false);
  const [cfLoading, setCfLoading] = useState(false);

  const [ghError, setGhError] = useState('');
  const [cfError, setCfError] = useState('');

  // Fallback GitHub Profile Data
  const [ghData, setGhData] = useState({
    login: 'sakib-011',
    name: 'Sakib',
    avatar_url: '',
    bio: 'Never compare yourself to others. You are unique and your journey is your own.',
    public_repos: 28,
    followers: 1,
    following: 1,
    html_url: 'https://github.com/sakib-011'
  });
  
  const [ghGrid, setGhGrid] = useState(generateSparseStaticGrid());
  const [cfGrid, setCfGrid] = useState(generateSparseStaticGrid());
  
  // State for repositories defaults to your hardcoded list
  const [ghRepos, setGhRepos] = useState(FALLBACK_REPOS);

  // Fallback Codeforces Profile Data
  const [cfData, setCfData] = useState({
    handle: 'sakib_001',
    rating: 840,
    maxRating: 1001,
    rank: 'Newbie',
    maxRank: 'Newbie',
    contribution: 0,
    organization: 'Southeast University',
    avatar: ''
  });

  const fetchGitHub = async (username) => {
    if (!username || !username.trim()) {
      // If input is empty, maintain the fallback grid and repos
      setGhGrid(generateSparseStaticGrid());
      setGhRepos(FALLBACK_REPOS);
      return;
    }
    setGhLoading(true);
    setGhError(''); 
    try {
      const profileRes = await fetch(`https://api.github.com/users/${username}`);
      if (profileRes.ok) {
        setGhData(await profileRes.json());
      } else {
        throw new Error(profileRes.status === 403 ? 'Rate Limit Exceeded' : 'User Not Found');
      }

      const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public`);
      if (eventsRes.ok) {
        const eventsData = await eventsRes.json();
        setGhGrid(buildGitHubGridFromEvents(eventsData));
      } else {
        setGhGrid(generateSparseStaticGrid());
      }

      const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
      if (reposRes.ok) {
        const reposData = await reposRes.json();
        const formattedRepos = reposData.map(repo => ({
          name: repo.name,
          visibility: repo.private ? 'Private' : 'Public',
          language: repo.language || 'Markdown',
          description: repo.description,
          updated_text: timeAgo(repo.updated_at),
          langColor: getLangColor(repo.language),
          html_url: repo.html_url
        }));
        setGhRepos(formattedRepos.length > 0 ? formattedRepos : FALLBACK_REPOS);
      } else {
        setGhRepos(FALLBACK_REPOS);
      }
      
    } catch (e) {
      setGhError(`GitHub sync failed (${e.message}). Showing offline fallback data.`);
      setGhGrid(generateSparseStaticGrid());
      setGhRepos(FALLBACK_REPOS);
    } finally {
      setGhLoading(false);
    }
  };

  const fetchCodeforces = async (handle) => {
    if (!handle || !handle.trim()) {
      // If input is empty, maintain the fallback grid
      setCfGrid(generateSparseStaticGrid());
      return;
    }
    setCfLoading(true);
    setCfError('');
    try {
      const response = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
      if (response.ok) {
        const data = await response.json();
        if (data.status === 'OK' && data.result && data.result[0]) {
          setCfData(data.result[0]);
          setCfGrid(generateMockGrid(4));
        } else {
          throw new Error('Handle not found');
        }
      } else {
        throw new Error('API failed');
      }
    } catch (e) {
      setCfError('Codeforces sync failed. Showing offline fallback data.');
      setCfGrid(generateSparseStaticGrid());
    } finally {
      setCfLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => { fetchGitHub(ghUser); }, 600); 
    return () => clearTimeout(delayDebounceFn);
  }, [ghUser]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => { fetchCodeforces(cfUser); }, 600);
    return () => clearTimeout(delayDebounceFn);
  }, [cfUser]);

  const days = ['Sun', '', 'Tue', '', 'Thu', '', 'Sat'];

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
    <section id="dashboard" className="dashboard-section" style={{ backgroundColor: '#0d1117', padding: '40px 20px', minHeight: '100vh', color: '#c9d1d9', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 className="section-title" style={{ textAlign: 'center', color: '#fff', marginBottom: '10px' }}>Developer Stack Boards</h2>
        <p className="section-subtitle" style={{ textAlign: 'center', color: '#8b949e', marginBottom: '40px' }}>
          Real-time analytics boards synced with GitHub and Codeforces.
        </p>

        {/* Dynamic Input Form */}
        <div className="sync-form premium-card" style={{ backgroundColor: '#161b22', padding: '20px', borderRadius: '12px', marginBottom: '40px', border: '1px solid #30363d' }}>
          <div className="sync-inputs" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div className="sync-input-group" style={{ flex: '1', minWidth: '250px' }}>
              <label htmlFor="gh-input" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>GitHub Username</label>
              <input 
                id="gh-input"
                type="text" 
                value={ghUser} 
                onChange={(e) => setGhUser(e.target.value)} 
                placeholder="Search a user (e.g. sakib-011)"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: '#c9d1d9' }}
              />
            </div>
            <div className="sync-input-group" style={{ flex: '1', minWidth: '250px' }}>
              <label htmlFor="cf-input" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600' }}>Codeforces Handle</label>
              <input 
                id="cf-input"
                type="text" 
                value={cfUser} 
                onChange={(e) => setCfUser(e.target.value)} 
                placeholder="Search a handle (e.g. sakib_001)"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: '#c9d1d9' }}
              />
            </div>
          </div>
        </div>

        {/* Boards Grid */}
        <div className="boards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
          
          {/* GitHub Stack Board */}
          <div className="board-card premium-card" style={{ backgroundColor: '#161b22', borderRadius: '12px', border: '1px solid #30363d', overflow: 'hidden' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #30363d' }}>
              {ghLoading && <div style={{ color: '#58a6ff', marginBottom: '10px', fontSize: '14px' }}>Syncing GitHub...</div>}
              {ghError && <div style={{ color: '#f85149', marginBottom: '10px', fontSize: '14px' }}>{ghError}</div>}
              
              <div className="board-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2ea043" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                    <path d="M9 18c-4.51 2-5-2-7-2"></path>
                  </svg>
                  <h3 style={{ margin: 0, color: '#fff', fontSize: '18px' }}>GitHub Stack</h3>
                </div>
                <a href={ghData.html_url || `https://github.com/${ghData.login}`} target="_blank" rel="noopener noreferrer" style={{ color: '#58a6ff', textDecoration: 'none', fontSize: '14px' }}>
                  View Profile
                </a>
              </div>

              <div className="profile-summary" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                <img 
                  src={ghData.avatar_url || GOKU_FALLBACK} 
                  alt={ghData.name} 
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = GOKU_FALLBACK; }} 
                />
                <div>
                  <h4 style={{ margin: '0 0 4px 0', color: '#fff', fontSize: '18px' }}>{ghData.name || ghData.login}</h4>
                  <p style={{ margin: '0 0 8px 0', color: '#8b949e', fontSize: '14px' }}>@{ghData.login}</p>
                  <p style={{ margin: 0, fontSize: '13px', lineHeight: '1.4', color: '#c9d1d9' }}>{ghData.bio || 'No biography available.'}</p>
                </div>
              </div>

              <div className="profile-stats" style={{ display: 'flex', gap: '20px', borderTop: '1px solid #30363d', paddingTop: '15px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '18px' }}>{ghData.public_repos || 0}</div>
                  <div style={{ color: '#8b949e', fontSize: '12px' }}>Repos</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '18px' }}>
                    {ghData.followers >= 1000 ? `${(ghData.followers/1000).toFixed(1)}k` : (ghData.followers || 0)}
                  </div>
                  <div style={{ color: '#8b949e', fontSize: '12px' }}>Followers</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '18px' }}>{ghData.following || 0}</div>
                  <div style={{ color: '#8b949e', fontSize: '12px' }}>Following</div>
                </div>
              </div>
            </div>

            {/* Repositories List Section
            <div style={{ padding: '0 20px' }}>
              {ghRepos.map((repo, idx) => (
                <div key={idx} style={{ padding: '16px 0', borderBottom: '1px solid #30363d', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, paddingRight: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <a href={repo.html_url} style={{ color: '#58a6ff', fontSize: '15px', fontWeight: '600', textDecoration: 'none', wordBreak: 'break-all' }}>
                        {repo.name}
                      </a>
                      <span style={{ fontSize: '12px', color: '#8b949e', border: '1px solid #30363d', borderRadius: '2em', padding: '1px 7px', whiteSpace: 'nowrap' }}>
                        {repo.visibility}
                      </span>
                    </div>
                    {repo.description && (
                      <p style={{ color: '#8b949e', fontSize: '12px', margin: '4px 0 10px 0', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {repo.description}
                      </p>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', color: '#8b949e' }}>
                      {repo.language && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: repo.langColor }}></span>
                          {repo.language}
                        </span>
                      )}
                      <span>{repo.updated_text}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', height: '100%', gap: '15px' }}>
                    <button style={{ backgroundColor: '#21262d', color: '#c9d1d9', border: '1px solid rgba(240,246,252,0.1)', padding: '4px 12px', borderRadius: '6px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"></path></svg>
                      Star
                    </button>
                    <svg width="50" height="15" viewBox="0 0 50 15" stroke="#2ea043" fill="none" strokeWidth="1.5">
                      <path d="M0 13 Q 5 13, 10 13 T 20 12 T 30 13 T 40 10 T 50 2" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
              ))}
            </div> */}

            {/* GitHub Data in CSS Grid Layout */}
            <div className="contrib-section" style={{ padding: '20px' }}>
              <h4 style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#fff' }}>Contributions Activity</h4>
              <div style={{ overflowX: 'auto' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '10px', color: '#8b949e', paddingRight: '5px' }}>
                    {days.map((d, i) => <span key={i} style={{ height: '11px', lineHeight: '11px' }}>{d}</span>)}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(30, 11px)', gap: '3px' }}>
                    {ghGrid.map((row, rIdx) => (
                      <React.Fragment key={rIdx}>
                        {row.map((commits, cIdx) => {
                          let bg = '#161b22';
                          if (commits === 1) bg = '#0e4429';
                          else if (commits === 2) bg = '#006d32';
                          else if (commits === 3) bg = '#26a641';
                          else if (commits >= 4) bg = '#39d353';
                          
                          return (
                            <div 
                              key={`${rIdx}-${cIdx}`} 
                              style={{ width: '11px', height: '11px', backgroundColor: bg, borderRadius: '2px', gridRow: rIdx + 1, gridColumn: cIdx + 1 }}
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
          </div>

          {/* Codeforces Stack Board */}
          <div className="board-card premium-card" style={{ backgroundColor: '#161b22', borderRadius: '12px', border: '1px solid #30363d', padding: '20px', height: 'fit-content' }}>
            {cfLoading && <div style={{ color: '#ffd700', marginBottom: '10px', fontSize: '14px' }}>Syncing Codeforces...</div>}
            {cfError && <div style={{ color: '#f85149', marginBottom: '10px', fontSize: '14px' }}>{cfError}</div>}

            <div className="board-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ffd700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20"></path>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <h3 style={{ margin: 0, color: '#fff', fontSize: '18px' }}>Codeforces Stack</h3>
              </div>
              <a href={`https://codeforces.com/profile/${cfData.handle}`} target="_blank" rel="noopener noreferrer" style={{ color: '#58a6ff', textDecoration: 'none', fontSize: '14px' }}>
                View Profile
              </a>
            </div>

            <div className="profile-summary" style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <img 
                src={GOKU_FALLBACK} 
                alt={cfData.handle} 
                style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '18px' }}>
                  {renderCfHandle(cfData.handle, cfData.rank)}
                </h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 'bold', color: getCfRankColor(cfData.rank) }}>
                  {cfData.rank ? cfData.rank.toUpperCase() : 'NEWBIE'}
                </p>
                <p style={{ margin: 0, fontSize: '13px', color: '#c9d1d9' }}>
                  {cfData.organization || 'Independent Competitive Programmer'}
                </p>
              </div>
            </div>

            <div className="profile-stats" style={{ display: 'flex', gap: '20px', borderTop: '1px solid #30363d', paddingTop: '15px', marginBottom: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 'bold', fontSize: '18px', color: getCfRankColor(cfData.rank) }}>
                  {cfData.rating || 'N/A'}
                </div>
                <div style={{ color: '#8b949e', fontSize: '12px' }}>Rating</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 'bold', fontSize: '18px', color: getCfRankColor(cfData.maxRank) }}>
                  {cfData.maxRating || 'N/A'}
                </div>
                <div style={{ color: '#8b949e', fontSize: '12px' }}>Max Rating</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 'bold', color: '#fff', fontSize: '18px' }}>{cfData.contribution || 0}</div>
                <div style={{ color: '#8b949e', fontSize: '12px' }}>Contribution</div>
              </div>
            </div>

            <div className="contrib-section" style={{ marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#fff' }}>Submissions & Solves</h4>
              <div style={{ overflowX: 'auto' }}>
                <div style={{ display: 'flex', gap: '5px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', fontSize: '10px', color: '#8b949e', paddingRight: '5px' }}>
                    {days.map((d, i) => <span key={i} style={{ height: '11px', lineHeight: '11px' }}>{d}</span>)}
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(30, 11px)', gap: '3px' }}>
                    {cfGrid.map((row, rIdx) => (
                      <React.Fragment key={rIdx}>
                        {row.map((solves, cIdx) => {
                          let bg = '#161b22';
                          if (solves === 1) bg = '#0e4429';
                          else if (solves === 2) bg = '#006d32';
                          else if (solves === 3) bg = '#26a641';
                          else if (solves >= 4) bg = '#39d353';
                          
                          return (
                            <div 
                              key={`${rIdx}-${cIdx}`} 
                              style={{ width: '11px', height: '11px', backgroundColor: bg, borderRadius: '2px', gridRow: rIdx + 1, gridColumn: cIdx + 1 }}
                              title={`${solves} problems solved`}
                            ></div>
                          );
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="cf-rank-progress">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '8px' }}>
                <span style={{ color: '#8b949e' }}>Rank Tier Progress</span>
                <span style={{ color: '#ffd700', fontWeight: 'bold' }}>{cfData.rating ? `${cfData.rating} pts` : '0 pts'}</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#21262d', borderRadius: '4px', overflow: 'hidden' }}>
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