import { useState } from "react";
import { awardBonusXp } from "../gamification";

const PRESETS = [
  {
    name: "Architectural Trade-Off Analysis",
    raw: "write something about AI jobs",
    upgraded:
      "Act as a Principal AI Systems Architect. Compare AI Systems Engineer vs. AI Technical Product Manager in a 3-row markdown matrix (System Ownership, Production Deliverables, Evaluation Metrics) for an enterprise engineering organization.",
  },
  {
    name: "Deterministic Schema Extraction",
    raw: "get the price from this invoice text",
    upgraded:
      'Extract structured financial fields from the document below. Return ONLY valid JSON conforming to {"vendor": string, "total": number, "currency": "USD"|"EUR"|"INR"}. If any attribute is absent or ambiguous, return null without extrapolation.',
  },
  {
    name: "Citation-Grounded RAG Specification",
    raw: "answer customer refund question",
    upgraded:
      "You are an enterprise compliance assistant. Answer the query using ONLY the supplied <context> blocks. Append exact section citations in brackets [Section X.Y]. If the <context> is insufficient to verify the claim, respond verbatim: 'INSUFFICIENT_GROUNDING_CONTEXT'.",
  },
];

function scorePrompt(text: string) {
  const t = text.trim();
  if (!t) return { score: 0, checks: [] as { label: string; ok: boolean }[], reply: "" };

  const hasRole = /act as|you are|role:|expert|assistant|manager|engineer|architect/i.test(t);
  const hasFormat = /json|table|bullet|markdown|list|step|format|schema|matrix/i.test(t);
  const hasConstraint = /only|do not|never|limit|max|under|exact|if missing|if unclear|insufficient|without/i.test(t);
  const hasContext = t.length > 75;

  const checks = [
    { label: "Explicit System Persona & Domain Authority", ok: hasRole },
    { label: "Deterministic Output Schema (JSON / Matrix / Spec)", ok: hasFormat },
    { label: "Negative Constraints & Abstention Fallback", ok: hasConstraint },
    { label: "Sufficient Context Density (> 75 chars)", ok: hasContext },
  ];

  const passed = checks.filter((c) => c.ok).length;
  const score = Math.min(100, Math.round((passed / 4) * 85 + Math.min(15, t.length / 12)));

  let reply = "";
  if (score < 45) {
    reply =
      "[DIAGNOSTIC: UNCONSTRAINED SPECIFICATION]\nModel output exhibits high entropy and hallucination risk due to missing schema boundaries and abstention rules. Define an explicit persona, output contract, and negative constraints.";
  } else if (score < 80) {
    reply =
      "[DIAGNOSTIC: PARTIAL SPECIFICATION]\n• Structural guidance detected\n• Missing explicit abstention fallback for out-of-distribution inputs\nRecommendation: Add a strict deterministic fallback clause to reach production readiness.";
  } else {
    reply =
      '{\n  "specification_status": "PRODUCTION_VALIDATED",\n  "determinism_index": 0.97,\n  "telemetry": "System persona, output schema, context density, and negative constraints verified."\n}';
  }

  return { score, checks, reply };
}

