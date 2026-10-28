import type { Roadmap } from "../../types";
import { S } from "../shared";

export const aiAutomationSpecialist: Roadmap = {
  slug: "ai-automation-specialist",
  title: "AI Automation Specialist / Engineer",
  emoji: "⚙️",
  description:
    "Find repetitive work, design the workflow, add AI where it helps, connect systems and keep the automation reliable and measurable.",
  audience:
    "Operations people, analysts and developers who want to automate business processes with no-code tools, scripts and AI.",
  tools: ["n8n / Make / Zapier", "Python", "Webhooks and REST APIs", "Spreadsheets and SQL", "OCR / document AI", "RPA tools"],
  outcomes: [
    "Map a process, pick what to automate and estimate the return.",
    "Build workflows that combine triggers, APIs and AI steps with human review.",
    "Operate them with monitoring, error handling and documentation.",
  ],
  sections: [
    {
      id: "mindset",
      title: "Automation mindset",
      topics: [
        {
          id: "what-to-automate",
          title: "Finding work worth automating",
          minutes: 6,
          summary: "Pick tasks by frequency, effort, rules and risk.",
          body: [
            "Good candidates are frequent, time-consuming, repetitive and based on clear rules or patterns, with digital inputs and outputs. Rank ideas by hours saved per month, ease of building, error cost and how stable the process is. Automating a broken process only makes mistakes faster, so fix the process first.",
            "Talk to the people doing the work. They know the exceptions, the workarounds and the unwritten rules that determine whether an automation will survive real use.",
          ],
          points: [
            "Prefer frequent, rule-based, digital tasks.",
            "Fix a bad process before automating it.",
            "Learn exceptions from the people doing the work.",
          ],
        },
        {
          id: "process-mapping",
          title: "Process mapping",
          minutes: 6,
          summary: "Draw the real steps, inputs, decisions and exceptions.",
          body: [
            "Draw the process from trigger to result: who starts it, what data comes in, each step and decision, the systems touched, and the final output. Include exceptions such as missing data, rejected items and special customers. A simple flowchart or swimlane diagram is enough.",
            "Mark each step as automatable, AI-assisted or human-only. Measure the current time, error rate and volume; you will need this baseline to prove the improvement later.",
          ],
          points: [
            "Map triggers, steps, decisions, systems and exceptions.",
            "Label each step: automate, AI-assist or human.",
            "Record a baseline for time and errors.",
          ],
        },
      ],
    },
    {
      id: "tools",
      title: "Core tools and skills",
      topics: [
        S.apisHttp,
        {
          id: "no-code-tools",
          title: "No-code and low-code workflow tools",
          minutes: 7,
          summary: "Triggers, actions, branches and loops in tools like n8n, Make and Zapier.",
          body: [
            "Workflow tools connect apps through triggers (a new email, a form submission, a schedule) and actions (create a record, send a message). They add branches, loops, filters and data mapping. Learn the data model of the tool: how items pass between steps, how to read fields and how to handle lists.",
            "Choose by need: hosted tools are quick to start, self-hostable ones give data control and flexibility, and code steps handle logic the visual blocks cannot. Keep workflows small, named clearly and documented, and store credentials in the tool's secret store.",
          ],
          points: [
            "Workflows = triggers, actions, branches, loops and mappings.",
            "Choose hosted or self-hosted by data control and flexibility.",
            "Keep workflows small, named and documented.",
          ],
        },
        S.pythonEssentials,
        S.sqlBasics,
        {
          id: "webhooks-integrations",
          title: "Webhooks, authentication and integrations",
          minutes: 7,
          summary: "Connect systems securely and handle limits.",
          body: [
            "A webhook is a message a system sends to your URL when something happens, which is faster than checking repeatedly (polling). Verify the sender with a signature or secret, respond quickly and process the work in the background. Learn the common authentication types: API keys, OAuth and service accounts.",
            "Respect rate limits, paginate through large result sets and design for duplicates, since many systems send an event more than once. Store tokens securely and request only the permissions you need.",
          ],
          points: [
            "Webhooks push events; verify the sender's signature.",
            "Handle rate limits, pagination and duplicate events.",
            "Store credentials securely with minimal scopes.",
          ],
          example: {
            title: "A typical webhook payload",
            language: "json",
            code: `{
  "event": "invoice.received",
  "id": "evt_8421",
  "data": {
    "vendor": "Acme Supplies",
    "file_url": "https://example.com/files/inv-1042.pdf"
  }
}`,
          },
        },
      ],
    },
    {
      id: "adding-ai",
      title: "Adding AI to workflows",
      topics: [
        S.promptDesign,
        S.structuredOutput,
        {
          id: "ai-in-workflows",
          title: "AI steps: classify, extract, summarise, route",
          minutes: 7,
          summary: "The four jobs AI does best inside a workflow.",
          body: [
            "Most useful AI steps are small and well-defined. Classify an item into a category, extract fields from text, summarise a long message, or decide which path to take. Give each step a narrow prompt, a fixed output format and a few examples, and keep the rest of the workflow deterministic.",
            "Test each step on real samples before connecting it. Add a confidence rule or a 'needs review' path for unclear cases. A small, cheap model is often enough for classification and extraction.",
          ],
          points: [
            "Use narrow prompts and fixed output formats.",
            "Test every AI step on real samples.",
            "Route unclear cases to review; small models often suffice.",
          ],
        },
        {
          id: "document-processing",
          title: "Document processing",
          minutes: 7,
          summary: "Turn invoices, forms and emails into clean structured data.",
          body: [
            "Documents arrive as PDFs, scans, photos and emails. The usual pipeline is: get the text (directly or with OCR), identify the document type, extract the fields, validate them and send the result to a system or a reviewer. Multimodal models can read many layouts directly.",
            "Validate with rules: totals that add up, dates in range, vendor IDs that exist. Measure accuracy per field on a sample and keep a human review step for low-confidence or high-value items. Protect sensitive documents and log access.",
          ],
          points: [
            "Pipeline: read, classify, extract, validate, route.",
            "Cross-check with rules such as totals and known IDs.",
            "Measure per-field accuracy and keep human review.",
          ],
        },
        {
          id: "support-triage",
          title: "Email, chat and support automation",
          minutes: 6,
          summary: "Triage, draft and answer with a person in control.",
          body: [
            "Typical uses are tagging and prioritising incoming messages, drafting replies from a knowledge base, summarising threads and filling ticket fields. Start in assist mode, where the AI drafts and a person approves, and move to automatic sending only for low-risk, well-measured cases.",
            "Ground answers in approved documents with retrieval, include sources, and never invent policies or promises. Track edit rate and customer satisfaction to see whether quality is improving.",
          ],
          points: [
            "Start with drafts that people approve.",
            "Ground replies in approved knowledge and cite sources.",
            "Track edit rate and satisfaction.",
          ],
        },
        S.rag,
        S.toolUse,
      ],
    },
    {
      id: "legacy",
      title: "Legacy systems and agents",
      topics: [
        {
          id: "rpa",
          title: "Robotic process automation (RPA)",
          minutes: 6,
          summary: "Automate screens when there is no API.",
          body: [
            "RPA tools click, type and copy data in desktop and web applications the way a person would. They are useful for older systems without APIs, but they are brittle: layout changes or slow screens can break them. Use an API or database integration when you can.",
            "Run bots under dedicated accounts with limited rights, log every action, schedule runs outside peak hours and add alerts for failures. AI can help by reading screens or unstructured inputs, but keep the surrounding steps deterministic.",
          ],
          points: [
            "RPA is for systems without APIs; it can be brittle.",
            "Use dedicated limited accounts and detailed logs.",
            "Prefer APIs when available.",
          ],
        },
        S.agentLoop,
      ],
    },
    {
      id: "reliability",
      title: "Reliability, risk and people",
      topics: [
        {
          id: "error-handling",
          title: "Error handling and retries",
          minutes: 6,
          summary: "Automations should fail loudly, safely and recoverably.",
          body: [
            "Expect failures: timeouts, expired tokens, bad data and changed formats. Retry temporary errors with a delay, send permanent failures to a 'dead letter' queue or sheet for review, and alert a named person. Never let an item vanish silently.",
            "Make steps idempotent so a retry does not create duplicate invoices or emails; use unique IDs to check whether work was already done. Keep a log of each run with inputs and outcomes so you can diagnose problems quickly.",
          ],
          points: [
            "Retry temporary errors; queue permanent ones for review.",
            "Use unique IDs so retries do not duplicate work.",
            "Log each run and alert an owner.",
          ],
        },
        {
          id: "human-in-the-loop",
          title: "Human-in-the-loop design",
          minutes: 6,
          summary: "Put approvals where risk is high and confidence is low.",
          body: [
            "Decide which steps need a person: high-value, irreversible, sensitive or uncertain ones. Make review fast: show the AI's result, the source and the proposed action in one place with approve, edit and reject buttons. Capture the corrections as feedback.",
            "Use thresholds. Items with high confidence and low risk proceed automatically; others wait for review. Re-check the thresholds with sampled audits so the automation does not drift into unnoticed errors.",
          ],
          points: [
            "Review high-risk and low-confidence items.",
            "Make approvals quick, with context and source.",
            "Audit samples to confirm thresholds still work.",
          ],
        },
        S.guardrailsSecurity,
        S.dataPrivacy,
      ],
    },
    {
      id: "operate",
      title: "Operating and proving value",
      topics: [
        {
          id: "measuring-roi",
          title: "Measuring ROI",
          minutes: 6,
          summary: "Show time saved, errors avoided and total cost.",
          body: [
            "Compare against the baseline you recorded: hours saved, tasks completed, error rate, cycle time and user satisfaction. Convert to money using a fair hourly cost, then subtract build time, tool licences, model usage and maintenance. Report a range and state assumptions.",
            "Count benefits beyond time saved, such as faster response and fewer mistakes, but do not inflate numbers. Honest, modest results build credibility for the next project.",
          ],
          points: [
            "Compare against the recorded baseline.",
            "Subtract build, licence, model and maintenance costs.",
            "Report ranges and state assumptions.",
          ],
        },
        {
          id: "maintenance-docs",
          title: "Maintenance and documentation",
          minutes: 5,
          summary: "Keep automations owned, documented and up to date.",
          body: [
            "Every automation needs an owner, a short description of what it does and why, a diagram, the systems and credentials it uses, and a list of known failure modes. Keep versions and a change log, and test changes in a copy before touching the live workflow.",
            "Review automations regularly. Processes change, vendors update APIs and models are retired. Retire what is no longer used so you do not carry hidden risk.",
          ],
          points: [
            "Assign an owner and document the workflow.",
            "Version changes and test in a copy.",
            "Review regularly and retire unused automations.",
          ],
        },
        S.costLatency,
        S.stakeholderComm,
      ],
    },
  ],
};
