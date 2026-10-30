import type { Roadmap } from "../../types";
import { S } from "../shared";

export const aiEngineer: Roadmap = {
  slug: "ai-engineer",
  title: "AI Engineer",
  emoji: "🛠️",
  description:
    "Design, integrate, and operate production applications powered by foundation models—covering model APIs, local inference, structured prompting, vector databases, hybrid RAG, MCP agents, multimodal pipelines, guardrails, and LLM observability.",
  audience:
    "Full-stack, backend, and software engineers building production AI features and systems on top of pre-trained foundation models.",
  tools: [
    "Python & TypeScript",
    "OpenAI Responses API & Anthropic Claude SDK",
    "OpenRouter / Ollama / vLLM",
    "Pydantic & Instructor",
    "PostgreSQL + pgvector / Qdrant / Pinecone",
    "Model Context Protocol (MCP) & LangGraph",
    "Langfuse / LangSmith / Promptfoo",
  ],
  outcomes: [
    "Select between closed frontier models and open-weight models using empirical latency, cost, and task evaluations.",
    "Architect hybrid RAG pipelines with structure-aware chunking, vector databases, BM25 lexical search, and cross-encoder reranking.",
    "Build tool-using AI agents with Model Context Protocol (MCP), multimodal inputs, layered guardrails, and full production tracing.",
  ],
  sections: [
    {
      id: "intro-foundations",
      title: "1. Role Foundations & Engineering Prerequisites",
      topics: [
        {
          id: "ai-vs-ml-engineer",
          title: "AI Engineer vs ML Engineer: Role & Architecture",
          minutes: 7,
          summary: "How AI engineering shifts focus from training models from scratch to adapting, orchestrating, and shipping foundation models.",
          body: [
            "Traditional Machine Learning Engineers focus on data collection, feature engineering, and training predictive or deep learning models from scratch in PyTorch or scikit-learn. AI Engineers work primarily on top of pre-trained foundation models (LLMs, vision-language models, audio models, and embedding models) to build reliable software products.",
            "Because foundation models are non-deterministic, high-latency, and billed per token, AI Engineering introduces a distinct systems discipline: context engineering, evaluation-driven development (EDD), hybrid retrieval (RAG), tool execution via Model Context Protocol (MCP), semantic caching, and layered security guardrails.",
          ],
          points: [
            "ML Engineers train models from data; AI Engineers adapt and orchestrate pre-trained foundation models into products.",
            "AI Engineering treats prompts, context windows, retrieval indexes, and eval suites as versioned software artifacts.",
            "Production success depends on bounding non-determinism, latency (TTFT), and token unit economics.",
          ],
        },
        S.pythonEssentials,
        S.apisHttp,
        S.gitGithub,
        S.sqlBasics,
      ],
    },
    {
      id: "pretrained-models",
      title: "2. Pre-trained Foundation Models & Core LLM Mechanics",
      topics: [
        S.transformersLlms,
        {
          id: "choosing-a-model",
          title: "Closed Frontier vs Open-Weight Models",
          minutes: 8,
          summary: "Compare OpenAI GPT/o-series, Anthropic Claude, Google Gemini, Meta Llama, DeepSeek, Qwen, and Mistral.",
          body: [
            "Foundation models divide into two deployment paradigms: hosted proprietary APIs (OpenAI GPT-4o/o3, Anthropic Claude 3.7 Sonnet/Opus, Google Gemini 2.5 Pro) and open-weight models (Meta Llama, DeepSeek-R1/V3, Alibaba Qwen, Mistral, Google Gemma) that you can self-host or run on dedicated cloud GPUs.",
            "Also distinguish standard autoregressive chat models from reasoning/thinking models (such as o3, Claude Extended Thinking, DeepSeek-R1), which spend extra test-time compute generating internal reasoning chains before emitting an answer. Evaluate candidates on your own golden dataset across accuracy, Time-to-First-Token (TTFT), tokens per second, context window length, data privacy terms, and cost per million tokens.",
          ],
          points: [
            "Start with frontier hosted APIs to validate product value; route to small or open-weight models to optimize cost and privacy.",
            "Use reasoning models for complex multi-step planning, math, and code analysis; use fast standard models for low-latency chat and routing.",
            "Abstract model calls behind a unified gateway interface so switching providers requires zero application code rewrites.",
          ],
        },
        {
          id: "model-sdks-local-inference",
          title: "Model Provider SDKs, Gateways & Local Inference",
          minutes: 8,
          summary: "Work with OpenAI Responses API, Anthropic Messages API, OpenRouter, Hugging Face, Ollama, and vLLM.",
          body: [
            "Modern AI applications communicate with models via official provider SDKs (OpenAI SDK, Anthropic SDK, Google GenAI SDK) using server-sent event (SSE) token streaming, prompt caching headers, and native tool/schema definitions. Multi-provider routers such as OpenRouter, LiteLLM, or Cloudflare AI Gateway provide automatic fallbacks when a primary provider hits rate limits (HTTP 429) or outages.",
            "For local development, privacy-sensitive workloads, or edge execution, run open-weight GGUF/safetensors models locally using Ollama, llama.cpp, LM Studio, or in the browser via Transformers.js (WebGPU), and deploy in production with vLLM or SGLang.",
          ],
          points: [
            "Stream tokens via Server-Sent Events (SSE) so users see immediate progress despite multi-second generation times.",
            "Use LiteLLM or an AI Gateway to unify OpenAI, Anthropic, and local vLLM/Ollama endpoints behind one schema.",
            "Leverage provider prompt caching for static system instructions and few-shot examples to cut input token costs by up to 90%.",
          ],
          example: {
            title: "Streaming a response with automatic provider fallback",
            language: "python",
            code: `from openai import AsyncOpenAI

client = AsyncOpenAI()  # Or point base_url to OpenRouter / local vLLM / Ollama

async def stream_answer(prompt: str):
    stream = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
        stream=True,
    )
    async for chunk in stream:
        if delta := chunk.choices[0].delta.content:
            print(delta, end="", flush=True)`,
          },
        },
        {
          id: "prompt-rag-or-finetune",
          title: "The Adaptation Ladder: Prompting vs RAG vs Fine-Tuning",
          minutes: 7,
          summary: "Choose the lowest-complexity intervention that solves your quality, knowledge, or latency gap.",
          body: [
            "Always climb the adaptation ladder in strict order of engineering cost. Step 1 is Context & Prompt Engineering: clear system instructions, XML delimiters, and 3–5 few-shot examples. Step 2 is Retrieval-Augmented Generation (RAG): whenever the model needs fresh, private, or citeable facts that change over time.",
            "Step 3 is Fine-Tuning (SFT/LoRA/Distillation): reserve weight updates for teaching a smaller, cheaper model a specialized output format, domain tone, or classification skill distilled from a frontier model. Never fine-tune to inject rapidly changing facts.",
          ],
          points: [
            "Prompt engineering + few-shot examples solve 70% of initial formatting and reasoning failures.",
            "Use RAG for dynamic facts, access-controlled enterprise documents, and citation provenance.",
            "Use fine-tuning to distill a large frontier model into a fast, cheap 7B–8B model for narrow, high-volume tasks.",
          ],
        },
      ],
    },
    {
      id: "prompting-structured",
      title: "3. Prompt Engineering, Context Engineering & Structured Outputs",
      topics: [
        S.promptDesign,
        {
          id: "sampling-and-reasoning",
          title: "Sampling Parameters, Chain-of-Thought & Context Engineering",
          minutes: 7,
          summary: "Control decoding via Temperature, Top-P, stop sequences, XML structuring, and deliberate reasoning.",
          body: [
            "At each decoding step, the model outputs raw logits over its vocabulary. Temperature scales those logits before the softmax function: `temperature=0` makes decoding greedy and deterministic (ideal for classification, extraction, and code), while higher temperatures flatten the distribution for creative variation. `top_p` (nucleus sampling) truncates the long tail of unlikely tokens.",
            "Context engineering structures the entire payload inside the context window—separating trusted system instructions from untrusted user data with XML tags (`<context>`, `<document>`, `<instructions>`), placing critical rules at the very beginning and end of long prompts to avoid 'lost-in-the-middle' attention decay, and prompting Chain-of-Thought (CoT) reasoning before final decisions.",
          ],
          points: [
            "Tune either Temperature or Top-P, never both simultaneously; set Temperature = 0.0–0.2 for analytical and JSON tasks.",
            "Use XML tags or Markdown headers to cleanly separate instructions, retrieved documents, and user queries.",
            "Place key constraints at the top and bottom of long context windows to counter middle-context attention degradation.",
          ],
        },
        S.structuredOutput,
      ],
    },
    {
      id: "embeddings-vector-dbs",
      title: "4. Embeddings, Chunking & Vector Databases",
      topics: [
        S.embeddingsSearch,
        {
          id: "vector-databases-indexing",
          title: "Vector Databases, HNSW Indexing & Chunking Strategies",
          minutes: 9,
          summary: "Compare pgvector, Qdrant, Pinecone, Weaviate, Chroma, and Milvus; master HNSW, IVF, and semantic chunking.",
          body: [
            "Vector databases store high-dimensional embeddings (e.g., 768 to 3072 dimensions from OpenAI `text-embedding-3-large`, Cohere Embed v3, or BGE-M3) and execute Approximate Nearest Neighbor (ANN) searches in milliseconds. Hierarchical Navigable Small World (HNSW) graphs offer fast recall at higher RAM cost, while Inverted File (IVF) and scalar/binary quantization compress memory footprints by 4x–32x.",
            "Before embedding, documents must be split into chunks. Naive character splitting breaks tables and code blocks mid-sentence. Production pipelines use structure-aware chunking (splitting by Markdown/HTML headings, AST nodes for code, or layout blocks for PDFs), attach rich metadata (tenant_id, created_at, acl_roles), and prepend document-level context summaries to each chunk.",
          ],
          points: [
            "Start with PostgreSQL + `pgvector` if you already run Postgres (<10M vectors); adopt Qdrant, Pinecone, Weaviate, or Milvus for high-scale dedicated vector workloads.",
            "Chunk by document structure (headings, paragraphs, tables) with 10–15% token overlap rather than arbitrary character counts.",
            "Always index metadata fields alongside vectors so queries pre-filter by tenant, date, and user permissions.",
          ],
          example: {
            title: "Hybrid vector + metadata filtered search in pgvector",
            language: "sql",
            code: `SELECT chunk_id, doc_title, content,
       1 - (embedding <=> $1::vector) AS cosine_similarity
FROM document_chunks
WHERE tenant_id = $2
  AND access_role = ANY($3)
ORDER BY embedding <=> $1::vector
LIMIT 10;`,
          },
        },
      ],
    },
    {
      id: "rag-systems",
      title: "5. Retrieval-Augmented Generation (RAG) & Hybrid Search",
      topics: [
        S.rag,
        {
          id: "advanced-hybrid-rag",
          title: "Hybrid Search (BM25 + Vectors), Reranking & Query Transformation",
          minutes: 9,
          summary: "Combine dense semantic search with lexical BM25, Reciprocal Rank Fusion (RRF), and Cross-Encoder Rerankers.",
          body: [
            "Dense vector embeddings excel at conceptual similarity ('how to reset credentials') but frequently fail on exact part numbers, error codes, SKUs, and proper nouns ('Error 0x80070005'). Production RAG runs Dense Vector Search and Sparse Lexical Search (BM25 / Postgres `tsvector` / SPLADE) in parallel, merging the candidate lists via Reciprocal Rank Fusion (RRF).",
            "Next, pass the top 25–50 fused candidates into a Cross-Encoder Reranker (Cohere Rerank, BGE-Reranker, or FlashRank) which jointly attends to the query and each passage to select the top 5 most relevant chunks. Combine this with query rewriting (expanding ambiguous follow-up questions in multi-turn chat) and strict inline citation enforcement.",
          ],
          points: [
            "Combine dense embeddings with BM25 keyword search using Reciprocal Rank Fusion (RRF).",
            "Add a Cross-Encoder Reranker (top 30 -> top 5) for the highest single-step jump in retrieval precision.",
            "Decide deliberately between direct SDK orchestration (maximum control, zero bloat) and frameworks like LlamaIndex, LangChain, or Haystack.",
          ],
          example: {
            title: "Reciprocal Rank Fusion (RRF) in Python",
            language: "python",
            code: `def reciprocal_rank_fusion(ranked_lists: list[list[str]], k: int = 60) -> list[tuple[str, float]]:
    scores: dict[str, float] = {}
    for doc_list in ranked_lists:
        for rank, doc_id in enumerate(doc_list, start=1):
            scores[doc_id] = scores.get(doc_id, 0.0) + 1.0 / (k + rank)
    return sorted(scores.items(), key=lambda item: item[1], reverse=True)`,
          },
        },
      ],
    },
    {
      id: "agents-mcp",
      title: "6. AI Agents, Tool Calling & Model Context Protocol (MCP)",
      topics: [
        S.toolUse,
        S.agentLoop,
        {
          id: "mcp-and-multi-agent",
          title: "Model Context Protocol (MCP), Memory & Agent Orchestration",
          minutes: 8,
          summary: "Standardize tool and data integrations with MCP Hosts, Clients, and Servers; manage agent state and handoffs.",
          body: [
            "The Model Context Protocol (MCP) is the open standard for connecting AI models to external tools, databases, and repositories. An MCP Server exposes typed Resources (data), Tools (executable functions), and Prompts over stdio or HTTP/SSE, while an MCP Host/Client discovers and invokes them without bespoke glue code per model provider.",
            "When building stateful or multi-agent systems (using LangGraph, OpenAI Agents SDK, Anthropic Claude SDK, CrewAI, or Google ADK), separate short-term working memory (message history inside the context window) from long-term episodic/semantic memory stored in a database, and enforce explicit step budgets and human-in-the-loop approval gates.",
          ],
          points: [
            "Use Model Context Protocol (MCP) to expose internal APIs and data sources once for any MCP-compatible agent or IDE.",
            "Prefer deterministic state graphs (LangGraph / workflow state machines) over unconstrained multi-agent chat loops.",
            "Gate destructive or external write tools behind explicit human confirmation and scoped OAuth tokens.",
          ],
        },
      ],
    },
    {
      id: "multimodal",
      title: "7. Multimodal AI Engineering (Vision, Audio & Speech)",
      topics: [
        {
          id: "multimodal-engineering",
          title: "Vision-Language Models, Document AI & Real-Time Voice Pipelines",
          minutes: 8,
          summary: "Build applications that process images, complex PDFs, charts, speech-to-text (ASR), and low-latency voice.",
          body: [
            "Modern frontier models natively ingest images, PDFs, audio, and video alongside text. Instead of brittle OCR pipelines that lose table structure and chart layouts, Vision-Language Models (VLMs) like GPT-4o, Claude 3.7 Sonnet, Gemini 2.5, and Qwen2.5-VL inspect page images directly to extract structured JSON from invoices, schematics, and financial tables.",
            "For voice agents, engineers choose between cascaded pipelines—Voice Activity Detection (VAD) → Streaming Speech-to-Text (Whisper / Deepgram) → LLM → Streaming Text-to-Speech (ElevenLabs / Cartesia)—for inspectability and tool control, or native Speech-to-Speech WebRTC models (OpenAI Realtime API, Gemini Live) for sub-500ms conversational latency.",
          ],
          points: [
            "Use Vision-Language Models (VLMs) on rendered page images when documents contain complex tables, charts, or diagrams.",
            "Account for image tile token pricing—resize images to the minimum resolution needed for legibility.",
            "Choose cascaded STT→LLM→TTS pipelines when auditability and strict guardrails matter; choose native Speech-to-Speech for ultra-low latency.",
          ],
        },
      ],
    },
    {
      id: "safety-evals-observability",
      title: "8. Evaluation, Guardrails, Observability & Production Ops",
      topics: [
        S.llmEvaluation,
        S.guardrailsSecurity,
        {
          id: "ai-app-architecture",
          title: "Production AI Gateway, Semantic Caching & Observability",
          minutes: 8,
          summary: "Trace multi-step LLM calls with Langfuse, LangSmith, Arize Phoenix, and Helicone; optimize cost and latency.",
          body: [
            "A production AI architecture separates the client UI, API gateway, orchestration service, model router, and async worker queues. Every LLM request emits an OpenTelemetry trace (captured in Langfuse, LangSmith, or Arize Phoenix) recording the exact prompt template version, retrieved chunk IDs, tool arguments, token counts, latency breakdown (TTFT vs total time), and cost in USD.",
            "Pair observability with automated CI evaluation gates (Promptfoo, Braintrust, Ragas) so no prompt or model upgrade deploys if accuracy or faithfulness regresses on your golden test dataset.",
          ],
          points: [
            "Instrument every LLM and tool call with distributed tracing (Langfuse, LangSmith, OpenLLMetry).",
            "Track Time-to-First-Token (TTFT), p95 end-to-end latency, cost per completed user task, and user thumbs-up/edit rates.",
            "Run automated deterministic + LLM-as-a-Judge evaluations in CI/CD before merging prompt or model changes.",
          ],
        },
        S.costLatency,
        S.docker,
        S.cicd,
      ],
    },
  ],
};

