import { useEffect } from "react";
import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom";
import { CyberCanvas } from "./components/CyberCanvas";
import { InteractiveLabs } from "./components/InteractiveLabs";
import { roadmaps } from "./content";
import { usePlayerStats } from "./gamification";
import HomePage from "./pages/HomePage";
import RoadmapOverview from "./pages/RoadmapOverview";
import TopicPage from "./pages/TopicPage";
import UniversityPage from "./pages/UniversityPage";
import { downloadRoadmapChecklistPdf, printRoadmapChecklistSheet } from "./utils/roadmapPdf";

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
          {toast}
        </div>
      )}
      <header className="nav">
        <Link to="/" className="brand">
          <span className="brand-orb" aria-hidden="true" />
          Xpl<span className="ai">AI</span>ned<span className="tld">.in</span>
        </Link>

        <Link
          to={
            stats.nextTopic
              ? `/${stats.goalRoadmap.slug}/${stats.nextTopic.id}`
              : `/${stats.goalRoadmap.slug}`
          }
          className="hud-bar"
          title={`${stats.goalPct}% toward ${stats.goalRoadmap.title} (${stats.goalDone}/${stats.goalTotal} modules) · Click to continue your next step`}
        >
          <span className="hud-chip streak">{stats.streak}d Streak</span>
          <span className="hud-chip lvl">
            GOAL · {stats.goalRoadmap.title}
          </span>
          <span className="hud-chip xp">
            {stats.goalPct}% ({stats.goalDone}/{stats.goalTotal})
          </span>
          <div className="hud-progress">
            <div style={{ width: `${stats.goalPct}%` }} />
          </div>
        </Link>

        <nav>
          <NavLink to="/" end>Disciplines</NavLink>
          <NavLink to="/university">Research & Curricula</NavLink>
          <NavLink to="/arcade">Systems Workbench</NavLink>
          <NavLink to="/about">Goal Tracker</NavLink>
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
  const { stats, setActiveGoal } = usePlayerStats();
  return (
    <section className="container">
      <div className="glass-3d" style={{ padding: 28, marginBottom: 28 }}>
        <div className="finder-top" style={{ marginBottom: 10 }}>
          <span className="pill neon-pill" style={{ marginBottom: 0 }}>
            ACTIVE GOAL HORIZON & MILESTONE RECORD
          </span>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <label htmlFor="goal-select" className="muted" style={{ fontSize: 12.5, fontFamily: "var(--font-mono)" }}>
              ACTIVE TARGET ROLE:
            </label>
            <select
              id="goal-select"
              className="cyber-input"
              style={{ width: "auto", minWidth: 230, marginTop: 0, padding: "6px 10px", fontSize: 13 }}
              value={stats.goalRoadmap.slug}
              onChange={(e) => setActiveGoal(e.target.value)}
            >
              {roadmaps.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <h1 style={{ margin: "6px 0 8px" }}>
          {stats.goalPct}% Closer to <span className="ai">{stats.goalRoadmap.title}</span>
        </h1>
        <p className="lead" style={{ maxWidth: "100%" }}>
          {stats.goalDone} of {stats.goalTotal} Modules Completed · {stats.goalStagesCompleted} of {stats.goalTotalStages} Stages Cleared ·{" "}
          {stats.goalRemaining === 0
            ? "Goal Track Mastered!"
            : `${stats.goalRemaining} Modules (~${Math.ceil(stats.goalRemainingMinutes / 60)}h) Remaining to Finish`}
        </p>

        {/* Visual Stage Milestone Horizon */}
        <div className="goal-stage-strip" style={{ marginTop: 18, marginBottom: 18 }}>
          {stats.goalStages.map((stg) => (
            <div
              key={stg.index}
              className={`goal-stage-pill ${stg.isComplete ? "done" : stg.isCurrent ? "current" : ""}`}
            >
              <span className="stg-num">STAGE 0{stg.index}</span>
              <strong>{stg.title}</strong>
              <span className="stg-meta">
                {stg.done}/{stg.total} ({stg.pct}%)
              </span>
            </div>
          ))}
        </div>

        {/* Personalized Next-Step Coach Box */}
        <div className="coach-callout">
          <div className="coach-top">
            <span className="badge neon">{stats.coaching.momentumBadge}</span>
            <span className="muted" style={{ fontFamily: "var(--font-mono)", fontSize: 12 }}>
              {stats.streak}-Day Active Study Streak
            </span>
          </div>
          <h3>{stats.coaching.headline}</h3>
          <p>{stats.coaching.message}</p>
          <div className="coach-actions">
            {stats.nextTopic && (
              <Link
                to={`/${stats.goalRoadmap.slug}/${stats.nextTopic.id}`}
                className="btn primary small"
              >
                Finish Next Topic: {stats.nextTopic.title} →
              </Link>
            )}
            <button
              type="button"
              className="btn small"
              onClick={() => downloadRoadmapChecklistPdf(stats.goalRoadmap)}
            >
              ↓ Download Checklist PDF ({stats.goalRoadmap.title})
            </button>
            <button
              type="button"
              className="btn small"
              onClick={() => printRoadmapChecklistSheet(stats.goalRoadmap)}
            >
              🖨 Print Physical Tracker Sheet
            </button>
          </div>
        </div>
      </div>

      <h2 className="h2">Verified Milestones & Achievements</h2>
      <div className="grid">
        {stats.badges.map((b) => (
          <div key={b.id} className={`card badge-card ${b.unlocked ? "unlocked" : "locked"}`}>
            <div className="card-top">
              <span className="emoji">{b.icon}</span>
              <span className="badge">{b.unlocked ? "UNLOCKED" : "IN PROGRESS"}</span>
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
