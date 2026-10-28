import type { Roadmap } from "../../types";
import { S } from "../shared";

export const mlopsEngineer: Roadmap = {
  slug: "mlops-engineer",
  title: "MLOps Engineer",
  emoji: "🔁",
  description:
    "Build the platform that trains, ships, monitors and updates models reliably: pipelines, registries, serving, drift detection and cost control.",
  audience:
    "DevOps, platform and backend engineers, and ML engineers who want to run machine learning in production at scale.",
  tools: ["Linux", "Docker", "Kubernetes", "Terraform", "MLflow", "Airflow / Kubeflow / Prefect", "DVC", "Prometheus + Grafana"],
  outcomes: [
    "Automate the path from data and code to a deployed, versioned model.",
    "Serve models safely with canary releases, rollback and autoscaling.",
    "Monitor drift and quality, trigger retraining and control cost and risk.",
  ],
  sections: [
    {
      id: "foundations",
      title: "Engineering foundations",
      topics: [
        S.pythonEssentials,
        {
          id: "linux-shell",
          title: "Linux and the shell",
          minutes: 6,
          summary: "Navigate, script and debug on servers.",
          body: [
            "Most ML infrastructure runs on Linux. Learn the file system, permissions, processes, package managers, environment variables, SSH, pipes and basic shell scripting. Know how to read logs, check disk and memory, and find what is using a GPU.",
            "Automate repeated tasks with scripts, but keep them small and in version control. Understanding the shell makes containers, CI and Kubernetes much easier to debug.",
          ],
          points: [
            "Learn files, permissions, processes, SSH and pipes.",
            "Know how to inspect logs, memory, disk and GPUs.",
            "Keep scripts small and versioned.",
          ],
        },
        S.gitGithub,
        S.cloudBasics,
        S.docker,
        S.mlFundamentals,
      ],
    },
    {
      id: "lifecycle",
      title: "The ML lifecycle",
      topics: [
        {
          id: "mlops-lifecycle",
          title: "What MLOps is and the maturity levels",
          minutes: 7,
          summary: "Applying DevOps ideas to data, models and code.",
          body: [
            "MLOps manages the full lifecycle: data collection and validation, experimentation, training, evaluation, deployment, monitoring and retraining. It differs from classic DevOps because behaviour depends on data as well as code, so you version and test three things: code, data and models.",
            "Maturity often moves from manual (notebooks and hand-deployed models) to automated training pipelines, to full CI/CD and continuous training with monitoring. Move up step by step, based on the number of models and the business risk.",
          ],
          points: [
            "Version and test code, data and models.",
            "Maturity grows from manual to automated to continuous.",
            "Match investment to model count and risk.",
          ],
        },
        {
          id: "data-versioning",
          title: "Data versioning and validation",
          minutes: 7,
          summary: "Know exactly which data trained which model.",
          body: [
            "Tools such as DVC, lakehouse table formats with time travel or snapshot tables let you reproduce the dataset behind any model. Store pointers to data versions with each experiment. Large raw files stay in object storage; Git tracks the small metadata files.",
            "Add automated data checks to pipelines: schema, ranges, missing values, duplicate rows and distribution shifts. Fail early with a clear message instead of training on corrupted data.",
          ],
          points: [
            "Link each model to an exact data version.",
            "Keep big data in object storage, pointers in Git.",
            "Validate schema and distributions automatically.",
          ],
        },
        S.experimentTracking,
        {
          id: "model-registry",
          title: "Model registry and lineage",
          minutes: 6,
          summary: "A catalogue of models, versions, stages and approvals.",
          body: [
            "A registry stores each model version with its metrics, the code and data that produced it, its dependencies and a stage such as staging or production. Deployment pulls from the registry, never from a laptop. Promotions need checks and sometimes human approval.",
            "Lineage lets you answer 'what is running, who approved it and how was it trained?' It supports rollback, audits and incident investigation. Add model cards or metadata fields for owners and intended use.",
          ],
          points: [
            "Deploy only registered, versioned models.",
            "Promotion requires passing checks and approvals.",
            "Lineage supports rollback and audits.",
          ],
        },
      ],
    },
    {
      id: "automation",
      title: "Pipelines and automation",
      topics: [
        {
          id: "orchestration",
          title: "Workflow orchestration",
          minutes: 7,
          summary: "Schedule and run multi-step pipelines reliably.",
          body: [
            "Orchestrators such as Airflow, Prefect, Dagster and Kubeflow Pipelines define a workflow as a graph of tasks with dependencies, schedules, retries and logs. Typical steps: ingest, validate, build features, train, evaluate, register and deploy.",
            "Make tasks idempotent and small, pass references to data instead of the data itself, set retries and alerts, and keep pipeline code in version control and tested. Parameterise runs so backfills and re-runs are easy.",
          ],
          points: [
            "Pipelines are graphs of tasks with retries and alerts.",
            "Tasks should be small and idempotent.",
            "Parameterise runs for backfills.",
          ],
        },
        {
          id: "feature-stores",
          title: "Feature stores and training-serving skew",
          minutes: 7,
          summary: "Compute features once and use them the same way everywhere.",
          body: [
            "Training-serving skew happens when features are computed differently in training and in production, silently hurting accuracy. A feature store defines each feature once, stores historical values for training (offline) and fresh values for low-latency lookup (online), with point-in-time correctness so training never sees the future.",
            "Not every team needs one. For few models, shared code and tests may be enough. Consider a store when many models reuse features or when real-time features are critical.",
          ],
          points: [
            "Skew comes from different feature code in training and serving.",
            "Stores provide offline and online access with point-in-time correctness.",
            "Adopt one when reuse or real-time needs justify it.",
          ],
        },
        S.cicd,
        {
          id: "continuous-training",
          title: "Continuous training and retraining",
          minutes: 7,
          summary: "Refresh models on a schedule or on triggers.",
          body: [
            "Models decay as the world changes. Retrain on a schedule (weekly), on new data volume, or when monitoring shows drift or a quality drop. The pipeline should train, compare the candidate with the current model on a fixed evaluation set and promote it only if it is better and safe.",
            "Automate the safe parts, keep humans in the loop for high-risk models and always retain the ability to roll back. Retraining without checks can bake in new bugs or biased data.",
          ],
          points: [
            "Trigger retraining by schedule, data volume or drift.",
            "Promote only after beating the current model.",
            "Keep rollback and human approval for risky models.",
          ],
        },
        {
          id: "infrastructure-as-code",
          title: "Infrastructure as code",
          minutes: 6,
          summary: "Describe infrastructure in versioned files.",
          body: [
            "Tools like Terraform describe networks, clusters, storage and permissions in code, which you review, test and apply repeatedly. This makes environments reproducible (dev, staging, production) and changes auditable. Keep state in a secure remote backend and avoid manual console edits.",
            "Modularise common pieces, separate environments, manage secrets in a secret manager and run plans in CI so reviewers see the effect before it is applied.",
          ],
          points: [
            "Infrastructure in code is reviewable and repeatable.",
            "Protect state and secrets; avoid manual changes.",
            "Run plans in CI before applying.",
          ],
        },
      ],
    },
    {
      id: "serving",
      title: "Serving and scaling",
      topics: [
        {
          id: "kubernetes",
          title: "Kubernetes essentials",
          minutes: 8,
          summary: "Pods, deployments, services, autoscaling and GPUs.",
          body: [
            "Kubernetes runs containers across machines. Learn the core objects: pods, deployments (desired state and rolling updates), services (stable network names), config maps and secrets, ingress for external traffic, and resource requests and limits. Horizontal autoscaling adds replicas as load grows.",
            "For ML, learn GPU scheduling, node pools, readiness and liveness probes so traffic reaches only ready models, and namespaces with quotas to share a cluster fairly. Debug with describe, logs and events.",
          ],
          points: [
            "Core objects: pods, deployments, services, config, ingress.",
            "Set resource requests and limits; autoscale replicas.",
            "Use probes and GPU scheduling for model workloads.",
          ],
        },
        {
          id: "model-serving-infra",
          title: "Model serving patterns",
          minutes: 8,
          summary: "Online, batch and streaming; canary, shadow and A/B releases.",
          body: [
            "Choose a serving pattern by need: online APIs for low latency, batch jobs for large scheduled scoring, and streaming for event-driven predictions. Model servers add batching, versioning, metrics and multi-model hosting. Package models in a standard format and test the image.",
            "Release safely: shadow mode sends real traffic to a new model without using its answers, canary sends a small share to it, and A/B tests compare outcomes. Watch latency, errors and quality, and be ready to roll back in minutes.",
          ],
          points: [
            "Online, batch and streaming suit different needs.",
            "Shadow, canary and A/B releases reduce risk.",
            "Practise rollback before you need it.",
          ],
        },
        {
          id: "llmops",
          title: "LLMOps",
          minutes: 8,
          summary: "Operating prompts, retrieval and large models.",
          body: [
            "LLM systems add new assets to manage: prompts, retrieval indexes, model versions, evaluation sets and guardrail configuration. Version them, gate releases on evaluation results and trace each request across retrieval, tools and model calls. A gateway centralises keys, rate limits, caching, fallbacks and cost tracking.",
            "Self-hosted models need GPU capacity planning, an inference server and autoscaling by queue depth. Monitor token usage, latency, refusal and failure rates, and sampled quality scores. Protect against prompt injection and data leakage as part of operations.",
          ],
          points: [
            "Version prompts, indexes and evaluation sets with code.",
            "Use a gateway for keys, limits, caching and fallbacks.",
            "Trace requests and monitor tokens, latency and quality.",
          ],
        },
      ],
    },
    {
      id: "monitoring",
      title: "Monitoring and incident response",
      topics: [
        S.monitoring,
        {
          id: "drift-detection",
          title: "Drift and quality monitoring",
          minutes: 8,
          summary: "Detect data drift, concept drift and silent degradation.",
          body: [
            "Data drift means input distributions change; concept drift means the relationship between inputs and the answer changes. Compare production data with training data using tests such as the population stability index or Kolmogorov-Smirnov, track prediction distributions and, when labels arrive later, compute real accuracy.",
            "Drift is a signal, not always a problem. Set thresholds that avoid alert fatigue, link alerts to a runbook and decide in advance whether the response is investigation, retraining or rollback.",
          ],
          points: [
            "Data drift changes inputs; concept drift changes the mapping.",
            "Use PSI or KS tests and track predictions and delayed labels.",
            "Tie alerts to a runbook and a decision.",
          ],
          example: {
            title: "Population stability index",
            language: "python",
            code: `import numpy as np


def psi(expected, actual, bins=10):
    edges = np.quantile(expected, np.linspace(0, 1, bins + 1))
    edges[0], edges[-1] = -np.inf, np.inf
    e = np.histogram(expected, edges)[0] / len(expected)
    a = np.histogram(actual, edges)[0] / len(actual)
    e, a = np.clip(e, 1e-6, None), np.clip(a, 1e-6, None)
    return float(np.sum((a - e) * np.log(a / e)))`,
          },
        },
        {
          id: "incidents-rollback",
          title: "Incidents, SLOs and rollback",
          minutes: 6,
          summary: "Define reliability targets and respond calmly.",
          body: [
            "Service level objectives (SLOs) set targets such as 99.5% of requests under 300 ms and a minimum quality score. Error budgets show how much unreliability is acceptable and guide release decisions. Alert on user impact and on budget burn.",
            "Prepare runbooks for common failures: bad model release, data pipeline outage, feature store lag and GPU shortages. During incidents, restore service first (roll back or fall back to a simple model), then investigate and write a blameless post-incident review.",
          ],
          points: [
            "SLOs and error budgets guide reliability decisions.",
            "Runbooks cover predictable failures.",
            "Roll back first; investigate afterwards.",
          ],
        },
      ],
    },
    {
      id: "governance-cost",
      title: "Security, cost and governance",
      topics: [
        {
          id: "ml-security",
          title: "Securing the ML supply chain",
          minutes: 7,
          summary: "Protect data, models, dependencies and secrets.",
          body: [
            "Threats include leaked secrets, vulnerable dependencies, tampered model files, over-broad access and poisoned training data. Scan images and dependencies, pin versions, sign and verify artefacts, and be careful with model formats that can run code when loaded. Use secret managers and short-lived credentials.",
            "Apply least privilege to data, pipelines and registries, separate environments and audit access. Encrypt data in transit and at rest and log who changed or deployed what.",
          ],
          points: [
            "Scan, pin and sign dependencies and artefacts.",
            "Treat untrusted model files as potentially executable.",
            "Least privilege, encryption and audit logs.",
          ],
        },
        {
          id: "finops-gpu",
          title: "Cost control and GPU efficiency",
          minutes: 6,
          summary: "Pay only for the compute you really need.",
          body: [
            "GPUs are expensive. Tag every resource by team and project, set budgets and alerts, shut down idle notebooks and clusters, and use autoscaling. Use spot or preemptible machines for fault-tolerant training with checkpoints, and reserved capacity for steady serving load.",
            "Raise utilisation with batching, smaller or quantised models, mixed precision and right-sized instances. Report cost per training run and cost per 1,000 predictions so teams can see the effect of their choices.",
          ],
          points: [
            "Tag, budget and alert on spending.",
            "Use spot capacity with checkpoints for training.",
            "Report cost per run and per 1,000 predictions.",
          ],
        },
        S.responsibleAi,
        S.aiRegulation,
      ],
    },
  ],
};
