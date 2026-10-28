import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Tilt3DCard } from "../components/Tilt3DCard";
import { roadmaps, topicsOf } from "../content";
import { awardBonusXp } from "../gamification";

export interface MncAcademyItem {
  org: string;
  badge: string;
  emoji: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  free: boolean;
  url: string;
  summary: string;
  skills: string[];
}

export interface YoutubeMasterItem {
  creator: string;
  subs: string;
  specialty: string;
  title: string;
  duration: string;
  url: string;
  topicLink: string;
  topicLabel: string;
  summary: string;
}

export interface EcosystemSite {
  name: string;
  badge: string;
  emoji: string;
  category: "AI Tools Directory" | "Interactive Coding" | "Models & Datasets" | "Research & Benchmarks" | "Prompt & Agent Hubs";
  url: string;
  description: string;
  bestFor: string;
}

export const MNC_ACADEMIES: MncAcademyItem[] = [
  {
    org: "DeepLearning.AI (Andrew Ng)",
    badge: "GOLD STANDARD",
    emoji: "🧠",
    title: "DeepLearning.AI Short Courses & Specializations",
    level: "Beginner",
    free: true,
    url: "https://www.deeplearning.ai/short-courses/",
    summary: "60+ hands-on courses built directly with OpenAI, Anthropic, Meta, LangChain, LlamaIndex, CrewAI, and AWS.",
    skills: ["Prompt Engineering", "RAG", "LangGraph Agents", "ML & Deep Learning", "MLOps"],
  },
  {
    org: "Anthropic Academy",
    badge: "FRONTIER LAB",
    emoji: "🧡",
    title: "Anthropic Official Courses, Prompt Tutorial & MCP Docs",
    level: "Intermediate",
    free: true,
    url: "https://github.com/anthropics/courses",
    summary: "Official engineering playbooks on Claude prompt design, tool use, evals, Contextual Retrieval, and Model Context Protocol (MCP).",
    skills: ["Claude API", "Tool Calling", "MCP Servers", "Agentic Workflows", "Evals"],
  },
  {
    org: "Google Cloud & DeepMind",
    badge: "MNC CERTIFICATION",
    emoji: "🌐",
    title: "Google Cloud Skills Boost — Generative AI & ML Crash Course",
    level: "Beginner",
    free: true,
    url: "https://www.cloudskillsboost.google/paths/118",
    summary: "Google's official curriculum covering LLMs, Vertex AI, Responsible AI, Machine Learning Crash Course, and MLOps.",
    skills: ["Gemini & Vertex AI", "ML Crash Course", "Responsible AI", "Embeddings"],
  },
  {
    org: "Microsoft Learn",
    badge: "FREE GITHUB CURRICULUM",
    emoji: "💠",
    title: "Generative AI & AI Agents for Beginners (Microsoft Official)",
    level: "Beginner",
    free: true,
    url: "https://github.com/microsoft/generative-ai-for-beginners",
    summary: "21-lesson GenAI curriculum + 10-lesson AI Agents curriculum with Python/TypeScript code, Azure AI, and AutoGen.",
    skills: ["GenAI Foundations", "AI Agents", "RAG", "Responsible AI", "Python"],
  },
  {
    org: "NVIDIA Deep Learning Institute (DLI)",
    badge: "GPU & INFERENCE",
    emoji: "🟢",
    title: "NVIDIA DLI — Accelerated Deep Learning, RAG & Triton Serving",
    level: "Advanced",
    free: true,
    url: "https://www.nvidia.com/en-us/training/",
    summary: "Master GPU-accelerated training, TensorRT-LLM, quantization, CUDA fundamentals, and enterprise RAG pipelines.",
    skills: ["CUDA & GPUs", "TensorRT-LLM", "Triton Server", "LoRA Fine-Tuning"],
  },
  {
    org: "OpenAI Academy & Cookbook",
    badge: "PRODUCTION CODE",
    emoji: "⚡",
    title: "OpenAI Developer Cookbook & Structured Outputs Guide",
    level: "Intermediate",
    free: true,
    url: "https://cookbook.openai.com/",
    summary: "Production-ready Python/Node recipes for Structured Outputs, Function Calling, Realtime Voice Agents, and Evals.",
    skills: ["Structured JSON", "Realtime Agents", "Embeddings", "Automated Evals"],
  },
  {
    org: "Hugging Face Learn",
    badge: "OPEN-SOURCE HUB",
    emoji: "🤗",
    title: "Hugging Face NLP, LLM, Smol-Course & AI Agents Courses",
    level: "Intermediate",
    free: true,
    url: "https://huggingface.co/learn",
    summary: "Free community certifications covering Transformers, Diffusers, PEFT/LoRA fine-tuning, DPO alignment, and open-source agents.",
    skills: ["Transformers", "LoRA / QLoRA", "TRL & DPO", "Open-Weights Models"],
  },
  {
    org: "AWS Skill Builder & ML University",
    badge: "CLOUD AI SCALE",
    emoji: "☁️",
    title: "AWS Generative AI, Amazon Bedrock & MLOps Engineering",
    level: "Intermediate",
    free: true,
    url: "https://aws.amazon.com/training/learn-about/machine-learning/",
    summary: "Cloud architecture patterns for multi-tenant Bedrock RAG, SageMaker pipelines, security guardrails, and FinOps.",
    skills: ["Amazon Bedrock", "SageMaker MLOps", "Cloud IAM", "Cost Optimization"],
  },
  {
    org: "Stanford & MIT OpenCourseWare",
    badge: "IVY / UNIVERSITY",
    emoji: "🎓",
    title: "Stanford CS229 (ML), CS224N (NLP), CS25 (Transformers) & MIT 6.S191",
    level: "Advanced",
    free: true,
    url: "https://introtodeeplearning.com/",
    summary: "Full university lecture videos, slides, and assignments from Stanford and MIT professors.",
    skills: ["Mathematical Foundations", "Transformers", "Deep Learning", "Research Papers"],
  },
];

