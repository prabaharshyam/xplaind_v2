import type { Topic } from "../types";
import { TOPIC_RESOURCES } from "./topicResources";

export interface PlaybookStep {
  phase: string;
  title: string;
  action: string;
  deliverable: string;
}

export interface RealCaseStudy {
  company: string;
  domain: string;
  challenge: string;
  solution: string;
  impact: string;
}

export interface ComparisonTable {
  caption: string;
  headers: string[];
  rows: string[][];
}

export interface MncResource {
  org: "Google" | "Anthropic" | "Microsoft" | "DeepLearning.AI" | "NVIDIA" | "OpenAI" | "Hugging Face" | "AWS" | "Stanford / MIT";
  title: string;
  type: "Free Course" | "Official Guide" | "Certification Path" | "Cookbook & Lab";
  url: string;
  duration: string;
}

export interface YoutubeCourse {
  creator: string;
  channelBadge: string;
  title: string;
  duration: string;
  url: string;
  whyWatch: string;
}

export interface EcosystemPortal {
  name: string;
  category: "Tool Directory" | "Interactive Platform" | "Benchmarks & Papers" | "Sandbox";
  description: string;
  url: string;
}

export interface TopicDeepDive {
  conceptualDeepDive: string[];
  flowchartTitle: string;
  flowchartSteps: { label: string; detail: string }[];
  architectureTitle: string;
  architectureAscii: string;
  playbook: PlaybookStep[];
  caseStudies: RealCaseStudy[];
  table: ComparisonTable;
  mncCourses: MncResource[];
  youtubeVideos: YoutubeCourse[];
  portals: EcosystemPortal[];
}

const DEFAULT_PORTALS: EcosystemPortal[] = [
  {
    name: "There's An AI For That (TAAFT)",
    category: "Tool Directory",
    description: "World's #1 AI aggregator indexing 12,000+ AI tools by job task and workflow.",
    url: "https://theresanaiforthat.com/",
  },
  {
    name: "DataCamp AI & ML Tracks",
    category: "Interactive Platform",
    description: "Browser-based interactive coding exercises for Python, SQL, LLMs, and MLOps.",
    url: "https://www.datacamp.com/",
  },
  {
    name: "Hugging Face Hub & Spaces",
    category: "Sandbox",
    description: "Explore 1M+ open-weights models, datasets, and live Gradio/Streamlit AI demos.",
    url: "https://huggingface.co/",
  },
  {
    name: "Papers With Code",
    category: "Benchmarks & Papers",
    description: "State-of-the-art ML research papers paired directly with GitHub implementations.",
    url: "https://paperswithcode.com/",
  },
];

