import { Link, useSearchParams } from "react-router-dom";
import { InteractiveLabs } from "../components/InteractiveLabs";
import { RoleFinderWidget } from "../components/RoleFinderWidget";
import { Tilt3DCard } from "../components/Tilt3DCard";
import { minutesOf, roadmaps, stats, topicsOf } from "../content";
import { countFinished } from "../progress";
import { ECOSYSTEM_PORTALS, MNC_ACADEMIES, YOUTUBE_MASTERS } from "./UniversityPage";

const PROBLEMS_SOLVED = [
  {
    q: '"I know I need to learn AI, but I don\'t know where to start"',
    a: "Take our 30-second Role Matcher right below — it routes you to your exact starting track.",
    tag: "SOLVED · 01",
  },
  {
    q: '"What should I learn in AI — and how?"',
    a: "Every role is broken into ordered quests with real code, prompts, and hands-on AI Arcade labs.",
    tag: "SOLVED · 02",
  },
  {
    q: '"I don\'t have a clear roadmap and milestones"',
    a: "Visual skill-trees with checkpoint quizzes, XP bars, streaks, and unlockable badges.",
    tag: "SOLVED · 03",
  },
  {
    q: '"I have a roadmap, but there\'s no simple way to learn"',
    a: 'Every single lesson has a 1-click "Explain Like I\'m 15 / Zero-Jargon" mode + real-life analogy.',
    tag: "SOLVED · 04",
  },
  {
    q: '"I don\'t have a tech background, but I want to master AI"',
    a: "Non-coding tracks (AI PM, AI Automation, AI Governance) + no-code action steps on every topic.",
    tag: "SOLVED · 05",
  },
  {
    q: '"I want to break into high-impact AI roles"',
    a: "9 end-to-end career tracks covering foundations, portfolio projects, and interview readiness.",
    tag: "SOLVED · 06",
  },
];

const NO_CODE_SLUGS = new Set([
  "ai-product-manager",
  "ai-automation-specialist",
  "ai-governance-compliance-specialist",
]);

