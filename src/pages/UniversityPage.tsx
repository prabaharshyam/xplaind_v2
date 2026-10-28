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
    badge: "FOUNDATIONAL CURRICULUM",
    emoji: "DL",
    title: "DeepLearning.AI Engineering Courses & Specializations",
    level: "Beginner",
    free: true,
    url: "https://www.deeplearning.ai/short-courses/",
    summary: "60+ technical courses developed in collaboration with OpenAI, Anthropic, Meta, LangChain, LlamaIndex, CrewAI, and AWS.",
    skills: ["Prompt Engineering", "Hybrid RAG", "LangGraph Runtimes", "Deep Learning", "MLOps"],
  },
  {
    org: "Anthropic Engineering",
    badge: "FRONTIER LAB",
    emoji: "ANT",
    title: "Anthropic Engineering Courses, Prompt Specifications & MCP",
    level: "Intermediate",
    free: true,
    url: "https://github.com/anthropics/courses",
    summary: "Official engineering playbooks covering Claude system prompt design, tool use, evaluation harnesses, Contextual Retrieval, and Model Context Protocol (MCP).",
    skills: ["Claude API", "Tool Calling", "MCP Servers", "Agentic Workflows", "Evals"],
  },
  {
    org: "Google Cloud & DeepMind",
    badge: "CLOUD ARCHITECTURE",
    emoji: "GCP",
    title: "Google Cloud Skills Boost — Generative AI & ML Crash Course",
    level: "Beginner",
    free: true,
    url: "https://www.cloudskillsboost.google/paths/118",
    summary: "Google's official engineering curriculum covering foundation models, Vertex AI, Responsible AI governance, Machine Learning Crash Course, and MLOps.",
    skills: ["Gemini & Vertex AI", "ML Crash Course", "Responsible AI", "Embeddings"],
  },
  {
    org: "Microsoft Learn",
    badge: "OPEN-SOURCE CURRICULUM",
    emoji: "MS",
    title: "Generative AI & Autonomous Agents Curriculum (Microsoft Official)",
    level: "Beginner",
    free: true,
    url: "https://github.com/microsoft/generative-ai-for-beginners",
    summary: "21-module Generative AI curriculum and 10-module AI Agents engineering guide with Python/TypeScript reference implementations.",
    skills: ["GenAI Foundations", "AI Agents", "RAG", "Responsible AI", "Python"],
  },
  {
    org: "NVIDIA Deep Learning Institute (DLI)",
    badge: "GPU & INFERENCE",
    emoji: "NV",
    title: "NVIDIA DLI — Accelerated Deep Learning, RAG & Triton Serving",
    level: "Advanced",
    free: true,
    url: "https://www.nvidia.com/en-us/training/",
    summary: "GPU-accelerated training, TensorRT-LLM compilation, quantization, CUDA fundamentals, and high-throughput enterprise RAG pipelines.",
    skills: ["CUDA & GPUs", "TensorRT-LLM", "Triton Server", "LoRA Fine-Tuning"],
  },
  {
    org: "OpenAI Engineering Cookbook",
    badge: "PRODUCTION PATTERNS",
    emoji: "OAI",
    title: "OpenAI Developer Cookbook & Structured Outputs Specification",
    level: "Intermediate",
    free: true,
    url: "https://cookbook.openai.com/",
    summary: "Production Python and TypeScript architectures for Structured Outputs, Function Calling, Realtime Agents, and automated evaluation suites.",
    skills: ["Structured JSON", "Realtime Agents", "Embeddings", "Automated Evals"],
  },
  {
    org: "Hugging Face Learn",
    badge: "OPEN-WEIGHTS ECOSYSTEM",
    emoji: "HF",
    title: "Hugging Face NLP, LLM, Smol-Course & Agent Engineering",
    level: "Intermediate",
    free: true,
    url: "https://huggingface.co/learn",
    summary: "Technical certifications covering Transformers, Diffusers, PEFT/LoRA fine-tuning, DPO preference alignment, and open-weights agents.",
    skills: ["Transformers", "LoRA / QLoRA", "TRL & DPO", "Open-Weights Models"],
  },
  {
    org: "AWS Machine Learning University",
    badge: "CLOUD INFRASTRUCTURE",
    emoji: "AWS",
    title: "AWS Generative AI, Amazon Bedrock & MLOps Engineering",
    level: "Intermediate",
    free: true,
    url: "https://aws.amazon.com/training/learn-about/machine-learning/",
    summary: "Enterprise cloud architectures for multi-tenant Bedrock RAG, SageMaker training pipelines, IAM guardrails, and inference FinOps.",
    skills: ["Amazon Bedrock", "SageMaker MLOps", "Cloud IAM", "Cost Optimization"],
  },
  {
    org: "Stanford & MIT OpenCourseWare",
    badge: "ACADEMIC RESEARCH",
    emoji: "UNI",
    title: "Stanford CS229 (ML), CS224N (NLP), CS25 (Transformers) & MIT 6.S191",
    level: "Advanced",
    free: true,
    url: "https://introtodeeplearning.com/",
    summary: "Complete university lecture series, mathematical derivations, and problem sets from Stanford and MIT faculty.",
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
    summary: "Comprehensive engineering introduction to Python syntax, data structures, modular design, and production coding standards.",
  },
  {
    creator: "Andrej Karpathy",
    subs: "1.1M+ Subscribers",
    specialty: "LLMs, GPT from Scratch & Tokenizers",
    title: "Deep Dive into LLMs like ChatGPT & Let's Build GPT from Scratch",
    duration: "3h 31m",
    url: "https://www.youtube.com/watch?v=7xTGNNLPyMI",
    topicLink: "/generative-ai-llm-engineer/how-llms-work",
    topicLabel: "How LLMs Work",
    summary: "First-principles walkthrough of pretraining, BPE tokenization, supervised fine-tuning, RLHF, and building a Transformer in PyTorch.",
  },
  {
    creator: "3Blue1Brown (Grant Sanderson)",
    subs: "6.8M+ Subscribers",
    specialty: "Visual Math, Neural Nets & Attention",
    title: "Neural Networks, Backpropagation & Transformers Visually Explained",
    duration: "27m + Playlist",
    url: "https://www.youtube.com/watch?v=wjZofJX0v4M",
    topicLink: "/generative-ai-llm-engineer/attention-transformer",
    topicLabel: "Attention & Transformers",
    summary: "Rigorous geometric intuition for linear algebra, backpropagation, high-dimensional embeddings, and multi-head self-attention.",
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
    summary: "Clear mathematical decompositions of classical ML algorithms, loss functions, regularization, and evaluation metrics.",
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
    summary: "Complete end-to-end engineering lectures covering tensor computation, neural network training, and retrieval pipelines.",
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
    summary: "Production systems engineering covering experiment tracking, workflow orchestration, model registries, and drift telemetry.",
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
    summary: "Containerization, Kubernetes cluster architecture, and automated CI/CD deployment pipelines for ML infrastructure.",
  },
  {
    creator: "Two Minute Papers & Yannic Kilcher",
    subs: "1.6M+ Subscribers",
    specialty: "Frontier AI Research Papers Explained",
    title: "Latest AI Breakthroughs & Paper Walkthroughs",
    duration: "10–45m",
    url: "https://www.youtube.com/@TwoMinutePapers",
    topicLink: "/generative-ai-llm-engineer/pretraining-scaling",
    topicLabel: "Pretraining & Scaling Laws",
    summary: "Technical analysis of foundational arXiv publications, compute-optimal scaling laws, and multimodal architectures.",
  },
  {
    creator: "Matt Wolfe & Nick Saraev",
    subs: "1M+ Subscribers",
    specialty: "AI Tools, n8n/Make Workflows & Enterprise Automation",
    title: "Enterprise n8n Workflow Architectures & AI Tooling Analysis",
    duration: "30m–2h",
    url: "https://www.youtube.com/@mreflow",
    topicLink: "/ai-automation-specialist/no-code-tools",
    topicLabel: "No-Code Automation Tools",
    summary: "Event-driven webhook orchestration, structured LLM data extraction, and production workflow automation.",
  },
];