export function InteractiveLabs() {
  const [tab, setTab] = useState<"prompt" | "tokens" | "agent">("prompt");
  const [promptText, setPromptText] = useState(PRESETS[0].upgraded);
  const [temp, setTemp] = useState(0.2);

  // Token lab state
  const [sampleText, setSampleText] = useState(
    "Production LLM architectures require strict token budgeting, semantic caching, and deterministic schema validation.",
  );
  const [callsPerDay, setCallsPerDay] = useState(5000);

  // Agent simulator state
  const [agentGoal, setAgentGoal] = useState("Inspect deployment #4021 telemetry and execute canary rollback if p99 > 400ms");
  const [agentStep, setAgentStep] = useState(0);

  const { score, checks, reply } = scorePrompt(promptText);

  // Tokenize approximation for visual token pills
  const tokens = sampleText
    .split(/(\s+|[.,!?;:"'()[\]{}-])/)
    .filter((x) => x.length > 0);
  const estTokens = Math.max(1, Math.ceil(sampleText.length / 3.8));
  const dailyCostSmall = ((estTokens * callsPerDay * 0.15) / 1_000_000).toFixed(4);
  const dailyCostBig = ((estTokens * callsPerDay * 3.5) / 1_000_000).toFixed(4);

  const agentTrace = [
    { tag: "01 PLAN", text: `Objective parsed: "${agentGoal}". Querying observability metrics for deployment #4021.` },
    { tag: "02 TOOL_CALL", text: `query_telemetry({ "deployment_id": "4021", "window": "5m" })` },
    { tag: "03 OBSERVE", text: `{ "status": "DEGRADED", "p99_latency_ms": 612, "error_rate": 0.042 }` },
    { tag: "04 COMMIT", text: `"Threshold exceeded (612ms > 400ms). Executed automated traffic shift to stable revision #4020."` },
  ];

  return (
    <div className="arcade-box glass-3d">
      <div className="arcade-header">
        <div>
          <span className="pill neon-pill">SYSTEMS TELEMETRY & SIMULATION</span>
          <h2 className="h2" style={{ margin: "6px 0 4px" }}>Interactive Systems & Economics Workbench</h2>
          <p className="muted" style={{ margin: 0 }}>
            Evaluate prompt specifications for structural determinism, model BPE token economics at scale, and inspect ReAct execution traces.
          </p>
        </div>
        <div className="tabs">
          <button
            type="button"
            className={tab === "prompt" ? "tab active" : "tab"}
            onClick={() => setTab("prompt")}
          >
            01 · Prompt Specification Bench
          </button>
          <button
            type="button"
            className={tab === "tokens" ? "tab active" : "tab"}
            onClick={() => setTab("tokens")}
          >
            02 · Token & Unit Economics
          </button>
          <button
            type="button"
            className={tab === "agent" ? "tab active" : "tab"}
            onClick={() => setTab("agent")}
          >
            03 · ReAct Execution Trace
          </button>
        </div>
      </div>

      {tab === "prompt" && (
        <div className="lab-grid">
          <div>
            <div className="preset-row">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  className="chip-btn"
                  onClick={() => {
                    setPromptText(p.upgraded);
                    awardBonusXp(25, "lab");
                  }}
                >
                  Template: {p.name}
                </button>
              ))}
            </div>
            <textarea
              className="cyber-textarea"
              rows={5}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Enter system prompt specification..."
            />
            <div className="slider-row">
              <label>
                Sampling Temperature: <strong>{temp.toFixed(1)}</strong>{" "}
                <span className="muted">
                  ({temp <= 0.3 ? "Deterministic / Greedy Decoding" : temp <= 0.7 ? "Balanced Nucleus Sampling" : "High-Entropy / Exploratory"})
                </span>
              </label>
              <input
                type="range"
                min={0}
                max={1.2}
                step={0.1}
                value={temp}
                onChange={(e) => setTemp(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="lab-output">
            <div className="score-meter">
              <div>
                <span className="muted">Specification Rigor Index</span>
                <div className="score-num">{score}/100</div>
              </div>
              <button
                type="button"
                className="btn primary small"
                onClick={() => awardBonusXp(35, "lab")}
              >
                Validate Specification (+35 CR)
              </button>
            </div>
            <ul className="check-pills">
              {checks.map((c) => (
                <li key={c.label} className={c.ok ? "ok" : "miss"}>
                  {c.ok ? "[PASS]" : "[MISS]"} {c.label}
                </li>
              ))}
            </ul>
            <pre className="sim-terminal">{reply}</pre>
          </div>
        </div>
      )}

      {tab === "tokens" && (
        <div className="lab-grid">
          <div>
            <label className="muted">Input payload to inspect subword tokenization and daily inference expenditure:</label>
            <textarea
              className="cyber-textarea"
              rows={4}
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
            />
            <div className="slider-row">
              <label>
                Daily Production Volume (Requests / Day): <strong>{callsPerDay.toLocaleString()}</strong>
              </label>
              <input
                type="range"
                min={100}
                max={50000}
                step={100}
                value={callsPerDay}
                onChange={(e) => setCallsPerDay(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="lab-output">
            <div className="token-cloud">
              {tokens.map((tok, i) => (
                <span key={i} className={`tok tok-${i % 5}`}>
                  {tok === " " ? "␣" : tok}
                </span>
              ))}
            </div>
            <div className="stats-mini">
              <div>
                <strong>~{estTokens}</strong>
                <span>Subword Tokens</span>
              </div>
              <div>
                <strong>${dailyCostSmall}/day</strong>
                <span>SLM Tier ($0.15/1M)</span>
              </div>
              <div>
                <strong>${dailyCostBig}/day</strong>
                <span>Frontier Tier ($3.50/1M)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "agent" && (
        <div className="lab-grid">
          <div>
            <label className="muted">Define autonomous runtime objective:</label>
            <input
              type="text"
              className="cyber-input"
              value={agentGoal}
              onChange={(e) => {
                setAgentGoal(e.target.value);
                setAgentStep(0);
              }}
            />
            <div className="cta" style={{ justifyContent: "flex-start", marginTop: 14 }}>
              <button
                type="button"
                className="btn primary small"
                onClick={() => {
                  const next = (agentStep + 1) % (agentTrace.length + 1);
                  setAgentStep(next === 0 ? 1 : next);
                  awardBonusXp(20, "lab");
                }}
              >
                {agentStep < agentTrace.length ? "Advance Execution State → (+20 CR)" : "Reset Execution Trace ↻"}
              </button>
            </div>
          </div>
          <div className="lab-output">
            <div className="agent-steps">
              {agentTrace.map((st, idx) => (
                <div
                  key={st.tag}
                  className={`agent-step-row ${idx < agentStep ? "active" : ""}`}
                >
                  <span className="badge neon">{st.tag}</span>
                  <code>{st.text}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
