import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { findRoadmap, topicsOf } from "../content";
import { getTopicDeepDive } from "../content/deepDiveEngine";
import { awardBonusXp } from "../gamification";
import { setStoredGoalSlug, useProgress } from "../progress";
import { buildTopicQuiz, getSimpleTake } from "../simpleExplainer";
import type { Status } from "../types";
import { downloadRoadmapChecklistPdf } from "../utils/roadmapPdf";

const labels: Record<Status, string> = {
  pending: "Queued",
  learning: "In Progress",
  done: "Completed ✓",
  skipped: "Defer",
};

export default function TopicPage() {
  const { slug = "", topicId = "" } = useParams();
  const roadmap = findRoadmap(slug);
  const { getStatus, setStatus } = useProgress(slug);
  const [eli5Mode, setEli5Mode] = useState(false);
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [quizClaimed, setQuizClaimed] = useState(false);
  const [activeFlowStep, setActiveFlowStep] = useState(0);

  useEffect(() => {
    setSelectedAns(null);
    setQuizClaimed(false);
    setActiveFlowStep(0);
    if (slug) {
      setStoredGoalSlug(slug);
    }
  }, [topicId, slug]);

  const all = roadmap ? topicsOf(roadmap) : [];
  const index = all.findIndex((t) => t.id === topicId);
  const topic = all[index];

  if (!roadmap || !topic) {
    return (
      <section className="container">
        <h1>Specification not found</h1>
        <p><Link to={roadmap ? `/${roadmap.slug}` : "/"}>Return to curriculum</Link></p>
      </section>
    );
  }

  const prev = index > 0 ? all[index - 1] : undefined;
  const next = index < all.length - 1 ? all[index + 1] : undefined;
  const status = getStatus(topic.id);
  const finishedCount = all.filter((t) => ["done", "skipped"].includes(getStatus(t.id))).length;
  const currentPct = all.length ? Math.round((finishedCount / all.length) * 100) : 0;
  const afterThisPct = all.length
    ? Math.min(
        100,
        Math.round(
          ((status === "done" || status === "skipped" ? finishedCount : finishedCount + 1) / all.length) * 100
        )
      )
    : 100;
  const simple = getSimpleTake(topic);
  const quiz = buildTopicQuiz(topic);
  const deep = getTopicDeepDive(topic);

  const onAnswer = (idx: number) => {
    setSelectedAns(idx);
    if (idx === quiz.correctIndex && !quizClaimed) {
      setQuizClaimed(true);
      awardBonusXp(50, "quiz");
    }
  };

  return (
    <div className="container topic-layout">
      <article className="article">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Disciplines</Link> / <Link to="/university">Research & Curricula</Link> /{" "}
          <Link to={`/${roadmap.slug}`}>{roadmap.title}</Link>
        </nav>

        <div className="topic-header-row">
          <div>
            <span className="pill neon-pill">
              SPECIFICATION {String(index + 1).padStart(2, "0")} OF {all.length} · {topic.minutes + 10} MIN TECHNICAL BRIEF · {currentPct}% GOAL READINESS
            </span>
            <h1>{topic.title}</h1>
          </div>
          <button
            type="button"
            className={`mode-toggle ${eli5Mode ? "active" : ""}`}
            onClick={() => setEli5Mode((v) => !v)}
          >
            {eli5Mode ? "Executive Briefing: ACTIVE" : "Executive & First-Principles Briefing"}
          </button>
        </div>

        {/* Personalized Topic Completion Motivation Strip */}
        <div className="coach-callout" style={{ marginBottom: 18 }}>
          <div className="coach-top">
            <span className="badge neon">
              {status === "done"
                ? `COMPLETED · ${currentPct}% TOWARD ${roadmap.title.toUpperCase()}`
                : `PERSONALIZED GOAL IMPACT · REACH ${afterThisPct}% ON COMPLETION`}
            </span>
            <button
              type="button"
              className="btn small"
              style={{ padding: "4px 10px", fontSize: 11.5 }}
              onClick={() => downloadRoadmapChecklistPdf(roadmap)}
            >
              ↓ Checklist PDF
            </button>
          </div>
          <p style={{ margin: "6px 0 0", fontSize: 14 }}>
            {status === "done" ? (
              next ? (
                <>
                  You've verified <strong>{topic.title}</strong>! Keep your streak alive by advancing to{" "}
                  <Link to={`/${roadmap.slug}/${next.id}`}>
                    <strong>{next.title}</strong>
                  </Link>{" "}
                  next ({all.length - finishedCount} modules remaining in {roadmap.title}).
                </>
              ) : (
                <>You have completed the final module of {roadmap.title}!</>
              )
            ) : (
              <>
                Finishing <strong>{topic.title}</strong> moves your {roadmap.title} goal from{" "}
                <strong>{currentPct}% → {afterThisPct}%</strong> ({finishedCount + 1}/{all.length} modules)
                {next ? ` and unlocks "${next.title}" next.` : " and completes the entire career track!"}
              </>
            )}
          </p>
        </div>

        <p className="lead">{topic.summary}</p>

        {/* Quick Jump Bar */}
        <div className="chip-row" style={{ margin: "12px 0 22px" }}>
          <a href="#deep-dive" className="mini-chip">01 · Systems Analysis</a>
          <a href="#flowchart" className="mini-chip">02 · Execution Pipeline</a>
          <a href="#architecture" className="mini-chip">03 · Reference Architecture</a>
          <a href="#playbook" className="mini-chip">04 · Implementation Playbook</a>
          <a href="#case-studies" className="mini-chip">05 · Production Case Studies</a>
          <a href="#comparison" className="mini-chip">06 · Trade-Off Matrix</a>
          {deep.mncCourses.length > 0 && (
            <a href="#mnc-courses" className="mini-chip">07 · Primary Curricula</a>
          )}
          {deep.youtubeVideos.length > 0 && (
            <a href="#youtube-lab" className="mini-chip">08 · Technical Lectures</a>
          )}
        </div>

        {eli5Mode && (
          <div className="eli5-card glass-3d">
            <div className="finder-badge">EXECUTIVE & FIRST-PRINCIPLES BRIEFING</div>
            <p>
              <strong>Architectural Thesis:</strong> {simple.vibe}
            </p>
            <p>
              <strong>Systems Mental Model:</strong> {simple.analogy}
            </p>
            <p style={{ marginBottom: 0 }}>
              <strong>Immediate Verification Protocol:</strong> {simple.noCodeStep}
            </p>
          </div>
        )}

        {/* 1. Core & Deep Conceptual Explanation */}
        <section id="deep-dive" className="deep-section">
          <h2 className="h2">01 · Systems Architecture & First-Principles Analysis</h2>
          {topic.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {deep.conceptualDeepDive.map((p, i) => (
            <p key={`deep-${i}`}>{p}</p>
          ))}
        </section>

        {/* 2. Interactive Visual Flowchart */}
        <section id="flowchart" className="box glass-3d">
          <div className="finder-badge">02 · INTERACTIVE EXECUTION PIPELINE (SELECT STAGE TO INSPECT)</div>
          <h2 className="h3" style={{ fontSize: 19, marginBottom: 14 }}>{deep.flowchartTitle}</h2>
          <div className="flowchart-track">
            {deep.flowchartSteps.map((step, i) => (
              <button
                key={step.label}
                type="button"
                className={`flow-node ${activeFlowStep === i ? "active" : ""}`}
                onClick={() => setActiveFlowStep(i)}
              >
                <span className="flow-step-label">{step.label}</span>
                <span className="flow-step-detail">{step.detail}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 3. System Architecture Blueprint */}
        <section id="architecture">
          <figure className="code glass-3d">
            <figcaption>
              <span>03 · {deep.architectureTitle}</span>
              <span className="badge neon">REFERENCE ARCHITECTURE</span>
            </figcaption>
            <pre><code>{deep.architectureAscii}</code></pre>
          </figure>
        </section>

        {/* 4. Production Code / Implementation Example */}
        {topic.example && (
          <figure className="code glass-3d">
            <figcaption>
              <span>Reference Implementation: {topic.example.title}</span>
              <span className="badge neon">{topic.example.language}</span>
            </figcaption>
            <pre><code>{topic.example.code}</code></pre>
          </figure>
        )}

        {/* 5. Step-by-Step Practitioner Playbook */}
        <section id="playbook" className="box glass-3d">
          <div className="finder-badge">04 · PRODUCTION IMPLEMENTATION PLAYBOOK</div>
          <h2 className="h3" style={{ fontSize: 19, marginBottom: 14 }}>
            Standard Operating Procedure: {topic.title}
          </h2>
          <div className="playbook-grid">
            {deep.playbook.map((step) => (
              <div key={step.phase} className="playbook-card">
                <div className="card-top">
                  <span className="badge neon">{step.phase}</span>
                  <span className="badge">Artifact: {step.deliverable}</span>
                </div>
                <h3 style={{ margin: "6px 0", fontSize: 16 }}>{step.title}</h3>
                <p style={{ margin: 0, fontSize: 14, color: "var(--muted)", lineHeight: 1.55 }}>{step.action}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Real-Life Enterprise Use Cases */}
        <section id="case-studies" className="box glass-3d">
          <div className="finder-badge">05 · EMPIRICAL PRODUCTION CASE STUDIES</div>
          <h2 className="h3" style={{ fontSize: 19, marginBottom: 14 }}>
            Enterprise Deployments & Measured Telemetry
          </h2>
          <div className="case-grid">
            {deep.caseStudies.map((cs) => (
              <div key={cs.company} className="case-card">
                <div className="card-top">
                  <strong style={{ color: "var(--accent)", fontSize: 15 }}>{cs.company}</strong>
                  <span className="badge">{cs.domain}</span>
                </div>
                <p style={{ fontSize: 14, margin: "8px 0" }}>
                  <strong>Operational Constraint:</strong> {cs.challenge}
                </p>
                <p style={{ fontSize: 14, margin: "8px 0" }}>
                  <strong>Architectural Intervention:</strong> {cs.solution}
                </p>
                <p style={{ fontSize: 14, margin: "8px 0 0", color: "var(--done)" }}>
                  <strong>Verified Production Impact:</strong> {cs.impact}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Engineering Trade-off & Comparison Table */}
        <section id="comparison" className="box glass-3d">
          <div className="finder-badge">06 · ARCHITECTURAL DECISION MATRIX</div>
          <h2 className="h3" style={{ fontSize: 19, marginBottom: 12 }}>{deep.table.caption}</h2>
          <div className="table-wrap">
            <table className="compare">
              <thead>
                <tr>
                  {deep.table.headers.map((h) => (
                    <th key={h}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {deep.table.rows.map((row, idx) => (
                  <tr key={idx}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx}>{cIdx === 0 ? <strong>{cell}</strong> : cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 8. TL;DR Key Takeaways */}
        <div className="box glass-3d">
          <h2 className="h3">Production Invariants & Verification Checklist</h2>
          <ul className="checks">
            {topic.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        {/* 9. Top MNC Courses & Official Documentation */}
        {deep.mncCourses.length > 0 && (
          <section id="mnc-courses" className="box glass-3d">
            <div className="finder-badge">07 · VERIFIED PRIMARY DOCUMENTATION & COURSES</div>
            <h2 className="h3" style={{ fontSize: 19, marginBottom: 12 }}>
              Primary Engineering Curricula & Specifications for "{topic.title}"
            </h2>
            <div className="resource-list">
              {deep.mncCourses.map((c) => (
                <a
                  key={c.title}
                  href={c.url}
                  target="_blank"
                  rel="noreferrer"
                  className="resource-row"
                  onClick={() => awardBonusXp(30, "lab")}
                >
                  <div>
                    <div className="chip-row" style={{ marginBottom: 4 }}>
                      <span className="badge neon">{c.org}</span>
                      <span className="badge">{c.type}</span>
                      <span className="badge">{c.duration}</span>
                    </div>
                    <strong className="resource-title">{c.title}</strong>
                  </div>
                  <span className="btn small primary">Open Specification ↗</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* 10. Top AI YouTubers & Video Masterclasses */}
        {deep.youtubeVideos.length > 0 && (
          <section id="youtube-lab" className="box glass-3d">
            <div className="finder-badge">08 · TECHNICAL LECTURES & IMPLEMENTATION WALKTHROUGHS</div>
            <h2 className="h3" style={{ fontSize: 19, marginBottom: 12 }}>
              Verified Engineering Lectures on "{topic.title}"
            </h2>
            <div className="resource-list">
              {deep.youtubeVideos.map((yt) => (
                <a
                  key={yt.title}
                  href={yt.url}
                  target="_blank"
                  rel="noreferrer"
                  className="resource-row"
                  onClick={() => awardBonusXp(30, "lab")}
                >
                  <div style={{ flex: 1 }}>
                    <div className="chip-row" style={{ marginBottom: 4 }}>
                      <span className="badge neon-green">{yt.creator}</span>
                      <span className="badge">{yt.channelBadge}</span>
                      <span className="badge">{yt.duration}</span>
                    </div>
                    <strong className="resource-title" style={{ display: "block", marginBottom: 4 }}>
                      {yt.title}
                    </strong>
                    <span style={{ fontSize: 13, color: "var(--muted)" }}>{yt.whyWatch}</span>
                  </div>
                  <span className="btn small">View Lecture ↗</span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* 11. Ecosystem Portals */}
        {deep.portals.length > 0 && (
          <section className="box glass-3d">
            <div className="finder-badge">09 · BENCHMARKS, REGISTRIES & SANDBOX ENVIRONMENTS</div>
            <h2 className="h3" style={{ fontSize: 19, marginBottom: 12 }}>
              Reference Platforms & Evaluation Tooling for "{topic.title}"
            </h2>
            <div className="playbook-grid">
              {deep.portals.map((portal) => (
                <a
                  key={portal.name}
                  href={portal.url}
                  target="_blank"
                  rel="noreferrer"
                  className="playbook-card"
                  onClick={() => awardBonusXp(20, "lab")}
                  style={{ display: "block" }}
                >
                  <div className="card-top">
                    <strong style={{ color: "var(--accent)" }}>{portal.name}</strong>
                    <span className="badge">{portal.category}</span>
                  </div>
                  <p style={{ margin: "6px 0 0", fontSize: 13.5, color: "var(--muted)" }}>{portal.description}</p>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* 12. Checkpoint Challenge Quiz */}
        <div className="quiz-box glass-3d">
          <div className="finder-badge">TECHNICAL VERIFICATION ASSESSMENT</div>
          <h3 style={{ margin: "6px 0 12px" }}>{quiz.question}</h3>
          <div className="quiz-options">
            {quiz.options.map((opt, idx) => {
              let cls = "quiz-opt";
              if (selectedAns !== null) {
                if (idx === quiz.correctIndex) cls += " correct";
                else if (idx === selectedAns) cls += " wrong";
              }
              return (
                <button key={opt} type="button" className={cls} onClick={() => onAnswer(idx)}>
                  {opt}
                </button>
              );
            })}
          </div>
          {selectedAns !== null && (
            <p className="quiz-feedback">
              {selectedAns === quiz.correctIndex
                ? `[VERIFIED ✓] ${quiz.explanation}`
                : "Verification failed. Review the highlighted engineering invariant above."}
            </p>
          )}
        </div>

        <div className="status-buttons" role="group" aria-label="Record specification status">
          {(Object.keys(labels) as Status[]).map((st) => (
            <button key={st} className={status === st ? "active" : ""} onClick={() => setStatus(topic.id, st)}>
              {labels[st]}
            </button>
          ))}
        </div>

        <div className="pager">
          {prev ? (
            <Link to={`/${roadmap.slug}/${prev.id}`} className="pager-link">
              <span className="muted">← Previous Specification</span>
              <strong>{prev.title}</strong>
            </Link>
          ) : <span />}
          {next ? (
            <Link
              to={`/${roadmap.slug}/${next.id}`}
              className="pager-link right"
              onClick={() => status === "pending" && setStatus(topic.id, "done")}
            >
              <span className="muted">Complete & Advance to {afterThisPct}% Goal →</span>
              <strong>{next.title}</strong>
            </Link>
          ) : (
            <Link
              to={`/${roadmap.slug}`}
              className="pager-link right"
              onClick={() => status === "pending" && setStatus(topic.id, "done")}
            >
              <span className="muted">Curriculum Specification Complete (100%)</span>
              <strong>Record Track Completion & Return →</strong>
            </Link>
          )}
        </div>
      </article>

      <aside className="toc glass-3d">
        <h2 className="h3">{roadmap.title}</h2>
        <ol>
          {all.map((t, i) => (
            <li key={t.id}>
              <Link to={`/${roadmap.slug}/${t.id}`} className={t.id === topic.id ? "current" : ""}>
                <span className={`dot ${getStatus(t.id)}`} aria-hidden="true" />
                <span>{String(i + 1).padStart(2, "0")}. {t.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}

