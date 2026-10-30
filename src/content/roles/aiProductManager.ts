import type { Roadmap } from "../../types";
import { S } from "../shared";

export const aiProductManager: Roadmap = {
  slug: "ai-product-manager",
  title: "AI Product Manager",
  emoji: "🧭",
  description:
    "Lead the strategy, discovery, specification, evaluation, UX design, unit economics, and safe rollout of AI-powered products—mastering the modern AI PM discipline practiced at frontier labs and top SaaS companies.",
  audience:
    "Product managers, founders, technical program managers, and domain leaders who define what AI products to build, establish golden evaluation bars, and own adoption and gross margin.",
  tools: [
    "AI PRDs & System Behavior Contracts",
    "Golden Evaluation Datasets & Braintrust / LangSmith",
    "Prompt Playgrounds (OpenAI / Anthropic / Google AI Studio)",
    "Token Unit-Economics & Gross-Margin Models",
    "A/B Experimentation & Shadow/Canary Feature Flags",
    "Figma & Probabilistic UX Patterns",
  ],
  outcomes: [
    "Evaluate AI product opportunities using the Error-Cost Matrix and select the right technical tier (Prompting vs RAG vs Fine-Tuning vs Agents).",
    "Author rigorous AI PRDs with System Prompts, input/output exemplar tables, abstention rules, and a 3-layer metric hierarchy (Model, Product, Business).",
    "Design human-centered probabilistic UX (citations, confidence, autonomy sliders), run offline evals + online A/B tests, and protect token gross margins.",
  ],
  sections: [
    {
      id: "ai-literacy",
      title: "1. Technical AI Literacy for Product Leaders",
      topics: [
        S.mlFundamentals,
        S.transformersLlms,
        {
          id: "capabilities-limits",
          title: "Deterministic Software vs Probabilistic AI: Capabilities, Latency & Failure Modes",
          minutes: 8,
          summary: "Understand what foundation models excel at, why hallucinations occur, and how context windows, latency (TTFT/ITL), and reasoning tokens shape product design.",
          body: [
            "Classical software is deterministic (`if/else` branches return 100% predictable outputs). AI products are **probabilistic systems**: even a 97%-accurate model will fail 3 times out of 100, and outputs can shift across prompts, languages, or upstream model updates. As an AI PM, you must know where LLMs excel—classification, structured extraction, synthesis, translation, semantic search, and first-draft generation—and where they fail without external scaffolding (exact arithmetic, live facts without RAG, deterministic policy enforcement).",
            "Never write a PRD before hands-on prototyping: run 30 real, messy customer inputs through an LLM playground yourself to observe failure modes, latency (Time-to-First-Token vs full completion time), and token consumption firsthand.",
          ],
          points: [
            "Treat every AI feature as a probabilistic system whose error rate must be designed around in the product workflow.",
            "Test 30 real customer inputs in a model playground yourself before asking engineering to scope a feature.",
            "Understand the latency tradeoff between fast standard models (<500ms TTFT) and deep reasoning models (5–30s thinking time).",
          ],
        },
      ],
    },
    {
      id: "discovery",
      title: "2. Opportunity Discovery, Data Moats & The Adaptation Ladder",
      topics: [
        {
          id: "choosing-problems",
          title: "Problem Framing & The Frequency vs Error-Cost Matrix",
          minutes: 8,
          summary: "Prioritize AI use cases by mapping task frequency and friction against error blast radius and human verification speed.",
          body: [
            "Not every user pain point should be solved with AI—often a deterministic rule, better search filter, or cleaner UI wins at 1% of the cost. Evaluate candidate AI problems on a **2x2 Frequency vs Error-Cost Matrix**: (1) **Sweet Spot (High Frequency, Low Cost of Error, Fast to Verify)**—e.g., code autocomplete, support reply drafting, meeting notes, semantic search; (2) **High-Stakes Assist (High Value, High Cost of Error)**—e.g., clinical note coding, contract redlining, financial underwriting—requires mandatory Human-in-the-Loop (HITL) verification and provenance citations.",
            "Avoid use cases where errors are catastrophic AND verifying the AI's output takes longer than doing the task manually from scratch.",
          ],
          points: [
            "Compare every proposed AI feature against a non-AI baseline (rules, templates, better UX) first.",
            "Measure **Verification Tax**: how many seconds it takes a user to check whether the AI's output is right.",
            "Start in Copilot (human-reviewed draft) mode whenever the cost of a wrong action is high.",
          ],
        },
        {
          id: "data-strategy",
          title: "Data Strategy, Proprietary Data Flywheels & Defensibility Moats",
          minutes: 7,
          summary: "Turn user edits, implicit behavioral signals, and proprietary domain context into a compounding product moat.",
          body: [
            "When every competitor can call the same frontier API (GPT-4o, Claude, Gemini), the model itself is not your moat. Durable AI product defensibility comes from three sources: (1) **Proprietary Context & System of Record**—deep access to the customer's workspace data, schemas, and permissions; (2) **Workflow Integration**—owning the daily UI where decisions happen; and (3) **The Data Flywheel**—capturing implicit and explicit user feedback (accepted vs edited drafts, thumbs up/down with reason tags, chosen citations) to continuously improve retrieval, prompts, and fine-tuned models.",
            "Verify data rights early with legal counsel: confirm whether customer agreements permit using anonymized interaction logs or corrections for evaluation and model improvement.",
          ],
          points: [
            "Design the UI so normal user work (accepting, editing, or rejecting a draft) naturally generates labeled evaluation data.",
            "Audit data coverage, freshness, and legal usage rights before committing to a roadmap item.",
            "Foundation model wrappers without workflow depth or proprietary context are easily commoditized.",
          ],
        },
        {
          id: "build-buy",
          title: "The AI PM Adaptation Ladder: Prompting vs RAG vs Fine-Tuning vs Agents",
          minutes: 8,
          summary: "Guide engineering investments up the complexity ladder based on evidence—from zero-shot APIs to custom fine-tuned models.",
          body: [
            "PMs must prevent premature over-engineering by enforcing the **Adaptation Ladder**: **Level 1: Prompt & Context Engineering** on a commercial API (ship in days to validate user demand); **Level 2: Retrieval-Augmented Generation (RAG)** when the product needs fresh, customer-specific, or cited facts; **Level 3: Multi-Step Workflows / Agents** when tasks require calling external APIs or taking actions; **Level 4: Fine-Tuning (LoRA/DPO) or Distillation** only when you need to lock in a specialized style/schema or distil a large expensive model into a fast, cheap 8B model at scale.",
          ],
          points: [
            "Use **RAG** to inject dynamic knowledge and citations; use **Fine-Tuning** to teach form, tone, or latency/cost distillation.",
            "Never approve a fine-tuning or self-hosted GPU project until a prompted baseline has proven user value and generated a golden dataset.",
            "Keep model selection behind an abstraction layer so you can upgrade or switch providers as pricing and quality shift.",
          ],
        },
      ],
    },
    {
      id: "definition",
      title: "3. AI Product Specification (AI PRDs) & Probabilistic UX Design",
      topics: [
        {
          id: "ai-prd",
          title: "Writing AI PRDs: System Behavior Contracts, Exemplar Tables & Abstention Rules",
          minutes: 8,
          summary: "Replace traditional wireframe-only specs with behavior contracts, golden input/output tables, and explicit refusal boundaries.",
          body: [
            "A traditional PRD specifies deterministic button clicks and API fields. An **AI PRD (System Behavior Specification)** must define six additional contracts: (1) **The System Persona, Tone & Scope**; (2) **Golden Input/Output Exemplar Table**—at least 25 real examples covering happy paths, ambiguous queries, adversarial inputs, and out-of-scope requests; (3) **Context & Grounding Contract**—which data sources are retrieved and how permissions apply.",
            "(4) **Abstention & Escalation Policy**—when the system must say 'I don't have enough information in your workspace' or hand off to a human; (5) **Release Quality Bar** (e.g., $\\ge 95\\%$ citation faithfulness, $<1\\%$ hallucination rate on the golden set); and (6) **Latency & Cost Ceiling** (e.g., TTFT $< 800\\text{ms}$, $<\\$0.015$ per resolution).",
          ],
          points: [
            "In AI Product Management, **Evals are the new PRD**: your golden input/output spreadsheet is the executable specification.",
            "Explicitly specify when the AI must abstain ('I don't know') rather than guessing.",
            "Define hard latency (TTFT) and per-interaction cost budgets alongside accuracy targets.",
          ],
        },
        {
          id: "ux-for-ai",
          title: "Human-Centered AI UX: Citations, Confidence, Streaming & Autonomy Sliders",
          minutes: 8,
          summary: "Design interfaces that calibrate user trust, minimize verification friction, and scale gracefully from Copilot to Autopilot.",
          body: [
            "Great AI UX makes probabilistic outputs safe and effortless to work with: (1) **Inline Provenance & Citations**—clickable source badges that highlight the exact paragraph in the original PDF or record; (2) **Calibrated Confidence & Abstention UI**—visually distinguishing high-confidence grounded answers from tentative drafts; (3) **Low-Friction Edit & Undo**—inline diff views, one-click 'Accept / Modify / Revert', and scoped regeneration.",
            "(4) **Autonomy Sliders**—letting users or admins graduate a workflow from **L1 Suggest** (read-only) to **L2 Draft & Approve** (human clicks send) to **L3 Bounded Autopilot** (executes automatically below a risk threshold with audit logs).",
          ],
          points: [
            "Always show inline clickable citations for factual claims so users can verify in 2 seconds.",
            "Stream tokens progressively or show meaningful step progress ('Searching 14 contracts...') to mask multi-second latency.",
            "Give users a 1-click Undo / Revert for every AI action that modifies their workspace.",
          ],
        },
      ],
    },
    {
      id: "evals-metrics-experimentation",
      title: "4. The 3-Layer Metric Hierarchy, Golden Evals & A/B Experimentation",
      topics: [
        {
          id: "ai-metrics",
          title: "The 3-Layer AI Metric Hierarchy: Model Evals, Product Signals & Business KPIs",
          minutes: 8,
          summary: "Connect offline retrieval/generation metrics to in-product acceptance/edit rates and net revenue retention.",
          body: [
            "AI PMs govern products through a **Three-Layer Metric Hierarchy**: **Layer 1: Technical Model & Pipeline Metrics**—Context Recall@K, Faithfulness/Groundedness, JSON Schema Validity, Toxicity/Jailbreak Pass Rate, TTFT, and Cost per Run; **Layer 2: Product Interaction Metrics**—**Draft Acceptance Rate** (% of AI outputs used with $<10\\%$ edit distance), **Time-to-Task-Completion**, Thumbs-Up/Down Ratio, and Human Escalation Rate; **Layer 3: Business Outcome KPIs**—Ticket Deflection Rate, Conversion Lift, Feature Retention, and Gross Margin.",
            "Watch for divergences: if offline benchmark scores rise by 5% but online Draft Acceptance Rate drops, your offline evaluation rubric is misaligned with real user preferences.",
          ],
          points: [
            "Track **Acceptance Rate without Heavy Edits** as your highest-signal product quality metric for generative features.",
            "Pair every North-Star metric with **Guardrail Metrics** (customer complaint rate, escalation rate, p95 latency, cost per active user).",
            "Never celebrate an offline benchmark win until it translates into online user task completion.",
          ],
        },
        S.llmEvaluation,
        {
          id: "experimentation",
          title: "Offline Evaluation Loops, Shadow Testing & Online A/B Experimentation",
          minutes: 7,
          summary: "Co-own the golden dataset with domain experts and run statistically rigorous online experiments that account for novelty effects.",
          body: [
            "As the AI PM, you—not just the engineering team—must co-own the **Golden Evaluation Dataset**. Sit with domain experts (lawyers, clinicians, support leads) to grade 100–300 real production traces and align your automated LLM-as-a-Judge prompts with human judgment.",
            "When running online A/B tests on AI features, calculate statistical power and sample size up front, stratify users appropriately, and run experiments long enough (2–4 weeks) to separate genuine productivity gains from initial **Novelty Effects** (users clicking the shiny AI button in week one and abandoning it in week two).",
          ],
          points: [
            "Personally review at least 50 failed production traces every week with your engineering lead ('Error Analysis Ritual').",
            "Run A/B tests across multiple weeks to filter out week-one novelty spikes and measure repeat task retention.",
            "Use Shadow Mode or interleaving experiments before exposing unproven models to 100% of users.",
          ],
        },
      ],
    },
    {
      id: "economics-gtm-governance",
      title: "5. Token Unit Economics, Pricing Strategy, Staged Rollouts & Governance",
      topics: [
        {
          id: "unit-economics",
          title: "AI Unit Economics, Token Cost Modeling, Gross Margin & Pricing Models",
          minutes: 8,
          summary: "Model input/output/cached token costs, prevent power-user margin collapse, and choose Seat vs Usage vs Outcome pricing.",
          body: [
            "Unlike traditional SaaS where marginal cost per user click is near zero (80%+ gross margins), every AI interaction consumes real GPU compute: $\\text{Cost}_{\\text{turn}} = (N_{\\text{in}} \\times P_{\\text{in}}) + (N_{\\text{out}} \\times P_{\\text{out}}) + \\text{Search/Rerank} + \\text{Human Review}$. A multi-step agent loop that runs 10 turns with a 30k context window can easily cost $\\$0.15–\\$0.50$ per task—quickly turning a $\\$20/\\text{month}$ flat-rate power user unprofitable.",
            "Choose a pricing architecture aligned with value and cost: **Tiered Seat / Fair-Use Caps** for Horizontal Copilots, **Consumption / Credit Packs** for high-volume API/workflow processing, or **Outcome-Based Pricing** (e.g., $\\$0.99$ per autonomously resolved support ticket) when value is clear and measurable. Partner with engineering on **Model Routing** (routing 80% of simple turns to a 10x cheaper small model), **Prompt Caching**, and **Context Pruning** to protect 65–75%+ gross margins.",
          ],
          points: [
            "Model P50 AND P99 user token consumption—heavy power users on uncapped flat-rate plans can destroy gross margins.",
            "Use tiered model routing, prompt caching, and output length controls as product-level margin levers.",
            "Align pricing (Per-Seat, Usage Credits, or Per-Outcome Resolution) with how customers perceive business value.",
          ],
          example: {
            title: "Per-interaction AI unit economics & gross margin calculator",
            language: "python",
            code: `def monthly_user_margin(
    seat_price_usd: float,
    tasks_per_month: int,
    avg_input_tokens: int = 6000,
    avg_output_tokens: int = 600,
    input_price_per_1m: float = 2.50,
    output_price_per_1m: float = 10.00,
) -> dict:
    cost_per_task = (avg_input_tokens * input_price_per_1m + avg_output_tokens * output_price_per_1m) / 1_000_000
    total_ai_cost = tasks_per_month * cost_per_task
    gross_margin_pct = ((seat_price_usd - total_ai_cost) / seat_price_usd) * 100
    return {"cost_per_task": round(cost_per_task, 4), "monthly_cost": round(total_ai_cost, 2), "margin_pct": round(gross_margin_pct, 1)}

print(monthly_user_margin(seat_price_usd=30.0, tasks_per_month=400))`,
          },
        },
        {
          id: "launch-rollout",
          title: "Staged Rollouts, Kill Switches, Go-To-Market Positioning & Responsible AI",
          minutes: 7,
          summary: "Launch through Dogfooding → Alpha → Canary → GA with feature flags, clear security/privacy positioning, and EU AI Act readiness.",
          body: [
            "Ship AI features through a disciplined 4-stage rollout gate: (1) **Internal Dogfooding & Red-Teaming**; (2) **Design-Partner Private Beta** with high-touch trace review; (3) **Canary Rollout (5% → 25% → 100%)** behind a dynamic feature flag with an instant one-click kill switch; and (4) **General Availability (GA)** backed by customer-facing trust documentation.",
            "In Go-To-Market positioning, sell the **measurable workflow outcome** ('resolve tier-1 billing claims in 40 seconds'), never the underlying model buzzword. Proactively publish an **AI Trust & Data Usage Fact Sheet** answering enterprise buyers' top three objections: data retention/training policy, citation accuracy, and EU AI Act / SOC 2 compliance.",
          ],
          points: [
            "Gate every rollout stage on explicit Go/No-Go criteria (golden eval score, p95 latency, zero high-severity red-team leaks).",
            "Equip Sales and Customer Success with a clear 1-page AI Security & Data Privacy FAQ.",
            "Position around customer workflow ROI and time saved rather than model architecture buzzwords.",
          ],
        },
        S.responsibleAi,
        S.aiRegulation,
      ],
    },
  ],
};
