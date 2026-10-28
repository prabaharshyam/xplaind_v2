import { Link, useParams } from "react-router-dom";
import { Tilt3DCard } from "../components/Tilt3DCard";
import { findRoadmap, minutesOf, topicsOf } from "../content";
import { useProgress } from "../progress";
import type { Status } from "../types";

const chip: Record<Status, string> = {
  pending: "Locked / Ready",
  learning: "⚡ Grinding",
  done: "✅ +120 XP Cleared",
  skipped: "⏭️ Skipped",
};

export default function RoadmapOverview() {
  const { slug = "" } = useParams();
  const roadmap = findRoadmap(slug);
  const { getStatus } = useProgress(slug);

  if (!roadmap) {
    return (
      <section className="container">
        <h1>Roadmap not found</h1>
        <p><Link to="/">Back to all roadmaps</Link></p>
      </section>
    );
  }

  const all = topicsOf(roadmap);
  const finished = all.filter((t) => ["done", "skipped"].includes(getStatus(t.id))).length;
  const pct = all.length ? Math.round((finished / all.length) * 100) : 0;
  const next = all.find((t) => !["done", "skipped"].includes(getStatus(t.id)));
  let counter = 0;

  return (
    <section className="container narrow">
      <Link to="/" className="muted">← Back to All 9 AI Roles</Link>
      <div className="rm-head glass-3d" style={{ padding: 24, marginTop: 14 }}>
        <span className="emoji big" aria-hidden="true">{roadmap.emoji}</span>
        <div style={{ flex: 1 }}>
          <span className="pill neon-pill">🗺️ VISUAL SKILL TREE · {all.length} MILESTONES</span>
          <h1>{roadmap.title}</h1>
          <p className="lead">{roadmap.description}</p>
          <div className="chips">
            <span className="badge neon">⚡ {all.length * 120} Total XP</span>
            <span className="badge">⏱️ ~{minutesOf(roadmap)} min total</span>
            <span className="badge">🌱 Includes Zero-Jargon Mode</span>
          </div>
        </div>
      </div>

      <div className="box glass-3d">
        <h2 className="h3">🎯 Who this track is built for</h2>
        <p>{roadmap.audience}</p>
        <h2 className="h3" style={{ marginTop: 16 }}>🛠️ Weapon Loadout (Tools you'll learn)</h2>
        <div className="chips">
          {roadmap.tools.map((t) => (
            <span key={t} className="badge neon">{t}</span>
          ))}
        </div>
      </div>

      <div className="box glass-3d">
        <h2 className="h3">🏆 Boss-Level Outcomes</h2>
        <ul className="checks">
          {roadmap.outcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </div>

      <div className="quest-progress-box glass-3d">
        <div className="progress-row">
          <strong>
            Quest Progress: {finished} / {all.length} Milestones ({pct}%)
          </strong>
          {next && (
            <Link className="btn primary small glow-btn" to={`/${roadmap.slug}/${next.id}`}>
              {finished === 0 ? "🚀 Start Milestone #1" : `⚡ Continue: ${next.title}`}
            </Link>
          )}
        </div>
        <div className="progress" aria-label={`${pct}% complete`}>
          <div className="bar" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="skill-tree">
        {roadmap.sections.map((s, sIdx) => {
          const secDone = s.topics.filter((t) => ["done", "skipped"].includes(getStatus(t.id))).length;
          return (
            <div key={s.id} className="section tree-stage">
              <div className="stage-banner">
                <span className="stage-num">STAGE 0{sIdx + 1}</span>
                <h2>{s.title}</h2>
                <span className="badge">
                  {secDone}/{s.topics.length} Cleared
                </span>
              </div>
              <ol className="topic-list tree-nodes">
                {s.topics.map((t) => {
                  counter += 1;
                  const st = getStatus(t.id);
                  return (
                    <li key={t.id} className="tree-node-item">
                      <Tilt3DCard>
                        <Link to={`/${roadmap.slug}/${t.id}`} className={`row ${st}`}>
                          <span className={`idx ${st}`}>{st === "done" ? "✓" : counter}</span>
                          <span className="row-body">
                            <strong>{t.title}</strong>
                            <span className="muted">{t.summary}</span>
                          </span>
                          <span className="row-meta">
                            <span className={`status ${st}`}>{chip[st]}</span>
                            <span className="muted">{t.minutes} min · +120 XP</span>
                          </span>
                        </Link>
                      </Tilt3DCard>
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </div>
    </section>
  );
}