export const YOUTUBE_MASTERS: YoutubeMasterItem[] = [
  {
    creator: "Programming with Mosh (Mosh Hamedani)",
    subs: "4.3M+ Subscribers",
    specialty: "Python, SQL & Git Foundations",
    title: "Python Full Course for Beginners (6+ Hours)",
    duration: "6h 14m",
    url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
    topicLink: "/ai-engineer/python-essentials",
    topicLabel: "Python for AI Work",
    summary: "The world's go-to beginner course for Python syntax, data structures, modules, and clean coding habits.",
  },
  {
    creator: "Andrej Karpathy",
    subs: "1.1M+ Subscribers",
    specialty: "LLMs, GPT from Scratch & Tokenizers",
    title: "Deep Dive into LLMs like ChatGPT & Let's Build GPT from Scratch",
    duration: "3h 31m",
    url: "https://www.youtube.com/watch?v=7xTGNNLPyMI",
    topicLink: "/generative-ai-engineer/how-llms-work",
    topicLabel: "How LLMs Work",
    summary: "Former Tesla AI Director & OpenAI cofounder explains pretraining, tokenization, SFT, RLHF, and builds GPT in PyTorch.",
  },
  {
    creator: "3Blue1Brown (Grant Sanderson)",
    subs: "6.8M+ Subscribers",
    specialty: "Visual Math, Neural Nets & Attention",
    title: "Neural Networks, Backpropagation & Transformers Visually Explained",
    duration: "27m + Playlist",
    url: "https://www.youtube.com/watch?v=wjZofJX0v4M",
    topicLink: "/generative-ai-engineer/attention-transformer",
    topicLabel: "Attention & Transformers",
    summary: "Unbeatable 3D visual intuition for linear algebra, gradient descent, embeddings, and self-attention.",
  },
  {
    creator: "StatQuest with Josh Starmer",
    subs: "1.4M+ Subscribers",
    specialty: "Machine Learning, Metrics & Statistics",
    title: "Machine Learning, XGBoost, ROC-AUC & Cross-Validation Explained",
    duration: "Playlist",
    url: "https://www.youtube.com/@statquest",
    topicLink: "/machine-learning-engineer/ml-fundamentals",
    topicLabel: "ML Fundamentals & Metrics",
    summary: "Breaks down every classical ML algorithm, loss function, and evaluation metric with zero intimidation.",
  },
  {
    creator: "freeCodeCamp.org",
    subs: "10.5M+ Subscribers",
    specialty: "Full-Length PyTorch, RAG, LangChain & MLOps Bootcamps",
    title: "PyTorch Deep Learning (24h) & Production RAG Full Courses",
    duration: "24h+",
    url: "https://www.youtube.com/watch?v=V_xro1bcAuA",
    topicLink: "/machine-learning-engineer/pytorch-training",
    topicLabel: "PyTorch & Deep Learning",
    summary: "Complete end-to-end coding bootcamps with zero paywalls.",
  },
  {
    creator: "DataTalksClub (Alexey Grigorev)",
    subs: "MLOps & LLM Zoomcamps",
    specialty: "MLOps, Docker, Prefect, Monitoring & Deployment",
    title: "MLOps Zoomcamp & LLM Zoomcamp (Free Cohort & Videos)",
    duration: "40h+ Playlist",
    url: "https://www.youtube.com/playlist?list=PL3MmuxUbc_hIUISrluw_A7wDSmfOhErJK",
    topicLink: "/mlops-engineer/mlops-lifecycle",
    topicLabel: "MLOps Lifecycle",
    summary: "Hands-on production engineering covering experiment tracking, orchestration, model registries, and drift monitoring.",
  },
  {
    creator: "TechWorld with Nana",
    subs: "1.2M+ Subscribers",
    specialty: "Docker, Kubernetes, CI/CD & Cloud Infrastructure",
    title: "Docker, Kubernetes & GitHub Actions Complete Bootcamp",
    duration: "4h 00m",
    url: "https://www.youtube.com/watch?v=3c-iBn73dDE",
    topicLink: "/mlops-engineer/docker",
    topicLabel: "Containers with Docker",
    summary: "The clearest infrastructure explanations for AI and MLOps engineers.",
  },
  {
    creator: "Two Minute Papers & Yannic Kilcher",
    subs: "1.6M+ Subscribers",
    specialty: "Frontier AI Research Papers Explained",
    title: "Latest AI Breakthroughs & Paper Walkthroughs",
    duration: "10–45m",
    url: "https://www.youtube.com/@TwoMinutePapers",
    topicLink: "/generative-ai-engineer/pretraining-scaling",
    topicLabel: "Pretraining & Scaling Laws",
    summary: "Stay on top of new arXiv papers, multimodal models, and scaling breakthroughs in minutes.",
  },
  {
    creator: "Matt Wolfe & Nick Saraev",
    subs: "1M+ Subscribers",
    specialty: "AI Tools, n8n/Make Workflows & No-Code Automation",
    title: "Weekly AI Tool Breakdowns & End-to-End n8n Automation Builds",
    duration: "30m–2h",
    url: "https://www.youtube.com/@mreflow",
    topicLink: "/ai-automation-specialist/no-code-tools",
    topicLabel: "No-Code Automation Tools",
    summary: "Discover practical AI tools and build revenue-generating business automations without a CS degree.",
  },
];

