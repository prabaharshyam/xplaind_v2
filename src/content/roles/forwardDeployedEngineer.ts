import type { Roadmap } from "../../types";
import { S } from "../shared";

export const forwardDeployedEngineer: Roadmap = {
  slug: "forward-deployed-engineer",
  title: "Forward Deployed Engineer (FDE)",
  emoji: "🚀",
  description:
    "Embed directly with enterprise customers to scope, architect, integrate, and ship production AI systems against messy legacy infrastructure, data warehouses, and strict security boundaries—aligned with the canonical Palantir, OpenAI, and Anthropic FDE operating model.",
  audience:
    "Full-stack and applied AI engineers who want to own end-to-end technical delivery in the field: customer discovery, data untangling, full-stack + LLM/agent builds, VPC/air-gapped deployment, and product feedback loops.",
  tools: [
    "Python, TypeScript/React & Go",
    "FastAPI, PostgreSQL & GraphQL",
    "Snowflake, BigQuery, Databricks & Spark",
    "LLM APIs, RAG, Agents & MCP",
    "Docker, Kubernetes & Terraform",
    "SSO / SAML / OAuth2 / RBAC",
    "Claude Code / Cursor (Rapid Prototyping)",
  ],
  outcomes: [
    "Embed with enterprise customers, run technical discovery and data audits, and deliver working end-to-end prototypes in days.",
    "Integrate LLMs, RAG pipelines, and MCP agents with legacy ERPs, CRMs, data warehouses, and SSO/RBAC security models.",
    "Deploy production systems across cloud VPCs, Kubernetes clusters, or air-gapped environments and generalize customer patterns back into the core platform.",
  ],
  sections: [
    {
      id: "fde-operating-model",
      title: "1. The Forward Deployed Operating Model",
      topics: [
        {
          id: "what-is-fde",
          title: "What is an FDE? Delta vs Echo Tiers, Last-Mile Integration & Day-2 Operations",
          minutes: 7,
          summary: "Understand the Palantir/OpenAI FDE operating model: embedded engineering vs consulting, productized delivery, and Day-2 ownership.",
          body: [
            "Pioneered by Palantir ('Delta' and 'Echo' engineers) and adopted across frontier AI labs (OpenAI, Anthropic, Scale, Cohere, Sierra), Forward Deployed Engineers (FDEs) are full-stack and AI engineers who embed directly inside high-value customer organizations to close the 'last-mile gap' between a general platform/model and a customer's messy operational reality.",
            "Unlike traditional consultants who deliver slide decks or one-off custom forks, FDEs practice Productized Consulting: they build real production software on top of the company's core platform, own Day-2 production reliability and operator adoption, and extract repeatable abstractions that feed back into the core product roadmap.",
          ],
          points: [
            "FDEs write production code in the field rather than handing off specifications or slide decks.",
            "Distinguish rapid application prototyping ('Delta') from deep data/infrastructure integration ('Echo').",
            "Every custom field solution should be evaluated as a candidate abstraction for the core product platform.",
          ],
        },
        {
          id: "customer-discovery",
          title: "Customer Discovery, Scoping & Sequencing: Scope, Speed, Quality & UAT",
          minutes: 8,
          summary: "Shadow frontline operators, map pain points to measurable business ROI, and lock a 2–4 week vertical slice with clear UAT criteria.",
          body: [
            "Enterprise buyers often ask for vague solutions ('build us an AI copilot for supply chain'). An effective FDE shadows actual operators at their desks for half a day: watching which screens they copy-paste between, where data is missing or contradictory, and which exceptions stall workflows.",
            "Scope a narrow, high-value vertical slice that can reach User Acceptance Testing (UAT) in 2–4 weeks. Define explicit baseline metrics (current cycle time, error rate, cost per ticket), success criteria, out-of-scope boundaries, and named data/security owners before writing production integration code.",
          ],
          points: [
            "Shadow real end-users to uncover the actual workflow bottleneck behind executive requests.",
            "Sequence delivery around Time-to-First-Value: ship a working vertical slice in days, then expand.",
            "Write a 1-page UAT contract defining input sources, target accuracy, latency SLA, and human sign-off owners.",
          ],
        },
      ],
    },
    {
      id: "core-engineering-fullstack",
      title: "2. Core Engineering, Full-Stack & Rapid Prototyping",
      topics: [
        S.pythonEssentials,
        {
          id: "fullstack-operator-ui",
          title: "Full-Stack Engineering: TypeScript, React, FastAPI & PostgreSQL",
          minutes: 8,
          summary: "Build clean operator interfaces and resilient backend services without waiting on a separate frontend or API team.",
          body: [
            "In the field, an AI model without a usable operator workflow is invisible. FDEs must be self-sufficient across the stack: building responsive TypeScript/React interfaces (side-by-side source viewer, citation highlighting, keyboard-driven approve/edit/reject queues) backed by async Python (FastAPI) or Node/Go services and PostgreSQL.",
            "Use AI-assisted coding tools (Claude Code, Cursor) to accelerate boilerplate UI and API scaffolding so 80% of your engineering hours go toward domain logic, data edge cases, and evaluation quality.",
          ],
          points: [
            "Build operator UIs that highlight source provenance and make human verification a single keystroke.",
            "Design clean REST/GraphQL backends with strict Pydantic/Zod validation and PostgreSQL transactional state.",
            "Leverage AI coding agents to ship polished internal tools and admin dashboards in hours rather than weeks.",
          ],
        },
        {
          id: "rapid-prototyping",
          title: "Distributed System Design, Async Queues & Rapid Vertical Prototyping",
          minutes: 8,
          summary: "Architect non-blocking ingestion workers, rate-limited LLM pipelines, and thin end-to-end slices on real data.",
          body: [
            "Field workloads rarely arrive as clean, uniform requests: a customer might dump 50,000 PDFs at 8 AM while 200 operators query interactive chat. Decouple synchronous user requests from heavy background document processing using durable task queues (Celery, Redis Streams, BullMQ, Kafka, or Temporal).",
            "Build the thinnest vertical slice that touches real customer data end-to-end in week one, while enforcing backpressure, token-bucket rate limiters per upstream API, and idempotency keys on every state-changing write.",
          ],
          points: [
            "Isolate interactive low-latency traffic from high-volume batch ingestion using separate worker queues.",
            "Design every job step to be idempotent so crashed tasks can retry safely without duplicate side effects.",
            "Demo on real customer data in days to expose schema and edge-case bugs early.",
          ],
        },
      ],
    },
    {
      id: "data-audit-enterprise-integration",
      title: "3. Customer Data Audits, Warehouses & Legacy Integration",
      topics: [
        S.sqlBasics,
        {
          id: "customer-data-audit",
          title: "Customer Data Audits, Schema Untangling & Enterprise Warehouses",
          minutes: 8,
          summary: "Audit messy customer schemas across Snowflake, BigQuery, Databricks, Spark, and Airflow before feeding AI pipelines.",
          body: [
            "The #1 failure cause of enterprise AI pilots is unexamined customer data: undocumented join keys, silent nulls, timezone drift, duplicate records across regions, and stale ETL tables. Within week one, run a systematic Data Audit across the customer's data warehouse (Snowflake, BigQuery, Databricks) and orchestration DAGs (Airflow, dbt, Spark).",
            "Profile cardinality, null rates, freshness lag, and permission boundaries. Build a canonical semantic layer or clean read-replica view with automated schema/freshness assertions before indexing documents into vector stores or exposing SQL tools to agents.",
          ],
          points: [
            "Never trust customer ER diagrams; profile actual table distributions, join fan-outs, and null rates with SQL.",
            "Verify data freshness lags in Airflow/Spark pipelines so your AI system does not act on yesterday's stale state.",
            "Create curated, well-documented warehouse views rather than letting LLMs query raw 500-column bronze tables.",
          ],
        },
        {
          id: "data-integration",
          title: "Integrating Legacy Enterprise Systems: ERPs, CRMs, SOAP & Mainframes",
          minutes: 8,
          summary: "Build anti-corruption adapter layers around SAP, Salesforce, ServiceNow, Epic, and brittle on-prem APIs.",
          body: [
            "Enterprise workflows live inside systems of record—Salesforce, SAP, Oracle, ServiceNow, Workday, Jira, or decades-old SOAP/XML and flat-file SFTP drops. These systems have quirky pagination, strict governor limits, inconsistent error codes, and scheduled maintenance windows.",
            "Wrap every external customer system behind a clean Anti-Corruption Adapter Layer in your codebase. Normalize external payloads into your internal domain types at the boundary, cache slow reference lookups, and record raw request/response audit logs with correlation IDs.",
          ],
          points: [
            "Isolate customer-specific ERP/CRM quirks behind a typed adapter interface so core workflow logic stays clean.",
            "Respect governor limits (e.g., Salesforce daily API quotas) with bulk APIs, delta syncs, and local read caches.",
            "Log correlation IDs across every external call to prove root cause when a customer's upstream service fails.",
          ],
          example: {
            title: "Resilient enterprise CRM adapter with retries and correlation IDs",
            language: "python",
            code: `import httpx, uuid
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(stop=stop_after_attempt(3), wait=wait_exponential(min=1, max=8))
async def fetch_customer_case(case_id: str, token: str) -> dict:
    correlation_id = str(uuid.uuid4())
    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.get(
            f"https://crm.customer.internal/api/v2/cases/{case_id}",
            headers={"Authorization": f"Bearer {token}", "X-Correlation-ID": correlation_id},
        )
        resp.raise_for_status()
        data = resp.json()
        return {"id": data["CaseNumber"], "status": data["Status"], "priority": data.get("Priority", "Normal")}`,
          },
        },
      ],
    },
    {
      id: "applied-ai-field",
      title: "4. Applied AI, Enterprise RAG, Agents & MCP in the Field",
      topics: [
        S.promptDesign,
        S.structuredOutput,
        S.rag,
        {
          id: "field-agents-mcp",
          title: "Field Agent Architectures, Tool Use & Model Context Protocol (MCP)",
          minutes: 9,
          summary: "Connect LLMs to enterprise tools via MCP servers, permission-aware retrieval, and human-in-the-loop approval gates.",
          body: [
            "When deploying RAG and agents inside an enterprise, Document-Level Access Control (ACLs) is mandatory: a user querying the AI assistant must never retrieve chunks from a SharePoint folder, Slack channel, or Jira project they lack permission to read directly. Propagate user identity tokens into vector metadata filters and MCP tool calls.",
            "Use the Model Context Protocol (MCP) to expose customer databases, ticketing systems, and internal APIs as standardized, reusable tool servers. Keep high-impact write actions (issuing refunds, modifying ERP orders, sending external emails) behind explicit human-in-the-loop confirmation steps.",
          ],
          points: [
            "Enforce source-system ACLs at retrieval time using pre-filtering on user/group security principals.",
            "Package customer system integrations as standardized MCP servers so tools work across multiple agent workflows.",
            "Gate external write operations behind human approval until offline and shadow evaluations prove >99% reliability.",
          ],
        },
      ],
    },
    {
      id: "deploying",
      title: "5. Cloud Infrastructure, Kubernetes, Air-Gapped Deployments & Security",
      topics: [
        S.docker,
        {
          id: "deployment-environments",
          title: "Cloud VPCs, Terraform IaC, Kubernetes & Air-Gapped / On-Prem Delivery",
          minutes: 8,
          summary: "Deploy reproducibly into customer AWS/Azure/GCP VPCs, PrivateLink networks, or disconnected on-premises Kubernetes clusters.",
          body: [
            "Regulated enterprises (banking, defense, healthcare, industrials) rarely allow sensitive data to leave their virtual private cloud (VPC). FDEs must package applications as reproducible Docker containers, Helm charts, and Terraform modules that deploy cleanly into AWS, Azure, or GCP via VPC Peering / AWS PrivateLink—or into fully air-gapped on-premises Kubernetes clusters.",
            "In restricted environments without public internet access, bundle container images, Python wheels, embedding models, and open-weight LLM checkpoints into private artifact registries and verify GPU operator drivers beforehand.",
          ],
          points: [
            "Codify customer infrastructure with Terraform and Helm so environments can be spun up or upgraded reproducibly.",
            "Use AWS Bedrock, Azure OpenAI over PrivateLink, or self-hosted vLLM on customer GPUs when data residency forbids public APIs.",
            "Test offline container and model-weight bundles before deploying into air-gapped or firewall-restricted networks.",
          ],
        },
        {
          id: "enterprise-security",
          title: "Enterprise Auth (SSO, SAML, OIDC, RBAC), DevSecOps & AI Governance",
          minutes: 8,
          summary: "Pass enterprise InfoSec reviews: integrate Okta/Entra ID SSO, role-based access control, PII redaction, and immutable audit logs.",
          body: [
            "No enterprise deployment goes live without clearing Information Security (InfoSec) and compliance review. You must integrate corporate Single Sign-On (SAML 2.0 / OIDC via Okta, Microsoft Entra ID, or Ping), enforce Role-Based Access Control (RBAC), encrypt data in transit (TLS 1.3) and at rest (KMS), and store secrets in Vault or cloud secret managers.",
            "For AI workloads, verify zero-data-retention (ZDR) agreements with model providers, redact PII/PHI before external API calls, defend against indirect prompt injection from untrusted customer documents, and log an immutable audit trail of every prompt, retrieved document ID, tool call, and user action.",
          ],
          points: [
            "Integrate OIDC/SAML SSO and RBAC early; InfoSec sign-off often takes longer than writing the application code.",
            "Confirm Zero Data Retention (ZDR) and regional data residency on all commercial LLM endpoints.",
            "Maintain complete audit logs (who asked what, which documents were retrieved, which tool executed) for compliance.",
          ],
        },
        S.cicd,
      ],
    },
    {
      id: "adoption",
      title: "6. Field Evaluation Pipelines, Stakeholder Leadership & Product Loop",
      topics: [
        S.llmEvaluation,
        S.monitoring,
        S.stakeholderComm,
        {
          id: "productising-handover",
          title: "Driving Operator Adoption, Executive ROI & Productizing Field Work",
          minutes: 7,
          summary: "Quantify business impact for executive sponsors and generalize field patterns into reusable platform features.",
          body: [
            "Track adoption and business impact from day one: daily active operators, percentage of AI drafts accepted without edits, median resolution time saved, and cost per completed workflow. Present clear before/after ROI metrics to customer executives to drive expansion from pilot to enterprise-wide rollout.",
            "Internally, close the loop with core engineering: document where the core product required custom workarounds, contribute reusable connectors/evaluators back to the shared repo, and help turn repeated field patterns into first-class product features.",
          ],
          points: [
            "Measure human edit distance and acceptance rate on AI outputs as your primary field quality indicator.",
            "Translate technical metrics into executive ROI (hours saved, backlog reduced, SLA attainment).",
            "Generalize code built for three customers into a configurable platform capability.",
          ],
        },
      ],
    },
  ],
};