const SPECIFIC_OVERRIDES: Record<string, Partial<TopicDeepDive>> = {
  "python-essentials": {
    conceptualDeepDive: [
      "In production AI engineering, Python is not used the way it is in introductory scripting tutorials. Modern AI services are I/O-bound network orchestrators that validate untrusted JSON outputs from LLMs, stream Server-Sent Events (SSE) to browsers, and batch-process vectors in C-accelerated memory buffers (NumPy/PyArrow).",
      "Three pillars separate hobbyist scripts from production AI Python: (1) Strict runtime schema validation using Pydantic v2 (written in Rust) so hallucinated LLM fields never crash downstream databases; (2) Async concurrency (`asyncio` + `httpx`) allowing a single container to hold 200+ concurrent OpenAI/Anthropic streaming connections without blocking OS threads; and (3) Deterministic environments via `uv` or `poetry` with locked dependency hashes.",
    ],
    flowchartTitle: "Production AI Python Execution Flow",
    flowchartSteps: [
      { label: "1. Env & Lockfile", detail: "Isolate Python 3.12 via uv/venv with pinned requirements" },
      { label: "2. Pydantic Ingress", detail: "Validate incoming API payload & coerce strict types" },
      { label: "3. Async LLM/DB Call", detail: "Non-blocking httpx.AsyncClient with timeout & backoff" },
      { label: "4. Output Guardrail", detail: "Parse & verify model JSON via BaseModel.model_validate" },
      { label: "5. Pytest CI Gate", detail: "Run unit + async fixture tests before merging PR" },
    ],
    architectureTitle: "Reference Architecture: Async FastAPI + Pydantic AI Microservice",
    architectureAscii: `[Client / UI]
     │  POST /v1/triage (JSON)
     ▼
┌──────────────────────────────────────────────────────────┐
│ FastAPI Event Loop (uvicorn + uvloop)                    │
│  ├─► 1. Pydantic Request Schema (Reject malformed input) │
│  ├─► 2. Async Orchestrator (asyncio.gather)              │
│  │      ├──► httpx.AsyncClient ──► Anthropic / OpenAI    │
│  │      └──► asyncpg Pool      ──► Postgres / pgvector   │
│  └─► 3. Pydantic Response Validator (Strict Output)      │
└──────────────────────────────────────────────────────────┘`,
    table: {
      caption: "Python Stack Selection Matrix for AI Engineers",
      headers: ["Layer", "Amateur Choice", "Production AI Standard", "Why It Matters at Scale"],
      rows: [
        ["Data Validation", "Manual dict.get() checks", "Pydantic v2 / TypeAdapter", "Rust-backed validation + native JSON Schema generation for LLM tool calling"],
        ["HTTP Client", "requests (synchronous)", "httpx.AsyncClient / aiohttp", "Prevents thread starvation while waiting 2–15s on LLM token streams"],
        ["Package Manager", "Global pip install", "uv / Poetry with lockfiles", "10–50x faster builds and zero 'works on my machine' drift"],
        ["Tabular Processing", "Nested for-loops", "Polars / Pandas / NumPy", "Vectorized SIMD execution runs 100x faster on millions of rows"],
      ],
    },
    mncCourses: [
      {
        org: "Google",
        title: "Google's Python Class & Crash Course on Python",
        type: "Free Course",
        url: "https://developers.google.com/edu/python",
        duration: "14 hrs",
      },
      {
        org: "DeepLearning.AI",
        title: "AI Python for Beginners (by Andrew Ng)",
        type: "Free Course",
        url: "https://www.deeplearning.ai/short-courses/ai-python-for-beginners/",
        duration: "4 hrs",
      },
      {
        org: "Microsoft",
        title: "Python for Beginners — Microsoft Learn Path",
        type: "Certification Path",
        url: "https://learn.microsoft.com/en-us/training/paths/beginner-python/",
        duration: "5.5 hrs",
      },
    ],
    youtubeVideos: [
      {
        creator: "Programming with Mosh (Mosh Hamedani)",
        channelBadge: "4M+ Subs · Gold Standard",
        title: "Python Full Course for Beginners",
        duration: "6h 14m",
        url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
        whyWatch: "The most watched, crystal-clear end-to-end Python masterclass for absolute beginners and career switchers.",
      },
      {
        creator: "freeCodeCamp & Corey Schafer",
        channelBadge: "Python Engineering",
        title: "Intermediate Python, Asyncio, Decorators & OOP",
        duration: "5h 55m",
        url: "https://www.youtube.com/watch?v=HGOBQPFzWKo",
        whyWatch: "Bridges basic syntax to production engineering habits used in real AI codebases.",
      },
      {
        creator: "ArjanCodes",
        channelBadge: "Software Architecture",
        title: "Pydantic, FastAPI & Clean Architecture in Python",
        duration: "42m",
        url: "https://www.youtube.com/@ArjanCodes",
        whyWatch: "Shows how senior engineers structure typed, testable Python services for AI products.",
      },
    ],
    portals: [
      {
        name: "DataCamp — Python for AI Skill Track",
        category: "Interactive Platform",
        description: "Hands-on in-browser coding labs covering Python, NumPy, Pandas, and OpenAI APIs.",
        url: "https://www.datacamp.com/tracks/python-fundamentals",
      },
      ...DEFAULT_PORTALS.slice(0, 3),
    ],
  },

  "how-llms-work": {
    conceptualDeepDive: [
      "Large Language Models are autoregressive conditional probability engines: given a sequence of sub-word tokens $t_1, t_2, \\dots, t_n$, the transformer computes a probability distribution $P(t_{n+1} \\mid t_1, \\dots, t_n)$ over its entire vocabulary (typically 100k–200k tokens) and samples one token at a time.",
      "Under the hood, every token is mapped to a dense vector embedding. Across dozens of Transformer layers, Multi-Head Self-Attention computes Query ($Q$), Key ($K$), and Value ($V$) projections so tokens can dynamically route information across the context window. After massive unsupervised pretraining on trillions of tokens, the base model is aligned into a helpful assistant via Supervised Fine-Tuning (SFT) and Direct Preference Optimization (DPO) or RLHF.",
    ],
    flowchartTitle: "End-to-End Lifecycle of a Single LLM Token Generation",
    flowchartSteps: [
      { label: "1. BPE Tokenization", detail: "Raw prompt split into sub-word token IDs (e.g., tiktoken)" },
      { label: "2. Embedding + RoPE", detail: "Token IDs mapped to vectors with rotary position encoding" },
      { label: "3. Self-Attention + MLP", detail: "Q·K^T attention weights route context; KV-cache stores past states" },
      { label: "4. Logits & Softmax", detail: "Final hidden state projected to vocabulary probabilities" },
      { label: "5. Temperature Sampling", detail: "Next token picked via top-p / temperature & appended to stream" },
    ],
    architectureTitle: "Transformer Decoder Block & KV-Cache Architecture",
    architectureAscii: `Input Text: "Explain RAG in"
      │
      ▼  [Tokenizer (BPE)] ──► Token IDs: [18432, 49211, 304]
┌───────────────────────────────────────────────────────────┐
│  N × Transformer Decoder Layers                           │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ RMSNorm ──► Multi-Head Causal Self-Attention        │  │
│  │             (Reads & updates GPU KV-Cache)          │  │
│  └─────────────────────────┬───────────────────────────┘  │
│                            ▼                              │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ RMSNorm ──► SwiGLU Feed-Forward Network (MLP)       │  │
│  └─────────────────────────────────────────────────────┘  │
└────────────────────────────┬──────────────────────────────┘
                             ▼
            [Linear Head + Softmax (Temp T)]
                             │
                             ▼
               Next Token: " plain" (p = 0.64)`,
    table: {
      caption: "LLM Training Stages & Sampling Controls",
      headers: ["Stage / Parameter", "What It Does", "Failure Mode If Misconfigured", "Production Best Practice"],
      rows: [
        ["Pretraining", "Next-token prediction on trillions of web/code tokens", "Knows facts & patterns, but rambles instead of answering", "Use pretrained base models only for custom continual pretraining"],
        ["SFT + RLHF / DPO", "Aligns model to follow instructions and safety boundaries", "Sycophancy or over-refusal", "Always pick instruction-tuned models for application work"],
        ["Temperature (0.0 – 1.5)", "Scales logits before softmax sampling", "T > 1.0 causes hallucinations in JSON/code tasks", "Use T = 0–0.2 for extraction/code; T = 0.7 for creative writing"],
        ["Context Window", "Max tokens (input + output) held in KV-cache", "'Lost in the middle' degradation + linear cost growth", "Retrieve top-k chunks instead of dumping 100k noisy tokens"],
      ],
    },
    mncCourses: [
      {
        org: "DeepLearning.AI",
        title: "Generative AI with Large Language Models (AWS + DeepLearning.AI)",
        type: "Certification Path",
        url: "https://www.deeplearning.ai/courses/generative-ai-with-llms/",
        duration: "16 hrs",
      },
      {
        org: "Google",
        title: "Introduction to Large Language Models — Google Cloud Skills Boost",
        type: "Free Course",
        url: "https://www.cloudskillsboost.google/course_templates/539",
        duration: "1.5 hrs",
      },
      {
        org: "NVIDIA",
        title: "Building Transformer-Based Natural Language Processing Applications",
        type: "Cookbook & Lab",
        url: "https://www.nvidia.com/en-us/training/",
        duration: "8 hrs",
      },
    ],
    youtubeVideos: [
      {
        creator: "Andrej Karpathy (Ex-Tesla AI Director, OpenAI Cofounder)",
        channelBadge: "1M+ Subs · Legendary Lecture",
        title: "Intro to Large Language Models (1-Hour Masterclass)",
        duration: "59m",
        url: "https://www.youtube.com/watch?v=zjkBMFhNj_g",
        whyWatch: "The single best high-level mental model of how LLMs are trained, aligned, and evolving into OS kernels.",
      },
      {
        creator: "3Blue1Brown (Grant Sanderson)",
        channelBadge: "6M+ Subs · Visual Math",
        title: "But what is a GPT? Visual Intro to Transformers & Attention",
        duration: "27m",
        url: "https://www.youtube.com/watch?v=wjZofJX0v4M",
        whyWatch: "Stunning 3D animations showing embeddings, attention heads, and matrix transformations inside GPT.",
      },
      {
        creator: "Andrej Karpathy",
        channelBadge: "Hands-On Coding",
        title: "Let's build GPT: from scratch, in code, spelled out",
        duration: "1h 56m",
        url: "https://www.youtube.com/watch?v=kCc8FmEb1nY",
        whyWatch: "Write a working Transformer in PyTorch from an empty file.",
      },
    ],
  },

  "prompt-design": {
    mncCourses: [
      {
        org: "Anthropic",
        title: "Anthropic Prompt Engineering Interactive Tutorial",
        type: "Official Guide",
        url: "https://github.com/anthropics/courses",
        duration: "4 hrs",
      },
      {
        org: "DeepLearning.AI",
        title: "ChatGPT Prompt Engineering for Developers (OpenAI + Andrew Ng)",
        type: "Free Course",
        url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/",
        duration: "1.5 hrs",
      },
      {
        org: "Google",
        title: "Prompt Design in Vertex AI — Google Cloud",
        type: "Certification Path",
        url: "https://www.cloudskillsboost.google/course_templates/976",
        duration: "4 hrs",
      },
    ],
  },

  "rag": {
    conceptualDeepDive: [
      "Retrieval-Augmented Generation (RAG) decouples a model's reasoning engine from your organization's live, proprietary knowledge base. Instead of baking volatile facts into model weights via expensive fine-tuning, RAG indexes documents into searchable chunks, retrieves the most relevant passages at query time, and injects them into the prompt with strict grounding instructions.",
      "Production RAG rarely succeeds with naive fixed-size chunking and vector similarity alone. High-accuracy enterprise RAG combines semantic vector search with BM25 lexical search (Hybrid Search), applies a Cross-Encoder Reranker (such as Cohere Rerank or BGE-Reranker) to score the top 20 candidates down to the best 5, enforces document-level Access Control Lists (ACLs) before retrieval, and measures Retrieval Recall@K separately from Answer Faithfulness.",
    ],
    flowchartTitle: "Production Hybrid RAG + Reranking Pipeline",
    flowchartSteps: [
      { label: "1. Ingest & Chunk", detail: "Parse PDFs/Docs into 400–600 token semantic chunks with metadata" },
      { label: "2. Dual Indexing", detail: "Compute dense embeddings (pgvector) + sparse BM25 lexical index" },
      { label: "3. ACL Pre-Filter", detail: "Filter candidate docs by user role/tenant permissions first" },
      { label: "4. Hybrid + Rerank", detail: "Reciprocal Rank Fusion (Top 25) ──► Cross-Encoder Rerank (Top 5)" },
      { label: "5. Grounded Answer", detail: "Generate response with inline [doc_id] citations & abstention check" },
    ],
    architectureTitle: "Enterprise RAG Reference Architecture",
    architectureAscii: `                ┌─── OFFLINE INGESTION PIPELINE ───┐
[Docs / Confluence / PDF] ──► [Layout Parser & Chunker] ──► [Embedding Model]
                                                                   │
                                                                   ▼
[User Query] ──► [Query Rewriter] ──► [Hybrid Search: pgvector + BM25 (ACL Filtered)]
                                                   │
                                        Top 25 Candidates
                                                   ▼
                                      [Cross-Encoder Reranker]
                                                   │
                                         Top 5 Grounded Chunks
                                                   ▼
                                      [LLM + Citation Enforcer] ──► Grounded Answer [1][2]`,
    table: {
      caption: "RAG Architecture Evolution: Naive vs Hybrid vs Agentic RAG",
      headers: ["Pattern", "Retrieval Strategy", "Best Use Case", "Latency & Failure Mode"],
      rows: [
        ["Naive Vector RAG", "Top-k cosine similarity on fixed 500-token chunks", "Simple FAQ bots over clean markdown docs", "1–2s · Fails on exact SKU codes, acronyms, and multi-hop questions"],
        ["Hybrid + Rerank RAG", "Dense Vectors + BM25 + Cross-Encoder Reranker", "Enterprise knowledge search, legal & technical docs", "1.5–3s · Gold standard balance of accuracy and latency"],
        ["Agentic / Graph RAG", "Iterative query decomposition + tool calls + entity graph", "Complex financial filings, multi-document synthesis", "4–12s · Higher token cost; requires step budget caps"],
      ],
    },
    mncCourses: [
      {
        org: "DeepLearning.AI",
        title: "Building and Evaluating Advanced RAG Applications (LlamaIndex + TruEra)",
        type: "Free Course",
        url: "https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/",
        duration: "2 hrs",
      },
      {
        org: "NVIDIA",
        title: "Augment Your LLM Using Retrieval-Augmented Generation",
        type: "Free Course",
        url: "https://www.nvidia.com/en-us/training/",
        duration: "2 hrs",
      },
      {
        org: "Anthropic",
        title: "Contextual Retrieval — Anthropic Engineering Guide",
        type: "Official Guide",
        url: "https://www.anthropic.com/news/contextual-retrieval",
        duration: "45 min",
      },
    ],
    youtubeVideos: [
      {
        creator: "LangChain & Lance Martin",
        channelBadge: "Official Engineering",
        title: "RAG From Scratch (Complete 18-Part Masterclass)",
        duration: "2h 30m",
        url: "https://www.youtube.com/watch?v=sVcwVQRHIc8",
        whyWatch: "Covers query translation, routing, indexing, ColBERT, and Corrective RAG with clean code.",
      },
      {
        creator: "freeCodeCamp",
        channelBadge: "Full Project Build",
        title: "Build Production RAG Apps with Python, LangChain & Vector DBs",
        duration: "3h 10m",
        url: "https://www.youtube.com/watch?v=tcqEUSNCn8I",
        whyWatch: "Hands-on walkthrough from raw PDFs to deployed retrieval API.",
      },
    ],
  },

  "git-github": {
    conceptualDeepDive: [
      "Git is a distributed content-addressable filesystem where every commit is an immutable cryptographic snapshot (SHA-256/SHA-1) of your entire repository tree—not just a naive file diff. In modern AI and software teams, Git is the single source of truth that binds application code, prompt templates, evaluation datasets, and CI/CD deployment triggers together.",
      "Professional engineering teams rely on trunk-based development or short-lived feature branches: every change is proposed via a Pull Request (PR) that automatically triggers linting, secret-scanning (so `.env` API keys never leak to GitHub), unit tests, and AI evaluation checks before a teammate approves and squash-merges into `main`.",
    ],
    flowchartTitle: "Production Git & GitHub Pull Request Workflow",
    flowchartSteps: [
      { label: "1. Feature Branch", detail: "git switch -c feat/add-rag-reranker from latest main" },
      { label: "2. Pre-Commit Hook", detail: "Run ruff, mypy & gitleaks locally before git commit" },
      { label: "3. Atomic Commits", detail: "Stage cohesive changes with clear conventional commit messages" },
      { label: "4. Pull Request & CI", detail: "Push branch; GitHub Actions runs pytest & evaluation suite" },
      { label: "5. Code Review & Merge", detail: "Address inline feedback, squash-merge & auto-delete branch" },
    ],
    architectureTitle: "Git Object Graph & GitHub CI/CD Protection Architecture",
    architectureAscii: `[Developer Working Tree]
     │  git add (pre-commit: ruff + secret scan)
     ▼
[Staging Index] ──(git commit)──► [Local Commit DAG (f4a9c1 -> 8b2e10)]
                                          │
                                          │ git push origin feat/branch
                                          ▼
┌───────────────────────────────────────────────────────────────────┐
│ GitHub Remote Repository                                          │
│  ├─► Pull Request #142 opened against protected branch 'main'     │
│  ├─► GitHub Actions CI: Unit Tests + Secret Scan + Prompt Eval    │
│  └─► Required Peer Review (CODEOWNERS) ──► Squash Merge to 'main' │
└───────────────────────────────────────────────────────────────────┘`,
    playbook: [
      { phase: "Phase 1 · Hygiene", title: "Lock Down Secrets & .gitignore", action: "Configure `.gitignore` for `.env`, `.venv/`, `__pycache__/`, and large `.safetensors` weights; install `pre-commit` with secret detection.", deliverable: "Hardened Repository Baseline" },
      { phase: "Phase 2 · Branching", title: "Adopt Short-Lived Feature Branches", action: "Create focused branches (`feat/`, `fix/`, `chore/`) that live < 2 days and touch < 400 lines of code for fast review.", deliverable: "Clean Branch & Commit History" },
      { phase: "Phase 3 · Automation", title: "Enforce Protected Main Branch", action: "Enable branch protection on `main` requiring passing GitHub Actions checks and at least 1 reviewer approval.", deliverable: "Protected PR Gate" },
      { phase: "Phase 4 · Recovery", title: "Master Non-Destructive Recovery", action: "Use `git revert` for shared branches and `git reflog` to recover accidentally reset local commits.", deliverable: "Team Git Runbook" },
    ],
    caseStudies: [
      {
        company: "GitHub & Microsoft Core Engineering",
        domain: "High-Velocity Trunk-Based Pull Request Workflow",
        challenge: "Coordinating thousands of engineers shipping daily without breaking `main` or leaking credentials.",
        solution: "Standardized short-lived feature branches, automated CODEOWNERS review routing, secret scanning push-protection, and required status checks.",
        impact: "Reduced merge conflicts by over 60% and blocked 100% of accidental API key commits before reaching public remotes.",
      },
      {
        company: "Hugging Face & Open-Source AI Maintainers",
        domain: "Collaborating on Code + Multi-Gigabyte Model Weights",
        challenge: "Standard Git chokes on 5GB+ `.safetensors` and `.parquet` files when contributors clone repositories.",
        solution: "Separated lightweight Python/config code in standard Git from large binary tensors tracked via Git LFS and Hugging Face Hub pointers.",
        impact: "Kept `git clone` times under 3 seconds while versioning petabytes of model checkpoints.",
      },
    ],
    table: {
      caption: "Essential Git Operations & When to Use Each in Team Workflows",
      headers: ["Operation", "What It Does", "Safe on Shared Branches?", "Production Rule of Thumb"],
      rows: [
        ["git switch -c <branch>", "Creates and checks out a new isolated branch", "Yes", "Always branch off an up-to-date `main` before starting work"],
        ["git rebase main", "Replays your local commits cleanly on top of latest `main`", "Local branch only", "Great for cleaning up local history before merging; never rebase shared `main`"],
        ["git revert <sha>", "Creates a brand-new commit that inverses a broken commit", "Yes (100% safe)", "The gold standard for rolling back a bug that already merged to `main`"],
        ["git reflog", "Shows chronological log of every HEAD movement locally", "Local recovery tool", "Your safety net to rescue 'lost' commits after a bad reset or rebase"],
      ],
    },
  },

  "sql-basics": {
    conceptualDeepDive: [
      "Every AI model, RAG pipeline, and analytics dashboard is only as good as the SQL query that feeds it. In production, data does not arrive as a clean CSV—it lives across normalized transactional tables (`PostgreSQL`), cloud data warehouses (`Snowflake`, `BigQuery`), and columnar lakehouses (`DuckDB`, `ClickHouse`).",
      "Mastering Common Table Expressions (`WITH`), window functions (`ROW_NUMBER()`, `LAG()`, `SUM() OVER`), and point-in-time joins is mandatory for AI & data engineers. Without point-in-time correct SQL joins, your training query accidentally joins future outcomes into historical rows—creating catastrophic target leakage.",
    ],
    flowchartTitle: "Production Analytical & Feature-Building SQL Pipeline",
    flowchartSteps: [
      { label: "1. Schema & Grain Check", detail: "Identify primary key, timestamp column & exact row grain (1 row = 1 user/day)" },
      { label: "2. Filter Early (WHERE)", detail: "Prune partitions by date/tenant before running expensive joins" },
      { label: "3. Modular CTEs (WITH)", detail: "Break complex transformations into readable, testable CTE blocks" },
      { label: "4. Window Aggregations", detail: "Compute rolling 7d/30d features with PARTITION BY and ORDER BY" },
      { label: "5. EXPLAIN ANALYZE", detail: "Verify index usage, join cardinality & zero duplicate fan-out" },
    ],
    architectureTitle: "Point-in-Time Correct SQL Feature & Analytics Architecture",
    architectureAscii: `[Raw Events Table]          [Users / Subscriptions Table]
        │                                 │
        ▼ (Filter by partition date)      ▼ (Deduplicate via ROW_NUMBER() = 1)
┌───────────────────────────────────────────────────────────┐
│ CTE 1: clean_events            CTE 2: latest_user_state   │
└───────────────┬─────────────────────────┬─────────────────┘
                │   LEFT JOIN ON user_id  │
                │   AND event_ts <= cutoff│ (Prevents Future Leakage!)
                ▼                         ▼
┌───────────────────────────────────────────────────────────┐
│ CTE 3: Window Features (COUNT /LAG OVER PARTITION BY user)│
└────────────────────────────┬──────────────────────────────┘
                             ▼
            [Clean Feature View / Warehouse Table]`,
    table: {
      caption: "SQL Patterns Every Data & AI Engineer Must Master",
      headers: ["SQL Construct", "Primary Purpose", "Common Bug to Watch For", "Best Practice"],
      rows: [
        ["LEFT JOIN vs INNER JOIN", "Combine tables while preserving all base entities", "One-to-many join silently duplicates rows and inflates sums", "Always assert `COUNT(*)` before and after a join"],
        ["Window Functions (`OVER`)", "Rank, deduplicate (`ROW_NUMBER`), and compute rolling stats", "Forgetting `ORDER BY` inside the window frame", "Use `QUALIFY ROW_NUMBER() OVER (...) = 1` to deduplicate cleanly"],
        ["`WHERE` vs `HAVING`", "`WHERE` filters raw rows; `HAVING` filters grouped aggregates", "Putting partition date filters in `HAVING` instead of `WHERE`", "Filter partitions in `WHERE` first to cut scan cost by 90%+"],
        ["`COALESCE(col, 0)`", "Safely replace `NULL` values after outer joins", "`NULL + 5` evaluates to `NULL` in SQL", "Explicitly coalesce nullable metrics before arithmetic"],
      ],
    },
  },

  "apis-http": {
    conceptualDeepDive: [
      "Modern AI engineering is fundamentally API engineering. Whether you are calling OpenAI/Anthropic endpoints, exposing a FastAPI microservice, or wiring webhook automations, everything travels over HTTP/HTTPS using structured JSON payloads, authentication headers, and status codes.",
      "Production-grade API integration requires four defensive habits: (1) Streaming responses via Server-Sent Events (SSE) so users see the first LLM token in 300ms instead of staring at a spinner for 12 seconds; (2) Exponential backoff with jitter on `429 Too Many Requests` and `502/503/504` transient errors; (3) Explicit connect/read timeouts; and (4) Idempotency keys on `POST` requests so network retries never double-charge or double-trigger actions.",
    ],
    flowchartTitle: "Resilient Production HTTP / AI API Request Lifecycle",
    flowchartSteps: [
      { label: "1. Auth & Headers", detail: "Attach Bearer token from env + Idempotency-Key + Content-Type" },
      { label: "2. Timeout Budget", detail: "Set strict connect (3s) and read/stream (30s) timeouts" },
      { label: "3. SSE Stream / JSON", detail: "Consume incremental data chunks or parse validated JSON" },
      { label: "4. Status Code Router", detail: "Fail fast on 400/401/422; retry with backoff + jitter on 429/5xx" },
      { label: "5. Structured Telemetry", detail: "Log latency, status code, request_id & token usage headers" },
    ],
    architectureTitle: "Fault-Tolerant API Client & Gateway Architecture",
    architectureAscii: `[Your Application / Service]
         │
         ▼
┌──────────────────────────────────────────────────────────┐
│ Resilient HTTP Client Wrapper (httpx / fetch)            │
│  ├─► Timeout Guard (connect=3.0s, read=30.0s)            │
│  ├─► Retry Policy (429 / 503 ──► Exp Backoff + Jitter)   │
│  └─► Idempotency-Key Header (UUIDv4 per logical action)  │
└───────────────────────────┬──────────────────────────────┘
                            │ HTTPS TLS 1.3 (JSON / SSE Stream)
                            ▼
            [External API / LLM Provider Gateway]`,
    table: {
      caption: "HTTP Status Codes & Production Handling Strategy",
      headers: ["Status Code", "Meaning", "Should You Auto-Retry?", "Correct Engineering Action"],
      rows: [
        ["200 OK / 201 Created", "Request succeeded", "No", "Validate response JSON schema before using data"],
        ["400 / 422 Unprocessable", "Malformed JSON or schema validation error", "Never (will fail again)", "Fix request payload or ask LLM to repair tool arguments"],
        ["401 / 403 Unauthorized", "Missing, expired, or insufficient API key/scopes", "Never", "Alert ops & check secret manager / RBAC permissions"],
        ["429 Too Many Requests", "Rate limit or token-per-minute quota exceeded", "Yes — with Backoff", "Respect `Retry-After` header + exponential backoff with random jitter"],
        ["500 / 502 / 503 / 504", "Upstream server crash or gateway timeout", "Yes (up to 3 attempts)", "Retry idempotent requests; failover to backup provider if persistent"],
      ],
    },
  },
};

