import type { Roadmap } from "../../types";
import { S } from "../shared";

export const aiAutomationSpecialist: Roadmap = {
  slug: "ai-automation-specialist",
  title: "AI Automation & Workflow Engineer",
  emoji: "⚙️",
  description:
    "Design, build, and operate production AI workflow automations across enterprise stacks—mastering BPMN process discovery, webhooks/REST APIs, n8n/Make/Temporal orchestration, structured LLM classify/extract/route nodes, Intelligent Document Processing (IDP), RAG/MCP agents, Playwright browser automation, and dead-letter queue reliability.",
  audience:
    "Automation engineers, operations technologists, revops/bizops architects, and full-stack developers who turn repetitive multi-system workflows into reliable AI-powered pipelines.",
  tools: [
    "n8n (Self-Hosted Queue Mode), Make, Zapier & Temporal",
    "Python, TypeScript, SQL & JSON Schema",
    "REST APIs, GraphQL, Webhooks & OAuth2",
    "LLM Structured Outputs (OpenAI / Claude / Gemini)",
    "Intelligent Document Processing (VLM OCR / Document AI)",
    "Model Context Protocol (MCP) & Playwright / RPA",
    "Slack / Teams HITL Approval Flows & Dead-Letter Queues",
  ],
  outcomes: [
    "Audit enterprise processes, draw BPMN swimlane maps, and separate deterministic rule steps from bounded AI steps and human approvals.",
    "Build resilient multi-system workflows in n8n/Make/Python combining signed webhooks, OAuth2, schema-locked LLM extraction, VLM document OCR, and RAG.",
    "Operate automations with idempotency keys, exponential backoff, dead-letter queues (DLQ), PII redaction, and verified financial ROI dashboards.",
  ],
  sections: [
    {
      id: "process-discovery-economics",
      title: "1. Process Discovery, Mapping & Automation Economics",
      topics: [
        {
          id: "what-to-automate",
          title: "Identifying High-ROI Workflows & The Deterministic vs AI Decision Matrix",
          minutes: 7,
          summary: "Score candidate processes on volume, cycle time, exception rate, and error cost—and fix broken workflows before automating.",
          body: [
            "Automating a chaotic, undocumented process simply generates bad data at 100x speed. Before building, audit candidate workflows across four dimensions: **Volume & Frequency** (runs per day × minutes per run), **Input Standardization** (structured API payloads vs messy PDFs/emails), **Exception Rate** (% of edge cases requiring judgment), and **Blast Radius of Error**.",
            "Apply the golden rule of hybrid automation: use **Deterministic Code / Rules** for calculations, database lookups, and compliance checks; use **Bounded LLM Steps** only where unstructured language, vision, or fuzzy classification is required; and use **Human-in-the-Loop (HITL) Gates** for high-dollar or irreversible actions.",
          ],
          points: [
            "Never use an LLM for math, date arithmetic, or exact ID lookups that a 3-line deterministic expression handles with 100% accuracy.",
            "Simplify and standardize the manual process with the operations team before automating it.",
            "Prioritize workflows with high daily volume and low-friction human verification.",
          ],
        },
        {
          id: "process-mapping",
          title: "BPMN Swimlane Process Mapping, Exception Paths & Baseline Auditing",
          minutes: 7,
          summary: "Map triggers, system handoffs, happy paths, and every edge-case exception branch before touching a workflow canvas.",
          body: [
            "Interview the frontline operators who execute the task daily—not just managers—and map the end-to-end flow as a swimlane diagram: **Trigger Event** → **Input Validation** → **Enrichment / Lookup** → **Decision / AI Step** → **Target System Write** → **Notification / Audit Log**.",
            "In production, 80% of engineering effort goes into the 20% exception paths: missing attachments, duplicate submissions, unmapped vendor IDs, locked CRM records, and API timeouts. Record a hard pre-automation baseline (median handling time, cost per item, error/rework rate) so you can prove net ROI after launch.",
          ],
          points: [
            "Document every exception branch (missing fields, multi-page PDFs, unknown sender, API 429) on your process map first.",
            "Tag every node on the map as Deterministic Rule, AI-Assisted, or Human Approval.",
            "Capture baseline cycle time and error rates over 2 weeks prior to launch.",
          ],
        },
      ],
    },
    {
      id: "apis-webhooks-orchestration",
      title: "2. APIs, Webhooks, Auth & Workflow Orchestration Platforms",
      topics: [
        S.apisHttp,
        {
          id: "webhooks-integrations",
          title: "Webhooks, HMAC Signatures, OAuth2 Token Refresh & Idempotency",
          minutes: 8,
          summary: "Build event-driven webhook receivers that verify cryptographic signatures, acknowledge in <2s, and deduplicate deliveries.",
          body: [
            "Polling APIs every minute wastes rate-limit quotas and adds latency; production automations are driven by real-time **Webhooks** (Stripe, Shopify, GitHub, HubSpot, Slack, Zendesk). Because webhook endpoints are public HTTPS URLs, always verify the sender's **HMAC-SHA256 signature header** against your webhook secret and check timestamp replay windows.",
            "Most webhook providers retry delivery if your server takes longer than 3–5 seconds to respond or returns a 5xx status. Always acknowledge the webhook immediately (`202 Accepted`), push the payload onto a durable queue, and deduplicate using the provider's unique `event_id` so retries never run the workflow twice.",
          ],
          points: [
            "Verify HMAC cryptographic signatures on every incoming webhook before parsing or acting on the payload.",
            "Acknowledge webhook delivery immediately and process slow LLM/API steps asynchronously in a worker queue.",
            "Deduplicate incoming events by `event_id` in Redis or PostgreSQL to guarantee exactly-once business execution.",
          ],
          example: {
            title: "Verify HMAC-SHA256 webhook signature & idempotency in Python",
            language: "python",
            code: `import hmac, hashlib

def verify_webhook(raw_body: bytes, signature_header: str, secret: str) -> bool:
    expected = hmac.new(secret.encode(), raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(f"sha256={expected}", signature_header)`,
          },
        },
        {
          id: "no-code-tools",
          title: "Workflow Orchestration: n8n (Queue Mode), Make, Zapier & Modular Sub-Workflows",
          minutes: 8,
          summary: "Architect scalable visual + code workflows using self-hosted n8n with Redis workers, modular sub-workflows, and Git version control.",
          body: [
            "Modern workflow orchestration platforms span quick cloud connectors (**Zapier**, **Make**) to developer-grade, self-hostable engines (**n8n**, **Windmill**, **Pipedream**, **Temporal**). For enterprise data privacy and high volume, deploy **n8n in Queue Mode** backed by PostgreSQL and Redis workers so long-running AI executions scale horizontally across multiple containers.",
            "Avoid 80-node 'spaghetti canvases': decompose complex automations into small, single-responsibility **Sub-Workflows** (e.g., `Ingest-Normalize`, `AI-Classify-Extract`, `CRM-Upsert`, `Error-Alert-Handler`) with typed JSON inputs/outputs and Git-backed workflow JSON versioning.",
          ],
          points: [
            "Decompose large workflows into reusable, testable sub-workflows with strict input/output contracts.",
            "Use Python or TypeScript code nodes inside n8n/Windmill for complex array transformations, regex, and cryptographic checks.",
            "Export workflow definitions to Git and separate staging credentials from production secrets.",
          ],
        },
        S.pythonEssentials,
        S.sqlBasics,
      ],
    },
    {
      id: "adding-ai",
      title: "3. Structured LLM Steps & Intelligent Document Processing (IDP)",
      topics: [
        S.promptDesign,
        S.structuredOutput,
        {
          id: "ai-in-workflows",
          title: "The 4 Core AI Workflow Primitives: Classify, Extract, Summarize & Route",
          minutes: 8,
          summary: "Embed narrow, schema-locked LLM calls inside deterministic pipelines with confidence routing and tiered model selection.",
          body: [
            "Inside an automation pipeline, an LLM should never return conversational prose like 'Sure! Here is the extracted data:'. Every AI node must be a strict function call returning schema-validated JSON across four core primitives: (1) **Classification & Tagging** (assigning intent, urgency, sentiment, or GL accounting codes from a fixed enum); (2) **Structured Entity Extraction** (pulling line items, dates, and counterparties from messy emails/text).",
            "(3) **Contextual Summarization** (condensing 30-email threads into a 4-bullet handoff brief); and (4) **Semantic Routing** (dispatching requests to the right downstream branch). Include an explicit `confidence` or `needs_human_review: boolean` field in your schema so ambiguous inputs route automatically to an exception queue.",
          ],
          points: [
            "Enforce strict JSON Schema (`strict: true`) with enum constraints on every classification and routing node.",
            "Include an explicit `'other_or_uncertain'` enum value so the model is never forced to guess on out-of-distribution inputs.",
            "Use fast, low-cost mini/flash models for high-volume classification and reserve frontier models for complex multi-document reasoning.",
          ],
        },
        {
          id: "document-processing",
          title: "Intelligent Document Processing (IDP): PDFs, VLM OCR & Deterministic Reconciliation",
          minutes: 8,
          summary: "Extract tables and fields from invoices, POs, bills of lading, and medical forms using Vision-Language Models + math verification.",
          body: [
            "Enterprise operations run on documents: PDF invoices, purchase orders, customs declarations, insurance claims, and photographed receipts. Modern **Intelligent Document Processing (IDP)** combines layout-aware OCR (Azure Document Intelligence, AWS Textract, Docling) with **Vision-Language Models (VLMs)** that inspect page images directly to understand complex multi-column tables, checkboxes, and handwritten annotations.",
            "Crucially, never write extracted financial or medical numbers straight into an ERP without **Deterministic Reconciliation Rules**: verify mathematically in code that $\\sum(\\text{Line Item Totals}) + \\text{Tax} + \\text{Shipping} == \\text{Invoice Grand Total}$, validate that the Vendor Tax ID exists in the master vendor table, and flag discrepancies for human review.",
          ],
          points: [
            "Combine Vision-Language Models with deterministic mathematical cross-checks (line items sum == subtotal + tax == total).",
            "Cross-verify extracted entity names (Vendor, SKU, PO Number) against your ERP/database master records before posting.",
            "Route any document failing mathematical reconciliation to a side-by-side human review UI.",
          ],
        },
      ],
    },
    {
      id: "rag-agents-rpa",
      title: "4. Knowledge Retrieval (RAG), Support/CRM Automation, MCP & RPA",
      topics: [
        S.rag,
        {
          id: "support-triage",
          title: "Customer Support, RevOps & CRM Workflow Automation",
          minutes: 7,
          summary: "Automate ticket triage, RAG-grounded reply drafting, lead enrichment, and meeting-to-CRM hygiene.",
          body: [
            "High-ROI operational workflows center on Customer Support and Revenue Operations: (1) **Support Triage & Assist**—upon ticket creation in Zendesk/Intercom/ServiceNow, classify product area & urgency, fetch customer subscription state from Stripe/Postgres, retrieve relevant help-center articles via RAG, and post an internal cited draft reply for the agent; (2) **RevOps & CRM Hygiene**—enrich inbound leads, summarize call transcripts into structured MEDDIC fields in Salesforce/HubSpot, and draft follow-up action items.",
            "Always launch customer-facing communication flows in **Draft / Whisper Mode** (internal note for human agent approval) first, and graduate only narrow, proven intents (e.g., order tracking status) to autonomous replies.",
          ],
          points: [
            "Deploy customer support automations as internal agent whisper notes first to measure human edit rate before enabling auto-reply.",
            "Enrich prompts with real-time account context (plan tier, recent orders, open incidents) via API before generating drafts.",
            "Ensure every automated CRM field update logs the source transcript ID and previous value for easy rollback.",
          ],
        },
        S.toolUse,
        S.agentLoop,
        {
          id: "rpa",
          title: "Model Context Protocol (MCP), Headless Browser Automation (Playwright) & Legacy RPA",
          minutes: 7,
          summary: "Bridge modern MCP tool servers with Playwright DOM automation and RPA bots for legacy portals without APIs.",
          body: [
            "Use **Model Context Protocol (MCP)** servers whenever connecting AI steps to modern SaaS and internal databases. When automating legacy portals (government registries, insurance clearinghouses, old ERPs) that offer no API, combine **Playwright** headless browser scripts or enterprise **RPA (UiPath, Power Automate)** with AI vision/DOM extraction.",
            "Because UI selectors break whenever a vendor updates their website CSS, isolate browser interaction steps into small, self-contained scripts that capture full-page screenshots and DOM snapshots on failure, run under dedicated least-privilege service accounts, and alert immediately on layout changes.",
          ],
          points: [
            "Always prefer official REST/GraphQL APIs or database views over UI scraping; use Playwright/RPA only as a last resort.",
            "Capture trace screenshots and HTML snapshots automatically whenever a headless browser step fails.",
            "Use LLM/VLM extraction on clean Accessibility DOM trees rather than brittle XPath selectors when scraping varying layouts.",
          ],
        },
      ],
    },
    {
      id: "reliability-hitl-roi",
      title: "5. Production Reliability, Dead-Letter Queues, HITL & ROI Operations",
      topics: [
        {
          id: "error-handling",
          title: "Resilience Engineering: Exponential Backoff, Idempotency & Dead-Letter Queues (DLQ)",
          minutes: 8,
          summary: "Ensure zero silent data loss when upstream APIs throttle, schemas change, or LLMs return malformed payloads.",
          body: [
            "Production automations must never drop a customer order or invoice silently on the floor. Separate errors into two classes: **Transient Errors** (HTTP 429 Rate Limit, 502/503/504 Gateway Timeout, network reset)—handle automatically with **Exponential Backoff + Jitter** retries; and **Permanent / Poison-Pill Errors** (HTTP 400 Validation Error, missing required PDF, schema mismatch)—route immediately to a **Dead-Letter Queue (DLQ)** (a dedicated Postgres table, Airtable/Notion triage view, or SQS DLQ) and alert the on-call owner in Slack/PagerDuty with a 1-click replay link.",
            "Make every downstream write **idempotent** by passing a deterministic idempotency key (e.g., `hash(vendor_id + invoice_number)`) or performing an `UPSERT` check before creating records.",
          ],
          points: [
            "Retry transient 429/5xx errors with exponential backoff; route permanent 4xx/validation errors to a Dead-Letter Queue (DLQ).",
            "Use deterministic idempotency keys (`invoice_id`, `event_id`) so replaying a failed DLQ item never creates duplicate records.",
            "Build a centralized Error Workflow in n8n/Make that catches any unhandled node failure and posts context + replay link to Slack.",
          ],
        },
        {
          id: "human-in-the-loop",
          title: "Human-in-the-Loop (HITL) Approval Flows, Security, PII & ROI Dashboards",
          minutes: 8,
          summary: "Build 1-click Slack/Teams approval gates, redact PII, and report net financial ROI to executive stakeholders.",
          body: [
            "Design frictionless **Human-in-the-Loop (HITL)** checkpoints for high-risk or low-confidence items: pause workflow execution, post a rich interactive card in Slack, Microsoft Teams, or an operator queue showing extracted fields side-by-side with source evidence and `[Approve]`, `[Edit]`, and `[Reject]` buttons, and resume the workflow webhook upon click—logging the approver's identity for compliance.",
            "Enforce enterprise security (least-privilege service accounts, secret rotation, PII redaction before external LLM calls) and publish a live **Automation Operations & ROI Dashboard**: tracking daily items processed, straight-through processing (STP) rate, human override rate, token/API cost, and net hours/dollars saved against baseline.",
          ],
          points: [
            "Track **Straight-Through Processing (STP) Rate** (% completed without human intervention) alongside **Human Override Rate**.",
            "Store all API keys and OAuth tokens in encrypted secret stores; never hardcode credentials inside workflow JSON files.",
            "Report net ROI honestly: `(Baseline Manual Cost - Post-Automation Human Review Cost) - (LLM + Platform + Maintenance Cost)`.",
          ],
        },
        S.guardrailsSecurity,
        S.costLatency,
      ],
    },
  ],
};
