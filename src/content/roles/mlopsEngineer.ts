import type { Roadmap } from "../../types";
import { S } from "../shared";

export const mlopsEngineer: Roadmap = {
  slug: "mlops-engineer",
  title: "MLOps & LLMOps Platform Engineer",
  emoji: "🔁",
  description:
    "Architect and operate the production infrastructure that trains, versions, deploys, serves, and monitors ML and LLM systems at scale—following the canonical roadmap.sh MLOps curriculum across Linux, Docker/Kubernetes, Terraform, Spark/Kafka/Feast feature stores, MLflow, Airflow/Dagster/Ray, Triton/vLLM serving, and drift observability.",
  audience:
    "DevOps, platform, infrastructure, and ML engineers building reliable, reproducible training and inference platforms across cloud and GPU clusters.",
  tools: [
    "Linux, Bash, Docker & Kubernetes (NVIDIA GPU Operator)",
    "Terraform & Cloud ML (SageMaker, Vertex AI, Azure ML)",
    "Apache Spark, Kafka, DVC & Feast Feature Store",
    "MLflow, Weights & Biases & Model Registries",
    "Airflow, Dagster, Kubeflow Pipelines & Ray",
    "Triton Inference Server, vLLM, ONNX & KServe",
    "Prometheus, Grafana, Evidently & OpenTelemetry",
  ],
  outcomes: [
    "Automate the Code + Data + Model triad with DVC/Lakehouse data versioning, Feast feature stores, MLflow registries, and CI/CD/CT pipelines.",
    "Provision GPU Kubernetes clusters with Terraform and serve models via Triton, KServe, and vLLM using shadow, canary, and blue-green rollouts.",
    "Monitor production latency, GPU saturation, data/concept drift (PSI/KS), and delayed ground-truth accuracy with automated rollback and GPU FinOps.",
  ],
  sections: [
    {
      id: "mlops-foundations-infra",
      title: "1. MLOps Foundations, Linux Systems & Cloud Infrastructure",
      topics: [
        {
          id: "mlops-lifecycle",
          title: "MLOps Principles, Maturity Levels (0–2) & The Code-Data-Model Triad",
          minutes: 7,
          summary: "Understand Google's MLOps maturity framework (Level 0 Manual, Level 1 Automated CT, Level 2 Full CI/CD/CT) and reproducibility contracts.",
          body: [
            "Traditional DevOps versions and tests deterministic source code. MLOps must version, validate, and govern three coupled artifacts simultaneously: **Code** (training scripts, feature logic, serving configs), **Data** (training snapshots, schemas, feature distributions), and **Models** (weights, hyperparameters, tokenizers, evaluation metrics).",
            "Industry maturity progresses across three stages: **Level 0** (manual Jupyter notebooks and hand-copied model files), **Level 1** (automated training pipelines and continuous training triggered by fresh data or drift), and **Level 2** (automated CI/CD for pipeline code + automated Continuous Training, validation gates, model registry promotion, canary serving, and drift triggers).",
          ],
          points: [
            "Every production prediction must trace back to an immutable Git SHA, data snapshot hash, and registered model version.",
            "Advance from Level 0 to Level 1 by automating the training pipeline before over-engineering complex cluster tooling.",
            "Treat silent accuracy decay from shifting real-world data as a first-class operational failure mode.",
          ],
        },
        {
          id: "linux-shell",
          title: "Linux Systems, Bash Scripting, Networking & GPU Diagnostics",
          minutes: 7,
          summary: "Debug Linux processes, systemd services, CUDA/NVIDIA drivers (`nvidia-smi`, DCGM), and network sockets.",
          body: [
            "All serious ML training and inference infrastructure runs on Linux. Master filesystem permissions, process management, POSIX shell scripting, SSH tunneling, TCP/DNS/gRPC networking, and cgroups memory limits.",
            "On GPU nodes, inspect NVIDIA driver and CUDA runtime compatibility, monitor SM occupancy, VRAM allocation, NVLink bandwidth, and thermal throttling using `nvidia-smi`, `nvtop`, and NVIDIA Data Center GPU Manager (DCGM) exporters.",
          ],
          points: [
            "Use `nvidia-smi dmon` and DCGM metrics to distinguish GPU compute saturation from CPU DataLoader bottlenecks.",
            "Write strict Bash scripts (`set -euo pipefail`) for container entrypoints and health checks.",
            "Understand CUDA driver compatibility between host kernel modules and containerized CUDA runtime libraries.",
          ],
        },
        S.docker,
        {
          id: "infrastructure-as-code",
          title: "Cloud ML Platforms & Infrastructure as Code (Terraform, AWS/GCP/Azure)",
          minutes: 7,
          summary: "Provision reproducible VPCs, object storage, IAM roles, and managed GPU node pools with Terraform.",
          body: [
            "Never provision production GPU clusters, S3/GCS buckets, or IAM roles by clicking through cloud consoles. Use **Terraform** (or OpenTofu/Pulumi) to codify VPC networks, object storage lifecycle policies, artifact registries, managed Kubernetes clusters (EKS, GKE, AKS), and cloud ML services (AWS SageMaker, GCP Vertex AI, Azure ML).",
            "Store Terraform state in an encrypted remote backend with state locking, separate `dev` / `staging` / `prod` workspaces, and run `terraform plan` automatically in pull requests.",
          ],
          points: [
            "Manage all cloud storage, IAM least-privilege roles, and GPU node groups declaratively in Terraform.",
            "Use multi-stage Docker builds and distroless/slim base images to keep ML container images small and fast to pull.",
            "Cache heavy CUDA/PyTorch base layers in regional container registries close to your GPU nodes to avoid 10-minute cold starts.",
          ],
        },
      ],
    },
    {
      id: "data-engineering-feature-stores",
      title: "2. Data Pipelines, Versioning, Validation & Feature Stores",
      topics: [
        {
          id: "data-versioning",
          title: "Batch/Streaming Data Pipelines (Spark, Kafka), DVC & Lakehouse Versioning",
          minutes: 8,
          summary: "Ingest data via Spark and Kafka, version datasets with DVC or Delta/Iceberg time travel, and enforce schema contracts.",
          body: [
            "ML platforms ingest features from both batch data lakes (**Apache Spark**, Snowflake, BigQuery) and real-time event streams (**Apache Kafka**, Redpanda, Flink). To guarantee training reproducibility, version large datasets using **DVC (Data Version Control)** content-addressed pointers in Git or open lakehouse table formats (**Apache Iceberg**, **Delta Lake**, **Hudi**) that support cryptographic snapshot isolation and time-travel queries.",
            "Gate every pipeline stage with automated data validation (**Great Expectations**, **Pandera**, **Soda**): halt execution immediately if upstream column schemas change, null rates spike, or primary keys duplicate.",
          ],
          points: [
            "Query immutable Delta Lake / Apache Iceberg snapshots (`VERSION AS OF`) or DVC hashes so any historical model can be retrained bit-for-bit.",
            "Fail pipelines at the ingestion boundary when Pandera or Great Expectations schema assertions break.",
            "Separate raw immutable landing zones (Bronze) from validated, deduplicated tables (Silver) and ML feature tables (Gold).",
          ],
        },
        {
          id: "feature-stores",
          title: "Feature Stores (Feast, Tecton) & Eliminating Training-Serving Skew",
          minutes: 8,
          summary: "Define features once and serve offline point-in-time historical training joins alongside sub-10ms online Redis/DynamoDB lookups.",
          body: [
            "**Training-Serving Skew** occurs when a feature (such as `user_30d_fraud_rate`) is written in SQL/Spark for offline model training and rewritten in Python/Java for real-time online inference—subtle differences in null handling or window boundaries silently destroy production accuracy.",
            "A **Feature Store** (such as **Feast** or Tecton) provides a single declarative feature definition backed by dual storage: an **Offline Store** (Snowflake/BigQuery/Parquet) that performs point-in-time correct historical joins for training without future data leakage, and an **Online Store** (Redis, DynamoDB, Cassandra) synchronized via batch materialization or Kafka/Flink streams for $<10\\text{ms}$ inference lookups.",
          ],
          points: [
            "Use point-in-time (`AS OF`) entity joins when generating training sets so historical labels never see future feature updates.",
            "Materialize hot features to an in-memory Online Store (Redis/DynamoDB) to meet strict real-time p99 latency SLAs.",
            "Monitor online feature staleness so delayed streaming pipelines trigger alerts before models score on stale state.",
          ],
        },
      ],
    },
    {
      id: "tracking-orchestration-cicd",
      title: "3. Experiment Tracking, Orchestration, Ray & Continuous Training",
      topics: [
        S.experimentTracking,
        {
          id: "model-registry",
          title: "Model Registry, Artifact Lineage & Supply Chain Security",
          minutes: 7,
          summary: "Govern model promotion stages (`Staging`, `Champion`, `Challenger`) in MLflow with signed artifacts and lineage metadata.",
          body: [
            "The **Model Registry** (MLflow Model Registry, Weights & Biases, Vertex/SageMaker Registry) is the single source of truth linking trained model weights to the exact Git commit, dataset snapshot, evaluation report, and approval sign-off. Production serving infrastructure must pull exclusively from approved registry aliases (`@champion`, `@challenger`)—never from ad-hoc S3 paths.",
            "Secure the ML supply chain: prefer `safetensors` or ONNX over arbitrary Python `pickle` files (which execute arbitrary code on load), scan container vulnerabilities, and sign model artifacts.",
          ],
          points: [
            "Promote models via immutable registry aliases (`@champion`, `@challenger`) rather than mutable file paths.",
            "Ban untrusted `.pkl` / `torch.load(..., weights_only=False)` artifacts in favour of `safetensors` and ONNX.",
            "Attach automated evaluation scorecards and Model Cards as required metadata before registry promotion.",
          ],
        },
        {
          id: "orchestration",
          title: "Workflow Orchestration (Airflow, Dagster, Kubeflow) & Distributed Compute with Ray",
          minutes: 8,
          summary: "Orchestrate DAGs with Dagster/Airflow/Kubeflow and scale distributed Python data prep, training, and tuning on Ray clusters.",
          body: [
            "Production ML pipelines require a workflow orchestrator (**Dagster** asset graphs, **Apache Airflow**, **Prefect**, or **Kubeflow Pipelines / Flyte** on Kubernetes) to schedule dependencies, manage retries, pass typed artifact references, and alert on SLA misses.",
            "For compute-intensive distributed workloads across multi-node GPU clusters, **Ray** (`Ray Data`, `Ray Train`, `Ray Tune`, `Ray Serve`) unifies streaming data preprocessing, multi-node PyTorch DistributedDataParallel/FSDP training, and distributed hyperparameter search without glue scripts.",
          ],
          points: [
            "Never pass multi-gigabyte DataFrames through orchestrator metadata databases; pass immutable object-storage URIs between tasks.",
            "Use asset-centric orchestration (Dagster / Flyte) to track data and model lineage across pipeline steps.",
            "Use Ray Data + Ray Train to stream pre-processed shards directly from S3 to GPU workers without bottlenecking disk.",
          ],
        },
        S.cicd,
        {
          id: "continuous-training",
          title: "CI/CD for ML & Automated Continuous Training (CT) Gates",
          minutes: 7,
          summary: "Automate unit tests, data checks, and Challenger-vs-Champion shadow evaluation before promoting retrained models.",
          body: [
            "CI/CD for ML extends standard software CI with three automated gates: (1) **Code CI**—unit tests on feature transforms, serializer round-trips, and a fast 1-batch smoke training test; (2) **Data & Pipeline Validation**—schema and distribution checks on fresh training slices; and (3) **Model Evaluation Gate**—comparing the newly trained Challenger model against the current Production Champion on both a fixed Golden Test Set and critical subgroup slices.",
            "Continuous Training (CT) triggers this pipeline automatically on a schedule, upon new labeled data volume, or when drift monitors breach thresholds—promoting the candidate only if it beats the Champion without regressing latency or fairness slices.",
          ],
          points: [
            "Block model promotion in CI if the Challenger regresses on any protected subgroup slice, even if overall AUC improves.",
            "Benchmark inference latency (p50/p99) and memory footprint automatically inside the model validation gate.",
            "Always retain one-command rollback to the previous `@champion` registry version.",
          ],
        },
      ],
    },
    {
      id: "kubernetes-serving-llmops",
      title: "4. Kubernetes GPU Serving, Inference Servers & LLMOps",
      topics: [
        {
          id: "kubernetes",
          title: "Kubernetes for ML: GPU Node Pools, NVIDIA Device Plugin, MIG & Autoscaling",
          minutes: 8,
          summary: "Run GPU workloads on Kubernetes with taints/tolerations, Multi-Instance GPU (MIG), KEDA autoscaling, and readiness probes.",
          body: [
            "Running ML on **Kubernetes** requires configuring the NVIDIA GPU Operator / Device Plugin, scheduling pods onto dedicated GPU node pools via Node Affinity and Taints/Tolerations, and partitioning large GPUs (A100/H100) using **Multi-Instance GPU (MIG)** or time-slicing for smaller models.",
            "Because CPU utilization is a poor proxy for GPU inference saturation, autoscale inference deployments using **KEDA** or Prometheus custom metrics based on request queue depth, in-flight batch size, or KV-cache utilization—and configure `startupProbe` / `readinessProbe` timeouts to allow for large model weight loading.",
          ],
          points: [
            "Use `startupProbe` with generous thresholds so Kubernetes does not restart pods while loading 40GB+ model weights.",
            "Autoscale GPU inference pods on request queue depth or KV-cache saturation via KEDA rather than CPU percentage.",
            "Use NVIDIA MIG to slice an H100/A100 into isolated hardware instances when serving smaller embedding or reranker models.",
          ],
        },
        {
          id: "model-serving-infra",
          title: "High-Performance Serving: Triton, KServe, ONNX/TensorRT & Safe Rollouts",
          minutes: 8,
          summary: "Serve models over gRPC/REST with dynamic batching in Triton/KServe, and release via Shadow, Canary, and Blue-Green patterns.",
          body: [
            "Wrapping a model in a naive single-request Python web server wastes 80% of GPU compute. Dedicated model servers like **NVIDIA Triton Inference Server**, **KServe**, **BentoML**, and **Ray Serve** provide **Dynamic Batching** (grouping concurrent incoming requests over a 2–5ms window into a single GPU tensor batch), concurrent model execution, model ensembles, and native gRPC/HTTP endpoints.",
            "De-risk production rollouts using progressive delivery: **Shadow (Dark) Mode** forks live production traffic asynchronously to the Challenger model and logs predictions without returning them to users; **Canary Rollouts** shift 1% → 10% → 50% → 100% of traffic via Istio/Envoy while monitoring error budgets.",
          ],
          points: [
            "Enable Dynamic Batching in Triton / Ray Serve to multiply GPU throughput 4x–10x under concurrent load.",
            "Use gRPC with Protobuf tensors instead of JSON-over-HTTP for high-throughput embedding, vision, or ranking microservices.",
            "Run every major new model in Shadow Mode on live traffic before routing user-facing decisions to it.",
          ],
        },
        {
          id: "llmops",
          title: "LLMOps: AI Gateways, Prompt/Index Versioning, vLLM Serving & Token FinOps",
          minutes: 8,
          summary: "Operate foundation models and RAG in production: centralized AI gateways, semantic caching, vLLM clusters, and prompt lineage.",
          body: [
            "**LLMOps** extends MLOps to generative pipelines where behavior is governed by model weights, versioned prompt templates, embedding models, vector index snapshots, and guardrail policies. Place a centralized **AI Gateway** (LiteLLM, Envoy AI Gateway, Portkey, Cloudflare) in front of all commercial and self-hosted vLLM/SGLang endpoints to enforce per-team virtual API keys, token rate limits, automatic provider failover, and semantic/prefix caching.",
            "Version vector indexes with zero-downtime blue-green alias swaps whenever chunking or embedding models change, and run continuous online LLM-as-a-Judge evaluation on a 1–5% sample of production traces.",
          ],
          points: [
            "Route all LLM traffic through an AI Gateway for unified cost attribution, rate limiting, and instant multi-provider failover.",
            "Never mutate a live vector index in-place when changing embedding models; build a new index and swap the alias atomically.",
            "Sample 1–5% of live production RAG traces for asynchronous faithfulness and hallucination scoring.",
          ],
        },
      ],
    },
    {
      id: "monitoring-drift-finops",
      title: "5. Production Observability, Drift Detection, SLOs & GPU FinOps",
      topics: [
        S.monitoring,
        {
          id: "drift-detection",
          title: "Data Drift, Concept Drift (PSI, KS-Test, Evidently) & Delayed Ground Truth",
          minutes: 8,
          summary: "Detect input covariate shift, prediction distribution shift, and concept drift using statistical tests and delayed label joins.",
          body: [
            "Production ML models fail silently without throwing HTTP 500 errors. Monitor three layers of statistical health: (1) **Data / Covariate Drift** ($P(X)$ shifts)—compare live feature distributions against the training baseline using the **Population Stability Index (PSI)**, **Kolmogorov-Smirnov (KS) test**, or Jensen-Shannon divergence via **Evidently / WhyLabs / Arize**; (2) **Prediction Drift** ($P(\\hat{Y})$ shifts)—sudden spikes in predicted positive rates or confidence collapse.",
            "(3) **Concept Drift** ($P(Y|X)$ shifts)—when user behavior or fraud tactics change so the same features mean something new. Join predictions with delayed ground-truth outcomes via a unique `prediction_id` to compute rolling live precision, recall, and calibration error.",
          ],
          points: [
            "Log a unique `prediction_id` and feature vector on every inference request so delayed ground-truth labels can be joined accurately.",
            "Alert on PSI > 0.25 on high-importance SHAP features rather than paging on every minor low-importance feature shift.",
            "Track calibration drift alongside raw prediction averages.",
          ],
          example: {
            title: "Compute Population Stability Index (PSI) for feature drift monitoring",
            language: "python",
            code: `import numpy as np

def calculate_psi(baseline: np.ndarray, live: np.ndarray, bins: int = 10) -> float:
    quantiles = np.linspace(0, 1, bins + 1)
    edges = np.quantile(baseline, quantiles)
    edges[0], edges[-1] = -np.inf, np.inf
    expected_pct = np.histogram(baseline, bins=edges)[0] / len(baseline)
    actual_pct = np.histogram(live, bins=edges)[0] / len(live)
    expected_pct = np.clip(expected_pct, 1e-6, None)
    actual_pct = np.clip(actual_pct, 1e-6, None)
    return float(np.sum((actual_pct - expected_pct) * np.log(actual_pct / expected_pct)))`,
          },
        },
        {
          id: "incidents-rollback",
          title: "SLOs, Error Budgets, Incident Runbooks & Automated Rollback",
          minutes: 6,
          summary: "Define latency and quality SLOs, build runbooks for pipeline and model incidents, and automate circuit-breaker fallbacks.",
          body: [
            "Define explicit Service Level Objectives (SLOs) covering availability (99.9%), tail latency (p99 < 150ms), feature freshness (<5 min lag), and rolling model quality. Prepare battle-tested runbooks for the four classic ML incidents: bad model promotion, broken upstream feature pipeline, GPU node exhaustion, and adversarial traffic spikes.",
            "Always wire an automated fallback—either rolling back the registry alias to the previous `@champion` model or degrading gracefully to a fast deterministic heuristic—so customer workflows stay up while engineers investigate.",
          ],
          points: [
            "Restore service first via instant registry alias rollback or heuristic fallback; perform root-cause analysis second.",
            "Include feature freshness lag and prediction NaN/null rates in your primary paging alerts.",
            "Run quarterly game-day drills simulating an upstream schema break and a bad canary model rollout.",
          ],
        },
        {
          id: "finops-gpu",
          title: "GPU FinOps, Spot Training Checkpointing & Unit Cost Optimization",
          minutes: 6,
          summary: "Cut cloud GPU spend by 50–70% using spot instances with checkpointing, quantization, autoscaling to zero, and unit-cost attribution.",
          body: [
            "GPU clusters are often the single largest line item in an AI engineering budget. Enforce FinOps discipline: tag every training job and inference pod by team and feature; run fault-tolerant training and batch scoring on **Spot / Preemptible GPUs** (60–70% cheaper) with frequent async checkpointing to object storage; and reap idle interactive Jupyter notebooks automatically after 30 minutes of inactivity.",
            "Track and report **Cost per 1,000 Predictions** and **Cost per 1M Tokens** alongside accuracy so engineering teams optimize model size, quantization (FP8/INT4), and batching for unit economics.",
          ],
          points: [
            "Use Spot/Preemptible GPUs with automated SIGTERM checkpoint handlers for training and offline batch jobs.",
            "Auto-suspend idle dev notebooks and scale staging GPU endpoints to zero outside business hours.",
            "Publish weekly unit-economics dashboards showing GPU utilization (SM occupancy) and cost per 1,000 inferences.",
          ],
        },
      ],
    },
  ],
};
