import { Link, useSearchParams } from "react-router-dom";
import { InteractiveLabs } from "../components/InteractiveLabs";
import { RoleFinderWidget } from "../components/RoleFinderWidget";
import { Tilt3DCard } from "../components/Tilt3DCard";
import { minutesOf, roadmaps, stats, topicsOf } from "../content";
import { countFinished } from "../progress";
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
    q: "Ordered Competency Progression",
    a: "Structured dependency stages with technical verification checkpoints, competency credit telemetry, and persistent progress tracking across shared foundational modules.",
    tag: "PILLAR · 03",
  },
  {
    q: "Executive & First-Principles Briefings",
    a: "Toggle Executive Briefing mode inside any specification to inspect the core architectural thesis, systems mental model, and immediate verification protocol.",
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
    q: "How are Competency Credits and Practitioner Tiers calculated?",
    a: "Completing a technical specification records +120 Credits, passing a Technical Verification checkpoint awards +50 to +75 Credits, and executing interactive workbench simulations awards bonus credits. All telemetry is persisted locally in your browser.",
  },
  {
    q: "How should I select my primary specialization track?",
    a: "Complete the Architectural Track Diagnostic above or review the Role Specification Matrix below. Foundational modules (such as LLM internals, prompt specifications, and evaluation frameworks) are shared across tracks, so completed credits transfer automatically.",
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

  return (
    <>
      <section className="hero-wrap">
        <div className="container hero hero-3d">
          <div className="hero-copy">
            <span className="pill neon-pill">TECHNICAL CURRICULA · SYSTEMS ARCHITECTURE · EMPIRICAL BENCHMARKS</span>
            <h1>
              The Definitive Engineering Reference for{" "}
              <span className="ai-grad">Applied AI Systems.</span>
            </h1>
            <p className="lead">
              Rigorous curricula and production specifications across nine AI engineering and leadership disciplines.
              Every module pairs <strong>first-principles systems analysis, interactive execution flowcharts, ASCII reference architectures,
              operational playbooks, and enterprise case studies</strong> with primary courses from{" "}
              <strong>Anthropic, DeepLearning.AI, Google Cloud, Microsoft, NVIDIA, and Stanford</strong>.
            </p>
            <div className="cta">
              <a className="btn primary glow-btn" href="#matcher">
                Run Track Diagnostic
              </a>
              <Link className="btn" to="/university">
                Research & Course Index
              </Link>
              <a className="btn" href="#roles">
                9 Engineering Curricula
              </a>
              <a className="btn" href="#arcade">
                Systems Workbench
              </a>
            </div>
            <dl className="stats">
              <div>
                <dt>0{stats.roadmaps}</dt>
                <dd>Specialization Tracks</dd>
              </div>
              <div>
                <dt>{stats.topics}</dt>
                <dd>Technical Specifications</dd>
              </div>
              <div>
                <dt>50+</dt>
                <dd>Primary Research & Courses</dd>
              </div>
            </dl>
          </div>

          <div className="hero-cube-stage" aria-hidden="true">
            <div className="holo-ring ring-1" />
            <div className="holo-ring ring-2" />
            <div className="holo-ring ring-3" />
            <div className="cube-3d">
              <div className="face front">SYS · AGENTS</div>
              <div className="face back">CORE · LLMs</div>
              <div className="face right">ARCH · RAG</div>
              <div className="face left">SPEC · EVALS</div>
              <div className="face top">INFRA · MLOPS</div>
              <div className="face bottom">GOV · SAFETY</div>
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
            const total = topicsOf(r).length;
            const done = countFinished(r.slug);
            const pct = total ? Math.round((done / total) * 100) : 0;
            const mins = minutesOf(r);
            const isNoCode = NO_CODE_SLUGS.has(r.slug);
            return (
              <Tilt3DCard key={r.slug}>
                <Link to={`/${r.slug}`} className="card role-card">
                  <div className="card-top">
                    <span className="emoji" aria-hidden="true">
                      {r.emoji}
                    </span>
                    <span className={`badge ${isNoCode ? "neon-green" : "neon"}`}>
                      {isNoCode ? "STRATEGY & GOVERNANCE" : "SYSTEMS ENGINEERING"}
                    </span>
                  </div>
                  <h3>{r.title}</h3>
                  <p>{r.description}</p>
                  <div className="chip-row">
                    {r.tools.slice(0, 3).map((t) => (
                      <span key={t} className="mini-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="meta">
                    <span>{total} Specifications</span>
                    <span>~{Math.floor(mins / 60)}h {mins % 60}m Study</span>
                    <span>{total * 120} CR</span>
                  </div>
                  <div className="progress small" aria-label={`${pct}% complete`}>
                    <div className="bar" style={{ width: `${pct}%` }} />
                  </div>
                </Link>
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
