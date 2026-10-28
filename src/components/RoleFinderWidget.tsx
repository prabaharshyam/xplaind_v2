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
    q: "1/3 · What's your current tech background?",
    sub: "Zero gatekeeping — pick what feels closest right now.",
    choices: [
      {
        text: "Zero coding! I like strategy, business, workflows, or rules",
        emoji: "✨",
        roles: ["ai-product-manager", "ai-automation-specialist", "ai-governance-compliance-specialist"],
      },
      {
        text: "I write apps / scripts & want to build cool AI products",
        emoji: "⚡",
        roles: ["ai-engineer", "agentic-ai-engineer", "forward-deployed-engineer"],
      },
      {
        text: "I love deep models, math, data pipelines, or cloud infra",
        emoji: "🧠",
        roles: ["generative-ai-llm-engineer", "machine-learning-engineer", "mlops-engineer"],
      },
    ],
  },
  {
    q: "2/3 · Which superpower sounds the most fun on a Tuesday?",
    sub: "Imagine getting paid for one of these:",
    choices: [
      {
        text: "Shipping chatbots, autonomous agents & AI features users touch",
        emoji: "🤖",
        roles: ["ai-engineer", "agentic-ai-engineer", "ai-product-manager"],
      },
      {
        text: "Saving 100 hours/week by connecting apps or solving client chaos",
        emoji: "🚀",
        roles: ["ai-automation-specialist", "forward-deployed-engineer"],
      },
      {
        text: "Training/serving massive models, scaling GPUs, or auditing AI safety",
        emoji: "🛡️",
        roles: ["generative-ai-llm-engineer", "machine-learning-engineer", "mlops-engineer", "ai-governance-compliance-specialist"],
      },
    ],
  },
  {
    q: "3/3 · How do you want to start learning TODAY?",
    sub: "We'll tailor your entry path:",
    choices: [
      {
        text: "Visual, no-code / low-code & product thinking first",
        emoji: "🎨",
        roles: ["ai-product-manager", "ai-automation-specialist", "ai-governance-compliance-specialist"],
      },
      {
        text: "Hands-on APIs, prompts, RAG & autonomous agents",
        emoji: "🛠️",
        roles: ["ai-engineer", "agentic-ai-engineer", "forward-deployed-engineer"],
      },
      {
        text: "Deep PyTorch, fine-tuning, ML pipelines & Kubernetes",
        emoji: "🔬",
        roles: ["generative-ai-llm-engineer", "machine-learning-engineer", "mlops-engineer"],
      },
    ],
  },
];

const ROLE_META: Record<string, MatchOption> = {
  "ai-engineer": {
    label: "🛠️ AI Engineer",
    slug: "ai-engineer",
    why: "You want to build and ship real apps powered by LLMs, RAG, and APIs without needing a math PhD.",
  },
  "generative-ai-llm-engineer": {
    label: "✨ Generative AI & LLM Engineer",
    slug: "generative-ai-llm-engineer",
    why: "You want to master the model layer: transformers, LoRA fine-tuning, advanced RAG, and GPU inference.",
  },
  "forward-deployed-engineer": {
    label: "🚀 Forward Deployed Engineer (FDE)",
    slug: "forward-deployed-engineer",
    why: "You love fast prototyping, talking to customers, and making AI work inside real enterprise chaos.",
  },
  "ai-product-manager": {
    label: "🧭 AI Product Manager",
    slug: "ai-product-manager",
    why: "No heavy coding required — you decide what AI to build, design the UX, and lead launches.",
  },
  "agentic-ai-engineer": {
    label: "🤖 Agentic AI Engineer",
    slug: "agentic-ai-engineer",
    why: "You want to build autonomous agents that plan, call tools, use MCP, and collaborate safely.",
  },
  "ai-automation-specialist": {
    label: "⚙️ AI Automation Specialist",
    slug: "ai-automation-specialist",
    why: "Great for non-coders & builders alike — connect Zapier/Make/n8n with AI to automate whole workflows.",
  },
  "ai-governance-compliance-specialist": {
    label: "⚖️ AI Governance & Compliance Specialist",
    slug: "ai-governance-compliance-specialist",
    why: "Zero coding required — lead AI ethics, EU AI Act compliance, risk audits, and safety guardrails.",
  },
  "machine-learning-engineer": {
    label: "📊 Machine Learning Engineer",
    slug: "machine-learning-engineer",
    why: "Turn raw data into predictive models using Python, scikit-learn, PyTorch, and feature engineering.",
  },
  "mlops-engineer": {
    label: "🔁 MLOps Engineer",
    slug: "mlops-engineer",
    why: "Build the cloud & Kubernetes backbone that trains, deploys, monitors, and scales AI models.",
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
        <div className="finder-badge">🎯 YOUR AI ROLE MATCH (+75 XP EARNED)</div>
        <h3>{winner.label}</h3>
        <p className="lead">{winner.why}</p>
        <div className="cta" style={{ justifyContent: "flex-start", marginTop: 18 }}>
          <Link to={`/${winner.slug}`} className="btn primary">
            Launch My Roadmap →
          </Link>
          <button type="button" className="btn" onClick={reset}>
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const cur = QUESTIONS[step];

  return (
    <div className="finder-card glass-3d">
      <div className="finder-top">
        <span className="finder-badge">🧭 "I DON'T KNOW WHERE TO START" — 30-SEC ROLE MATCHER</span>
        <span className="muted">Step {step + 1} of {QUESTIONS.length}</span>
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