export const ECOSYSTEM_PORTALS: EcosystemSite[] = [
  {
    name: "There's An AI For That (TAAFT)",
    badge: "MARKET INDEX",
    emoji: "IDX",
    category: "AI Tools Directory",
    url: "https://theresanaiforthat.com/",
    description: "Comprehensive market index of 12,000+ AI software products categorized by enterprise function, domain, and workflow.",
    bestFor: "Conducting Build-vs-Buy architectural evaluations prior to custom engineering.",
  },
  {
    name: "DataCamp",
    badge: "INTERACTIVE RUNTIME",
    emoji: "LAB",
    category: "Interactive Coding",
    url: "https://www.datacamp.com/",
    description: "Browser-based execution environments for Python, SQL, PyTorch, OpenAI API, LangChain, and statistical modeling.",
    bestFor: "Practitioners seeking structured, in-browser implementation exercises.",
  },
  {
    name: "Hugging Face Hub",
    badge: "MODEL REGISTRY",
    emoji: "HF",
    category: "Models & Datasets",
    url: "https://huggingface.co/",
    description: "Primary open-weights registry hosting 1M+ model checkpoints, evaluation datasets, leaderboards, and Spaces runtimes.",
    bestFor: "Inspecting open-weights architectures (Llama, Qwen, Mistral) and benchmark datasets.",
  },
  {
    name: "Kaggle",
    badge: "DATASETS & BENCHMARKS",
    emoji: "KGL",
    category: "Interactive Coding",
    url: "https://www.kaggle.com/",
    description: "Empirical machine learning platform providing cloud GPU kernels, 300k+ datasets, and competitive benchmark leaderboards.",
    bestFor: "Validating feature engineering, gradient boosted trees, and deep learning architectures.",
  },
  {
    name: "LMSYS Chatbot Arena (LMArena)",
    badge: "ELO BENCHMARK",
    emoji: "ELO",
    category: "Research & Benchmarks",
    url: "https://lmarena.ai/",
    description: "Blind, randomized human preference evaluation ranking frontier and open-weight models via Bradley-Terry Elo ratings.",
    bestFor: "Empirical model selection across coding, reasoning, and instruction-following tasks.",
  },
  {
    name: "Papers With Code & arXiv",
    badge: "PRIMARY LITERATURE",
    emoji: "PWC",
    category: "Research & Benchmarks",
    url: "https://paperswithcode.com/",
    description: "Maps peer-reviewed machine learning publications directly to reference GitHub implementations and SOTA benchmark tables.",
    bestFor: "Auditing state-of-the-art architectures and reproducible reference code.",
  },
  {
    name: "Futurepedia & Product Hunt AI",
    badge: "ECOSYSTEM TELEMETRY",
    emoji: "DIR",
    category: "AI Tools Directory",
    url: "https://www.futurepedia.io/",
    description: "Curated intelligence directory tracking enterprise AI software releases, vertical SaaS tools, and workflow integrations.",
    bestFor: "AI Product Managers and Automation Architects monitoring vendor capabilities.",
  },
  {
    name: "Smithery & Official MCP Registry",
    badge: "PROTOCOL REGISTRY",
    emoji: "MCP",
    category: "Prompt & Agent Hubs",
    url: "https://modelcontextprotocol.io/",
    description: "Open protocol specification and server registry connecting agentic runtimes to GitHub, PostgreSQL, Slack, and enterprise systems.",
    bestFor: "Agentic Systems Engineers implementing standardized tool-calling interfaces.",
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
        <span className="pill neon-pill">RESEARCH & CURRICULUM INDEX · PRIMARY TECHNICAL ARCHIVE</span>
        <h1 style={{ fontSize: "clamp(28px, 4.5vw, 46px)", margin: "6px 0 12px" }}>
          Research, Curricula & <span className="ai-grad">Technical Specifications</span>
        </h1>
        <p className="lead" style={{ maxWidth: 820 }}>
          A consolidated technical archive indexing all {allUniqueTopics.length} engineering specifications alongside
          official curricula from <strong>Anthropic, DeepLearning.AI, Google Cloud, Microsoft, NVIDIA, and Stanford</strong>,
          foundational lectures from <strong>Andrej Karpathy, 3Blue1Brown, and StatQuest</strong>, and empirical benchmarks
          including <strong>LMSYS Chatbot Arena, Hugging Face, and Papers With Code</strong>.
        </p>

        <div className="toolbar" style={{ marginBottom: 0 }}>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by organization, topic, or protocol (Anthropic, RAG, Karpathy, MCP)..."
            style={{ minWidth: 320, flex: 1 }}
          />
          <div className="tabs">
            <button type="button" className={`tab ${tab === "all" ? "active" : ""}`} onClick={() => setTab("all")}>
              Complete Index
            </button>
            <button type="button" className={`tab ${tab === "mnc" ? "active" : ""}`} onClick={() => setTab("mnc")}>
              Engineering Academies ({filteredMnc.length})
            </button>
            <button type="button" className={`tab ${tab === "youtube" ? "active" : ""}`} onClick={() => setTab("youtube")}>
              Technical Lectures ({filteredYt.length})
            </button>
            <button type="button" className={`tab ${tab === "portals" ? "active" : ""}`} onClick={() => setTab("portals")}>
              Registries & Benchmarks ({filteredPortals.length})
            </button>
            <button type="button" className={`tab ${tab === "encyclopedia" ? "active" : ""}`} onClick={() => setTab("encyclopedia")}>
              All {filteredTopics.length} Specifications
            </button>
          </div>
        </div>
      </div>

      {(tab === "all" || tab === "mnc") && (
        <section className="section">
          <span className="pill neon-pill">FRONTIER LAB & UNIVERSITY ACADEMIES</span>
          <h2 className="h2" style={{ marginTop: 6 }}>
            Primary Engineering Curricula (Anthropic, DeepLearning.AI, Google, NVIDIA, Stanford)
          </h2>
          <p className="muted" style={{ marginTop: -8, marginBottom: 18 }}>
            Verified primary documentation and engineering courses. Inspecting any resource records <strong>+30 Competency Credits</strong>.
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
                    <span>{item.level} · {item.free ? "OPEN ACCESS" : "COMMERCIAL"}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <div className="chip-row">
                    {item.skills.map((s) => (
                      <span key={s} className="mini-chip">{s}</span>
                    ))}
                  </div>
                  <span style={{ fontWeight: 600, fontSize: 13, color: "var(--accent)" }}>
                    Inspect Curriculum (+30 CR) ↗
                  </span>
                </a>
              </Tilt3DCard>
            ))}
          </div>
        </section>
      )}

      {(tab === "all" || tab === "youtube") && (
        <section className="section" style={{ marginTop: 44 }}>
          <span className="pill neon-pill">FOUNDATIONAL TECHNICAL LECTURES</span>
          <h2 className="h2" style={{ marginTop: 6 }}>
            Implementation Walkthroughs & Mathematical Foundations
          </h2>
          <p className="muted" style={{ marginTop: -8, marginBottom: 18 }}>
            First-principles lectures mapped directly to corresponding XplAIned.in architectural specifications.
          </p>
          <div className="grid">
            {filteredYt.map((yt) => (
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
                    <a
                      href={yt.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn primary small"
                      onClick={() => awardBonusXp(30, "lab")}
                    >
                      View Lecture (+30 CR) ↗
                    </a>
                    <Link to={yt.topicLink} className="btn small">
                      Spec: {yt.topicLabel}
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
          <span className="pill neon-pill">EMPIRICAL BENCHMARKS, REGISTRIES & TOOLING</span>
          <h2 className="h2" style={{ marginTop: 6 }}>
            Model Registries, Evaluation Leaderboards & Market Directories
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
                  <p style={{ fontSize: 12.5, color: "var(--muted)", marginBottom: 10 }}>
                    <strong>Primary Use Case:</strong> {site.bestFor}
                  </p>
                  <span style={{ fontWeight: 600, fontSize: 13, color: "var(--accent)" }}>
                    Open {site.name} (+25 CR) ↗
                  </span>
                </a>
              </Tilt3DCard>
            ))}
          </div>
        </section>
      )}

      {(tab === "all" || tab === "encyclopedia") && (
        <section className="section" style={{ marginTop: 44 }}>
          <span className="pill neon-pill">TECHNICAL SPECIFICATION ARCHIVE ({filteredTopics.length} MODULES)</span>
          <h2 className="h2" style={{ marginTop: 6 }}>
            Complete A–Z Engineering Specifications
          </h2>
          <p className="muted" style={{ marginTop: -8, marginBottom: 18 }}>
            Select any module to inspect its systems analysis, execution pipeline, reference architecture, SOP playbook, and empirical case studies.
          </p>
          <div className="grid">
            {filteredTopics.map((t) => (
              <Link key={t.id} to={`/${t.roleSlug}/${t.id}`} className="card">
                <div className="card-top">
                  <span className="badge">{t.roleEmoji} · {t.roleTitle}</span>
                  <span className="badge neon">{t.minutes}m · 120 CR</span>
                </div>
                <h3>{t.title}</h3>
                <p>{t.summary}</p>
                <div className="chip-row" style={{ marginBottom: 0 }}>
                  <span className="mini-chip">Reference Architecture</span>
                  <span className="mini-chip">Execution Pipeline</span>
                  <span className="mini-chip">SOP Playbook</span>
                  <span className="mini-chip">Case Studies</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
