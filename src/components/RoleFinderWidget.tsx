import { useState } from "react";
import { Link } from "react-router-dom";
import { awardBonusXp } from "../gamification";

interface MatchOption {
  label: string;
  slug: string;
  why: string;
}

const QUESTIONS: {
  q: string;
  sub: string;
  choices: { text: string; emoji: string; roles: string[] }[];
}[] = [
  {
    q: "01 / 03 · Primary Engineering & Operational Background",
    sub: "Select the discipline that best aligns with your current technical foundation.",
    choices: [
      {
        text: "Product strategy, operational architecture, governance, and regulatory compliance",
        emoji: "01",
        roles: ["ai-product-manager", "ai-automation-specialist", "ai-governance-compliance-specialist"],
      },
      {
        text: "Full-stack software engineering, distributed APIs, and production application delivery",
        emoji: "02",
        roles: ["ai-engineer", "agentic-ai-engineer", "forward-deployed-engineer"],
      },
      {
        text: "Quantitative modeling, deep learning systems, data engineering, or cloud infrastructure",
        emoji: "03",
        roles: ["generative-ai-llm-engineer", "machine-learning-engineer", "mlops-engineer"],
      },
    ],
  },
  {
    q: "02 / 03 · Target Production Mandate",
    sub: "Identify the class of engineering problem you intend to own in production.",
    choices: [
      {
        text: "Architecting LLM-powered applications, multi-agent systems, and high-reliability AI products",
        emoji: "A",
        roles: ["ai-engineer", "agentic-ai-engineer", "ai-product-manager"],
      },
      {
        text: "Enterprise systems integration, autonomous workflow orchestration, and client field deployments",
        emoji: "B",
        roles: ["ai-automation-specialist", "forward-deployed-engineer"],
      },
      {
        text: "Foundation model fine-tuning, high-throughput GPU serving, ML platforms, or risk assurance",
        emoji: "C",
        roles: ["generative-ai-llm-engineer", "machine-learning-engineer", "mlops-engineer", "ai-governance-compliance-specialist"],
      },
    ],
  },
  {
    q: "03 / 03 · Preferred Technical Entry Vector",
    sub: "Determine the abstraction layer where you want to begin execution.",
    choices: [
      {
        text: "System specifications, evaluation frameworks, workflow orchestration, and governance controls",
        emoji: "I",
        roles: ["ai-product-manager", "ai-automation-specialist", "ai-governance-compliance-specialist"],
      },
      {
        text: "Model APIs, hybrid RAG architectures, structured tool-calling, and Model Context Protocol (MCP)",
        emoji: "II",
        roles: ["ai-engineer", "agentic-ai-engineer", "forward-deployed-engineer"],
      },
      {
        text: "PyTorch internals, LoRA/QLoRA optimization, vLLM serving engines, and Kubernetes ML pipelines",
        emoji: "III",
        roles: ["generative-ai-llm-engineer", "machine-learning-engineer", "mlops-engineer"],
      },
    ],
  },
];

const ROLE_META: Record<string, MatchOption> = {
  "ai-engineer": {
    label: "AI Systems Engineer",
    slug: "ai-engineer",
    why: "Focuses on architecting, evaluating, and shipping production software systems powered by foundation models, hybrid retrieval, and deterministic guardrails.",
  },
  "generative-ai-llm-engineer": {
    label: "Generative AI & LLM Systems Engineer",
    slug: "generative-ai-llm-engineer",
    why: "Focuses on transformer internals, parameter-efficient fine-tuning (LoRA/QLoRA), preference alignment, and low-latency GPU inference engines.",
  },
  "forward-deployed-engineer": {
    label: "Forward Deployed Engineer (FDE)",
    slug: "forward-deployed-engineer",
    why: "Embeds directly within enterprise environments to architect data ontology pipelines, rapid production pilots, and mission-critical AI deployments.",
  },
  "ai-product-manager": {
    label: "AI Technical Product Manager",
    slug: "ai-product-manager",
    why: "Defines non-deterministic product specifications, evaluation benchmarks, unit economics (token/latency budgets), and enterprise adoption strategy.",
  },
  "agentic-ai-engineer": {
    label: "Agentic Systems Engineer",
    slug: "agentic-ai-engineer",
    why: "Designs stateful multi-step execution graphs, Model Context Protocol (MCP) tool servers, memory hierarchies, and bounded autonomy sandboxes.",
  },
  "ai-automation-specialist": {
    label: "Enterprise AI Automation Architect",
    slug: "ai-automation-specialist",
    why: "Engineers event-driven enterprise workflows, webhook integrations, structured LLM data pipelines, and human-in-the-loop operational systems.",
  },
  "ai-governance-compliance-specialist": {
    label: "AI Governance, Risk & Compliance Lead",
    slug: "ai-governance-compliance-specialist",
    why: "Leads algorithmic risk assessments, EU AI Act and NIST AI RMF regulatory alignment,ISO/IEC 42001 management systems, and red-team assurance.",
  },
  "machine-learning-engineer": {
    label: "Machine Learning Systems Engineer",
    slug: "machine-learning-engineer",
    why: "Builds high-signal feature pipelines, classical and deep predictive models, calibration frameworks, and low-latency production scoring services.",
  },
  "mlops-engineer": {
    label: "MLOps & AI Infrastructure Engineer",
    slug: "mlops-engineer",
    why: "Architects reproducible training pipelines, distributed GPU clusters, model registries, drift telemetry, and automated canary rollbacks.",
  },
};

export function RoleFinderWidget() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [winner, setWinner] = useState<MatchOption | null>(null);

  const pick = (roles: string[]) => {
    const next = { ...scores };
    for (const r of roles) next[r] = (next[r] ?? 0) + 1;
    setScores(next);

    if (step + 1 < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      const sorted = Object.entries(next).sort((a, b) => b[1] - a[1]);
      const topSlug = sorted[0]?.[0] ?? "ai-engineer";
      setWinner(ROLE_META[topSlug] ?? ROLE_META["ai-engineer"]);
      awardBonusXp(75, "quiz");
    }
  };

  const reset = () => {
    setStep(0);
    setScores({});
    setWinner(null);
  };

  if (winner) {
    return (
      <div className="finder-card glass-3d">
        <div className="finder-badge">RECOMMENDED SPECIALIZATION TRACK</div>
        <h3>{winner.label}</h3>
        <p className="lead">{winner.why}</p>
        <div className="cta" style={{ justifyContent: "flex-start", marginTop: 18 }}>
          <Link to={`/${winner.slug}`} className="btn primary">
            Inspect Technical Curriculum →
          </Link>
          <button type="button" className="btn" onClick={reset}>
            Reset Diagnostic
          </button>
        </div>
      </div>
    );
  }

  const cur = QUESTIONS[step];

  return (
    <div className="finder-card glass-3d">
      <div className="finder-top">
        <span className="finder-badge">ARCHITECTURAL TRACK DIAGNOSTIC</span>
        <span className="muted">Phase 0{step + 1} of 0{QUESTIONS.length}</span>
      </div>
      <h3>{cur.q}</h3>
      <p className="muted" style={{ marginTop: -4, marginBottom: 16 }}>{cur.sub}</p>
      <div className="finder-choices">
        {cur.choices.map((c) => (
          <button key={c.text} type="button" className="choice-btn" onClick={() => pick(c.roles)}>
            <span className="choice-emoji">{c.emoji}</span>
            <span>{c.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
