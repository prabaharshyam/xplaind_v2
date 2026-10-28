import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { findRoadmap, topicsOf } from "../content";
import { getTopicDeepDive } from "../content/deepDiveEngine";
import { awardBonusXp } from "../gamification";
import { useProgress } from "../progress";
import { buildTopicQuiz, getSimpleTake } from "../simpleExplainer";
import type { Status } from "../types";

const labels: Record<Status, string> = {
  pending: "⏳ Not started",
  learning: "⚡ Grinding",
  done: "✅ Complete (+120 XP)",
  skipped: "⏭️ Skip",
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
  }, [topicId]);

  const all = roadmap ? topicsOf(roadmap) : [];
  const index = all.findIndex((t) => t.id === topicId);
  const topic = all[index];

  if (!roadmap || !topic) {
    return (
      <section className="container">
        <h1>Topic not found</h1>
        <p><Link to={roadmap ? `/${roadmap.slug}` : "/"}>Go back</Link></p>
      </section>
    );
  }

  const prev = index > 0 ? all[index - 1] : undefined;
  const next = index < all.length - 1 ? all[index + 1] : undefined;
  const status = getStatus(topic.id);
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
          <Link to="/">🎮 Roles</Link> / <Link to="/university">🎓 AI University</Link> /{" "}
          <Link to={`/${roadmap.slug}`}>{roadmap.title}</Link>
        </nav>

        <div className="topic-header-row">
          <div>
            <span className="pill neon-pill">
              MILESTONE {index + 1} OF {all.length} · ⏱️ {topic.minutes + 10} MIN DEEP DIVE · ⚡ +120 XP
            </span>
            <h1>{topic.title}</h1>
          </div>
          <button
            type="button"
            className={`mode-toggle ${eli5Mode ? "active" : ""}`}
            onClick={() => setEli5Mode((v) => !v)}
          >
            {eli5Mode ? "✨ Zero-Jargon Mode: ON" : "🌱 Explain Like I'm 15 (No Tech Jargon)"}
          </button>
        </div>

        <p className="lead">{topic.summary}</p>

        {/* Quick Jump Bar */}
        <div className="chip-row" style={{ margin: "12px 0 22px" }}>
          <a href="#deep-dive" className="mini-chip">📖 Deep Explanation</a>
          <a href="#flowchart" className="mini-chip">🔀 Visual Flowchart</a>
          <a href="#architecture" className="mini-chip">📐 Architecture Blueprint</a>
          <a href="#playbook" className="mini-chip">📋 Step-by-Step Playbook</a>
          <a href="#case-studies" className="mini-chip">🏢 Real-Life Case Studies</a>
          <a href="#comparison" className="mini-chip">📊 Trade-Off Table</a>
          <a href="#mnc-courses" className="mini-chip">🏛️ MNC Courses</a>
          <a href="#youtube-lab" className="mini-chip">▶️ YouTube Masterclasses</a>
        </div>

        {eli5Mode && (
          <div className="eli5-card glass-3d">
            <div className="finder-badge">🌱 ZERO-JARGON BREAKDOWN (NO TECH BACKGROUND NEEDED)</div>
            <p>
              <strong>The Vibe:</strong> {simple.vibe}
            </p>
            <p>
              <strong>Real-Life Analogy:</strong> {simple.analogy}
            </p>
            <p style={{ marginBottom: 0 }}>
              <strong>Try It Right Now (Zero Setup):</strong> {simple.noCodeStep}
            </p>
          </div>
        )}

        {/* 1. Core & Deep Conceptual Explanation */}
        <section id="deep-dive" className="deep-section">
          <h2 className="h2">📖 1. Deep Conceptual & Systems Breakdown</h2>
          {topic.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {deep.conceptualDeepDive.map((p, i) => (
            <p key={`deep-${i}`}>{p}</p>
          ))}
        </section>

        {/* 2. Interactive Visual Flowchart */}
        <section id="flowchart" className="box glass-3d">
          <div className="finder-badge">🔀 INTERACTIVE EXECUTION FLOWCHART (CLICK ANY STAGE)</div>
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
              <span>📐 {deep.architectureTitle}</span>
              <span className="badge neon">SYSTEM ARCHITECTURE</span>
            </figcaption>
            <pre><code>{deep.architectureAscii}</code></pre>
          </figure>
        </section>

        {/* 4. Production Code / Implementation Example */}
        {topic.example && (
          <figure className="code glass-3d">
            <figcaption>
              <span>💻 Production Implementation: {topic.example.title}</span>
              <span className="badge neon">{topic.example.language}</span>
            </figcaption>
            <pre><code>{topic.example.code}</code></pre>
          </figure>
        )}

        {/* 5. Step-by-Step Practitioner Playbook */}
        <section id="playbook" className="box glass-3d">
          <div className="finder-badge">📋 STEP-BY-STEP PRODUCTION PLAYBOOK</div>
          <h2 className="h3" style={{ fontSize: 19, marginBottom: 14 }}>
            How to Execute "{topic.title}" on the Job
          </h2>
          <div className="playbook-grid">
            {deep.playbook.map((step) => (
              <div key={step.phase} className="playbook-card">
                <div className="card-top">
                  <span className="badge neon">{step.phase}</span>
                  <span className="badge">Deliverable: {step.deliverable}</span>
                </div>
                <h3 style={{ margin: "6px 0", fontSize: 16 }}>{step.title}</h3>
                <p style={{ margin: 0, fontSize: 14, color: "var(--muted)", lineHeight: 1.55 }}>{step.action}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Real-Life Enterprise Use Cases */}
        <section id="case-studies" className="box glass-3d">
          <div className="finder-badge">🏢 REAL-LIFE INDUSTRY CASE STUDIES & IMPACT</div>
          <h2 className="h3" style={{ fontSize: 19, marginBottom: 14 }}>
            How Top Companies Use This in Production
          </h2>
          <div className="case-grid">
            {deep.caseStudies.map((cs) => (
              <div key={cs.company} className="case-card">
                <div className="card-top">
                  <strong style={{ color: "var(--accent)", fontSize: 15 }}>🏢 {cs.company}</strong>
                  <span className="badge">{cs.domain}</span>
                </div>
                <p style={{ fontSize: 14, margin: "8px 0" }}>
                  <strong>The Problem:</strong> {cs.challenge}
                </p>
                <p style={{ fontSize: 14, margin: "8px 0" }}>
                  <strong>The Architecture & Fix:</strong> {cs.solution}
                </p>
                <p style={{ fontSize: 14, margin: "8px 0 0", color: "var(--done)" }}>
                  <strong>📈 Measured Impact:</strong> {cs.impact}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Engineering Trade-off & Comparison Table */}
        <section id="comparison" className="box glass-3d">
          <div className="finder-badge">📊 ENGINEERING DECISION MATRIX</div>
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
          <h2 className="h3">⚡ Non-Negotiable Rules to Lock In</h2>
          <ul className="checks">
            {topic.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        {/* 9. Top MNC Courses & Official Documentation */}
        <section id="mnc-courses" className="box glass-3d">
          <div className="finder-badge">🏛️ TOP MNC COURSES & OFFICIAL LEARNING LABS (+30 XP)</div>
          <h2 className="h3" style={{ fontSize: 19, marginBottom: 12 }}>
            Learn "{topic.title}" from Google, Anthropic, Microsoft, DeepLearning.AI & NVIDIA
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
                    <span className="badge">⏱️ {c.duration}</span>
                  </div>
                  <strong style={{ fontSize: 15, color: "#fff" }}>{c.title}</strong>
                </div>
                <span className="btn small primary">Start Course ↗</span>
              </a>
            ))}
          </div>
        </section>

        {/* 10. Top AI YouTubers & Video Masterclasses */}
        <section id="youtube-lab" className="box glass-3d">
          <div className="finder-badge">▶️ CURATED YOUTUBE MASTERCLASSES (+30 XP)</div>
          <h2 className="h3" style={{ fontSize: 19, marginBottom: 12 }}>
            Watch the Best Creators Explain & Build "{topic.title}"
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
                    <span className="badge neon-green">▶️ {yt.creator}</span>
                    <span className="badge">{yt.channelBadge}</span>
                    <span className="badge">⏱️ {yt.duration}</span>
                  </div>
                  <strong style={{ fontSize: 15, color: "#fff", display: "block", marginBottom: 4 }}>
                    {yt.title}
                  </strong>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>{yt.whyWatch}</span>
                </div>
                <span className="btn small">▶️ Watch Video ↗</span>
              </a>
            ))}
          </div>
        </section>

        {/* 11. Ecosystem Portals (There's An AI For That, DataCamp, Hugging Face, etc.) */}
        <section className="box glass-3d">
          <div className="finder-badge">🧭 AI ECOSYSTEM PORTALS, DIRECTORIES & SANDBOXES</div>
          <h2 className="h3" style={{ fontSize: 19, marginBottom: 12 }}>
            Explore Tools, Interactive Practice & Benchmarks
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

        {/* 12. Checkpoint Challenge Quiz */}
        <div className="quiz-box glass-3d">
          <div className="finder-badge">🧠 CHECKPOINT CHALLENGE · WIN +50 BONUS XP</div>
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
                ? `🎉 +50 XP! ${quiz.explanation}`
                : "Not quite! Tap the highlighted green answer to see the key rule."}
            </p>
          )}
        </div>

        <div className="status-buttons" role="group" aria-label="Mark your progress">
          {(Object.keys(labels) as Status[]).map((st) => (
            <button key={st} className={status === st ? "active" : ""} onClick={() => setStatus(topic.id, st)}>
              {labels[st]}
            </button>
          ))}
        </div>

        <div className="pager">
          {prev ? (
            <Link to={`/${roadmap.slug}/${prev.id}`} className="pager-link">
              <span className="muted">← Previous Milestone</span>
              <strong>{prev.title}</strong>
            </Link>
          ) : <span />}
          {next ? (
            <Link
              to={`/${roadmap.slug}/${next.id}`}
              className="pager-link right"
              onClick={() => status === "pending" && setStatus(topic.id, "done")}
            >
              <span className="muted">Complete & Next Milestone (+120 XP) →</span>
              <strong>{next.title}</strong>
            </Link>
          ) : (
            <Link
              to={`/${roadmap.slug}`}
              className="pager-link right"
              onClick={() => status === "pending" && setStatus(topic.id, "done")}
            >
              <span className="muted">🏆 Final Milestone!</span>
              <strong>Claim Role Mastery & Return</strong>
            </Link>
          )}
        </div>
      </article>

      <aside className="toc glass-3d">
        <h2 className="h3">{roadmap.emoji} {roadmap.title}</h2>
        <ol>
          {all.map((t, i) => (
            <li key={t.id}>
              <Link to={`/${roadmap.slug}/${t.id}`} className={t.id === topic.id ? "current" : ""}>
                <span className={`dot ${getStatus(t.id)}`} aria-hidden="true" />
                <span>{i + 1}. {t.title}</span>
              </Link>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}

