import type { Roadmap } from "../../types";
import { S } from "../shared";

export const agenticAiEngineer: Roadmap = {
  slug: "agentic-ai-engineer",
  title: "Agentic AI Engineer / Specialist",
  emoji: "🤖",
  description:
    "Design, build and operate AI agents that plan, use tools, remember context and work reliably and safely with other agents and people.",
  audience:
    "Developers who want to move from single prompts to systems that take multi-step actions.",
  tools: ["Python", "Agent frameworks and SDKs", "Model Context Protocol (MCP)", "Vector stores", "Tracing and evaluation tools", "Sandboxes"],
  outcomes: [
    "Choose between fixed workflows and autonomous agents.",
    "Build agents with well-designed tools, memory and guardrails.",
    "Evaluate, trace and operate agents in production.",
  ],
  sections: [
    {
      id: "foundations",
      title: "Foundations",
      topics: [S.pythonEssentials, S.apisHttp, S.transformersLlms, S.promptDesign, S.structuredOutput],
    },
    {
      id: "core",
      title: "Agent building blocks",
      topics: [
        S.toolUse,
        S.agentLoop,
        {
          id: "planning-reasoning",
          title: "Planning and reasoning patterns",
          minutes: 7,
          summary: "ReAct, plan-and-execute, reflection and when each helps.",
          body: [
            "ReAct alternates reasoning and acting: the model thinks, calls a tool, reads the result and thinks again. Plan-and-execute writes a plan first, then runs the steps, revising if needed. Reflection has the model critique its own draft or a verifier check it before finishing. Reasoning-focused models may do some of this internally.",
            "More thinking costs more time and tokens and does not always help. Use the simplest pattern that passes your evaluation tasks, and add planning or reflection only where tests show failures it fixes.",
          ],
          points: [
            "ReAct, plan-and-execute and reflection are common patterns.",
            "Extra reasoning adds latency and cost.",
            "Add complexity only when evaluations justify it.",
          ],
        },
        {
          id: "tool-design",
          title: "Designing good tools",
          minutes: 7,
          summary: "Tool quality often decides agent quality.",
          body: [
            "Give tools clear names, precise descriptions and few, well-typed parameters. Return concise, relevant results, not entire database dumps, and helpful error messages that tell the model how to fix a bad call. Prefer a few focused tools over many overlapping ones.",
            "Make tools safe: validate inputs, make them idempotent where possible so retries do not duplicate actions, separate read tools from write tools and log every call. Test tools on their own before attaching a model.",
          ],
          points: [
            "Clear names and descriptions guide tool choice.",
            "Return small results and actionable errors.",
            "Make tools idempotent, validated and logged.",
          ],
        },
        {
          id: "agent-memory",
          title: "Memory and context management",
          minutes: 7,
          summary: "What the agent should remember, for how long and where.",
          body: [
            "Short-term memory is the conversation and tool results inside the context window. Long-term memory is stored outside the model: user preferences, past task outcomes and documents, retrieved when relevant. Summarise or trim old steps so the context does not overflow or distract the model.",
            "Decide what to store, who can read it and when to forget. Stored memories can be wrong, outdated or personal data, and malicious text can be saved as a 'memory' and reused later. Apply privacy rules and let users view and delete memory.",
          ],
          points: [
            "Short-term lives in the context window; long-term in storage.",
            "Summarise and trim to keep context focused.",
            "Treat memory as sensitive and potentially poisoned data.",
          ],
        },
        S.embeddingsSearch,
        S.rag,
      ],
    },
    {
      id: "architectures",
      title: "Architectures and ecosystem",
      topics: [
        {
          id: "workflows-vs-agents",
          title: "Workflows versus agents",
          minutes: 6,
          summary: "Use autonomy only where flexibility is really needed.",
          body: [
            "A workflow follows steps you define, with model calls at certain points: prompt chaining, routing, parallel checks and evaluator loops. An agent chooses its own steps. Workflows are cheaper, faster and easier to test; agents handle open-ended tasks where steps cannot be known in advance.",
            "Start with a workflow. Give an agent autonomy only for the parts that need it, and wrap it with limits, checks and review. Many successful 'agents' are workflows with one flexible step.",
          ],
          points: [
            "Workflows are predictable; agents are flexible.",
            "Start with the simplest workable design.",
            "Constrain autonomy with limits and checks.",
          ],
        },
        {
          id: "multi-agent",
          title: "Multi-agent systems",
          minutes: 7,
          summary: "Orchestrators, specialists, handoffs and their costs.",
          body: [
            "In an orchestrator-worker design, one agent splits a task and delegates to specialists, then combines the results. Other patterns include handoffs between agents, parallel research agents and a reviewer agent. Splitting can keep contexts small and prompts focused.",
            "More agents mean more cost, latency and ways to fail, such as miscommunication and loops. Give each agent a clear role, a narrow toolset and a defined output format, and compare against a single agent on your evaluation tasks before adopting the extra complexity.",
          ],
          points: [
            "Common patterns: orchestrator-worker, handoff, reviewer.",
            "Each extra agent adds cost and failure modes.",
            "Prove the benefit against a single-agent baseline.",
          ],
        },
        {
          id: "agent-frameworks",
          title: "Agent frameworks and SDKs",
          minutes: 6,
          summary: "What frameworks give you and how to choose.",
          body: [
            "Frameworks provide the loop, state handling, tool wiring, tracing and sometimes multi-agent coordination. Graph-based frameworks model an agent as states and transitions, which makes control flow explicit and resumable. Provider SDKs offer a lighter path tied to one vendor.",
            "Pick by need: how much control, how easy to test and trace, how stable the project is and whether you can leave it later. Frameworks change fast, so learn the underlying loop first; then any framework is easy to adopt or replace.",
          ],
          points: [
            "Frameworks handle loop, state, tools and tracing.",
            "Explicit graphs give control and resumability.",
            "Learn the core loop first; frameworks come and go.",
          ],
        },
        {
          id: "mcp",
          title: "Model Context Protocol (MCP)",
          minutes: 7,
          summary: "A standard way to connect models to tools and data.",
          body: [
            "The Model Context Protocol is an open standard for connecting AI applications to tools, data and prompts. An MCP server exposes capabilities; an MCP client inside an app or editor discovers and calls them. This avoids writing a custom integration for every pairing of app and service.",
            "Treat MCP servers like any third-party code: use trusted sources, review permissions, prefer read-only access where possible and watch for malicious tool descriptions or injected instructions in returned data. Build your own server to expose internal systems safely.",
          ],
          points: [
            "MCP standardises how apps discover and call tools and data.",
            "Servers expose capabilities; clients consume them.",
            "Vet servers and limit permissions like any dependency.",
          ],
        },
        {
          id: "computer-use",
          title: "Browser and computer-using agents",
          minutes: 6,
          summary: "Agents that operate interfaces designed for humans.",
          body: [
            "Some agents click, type and read screens or web pages when no API exists. They are flexible but slower, more fragile and more costly than API calls, and layouts change without warning. Prefer an API when one is available.",
            "Run them in sandboxed environments with limited accounts, restrict allowed sites and require approval for purchases, deletions and messages. Web pages can contain hidden instructions, so treat page content as untrusted.",
          ],
          points: [
            "Use UI agents only when no API exists.",
            "Sandbox them with limited accounts and allowed sites.",
            "Web content may contain hidden instructions.",
          ],
        },
      ],
    },
    {
      id: "reliability",
      title: "Reliability and safety",
      topics: [
        {
          id: "agent-evaluation",
          title: "Evaluating agents",
          minutes: 8,
          summary: "Test outcomes and the path the agent took.",
          body: [
            "Create a set of tasks with a clear definition of success and a way to check the final state, such as 'the ticket was updated correctly'. Score task success, but also inspect the trajectory: wrong tool calls, wasted steps, repeated loops and unsafe attempts. Run each task several times because behaviour varies.",
            "Use simulated environments or sandboxes so tests are repeatable and safe. Track success rate, cost and latency together, and add every production failure to the test set.",
          ],
          points: [
            "Check the final state and the full trajectory.",
            "Repeat runs; agent behaviour varies.",
            "Convert production failures into tests.",
          ],
        },
        {
          id: "agent-reliability",
          title: "Reliability engineering for agents",
          minutes: 7,
          summary: "Timeouts, retries, budgets, loop detection and recovery.",
          body: [
            "Agents fail in new ways: endless loops, repeated tool calls, drifting from the goal and compounding small errors. Set step, time and cost budgets, detect repeated identical calls, retry only safe operations and checkpoint state so a run can resume after a crash.",
            "Make actions idempotent, add validation after critical steps and fall back to a person when confidence is low or the budget is exhausted. Reliability usually comes from the surrounding system more than from the model.",
          ],
          points: [
            "Budget steps, time and cost; detect loops.",
            "Checkpoint state and make actions idempotent.",
            "Escalate to a person when stuck or unsure.",
          ],
        },
        {
          id: "agent-safety",
          title: "Permissions, sandboxing and human approval",
          minutes: 7,
          summary: "Limit what an agent can do and who must approve it.",
          body: [
            "Give agents the narrowest permissions possible: read-only by default, scoped credentials, allow-lists of domains and commands, and isolated sandboxes for code execution. Never give an agent a broad admin key. Separate untrusted content from instructions in your prompts.",
            "Require human approval for irreversible or high-impact actions, show exactly what will happen and keep an audit log. Test with prompt-injection attacks that arrive through tools, documents and web pages, since those are the most realistic threat.",
          ],
          points: [
            "Use least privilege, scoped credentials and sandboxes.",
            "Approvals and audit logs for high-impact actions.",
            "Test indirect prompt injection through tool output.",
          ],
        },
        S.guardrailsSecurity,
        S.llmEvaluation,
      ],
    },
    {
      id: "production",
      title: "Production",
      topics: [S.costLatency, S.monitoring, S.docker, S.cicd],
    },
  ],
};
