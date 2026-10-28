import type { Topic } from "../types";

export const llm = {
  transformersLlms: {
    id: "how-llms-work",
    title: "How large language models work",
    minutes: 8,
    summary: "Tokens, context windows and next-token prediction, without the maths.",
    body: [
      "A large language model (LLM) reads text as tokens, small chunks of words, and predicts the next token again and again. A neural network called a transformer uses a mechanism named attention to decide which earlier tokens matter for each prediction. The context window is the maximum number of tokens the model can consider at once.",
      "Models are first pretrained on huge text collections, then tuned to follow instructions and be safe. Sampling settings such as temperature control how random the output is. Remember the limits: models can state falsehoods fluently (hallucination), have a knowledge cutoff and cannot see your private data unless you provide it.",
    ],
    points: [
      "LLMs predict the next token; attention picks relevant context.",
      "The context window limits how much text fits in one request.",
      "Hallucination and a knowledge cutoff are built-in limits to design around.",
    ],
  },
  promptDesign: {
    id: "prompt-design",
    title: "Prompt design",
    minutes: 7,
    summary: "Write instructions that give reliable, testable behaviour.",
    body: [
      "A good prompt states the task, the audience, the constraints and the output format, and supplies the context the model needs. Use a system prompt for stable rules and the user message for the changing request. Show one or two examples when format or tone matters.",
      "Treat prompts like code: keep them in version control, change one thing at a time, and run them against a fixed set of test inputs after every edit. Tell the model what to do when it cannot answer, for example 'say not found', which reduces invented answers.",
    ],
    points: [
      "Specify task, audience, constraints, format and context.",
      "Version prompts and test them on a fixed set of inputs.",
      "Define the behaviour for 'I don't know' cases.",
    ],
    example: {
      title: "A system prompt for a support classifier",
      language: "text",
      code: `You classify customer emails for a telecom company.
Return one label: billing, network, account or other.
Use only the email text. If the email is unclear, return other.
Output JSON: {"label": "...", "reason": "<one short sentence>"}`,
    },
  },
  structuredOutput: {
    id: "structured-output",
    title: "Structured output and validation",
    minutes: 6,
    summary: "Get data, not prose, and verify it before using it.",
    body: [
      "When code consumes a model's answer, ask for a fixed format such as JSON and describe the exact fields. Many APIs offer a mode that enforces a JSON schema, which is more reliable than asking politely. Keep schemas small and fields clearly named.",
      "Still validate every response in code. Check types, required fields and allowed values. On failure, retry once with the error message included, and if it fails again send the item to a person or a safe default instead of crashing or guessing.",
    ],
    points: [
      "Prefer schema-enforced output when the API offers it.",
      "Validate types, required fields and allowed values.",
      "Have a retry and a safe fallback path.",
    ],
    example: {
      title: "Validate a model's JSON reply",
      language: "python",
      code: `import json
from pydantic import BaseModel, ValidationError


class Invoice(BaseModel):
    vendor: str
    total: float
    currency: str


try:
    data = Invoice.model_validate(json.loads(reply))
except (json.JSONDecodeError, ValidationError):
    data = None  # retry with the error, or route to a person`,
    },
  },
  embeddingsSearch: {
    id: "embeddings-vector-search",
    title: "Embeddings and vector search",
    minutes: 7,
    summary: "Find text by meaning instead of exact words.",
    body: [
      "An embedding model turns text into a vector, a list of numbers, so that similar meanings sit close together. Similarity is usually measured with cosine similarity. You embed your documents once, store the vectors, then embed each question and fetch the nearest ones.",
      "Store vectors in a vector database or an extension such as pgvector, and use approximate nearest-neighbour indexes for speed. Hybrid search, which combines keyword matching with vectors, often beats either alone, especially for names, codes and rare terms. Use the same embedding model for documents and queries.",
    ],
    points: [
      "Embeddings place similar meanings near each other.",
      "Combine keyword and vector search for the best recall.",
      "Use one embedding model for both documents and queries.",
    ],
    example: {
      title: "Cosine similarity",
      language: "python",
      code: `import numpy as np


def cosine(a: np.ndarray, b: np.ndarray) -> float:
    return float(a @ b / (np.linalg.norm(a) * np.linalg.norm(b)))`,
    },
  },
  rag: {
    id: "rag",
    title: "Retrieval-augmented generation (RAG)",
    minutes: 8,
    summary: "Answer from your own documents instead of the model's memory.",
    body: [
      "RAG has three stages: prepare (split documents into chunks, embed and index them), retrieve (find the chunks most relevant to the question) and generate (give those chunks to the model and ask it to answer from them). It lets a model use private, current knowledge without retraining.",
      "Quality depends first on retrieval. If the right chunk is not found, no model can answer well. Evaluate retrieval separately from generation, cite sources so users can verify, respect document permissions at query time, and allow the answer 'not found in the documents'.",
    ],
    points: [
      "Prepare, retrieve, generate: three stages to build and test.",
      "Measure retrieval quality on its own.",
      "Enforce access permissions when retrieving, and show sources.",
    ],
    example: {
      title: "The shape of a RAG call",
      language: "python",
      code: `chunks = search(question, top_k=4, user=user)  # respects permissions
context = "\\n\\n".join(c.text for c in chunks)
prompt = (
    "Answer using only the context. If the answer is not there, say so.\\n\\n"
    f"Context:\\n{context}\\n\\nQuestion: {question}"
)
answer = call_model(prompt)`,
    },
  },
  toolUse: {
    id: "tool-use",
    title: "Tool use and function calling",
    minutes: 7,
    summary: "Let a model request actions that your code runs and checks.",
    body: [
      "You describe functions to the model with a name, a description and a JSON schema for the arguments. The model replies with a request to call one, your code runs it, and you return the result so the model can continue. This gives models live data, exact calculation and the ability to act.",
      "The model only proposes calls; your code decides. Validate arguments, check that the user is allowed to do the action, keep tools narrow and return short, clear results and errors. Require human confirmation for actions that change data, spend money or message people.",
    ],
    points: [
      "Good tool names and descriptions make the model choose correctly.",
      "Validate arguments and permissions on every call.",
      "Confirm risky actions with a person.",
    ],
    example: {
      title: "A tool definition",
      language: "json",
      code: `{
  "name": "get_order_status",
  "description": "Look up the status of an order by its id.",
  "parameters": {
    "type": "object",
    "properties": { "order_id": { "type": "string" } },
    "required": ["order_id"]
  }
}`,
    },
  },
  agentLoop: {
    id: "agent-loop",
    title: "The agent loop",
    minutes: 7,
    summary: "A model that decides, acts, observes and repeats until done.",
    body: [
      "An agent is a loop. The model reads the goal and the history, chooses either an answer or a tool call, your code runs the tool, the result goes back into the history, and the loop repeats. It ends when the model gives a final answer or a limit is reached.",
      "Always bound the loop with a maximum number of steps, a time limit and a cost budget. Log every step so you can replay failures. Start with the simplest design that works; many tasks need a fixed workflow with one or two model calls, not a free-running agent.",
    ],
    points: [
      "Decide, act, observe, repeat.",
      "Cap steps, time and cost.",
      "Log every step to debug and replay runs.",
    ],
    example: {
      title: "A minimal agent loop",
      language: "python",
      code: `def run_agent(goal, tools, max_steps=8):
    messages = [{"role": "user", "content": goal}]
    for _ in range(max_steps):
        reply = call_model(messages, tools)
        if not reply.tool_calls:
            return reply.text
        for call in reply.tool_calls:
            result = tools[call.name](**call.args)
            messages.append(
                {"role": "tool", "name": call.name, "content": str(result)}
            )
    return "Stopped: step limit reached"`,
    },
  },
  llmEvaluation: {
    id: "llm-evaluation",
    title: "Evaluating LLM applications",
    minutes: 8,
    summary: "Measure quality with test sets, graders and regression checks.",
    body: [
      "Without an evaluation set you are guessing. Collect real inputs, including hard and rare ones, and write what a good answer looks like. Score with exact checks where possible, rubrics for open-ended answers, a second model as judge for scale, and humans for the final say on a sample.",
      "For RAG, score retrieval (was the right passage found?) and faithfulness (does the answer follow the passages?) separately. Run the evaluation on every prompt or model change, track scores over time and keep failures as new test cases so old bugs never return.",
    ],
    points: [
      "Build a test set from real and hard examples.",
      "Combine exact checks, rubrics, model judges and human review.",
      "Run evaluations on every change and keep failures as new cases.",
    ],
    example: {
      title: "A tiny evaluation loop",
      language: "python",
      code: `cases = load_jsonl("evals/support.jsonl")
passed = 0
for c in cases:
    out = app(c["input"])
    passed += int(c["expected"].lower() in out.lower())
print(f"{passed}/{len(cases)} passed")`,
    },
  },
  guardrailsSecurity: {
    id: "guardrails-security",
    title: "Guardrails and AI security",
    minutes: 8,
    summary: "Defend against prompt injection, data leaks and over-powerful tools.",
    body: [
      "Prompt injection is text that tries to override your instructions. It can come directly from a user or indirectly from a web page, email or document the model reads. Treat all such content as untrusted. Other risks include leaking secrets or personal data, unsafe handling of model output, and giving an agent more permissions than it needs. The OWASP Top 10 for LLM applications is a good checklist.",
      "Defend in layers: keep secrets out of prompts, give tools least privilege, validate and sanitise outputs before use, filter clearly unsafe requests, log actions and rate-limit. No single filter is enough. Test with red-team prompts before launch and again after each major change.",
    ],
    points: [
      "Treat user text and retrieved content as untrusted.",
      "Use least privilege for tools and data.",
      "Layer defences and test with adversarial prompts.",
    ],
  },
  costLatency: {
    id: "cost-latency",
    title: "Cost, latency and caching",
    minutes: 6,
    summary: "Keep AI features fast and affordable at scale.",
    body: [
      "You pay per token, and users wait per token. Measure tokens per request, cost per user action and latency at the 50th and 95th percentiles. Shorter prompts, trimmed history, smaller models for easy tasks and caching of repeated work are the main levers.",
      "Route requests: send simple tasks to a small, cheap model and hard ones to a stronger model. Stream output so people start reading early. Cache embeddings and repeated answers, use provider prompt caching for long shared prefixes, and set budgets and alerts so a bug cannot become a large bill.",
    ],
    points: [
      "Track tokens, cost per action and p95 latency.",
      "Route easy work to small models and cache repeats.",
      "Set budgets and alerts.",
    ],
  },
  responsibleAi: {
    id: "responsible-ai",
    title: "Responsible AI: fairness and transparency",
    minutes: 7,
    summary: "Build systems that are fair, explainable and accountable.",
    body: [
      "Models copy patterns in their data, including unfair ones. Check performance for different groups, not just on average, and ask who could be harmed by errors. Be open about what the system does, its known limits and when a person is talking to AI. Keep a human able to review or override high-stakes decisions.",
      "Responsibility is a process, not a feature. Record the purpose, data sources, tests and known issues in a model card or similar document, name an owner, and plan how people can appeal or report problems. These records also make audits and regulation far easier.",
    ],
    points: [
      "Measure results per group, not only overall.",
      "Be transparent about purpose, limits and AI use.",
      "Document decisions and assign a clear owner.",
    ],
  },
  aiRegulation: {
    id: "ai-regulation",
    title: "AI laws and standards: the landscape",
    minutes: 8,
    summary: "The main rules and frameworks that shape how AI is built and used.",
    body: [
      "The EU AI Act takes a risk-based approach: some uses are banned, high-risk uses face strict requirements, some must be transparent, and most are lightly regulated. The NIST AI Risk Management Framework offers voluntary guidance, and ISO/IEC 42001 is a certifiable standard for an AI management system. Privacy laws such as the EU GDPR and India's Digital Personal Data Protection Act, 2023 apply whenever personal data is used.",
      "Rules differ by country and sector and keep changing, including their timelines. Treat this topic as a map, not legal advice: learn the main ideas, find which laws apply to your product and customers, and check current official sources or ask legal counsel before relying on any detail.",
    ],
    points: [
      "The EU AI Act is risk-based: banned, high-risk, transparency, minimal.",
      "NIST AI RMF and ISO/IEC 42001 are frameworks and standards.",
      "Privacy law applies whenever personal data is involved; verify current rules.",
    ],
  },
  dataPrivacy: {
    id: "data-privacy",
    title: "Data privacy and protection",
    minutes: 7,
    summary: "Handle personal data lawfully in prompts, logs and training sets.",
    body: [
      "Personal data is anything that identifies a person. Laws such as the EU GDPR and India's DPDP Act, 2023 expect a lawful basis or consent, a clear purpose, only the data you need, limited retention, security, and respect for people's rights such as access and erasure. Cross-border transfers and children's data get extra attention.",
      "AI creates new exposure points: personal data in prompts, in logs, in vector stores and in training sets. Remove or mask identifiers before sending data to a model, check the provider's data-use terms, set retention limits on logs, and make sure deletion requests reach every copy, including indexes.",
    ],
    points: [
      "Collect the minimum, for a stated purpose, for a limited time.",
      "Mask personal data before it reaches prompts and logs.",
      "Deletion must cover indexes, logs and backups.",
    ],
  },
  stakeholderComm: {
    id: "stakeholder-communication",
    title: "Communicating with stakeholders",
    minutes: 6,
    summary: "Explain trade-offs and uncertainty to non-technical people.",
    body: [
      "Lead with the decision or outcome, then the reasons. Use plain words, small numbers and one picture or demo instead of jargon. Explain AI results as probabilities and ranges, and say plainly what the system cannot do, so nobody is surprised later.",
      "Set expectations early: what will be ready when, what could slip and why. Write short updates on a regular schedule, record decisions and open risks, and say 'I do not know yet, and here is how I will find out'. Trust grows from clear, honest and regular communication.",
    ],
    points: [
      "Lead with the decision, then the reasoning.",
      "Describe uncertainty and limits explicitly.",
      "Send short, regular written updates.",
    ],
  },
  experimentTracking: {
    id: "experiment-tracking",
    title: "Experiment tracking and reproducibility",
    minutes: 6,
    summary: "Record every run so results can be compared and repeated.",
    body: [
      "Model development means many experiments. Record for each run the code version, data version, parameters, metrics and the resulting model file. Tools such as MLflow or Weights & Biases store this and let you compare runs in a table or chart.",
      "Reproducibility means someone else, or you in six months, can rerun an experiment and get the same result. Fix random seeds, pin library versions, version your data and keep configuration in files, not in your head. Tracked experiments also feed the model registry and audit trail.",
    ],
    points: [
      "Log code version, data version, parameters, metrics and artefacts.",
      "Pin seeds and library versions.",
      "Keep configuration in files under version control.",
    ],
    example: {
      title: "Logging a run with MLflow",
      language: "python",
      code: `import mlflow

with mlflow.start_run():
    mlflow.log_param("max_depth", 6)
    mlflow.log_metric("auc", 0.91)
    mlflow.sklearn.log_model(model, "model")`,
    },
  },
} satisfies Record<string, Topic>;
