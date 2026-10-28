import type { Topic } from "./types";

export interface SimpleTake {
  vibe: string;
  analogy: string;
  noCodeStep: string;
}

const CUSTOM_VIBES: Record<string, SimpleTake> = {
  "python-essentials": {
    vibe: "Python serves as the primary orchestration layer for modern AI systems, bridging high-level application logic with C++/CUDA tensor runtimes and strongly typed schema validation.",
    analogy: "Treat Python not as a scripting language, but as the control plane that binds Pydantic data contracts, asynchronous HTTP transport, and accelerated numerical kernels into a cohesive service.",
    noCodeStep: "Inspect a production FastAPI endpoint using Pydantic `BaseModel` validation and verify how malformed JSON payloads are rejected prior to model invocation.",
  },
  "how-llms-work": {
    vibe: "Autoregressive language models compute conditional probability distributions over subword tokens using causal self-attention; they optimize for statistical plausibility rather than factual truth.",
    analogy: "An LLM operates like a high-dimensional lossy compression engine over human text—capable of synthesizing complex structural patterns, yet requiring external verification for factual determinism.",
    noCodeStep: "Compare model outputs across temperature 0.0 and 0.9 on an identical analytical prompt to observe probability distribution divergence.",
  },
  "prompt-design": {
    vibe: "Prompt engineering is the discipline of programming non-deterministic runtimes through explicit system invariants, few-shot exemplars, and structured output schemas.",
    analogy: "Treat a system prompt as an API interface contract: ambiguity in input constraints directly translates into variance and failure modes in downstream consumers.",
    noCodeStep: "Refactor an unstructured prompt into four explicit blocks: System Authority, Context Boundaries, Negative Constraints, and JSON Schema Contract.",
  },
  rag: {
    vibe: "Retrieval-Augmented Generation (RAG) decouples parametric model reasoning from non-parametric enterprise knowledge by injecting dynamically retrieved, access-controlled context at inference time.",
    analogy: "Instead of retraining model weights whenever corporate state changes, RAG operates as a just-in-time reference index with verifiable provenance.",
    noCodeStep: "Evaluate a retrieval query across both dense semantic search and lexical BM25 to observe why hybrid Reciprocal Rank Fusion (RRF) prevents missed exact-keyword matches.",
  },
  "tool-use": {
    vibe: "Function calling transforms a language model from a text generator into a structured decision router capable of emitting typed parameters for external APIs and databases.",
    analogy: "The model acts as the reasoning controller that formulates a structured RPC request, while your deterministic application runtime validates permissions and executes the side effect.",
    noCodeStep: "Define a JSON Schema tool specification with strict `enum` and `required` constraints, and verify how the runtime handles missing arguments.",
  },
  "agent-loop": {
    vibe: "An agentic system embeds an LLM within a stateful feedback loop (Plan → Execute Tool → Observe Telemetry → Re-evaluate) bounded by explicit iteration and cost budgets.",
    analogy: "Single-turn inference is a stateless function call; an agent is a closed-loop control system that dynamically adapts its execution trajectory based on environment feedback.",
    noCodeStep: "Trace a 4-step operational workflow and identify which transitions can be hardcoded as deterministic state machines versus those requiring dynamic model routing.",
  },
  "ml-fundamentals": {
    vibe: "Classical machine learning optimizes parametric or tree-based decision boundaries over structured tabular features, consistently outperforming LLMs on latency, cost, and calibration for structured prediction.",
    analogy: "Using a 70B language model for tabular churn prediction is equivalent to using a jet turbine to power a wristwatch—gradient boosted trees deliver superior precision at 1/1000th the compute cost.",
    noCodeStep: "Audit a predictive use case in your organization and verify whether temporal train/validation splits are enforced to prevent target leakage.",
  },
  "ai-regulation": {
    vibe: "Frameworks such as the EU AI Act and NIST AI RMF classify AI systems by operational risk tier, mandating conformity assessments, lineage documentation, and human oversight for high-impact deployments.",
    analogy: "Regulatory compliance in AI mirrors aviation safety engineering: low-risk consumer utilities require minimal friction, whereas credit, hiring, and clinical systems require black-box telemetry and formal auditability.",
    noCodeStep: "Map one production AI system against the EU AI Act four-tier risk taxonomy (Unacceptable, High, Limited, Minimal) and document its required oversight controls.",
  },
};

export function getSimpleTake(topic: Topic): SimpleTake {
  const custom = CUSTOM_VIBES[topic.id];
  if (custom) return custom;

  return {
    vibe: `Core Architectural Thesis: ${topic.summary.replace(/\.$/, "")}—engineered for predictable reliability, observability, and controlled unit economics in production.`,
    analogy: `Systems Mental Model: Treat "${topic.title}" as a critical infrastructure boundary where ${topic.points[0] ?? topic.summary}`,
    noCodeStep: `Verification Protocol: Audit your current architecture against the three core invariants of "${topic.title}", document failure modes, and record completion (+120 CR).`,
  };
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export function buildTopicQuiz(topic: Topic): QuizQuestion {
  const correct = topic.points[0] ?? topic.summary;
  const distractors = [
    "Bypass offline evaluation benchmarks and deploy directly to production traffic without telemetry.",
    "Default to training a bespoke foundation model from scratch prior to establishing a retrieval or prompting baseline.",
    "Embed unvalidated external payloads and credentials directly inside system prompts without schema sanitization.",
  ];

  // Deterministic shuffle based on topic.id length
  const correctIndex = topic.id.length % 4;
  const options: string[] = [];
  let dIdx = 0;
  for (let i = 0; i < 4; i++) {
    if (i === correctIndex) options.push(correct);
    else options.push(distractors[dIdx++]);
  }

  return {
    question: `Technical Verification: Which architectural principle governs "${topic.title}" in production?`,
    options,
    correctIndex,
    explanation: `Verified. "${correct}" is a primary engineering invariant for ${topic.title}.`,
  };
}
