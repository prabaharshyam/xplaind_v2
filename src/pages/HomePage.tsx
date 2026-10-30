import { Link, useSearchParams } from "react-router-dom";
import { InteractiveLabs } from "../components/InteractiveLabs";
import { RoleFinderWidget } from "../components/RoleFinderWidget";
import { Tilt3DCard } from "../components/Tilt3DCard";
import { minutesOf, roadmaps, stats, topicsOf } from "../content";
import { usePlayerStats } from "../gamification";
import { countFinished } from "../progress";
import { downloadRoadmapChecklistPdf, printRoadmapChecklistSheet } from "../utils/roadmapPdf";
import { ECOSYSTEM_PORTALS, MNC_ACADEMIES, YOUTUBE_MASTERS } from "./UniversityPage";

const ARCHITECTURAL_PILLARS = [
  {
    q: "Precision Specialization Routing",
    a: "Use the 3-phase Architectural Track Diagnostic to map your current engineering or operational background directly to one of nine production AI disciplines.",
    tag: "PILLAR · 01",
  },
  {
    q: "Systems-Level Engineering Specifications",
    a: "Every curriculum module is structured around mathematical and architectural fundamentals, failure modes, ASCII system blueprints, and production implementation code.",
    tag: "PILLAR · 02",
  },
  {
    q: "Visual Goal Horizon & Personalized Coaching",
    a: "Track exactly how close you are to completing your target AI role with stage-by-stage milestone telemetry and personalized coaching for your next module.",
    tag: "PILLAR · 03",
  },
  {
    q: "Printable Physical Checklist PDFs",
    a: "Download any of the 9 career roadmaps as a formatted multi-page PDF checklist so you can print a physical copy and check off modules at your desk.",
    tag: "PILLAR · 04",
  },
  {
    q: "Technical & Strategic Role Coverage",
    a: "Comprehensive coverage across both deep systems tracks (LLM Systems, MLOps, Agentic Runtimes) and strategic/governance leadership (AI PM, Enterprise Automation, GRC).",
    tag: "PILLAR · 05",
  },
  {
    q: "Verified Primary Research & Curricula",
    a: "Every topic links exclusively to verified engineering documentation and technical courses from Anthropic, DeepLearning.AI, Google Cloud, NVIDIA, Stanford, and MIT.",
    tag: "PILLAR · 06",
  },
];

const NO_CODE_SLUGS = new Set([
  "ai-product-manager",
  "ai-automation-specialist",
  "ai-governance-compliance-specialist",
]);

const faqs = [
  {
    q: "How are the curricula structured for non-software engineering backgrounds?",
    a: "Select the 'Strategy, Operations & Governance' filter below to focus on AI Technical Product Management, Enterprise Automation Architecture, or AI Governance & Regulatory Compliance. Every technical module also includes an Executive Briefing toggle for systems-level mental models.",
  },
  {
    q: "How does Goal Horizon Tracking & Personalized Next-Step Coaching work?",
    a: "Instead of arbitrary point systems, XplAIned.in tracks your exact completion distance toward your chosen AI Career Goal—showing how many stages and modules remain, estimated hours to finish, and a personalized coaching prompt tailored to the exact next topic you need to complete.",
  },
  {
    q: "Can I download and print a physical copy of a roadmap checklist?",
    a: "Yes. Every role card and curriculum page includes a 'Download Checklist PDF' button that generates a clean, multi-page A4 printable checklist with checkboxes, module summaries, time estimates, and completion sign-off lines.",
  },
  {
    q: "How frequently are regulatory frameworks and architectural patterns updated?",
    a: "Specifications emphasize durable systems engineering invariants—evaluation rigor, latency/cost unit economics, retrieval grounding, and defence-in-depth—while referencing primary statutory texts (EU AI Act, NIST AI RMF, ISO/IEC 42001) for compliance verification.",
  },
];

