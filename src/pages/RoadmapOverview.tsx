import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Tilt3DCard } from "../components/Tilt3DCard";
import { findRoadmap, minutesOf, topicsOf } from "../content";
import { setStoredGoalSlug, useProgress } from "../progress";
import type { Status } from "../types";
import { downloadRoadmapChecklistPdf, printRoadmapChecklistSheet } from "../utils/roadmapPdf";

const chip: Record<Status, string> = {
  pending: "Queued",
  learning: "In Progress",
  done: "Completed ✓",
  skipped: "Skipped",
};

export default function RoadmapOverview() {
  const { slug = "" } = useParams();
  const roadmap = findRoadmap(slug);
  const { getStatus } = useProgress(slug);

  useEffect(() => {
    if (roadmap) {
      setStoredGoalSlug(roadmap.slug);
    }
  }, [roadmap]);

  if (!roadmap) {
    return (
      <section className="container">
        <h1>Curriculum specification not found</h1>
        <p><Link to="/">Return to all disciplines</Link></p>
      </section>
    );
  }

  const all = topicsOf(roadmap);
  const finished = all.filter((t) => ["done", "skipped"].includes(getStatus(t.id))).length;
  const remaining = Math.max(0, all.length - finished);
  const remainingMins = all
    .filter((t) => !["done", "skipped"].includes(getStatus(t.id)))
    .reduce((sum, t) => sum + t.minutes, 0);
  const pct = all.length ? Math.round((finished / all.length) * 100) : 0;
  const next = all.find((t) => !["done", "skipped"].includes(getStatus(t.id)));
  const nextPct = all.length ? Math.min(100, Math.round(((finished + 1) / all.length) * 100)) : 100;
  let counter = 0;

  // Find active stage for personalized coaching message
  const activeStageIndex = roadmap.sections.findIndex((s) =>
    s.topics.some((t) => !["done", "skipped"].includes(getStatus(t.id)))
  );
  const activeStage = roadmap.sections[activeStageIndex >= 0 ? activeStageIndex : roadmap.sections.length - 1];
  const activeStageDone = activeStage
    ? activeStage.topics.filter((t) => ["done", "skipped"].includes(getStatus(t.id))).length
    : 0;
  const activeStageLeft = activeStage ? Math.max(0, activeStage.topics.length - activeStageDone) : 0;

  return (
    <section className="container narrow">
      <Link to="/" className="muted">← Return to All 9 Engineering & Leadership Disciplines</Link>
      <div className="rm-head glass-3d" style={{ padding: 24, marginTop: 14 }}>
        <span className="emoji big" aria-hidden="true">{roadmap.emoji}</span>
        <div style={{ flex: 1 }}>
          <span className="pill neon-pill">
            TECHNICAL CURRICULUM SPECIFICATION · {roadmap.sections.length} STAGES · {all.length} MODULES
          </span>
          <h1>{roadmap.title}</h1>
          <p className="lead">{roadmap.description}</p>
          <div className="chips">
            <span className="badge neon">
              {pct}% Goal Readiness ({finished}/{all.length})
            </span>
            <span className="badge">~{minutesOf(roadmap)} min total study time</span>
            <span className="badge">Includes Architecture, Playbooks & Printable PDF</span>
          </div>
          <div className="cta" style={{ marginTop: 16 }}>
            <button
              type="button"
              className="btn primary small"
              onClick={() => downloadRoadmapChecklistPdf(roadmap)}
            >
              ↓ Download Roadmap Checklist PDF
            </button>
            <button
              type="button"
              className="btn small"
              onClick={() => printRoadmapChecklistSheet(roadmap)}
            >
              🖨 Print Physical Tracker Sheet
            </button>
          </div>
        </div>
      </div>

      {/* Personalized Goal Distance & Motivation Banner */}
      <div className="quest-progress-box glass-3d">
        <div className="progress-row">
          <div>
            <span className="finder-badge" style={{ marginBottom: 4 }}>
              {remaining === 0
                ? "GOAL ACHIEVED · 100% COMPLETE"
                : `YOUR DISTANCE TO ${roadmap.title.toUpperCase()} MASTERY`}
            </span>
            <strong style={{ display: "block", fontSize: 18 }}>
              {finished} of {all.length} Specifications Completed ({pct}% Closer to Goal)
            </strong>
          </div>
          {next && (
            <Link className="btn primary small glow-btn" to={`/${roadmap.slug}/${next.id}`}>
              {finished === 0 ? `Start Step 01: ${next.title} →` : `Finish Next: ${next.title} →`}
            </Link>
          )}
        </div>

        <div className="progress" style={{ height: 8, marginTop: 12 }} aria-label={`${pct}% complete`}>
          <div className="bar" style={{ width: `${pct}%` }} />
        </div>

        {/* Stage Milestone Pills */}
        <div className="goal-stage-strip" style={{ marginTop: 14 }}>
          {roadmap.sections.map((s, sIdx) => {
            const sDone = s.topics.filter((t) => ["done", "skipped"].includes(getStatus(t.id))).length;
            const sComplete = sDone >= s.topics.length;
            const sCurrent = sIdx === activeStageIndex;
            return (
              <div
                key={s.id}
                className={`goal-stage-pill ${sComplete ? "done" : sCurrent ? "current" : ""}`}
              >
                <span className="stg-num">STAGE 0{sIdx + 1}</span>
                <strong>{s.title}</strong>
                <span className="stg-meta">
                  {sDone}/{s.topics.length}
                </span>
              </div>
            );
          })}
        </div>

        {next ? (
          <div className="coach-callout" style={{ marginTop: 14 }}>
            <div className="coach-top">
              <span className="badge neon">
                {activeStageLeft === 1
                  ? `1 MODULE LEFT TO CLEAR STAGE 0${activeStageIndex + 1}`
                  : `PERSONALIZED NEXT-STEP COACH · +${Math.max(1, nextPct - pct)}% GOAL BOOST`}
              </span>
              <span className="muted" style={{ fontFamily: "var(--font-mono)", fontSize: 11.5 }}>
                {remaining} modules (~{Math.ceil(remainingMins / 60)}h) left to finish track
              </span>
            </div>
            <h3>
              {finished === 0
                ? `Launch your ${roadmap.title} track with "${next.title}" (${next.minutes} min)`
                : activeStageLeft === 1
                ? `Finish "${next.title}" now to complete Stage 0${activeStageIndex + 1}: ${activeStage?.title}!`
                : `Keep your momentum: Complete "${next.title}" (${next.minutes} min) to reach ${nextPct}%`}
            </h3>
            <p>
              {next.summary} Completing this module locks in{" "}
              <strong>{next.points[0] ?? "core production skills"}</strong> and moves Stage 0{activeStageIndex + 1} to{" "}
              {activeStageDone + 1}/{activeStage?.topics.length}.
            </p>
          </div>
        ) : (
          <div className="coach-callout" style={{ marginTop: 14 }}>
            <span className="badge neon-green">100% GOAL COMPLETE</span>
            <h3>Congratulations — You Have Completed All {all.length} Modules in {roadmap.title}!</h3>
            <p>Download or print your verified physical checklist PDF above for your portfolio records.</p>
          </div>
        )}
      </div>

      <div className="box glass-3d">
        <h2 className="h3">Target Practitioner Profile</h2>
        <p>{roadmap.audience}</p>
        <h2 className="h3" style={{ marginTop: 16 }}>Reference Production Stack & Standards</h2>
        <div className="chips">
          {roadmap.tools.map((t) => (
            <span key={t} className="badge neon">{t}</span>
          ))}
        </div>
      </div>

      <div className="box glass-3d">
        <h2 className="h3">Production Competency Outcomes</h2>
        <ul className="checks">
          {roadmap.outcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </div>

      <div className="skill-tree">
        {roadmap.sections.map((s, sIdx) => {
          const secDone = s.topics.filter((t) => ["done", "skipped"].includes(getStatus(t.id))).length;
          return (
            <div key={s.id} className="section tree-stage">
              <div className="stage-banner">
                <span className="stage-num">PHASE 0{sIdx + 1}</span>
                <h2>{s.title}</h2>
                <span className="badge">
                  {secDone}/{s.topics.length} Completed
                </span>
              </div>
              <ol className="topic-list tree-nodes">
                {s.topics.map((t) => {
                  counter += 1;
                  const st = getStatus(t.id);
                  const isNextTarget = next?.id === t.id;
                  return (
                    <li key={t.id} className="tree-node-item">
                      <Tilt3DCard>
                        <Link
                          to={`/${roadmap.slug}/${t.id}`}
                          className={`row ${st} ${isNextTarget ? "next-focus" : ""}`}
                        >
                          <span className={`idx ${st}`}>{st === "done" ? "✓" : counter}</span>
                          <span className="row-body">
                            <strong>
                              {t.title}{" "}
                              {isNextTarget && (
                                <span className="badge neon" style={{ marginLeft: 6 }}>
                                  UP NEXT
                                </span>
                              )}
                            </strong>
                            <span className="muted">{t.summary}</span>
                          </span>
                          <span className="row-meta">
                            <span className={`status ${st}`}>{chip[st]}</span>
                            <span className="muted">
                              {t.minutes} min · Step {counter}/{all.length}
                            </span>
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
