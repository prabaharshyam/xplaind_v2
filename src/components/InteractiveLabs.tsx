import { useState } from "react";
import { awardBonusXp } from "../gamification";

const PRESETS = [
  {
    name: "Weak Prompt vs Pro Prompt",
    raw: "write something about AI jobs",
    upgraded:
      "Act as a senior AI hiring manager. Compare AI Engineer vs AI Product Manager in a 3-row markdown table (Skills, Day-to-day, First Portfolio Project) for a beginner with zero AI experience.",
  },
  {
    name: "JSON Extractor",
    raw: "get the price from this invoice text",
    upgraded:
      'Extract invoice fields from the text below. Return ONLY valid JSON matching {"vendor": string, "total": number, "currency": "USD"|"EUR"|"INR"}. If a field is missing, set it to null.',
  },
  {
    name: "RAG Grounded Answer",
    raw: "answer customer refund question",
    upgraded:
      "You are a support assistant. Answer the customer's question using ONLY the provided <context>. Cite the section name in brackets. If the answer is not in <context>, reply exactly: 'I need a human teammate to confirm this.'",
  },
];

function scorePrompt(text: string) {
  const t = text.trim();
  if (!t) return { score: 0, checks: [] as { label: string; ok: boolean }[], reply: "" };

  const hasRole = /act as|you are|role:|expert|assistant|manager|engineer/i.test(t);
  const hasFormat = /json|table|bullet|markdown|list|step|format|schema/i.test(t);
  const hasConstraint = /only|do not|never|limit|max|under|exact|if missing|if unclear/i.test(t);
  const hasContext = t.length > 75;

  const checks = [
    { label: "Clear Role / Persona ('You are...')", ok: hasRole },
    { label: "Specific Output Format (JSON, table, bullets)", ok: hasFormat },
    { label: "Guardrail / Constraint ('Use ONLY...', 'Under 100 words')", ok: hasConstraint },
    { label: "Rich Context (> 75 chars of detail)", ok: hasContext },
  ];

  const passed = checks.filter((c) => c.ok).length;
  const score = Math.min(100, Math.round((passed / 4) * 85 + Math.min(15, t.length / 12)));

  let reply = "";
  if (score < 45) {
    reply =
      "⚠️ Simulated Model Output: [Vague & Generic] 'AI is a rapidly growing field with many opportunities. People use AI in business and technology...' — Tip: Add a Role, an Output Format, and Constraints!";
  } else if (score < 80) {
    reply =
      "✨ Simulated Model Output: [Pretty Good!] Here is a structured breakdown based on your prompt:\n• Point 1: Clear actionable insight\n• Point 2: Practical example\n(Add a fallback rule like 'If unsure, say so' to hit 100%!)";
  } else {
    reply =
      '🔥 Simulated Model Output: [Production-Grade!] {\n  "status": "grounded",\n  "confidence": 0.97,\n  "takeaway": "Your prompt has persona, format, context, and guardrails — ready for production API calls!"\n}';
  }

  return { score, checks, reply };
}

export function InteractiveLabs() {
  const [tab, setTab] = useState<"prompt" | "tokens" | "agent">("prompt");
  const [promptText, setPromptText] = useState(PRESETS[0].upgraded);
  const [temp, setTemp] = useState(0.2);

  // Token lab state
  const [sampleText, setSampleText] = useState(
    "XplAIned.in turns 9 AI careers into a gamified skill-tree with interactive labs!",
  );
  const [callsPerDay, setCallsPerDay] = useState(500);

  // Agent simulator state
  const [agentGoal, setAgentGoal] = useState("Find order #4021 status and draft a polite update");
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
    { tag: "🧠 THINK", text: `Goal received: "${agentGoal}". I need to look up order #4021 first.` },
    { tag: "🛠️ TOOL CALL", text: `get_order_status({ "order_id": "4021" })` },
    { tag: "📥 OBSERVE", text: `{ "status": "Out for delivery", "eta": "Today 5:30 PM" }` },
    { tag: "✅ FINAL ANSWER", text: `"Hey! Order #4021 is out for delivery and arrives today by 5:30 PM."` },
  ];

  return (
    <div className="arcade-box glass-3d">
      <div className="arcade-header">
        <div>
          <span className="pill neon-pill">🕹️ INTERACTIVE AI PLAYGROUND</span>
          <h2 className="h2" style={{ margin: "6px 0 4px" }}>Learn by Doing — Live AI Sandbox</h2>
          <p className="muted" style={{ margin: 0 }}>
            Tinker with prompts, watch how tokenizers chop words, and step through an AI Agent loop.
          </p>
        </div>
        <div className="tabs">
          <button
            type="button"
            className={tab === "prompt" ? "tab active" : "tab"}
            onClick={() => setTab("prompt")}
          >
            🧪 Prompt Alchemist
          </button>
          <button
            type="button"
            className={tab === "tokens" ? "tab active" : "tab"}
            onClick={() => setTab("tokens")}
          >
            🔢 Token & Cost X-Ray
          </button>
          <button
            type="button"
            className={tab === "agent" ? "tab active" : "tab"}
            onClick={() => setTab("agent")}
          >
            🤖 Agent Loop Stepper
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
                  Load: {p.name}
                </button>
              ))}
            </div>
            <textarea
              className="cyber-textarea"
              rows={5}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Write or tweak a prompt here..."
            />
            <div className="slider-row">
              <label>
                Temperature: <strong>{temp.toFixed(1)}</strong>{" "}
                <span className="muted">
                  ({temp <= 0.3 ? "Precise & deterministic" : temp <= 0.7 ? "Balanced" : "Wild & creative"})
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
                <span className="muted">Prompt Power Score</span>
                <div className="score-num">{score}/100</div>
              </div>
              <button
                type="button"
                className="btn primary small"
                onClick={() => awardBonusXp(35, "lab")}
              >
                Run & Claim +35 XP ⚡
              </button>
            </div>
            <ul className="check-pills">
              {checks.map((c) => (
                <li key={c.label} className={c.ok ? "ok" : "miss"}>
                  {c.ok ? "✅" : "⚪"} {c.label}
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
            <label className="muted">Type any sentence to see how an LLM slices it into tokens:</label>
            <textarea
              className="cyber-textarea"
              rows={4}
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
            />
            <div className="slider-row">
              <label>
                API requests per day: <strong>{callsPerDay.toLocaleString()}</strong>
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
                <span>Estimated Tokens</span>
              </div>
              <div>
                <strong>${dailyCostSmall}/day</strong>
                <span>Small Fast Model</span>
              </div>
              <div>
                <strong>${dailyCostBig}/day</strong>
                <span>Frontier Model</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "agent" && (
        <div className="lab-grid">
          <div>
            <label className="muted">Give the autonomous agent a mission:</label>
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
                {agentStep < agentTrace.length ? "Step Forward in Loop → (+20 XP)" : "Restart Loop ↻"}
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
