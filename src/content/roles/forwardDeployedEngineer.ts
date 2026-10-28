import type { Roadmap } from "../../types";
import { S } from "../shared";

export const forwardDeployedEngineer: Roadmap = {
  slug: "forward-deployed-engineer",
  title: "Forward Deployed Engineer (FDE)",
  emoji: "🚀",
  description:
    "Work directly with customers to turn an AI platform into a working solution inside their data, systems and security rules.",
  audience:
    "Engineers who enjoy customer contact and want to own outcomes: from discovery to deployment to adoption.",
  tools: ["Python", "SQL", "REST APIs and webhooks", "Cloud (AWS/Azure/GCP)", "Docker", "SSO / SAML / OAuth", "Dashboards"],
  outcomes: [
    "Run discovery and define a scoped pilot with measurable success criteria.",
    "Integrate with messy customer systems and deploy securely in their environment.",
    "Drive adoption and feed lessons back into the product.",
  ],
  sections: [
    {
      id: "role",
      title: "Understanding the role",
      topics: [
        {
          id: "what-is-fde",
          title: "What a Forward Deployed Engineer does",
          minutes: 6,
          summary: "Embedded engineering that owns the customer's outcome.",
          body: [
            "An FDE works at or with the customer to make a product deliver real value in their environment. Unlike a classic software engineer, you spend much of your time with users and their data. Unlike a pre-sales solutions architect, you write production code and stay until it works.",
            "Success needs three skills at once: engineering depth to build quickly, product sense to decide what matters, and people skills to build trust. Your work produces two things: a happy customer and reusable learning for the product team.",
          ],
          points: [
            "You own the outcome, not just the code.",
            "The blend: engineering, product judgement and customer trust.",
            "Customer learnings should flow back into the core product.",
          ],
        },
      ],
    },
    {
      id: "foundations",
      title: "Technical foundations",
      topics: [S.pythonEssentials, S.apisHttp, S.sqlBasics, S.gitGithub, S.cloudBasics],
    },
    {
      id: "discovery",
      title: "Discovery and scoping",
      topics: [
        {
          id: "customer-discovery",
          title: "Customer discovery",
          minutes: 7,
          summary: "Find the real problem behind the request.",
          body: [
            "Customers often ask for a solution ('add a chatbot') when the problem is different ('agents take too long to find policy details'). Ask about the current process, who does it, how often, what it costs and what a good result would look like. Watch the work happen where possible, and talk to the people who will use the system, not only the sponsor.",
            "Map the data and systems involved, who owns them, and what rules apply. Write down what you heard and confirm it back. Misunderstandings found in week one cost far less than those found in week eight.",
          ],
          points: [
            "Ask about the problem before accepting a solution.",
            "Observe real work and talk to end users.",
            "Confirm your understanding in writing.",
          ],
        },
        {
          id: "scoping-pilots",
          title: "Scoping pilots and success metrics",
          minutes: 7,
          summary: "Define a small, time-boxed project that proves value.",
          body: [
            "A pilot should be small enough to finish in weeks and meaningful enough to matter. Agree the user, the task, the data, the baseline today and one or two success metrics, such as 'cut handling time by 30% with at least 95% accuracy on a reviewed sample'. Write down what is out of scope.",
            "Set up an evaluation method with the customer before building, so both sides accept the result. Agree on exit criteria: what happens if the pilot succeeds, partly succeeds or fails. Clear scope protects trust.",
          ],
          points: [
            "Pilots are time-boxed with a defined baseline and metrics.",
            "Agree how success will be measured before building.",
            "State out-of-scope items and next steps explicitly.",
          ],
        },
        S.stakeholderComm,
      ],
    },
    {
      id: "building",
      title: "Building in the customer's context",
      topics: [
        {
          id: "data-integration",
          title: "Integrating with customer systems",
          minutes: 8,
          summary: "Connect to messy, legacy and permissioned data sources.",
          body: [
            "Real customer data sits in ERPs, CRMs, shared drives, old databases and spreadsheets, with inconsistent formats and missing fields. Learn to read API docs fast, use connectors where they exist, fall back to file exports or database views, and build small adapters that turn messy inputs into a clean internal format.",
            "Authenticate properly (OAuth, service accounts, SSO) and request only the access you need. Validate and log what you ingest, handle failures without losing data, and respect each source's permissions so users only see what they are allowed to see.",
          ],
          points: [
            "Build small adapters that normalise messy sources.",
            "Use proper authentication with minimum access.",
            "Validate, log and respect source permissions.",
          ],
        },
        {
          id: "rapid-prototyping",
          title: "Rapid prototyping",
          minutes: 6,
          summary: "Show a working thin slice in days, not months.",
          body: [
            "Build the thinnest vertical slice that touches real data and real users: one input, one output, end to end. A working prototype in days beats a design document in weeks, because it surfaces data problems and misunderstandings early and gives the customer something to react to.",
            "Prototype fast, but label it as a prototype. Keep a short list of shortcuts you took, and plan time to turn what survives into production-quality work with tests, error handling and monitoring.",
          ],
          points: [
            "Build one thin end-to-end slice first.",
            "Use real data and real users early.",
            "Track shortcuts so they do not silently become production.",
          ],
        },
        S.promptDesign,
        S.structuredOutput,
        S.rag,
        S.toolUse,
        S.dataPrivacy,
      ],
    },
    {
      id: "deploying",
      title: "Deploying and securing",
      topics: [
        {
          id: "enterprise-security",
          title: "Enterprise security requirements",
          minutes: 7,
          summary: "Pass security review without stalling the project.",
          body: [
            "Large customers run security reviews before connecting anything. Expect questions on single sign-on (SAML or OIDC), role-based access, encryption in transit and at rest, audit logs, data residency, subprocessors, penetration tests and compliance reports. Prepare answers and diagrams early.",
            "Design for least privilege and isolated data from the start. Explain exactly what data flows to which model provider and whether it is retained or used for training. Engaging the customer's security team in week one prevents late blockers.",
          ],
          points: [
            "Expect questions on SSO, access control, encryption, logging and residency.",
            "Document data flows, including model providers.",
            "Involve the customer's security team early.",
          ],
        },
        {
          id: "deployment-environments",
          title: "Deploying into customer environments",
          minutes: 7,
          summary: "Cloud, private network, on-premises and air-gapped options.",
          body: [
            "Deployments range from your hosted cloud, to a dedicated tenant, to the customer's own cloud account or private network, to on-premises and fully air-gapped systems. Each step adds control for the customer and operational work for you, such as updates, observability and model access without internet.",
            "Use containers and infrastructure as code so installs are repeatable. Provide health checks, clear logs, a runbook and a rollback plan. Agree who operates what, how updates are applied and how support access is granted and audited.",
          ],
          points: [
            "Options: hosted, dedicated, customer cloud, on-premises, air-gapped.",
            "Containers and infrastructure as code make installs repeatable.",
            "Agree operations, updates and support access up front.",
          ],
        },
        S.docker,
        S.cicd,
      ],
    },
    {
      id: "adoption",
      title: "Adoption and impact",
      topics: [
        S.llmEvaluation,
        S.monitoring,
        {
          id: "change-management",
          title: "Driving adoption and change management",
          minutes: 6,
          summary: "A working system only creates value if people use it.",
          body: [
            "Find a champion on the customer side, train the first users with their own examples, and make the new workflow easier than the old one. Collect feedback weekly, fix annoying issues fast and share small wins with the sponsor. Resistance usually has a reason, such as fear of errors or extra work, so listen first.",
            "Track adoption (active users, tasks handled) next to quality and business impact. If people go around the system, treat that as product feedback, not user failure.",
          ],
          points: [
            "Win a champion and train with real examples.",
            "Measure adoption as well as accuracy.",
            "Treat workarounds as feedback.",
          ],
        },
        {
          id: "productising-handover",
          title: "Productising and handover",
          minutes: 6,
          summary: "Turn one-off work into reusable product and a smooth handover.",
          body: [
            "When several customers need the same custom piece, propose it as a product feature, with clear requirements, examples and data. Share patterns, connectors and playbooks so the next deployment is faster. Be honest about what is customer-specific and what is general.",
            "Plan the handover from the start: documentation, runbooks, training for the customer's team, a support path and clear ownership. A project that only you can operate is a risk to the customer and to you.",
          ],
          points: [
            "Turn repeated custom work into product features.",
            "Document patterns and playbooks for reuse.",
            "Plan documentation and handover from the start.",
          ],
        },
      ],
    },
  ],
};
