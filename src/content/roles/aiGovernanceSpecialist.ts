import type { Roadmap } from "../../types";
import { S } from "../shared";

export const aiGovernanceSpecialist: Roadmap = {
  slug: "ai-governance-compliance-specialist",
  title: "AI Governance & Compliance Specialist",
  emoji: "⚖️",
  description:
    "Set up the policies, risk assessments, documentation and oversight that keep AI use lawful, safe, fair and accountable.",
  audience:
    "Risk, legal, audit, privacy and security professionals, and technologists moving into responsible-AI roles.",
  tools: ["AI inventory / register", "Risk and impact assessments", "Model cards", "Policy templates", "Audit evidence trackers", "Bias testing reports"],
  outcomes: [
    "Explain the main AI laws and frameworks and map them to a real product.",
    "Run risk and impact assessments and set up policy and oversight.",
    "Collect evidence, audit controls and handle incidents.",
  ],
  sections: [
    {
      id: "ai-basics",
      title: "AI basics for governance",
      topics: [
        S.mlFundamentals,
        S.transformersLlms,
        {
          id: "lifecycle-risk",
          title: "Risks across the AI lifecycle",
          minutes: 7,
          summary: "Where things go wrong from idea to retirement.",
          body: [
            "Risk appears at every stage. In planning: an unsuitable use or unclear purpose. In data: poor quality, bias, missing consent or copyright problems. In development: weak testing or opaque models. In deployment: misuse, security flaws and over-reliance. In operation: drift, silent degradation and changing laws. At retirement: leftover data and models.",
            "Learn to ask engineers precise questions at each stage: what data, which model, what testing, who approves, how is it monitored. Controls work best when attached to the lifecycle, such as a mandatory review before launch.",
          ],
          points: [
            "Risks arise from planning through retirement.",
            "Ask stage-specific questions about data, models, testing and monitoring.",
            "Attach controls to lifecycle gates such as pre-launch review.",
          ],
        },
      ],
    },
    {
      id: "ethics",
      title: "Ethics, fairness and transparency",
      topics: [
        S.responsibleAi,
        {
          id: "fairness-testing",
          title: "Fairness and bias testing",
          minutes: 8,
          summary: "Measure differences between groups and decide what is acceptable.",
          body: [
            "Bias can enter through unrepresentative data, biased labels or the way a problem is framed. Test by comparing error rates, approval rates or outcomes across groups, for example by gender, age or region where lawful and appropriate. Several fairness definitions exist and they can conflict, so the choice is a policy decision, not only a technical one.",
            "Document what was tested, the results and the decision taken. Mitigation can include better data, threshold adjustment, human review or not using AI for that case. Repeat testing after changes and in production.",
          ],
          points: [
            "Compare outcomes and error rates across groups.",
            "Fairness definitions can conflict; record the policy choice.",
            "Retest after changes and in production.",
          ],
        },
        {
          id: "explainability",
          title: "Explainability and human oversight",
          minutes: 7,
          summary: "Give people understandable reasons and real ability to intervene.",
          body: [
            "Explainability ranges from inherently interpretable models, such as simple rules and linear models, to after-the-fact tools that show which inputs influenced a prediction. Choose the level needed by the decision's impact: a loan refusal needs clearer reasons than a movie suggestion. Explanations can be misleading, so validate them.",
            "Human oversight must be real. The reviewer needs enough information, time, authority and training to disagree with the system. Guard against automation bias, where people accept machine suggestions without checking.",
          ],
          points: [
            "Match explanation depth to decision impact.",
            "Explanations need validation.",
            "Oversight requires information, time, authority and training.",
          ],
        },
        {
          id: "transparency-documentation",
          title: "Model cards and documentation",
          minutes: 6,
          summary: "Record purpose, data, performance, limits and owners.",
          body: [
            "A model card summarises what a model is for, who made it, the data used, how it was evaluated, known limits and appropriate uses. Datasheets describe datasets in a similar way, and system cards cover a full product including safeguards. Keep them current and version-controlled.",
            "Good documentation supports audits, customer questions and regulation. Make it easy to produce by collecting facts during development, rather than writing it afterwards from memory.",
          ],
          points: [
            "Model cards: purpose, data, evaluation, limits, owners.",
            "Datasheets describe datasets; system cards describe products.",
            "Collect documentation during development.",
          ],
        },
      ],
    },
    {
      id: "law",
      title: "Laws, frameworks and standards",
      topics: [
        S.aiRegulation,
        {
          id: "eu-ai-act",
          title: "The EU AI Act",
          minutes: 9,
          summary: "A risk-based law with obligations that depend on your role.",
          body: [
            "The EU AI Act sorts AI into categories: prohibited practices, high-risk systems, systems with transparency duties (such as chatbots and synthetic media) and minimal-risk systems. It also has rules for general-purpose AI models. High-risk systems, for example in hiring, credit, education and critical infrastructure, must meet requirements on risk management, data quality, documentation, logging, human oversight, accuracy and security.",
            "Obligations depend on your role: provider, deployer, importer or distributor. The law applies in phases and guidance keeps evolving, and it can reach non-EU companies whose systems are used in the EU. Check current official texts and dates, and take legal advice for a real product.",
          ],
          points: [
            "Categories: prohibited, high-risk, transparency, minimal; plus general-purpose models.",
            "High-risk systems need risk management, documentation, logging and human oversight.",
            "Your role (provider or deployer) decides your duties; verify current dates.",
          ],
        },
        {
          id: "nist-rmf",
          title: "NIST AI Risk Management Framework",
          minutes: 7,
          summary: "Govern, Map, Measure, Manage.",
          body: [
            "The NIST AI RMF is voluntary guidance organised into four functions. Govern builds culture, policies and accountability. Map frames context, purpose and potential impacts. Measure assesses and tracks risks with tests and metrics. Manage prioritises and treats risks and plans responses. A companion profile covers generative AI.",
            "Use it as a common language with engineers and executives: for each system, map context and risks, measure them, manage them and govern the whole process. It pairs well with a management-system standard such as ISO/IEC 42001.",
          ],
          points: [
            "Four functions: Govern, Map, Measure, Manage.",
            "Voluntary but widely used as a shared vocabulary.",
            "Pairs with ISO/IEC 42001 for a management system.",
          ],
        },
        {
          id: "iso-42001",
          title: "ISO/IEC 42001 and management systems",
          minutes: 6,
          summary: "A certifiable management system for AI.",
          body: [
            "ISO/IEC 42001 specifies requirements for an AI management system (AIMS) in an organisation: scope, leadership, policy, risk assessment, controls, monitoring, internal audit and continual improvement. Organisations can be certified by an accredited body, which helps show customers a structured approach.",
            "It follows the same structure as other ISO management standards, so teams already running information-security or quality systems can integrate it. A certificate shows a system exists; it does not prove each AI product is safe or lawful.",
          ],
          points: [
            "Defines an AI management system with continual improvement.",
            "Certifiable by an accredited body.",
            "Certification is not proof of any single product's compliance.",
          ],
        },
        S.dataPrivacy,
        {
          id: "ip-copyright",
          title: "Intellectual property and copyright",
          minutes: 6,
          summary: "Training data, outputs and licences.",
          body: [
            "Key questions: was the training data collected lawfully and under suitable licences? Who owns generated output, and can it infringe someone's work? Can staff paste confidential material into a public tool? Rules differ by country and are still being tested in courts.",
            "Practical controls include approved-tool lists, rules for confidential and customer data, review of vendor terms on training and indemnities, keeping records of data sources and licences, and human review of generated content before publication.",
          ],
          points: [
            "Check training-data rights and output ownership terms.",
            "Restrict confidential data in public tools.",
            "Record data sources and licences; review vendor indemnities.",
          ],
        },
        {
          id: "sector-rules",
          title: "Sector-specific rules",
          minutes: 6,
          summary: "Finance, health, employment and public-sector requirements.",
          body: [
            "Many industries already have rules that apply to AI: model risk management and fair-lending rules in finance, safety and clinical validation in health, anti-discrimination law in hiring, and procurement and transparency rules in government. Regulators in several countries have issued guidance on using AI in their sector.",
            "Build a register of obligations by sector and country for each product, name an owner for each, and check it regularly. Work with legal counsel and domain experts, because the details are specialised and change over time.",
          ],
          points: [
            "Existing sector rules already apply to AI.",
            "Maintain an obligations register with owners.",
            "Involve legal and domain experts.",
          ],
        },
      ],
    },
    {
      id: "programme",
      title: "Building the governance programme",
      topics: [
        {
          id: "ai-policy",
          title: "AI policy, inventory and roles",
          minutes: 7,
          summary: "Decide what is allowed, who decides and what is deployed.",
          body: [
            "Start with an inventory of every AI system and tool in use, including shadow use by employees. Write a clear acceptable-use policy: approved tools, forbidden uses, rules for data and requirements for human review. Define roles with a RACI chart: who owns, who reviews, who approves, who is informed.",
            "Create an intake process so every new AI use case gets a proportionate review. Low-risk uses should move quickly, high-risk ones deserve committee review. Train staff, because policy without awareness fails.",
          ],
          points: [
            "Inventory all AI use, including shadow tools.",
            "Define policy, roles and a RACI.",
            "Use a proportionate intake and review process.",
          ],
        },
        {
          id: "risk-assessment",
          title: "AI risk and impact assessments",
          minutes: 8,
          summary: "Identify harms, rate them and decide on controls.",
          body: [
            "An assessment describes the system and purpose, the people affected, the data used, possible harms (safety, discrimination, privacy, security, reputation, legal), their likelihood and severity, existing controls and the remaining risk. Include a data protection impact assessment when personal data is processed at risk.",
            "Decide: accept, reduce, transfer or avoid, and record who approved the residual risk. Reassess when the system, data or context changes. Keep the output short and usable, not a document nobody reads.",
          ],
          points: [
            "Rate harms by likelihood and severity.",
            "Record controls, residual risk and the approver.",
            "Reassess after material changes.",
          ],
        },
        {
          id: "vendor-risk",
          title: "Third-party and vendor risk",
          minutes: 6,
          summary: "Due diligence for AI products and model providers.",
          body: [
            "Ask vendors about data handling (storage, retention, use for training), security certifications, model evaluation, incident history, subprocessors, uptime, change notification and how they support your legal duties. Request documentation such as model cards and audit reports.",
            "Put protections in contracts: confidentiality, data location, breach notice, audit rights, liability and exit terms. Monitor vendors after signing, since models and policies change.",
          ],
          points: [
            "Ask about data use, security, testing and subprocessors.",
            "Contract for breach notice, audit rights and exit.",
            "Keep monitoring after onboarding.",
          ],
        },
        S.guardrailsSecurity,
      ],
    },
    {
      id: "assurance",
      title: "Assurance and response",
      topics: [
        {
          id: "incident-response",
          title: "AI incident response",
          minutes: 6,
          summary: "Detect, contain, report and learn from AI failures.",
          body: [
            "AI incidents include harmful or biased outputs, data leaks, security attacks, wrong automated decisions and unexpected model behaviour after an update. Define what counts as an incident, how people report it, severity levels, who can pause a system, and when to notify customers, regulators or affected people.",
            "After containment, find the root cause, fix it, test the fix and record lessons. Keep a log of incidents and near-misses. Some laws set reporting deadlines, so know those in advance.",
          ],
          points: [
            "Define incident types, severity and the authority to pause systems.",
            "Know notification duties and deadlines.",
            "Run a root-cause review and keep an incident log.",
          ],
        },
        {
          id: "audit-assurance",
          title: "Audit, evidence and assurance",
          minutes: 7,
          summary: "Prove that controls exist and work.",
          body: [
            "Auditors ask for evidence: policies, approvals, assessments, test results, monitoring records and training logs. Define controls clearly, name owners and collect evidence continuously so audits are routine. Test that controls operate, not just that they exist on paper.",
            "Three lines of defence is a common model: teams own risk, a governance function oversees it and independent audit assures it. Use internal audit findings to improve, and track actions to closure.",
          ],
          points: [
            "Collect evidence continuously, not only before audits.",
            "Test that controls actually operate.",
            "Track findings to closure.",
          ],
        },
        {
          id: "governance-metrics",
          title: "Metrics and reporting",
          minutes: 5,
          summary: "Tell leaders how well AI risk is managed.",
          body: [
            "Useful indicators include the number of AI systems by risk level, share with completed assessments, open high risks, incident counts and time to resolve, training completion and vendor reviews overdue. Combine numbers with short narratives about emerging issues.",
            "Report regularly to senior leaders and the board in plain language, with clear decisions requested. Metrics should drive action, not decorate slides.",
          ],
          points: [
            "Track coverage, open risks, incidents and training.",
            "Add short narratives to numbers.",
            "Ask for decisions in every report.",
          ],
        },
        S.stakeholderComm,
      ],
    },
  ],
};
