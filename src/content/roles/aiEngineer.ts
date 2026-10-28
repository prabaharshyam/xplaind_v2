import type { Roadmap } from "../../types";
import { S } from "../shared";

export const aiEngineer: Roadmap = {
  slug: "ai-engineer",
  title: "AI Engineer",
  emoji: "🛠️",
  description:
    "Build and ship products powered by AI models: from calling a model API to a monitored, secure, cost-aware production system.",
  audience:
    "Software developers who want to add AI features to real products, without needing a research background.",
  tools: ["Python", "TypeScript", "FastAPI", "Model provider APIs", "PostgreSQL + pgvector", "Docker", "GitHub Actions"],
  outcomes: [
    "Call and compare model APIs, and choose a model with evidence.",
    "Build a RAG or tool-using feature with validated, structured output.",
    "Evaluate, secure, deploy and monitor an AI service.",
  ],
  sections: [
    {
      id: "foundations",
      title: "Engineering foundations",
      topics: [S.pythonEssentials, S.gitGithub, S.apisHttp, S.sqlBasics, S.mlFundamentals],
    },
    {
      id: "models",
      title: "Working with models",
      topics: [
        S.transformersLlms,
        {
          id: "choosing-a-model",
          title: "Choosing a model",
          minutes: 6,
          summary: "Compare models on quality, cost, speed, context and licence.",
          body: [
            "There is no single best model. Compare candidates on your own task using your own test set, and weigh quality against price per token, latency, context window size, supported features (tool use, vision, structured output), data-handling terms and licence. Open-weight models can run in your own environment; hosted models are easier to start with.",
            "Hide the provider behind a thin interface in your code, so switching models is a configuration change. Models are updated and retired regularly, so pin versions where possible and re-run your evaluations before each upgrade.",
          ],
          points: [
            "Decide with your own evaluation set, not leaderboards alone.",
            "Weigh quality, cost, latency, context and data terms.",
            "Wrap providers behind an interface and pin model versions.",
          ],
        },
        S.promptDesign,
        S.structuredOutput,
        {
          id: "prompt-rag-or-finetune",
          title: "Prompting, RAG or fine-tuning?",
          minutes: 6,
          summary: "Pick the cheapest technique that solves the problem.",
          body: [
            "Work up the ladder. First improve the prompt and examples. If the model lacks knowledge, add retrieval (RAG). If it must follow a consistent style, format or narrow skill that prompting cannot achieve, consider fine-tuning. Each step costs more time and maintenance.",
            "Fine-tuning teaches behaviour, not facts that change. For fast-changing knowledge use retrieval. Always measure on an evaluation set before and after, so you know the extra complexity paid for itself.",
          ],
          points: [
            "Prompt first, then retrieval, then fine-tuning.",
            "Retrieval for facts; fine-tuning for style and narrow skills.",
            "Measure before and after each step.",
          ],
        },
      ],
    },
    {
      id: "building",
      title: "Building AI features",
      topics: [
        S.embeddingsSearch,
        S.rag,
        S.toolUse,
        {
          id: "ai-app-architecture",
          title: "Architecture of an AI application",
          minutes: 8,
          summary: "The parts of a production AI app and how they connect.",
          body: [
            "A typical AI application has a front end (often streaming text as it arrives), an API layer for authentication and validation, an orchestration layer that builds prompts and calls tools, a model gateway that talks to providers, and data stores for documents, vectors, sessions and logs. Long jobs run in a queue and report progress.",
            "Keep the model gateway separate so you can add retries, fallbacks, caching, rate limits and cost tracking in one place. Store conversation state on the server, keep prompts in version control, and design every step to fail gracefully with a clear message to the user.",
          ],
          points: [
            "Separate front end, API, orchestration, gateway and data.",
            "Centralise retries, fallbacks, caching and cost tracking.",
            "Stream responses and design for graceful failure.",
          ],
        },
        S.agentLoop,
      ],
    },
    {
      id: "quality",
      title: "Quality, safety and cost",
      topics: [S.llmEvaluation, S.guardrailsSecurity, S.costLatency, S.responsibleAi],
    },
    {
      id: "shipping",
      title: "Shipping and growing",
      topics: [
        S.docker,
        S.cicd,
        S.monitoring,
        {
          id: "portfolio-and-interviews",
          title: "Portfolio projects and interviews",
          minutes: 6,
          summary: "Show working, evaluated systems rather than demos.",
          body: [
            "Build three small projects end to end: a document question-answering app with citations, a tool-using assistant that completes a real task, and a classifier or extractor with a measured accuracy. For each, publish the code, a short write-up, the evaluation set and the lessons learned.",
            "In interviews, explain trade-offs: why this model, how you tested it, what failed, what it costs and how you would monitor it. Evidence of measurement and honest failure analysis stands out more than a polished demo.",
          ],
          points: [
            "Three finished projects beat ten unfinished ones.",
            "Publish evaluation results and failure analysis.",
            "Practise explaining trade-offs, cost and monitoring.",
          ],
        },
      ],
    },
  ],
};
