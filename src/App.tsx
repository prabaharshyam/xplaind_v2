import { useEffect } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { CyberCanvas } from "./components/CyberCanvas";
import { InteractiveLabs } from "./components/InteractiveLabs";
import { usePlayerStats } from "./gamification";
import HomePage from "./pages/HomePage";
import RoadmapOverview from "./pages/RoadmapOverview";
import TopicPage from "./pages/TopicPage";
import UniversityPage from "./pages/UniversityPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { stats, toast } = usePlayerStats();

  return (
    <>
      <CyberCanvas />
      <ScrollToTop />
      {toast && (
        <div className="xp-toast" role="status">
          ⚡ +{toast} XP UNLOCKED!
        </div>
      )}
      <header className="nav">
        <Link to="/" className="brand">
          <span className="brand-orb" aria-hidden="true" />
          Xpl<span className="ai">AI</span>ned<span className="tld">.in</span>
        </Link>

        <div className="hud-bar" title={`${stats.xp} XP · Next level at ${stats.nextLevelXp} XP`}>
          <span className="hud-chip streak">🔥 {stats.streak}d Streak</span>
          <span className="hud-chip lvl">
            LVL {stats.level} · {stats.rank}
          </span>
          <span className="hud-chip xp">⚡ {stats.xp} XP</span>
          <div className="hud-progress">
            <div style={{ width: `${stats.currentLevelProgress}%` }} />
          </div>
        </div>

        <nav>
          <NavLink to="/" end>🎮 Roles</NavLink>
          <NavLink to="/university">🎓 AI University & Library</NavLink>
          <NavLink to="/arcade">🕹️ AI Arcade</NavLink>
          <NavLink to="/about">🏆 Profile & Badges</NavLink>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/university" element={<UniversityPage />} />
          <Route path="/arcade" element={<ArcadePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/:slug" element={<RoadmapOverview />} />
          <Route path="/:slug/:topicId" element={<TopicPage />} />
        </Routes>
      </main>
      <footer className="footer">
        <div>© {new Date().getFullYear()} XplAIned.in — The One-Stop AI University: 9 Career Roadmaps, 78 Deep-Dive Textbooks, MNC Academies, Top YouTube Masterclasses & Live AI Labs.</div>
      </footer>
    </>
  );
}

function ArcadePage() {
  return (
    <section className="container">
      <div className="hero" style={{ paddingTop: 18, paddingBottom: 24 }}>
        <span className="pill neon-pill">⚡ HANDS-ON AI SANDBOX</span>
        <h1>
          The <span className="ai">AI Arcade</span>
        </h1>
        <p className="lead">
          Don't just read about AI — play with prompts, inspect live token costs, and step inside an autonomous
          agent loop to rack up bonus XP.
        </p>
      </div>
      <InteractiveLabs />
    </section>
  );
}

function About() {
  const { stats } = usePlayerStats();
  return (
    <section className="container">
      <div className="glass-3d" style={{ padding: 28, marginBottom: 28 }}>
        <span className="pill neon-pill">👑 PLAYER PASSPORT</span>
        <h1 style={{ margin: "8px 0 6px" }}>
          Level {stats.level} · <span className="ai">{stats.rank}</span>
        </h1>
        <p className="lead">
          {stats.xp} Total XP · {stats.completedTopics} Milestones Cleared · {stats.streak}-Day Learning Streak
        </p>
        <div className="progress" style={{ height: 12 }}>
          <div className="bar" style={{ width: `${stats.currentLevelProgress}%` }} />
        </div>
        <p className="muted" style={{ marginTop: 8 }}>
          {350 - (stats.xp % 350)} XP until Level {stats.level + 1}
        </p>
      </div>

      <h2 className="h2">🏆 Achievement Badges</h2>
      <div className="grid">
        {stats.badges.map((b) => (
          <div key={b.id} className={`card badge-card ${b.unlocked ? "unlocked" : "locked"}`}>
            <div className="card-top">
              <span className="emoji">{b.icon}</span>
              <span className="badge">{b.unlocked ? "UNLOCKED" : "LOCKED"}</span>
            </div>
            <h3>{b.title}</h3>
            <p>{b.desc}</p>
          </div>
        ))}
      </div>

      <div className="box" style={{ marginTop: 32 }}>
        <h2 className="h3">Why we built XplAIned.in</h2>
        <p>
          XplAIned.in solves the 6 biggest roadblocks in learning AI: figuring out where to start, knowing what
          matters, getting clear milestones, having a zero-jargon "Explain Like I'm 15" mode, welcoming
          non-coders, and mapping directly to the 9 hottest AI career roles.
        </p>
        <p className="muted">
          Laws, standards and tools evolve quickly — verify official sources for compliance rules. All progress
          is stored locally on your device.
        </p>
      </div>
    </section>
  );
}