export const ECOSYSTEM_PORTALS: EcosystemSite[] = [
  {
    name: "There's An AI For That (TAAFT)",
    badge: "#1 AI DIRECTORY",
    emoji: "🧭",
    category: "AI Tools Directory",
    url: "https://theresanaiforthat.com/",
    description: "The world's largest live index of 12,000+ AI tools searchable by job role, use case, and task.",
    bestFor: "Finding ready-to-use AI tools before building from scratch (Build vs Buy).",
  },
  {
    name: "DataCamp",
    badge: "INTERACTIVE LABS",
    emoji: "💻",
    category: "Interactive Coding",
    url: "https://www.datacamp.com/",
    description: "Interactive browser-based courses for Python, SQL, PyTorch, OpenAI API, LangChain, and AI Fundamentals.",
    bestFor: "Non-tech beginners and engineers who want guided in-browser coding exercises.",
  },
  {
    name: "Hugging Face Hub",
    badge: "OPEN WEIGHTS",
    emoji: "🤗",
    category: "Models & Datasets",
    url: "https://huggingface.co/",
    description: "The GitHub of AI: 1M+ open-weights LLMs, vision models, datasets, leaderboards, and live Spaces demos.",
    bestFor: "Downloading Llama/Qwen/Mistral weights, datasets, and hosting Gradio prototypes.",
  },
  {
    name: "Kaggle",
    badge: "FREE GPUS & DATA",
    emoji: "🏆",
    category: "Interactive Coding",
    url: "https://www.kaggle.com/",
    description: "Google's data science community offering free cloud GPU notebooks, 300k+ datasets, micro-courses, and competitions.",
    bestFor: "Practicing feature engineering, XGBoost, and PyTorch on real tabular/vision datasets.",
  },
  {
    name: "LMSYS Chatbot Arena (LMArena)",
    badge: "LIVE LEADERBOARD",
    emoji: "⚔️",
    category: "Research & Benchmarks",
    url: "https://lmarena.ai/",
    description: "Blind human side-by-side battles ranking GPT, Claude, Gemini, Llama, and DeepSeek by ELO rating.",
    bestFor: "Choosing the best frontier or open-weight model for coding, reasoning, or vision.",
  },
  {
    name: "Papers With Code & arXiv",
    badge: "RESEARCH + GITHUB",
    emoji: "📄",
    category: "Research & Benchmarks",
    url: "https://paperswithcode.com/",
    description: "Links machine learning research papers directly to their official GitHub code and SOTA benchmark tables.",
    bestFor: "Validating state-of-the-art architectures and finding reproducible reference implementations.",
  },
  {
    name: "Futurepedia & Product Hunt AI",
    badge: "DAILY AI LAUNCHES",
    emoji: "🚀",
    category: "AI Tools Directory",
    url: "https://www.futurepedia.io/",
    description: "Curated directory of daily AI product launches, productivity tools, and enterprise SaaS workflows.",
    bestFor: "AI Product Managers and Automation Specialists tracking market trends.",
  },
  {
    name: "Smithery & Official MCP Registry",
    badge: "AGENT TOOLS",
    emoji: "🔌",
    category: "Prompt & Agent Hubs",
    url: "https://modelcontextprotocol.io/",
    description: "Open standard and community servers connecting AI agents to GitHub, Postgres, Slack, browser, and local files.",
    bestFor: "Agentic AI Engineers wiring standardized tool integrations.",
  },
];

