import type { EcosystemPortal, MncResource, YoutubeCourse } from "./deepDiveEngine";

export interface TopicCuratedResources {
  mncCourses: MncResource[];
  youtubeVideos: YoutubeCourse[];
  portals: EcosystemPortal[];
}

export const TOPIC_RESOURCES: Record<string, TopicCuratedResources> = {
  "python-essentials": {
    mncCourses: [
      { org: "Google", title: "Google's Python Class", type: "Free Course", url: "https://developers.google.com/edu/python", duration: "14 hrs" },
      { org: "DeepLearning.AI", title: "AI Python for Beginners (Andrew Ng)", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/ai-python-for-beginners/", duration: "4 hrs" },
      { org: "Microsoft", title: "Python for Beginners — Microsoft Learn", type: "Certification Path", url: "https://learn.microsoft.com/en-us/training/paths/beginner-python/", duration: "5.5 hrs" },
    ],
    youtubeVideos: [
      { creator: "Programming with Mosh (Mosh Hamedani)", channelBadge: "4M+ Subs · Python Classic", title: "Python Full Course for Beginners", duration: "6h 14m", url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc", whyWatch: "Crystal-clear end-to-end Python masterclass covering syntax, functions, classes, and packages." },
      { creator: "Corey Schafer", channelBadge: "Python Engineering", title: "Python Tutorials: Venv, Type Hints, Async & Pytest", duration: "Playlist", url: "https://www.youtube.com/@coreyms", whyWatch: "Teaches the real-world virtual environment, testing, and debugging habits teams expect." },
    ],
    portals: [
      { name: "DataCamp — Python Fundamentals", category: "Interactive Platform", description: "Interactive in-browser coding exercises for Python, Pandas, and APIs.", url: "https://www.datacamp.com/tracks/python-fundamentals" },
    ],
  },

  "git-github": {
    mncCourses: [
      { org: "Microsoft", title: "Introduction to Git & GitHub — Microsoft Learn", type: "Free Course", url: "https://learn.microsoft.com/en-us/training/paths/intro-to-vc-git/", duration: "3 hrs" },
      { org: "Google", title: "Introduction to Git and GitHub (Google on Coursera)", type: "Certification Path", url: "https://www.coursera.org/learn/introduction-git-github", duration: "16 hrs" },
    ],
    youtubeVideos: [
      { creator: "Programming with Mosh (Mosh Hamedani)", channelBadge: "4M+ Subs", title: "Git and GitHub for Beginners — Crash Course", duration: "1h 08m", url: "https://www.youtube.com/watch?v=8JJ101D3knE", whyWatch: "Step-by-step visual guide to commits, branches, merges, and pull requests." },
      { creator: "freeCodeCamp.org", channelBadge: "Complete Guide", title: "Git and GitHub for Beginners — Crash Course", duration: "1h 08m", url: "https://www.youtube.com/watch?v=RGOj5yH7evk", whyWatch: "Hands-on walkthrough of daily branching, PR reviews, and resolving merge conflicts." },
    ],
    portals: [
      { name: "GitHub Skills (Official Interactive Labs)", category: "Interactive Platform", description: "Official interactive courses inside GitHub repositories for branching, PRs, and Actions.", url: "https://skills.github.com/" },
      { name: "Learn Git Branching", category: "Sandbox", description: "Visual interactive sandbox for practicing Git branches, rebasing, and merging in your browser.", url: "https://learngitbranching.js.org/" },
    ],
  },

  "sql-basics": {
    mncCourses: [
      { org: "Google", title: "Google Data Analytics: Foundations of SQL & BigQuery", type: "Certification Path", url: "https://cloud.google.com/bigquery/docs/introduction-sql", duration: "4 hrs" },
      { org: "Microsoft", title: "Get Started Querying with Transact-SQL — Microsoft Learn", type: "Free Course", url: "https://learn.microsoft.com/en-us/training/paths/get-started-querying-with-transact-sql/", duration: "4.5 hrs" },
    ],
    youtubeVideos: [
      { creator: "Programming with Mosh (Mosh Hamedani)", channelBadge: "4M+ Subs", title: "SQL Course for Beginners (Full MySQL / SQL Tutorial)", duration: "3h 10m", url: "https://www.youtube.com/watch?v=7S_tz1z_5bA", whyWatch: "Covers SELECT, WHERE, JOINs, GROUP BY, and subqueries with realistic business tables." },
    ],
    portals: [
      { name: "DataCamp — SQL Fundamentals", category: "Interactive Platform", description: "Interactive SQL query challenges covering joins, window functions, and aggregations.", url: "https://www.datacamp.com/tracks/sql-fundamentals" },
      { name: "SQLBolt", category: "Interactive Platform", description: "Free interactive lessons and exercises to learn SQL right in your browser.", url: "https://sqlbolt.com/" },
    ],
  },

  "apis-http": {
    mncCourses: [
      { org: "Microsoft", title: "Build RESTful APIs & Consume HTTP Services — Microsoft Learn", type: "Free Course", url: "https://learn.microsoft.com/en-us/training/modules/explore-api-management/", duration: "2 hrs" },
      { org: "OpenAI", title: "OpenAI API Reference & Rate Limit Best Practices", type: "Official Guide", url: "https://platform.openai.com/docs/guides/rate-limits", duration: "45 min" },
    ],
    youtubeVideos: [
      { creator: "freeCodeCamp.org", channelBadge: "API Fundamentals", title: "APIs for Beginners — How to use an API (Full Course)", duration: "3h 07m", url: "https://www.youtube.com/watch?v=WXsD0ZgxjRw", whyWatch: "Explains HTTP methods, status codes, headers, authentication, and JSON payloads clearly." },
    ],
    portals: [
      { name: "FastAPI Official Tutorial", category: "Interactive Platform", description: "Step-by-step guide to building typed, async REST APIs in Python with automatic OpenAPI docs.", url: "https://fastapi.tiangolo.com/tutorial/" },
    ],
  },

  "ml-fundamentals": {
    mncCourses: [
      { org: "DeepLearning.AI", title: "Machine Learning Specialization (Andrew Ng & Stanford)", type: "Certification Path", url: "https://www.deeplearning.ai/courses/machine-learning-specialization/", duration: "35 hrs" },
      { org: "Google", title: "Machine Learning Crash Course — Google Developers", type: "Free Course", url: "https://developers.google.com/machine-learning/crash-course", duration: "15 hrs" },
    ],
    youtubeVideos: [
      { creator: "StatQuest with Josh Starmer", channelBadge: "1.4M+ Subs · Visual ML", title: "A Gentle Introduction to Machine Learning & Cross-Validation", duration: "15m + Playlist", url: "https://www.youtube.com/watch?v=Gv9_4yMHFhI", whyWatch: "Builds crystal-clear intuition for bias-variance, overfitting, and train/validation/test splits." },
    ],
    portals: [
      { name: "Kaggle — Intro to Machine Learning", category: "Interactive Platform", description: "Free hands-on notebooks building your first supervised ML models.", url: "https://www.kaggle.com/learn/intro-to-machine-learning" },
      { name: "DataCamp — Machine Learning Fundamentals", category: "Interactive Platform", description: "Interactive scikit-learn courses for supervised and unsupervised learning.", url: "https://www.datacamp.com/" },
    ],
  },

  "data-preparation": {
    mncCourses: [
      { org: "Google", title: "Working with Numerical & Categorical Data — Google ML Crash Course", type: "Free Course", url: "https://developers.google.com/machine-learning/crash-course/numerical-data", duration: "3 hrs" },
    ],
    youtubeVideos: [
      { creator: "StatQuest with Josh Starmer", channelBadge: "Data Leakage & Features", title: "One-Hot Encoding, Standardization & Preventing Data Leakage", duration: "22m", url: "https://www.youtube.com/@statquest", whyWatch: "Explains why fitting scalers or imputers before splitting ruins real-world performance." },
    ],
    portals: [
      { name: "Kaggle — Feature Engineering & Data Cleaning", category: "Interactive Platform", description: "Free interactive notebooks on missing values, categorical encoding, and feature creation.", url: "https://www.kaggle.com/learn/feature-engineering" },
    ],
  },

  "evaluation-metrics": {
    mncCourses: [
      { org: "Google", title: "Classification: Accuracy, Recall, Precision, and ROC — Google ML", type: "Free Course", url: "https://developers.google.com/machine-learning/crash-course/classification", duration: "2 hrs" },
    ],
    youtubeVideos: [
      { creator: "StatQuest with Josh Starmer", channelBadge: "1.4M+ Subs", title: "Confusion Matrix, Sensitivity, Specificity, Precision, Recall & ROC/AUC", duration: "20m", url: "https://www.youtube.com/watch?v=4jRBRDbJemM", whyWatch: "The clearest explanation on the internet of ROC curves, AUC, and precision-recall trade-offs." },
    ],
    portals: [
      { name: "Scikit-Learn Model Evaluation Guide", category: "Interactive Platform", description: "Official reference and examples for every classification, regression, and ranking metric.", url: "https://scikit-learn.org/stable/modules/model_evaluation.html" },
    ],
  },

  "deep-learning": {
    mncCourses: [
      { org: "DeepLearning.AI", title: "Deep Learning Specialization (Andrew Ng)", type: "Certification Path", url: "https://www.deeplearning.ai/courses/deep-learning-specialization/", duration: "40 hrs" },
      { org: "NVIDIA", title: "Fundamentals of Deep Learning — NVIDIA DLI", type: "Certification Path", url: "https://www.nvidia.com/en-us/training/", duration: "8 hrs" },
      { org: "Stanford / MIT", title: "MIT 6.S191: Introduction to Deep Learning", type: "Free Course", url: "https://introtodeeplearning.com/", duration: "15 hrs" },
    ],
    youtubeVideos: [
      { creator: "3Blue1Brown (Grant Sanderson)", channelBadge: "6.8M+ Subs", title: "But what is a neural network? & Backpropagation Calculus", duration: "1h 05m", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi", whyWatch: "Unmatched visual animations of neurons, weights, gradient descent, and backpropagation." },
    ],
    portals: [
      { name: "TensorFlow Neural Network Playground", category: "Sandbox", description: "Tweak layers, activation functions, and learning rates live in your browser.", url: "https://playground.tensorflow.org/" },
    ],
  },

  "cloud-basics": {
    mncCourses: [
      { org: "AWS", title: "AWS Cloud Practitioner Essentials (Official)", type: "Free Course", url: "https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/", duration: "6 hrs" },
      { org: "Google", title: "Google Cloud Computing Foundations", type: "Free Course", url: "https://www.cloudskillsboost.google/paths/36", duration: "10 hrs" },
      { org: "Microsoft", title: "Microsoft Azure Fundamentals (AZ-900)", type: "Certification Path", url: "https://learn.microsoft.com/en-us/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/", duration: "5 hrs" },
    ],
    youtubeVideos: [
      { creator: "freeCodeCamp.org (Andrew Brown)", channelBadge: "Cloud Certification", title: "AWS Certified Cloud Practitioner Training Bootcamp", duration: "14h", url: "https://www.youtube.com/watch?v=SOTamWNgDKc", whyWatch: "Covers IAM, VPCs, EC2, S3, and cloud billing alerts from scratch." },
    ],
    portals: [],
  },

  "docker": {
    mncCourses: [
      { org: "Microsoft", title: "Introduction to Docker Containers — Microsoft Learn", type: "Free Course", url: "https://learn.microsoft.com/en-us/training/modules/intro-to-docker-containers/", duration: "1.5 hrs" },
    ],
    youtubeVideos: [
      { creator: "TechWorld with Nana", channelBadge: "1.2M+ Subs", title: "Docker Tutorial for Beginners (Full Practical Course)", duration: "2h 46m", url: "https://www.youtube.com/watch?v=3c-iBn73dDE", whyWatch: "Hands-on walkthrough of Dockerfiles, layer caching, volumes, networks, and Docker Compose." },
      { creator: "Programming with Mosh", channelBadge: "4M+ Subs", title: "Docker Tutorial for Beginners", duration: "1h 01m", url: "https://www.youtube.com/watch?v=pTFZFxd4hOI", whyWatch: "Fast, beginner-friendly introduction to containerizing applications." },
    ],
    portals: [
      { name: "Play with Docker", category: "Sandbox", description: "Free interactive browser lab to practice Docker commands without installing anything.", url: "https://labs.play-with-docker.com/" },
    ],
  },

  "ci-cd": {
    mncCourses: [
      { org: "Microsoft", title: "Automate Development Tasks by Using GitHub Actions", type: "Free Course", url: "https://learn.microsoft.com/en-us/training/paths/automate-workflow-github-actions/", duration: "3 hrs" },
      { org: "DeepLearning.AI", title: "Automated Testing for LLMOps (CircleCI + DeepLearning.AI)", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/automated-testing-for-llmops/", duration: "1.5 hrs" },
    ],
    youtubeVideos: [
      { creator: "TechWorld with Nana", channelBadge: "CI/CD Pipelines", title: "GitHub Actions Tutorial — Basic Concepts and CI/CD Pipeline with Docker", duration: "32m", url: "https://www.youtube.com/watch?v=R8_veQiYBjI", whyWatch: "Shows how to wire automated test, lint, and container build gates on every pull request." },
    ],
    portals: [
      { name: "GitHub Actions Official Docs", category: "Interactive Platform", description: "Reference workflows for Python pytest, Docker builds, and deployment gates.", url: "https://docs.github.com/en/actions" },
    ],
  },

  "monitoring": {
    mncCourses: [
      { org: "DeepLearning.AI", title: "Evaluating and Debugging Generative AI & LLMOps Monitoring", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/evaluating-debugging-generative-ai/", duration: "2 hrs" },
      { org: "Google", title: "Observability & Monitoring in Google Cloud", type: "Official Guide", url: "https://cloud.google.com/stackdriver/docs", duration: "2 hrs" },
    ],
    youtubeVideos: [
      { creator: "TechWorld with Nana", channelBadge: "Observability", title: "Prometheus and Grafana Monitoring Tutorial", duration: "1h 05m", url: "https://www.youtube.com/watch?v=h4Sl21AKiDg", whyWatch: "Explains metrics, logs, traces, and alerting rules clearly." },
    ],
    portals: [
      { name: "OpenTelemetry Official Docs", category: "Interactive Platform", description: "Vendor-neutral standard for distributed traces, metrics, and LLM observability.", url: "https://opentelemetry.io/" },
    ],
  },

  "how-llms-work": {
    mncCourses: [
      { org: "DeepLearning.AI", title: "Generative AI with Large Language Models (AWS + DeepLearning.AI)", type: "Certification Path", url: "https://www.deeplearning.ai/courses/generative-ai-with-llms/", duration: "16 hrs" },
      { org: "Google", title: "Introduction to Large Language Models — Google Cloud", type: "Free Course", url: "https://www.cloudskillsboost.google/course_templates/539", duration: "1.5 hrs" },
    ],
    youtubeVideos: [
      { creator: "Andrej Karpathy", channelBadge: "1.1M+ Subs · Essential", title: "Intro to Large Language Models (1-Hour Masterclass)", duration: "59m", url: "https://www.youtube.com/watch?v=zjkBMFhNj_g", whyWatch: "The definitive non-math explanation of how LLMs are pretrained, fine-tuned, and sampled." },
      { creator: "3Blue1Brown", channelBadge: "6.8M+ Subs", title: "But what is a GPT? Visual Intro to Transformers", duration: "27m", url: "https://www.youtube.com/watch?v=wjZofJX0v4M", whyWatch: "Visualizes tokens, embeddings, attention, and next-token probabilities in 3D." },
    ],
    portals: [
      { name: "Tiktokenizer (Interactive Tokenizer)", category: "Sandbox", description: "Inspect live token splits and context window counts across OpenAI and open-source models.", url: "https://tiktokenizer.vercel.app/" },
    ],
  },

  "prompt-design": {
    mncCourses: [
      { org: "Anthropic", title: "Anthropic Interactive Prompt Engineering Tutorial", type: "Official Guide", url: "https://github.com/anthropics/courses", duration: "4 hrs" },
      { org: "DeepLearning.AI", title: "ChatGPT Prompt Engineering for Developers (OpenAI + Andrew Ng)", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/", duration: "1.5 hrs" },
      { org: "Google", title: "Prompt Design in Vertex AI — Google Cloud", type: "Certification Path", url: "https://www.cloudskillsboost.google/course_templates/976", duration: "4 hrs" },
    ],
    youtubeVideos: [
      { creator: "Anthropic", channelBadge: "Official Engineering", title: "Prompt Engineering with Claude: From Basics to Production", duration: "48m", url: "https://www.youtube.com/@anthropic-ai", whyWatch: "Real prompt engineers discuss system prompts, few-shot examples, and abstention rules." },
    ],
    portals: [
      { name: "Anthropic Prompt Library", category: "Sandbox", description: "Tested production system prompts for classification, extraction, coding, and analysis.", url: "https://docs.anthropic.com/en/prompt-library/library" },
    ],
  },

  "structured-output": {
    mncCourses: [
      { org: "OpenAI", title: "Structured Outputs in the OpenAI API — Official Guide", type: "Official Guide", url: "https://platform.openai.com/docs/guides/structured-outputs", duration: "45 min" },
      { org: "DeepLearning.AI", title: "Functions, Tools and Agents with LangChain & Pydantic", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/functions-tools-agents-langchain/", duration: "1.5 hrs" },
    ],
    youtubeVideos: [
      { creator: "Jason Liu & Instructor Library", channelBadge: "Structured LLM Outputs", title: "Pydantic Validation & Schema-Constrained JSON from LLMs", duration: "36m", url: "https://python.useinstructor.com/", whyWatch: "Shows how to guarantee valid Pydantic models and automatic validation retries." },
    ],
    portals: [
      { name: "Instructor (Pydantic Structured Outputs)", category: "Interactive Platform", description: "Open-source library for schema-validated structured outputs across OpenAI, Anthropic, and Gemini.", url: "https://python.useinstructor.com/" },
    ],
  },

  "embeddings-vector-search": {
    mncCourses: [
      { org: "DeepLearning.AI", title: "Vector Databases: from Embeddings to Applications (Weaviate)", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/vector-databases-embeddings-applications/", duration: "2 hrs" },
      { org: "Google", title: "Vector Search and Embeddings — Google Cloud Skills Boost", type: "Free Course", url: "https://www.cloudskillsboost.google/course_templates/541", duration: "1.5 hrs" },
    ],
    youtubeVideos: [
      { creator: "StatQuest with Josh Starmer", channelBadge: "Visual Intuition", title: "Word Embeddings, Cosine Similarity & Vector Spaces Clearly Explained", duration: "28m", url: "https://www.youtube.com/@statquest", whyWatch: "Explains how meaning is encoded into numeric vectors and compared via cosine similarity." },
    ],
    portals: [
      { name: "Hugging Face MTEB Leaderboard", category: "Benchmarks & Papers", description: "Compare all open and commercial text embedding models by retrieval accuracy and dimension.", url: "https://huggingface.co/spaces/mteb/leaderboard" },
    ],
  },

  "rag": {
    mncCourses: [
      { org: "DeepLearning.AI", title: "Building and Evaluating Advanced RAG Applications", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/building-evaluating-advanced-rag/", duration: "2 hrs" },
      { org: "NVIDIA", title: "Augment Your LLM Using Retrieval-Augmented Generation", type: "Free Course", url: "https://www.nvidia.com/en-us/training/", duration: "2 hrs" },
      { org: "Anthropic", title: "Contextual Retrieval — Anthropic Engineering Guide", type: "Official Guide", url: "https://www.anthropic.com/news/contextual-retrieval", duration: "45 min" },
    ],
    youtubeVideos: [
      { creator: "LangChain (Lance Martin)", channelBadge: "RAG Masterclass", title: "RAG From Scratch (Complete Engineering Series)", duration: "2h 30m", url: "https://www.youtube.com/watch?v=sVcwVQRHIc8", whyWatch: "Walks through chunking, hybrid search, reranking, and query routing step by step." },
    ],
    portals: [],
  },

  "tool-use": {
    mncCourses: [
      { org: "Anthropic", title: "Tool Use (Function Calling) with Claude — Anthropic Course", type: "Official Guide", url: "https://github.com/anthropics/courses/tree/master/tool_use", duration: "2.5 hrs" },
      { org: "OpenAI", title: "Function Calling Guide — OpenAI Platform Docs", type: "Official Guide", url: "https://platform.openai.com/docs/guides/function-calling", duration: "1 hr" },
    ],
    youtubeVideos: [],
    portals: [],
  },

  "agent-loop": {
    mncCourses: [
      { org: "Anthropic", title: "Building Effective Agents — Anthropic Research & Engineering", type: "Official Guide", url: "https://www.anthropic.com/research/building-effective-agents", duration: "1.5 hrs" },
      { org: "DeepLearning.AI", title: "AI Agents in LangGraph (Harrison Chase & Andrew Ng)", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/", duration: "2 hrs" },
      { org: "Hugging Face", title: "Hugging Face AI Agents Course", type: "Certification Path", url: "https://huggingface.co/learn/agents-course/unit0/introduction", duration: "12 hrs" },
    ],
    youtubeVideos: [
      { creator: "DeepLearning.AI (Andrew Ng)", channelBadge: "Agentic Workflows", title: "What's Next for AI Agentic Workflows", duration: "23m", url: "https://www.youtube.com/watch?v=sal78ACtGTc", whyWatch: "Explains the four core agentic design patterns: reflection, tool use, planning, and multi-agent." },
    ],
    portals: [],
  },

  "llm-evaluation": {
    mncCourses: [
      { org: "DeepLearning.AI", title: "Evaluating and Debugging Generative AI", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/evaluating-debugging-generative-ai/", duration: "2 hrs" },
      { org: "Anthropic", title: "Prompt Evaluations — Anthropic Interactive Course", type: "Official Guide", url: "https://github.com/anthropics/courses/tree/master/prompt_evaluations", duration: "3 hrs" },
      { org: "OpenAI", title: "Evaluation Best Practices — OpenAI Cookbook", type: "Cookbook & Lab", url: "https://cookbook.openai.com/", duration: "2 hrs" },
    ],
    youtubeVideos: [],
    portals: [
      { name: "Promptfoo (Open-Source LLM Evals)", category: "Sandbox", description: "CLI and matrix viewer for testing prompts, RAG faithfulness, and regressions locally.", url: "https://www.promptfoo.dev/" },
    ],
  },

  "guardrails-security": {
    mncCourses: [
      { org: "DeepLearning.AI", title: "Red Teaming LLM Applications & Safe AI", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/red-teaming-llm-applications/", duration: "2 hrs" },
      { org: "NVIDIA", title: "Safeguarding LLMs with NeMo Guardrails", type: "Official Guide", url: "https://github.com/NVIDIA/NeMo-Guardrails", duration: "2 hrs" },
    ],
    youtubeVideos: [],
    portals: [
      { name: "OWASP Top 10 for Large Language Model Applications", category: "Benchmarks & Papers", description: "The industry security checklist for prompt injection, sensitive data disclosure, and excessive agency.", url: "https://genai.owasp.org/" },
      { name: "Gandalf by Lakera (Prompt Injection Game)", category: "Sandbox", description: "Interactive game teaching how prompt injection attacks and multi-layer defenses work.", url: "https://gandalf.lakera.ai/" },
    ],
  },

  "cost-latency": {
    mncCourses: [
      { org: "Anthropic", title: "Prompt Caching & Latency Optimization — Anthropic Docs", type: "Official Guide", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching", duration: "45 min" },
      { org: "OpenAI", title: "Latency and Cost Optimization Guide — OpenAI Platform", type: "Official Guide", url: "https://platform.openai.com/docs/guides/latency-optimization", duration: "45 min" },
    ],
    youtubeVideos: [],
    portals: [
      { name: "Artificial Analysis (Live LLM Latency & Price Benchmark)", category: "Benchmarks & Papers", description: "Independent daily measurements of tokens/sec, time-to-first-token, and $/1M tokens across providers.", url: "https://artificialanalysis.ai/" },
    ],
  },

  "responsible-ai": {
    mncCourses: [
      { org: "Google", title: "Responsible AI: Applying AI Principles with Google Cloud", type: "Free Course", url: "https://www.cloudskillsboost.google/course_templates/388", duration: "2 hrs" },
      { org: "Microsoft", title: "Responsible AI Business Principles — Microsoft Learn", type: "Free Course", url: "https://learn.microsoft.com/en-us/training/paths/responsible-ai-business-principles/", duration: "3 hrs" },
    ],
    youtubeVideos: [],
    portals: [
      { name: "Fairlearn (Fairness Assessment Toolkit)", category: "Interactive Platform", description: "Open-source Python package to assess and mitigate group fairness disparities in ML models.", url: "https://fairlearn.org/" },
    ],
  },

  "ai-regulation": {
    mncCourses: [
      { org: "Stanford / MIT", title: "NIST AI Risk Management Framework (AI RMF 1.0) Official Portal", type: "Official Guide", url: "https://www.nist.gov/itl/ai-risk-management-framework", duration: "Reference" },
    ],
    youtubeVideos: [],
    portals: [
      { name: "EU Artificial Intelligence Act — Official Explorer", category: "Benchmarks & Papers", description: "Browse the full text, risk tiers, and compliance obligations of the EU AI Act.", url: "https://artificialintelligenceact.eu/" },
    ],
  },

  "data-privacy": {
    mncCourses: [
      { org: "Microsoft", title: "Microsoft Priva & Data Privacy Fundamentals", type: "Official Guide", url: "https://learn.microsoft.com/en-us/privacy/", duration: "2 hrs" },
    ],
    youtubeVideos: [],
    portals: [
      { name: "Microsoft Presidio (PII Detection & Anonymization)", category: "Sandbox", description: "Open-source SDK for redacting PII in text and images before sending to LLMs.", url: "https://microsoft.github.io/presidio/" },
    ],
  },

  "experiment-tracking": {
    mncCourses: [
      { org: "DeepLearning.AI", title: "Evaluating and Debugging Generative AI Models (Weights & Biases)", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/evaluating-debugging-generative-ai/", duration: "2 hrs" },
    ],
    youtubeVideos: [
      { creator: "DataTalksClub", channelBadge: "MLOps Zoomcamp", title: "Experiment Tracking & Model Management with MLflow", duration: "1h 15m", url: "https://www.youtube.com/playlist?list=PL3MmuxUbc_hIUISrluw_A7wDSmfOhErJK", whyWatch: "Hands-on walkthrough of logging parameters, metrics, and model artifacts in MLflow." },
    ],
    portals: [
      { name: "MLflow Official Documentation", category: "Interactive Platform", description: "Open-source platform for experiment tracking, evaluation, and model registry.", url: "https://mlflow.org/" },
    ],
  },

  "choosing-a-model": {
    mncCourses: [
      { org: "Hugging Face", title: "Choosing Open-Weights vs Frontier Models — Hugging Face Guide", type: "Official Guide", url: "https://huggingface.co/learn", duration: "1 hr" },
    ],
    youtubeVideos: [],
    portals: [
      { name: "LMSYS Chatbot Arena (LMArena)", category: "Benchmarks & Papers", description: "Crowdsourced blind human ELO rankings comparing frontier and open-weights models.", url: "https://lmarena.ai/" },
      { name: "Artificial Analysis (Quality vs Price vs Speed)", category: "Benchmarks & Papers", description: "Side-by-side comparison of model intelligence, throughput, and API cost.", url: "https://artificialanalysis.ai/" },
    ],
  },

  "prompt-rag-or-finetune": {
    mncCourses: [
      { org: "OpenAI", title: "Model Optimization: Prompt Engineering vs RAG vs Fine-Tuning", type: "Official Guide", url: "https://platform.openai.com/docs/guides/optimizing-llm-accuracy", duration: "1 hr" },
    ],
    youtubeVideos: [],
    portals: [],
  },

  "tokenization": {
    mncCourses: [
      { org: "Hugging Face", title: "The Hugging Face Tokenizers Library (BPE, WordPiece, Unigram)", type: "Free Course", url: "https://huggingface.co/learn/nlp-course/chapter6/1", duration: "2 hrs" },
    ],
    youtubeVideos: [
      { creator: "Andrej Karpathy", channelBadge: "1.1M+ Subs · Deep Dive", title: "Let's build the GPT Tokenizer (Byte Pair Encoding from Scratch)", duration: "2h 13m", url: "https://www.youtube.com/watch?v=zduSFxRajkE", whyWatch: "Explains why tokenization causes spelling/math quirks in LLMs and implements BPE in Python." },
    ],
    portals: [
      { name: "Tiktokenizer", category: "Sandbox", description: "Visualize exact BPE token splits and IDs for GPT-4o, Claude, and Llama models.", url: "https://tiktokenizer.vercel.app/" },
    ],
  },

  "attention-transformer": {
    mncCourses: [
      { org: "Hugging Face", title: "How Do Transformers Work? — Hugging Face NLP Course", type: "Free Course", url: "https://huggingface.co/learn/nlp-course/chapter1/4", duration: "2 hrs" },
    ],
    youtubeVideos: [
      { creator: "3Blue1Brown", channelBadge: "6.8M+ Subs · Visual Math", title: "Attention in Transformers, Visually Explained", duration: "26m", url: "https://www.youtube.com/watch?v=eMlx5fFNoYc", whyWatch: "Step-by-step 3D visualization of Query, Key, and Value matrices inside self-attention." },
      { creator: "Andrej Karpathy", channelBadge: "Build from Scratch", title: "Let's build GPT: from scratch, in code, spelled out", duration: "1h 56m", url: "https://www.youtube.com/watch?v=kCc8FmEb1nY", whyWatch: "Codes multi-head self-attention and a full Transformer in PyTorch." },
    ],
    portals: [
      { name: "The Illustrated Transformer (Jay Alammar)", category: "Interactive Platform", description: "The classic visual diagram guide to self-attention and encoder-decoder stacks.", url: "https://jalammar.github.io/illustrated-transformer/" },
    ],
  },

  "lora-finetuning": {
    mncCourses: [
      { org: "DeepLearning.AI", title: "Finetuning Large Language Models", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/finetuning-large-language-models/", duration: "1.5 hrs" },
      { org: "Hugging Face", title: "Parameter-Efficient Fine-Tuning (PEFT, LoRA & QLoRA)", type: "Official Guide", url: "https://huggingface.co/docs/peft/index", duration: "2 hrs" },
    ],
    youtubeVideos: [
      { creator: "Umar Jamil", channelBadge: "LLM Math & Code", title: "LoRA & QLoRA Explained Clearly: Low-Rank Adaptation & Quantization", duration: "54m", url: "https://www.youtube.com/@ummar_jamil", whyWatch: "Derives the low-rank matrix math $W + BA$ and walks through QLoRA memory savings." },
    ],
    portals: [],
  },

  "post-training": {
    mncCourses: [
      { org: "Hugging Face", title: "Fine-Tuning & Aligning Models with TRL (SFT, RLHF, DPO)", type: "Free Course", url: "https://huggingface.co/docs/trl/index", duration: "3 hrs" },
      { org: "DeepLearning.AI", title: "Reinforcement Learning from Human Feedback (Google Cloud)", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/reinforcement-learning-from-human-feedback/", duration: "2 hrs" },
    ],
    youtubeVideos: [],
    portals: [],
  },

  "multimodal": {
    mncCourses: [
      { org: "DeepLearning.AI", title: "Large Multimodal Model Prompting & Vision Applications", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/large-multimodal-model-prompting-with-gemini/", duration: "2 hrs" },
      { org: "Anthropic", title: "Vision Capabilities with Claude — Official Guide", type: "Official Guide", url: "https://docs.anthropic.com/en/docs/build-with-claude/vision", duration: "45 min" },
    ],
    youtubeVideos: [],
    portals: [],
  },

  "inference-optimisation": {
    mncCourses: [
      { org: "DeepLearning.AI", title: "Quantization Fundamentals with Hugging Face", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/quantization-fundamentals-with-hugging-face/", duration: "2 hrs" },
      { org: "NVIDIA", title: "Optimizing LLM Inference with TensorRT-LLM", type: "Official Guide", url: "https://developer.nvidia.com/tensorrt-llm", duration: "2 hrs" },
    ],
    youtubeVideos: [],
    portals: [],
  },

  "serving-llms": {
    mncCourses: [
      { org: "DeepLearning.AI", title: "Efficiently Serving LLMs (Predibase / vLLM)", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/efficiently-serving-llms/", duration: "2 hrs" },
    ],
    youtubeVideos: [],
    portals: [
      { name: "vLLM Documentation (PagedAttention Serving)", category: "Interactive Platform", description: "High-throughput open-source serving engine for LLMs with continuous batching.", url: "https://docs.vllm.ai/" },
    ],
  },

  "mcp": {
    mncCourses: [
      { org: "Anthropic", title: "Model Context Protocol (MCP) — Official Specification & Quickstart", type: "Official Guide", url: "https://modelcontextprotocol.io/introduction", duration: "1.5 hrs" },
      { org: "DeepLearning.AI", title: "MCP: Build Rich-Context AI Apps with Anthropic", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/mcp-build-rich-context-ai-apps-with-anthropic/", duration: "1.5 hrs" },
    ],
    youtubeVideos: [],
    portals: [
      { name: "Official MCP Server Registry", category: "Tool Directory", description: "Open-source MCP servers for GitHub, Postgres, Filesystem, Slack, and Puppeteer.", url: "https://github.com/modelcontextprotocol/servers" },
    ],
  },

  "multi-agent": {
    mncCourses: [
      { org: "DeepLearning.AI", title: "Multi AI Agent Systems with crewAI & AutoGen", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/", duration: "2.5 hrs" },
      { org: "Microsoft", title: "AutoGen & Multi-Agent Design Patterns — Microsoft Research", type: "Official Guide", url: "https://microsoft.github.io/autogen/", duration: "2 hrs" },
    ],
    youtubeVideos: [],
    portals: [],
  },

  "agent-frameworks": {
    mncCourses: [
      { org: "DeepLearning.AI", title: "AI Agents in LangGraph", type: "Free Course", url: "https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/", duration: "2 hrs" },
      { org: "Hugging Face", title: "Hugging Face Agents Course (smolagents, LangGraph, LlamaIndex)", type: "Certification Path", url: "https://huggingface.co/learn/agents-course/unit0/introduction", duration: "12 hrs" },
    ],
    youtubeVideos: [],
    portals: [],
  },

  "computer-use": {
    mncCourses: [
      { org: "Anthropic", title: "Computer Use & Browser Automation Safety — Anthropic Docs", type: "Official Guide", url: "https://docs.anthropic.com/en/docs/agents-and-tools/computer-use", duration: "1 hr" },
    ],
    youtubeVideos: [],
    portals: [],
  },

  "no-code-tools": {
    mncCourses: [
      { org: "Microsoft", title: "Get Started with Power Automate — Microsoft Learn", type: "Free Course", url: "https://learn.microsoft.com/en-us/training/paths/get-started-power-automate/", duration: "3 hrs" },
    ],
    youtubeVideos: [
      { creator: "n8n Official", channelBadge: "Official Academy", title: "n8n Beginner Course: Build Automated Workflows & AI Agents", duration: "1h 15m", url: "https://www.youtube.com/@n8n-io", whyWatch: "Step-by-step visual guide to triggers, webhooks, branching, and AI nodes." },
    ],
    portals: [
      { name: "n8n Workflow Templates", category: "Sandbox", description: "1,000+ ready-to-import automation workflows for Slack, HubSpot, Gmail, and OpenAI.", url: "https://n8n.io/workflows/" },
      { name: "Make.com Academy", category: "Interactive Platform", description: "Free interactive courses on visual scenario design, routers, iterators, and error handling.", url: "https://academy.make.com/" },
      { name: "There's An AI For That (TAAFT)", category: "Tool Directory", description: "Discover specialized AI tools for any business workflow before building.", url: "https://theresanaiforthat.com/" },
    ],
  },

  "eu-ai-act": {
    mncCourses: [],
    youtubeVideos: [],
    portals: [
      { name: "EU AI Act Compliance Checker & Full Text Explorer", category: "Benchmarks & Papers", description: "Interactive tool to determine whether an AI system is Prohibited, High-Risk, or Limited Risk.", url: "https://artificialintelligenceact.eu/assessment/eu-ai-act-compliance-checker/" },
    ],
  },

  "nist-rmf": {
    mncCourses: [
      { org: "Stanford / MIT", title: "NIST AI Risk Management Framework (Govern, Map, Measure, Manage)", type: "Official Guide", url: "https://airc.nist.gov/RMF", duration: "Reference" },
    ],
    youtubeVideos: [],
    portals: [
      { name: "NIST AI RMF Playbook", category: "Interactive Platform", description: "Actionable guidance and suggested documentation for each NIST AI RMF subcategory.", url: "https://airc.nist.gov/AI_RMF_Knowledge_Base/Playbook" },
    ],
  },

  "iso-42001": {
    mncCourses: [],
    youtubeVideos: [],
    portals: [
      { name: "ISO/IEC 42001:2023 Official Standard Overview", category: "Benchmarks & Papers", description: "International standard specifying requirements for an Artificial Intelligence Management System (AIMS).", url: "https://www.iso.org/standard/81230.html" },
    ],
  },

  "explainability": {
    mncCourses: [
      { org: "Google", title: "Explainable AI — Google Cloud Documentation", type: "Official Guide", url: "https://cloud.google.com/explainable-ai", duration: "1.5 hrs" },
    ],
    youtubeVideos: [],
    portals: [
      { name: "Kaggle — Machine Learning Explainability (SHAP & Permutation Importance)", category: "Interactive Platform", description: "Free hands-on micro-course teaching permutation importance, partial dependence plots, and SHAP values.", url: "https://www.kaggle.com/learn/machine-learning-explainability" },
    ],
  },

  "math-for-ml": {
    mncCourses: [
      { org: "DeepLearning.AI", title: "Mathematics for Machine Learning and Data Science Specialization", type: "Certification Path", url: "https://www.deeplearning.ai/courses/mathematics-for-machine-learning-and-data-science-specialization/", duration: "28 hrs" },
    ],
    youtubeVideos: [
      { creator: "3Blue1Brown", channelBadge: "6.8M+ Subs · Visual Math", title: "Essence of Linear Algebra & Essence of Calculus", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab", whyWatch: "Geometric intuition for vectors, matrices, eigenvalues, derivatives, and gradients." },
      { creator: "StatQuest with Josh Starmer", channelBadge: "Probability & Stats", title: "Statistics Fundamentals: Distributions, Bayes & Hypothesis Testing", duration: "Playlist", url: "https://www.youtube.com/playlist?list=PLblh5JKOoLUK0FLuzwntyYI10UQFUhsY9", whyWatch: "Makes probability distributions, maximum likelihood, and p-values effortless to grasp." },
    ],
    portals: [],
  },

  "classical-algorithms": {
    mncCourses: [
      { org: "DeepLearning.AI", title: "Supervised Machine Learning & Advanced Learning Algorithms", type: "Certification Path", url: "https://www.deeplearning.ai/courses/machine-learning-specialization/", duration: "20 hrs" },
    ],
    youtubeVideos: [
      { creator: "StatQuest with Josh Starmer", channelBadge: "1.4M+ Subs", title: "Logistic Regression, Random Forests & XGBoost Clearly Explained", duration: "Playlist", url: "https://www.youtube.com/watch?v=OtD8wVaFm6E", whyWatch: "Step-by-step visual derivation of decision trees, bagging, and gradient boosting." },
    ],
    portals: [
      { name: "Kaggle — Intermediate Machine Learning (XGBoost & Pipelines)", category: "Interactive Platform", description: "Hands-on coding exercises for random forests and gradient boosting on tabular datasets.", url: "https://www.kaggle.com/learn/intermediate-machine-learning" },
    ],
  },

  "pytorch-training": {
    mncCourses: [
      { org: "DeepLearning.AI", title: "PyTorch for Deep Learning Professional Certificate", type: "Certification Path", url: "https://www.deeplearning.ai/", duration: "24 hrs" },
    ],
    youtubeVideos: [
      { creator: "Daniel Bourke & freeCodeCamp", channelBadge: "Complete PyTorch Course", title: "PyTorch for Deep Learning & Machine Learning — Full Course", duration: "25h", url: "https://www.youtube.com/watch?v=V_xro1bcAuA", whyWatch: "Writes PyTorch tensors, Datasets, DataLoaders, and training loops from scratch." },
    ],
    portals: [
      { name: "PyTorch Official Tutorials", category: "Interactive Platform", description: "Official interactive Colab notebooks covering `torch.nn`, autograd, and model saving.", url: "https://pytorch.org/tutorials/" },
    ],
  },

  "linux-shell": {
    mncCourses: [
      { org: "Microsoft", title: "Introduction to Bash Shell Scripting — Microsoft Learn", type: "Free Course", url: "https://learn.microsoft.com/en-us/training/modules/bash-introduction/", duration: "1.5 hrs" },
    ],
    youtubeVideos: [
      { creator: "freeCodeCamp.org", channelBadge: "Linux Command Line", title: "The Linux Command Line & Bash Scripting Full Course", duration: "5h", url: "https://www.youtube.com/watch?v=ZtqBQ68cfJc", whyWatch: "Covers processes, permissions, SSH, pipes, grep/awk, and systemd services." },
    ],
    portals: [
      { name: "The Missing Semester of Your CS Education (MIT)", category: "Interactive Platform", description: "MIT's famous practical course on the shell, command-line tools, SSH, and Git.", url: "https://missing.csail.mit.edu/" },
    ],
  },

  "kubernetes": {
    mncCourses: [
      { org: "Google", title: "Architecting with Google Kubernetes Engine (GKE)", type: "Certification Path", url: "https://www.cloudskillsboost.google/course_templates/30", duration: "8 hrs" },
    ],
    youtubeVideos: [
      { creator: "TechWorld with Nana", channelBadge: "1.2M+ Subs", title: "Kubernetes Tutorial for Beginners (Full 4-Hour Course)", duration: "3h 56m", url: "https://www.youtube.com/watch?v=X48VuDVv0do", whyWatch: "Explains Pods, Deployments, Services, Ingress, ConfigMaps, and Secrets visually." },
    ],
    portals: [
      { name: "Kubernetes Official Interactive Basics", category: "Interactive Platform", description: "Official step-by-step tutorials for deploying, scaling, and rolling out updates in Kubernetes.", url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/" },
    ],
  },

  "infrastructure-as-code": {
    mncCourses: [
      { org: "AWS", title: "Infrastructure as Code & Terraform on AWS", type: "Official Guide", url: "https://developer.hashicorp.com/terraform/tutorials", duration: "3 hrs" },
    ],
    youtubeVideos: [
      { creator: "TechWorld with Nana", channelBadge: "Terraform Crash Course", title: "Terraform Course — Automate your AWS Cloud Infrastructure", duration: "1h 40m", url: "https://www.youtube.com/watch?v=SLB_c_ayRMo", whyWatch: "Shows providers, state files, plan/apply workflows, and reusable modules." },
    ],
    portals: [
      { name: "HashiCorp Terraform Tutorials", category: "Interactive Platform", description: "Official hands-on tutorials for provisioning cloud infrastructure safely.", url: "https://developer.hashicorp.com/terraform/tutorials" },
    ],
  },

  "mlops-lifecycle": {
    mncCourses: [
      { org: "DeepLearning.AI", title: "Machine Learning Engineering for Production (MLOps)", type: "Certification Path", url: "https://www.deeplearning.ai/courses/machine-learning-engineering-for-production-mlops/", duration: "32 hrs" },
      { org: "Google", title: "MLOps (Machine Learning Operations) Fundamentals", type: "Certification Path", url: "https://www.cloudskillsboost.google/course_templates/345", duration: "10 hrs" },
    ],
    youtubeVideos: [
      { creator: "DataTalksClub", channelBadge: "MLOps Zoomcamp", title: "Introduction to MLOps & Maturity Levels", duration: "45m", url: "https://www.youtube.com/playlist?list=PL3MmuxUbc_hIUISrluw_A7wDSmfOhErJK", whyWatch: "Walks through the entire lifecycle from notebook experiments to automated retraining." },
    ],
    portals: [
      { name: "Made With ML (Goku Mohandas)", category: "Interactive Platform", description: "End-to-end production ML engineering guide covering design, testing, CI/CD, and monitoring.", url: "https://madewithml.com/" },
    ],
  },

  "drift-detection": {
    mncCourses: [
      { org: "DeepLearning.AI", title: "Monitoring Machine Learning Systems in Production", type: "Free Course", url: "https://www.deeplearning.ai/", duration: "2 hrs" },
    ],
    youtubeVideos: [],
    portals: [
      { name: "Evidently AI (Open-Source ML & LLM Drift Monitoring)", category: "Interactive Platform", description: "Generate interactive data drift, target drift, and LLM quality reports in Python.", url: "https://www.evidentlyai.com/" },
    ],
  },
};