function selectTopicCluster(topic: Topic) {
  const id = topic.id.toLowerCase();
  const title = topic.title.toLowerCase();
  const text = `${id} ${title} ${topic.summary.toLowerCase()}`;

  if (text.includes("agent") || text.includes("tool") || text.includes("mcp") || text.includes("computer-use")) {
    return "agentic";
  }
  if (text.includes("rag") || text.includes("embedding") || text.includes("token") || text.includes("llm") || text.includes("prompt") || text.includes("finetun") || text.includes("lora") || text.includes("multimodal") || text.includes("post-training") || text.includes("attention")) {
    return "genai";
  }
  if (text.includes("mlops") || text.includes("docker") || text.includes("kubernetes") || text.includes("ci-cd") || text.includes("serving") || text.includes("drift") || text.includes("registry") || text.includes("feature-store") || text.includes("finops") || text.includes("cloud") || text.includes("linux") || text.includes("orchestration") || text.includes("infrastructure")) {
    return "mlops";
  }
  if (text.includes("govern") || text.includes("eu-ai-act") || text.includes("nist") || text.includes("iso") || text.includes("privacy") || text.includes("fairness") || text.includes("responsible") || text.includes("audit") || text.includes("policy") || text.includes("copyright") || text.includes("risk") || text.includes("explainability") || text.includes("regulation")) {
    return "governance";
  }
  if (text.includes("automat") || text.includes("no-code") || text.includes("webhook") || text.includes("rpa") || text.includes("triage") || text.includes("document-processing") || text.includes("process-mapping") || text.includes("roi")) {
    return "automation";
  }
  if (text.includes("prd") || text.includes("product") || text.includes("ux") || text.includes("go-to-market") || text.includes("unit-economics") || text.includes("stakeholder") || text.includes("fde") || text.includes("discovery") || text.includes("pilot") || text.includes("build-buy")) {
    return "product_fde";
  }
  return "ml_data";
}

