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
          +{toast} COMPETENCY CREDITS RECORDED
        </div>
      )}
      <header className="nav">
        <Link to="/" className="brand">
          <span className="brand-orb" aria-hidden="true" />
          Xpl<span className="ai">AI</span>ned<span className="tld">.in</span>
        </Link>

        <div className="hud-bar" title={`${stats.xp} Credits · Next tier at ${stats.nextLevelXp} Credits`}>
          <span className="hud-chip streak">{stats.streak}d Cadence</span>
          <span className="hud-chip lvl">
            TIER 0{stats.level} · {stats.rank}
          </span>
          <span className="hud-chip xp">{stats.xp} CR</span>
          <div className="hud-progress">
            <div style={{ width: `${stats.currentLevelProgress}%` }} />
          </div>
        </div>

        <nav>
          <NavLink to="/" end>Disciplines</NavLink>
          <NavLink to="/university">Research & Curricula</NavLink>
          <NavLink to="/arcade">Systems Workbench</NavLink>
          <NavLink to="/about">Practitioner Record</NavLink>
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
        <div>© {new Date().getFullYear()} XplAIned.in — Technical Curricula, Systems Architecture Specifications & Empirical Benchmarks for Applied AI Engineering.</div>
      </footer>
    </>
  );
}

function ArcadePage() {
  return (
    <section className="container">
      <div className="hero" style={{ paddingTop: 18, paddingBottom: 24 }}>
        <span className="pill neon-pill">INTERACTIVE TELEMETRY WORKBENCH</span>
        <h1>
          Applied <span className="ai">Systems Workbench</span>
        </h1>
        <p className="lead">
          Validate prompt specifications against deterministic constraints, model API token economics at scale,
          and inspect multi-step ReAct agent execution traces.
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
        <span className="pill neon-pill">PRACTITIONER CREDENTIAL RECORD</span>
        <h1 style={{ margin: "8px 0 6px" }}>
          Tier 0{stats.level} · <span className="ai">{stats.rank}</span>
        </h1>
        <p className="lead">
          {stats.xp} Competency Credits · {stats.completedTopics} Specifications Completed · {stats.streak}-Day Active Cadence
        </p>
        <div className="progress" style={{ height: 8 }}>
          <div className="bar" style={{ width: `${stats.currentLevelProgress}%` }} />
        </div>
        <p className="muted" style={{ marginTop: 8 }}>
          {350 - (stats.xp % 350)} Credits required for Tier 0{stats.level + 1}
        </p>
      </div>

      <h2 className="h2">Verified Milestones & Credentials</h2>
      <div className="grid">
        {stats.badges.map((b) => (
          <div key={b.id} className={`card badge-card ${b.unlocked ? "unlocked" : "locked"}`}>
            <div className="card-top">
              <span className="emoji">{b.icon}</span>
              <span className="badge">{b.unlocked ? "VERIFIED" : "PENDING"}</span>
            </div>
            <h3>{b.title}</h3>
            <p>{b.desc}</p>
          </div>
        ))}
      </div>

      <div className="box" style={{ marginTop: 32 }}>
        <h2 className="h3">Editorial Standard & Methodology</h2>
        <p>
          XplAIned.in is an engineering reference and curriculum platform built for software engineers, technical
          product leaders, and applied researchers. Every topic combines systems-level analysis, reference
          architectures, operational playbooks, empirical case studies, and strictly vetted primary documentation.
        </p>
        <p className="muted">
          Regulatory frameworks (EU AI Act, NIST AI RMF, ISO/IEC 42001) and model capabilities evolve rapidly;
          always consult primary legal and vendor documentation for production compliance. Progress is persisted
          locally in your browser.
        </p>
      </div>
    </section>
  );
}