export default function HomePage() {
  const [params, setParams] = useSearchParams();
  const q = (params.get("q") ?? "").toLowerCase();
  const filter = params.get("f") ?? "all";
  const { stats: player, setActiveGoal } = usePlayerStats();

  const visible = roadmaps.filter((r) => {
    const matchesQuery =
      !q || `${r.title} ${r.description} ${r.audience} ${r.tools.join(" ")}`.toLowerCase().includes(q);
    const matchesFilter =
      filter === "all" ||
      (filter === "nocode" && NO_CODE_SLUGS.has(r.slug)) ||
      (filter === "builder" && !NO_CODE_SLUGS.has(r.slug));
    return matchesQuery && matchesFilter;
  });

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value && value !== "all") next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const goalCircumference = 2 * Math.PI * 52;
  const goalDashOffset = goalCircumference - (player.goalPct / 100) * goalCircumference;

  return (
    <>
      <section className="hero-wrap">
        <div className="hero-blueprint-grid" aria-hidden="true" />
        <div className="container hero hero-command">
          <div className="hero-copy">
            <div className="hero-eyebrow-row">
              <span className="hero-kicker">ARCHITECTURAL AI CURRICULUM & GOAL ENGINE</span>
              <span className="hero-live-tag">
                <span className="pulse-dot" /> 9 CANONICAL ROLES · {stats.topics} SPECIFICATIONS
              </span>
            </div>
            <h1>
              The Definitive Engineering Reference for{" "}
              <span className="ai-grad">Applied AI Systems.</span>
            </h1>
            <p className="lead">
              Rigorous, industry-aligned roadmaps across nine AI engineering and leadership disciplines.
              Every specification pairs <strong>first-principles systems analysis, interactive execution flowcharts, ASCII reference architectures,
              operational playbooks, and printable PDF checklists</strong> with primary courses from{" "}
              <strong>Anthropic, DeepLearning.AI, Google Cloud, Microsoft, NVIDIA, and Stanford</strong>.
            </p>
            <div className="cta">
              {player.nextTopic ? (
                <Link
                  className="btn hero-primary-btn"
                  to={`/${player.goalRoadmap.slug}/${player.nextTopic.id}`}
                >
                  Continue Next Step: {player.nextTopic.title} →
                </Link>
              ) : (
                <a className="btn hero-primary-btn" href="#matcher">
                  Run Track Diagnostic →
                </a>
              )}
              <button
                type="button"
                className="btn hero-secondary-btn"
                onClick={() => downloadRoadmapChecklistPdf(player.goalRoadmap)}
              >
                ↓ Download {player.goalRoadmap.title} Checklist PDF
              </button>
              <a className="btn hero-ghost-btn" href="#roles">
                Explore All 9 Roadmaps
              </a>
              <Link className="btn hero-ghost-btn" to="/university">
                Research & Course Index
              </Link>
            </div>

            <dl className="stats hero-stats">
              <div>
                <dt>0{stats.roadmaps}</dt>
                <dd>Canonical Role Roadmaps</dd>
              </div>
              <div>
                <dt>{stats.topics}</dt>
                <dd>Production Specifications</dd>
              </div>
              <div>
                <dt>PDF</dt>
                <dd>Printable Track Checklists</dd>
              </div>
              <div>
                <dt>50+</dt>
                <dd>Primary Lab & Uni Courses</dd>
              </div>
            </dl>
          </div>

          {/* Right Column: Interactive Goal Horizon Radar + Personalized Motivation Coach */}
          <div className="hero-goal-deck">
            <div className="goal-deck-header">
              <div>
                <span className="goal-deck-kicker">YOUR GOAL COMPLETION HORIZON</span>
                <div className="goal-selector-wrap">
                  <select
                    aria-label="Select your target AI career goal"
                    className="goal-role-select"
                    value={player.goalRoadmap.slug}
                    onChange={(e) => setActiveGoal(e.target.value)}
                  >
                    {roadmaps.map((r) => (
                      <option key={r.slug} value={r.slug}>
                        Target Goal: {r.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <span className="goal-streak-chip">{player.streak}d Active Streak</span>
            </div>

            {/* Radial Gauge + Distance-to-Goal Telemetry */}
            <div className="goal-radar-row">
              <div className="goal-ring-wrap">
                <svg width="124" height="124" viewBox="0 0 124 124" className="goal-ring-svg">
                  <circle
                    cx="62"
                    cy="62"
                    r="52"
                    fill="none"
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth="9"
                  />
                  <circle
                    cx="62"
                    cy="62"
                    r="52"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray={goalCircumference}
                    strokeDashoffset={goalDashOffset}
                    transform="rotate(-90 62 62)"
                  />
                </svg>
                <div className="goal-ring-center">
                  <strong>{player.goalPct}%</strong>
                  <span>TO GOAL</span>
                </div>
              </div>

              <div className="goal-metrics-col">
                <div className="goal-metric-line">
                  <span className="gm-label">MODULES CONQUERED</span>
                  <strong className="gm-val">
                    {player.goalDone} / {player.goalTotal} Specifications
                  </strong>
                </div>
                <div className="goal-metric-line">
                  <span className="gm-label">STAGES CLEARED</span>
                  <strong className="gm-val">
                    {player.goalStagesCompleted} of {player.goalTotalStages} Phases
                  </strong>
                </div>
                <div className="goal-metric-line">
                  <span className="gm-label">DISTANCE TO FINISH LINE</span>
                  <strong className="gm-val accent-cyan">
                    {player.goalRemaining === 0
                      ? "Goal Completed!"
                      : `${player.goalRemaining} steps left (~${Math.ceil(player.goalRemainingMinutes / 60)}h)`}
                  </strong>
                </div>
              </div>
            </div>

            {/* Stage Milestone Stepper */}
            <div className="goal-stage-nodes" aria-label="Stage milestone progress">
              {player.goalStages.map((s) => (
                <div
                  key={s.index}
                  className={`stage-dot-node ${s.isComplete ? "done" : s.isCurrent ? "current" : ""}`}
                  title={`Stage 0${s.index}: ${s.title} (${s.done}/${s.total})`}
                >
                  <span className="sd-idx">S{s.index}</span>
                  <span className="sd-bar">
                    <span style={{ width: `${s.pct}%` }} />
                  </span>
                </div>
              ))}
            </div>

            {/* Personalized Creative Motivation Coach */}
            <div className="hero-coach-box">
              <div className="hc-badge-row">
                <span className="hc-pill">{player.coaching.momentumBadge}</span>
                <span className="hc-stage-tag">
                  Stage 0{player.goalCurrentStageIndex}: {player.goalCurrentStageTitle}
                </span>
              </div>
              <h3 className="hc-title">{player.coaching.headline}</h3>
              <p className="hc-msg">{player.coaching.message}</p>
              <div className="hc-unlock">{player.coaching.unlockImpact}</div>
              <div className="hc-actions">
                {player.nextTopic && (
                  <Link
                    to={`/${player.goalRoadmap.slug}/${player.nextTopic.id}`}
                    className="btn hc-start-btn"
                  >
                    Start "{player.nextTopic.title}" ({player.nextTopic.minutes}m) →
                  </Link>
                )}
                <button
                  type="button"
                  className="btn hc-pdf-btn"
                  onClick={() => printRoadmapChecklistSheet(player.goalRoadmap)}
                  title="Open printable checklist sheet"
                >
                  🖨 Print Checklist
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container" id="matcher">
        <RoleFinderWidget />
      </section>

      <section className="container">
        <div className="section-head">
          <span className="pill neon-pill">ARCHITECTURAL METHODOLOGY</span>
          <h2 className="h2">Engineered for Technical Authority & Production Confidence</h2>
        </div>
        <div className="grid problems-grid">
          {ARCHITECTURAL_PILLARS.map((item) => (
            <Tilt3DCard key={item.tag} className="problem-card">
              <span className="badge neon">{item.tag}</span>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </Tilt3DCard>
          ))}
        </div>
      </section>

      <section className="container" id="roles">
        <div className="section-head">
          <span className="pill neon-pill">DISCIPLINE SPECIFICATIONS</span>
          <h2 className="h2">Nine Production AI Specializations</h2>
        </div>

        <div className="toolbar">
          <input
            type="search"
            placeholder="Filter by discipline, protocol, or stack (Python, PyTorch, vLLM, MCP)..."
            aria-label="Filter disciplines"
            value={params.get("q") ?? ""}
            onChange={(e) => setParam("q", e.target.value)}
          />
          <div className="tabs">
            <button
              type="button"
              className={filter === "all" ? "tab active" : "tab"}
              onClick={() => setParam("f", "all")}
            >
              All 9 Disciplines
            </button>
            <button
              type="button"
              className={filter === "nocode" ? "tab active" : "tab"}
              onClick={() => setParam("f", "nocode")}
            >
              Strategy, Operations & Governance
            </button>
            <button
              type="button"
              className={filter === "builder" ? "tab active" : "tab"}
              onClick={() => setParam("f", "builder")}
            >
              Systems & Model Engineering
            </button>
          </div>
        </div>

        <div className="grid role-grid">
          {visible.map((r) => {
            const allTopics = topicsOf(r);
            const total = allTopics.length;
            const done = countFinished(r.slug);
            const pct = total ? Math.round((done / total) * 100) : 0;
            const remaining = Math.max(0, total - done);
            const mins = minutesOf(r);
            const isNoCode = NO_CODE_SLUGS.has(r.slug);
            return (
              <Tilt3DCard key={r.slug}>
                <div className="card role-card">
                  <div className="card-top">
                    <span className="emoji" aria-hidden="true">
                      {r.emoji}
                    </span>
                    <span className={`badge ${isNoCode ? "neon-green" : "neon"}`}>
                      {isNoCode ? "STRATEGY & GOVERNANCE" : "SYSTEMS ENGINEERING"}
                    </span>
                  </div>
                  <h3>
                    <Link to={`/${r.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                      {r.title}
                    </Link>
                  </h3>
                  <p>{r.description}</p>
                  <div className="chip-row">
                    {r.tools.slice(0, 3).map((t) => (
                      <span key={t} className="mini-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="meta">
                    <span>{total} Modules ({r.sections.length} Stages)</span>
                    <span>~{Math.floor(mins / 60)}h {mins % 60}m</span>
                    <span style={{ color: pct === 100 ? "var(--done)" : "var(--accent)", fontWeight: 600 }}>
                      {pct === 100 ? "Goal Complete!" : `${pct}% (${remaining} left)`}
                    </span>
                  </div>
                  <div className="progress small" aria-label={`${pct}% complete`}>
                    <div className="bar" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="role-card-actions">
                    <Link to={`/${r.slug}`} className="btn primary small" onClick={() => setActiveGoal(r.slug)}>
                      {done > 0 ? `Continue (${pct}%) →` : "Open Roadmap →"}
                    </Link>
                    <button
                      type="button"
                      className="btn small"
                      onClick={() => downloadRoadmapChecklistPdf(r)}
                      title={`Download ${r.title} printable PDF checklist`}
                    >
                      ↓ Checklist PDF
                    </button>
                  </div>
                </div>
              </Tilt3DCard>
            );
          })}
          {visible.length === 0 && <p className="muted">No specialization tracks match your filter criteria.</p>}
        </div>
      </section>

      <section className="container" id="arcade">
        <InteractiveLabs />
      </section>

      <section className="container" id="university-preview">
        <div className="arcade-header">
          <div>
            <span className="pill neon-pill">EXTERNAL RESEARCH & CURRICULUM INDEX</span>
            <h2 className="h2" style={{ margin: "6px 0 4px" }}>
              Primary Engineering Academies, Technical Lectures & Evaluation Benchmarks
            </h2>
            <p className="muted" style={{ margin: 0 }}>
              Curated primary documentation, frontier lab engineering courses, and university lectures mapped to each specification.
            </p>
          </div>
          <Link to="/university" className="btn primary">
            Open Full Research Index →
          </Link>
        </div>

        <h3 className="h3" style={{ marginTop: 18 }}>Frontier Lab & Cloud Engineering Academies</h3>
        <div className="grid">
          {MNC_ACADEMIES.slice(0, 6).map((m) => (
            <Tilt3DCard key={m.title}>
              <a href={m.url} target="_blank" rel="noreferrer" className="card">
                <div className="card-top">
                  <span className="emoji">{m.emoji}</span>
                  <span className="badge neon">{m.badge}</span>
                </div>
                <div className="meta">
                  <span>{m.org}</span>
                  <span>{m.level} · OPEN ACCESS</span>
                </div>
                <h3>{m.title}</h3>
                <p>{m.summary}</p>
                <span style={{ fontWeight: 600, fontSize: 13, color: "var(--accent)" }}>Inspect Curriculum ↗</span>
              </a>
            </Tilt3DCard>
          ))}
        </div>

        <h3 className="h3" style={{ marginTop: 32 }}>Foundational Technical Lectures & Systems Walkthroughs</h3>
        <div className="grid">
          {YOUTUBE_MASTERS.slice(0, 6).map((yt) => (
            <Tilt3DCard key={yt.title}>
              <div className="card">
                <div className="card-top">
                  <span className="badge neon-green">DURATION · {yt.duration}</span>
                  <span className="badge">{yt.subs}</span>
                </div>
                <div className="meta">
                  <strong style={{ color: "var(--fg)" }}>{yt.creator}</strong>
                  <span>{yt.specialty}</span>
                </div>
                <h3>{yt.title}</h3>
                <p>{yt.summary}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "auto" }}>
                  <a href={yt.url} target="_blank" rel="noreferrer" className="btn primary small">
                    View Lecture ↗
                  </a>
                  <Link to={yt.topicLink} className="btn small">
                    Spec: {yt.topicLabel}
                  </Link>
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>

        <h3 className="h3" style={{ marginTop: 32 }}>Empirical Benchmarks, Model Registries & Evaluation Platforms</h3>
        <div className="grid">
          {ECOSYSTEM_PORTALS.slice(0, 6).map((site) => (
            <Tilt3DCard key={site.name}>
              <a href={site.url} target="_blank" rel="noreferrer" className="card">
                <div className="card-top">
                  <span className="emoji">{site.emoji}</span>
                  <span className="badge neon">{site.badge}</span>
                </div>
                <h3>{site.name}</h3>
                <p>{site.description}</p>
                <span style={{ fontWeight: 600, fontSize: 13, color: "var(--accent)" }}>Open {site.name} ↗</span>
              </a>
            </Tilt3DCard>
          ))}
        </div>
      </section>

      <section className="container" id="compare">
        <h2 className="h2">Specialization Specification Matrix</h2>
        <div className="table-wrap glass-3d">
          <table className="compare">
            <thead>
              <tr>
                <th>Discipline</th>
                <th>Target Mandate & Profile</th>
                <th>Reference Production Stack</th>
              </tr>
            </thead>
            <tbody>
              {roadmaps.map((r) => (
                <tr key={r.slug}>
                  <td>
                    <Link to={`/${r.slug}`}>
                      <strong>{r.title}</strong>
                    </Link>
                  </td>
                  <td>{r.audience}</td>
                  <td>{r.tools.slice(0, 4).join(" · ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="container narrow">
        <h2 className="h2">Methodology & Frequently Asked Questions</h2>
        {faqs.map((f) => (
          <details key={f.q} className="faq">
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </section>
    </>
  );
}