export default function UniversityPage() {
  const [tab, setTab] = useState<"all" | "mnc" | "youtube" | "portals" | "encyclopedia">("all");
  const [search, setSearch] = useState("");

  const allUniqueTopics = useMemo(() => {
    const map = new Map<string, { id: string; title: string; summary: string; minutes: number; roleSlug: string; roleTitle: string; roleEmoji: string }>();
    for (const r of roadmaps) {
      for (const t of topicsOf(r)) {
        if (!map.has(t.id)) {
          map.set(t.id, {
            id: t.id,
            title: t.title,
            summary: t.summary,
            minutes: t.minutes,
            roleSlug: r.slug,
            roleTitle: r.title,
            roleEmoji: r.emoji,
          });
        }
      }
    }
    return Array.from(map.values());
  }, []);

  const q = search.trim().toLowerCase();

  const filteredMnc = MNC_ACADEMIES.filter(
    (m) => !q || `${m.org} ${m.title} ${m.summary} ${m.skills.join(" ")}`.toLowerCase().includes(q)
  );
  const filteredYt = YOUTUBE_MASTERS.filter(
    (y) => !q || `${y.creator} ${y.title} ${y.specialty} ${y.summary}`.toLowerCase().includes(q)
  );
  const filteredPortals = ECOSYSTEM_PORTALS.filter(
    (p) => !q || `${p.name} ${p.category} ${p.description} ${p.bestFor}`.toLowerCase().includes(q)
  );
  const filteredTopics = allUniqueTopics.filter(
    (t) => !q || `${t.title} ${t.summary} ${t.roleTitle}`.toLowerCase().includes(q)
  );

  return (
    <div className="container">
      <div className="glass-3d" style={{ padding: "32px 28px", marginBottom: 28 }}>
        <span className="pill neon-pill">🎓 XPLAINED.IN AI UNIVERSITY · ONE-STOP GLOBAL AI LIBRARY</span>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 46px)", margin: "6px 0 12px" }}>
          The Complete <span className="ai-grad">AI University & Resource Vault</span>
        </h1>
        <p className="lead" style={{ maxWidth: 820 }}>
          More than career roadmaps — this is your end-to-end AI encyclopedia. Explore every deep-dive textbook module,
          official courses from <strong>Google, Anthropic, Microsoft, DeepLearning.AI & NVIDIA</strong>, the internet's
          best <strong>YouTube masterclasses (Mosh, Karpathy, 3Blue1Brown, StatQuest)</strong>, and essential platforms like{" "}
          <strong>There's An AI For That, DataCamp, Hugging Face & Kaggle</strong>.
        </p>

        <div className="toolbar" style={{ marginBottom: 0 }}>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search courses, Mosh Python, Anthropic, RAG, TheresAnAIForThat..."
            style={{ minWidth: 320, flex: 1 }}
          />
          <div className="tabs">
            <button type="button" className={`tab ${tab === "all" ? "active" : ""}`} onClick={() => setTab("all")}>
              🌐 Everything
            </button>
            <button type="button" className={`tab ${tab === "mnc" ? "active" : ""}`} onClick={() => setTab("mnc")}>
              🏛️ Top MNC Courses ({filteredMnc.length})
            </button>
            <button type="button" className={`tab ${tab === "youtube" ? "active" : ""}`} onClick={() => setTab("youtube")}>
              ▶️ Top AI YouTubers ({filteredYt.length})
            </button>
            <button type="button" className={`tab ${tab === "portals" ? "active" : ""}`} onClick={() => setTab("portals")}>
              🧭 AI Directories & Labs ({filteredPortals.length})
            </button>
            <button type="button" className={`tab ${tab === "encyclopedia" ? "active" : ""}`} onClick={() => setTab("encyclopedia")}>
              📚 All {filteredTopics.length} Deep-Dive Modules
            </button>
          </div>
        </div>
      </div>

      {(tab === "all" || tab === "mnc") && (
        <section className="section">
          <span className="pill neon-pill">🏛️ OFFICIAL TECH GIANT ACADEMIES</span>
          <h2 className="h2" style={{ marginTop: 6 }}>
            Learn Directly from Google, Anthropic, Microsoft, DeepLearning.AI & NVIDIA
          </h2>
          <p className="muted" style={{ marginTop: -8, marginBottom: 18 }}>
            Every resource below is official, vetted by senior engineers, and earns you <strong>+30 Bonus XP</strong> when you explore it.
          </p>
          <div className="grid">
            {filteredMnc.map((item) => (
              <Tilt3DCard key={item.title}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="card"
                  onClick={() => awardBonusXp(30, "lab")}
                >
                  <div className="card-top">
                    <span className="emoji">{item.emoji}</span>
                    <span className="badge neon">{item.badge}</span>
                  </div>
                  <div className="meta">
                    <span>{item.org}</span>
                    <span>{item.level} · {item.free ? "FREE" : "Paid"}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <div className="chip-row">
                    {item.skills.map((s) => (
                      <span key={s} className="mini-chip">{s}</span>
                    ))}
                  </div>
                  <span style={{ fontWeight: 700, fontSize: 13, color: "var(--accent)" }}>
                    Open Official Academy (+30 XP) ↗
                  </span>
                </a>
              </Tilt3DCard>
            ))}
          </div>
        </section>
      )}

      {(tab === "all" || tab === "youtube") && (
        <section className="section" style={{ marginTop: 44 }}>
          <span className="pill neon-pill">▶️ HALL-OF-FAME AI YOUTUBERS & LECTURES</span>
          <h2 className="h2" style={{ marginTop: 6 }}>
            Curated Video Masterclasses Connected to Your Topics
          </h2>
          <p className="muted" style={{ marginTop: -8, marginBottom: 18 }}>
            Watch Mosh Hamedani for Python, Andrej Karpathy for LLMs, 3Blue1Brown for visual neural nets, and jump straight to the matching XplAIned module.
          </p>
          <div className="grid">
            {filteredYt.map((yt) => (
              <Tilt3DCard key={yt.title}>
                <div className="card">
                  <div className="card-top">
                    <span className="badge neon-green">▶️ {yt.duration}</span>
                    <span className="badge">{yt.subs}</span>
                  </div>
                  <div className="meta">
                    <strong style={{ color: "var(--fg)" }}>{yt.creator}</strong>
                    <span>{yt.specialty}</span>
                  </div>
                  <h3>{yt.title}</h3>
                  <p>{yt.summary}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: "auto" }}>
                    <a
                      href={yt.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn primary small"
                      onClick={() => awardBonusXp(30, "lab")}
                    >
                      ▶️ Watch on YouTube (+30 XP) ↗
                    </a>
                    <Link to={yt.topicLink} className="btn small">
                      📖 Study: {yt.topicLabel}
                    </Link>
                  </div>
                </div>
              </Tilt3DCard>
            ))}
          </div>
        </section>
      )}

      {(tab === "all" || tab === "portals") && (
        <section className="section" style={{ marginTop: 44 }}>
          <span className="pill neon-pill">🧭 ESSENTIAL AI DIRECTORIES, PLATFORMS & BENCHMARKS</span>
          <h2 className="h2" style={{ marginTop: 6 }}>
            Where AI Practitioners Go Daily (There's An AI For That, DataCamp, Hugging Face & More)
          </h2>
          <div className="grid">
            {filteredPortals.map((site) => (
              <Tilt3DCard key={site.name}>
                <a
                  href={site.url}
                  target="_blank"
                  rel="noreferrer"
                  className="card"
                  onClick={() => awardBonusXp(25, "lab")}
                >
                  <div className="card-top">
                    <span className="emoji">{site.emoji}</span>
                    <span className="badge neon">{site.badge}</span>
                  </div>
                  <div className="meta">
                    <span>{site.category}</span>
                  </div>
                  <h3>{site.name}</h3>
                  <p>{site.description}</p>
                  <p style={{ fontSize: 12.5, color: "#cfd6f0", marginBottom: 10 }}>
                    <strong>Best for:</strong> {site.bestFor}
                  </p>
                  <span style={{ fontWeight: 700, fontSize: 13, color: "var(--accent)" }}>
                    Launch {site.name} (+25 XP) ↗
                  </span>
                </a>
              </Tilt3DCard>
            ))}
          </div>
        </section>
      )}

      {(tab === "all" || tab === "encyclopedia") && (
        <section className="section" style={{ marginTop: 44 }}>
          <span className="pill neon-pill">📚 COMPLETE A–Z AI ENCYCLOPEDIA ({filteredTopics.length} MODULES)</span>
          <h2 className="h2" style={{ marginTop: 6 }}>
            Every AI Concept — With Architecture, Flowcharts, Playbooks, Case Studies & Videos
          </h2>
          <p className="muted" style={{ marginTop: -8, marginBottom: 18 }}>
            Click any module to open its full textbook chapter, architecture diagram, step-by-step playbook, real-world case studies, and curated courses.
          </p>
          <div className="grid">
            {filteredTopics.map((t) => (
              <Link key={t.id} to={`/${t.roleSlug}/${t.id}`} className="card">
                <div className="card-top">
                  <span className="badge">{t.roleEmoji} {t.roleTitle}</span>
                  <span className="badge neon">⏱️ {t.minutes}m · +120 XP</span>
                </div>
                <h3>{t.title}</h3>
                <p>{t.summary}</p>
                <div className="chip-row" style={{ marginBottom: 0 }}>
                  <span className="mini-chip">📐 Architecture</span>
                  <span className="mini-chip">🔀 Flowchart</span>
                  <span className="mini-chip">📋 Playbook</span>
                  <span className="mini-chip">🏢 Case Studies</span>
                  <span className="mini-chip">▶️ Videos</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