const faqs = [
  {
    q: "I have zero coding experience. Can I actually use this?",
    a: "100% yes. Hit the '🌱 No-Tech Friendly' filter below to start with AI Product Manager, AI Automation Specialist, or AI Governance — and flip on 'Explain Like I'm 15' inside any lesson.",
  },
  {
    q: "How do XP, Levels, and Streaks work?",
    a: "Every milestone you finish drops +120 XP, interactive quizzes drop +50 to +75 XP, and AI Arcade labs drop bonus XP. Everything saves automatically in your browser.",
  },
  {
    q: "Which role should I pick first?",
    a: "Use the 3-click Role Matcher right below the hero, or check the comparison matrix. Many foundational quests are shared across roles, so your progress carries over!",
  },
  {
    q: "Are the regulatory & tool lessons up to date?",
    a: "Tools and regulations (like the EU AI Act, NIST AI RMF, ISO 42001) move fast — we focus on durable mental models and remind you to verify official texts for legal compliance.",
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
            <span className="pill neon-pill">🎓 THE ONE-STOP AI UNIVERSITY · ROADMAPS + TEXTBOOKS + MNC COURSES</span>
            <h1>
              Your End-to-End <br />
              <span className="ai-grad">University for Mastering AI.</span>
            </h1>
            <p className="lead">
              Every topic includes <strong>detailed systems explanations, visual flowcharts, architecture blueprints,
              step-by-step playbooks, real enterprise case studies, comparison tables</strong>, plus direct links to{" "}
              <strong>Google, Anthropic, Microsoft, DeepLearning.AI, NVIDIA</strong>, top <strong>AI YouTubers (Mosh, Karpathy, 3Blue1Brown)</strong>,
              and platforms like <strong>There's An AI For That & DataCamp</strong>.
            </p>
            <div className="cta">
              <a className="btn primary glow-btn" href="#matcher">
                🧭 Find My AI Role (30s)
              </a>
              <Link className="btn" to="/university">
                🎓 Open AI University Library
              </Link>
              <a className="btn" href="#roles">
                🎮 9 Career Skill Trees
              </a>
              <a className="btn" href="#arcade">
                🕹️ Live AI Labs
              </a>
            </div>
            <dl className="stats">
              <div>
                <dt>{stats.roadmaps}</dt>
                <dd>Career Tracks</dd>
              </div>
              <div>
                <dt>{stats.topics}</dt>
                <dd>Deep-Dive Textbooks</dd>
              </div>
              <div>
                <dt>50+</dt>
                <dd>MNC & YouTube Courses</dd>
              </div>
            </dl>
          </div>

          <div className="hero-cube-stage" aria-hidden="true">
            <div className="holo-ring ring-1" />
            <div className="holo-ring ring-2" />
            <div className="holo-ring ring-3" />
            <div className="cube-3d">
              <div className="face front">🤖 AGENTS</div>
              <div className="face back">✨ LLMs</div>
              <div className="face right">🛠️ RAG</div>
              <div className="face left">🧭 AI PM</div>
              <div className="face top">⚡ MLOps</div>
              <div className="face bottom">⚖️ SAFETY</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container" id="matcher">
        <RoleFinderWidget />
      </section>

      <section className="container">
        <div className="section-head">
          <span className="pill neon-pill">🔥 ZERO GATEKEEPING</span>
          <h2 className="h2">Built for the 6 Exact Roadblocks Holding You Back</h2>
        </div>
        <div className="grid problems-grid">
          {PROBLEMS_SOLVED.map((item) => (
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
          <span className="pill neon-pill">🗺️ 3D SKILL-TREE CATALOG</span>
          <h2 className="h2">Choose Your Character (9 End-to-End AI Roles)</h2>
        </div>

        <div className="toolbar">
          <input
            type="search"
            placeholder="Search roles, tools (Python, Zapier, PyTorch)..."
            aria-label="Search roles"
            value={params.get("q") ?? ""}
            onChange={(e) => setParam("q", e.target.value)}
          />
          <div className="tabs">
            <button
              type="button"
              className={filter === "all" ? "tab active" : "tab"}
              onClick={() => setParam("f", "all")}
            >
              All 9 Roles
            </button>
            <button
              type="button"
              className={filter === "nocode" ? "tab active" : "tab"}
              onClick={() => setParam("f", "nocode")}
            >
              🌱 No-Tech / Low-Code Friendly
            </button>
            <button
              type="button"
              className={filter === "builder" ? "tab active" : "tab"}
              onClick={() => setParam("f", "builder")}
            >
              ⚡ Code & Engineering Tracks
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
                      {isNoCode ? "🌱 No-Code Friendly" : "⚡ Code & Build"}
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
                    <span>🎯 {total} milestones</span>
                    <span>⏱️ ~{Math.floor(mins / 60)}h {mins % 60}m</span>
                    <span>⚡ +{total * 120} XP</span>
                  </div>
                  <div className="progress small" aria-label={`${pct}% complete`}>
                    <div className="bar" style={{ width: `${pct}%` }} />
                  </div>
                </Link>
              </Tilt3DCard>
            );
          })}
          {visible.length === 0 && <p className="muted">No roles match your search.</p>}
        </div>
      </section>

      <section className="container" id="arcade">
        <InteractiveLabs />
      </section>

      <section className="container" id="university-preview">
        <div className="arcade-header">
          <div>
            <span className="pill neon-pill">🏛️ GLOBAL AI UNIVERSITY VAULT</span>
            <h2 className="h2" style={{ margin: "6px 0 4px" }}>
              Top MNC Academies, Hall-of-Fame YouTubers & AI Tool Directories
            </h2>
            <p className="muted" style={{ margin: 0 }}>
              Every topic on XplAIned.in is wired directly to official courses and creator masterclasses.
            </p>
          </div>
          <Link to="/university" className="btn primary">
            🎓 Explore Full AI University Library →
          </Link>
        </div>

        <h3 className="h3" style={{ marginTop: 18 }}>🏛️ Official Tech Giant Academies (Google, Anthropic, Microsoft, DeepLearning.AI, NVIDIA)</h3>
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
                  <span>{m.level} · FREE</span>
                </div>
                <h3>{m.title}</h3>
                <p>{m.summary}</p>
                <span style={{ fontWeight: 700, fontSize: 13, color: "var(--accent)" }}>Open Official Course ↗</span>
              </a>
            </Tilt3DCard>
          ))}
        </div>

        <h3 className="h3" style={{ marginTop: 32 }}>▶️ Top AI YouTube Masterclasses (Mosh Python, Karpathy LLMs, 3Blue1Brown & More)</h3>
        <div className="grid">
          {YOUTUBE_MASTERS.slice(0, 6).map((yt) => (
            <Tilt3DCard key={yt.title}>
              <div className="card">
                <div className="card-top">
                  <span className="badge neon-green">▶️ {yt.duration}</span>
                  <span className="badge">{yt.subs}</span>
                </div>
                <div className="meta">
                  <strong style={{ color: "#fff" }}>{yt.creator}</strong>
                  <span>{yt.specialty}</span>
                </div>
                <h3>{yt.title}</h3>
                <p>{yt.summary}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "auto" }}>
                  <a href={yt.url} target="_blank" rel="noreferrer" className="btn primary small">
                    ▶️ Watch Video ↗
                  </a>
                  <Link to={yt.topicLink} className="btn small">
                    📖 Topic: {yt.topicLabel}
                  </Link>
                </div>
              </div>
            </Tilt3DCard>
          ))}
        </div>

        <h3 className="h3" style={{ marginTop: 32 }}>🧭 Essential AI Websites & Practice Platforms (There's An AI For That, DataCamp, Hugging Face, Kaggle)</h3>
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
                <span style={{ fontWeight: 700, fontSize: 13, color: "var(--accent)" }}>Visit {site.name} ↗</span>
              </a>
            </Tilt3DCard>
          ))}
        </div>
      </section>

      <section className="container" id="compare">
        <h2 className="h2">⚡ Side-by-Side Role Matrix</h2>
        <div className="table-wrap glass-3d">
          <table className="compare">
            <thead>
              <tr>
                <th>Role</th>
                <th>Best For</th>
                <th>Core Stack</th>
              </tr>
            </thead>
            <tbody>
              {roadmaps.map((r) => (
                <tr key={r.slug}>
                  <td>
                    <Link to={`/${r.slug}`}>
                      {r.emoji} <strong>{r.title}</strong>
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
        <h2 className="h2">💬 FAQ</h2>
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