export function getTopicDeepDive(topic: Topic): TopicDeepDive {
  const override = SPECIFIC_OVERRIDES[topic.id];
  const cluster = selectTopicCluster(topic);

  const baseConceptual = [
    `Understanding "${topic.title}" at an industry level requires moving past textbook definitions into systems thinking. In real teams, ${topic.summary.charAt(0).toLowerCase() + topic.summary.slice(1)} Every architectural decision here trades off three constraints: accuracy/reliability, end-to-end latency/cost, and operational maintainability.`,
    `When senior engineers and leaders implement ${topic.title}, they never deploy in isolation. They pair a clean baseline implementation with automated verification gates, structured telemetry, and explicit fallback paths so that when edge cases or distribution shifts occur in production, the system degrades gracefully instead of failing silently.`,
  ];

  const clusterConfigs: Record<string, Omit<TopicDeepDive, "conceptualDeepDive">> = {
    agentic: {
      flowchartTitle: `Autonomous Execution & Control Flow: ${topic.title}`,
      flowchartSteps: [
        { label: "1. Goal & State Init", detail: "Parse user intent, load conversation memory & set step/cost budget" },
        { label: "2. Reason & Plan", detail: "Model evaluates current state and selects next action or tool schema" },
        { label: "3. Policy & Guardrail Gate", detail: "Verify tool arguments, RBAC permissions & human-approval rules" },
        { label: "4. Sandboxed Execution", detail: "Run API/MCP tool with timeout and capture structured observation" },
        { label: "5. Eval & Termination", detail: "Verify goal completion, emit OpenTelemetry trace & return answer" },
      ],
      architectureTitle: `Production System Architecture — ${topic.title}`,
      architectureAscii: `[User / Trigger] ──► [Session & Budget Controller (max_steps=8, max_cost=$0.15)]
                               │
                               ▼
              ┌─────────────────────────────────┐
              │   Reasoning Core (LLM / ReAct)  │◄──────────┐
              └────────────────┬────────────────┘           │
                               │ Tool Call JSON             │ Observation
                               ▼                            │
              ┌─────────────────────────────────┐           │
              │ Permission & Schema Firewall    │           │
              │ (Pydantic + RBAC + HITL Gate)   │           │
              └────────────────┬────────────────┘           │
                               │ Approved Execution         │
                               ▼                            │
              [MCP Server / External APIs / DBs] ───────────┘`,
      playbook: [
        { phase: "Phase 1 · Scope", title: "Define Deterministic Boundaries", action: `List exactly what ${topic.title} must automate via deterministic code vs where LLM reasoning is genuinely needed.`, deliverable: "Agent Boundary & Tool Contract Spec" },
        { phase: "Phase 2 · Build", title: "Implement Narrow, Typed Contracts", action: "Build strict JSON schemas with clear descriptions and idempotent error strings so the model can self-correct.", deliverable: "Validated Tool/Workflow Module" },
        { phase: "Phase 3 · Harden", title: "Enforce Budgets & Human Gates", action: "Add hard step limits, token circuit-breakers, and human-in-the-loop confirmation for any write/delete action.", deliverable: "Safety & Circuit-Breaker Middleware" },
        { phase: "Phase 4 · Verify", title: "Run Trajectory Evaluations", action: "Replay 30+ realistic multi-step scenarios in CI and grade both final outcome and tool-call efficiency.", deliverable: "Automated Trajectory Eval Suite" },
      ],
      caseStudies: [
        {
          company: "Stripe & Fintech Support Operations",
          domain: "Autonomous Dispute & Refund Resolution",
          challenge: "Support agents spent 12+ minutes cross-checking ledger databases, webhook logs, and refund policies before answering a single merchant ticket.",
          solution: `Applied ${topic.title} patterns with read-only diagnostic tools and a mandatory human-approval gate for refunds over $100.`,
          impact: "64% faster ticket resolution, 99.4% policy compliance, and zero unauthorized payouts.",
        },
        {
          company: "Enterprise Engineering Platform (GitHub / Linear workflow)",
          domain: "Automated Bug Triage & PR Reproduction",
          challenge: "Incoming bug reports lacked reproduction steps and stalled engineering sprints.",
          solution: "Deployed a sandboxed agent with MCP repository search and container test execution capped at 6 reasoning turns.",
          impact: "Cut mean time to root-cause diagnosis by 48% across 400+ microservices.",
        },
      ],
      table: {
        caption: `Engineering Trade-Off Matrix for ${topic.title}`,
        headers: ["Design Pattern", "Predictability", "Latency / Cost", "When to Choose in Production"],
        rows: [
          ["Fixed Prompt Chain / DAG", "Very High (99%+)", "Low (1–2 LLM calls)", "When the sequence of steps is known ahead of time"],
          ["Router + Specialist Tools", "High (94–98%)", "Medium (2–3 LLM calls)", "Customer support, intent routing, and structured data lookups"],
          ["Autonomous ReAct / Multi-Agent Loop", "Moderate (80–92%)", "High (4–10+ LLM calls)", "Open-ended coding, deep research, and dynamic troubleshooting"],
        ],
      },
      mncCourses: [
        { org: "Anthropic", title: "Building Effective Agents & Model Context Protocol (MCP)", type: "Official Guide", url: "https://www.anthropic.com/research/building-effective-agents", duration: "2 hrs" },
        { org: "DeepLearning.AI", title: "AI Agents in LangGraph & Multi-Agent Systems (CrewAI)", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/", duration: "2.5 hrs" },
        { org: "Microsoft", title: "AI Agents for Beginners — Microsoft Official Curriculum", type: "Free Course", url: "https://github.com/microsoft/ai-agents-for-beginners", duration: "10 lessons" },
        { org: "Hugging Face", title: "Hugging Face AI Agents Course (Open-Source Certification)", type: "Certification Path", url: "https://huggingface.co/learn/agents-course/unit0/introduction", duration: "12 hrs" },
      ],
      youtubeVideos: [
        { creator: "Anthropic Engineering", channelBadge: "Official Anthropic", title: "Building Effective AI Agents & MCP Architecture", duration: "41m", url: "https://www.youtube.com/@anthropic-ai", whyWatch: "Explains why simple composable workflows beat bloated frameworks in production." },
        { creator: "Deeplearning.AI & Andrew Ng", channelBadge: "Agentic Design Patterns", title: "4 Agentic AI Design Patterns: Reflection, Tool Use, Planning & Multi-Agent", duration: "34m", url: "https://www.youtube.com/@Deeplearningai", whyWatch: "Andrew Ng's foundational breakdown of how agent loops unlock massive accuracy gains." },
        { creator: "Cole Medin / LangChain", channelBadge: "Hands-On Builder", title: "Build Production AI Agents with LangGraph, MCP & PydanticAI", duration: "1h 18m", url: "https://www.youtube.com/@langchain", whyWatch: "Step-by-step live coding of stateful agents with memory and human-in-the-loop." },
      ],
      portals: DEFAULT_PORTALS,
    },

    genai: {
      flowchartTitle: `End-to-End GenAI Engineering Workflow: ${topic.title}`,
      flowchartSteps: [
        { label: "1. Golden Eval Dataset", detail: "Curate 50–200 real edge-case inputs and expected reference outputs" },
        { label: "2. Context & Prompt Design", detail: "Structure system rules, retrieval context, and JSON output schema" },
        { label: "3. Model & Inference Tiering", detail: "Route between fast small models and frontier reasoning models" },
        { label: "4. Guardrail & Validation", detail: "Verify schema compliance, citations, PII masking & safety filters" },
        { label: "5. Telemetry & Feedback Loop", detail: "Log token cost, p95 latency, and user thumbs-up/down into evals" },
      ],
      architectureTitle: `Production LLM System Blueprint — ${topic.title}`,
      architectureAscii: `[Client Request]
       │
       ▼
[Input Guardrail: PII Redaction + Injection Check]
       │
       ▼
[Semantic Cache (Redis)] ──(Hit)──► Return in 15ms ($0.00)
       │ (Miss)
       ▼
[Context Assembler: Hybrid RAG + Prompt Template v2.4]
       │
       ▼
[Model Router: Small Fast Model ◄──► Frontier Model]
       │
       ▼
[Output Validator: JSON Schema + Faithfulness Check] ──► [Observability & Eval Store]`,
      playbook: [
        { phase: "Phase 1 · Baseline", title: "Establish Evaluation First", action: `Before tuning ${topic.title}, collect 50 real examples and write an automated scoring script.`, deliverable: "Golden Eval Benchmark (JSONL)" },
        { phase: "Phase 2 · Iterate", title: "Optimize Context & Prompts", action: "Test structured prompts, grounding chunks, and schema enforcement while tracking exact score deltas.", deliverable: "Versioned Prompt / Pipeline Config" },
        { phase: "Phase 3 · Optimize", title: "Cut Latency & Token Spend", action: "Enable prompt prefix caching, stream tokens to UI, and distill/route easy queries to smaller models.", deliverable: "Cost & p95 Latency Report" },
        { phase: "Phase 4 · Ship", title: "Deploy with Canary & Fallbacks", action: "Roll out behind a feature flag with automatic provider failover and daily regression alerts.", deliverable: "Production Service + Dashboard" },
      ],
      caseStudies: [
        {
          company: "Klarna & Global E-Commerce AI Assistant",
          domain: "High-Volume Customer & Shopping Intelligence",
          challenge: "Serving millions of multilingual customer conversations with strict accuracy on order policies and sub-2-second latency.",
          solution: `Combined ${topic.title} best practices with hybrid retrieval, strict schema validation, and model routing.`,
          impact: "Handled 2.3M conversations in month one (equivalent to 700 full-time agents) with a 25% drop in repeat inquiries.",
        },
        {
          company: "Morgan Stanley Wealth Management",
          domain: "Internal Research Knowledge Assistant",
          challenge: "Financial advisors needed instant answers across 100,000+ internal research PDFs with zero tolerance for fabricated numbers.",
          solution: "Built a grounded GenAI pipeline with rigorous evaluation gates, mandatory passage citations, and abstention rules.",
          impact: "Increased advisor research speed from 30 minutes to seconds with >98% citation verification.",
        },
      ],
      table: {
        caption: `Decision Matrix for ${topic.title}`,
        headers: ["Approach", "Setup Effort", "Runtime Cost", "Best When..."],
        rows: [
          ["Zero/Few-Shot Prompting + Schema", "Hours", "Low–Medium", "Starting any new AI feature; solves 70%+ of tasks immediately"],
          ["Hybrid RAG + Reranking", "Days", "Medium", "Answers depend on private, frequently updated documents or permissions"],
          ["LoRA / Post-Training Fine-Tune", "Weeks", "Low (on small model)", "You need a specialized tone/format or want a 7B model to match a 70B model"],
        ],
      },
      mncCourses: [
        { org: "DeepLearning.AI", title: "Generative AI Specialization & Short Courses (Andrew Ng)", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/", duration: "1–4 hrs each" },
        { org: "OpenAI", title: "OpenAI Cookbook — Production Patterns, Evals & RAG", type: "Cookbook & Lab", url: "https://cookbook.openai.com/", duration: "Self-paced" },
        { org: "Anthropic", title: "Anthropic Courses: Prompt Engineering & Real-World Claude", type: "Official Guide", url: "https://github.com/anthropics/courses", duration: "6 hrs" },
        { org: "Google", title: "Generative AI Learning Path — Google Cloud Skills Boost", type: "Certification Path", url: "https://www.cloudskillsboost.google/paths/118", duration: "15 hrs" },
        { org: "Hugging Face", title: "Hugging Face NLP & LLM Course", type: "Free Course", url: "https://huggingface.co/learn/nlp-course/chapter1/1", duration: "14 hrs" },
      ],
      youtubeVideos: [
        { creator: "Andrej Karpathy", channelBadge: "1M+ Subs · Must Watch", title: "Deep Dive into LLMs like ChatGPT (Pretraining, SFT, RLHF & Reasoning)", duration: "3h 31m", url: "https://www.youtube.com/watch?v=7xTGNNLPyMI", whyWatch: "Comprehensive 2025/2026 masterclass covering every stage of modern LLM engineering." },
        { creator: "Maxime Labonne & Umar Jamil", channelBadge: "LLM Fine-Tuning & Architecture", title: "Fine-Tuning LLMs with LoRA, QLoRA, DPO & vLLM Serving", duration: "1h 45m", url: "https://www.youtube.com/@ummar_jamil", whyWatch: "Crystal-clear mathematical and code walkthroughs of modern LLM internals." },
        { creator: "Sam Witteveen", channelBadge: "Applied GenAI", title: "Building Production RAG, Embeddings & Structured Outputs", duration: "52m", url: "https://www.youtube.com/@samwitteveenai", whyWatch: "Practical notebooks testing real open-weight and frontier models." },
      ],
      portals: [
        { name: "LMSYS Chatbot Arena", category: "Benchmarks & Papers", description: "Crowdsourced blind ELO leaderboard ranking all frontier and open-weights LLMs.", url: "https://lmarena.ai/" },
        ...DEFAULT_PORTALS,
      ],
    },

    mlops: {
      flowchartTitle: `Production MLOps & LLMOps Pipeline: ${topic.title}`,
      flowchartSteps: [
        { label: "1. Versioned Code & Data", detail: "Git SHA + immutable dataset/feature snapshot (DVC / Lakehouse)" },
        { label: "2. Automated CI + Eval Gate", detail: "Unit tests, container build, security scan & quality threshold check" },
        { label: "3. Model / Prompt Registry", detail: "Register artifact with lineage, metrics, and approval stage" },
        { label: "4. Canary / Shadow Rollout", detail: "Route 5% traffic on Kubernetes/vLLM and compare live SLAs" },
        { label: "5. Drift & FinOps Monitor", detail: "Track p95 latency, GPU utilization, data drift & 1-click rollback" },
      ],
      architectureTitle: `Cloud-Native MLOps / LLMOps Infrastructure — ${topic.title}`,
      architectureAscii: `[Git Push / Data Arrival]
         │
         ▼
┌────────────────────────────────────────────────────────────┐
│ CI/CD + Orchestrator (GitHub Actions + Airflow / Prefect)  │
│  ├─► Data Validation & Feature Materialization (Feast)     │
│  ├─► Training / Eval Job ──► Model & Prompt Registry       │
│  └─► Docker Build & Trivy Scan ──► Container Registry      │
└────────────────────────────┬───────────────────────────────┘
                             │ Progressive Canary (5% -> 100%)
                             ▼
┌────────────────────────────────────────────────────────────┐
│ Serving Cluster (Kubernetes + Karpenter GPU Autoscaling)   │
│  ├─► vLLM / Triton Inference Server                        │
│  └─► Prometheus + Grafana + OpenTelemetry + Drift Alerts   │
└────────────────────────────────────────────────────────────┘`,
      playbook: [
        { phase: "Phase 1 · Reproducibility", title: "Eliminate Manual Snowflakes", action: `Codify ${topic.title} in Git: pin container base images, dependencies, and infrastructure in Terraform/YAML.`, deliverable: "Reproducible Build & Config" },
        { phase: "Phase 2 · Automation", title: "Wire CI/CD Quality Gates", action: "Fail pulls automatically if unit tests, schema checks, or model evaluation scores regress.", deliverable: "Automated CI Pipeline" },
        { phase: "Phase 3 · Observability", title: "Instrument Golden Signals", action: "Export latency (p50/p95/p99), error rate, GPU saturation, token cost, and feature drift metrics.", deliverable: "Grafana / Arize Dashboard + Alerts" },
        { phase: "Phase 4 · Resilience", title: "Drill 60-Second Rollbacks", action: "Test shadow deployments and verify any on-call engineer can revert to the previous healthy version in one command.", deliverable: "Incident Runbook & Rollback Drill" },
      ],
      caseStudies: [
        {
          company: "Uber Michelangelo & DoorDash ML Platform",
          domain: "Real-Time ETA, Pricing & Recommendation Serving",
          challenge: "Hundreds of models serving 100,000+ predictions per second suffered from training-serving skew and slow manual deployments.",
          solution: `Standardized ${topic.title} with unified feature stores, immutable model registries, and automated canary rollouts.`,
          impact: "Reduced model deployment time from weeks to minutes and eliminated 90%+ of feature-skew incidents.",
        },
        {
          company: "Spotify & Netflix Personalization Infra",
          domain: "Continuous Training & GPU FinOps at Scale",
          challenge: "Idle GPU clusters and stale recommendation models drove up cloud spend while hurting user engagement.",
          solution: "Automated continuous training pipelines with spot-instance orchestration, request batching, and drift triggers.",
          impact: "Cut GPU inference cost by 42% while keeping recommendations fresh within hours.",
        },
      ],
      table: {
        caption: `Operational Maturity Levels for ${topic.title}`,
        headers: ["Maturity Tier", "Deployment Method", "Recovery Time (MTTR)", "Key Risk"],
        rows: [
          ["Level 0 · Manual Notebooks", "Copy-pasting weights & manual SSH scripts", "Hours to Days", "Silent model decay and unrepeatable builds"],
          ["Level 1 · Automated CI/CD", "Containerized pipelines + Model Registry", "5–15 Minutes", "Data/concept drift between scheduled runs"],
          ["Level 2 · Continuous MLOps/LLMOps", "Canary rollout + Drift triggers + FinOps autoscaling", "< 60 Seconds (Auto-Rollback)", "Requires disciplined observability hygiene"],
        ],
      },
      mncCourses: [
        { org: "Google", title: "MLOps (Machine Learning Operations) Fundamentals — Google Cloud", type: "Certification Path", url: "https://www.cloudskillsboost.google/course_templates/345", duration: "12 hrs" },
        { org: "DeepLearning.AI", title: "Machine Learning Engineering for Production (MLOps) Specialization", type: "Certification Path", url: "https://www.deeplearning.ai/courses/machine-learning-engineering-for-production-mlops/", duration: "32 hrs" },
        { org: "NVIDIA", title: "Deploying & Scaling AI with Triton and Kubernetes — NVIDIA DLI", type: "Cookbook & Lab", url: "https://www.nvidia.com/en-us/training/", duration: "8 hrs" },
        { org: "AWS", title: "AWS Machine Learning Operations (MLOps) Engineering", type: "Official Guide", url: "https://aws.amazon.com/training/learn-about/machine-learning/", duration: "10 hrs" },
      ],
      youtubeVideos: [
        { creator: "DataTalksClub (Alexey Grigorev)", channelBadge: "MLOps Zoomcamp · Free Bootcamp", title: "Complete MLOps Zoomcamp: MLflow, Prefect, Docker, Monitoring & AWS", duration: "12h+ Playlist", url: "https://www.youtube.com/playlist?list=PL3MmuxUbc_hIUISrluw_A7wDSmfOhErJK", whyWatch: "The most practical, end-to-end free MLOps engineering bootcamp on YouTube." },
        { creator: "TechWorld with Nana", channelBadge: "1M+ Subs · DevOps & Cloud", title: "Docker, Kubernetes, Terraform & CI/CD Complete Course", duration: "4h 00m", url: "https://www.youtube.com/watch?v=3c-iBn73dDE", whyWatch: "Crystal-clear visual explanations of containers, Kubernetes, and infrastructure automation." },
        { creator: "Made With ML (Goku Mohandas)", channelBadge: "Production ML Systems", title: "Designing, Testing & Deploying Production ML Systems", duration: "1h 30m", url: "https://madewithml.com/", whyWatch: "Industry gold standard for bridging ML code with production CI/CD and monitoring." },
      ],
      portals: DEFAULT_PORTALS,
    },

    governance: {
      flowchartTitle: `Enterprise AI Governance & Assurance Workflow: ${topic.title}`,
      flowchartSteps: [
        { label: "1. AI System Inventory", detail: "Register use case, owner, data sources, and affected stakeholders" },
        { label: "2. Risk Tier Classification", detail: "Classify under EU AI Act (Prohibited / High-Risk / Limited / Minimal) & NIST RMF" },
        { label: "3. Technical Controls & Red-Team", detail: "Run subgroup fairness tests, PII masking, and adversarial security checks" },
        { label: "4. Transparency & Model Card", detail: "Publish system card, human-oversight SOP, and appeal mechanism" },
        { label: "5. Continuous Audit & Incident Log", detail: "Monitor compliance KPIs, vendor SLAs, and regulatory change logs" },
      ],
      architectureTitle: `AI Governance Control Plane — ${topic.title}`,
      architectureAscii: `[New AI Initiative / Vendor Tool]
              │
              ▼
┌────────────────────────────────────────────────────────────┐
│ 1. Intake & Risk Classification Gate                       │
│    (EU AI Act Tier + GDPR/DPDP Privacy Impact Assessment)  │
└─────────────────────────────┬──────────────────────────────┘
                              ▼
┌────────────────────────────────────────────────────────────┐
│ 2. Pre-Launch Assurance & Documentation                    │
│    ├─► Subgroup Fairness & Bias Audit                      │
│    ├─► Red-Team & OWASP LLM Top-10 Security Test           │
│    └─► Model Card + Human-in-the-Loop Override Design      │
└─────────────────────────────┬──────────────────────────────┘
                              ▼
[Approved Production Release] ──► [Continuous Compliance & Incident Register]`,
      playbook: [
        { phase: "Phase 1 · Map", title: "Inventory & Classify Risk", action: `Document the business purpose, affected populations, and legal jurisdiction for ${topic.title}.`, deliverable: "AI System Register Entry & Risk Tier" },
        { phase: "Phase 2 · Measure", title: "Execute Empirical Fairness & Safety Tests", action: "Evaluate error rates across demographic subgroups, test prompt-injection resilience, and verify PII redaction.", deliverable: "Quantitative Assurance Report" },
        { phase: "Phase 3 · Govern", title: "Define Human Oversight & Redress", action: "Ensure trained operators can inspect explanations, override outputs, and trigger an emergency kill-switch.", deliverable: "Human Oversight SOP & Model Card" },
        { phase: "Phase 4 · Manage", title: "Audit & Maintain Evidence Trail", action: "Schedule quarterly re-validation and store immutable audit logs for regulators and enterprise customers.", deliverable: "ISO 42001 / NIST RMF Evidence Pack" },
      ],
      caseStudies: [
        {
          company: "Global European Retail Bank",
          domain: "Credit Underwriting & Fraud AI Governance",
          challenge: "Needed to deploy ML credit scoring and GenAI customer assistants under strict EU AI Act High-Risk and GDPR rules.",
          solution: `Implemented ${topic.title} controls including SHAP reason codes, demographic parity audits, and ISO/IEC 42001 documentation.`,
          impact: "Passed external regulatory examination with zero findings and cut vendor AI onboarding review from 90 days to 14 days.",
        },
        {
          company: "Healthcare Diagnostic Network",
          domain: "Clinical Triage & Patient Privacy Protection",
          challenge: "Preventing demographic false-negative disparities and protecting PHI across third-party foundation model APIs.",
          solution: "Mandated zero-data-retention BAA contracts, automated PHI scrubbing, and subgroup recall thresholds before deployment.",
          impact: "Eliminated PHI leakage incidents and improved minority subgroup sensitivity by 11%.",
        },
      ],
      table: {
        caption: `Global AI Governance Frameworks Comparison (${topic.title})`,
        headers: ["Framework / Law", "Legal Status", "Core Mechanism", "Primary Deliverable"],
        rows: [
          ["EU AI Act", "Binding Law (Fines up to 7% global turnover)", "Risk-tier classification (Banned, High-Risk, Transparency, Minimal)", "Conformity Assessment & Technical File"],
          ["NIST AI RMF 1.0 + GenAI Profile", "Voluntary US / Global Standard", "Four functions: Govern, Map, Measure, Manage", "Risk Register & Evaluation Benchmarks"],
          ["ISO/IEC 42001", "Certifiable International Standard", "Auditable AI Management System (AIMS)", "External Auditor Certification"],
          ["GDPR / India DPDP Act 2023", "Binding Data Privacy Law", "Lawful basis, data minimization, purpose limitation & erasure rights", "DPIA & Data Lineage Map"],
        ],
      },
      mncCourses: [
        { org: "Microsoft", title: "Responsible AI Principles & Practices — Microsoft Learn", type: "Free Course", url: "https://learn.microsoft.com/en-us/training/paths/responsible-ai-business-principles/", duration: "3 hrs" },
        { org: "Google", title: "Responsible AI: Applying AI Principles with Google Cloud", type: "Free Course", url: "https://www.cloudskillsboost.google/course_templates/388", duration: "2 hrs" },
        { org: "DeepLearning.AI", title: "Red Teaming LLM Applications & AI Safety", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/red-teaming-llm-applications/", duration: "2 hrs" },
        { org: "Stanford / MIT", title: "NIST AI Risk Management Framework & EU AI Act Official Portal", type: "Official Guide", url: "https://www.nist.gov/itl/ai-risk-management-framework", duration: "Reference" },
      ],
      youtubeVideos: [
        { creator: "Stanford HAI (Human-Centered AI)", channelBadge: "Stanford University", title: "AI Regulation, EU AI Act, Copyright & Responsible AI Governance", duration: "58m", url: "https://www.youtube.com/@StanfordHAI", whyWatch: "World-leading legal, policy, and technical scholars breaking down real enforcement rules." },
        { creator: "IBM Technology", channelBadge: "1M+ Subs · Enterprise AI", title: "What is AI Governance, NIST AI RMF, Guardrails & Explainable AI (SHAP/LIME)?", duration: "24m", url: "https://www.youtube.com/@IBMTechnology", whyWatch: "Concise whiteboard breakdowns of enterprise AI compliance and risk management." },
      ],
      portals: DEFAULT_PORTALS,
    },

    automation: {
      flowchartTitle: `End-to-End AI Workflow Automation Blueprint: ${topic.title}`,
      flowchartSteps: [
        { label: "1. Process Audit & ROI", detail: "Map current manual SOP, exception rates, and cost-per-transaction" },
        { label: "2. Webhook / Event Trigger", detail: "Capture CRM/Email/Form event with idempotency key deduplication" },
        { label: "3. Deterministic Pre-Filter", detail: "Clean payload, validate fields, and route known rules without LLM cost" },
        { label: "4. Structured AI Step", detail: "Extract/classify via LLM JSON schema with confidence threshold" },
        { label: "5. HITL Approval & Sync", detail: "Auto-write high-confidence items; route low-confidence to Slack/Teams" },
      ],
      architectureTitle: `Hybrid No-Code / AI Automation Architecture — ${topic.title}`,
      architectureAscii: `[Trigger: HubSpot / Gmail / Stripe / Webhook]
                      │
                      ▼
       [Idempotency Check & Schema Filter]
                      │
                      ▼
       [Orchestrator: n8n / Make / Zapier]
         ├─► Clear Rule Match ──────────────────► [Direct CRM / ERP Update]
         └─► Ambiguous / Unstructured Input
                      │
                      ▼
         [LLM Structured JSON Extractor]
           ├─► Confidence >= 0.90 ──────────────► [Auto-Execute + Audit Log]
           └─► Confidence <  0.90 ──────────────► [Slack 1-Click Human Approval]`,
      playbook: [
        { phase: "Phase 1 · Map", title: "Fix the Process Before Automating", action: `Shadow a human performing ${topic.title} 10 times; eliminate redundant steps and document the top 5 exceptions.`, deliverable: "Swimlane Process Map & Baseline Metrics" },
        { phase: "Phase 2 · Prototype", title: "Build Trigger → AI → Action Pipeline", action: "Connect webhook triggers in n8n/Make to a schema-constrained LLM step with strict JSON validation.", deliverable: "Working Automation Scenario" },
        { phase: "Phase 3 · Safeguard", title: "Add Retries, Dead-Letter Queue & HITL", action: "Configure exponential backoff for 429/5xx errors, idempotency keys, and a Slack approval queue for edge cases.", deliverable: "Fault-Tolerant Production Workflow" },
        { phase: "Phase 4 · Measure", title: "Track Hours Saved & Error Rate", action: "Log every run to an operations dashboard tracking straight-through processing % and net monthly ROI.", deliverable: "Executive ROI & Runbook Dashboard" },
      ],
      caseStudies: [
        {
          company: "Mid-Market Logistics & Freight Broker",
          domain: "Automated Invoice & Bill-of-Lading Processing",
          challenge: "Operations staff manually typed 1,400 PDF carrier invoices per day into the ERP, causing 4-day billing delays.",
          solution: `Built an n8n + Vision LLM workflow applying ${topic.title} with line-item math verification and human review for mismatches.`,
          impact: "86% straight-through automation, $210k/year labor savings, and billing cycle cut from 4 days to 12 minutes.",
        },
        {
          company: "B2B SaaS Revenue Operations Team",
          domain: "Inbound Lead Enrichment & Support Triage",
          challenge: "High-intent enterprise leads waited 6 hours for routing while support tickets were mislabeled 30% of the time.",
          solution: "Deployed webhook-driven AI classification and CRM enrichment with instant Slack escalation.",
          impact: "Lead response time dropped to 45 seconds and pipeline conversion rose 19%.",
        },
      ],
      table: {
        caption: `Automation Platform Selection Guide (${topic.title})`,
        headers: ["Platform", "Best For", "Self-Hostable?", "Pricing & Scale Sweet Spot"],
        rows: [
          ["Zapier", "Fastest setup across 7,000+ SaaS apps for non-coders", "No (Cloud only)", "Low-to-medium volume; expensive at 100k+ tasks/mo"],
          ["Make.com", "Visual branching routers, iterators, and complex JSON", "No (Cloud only)", "High visual power at 3–5x lower cost per operation"],
          ["n8n", "AI-native nodes, LangChain agents, custom JS/Python & privacy", "Yes (Docker / Queue mode)", "Best for technical operators & high-volume enterprise workflows"],
        ],
      },
      mncCourses: [
        { org: "DeepLearning.AI", title: "AI Python & Workflow Automation Short Courses", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/", duration: "3 hrs" },
        { org: "Microsoft", title: "Microsoft Power Automate & Copilot Studio Learning Path", type: "Certification Path", url: "https://learn.microsoft.com/en-us/training/powerplatform/power-automate", duration: "6 hrs" },
        { org: "OpenAI", title: "Structured Outputs & Webhooks Automation Guide", type: "Official Guide", url: "https://platform.openai.com/docs/guides/structured-outputs", duration: "1 hr" },
      ],
      youtubeVideos: [
        { creator: "Nick Saraev & Liam Ottley", channelBadge: "AI Automation Agency", title: "Complete n8n & Make.com AI Automation Masterclass (Zero to Production)", duration: "2h 45m", url: "https://www.youtube.com/@nicksaraev", whyWatch: "Shows real client workflows, webhook error handling, and ROI pricing." },
        { creator: "n8n Official", channelBadge: "Official Workflow Academy", title: "Build AI Agents & Automated Workflows in n8n", duration: "1h 20m", url: "https://www.youtube.com/@n8n-io", whyWatch: "Official tutorials covering webhooks, vector stores, and human-in-the-loop nodes." },
      ],
      portals: [
        { name: "There's An AI For That (TAAFT)", category: "Tool Directory", description: "Compare 12,000+ specialized AI automation tools for every business department.", url: "https://theresanaiforthat.com/" },
        ...DEFAULT_PORTALS.slice(1),
      ],
    },

    product_fde: {
      flowchartTitle: `AI Product & Forward-Deployed Delivery Loop: ${topic.title}`,
      flowchartSteps: [
        { label: "1. Pain & Value Sizing", detail: "Shadow real users, quantify baseline cost/time, and verify AI fit" },
        { label: "2. Golden Dataset & PRD", detail: "Collect 50 real examples and define quality thresholds + fallback UX" },
        { label: "3. Thin-Slice Pilot", detail: "Ship a working workflow on real customer data within 2–4 weeks" },
        { label: "4. Eval & Unit Economics", detail: "Measure task completion, human override rate, and gross margin per user" },
        { label: "5. Scale & Change Mgmt", detail: "Train champions, stage rollout (5% → 100%), and productize repeatable core" },
      ],
      architectureTitle: `AI Product System & Feedback Flywheel — ${topic.title}`,
      architectureAscii: `[User Problem & Workflow]
           │
           ▼
┌──────────────────────────────────────────────────────────┐
│ AI UX Layer (Co-Pilot Draft / Citations / 1-Click Edit)  │
└──────────┬───────────────────────────────────┬───────────┘
           │ User Request                      │ Implicit Signal (Accept / Edit / Reject)
           ▼                                   ▼
[Model + RAG + Guardrails]           [Data Flywheel & Eval Store]
           │                                   │
           └──────────────►◄───────────────────┘
                    Continuous Quality & Margin Improvement`,
      playbook: [
        { phase: "Phase 1 · Discovery", title: "Validate Problem & Data Readiness", action: `Sit with end-users to observe the friction around ${topic.title} and inspect 20 real raw data records.`, deliverable: "Problem Brief & Data Reality Check" },
        { phase: "Phase 2 · Specification", title: "Write an AI-Native PRD & Eval Rubric", action: "Define target precision/recall, p95 latency, unit cost ceiling, and the exact UI when the model is uncertain.", deliverable: "AI PRD + 50-Case Eval Rubric" },
        { phase: "Phase 3 · Pilot", title: "Ship Thin-Slice & Instrument Signals", action: "Launch to 10–25 design partners or internal champions and log accept/edit/dismiss rates.", deliverable: "Live Pilot + Telemetry Funnel" },
        { phase: "Phase 4 · Scale", title: "Prove ROI & Lock Unit Economics", action: "Compare treatment vs control outcomes, optimize token margins, and hand over operational runbooks.", deliverable: "Executive ROI Case & GA Launch" },
      ],
      caseStudies: [
        {
          company: "Palantir & Enterprise FDE Deployment",
          domain: "Supply Chain & Hospital Operations Optimization",
          challenge: "Legacy ERPs held siloed data while executives needed actionable daily allocation decisions.",
          solution: `Embedded Forward-Deployed Engineers who applied ${topic.title} to ship an integrated operational co-pilot in 4 weeks.`,
          impact: "Reduced hospital bed turnaround delays by 22% and expanded a $250k pilot into a multi-year enterprise contract.",
        },
        {
          company: "Notion AI & GitHub Copilot Product Teams",
          domain: "AI UX, Pricing & Data Flywheel Design",
          challenge: "Balancing frontier LLM inference costs against SaaS subscription margins while keeping UX instantaneous.",
          solution: "Designed ghost-text/inline diff UX, tiered model routing, and tracked acceptance rate as the North Star metric.",
          impact: "Reached millions of paying users with healthy >65% gross margins.",
        },
      ],
      table: {
        caption: `Deterministic Software PM vs AI Product / FDE Execution (${topic.title})`,
        headers: ["Dimension", "Traditional SaaS Software", "AI Product & FDE Reality", "How to Win"],
        rows: [
          ["Behavior", "Deterministic (100% repeatable)", "Probabilistic (outputs vary with input drift)", "Define acceptance thresholds (e.g., >=92% faithfulness) instead of binary specs"],
          ["Marginal Cost", "Near $0 per extra click", "Token & GPU cost scales with every query", "Model unit economics early; cache, route, and price by value/usage"],
          ["User Trust", "Assumed if UI loads", "Fragile — one bad hallucination kills adoption", "Show citations, confidence indicators, and effortless undo/edit controls"],
        ],
      },
      mncCourses: [
        { org: "Google", title: "Generative AI for Product Managers & Business Leaders — Google Cloud", type: "Free Course", url: "https://www.cloudskillsboost.google/paths/118", duration: "6 hrs" },
        { org: "DeepLearning.AI", title: "AI For Everyone & Generative AI for Everyone (Andrew Ng)", type: "Free Course", url: "https://www.deeplearning.ai/courses/generative-ai-for-everyone/", duration: "5 hrs" },
        { org: "Microsoft", title: "Transform Your Business with Microsoft AI — Learning Path", type: "Certification Path", url: "https://learn.microsoft.com/en-us/training/paths/transform-business-ai/", duration: "4 hrs" },
      ],
      youtubeVideos: [
        { creator: "Lenny's Podcast", channelBadge: "Top Product Podcast", title: "How OpenAI, Anthropic & Notion Build and Price AI Products", duration: "1h 15m", url: "https://www.youtube.com/@LennysPodcast", whyWatch: "Real playbooks from CPOs and AI PMs at OpenAI, Anthropic, Perplexity, and Vercel." },
        { creator: "Y Combinator", channelBadge: "1.5M+ Subs · Startup School", title: "How Forward-Deployed Engineers & AI Startups Win Enterprise Customers", duration: "38m", url: "https://www.youtube.com/@ycombinator", whyWatch: "Explains the Palantir/OpenAI FDE motion, pilot scoping, and enterprise sales." },
      ],
      portals: DEFAULT_PORTALS,
    },

    ml_data: {
      flowchartTitle: `End-to-End Machine Learning & Data Workflow: ${topic.title}`,
      flowchartSteps: [
        { label: "1. Problem & Split Strategy", detail: "Define business metric and split Train / Val / Test (time-aware, zero leakage)" },
        { label: "2. Simple Baseline First", detail: "Run heuristic or Logistic Regression / LightGBM baseline in Day 1" },
        { label: "3. Feature & Pipeline Eng", detail: "Fit imputers, encoders, and scalers strictly on training fold" },
        { label: "4. Model & Error Analysis", detail: "Tune hyperparameters, inspect confusion matrix & worst failure slices" },
        { label: "5. Package & Serve", detail: "Export reproducible pipeline artifact with schema tests & monitoring" },
      ],
      architectureTitle: `Leakage-Free ML Training & Serving Architecture — ${topic.title}`,
      architectureAscii: `[Raw Operational Data (SQL / Parquet)]
                 │
                 ▼
      [Time-Based Train / Val / Test Split]
                 │
       ┌─────────┴─────────┐
       ▼                   ▼
[Train Fold Only]   [Holdout Test Fold]
       │                   │
       ▼                   │
[Fit Feature Pipeline]     │ (Transform Only — Never Fit!)
       │                   │
       ▼                   ▼
[Train Model (XGBoost / PyTorch)] ──► [Cost-Weighted Metric Evaluation]
                                               │
                                               ▼
                                 [Serialized Pipeline Artifact]`,
      playbook: [
        { phase: "Phase 1 · Frame", title: "Align Metric with Business Cost", action: `Translate ${topic.title} into a concrete loss function and cost matrix (cost of False Positive vs False Negative).`, deliverable: "Metric Spec & Leakage-Free Split" },
        { phase: "Phase 2 · Baseline", title: "Ship a Simple Benchmark in 24 Hours", action: "Build a clean, reproducible baseline pipeline before touching complex deep architectures.", deliverable: "Baseline Score & Error Table" },
        { phase: "Phase 3 · Iterate", title: "Data-Centric Feature & Model Tuning", action: "Inspect the 50 worst prediction errors, fix label noise, engineer domain features, and run cross-validation.", deliverable: "Cross-Validated Pipeline" },
        { phase: "Phase 4 · Productionize", title: "Bundle Preprocessing + Model Together", action: "Save feature transformers and model weights as a single versioned artifact tested in CI.", deliverable: "Deployable Model Package" },
      ],
      caseStudies: [
        {
          company: "Stripe Radar & Global Payment Networks",
          domain: "Real-Time Transaction Fraud Detection",
          challenge: "Detecting 0.1% fraudulent transactions in under 80ms without blocking legitimate buyers.",
          solution: `Applied ${topic.title} discipline: time-based validation splits, velocity features, and precision-at-recall threshold tuning.`,
          impact: "Saved billions in fraud losses while increasing legitimate payment authorization rates.",
        },
        {
          company: "Airbnb Search Ranking & Dynamic Pricing",
          domain: "Two-Sided Marketplace Conversion ML",
          challenge: "Offline accuracy improvements often failed to move online booking conversion.",
          solution: "Aligned offline NDCG/calibration metrics with online A/B experimentation and strict feature pipelines.",
          impact: "Delivered sustained multi-percent lifts in global booking conversion.",
        },
      ],
      table: {
        caption: `Algorithm & Architecture Selection Guide (${topic.title})`,
        headers: ["Data Modality", "First Baseline", "Production Workhorse", "Common Pitfall to Avoid"],
        rows: [
          ["Tabular / Structured SQL", "Logistic Regression / Ridge", "LightGBM / XGBoost / CatBoost", "Using deep neural nets before gradient-boosted trees; target leakage"],
          ["Text & Documents", "TF-IDF + Linear Classifier", "Pretrained Transformer / Embeddings", "Fine-tuning a 70B LLM when a fast embedding + classifier suffices"],
          ["Images & Audio", "Pretrained Frozen Backbone", "Fine-tuned ViT / ConvNeXt / Whisper", "Training from random weights on small datasets"],
        ],
      },
      mncCourses: [
        { org: "DeepLearning.AI", title: "Machine Learning Specialization & Deep Learning Specialization (Andrew Ng)", type: "Certification Path", url: "https://www.deeplearning.ai/courses/machine-learning-specialization/", duration: "35 hrs" },
        { org: "Google", title: "Machine Learning Crash Course — Google Developers", type: "Free Course", url: "https://developers.google.com/machine-learning/crash-course", duration: "15 hrs" },
        { org: "NVIDIA", title: "Fundamentals of Deep Learning — NVIDIA Deep Learning Institute", type: "Certification Path", url: "https://www.nvidia.com/en-us/training/", duration: "8 hrs" },
        { org: "Stanford / MIT", title: "Stanford CS229 Machine Learning & MIT 6.S191 Deep Learning", type: "Free Course", url: "https://introtodeeplearning.com/", duration: "20 hrs" },
      ],
      youtubeVideos: [
        { creator: "StatQuest with Josh Starmer", channelBadge: "1.3M+ Subs · Best ML Intuition", title: "Machine Learning, Gradient Boost, Neural Networks & Metrics Clearly Explained", duration: "Playlist", url: "https://www.youtube.com/@statquest", whyWatch: "Turns intimidating statistics and ML algorithms into unforgettable visual stories." },
        { creator: "3Blue1Brown", channelBadge: "6M+ Subs · Visual Math", title: "Neural Networks, Backpropagation & Linear Algebra Essence", duration: "1h 15m", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi", whyWatch: "Builds rock-solid geometric intuition for vectors, matrices, gradients, and neural nets." },
        { creator: "Daniel Bourke & freeCodeCamp", channelBadge: "Hands-On PyTorch", title: "PyTorch for Deep Learning & Machine Learning — Full 24-Hour Course", duration: "25h", url: "https://www.youtube.com/watch?v=V_xro1bcAuA", whyWatch: "Complete code-first journey through tensors, training loops, transfer learning, and deployment." },
      ],
      portals: [
        { name: "Kaggle Learn & Competitions", category: "Interactive Platform", description: "Free micro-courses, GPUs, datasets, and real-world ML benchmarks.", url: "https://www.kaggle.com/learn" },
        ...DEFAULT_PORTALS,
      ],
    },
  };

  const base = clusterConfigs[cluster];
  const curated = TOPIC_RESOURCES[topic.id];

  return {
    conceptualDeepDive: override?.conceptualDeepDive ?? baseConceptual,
    flowchartTitle: override?.flowchartTitle ?? base.flowchartTitle,
    flowchartSteps: override?.flowchartSteps ?? base.flowchartSteps,
    architectureTitle: override?.architectureTitle ?? base.architectureTitle,
    architectureAscii: override?.architectureAscii ?? base.architectureAscii,
    playbook: override?.playbook ?? base.playbook,
    caseStudies: override?.caseStudies ?? base.caseStudies,
    table: override?.table ?? base.table,
    mncCourses: curated?.mncCourses ?? [],
    youtubeVideos: curated?.youtubeVideos ?? [],
    portals: curated?.portals ?? [],
  };
}
