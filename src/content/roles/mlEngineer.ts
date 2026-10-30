import type { Roadmap } from "../../types";
import { S } from "../shared";

export const mlEngineer: Roadmap = {
  slug: "machine-learning-engineer",
  title: "Machine Learning Engineer",
  emoji: "📊",
  description:
    "Master the complete Machine Learning & AI Data Science curriculum from roadmap.sh: mathematical foundations (linear algebra, calculus, probability), NumPy/Pandas/Polars feature engineering, classical supervised & gradient-boosted trees (XGBoost/LightGBM/CatBoost), unsupervised clustering, PyTorch deep learning, recommender systems, and production ML system design.",
  audience:
    "Software engineers, data scientists, and quantitative developers who want to design, train, calibrate, explain, and serve predictive and deep learning models in production.",
  tools: [
    "Python, SQL, NumPy, Pandas & Polars",
    "scikit-learn, XGBoost, LightGBM & CatBoost",
    "PyTorch & TorchVision / Hugging Face",
    "Optuna, SHAP & LIME",
    "MLflow, FastAPI & ONNX Runtime",
    "Docker & Feature Stores",
  ],
  outcomes: [
    "Apply linear algebra, multivariate calculus, and Bayesian/frequentist statistics to diagnose model behavior and design statistically sound experiments.",
    "Engineer leak-free features and train, tune, calibrate, and explain gradient-boosted trees (XGBoost/LightGBM) and PyTorch neural networks.",
    "Design end-to-end production ML systems—including ranking/recommenders, time-series forecasting, fraud detection, and low-latency APIs.",
  ],
  sections: [
    {
      id: "math-programming-foundations",
      title: "1. Mathematical & Scientific Computing Foundations",
      topics: [
        {
          id: "math-for-ml",
          title: "Linear Algebra, Multivariate Calculus, Probability & Statistical Inference",
          minutes: 9,
          summary: "Master matrix decompositions (SVD/Eigenvalues), gradients & chain rule, probability distributions, and hypothesis testing.",
          body: [
            "Machine learning rests on three mathematical pillars: (1) **Linear Algebra**—vector spaces, matrix multiplication, norms ($L_1, L_2$), eigenvalues/eigenvectors, and Singular Value Decomposition (SVD) power embeddings, PCA, and neural network weight projections; (2) **Multivariate Calculus**—partial derivatives, gradients ($\\nabla_{\\theta} \\mathcal{L}$), Jacobians, Hessians, and the chain rule drive backpropagation and gradient descent.",
            "(3) **Probability & Statistics**—Bernoulli, Gaussian, and Poisson distributions, Bayes' theorem, Maximum Likelihood Estimation (MLE), Maximum A Posteriori (MAP), confidence intervals, $p$-values, and statistical power calculations govern uncertainty quantification and online A/B experimentation.",
          ],
          points: [
            "Understand matrix rank, orthogonality, and SVD to grasp dimensionality reduction and low-rank adaptation.",
            "Trace the chain rule through a computation graph to debug vanishing or exploding gradients.",
            "Use Maximum Likelihood Estimation (MLE) to see why MSE loss assumes Gaussian noise and Cross-Entropy assumes Bernoulli/Categorical targets.",
          ],
        },
        S.pythonEssentials,
        S.sqlBasics,
        {
          id: "scientific-python-stack",
          title: "Vectorized Data Manipulation: NumPy, Pandas, Polars & Visualization",
          minutes: 8,
          summary: "Eliminate slow Python loops using NumPy broadcasting, Pandas/Polars relational pipelines, and diagnostic plots.",
          body: [
            "Production ML data wrangling requires replacing slow Python `for` loops with C/Rust-backed vectorized array operations. Master **NumPy** n-dimensional array slicing, memory views, and broadcasting rules; **Pandas** and multi-threaded **Polars** lazy DataFrames for group-by aggregations, window functions, and parquet I/O; and **Matplotlib / Seaborn** for distribution, correlation, and residual diagnostics.",
            "Always profile memory usage (`float32` vs `float64`, categorical dtypes) and push heavy joins and temporal window aggregations down to SQL or Polars lazy execution plans.",
          ],
          points: [
            "Use NumPy broadcasting and vectorized ufuncs instead of row-by-row Python iteration.",
            "Prefer Parquet/Arrow columnar formats over CSV to preserve schema types and speed up I/O by 10x.",
            "Plot feature distributions, missingness heatmaps, and target correlations before fitting any model.",
          ],
        },
      ],
    },
    {
      id: "eda-feature-engineering",
      title: "2. Exploratory Data Analysis, Preprocessing & Feature Engineering",
      topics: [
        S.mlFundamentals,
        S.dataPreparation,
        {
          id: "advanced-feature-engineering",
          title: "Feature Engineering, Target Encoding, Scaling & Leakage Prevention",
          minutes: 9,
          summary: "Construct high-signal domain features, out-of-fold target encodings, and leak-free temporal splits.",
          body: [
            "Feature engineering often delivers larger accuracy gains than switching model families. Key techniques include numerical transformations (log/Box-Cox for skewed distributions, standardization for linear/neural models), interaction ratios, temporal lag and rolling-window statistics (7-day/30-day spend, velocity), and high-cardinality categorical encoding (Out-of-Fold Target Encoding with smoothing, frequency encoding).",
            "Guard ruthlessly against **Data Leakage**: fit all scalers, imputers, and target encoders strictly inside each cross-validation training fold (`sklearn.pipeline.Pipeline`), and never compute aggregations using timestamps at or after the prediction cutoff time.",
          ],
          points: [
            "Tree ensembles are invariant to monotonic feature scaling, whereas linear models, SVMs, k-NN, and neural nets require scaled inputs.",
            "Use Out-of-Fold (OOF) smoothed target encoding for high-cardinality categories (ZIP codes, merchant IDs) to prevent target leakage.",
            "Enforce point-in-time joins so historical training rows never see future feature values.",
          ],
        },
      ],
    },
    {
      id: "classical-supervised-gbdt",
      title: "3. Classical Supervised Learning & Gradient Boosted Decision Trees",
      topics: [
        {
          id: "classical-algorithms",
          title: "Linear Models (Ridge, Lasso, ElasticNet), Logistic Regression, SVM & k-NN",
          minutes: 8,
          summary: "Build interpretable regularized baselines and understand bias-variance tradeoffs across parametric and non-parametric models.",
          body: [
            "Always establish a fast, interpretable baseline with regularized linear models before reaching for complex ensembles. **Ridge ($L_2$)** shrinks correlated feature weights smoothly; **Lasso ($L_1$)** drives redundant coefficients to exact zero for automatic feature selection; **ElasticNet** combines both penalties.",
            "Understand Margin Classifiers (**SVMs** with linear and RBF kernels), instance-based learning (**k-NN** and approximate nearest neighbors), and **Naive Bayes** log-odds baselines.",
          ],
          points: [
            "Use $L_1$ (Lasso) for sparse feature selection and $L_2$ (Ridge) when collinear features all carry signal.",
            "Inspect logistic regression log-odds coefficients to sanity-check feature directions and uncover data leakage.",
            "Always benchmark complex models against a tuned regularized logistic/linear regression baseline.",
          ],
        },
        {
          id: "gradient-boosted-trees",
          title: "Decision Trees, Random Forests & Gradient Boosting (XGBoost, LightGBM, CatBoost)",
          minutes: 9,
          summary: "Why GBDTs dominate structured tabular data—and how second-order gradients, leaf-wise growth, and ordered boosting work.",
          body: [
            "While **Random Forests** reduce variance by bagging deep independent trees in parallel, **Gradient Boosted Decision Trees (GBDTs)** reduce bias by training shallow trees sequentially, where each new tree fits the negative gradients (pseudo-residuals) of the loss function. On structured tabular data, GBDTs consistently outperform deep neural networks.",
            "**XGBoost** uses second-order Taylor expansion (gradients + Hessians) with explicit $L_1/L_2$ leaf-weight regularization and histogram binning; **LightGBM** accelerates training on massive datasets via GOSS (Gradient-based One-Side Sampling), EFB (Exclusive Feature Bundling), and leaf-wise tree growth; **CatBoost** uses oblivious trees and ordered target statistics to handle categorical features natively with minimal tuning.",
          ],
          points: [
            "Use LightGBM for fast iteration on large tabular datasets (100k–100M+ rows); use CatBoost when categorical features dominate.",
            "Control GBDT overfitting via `learning_rate` (0.01–0.1) + early stopping, `max_depth` / `num_leaves`, `subsample`, and `colsample_bytree`.",
            "Leverage native missing-value routing in XGBoost/LightGBM rather than naive mean imputation.",
          ],
          example: {
            title: "Train LightGBM with early stopping on a validation split",
            language: "python",
            code: `import lightgbm as lgb

model = lgb.LGBMClassifier(
    n_estimators=2000,
    learning_rate=0.03,
    num_leaves=31,
    subsample_for_bin=50000,
    colsample_bytree=0.8,
    random_state=42,
)
model.fit(
    X_train, y_train,
    eval_set=[(X_val, y_val)],
    callbacks=[lgb.early_stopping(stopping_rounds=50, verbose=False)],
)`,
          },
        },
      ],
    },
    {
      id: "unsupervised-evaluation-xai",
      title: "4. Unsupervised Learning, Evaluation, Calibration & Explainable AI",
      topics: [
        {
          id: "unsupervised-clustering-dimred",
          title: "Unsupervised Learning: K-Means, DBSCAN, GMMs, PCA, UMAP & Anomaly Detection",
          minutes: 8,
          summary: "Discover latent structure, segment populations, compress high-dimensional spaces, and isolate rare anomalies.",
          body: [
            "When labels are absent or expensive, unsupervised methods uncover structure: **K-Means** partitions spherical clusters via centroid updates; **DBSCAN / HDBSCAN** discovers arbitrary-shape density clusters and flags noise points without pre-specifying $K$; **Gaussian Mixture Models (GMMs)** fit soft probabilistic cluster assignments via Expectation-Maximization (EM).",
            "For dimensionality reduction, **PCA** projects orthogonal axes of maximum variance via SVD, while **t-SNE** and **UMAP** preserve local neighborhood topology for 2D/3D embedding visualization. For unlabeled fraud or hardware fault detection, **Isolation Forests** and **Autoencoders** isolate low-density anomalies.",
          ],
          points: [
            "Use HDBSCAN over K-Means when clusters have irregular shapes, varying densities, or outlier noise.",
            "Use PCA to decorrelate linear features and UMAP to visualize high-dimensional text/image embeddings.",
            "Use Isolation Forests as a fast first-pass anomaly detector on unlabeled tabular telemetry.",
          ],
        },
        S.evaluationMetrics,
        {
          id: "model-selection-tuning",
          title: "Cross-Validation, Bayesian Tuning (Optuna), Probability Calibration & SHAP",
          minutes: 9,
          summary: "Tune hyperparameters with Optuna, calibrate predicted probabilities, and explain predictions with SHAP values.",
          body: [
            "Choose a cross-validation strategy that mirrors production: `StratifiedKFold` for imbalanced classification, `GroupKFold` when multiple rows belong to the same user/patient, and `TimeSeriesSplit` for temporal forecasting. Use Bayesian hyperparameter optimization (**Optuna** Tree-structured Parzen Estimator with pruning) rather than exhaustive grid search.",
            "Because boosted trees and deep networks often output distorted probability scores, apply **Platt Scaling** (logistic calibration) or **Isotonic Regression** whenever downstream business logic multiplies predicted probability by dollar value ($\\mathbb{E}[\\text{Loss}] = P(\\text{default}) \\times \\text{Exposure}$). Use **TreeSHAP** to compute exact game-theoretic feature attributions globally and per prediction.",
          ],
          points: [
            "Use `GroupKFold` whenever a single user, device, or merchant appears multiple times in the dataset.",
            "Check reliability diagrams (calibration curves) whenever predicted probabilities drive expected-value thresholds.",
            "Use SHAP summary and waterfall plots to audit model drivers with domain experts and satisfy regulatory explainability.",
          ],
        },
      ],
    },
    {
      id: "deep-learning",
      title: "5. Deep Learning Architectures & PyTorch Engineering",
      topics: [
        S.deepLearning,
        {
          id: "pytorch-training",
          title: "PyTorch Engineering: Autograd, Custom Datasets, Mixed Precision & Optimizers",
          minutes: 9,
          summary: "Write production PyTorch training loops with AdamW, cosine annealing, AMP (`bfloat16`), and gradient clipping.",
          body: [
            "Master PyTorch's core abstractions: `torch.Tensor` strided memory layout, dynamic `autograd` computation graphs, custom `Dataset` and multi-worker pinned-memory `DataLoader` pipelines, and modular `nn.Module` layers. Modern training loops pair the **AdamW** optimizer (decoupled weight decay) with **Linear Warmup + Cosine Annealing** learning rate schedules.",
            "Accelerate GPU training 2x–3x and halve activation memory using Automatic Mixed Precision (`torch.amp.autocast('cuda', dtype=torch.bfloat16)`), `torch.compile`, gradient norm clipping (`clip_grad_norm_`), and DistributedDataParallel (DDP) across multi-GPU nodes.",
          ],
          points: [
            "Use `AdamW` with linear warmup and cosine decay as your default optimizer recipe for deep networks.",
            "Enable `bfloat16` mixed precision and `pin_memory=True` DataLoaders to keep GPU Tensor Cores saturated.",
            "Sanity-check any new neural architecture by overfitting a single batch of 16 examples to near-zero loss first.",
          ],
          example: {
            title: "Production PyTorch training step with bfloat16 AMP and gradient clipping",
            language: "python",
            code: `import torch

scaler = torch.amp.GradScaler("cuda")
model.train()
for x, y in train_loader:
    x, y = x.to(device, non_blocking=True), y.to(device, non_blocking=True)
    optimizer.zero_grad(set_to_none=True)
    with torch.amp.autocast("cuda", dtype=torch.bfloat16):
        logits = model(x)
        loss = criterion(logits, y)
    scaler.scale(loss).backward()
    scaler.unscale_(optimizer)
    torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
    scaler.step(optimizer)
    scaler.update()`,
          },
        },
        {
          id: "dl-architectures-transfer",
          title: "CNNs, Sequence Models, Transformers & Transfer Learning",
          minutes: 8,
          summary: "Select and fine-tune ResNet/ConvNeXt, Vision Transformers (ViT), and sequence encoders for vision, audio, and text.",
          body: [
            "Different modalities exploit different inductive biases: **Convolutional Neural Networks (CNNs—ResNet, ConvNeXt, YOLO)** use spatial translation equivariance for images and edge vision; **Vision Transformers (ViT, DINOv2, SigLIP)** split images into patches and scale with massive pretraining; **Transformers** dominate NLP, audio spectrograms, and multimodal fusion.",
            "In 95% of industry vision and NLP tasks, training from random initialization is a mistake: start from a strong pretrained backbone (`timm`, `torchvision`, or `transformers`), freeze or apply differential learning rates to the body, and fine-tune the task head with data augmentation.",
          ],
          points: [
            "Always start from pretrained backbones (`timm` for vision, Hugging Face for text/audio) rather than training from scratch.",
            "Use a 10x smaller learning rate on pretrained backbone layers than on the newly initialized classification/regression head.",
            "Export latency-critical models to ONNX Runtime or TensorRT for 3x–5x faster CPU/GPU inference.",
          ],
        },
      ],
    },
    {
      id: "applied-domains-production",
      title: "6. Recommenders, Time-Series, Production Pipelines & ML System Design",
      topics: [
        {
          id: "special-cases",
          title: "Recommender Systems (Two-Tower + Ranking) & Time-Series Forecasting",
          minutes: 9,
          summary: "Architect multi-stage Retrieval-and-Ranking recommender pipelines and leak-free temporal forecasting systems.",
          body: [
            "Industrial recommender and search systems (YouTube, Netflix, Amazon, DoorDash) cannot score 10 million catalog items with a heavy model in 50ms. They use a **Multi-Stage Funnel**: (1) **Candidate Generation / Retrieval** uses a Two-Tower neural embedding model + ANN index (FAISS/HNSW) or collaborative filtering to narrow millions of items to ~500 candidates in <10ms; (2) **Ranking** scores those 500 candidates using a rich GBDT or Deep & Cross Network (DCN) with real-time user/context features; (3) **Re-ranking** applies diversity, freshness, and business rules.",
            "For **Time-Series Forecasting** (demand, inventory, energy load), split strictly by time using rolling-origin backtesting, engineer calendar/holiday and lagged target features carefully, and benchmark statistical baselines (Seasonal Naive, ETS, ARIMA) against global LightGBM or temporal deep learning models.",
          ],
          points: [
            "Separate large-scale recommenders into Candidate Retrieval (Two-Tower ANN) followed by Heavy Ranking (GBDT / Deep Ranker).",
            "Evaluate ranking systems with offline NDCG@K, Recall@K, and Mean Average Precision (MAP) before online A/B tests.",
            "For time series, never shuffle data across time; always benchmark against a Seasonal Naive baseline first.",
          ],
        },
        {
          id: "ml-pipelines",
          title: "Reproducible ML Pipelines, Experiment Tracking & Model Serving APIs",
          minutes: 8,
          summary: "Package training pipelines, track experiments in MLflow, eliminate training-serving skew, and serve via FastAPI.",
          body: [
            "Refactor notebook experiments into modular, tested Python packages with deterministic seeds, declarative YAML/Hydra configs, data schema checks (Pandera), and **MLflow / Weights & Biases** tracking of datasets, hyperparameters, metrics, and serialized model artifacts.",
            "Bundle preprocessing transforms and the estimator into a single artifact so serving applies identical feature transformations (`training-serving skew` is the #1 silent killer of production ML). Serve low-latency predictions via FastAPI/gRPC or high-volume batch scoring jobs.",
          ],
          points: [
            "Serialize the entire preprocessing + model pipeline as a single versioned artifact to prevent training-serving skew.",
            "Log dataset hashes, git commit SHA, hyperparameters, and fold metrics to MLflow on every run.",
            "Shadow-test new models on live production traffic before routing user-facing decisions to them.",
          ],
        },
        {
          id: "ml-system-design",
          title: "End-to-End ML System Design (Fraud, Search, Pricing, Feed Ranking)",
          minutes: 9,
          summary: "Structure real-world ML system design interviews and architecture reviews from business objective to drift monitoring.",
          body: [
            "Whether designing real-time credit card fraud detection, dynamic ride-share pricing, or personalized newsfeed ranking, follow a rigorous 7-step architecture framework: (1) Translate business goals into a precise ML objective (pointwise classification, pairwise ranking, expected value regression); (2) Define offline metrics (PR-AUC, NDCG@10) and online north-star & guardrail metrics; (3) Architect data collection, delayed feedback labels, and counter-selection bias.",
            "(4) Design streaming (Kafka/Flink/Redis) vs batch (Spark/Snowflake) features in a Feature Store; (5) Select baseline and production model tiers within latency budgets (e.g., <25ms p99); (6) Plan shadow/canary deployment and A/B testing; (7) Monitor feature drift (PSI), calibration shift, and automated retraining loops.",
          ],
          points: [
            "Always connect offline ML metrics (ROC-AUC, NDCG) to online business KPIs (conversion rate, fraud loss bps).",
            "Account for delayed labels (e.g., chargebacks take 60 days) and negative sampling bias in your training pipeline.",
            "Design graceful fallbacks (cached predictions or heuristic rules) when real-time feature stores or model servers time out.",
          ],
        },
        S.docker,
        S.monitoring,
      ],
    },
  ],
};
