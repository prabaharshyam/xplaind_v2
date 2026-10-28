import type { Roadmap } from "../../types";
import { S } from "../shared";

export const mlEngineer: Roadmap = {
  slug: "machine-learning-engineer",
  title: "Machine Learning Engineer",
  emoji: "📊",
  description:
    "Turn data into models that work in production: preparation, training, evaluation, deployment and ML system design.",
  audience:
    "Developers, data scientists and graduates who want to build and ship predictive models.",
  tools: ["Python", "NumPy / pandas", "scikit-learn", "PyTorch", "MLflow", "FastAPI", "Docker"],
  outcomes: [
    "Prepare data, train, tune and honestly evaluate models.",
    "Build reproducible pipelines and deploy a model behind an API.",
    "Design an end-to-end ML system and explain the trade-offs.",
  ],
  sections: [
    {
      id: "foundations",
      title: "Foundations",
      topics: [
        S.pythonEssentials,
        {
          id: "math-for-ml",
          title: "Maths for machine learning",
          minutes: 8,
          summary: "Just enough linear algebra, probability, statistics and calculus.",
          body: [
            "Linear algebra (vectors, matrices, dot products) describes data and model weights. Probability and statistics (distributions, expectation, variance, conditional probability, hypothesis tests) describe uncertainty. Calculus, mostly gradients, explains how models learn by small steps downhill on a loss.",
            "You need intuition more than proofs: what a gradient means, why variance matters, how a confidence interval is read. Learn by coding small examples in NumPy and plotting them.",
          ],
          points: [
            "Linear algebra represents data; probability represents uncertainty.",
            "Gradients drive learning.",
            "Build intuition by coding small examples.",
          ],
        },
        S.sqlBasics,
        S.gitGithub,
      ],
    },
    {
      id: "core-ml",
      title: "Core machine learning",
      topics: [
        S.mlFundamentals,
        S.dataPreparation,
        {
          id: "classical-algorithms",
          title: "Classical algorithms",
          minutes: 9,
          summary: "Linear models, trees, ensembles, nearest neighbours and clustering.",
          body: [
            "Linear and logistic regression are fast, strong baselines and easy to explain. Decision trees split data by rules; random forests and gradient-boosted trees combine many trees and often win on tabular data. Nearest neighbours and support vector machines suit some smaller problems. Clustering (k-means) and dimensionality reduction (PCA) explore unlabeled data.",
            "Learn what each assumes, how it overfits and which settings control it. Try several on the same split with the same metric and keep the simplest model that meets the need.",
          ],
          points: [
            "Linear models are strong, explainable baselines.",
            "Gradient-boosted trees are often best for tabular data.",
            "Compare models fairly on the same split and metric.",
          ],
        },
        S.evaluationMetrics,
        {
          id: "model-selection-tuning",
          title: "Model selection and tuning",
          minutes: 7,
          summary: "Cross-validation, hyperparameter search and regularisation.",
          body: [
            "Cross-validation splits training data into folds and rotates validation, giving a more stable estimate than a single split. Hyperparameters, such as tree depth or learning rate, are settings you choose before training; search them with grid, random or smarter Bayesian methods using validation scores only.",
            "Regularisation, simpler models, more data and early stopping control overfitting. Keep the test set for one final check. Report the spread across folds, since a small gain inside the noise is not a real gain.",
          ],
          points: [
            "Cross-validation gives steadier estimates.",
            "Tune on validation data; test once at the end.",
            "Ignore improvements smaller than the noise.",
          ],
          example: {
            title: "Randomised search with cross-validation",
            language: "python",
            code: `from scipy.stats import randint
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import RandomizedSearchCV

search = RandomizedSearchCV(
    RandomForestClassifier(random_state=0),
    {"n_estimators": randint(100, 400), "max_depth": randint(3, 20)},
    n_iter=20,
    cv=5,
    scoring="f1",
    random_state=0,
)
search.fit(X_train, y_train)
print(search.best_params_, search.best_score_)`,
          },
        },
        {
          id: "special-cases",
          title: "Imbalanced data and time series",
          minutes: 7,
          summary: "Two situations where standard recipes mislead.",
          body: [
            "With rare positives (fraud, failures) use precision-recall metrics, class weights or resampling, and pick a decision threshold from business costs. Stratified splits keep class ratios consistent across folds.",
            "For time series, never shuffle: split by time so the model only sees the past, and build lag and rolling features carefully to avoid peeking at the future. Evaluate with rolling-origin validation and compare with a naive forecast, such as 'same as last week'.",
          ],
          points: [
            "Rare events: use precision-recall, class weights and tuned thresholds.",
            "Time series: split by time, never shuffle.",
            "Always compare with a naive forecast.",
          ],
        },
      ],
    },
    {
      id: "deep-learning",
      title: "Deep learning",
      topics: [
        S.deepLearning,
        {
          id: "pytorch-training",
          title: "Training with PyTorch",
          minutes: 8,
          summary: "The training loop, batches, learning rates and GPUs.",
          body: [
            "A PyTorch loop iterates over batches: run the model forward, compute the loss, call backward to get gradients, step the optimiser and clear the gradients. Move the model and data to the GPU, use a DataLoader for batching and shuffling, and track training and validation loss each epoch.",
            "The learning rate is the most important setting; too high diverges, too low crawls. Use schedules, gradient clipping when training is unstable, mixed precision for speed and checkpoints so you can resume and pick the best epoch.",
          ],
          points: [
            "Forward, loss, backward, step, zero gradients.",
            "Tune the learning rate first.",
            "Save checkpoints and watch validation loss.",
          ],
          example: {
            title: "A minimal training loop",
            language: "python",
            code: `for epoch in range(epochs):
    model.train()
    for x, y in train_loader:
        x, y = x.to(device), y.to(device)
        optimizer.zero_grad()
        loss = loss_fn(model(x), y)
        loss.backward()
        optimizer.step()`,
          },
        },
        {
          id: "transfer-learning",
          title: "Transfer learning and pretrained models",
          minutes: 6,
          summary: "Start from a pretrained model instead of from zero.",
          body: [
            "A model pretrained on a large dataset has already learned general features. Replace its final layer, freeze most layers, train on your small dataset, then optionally unfreeze and fine-tune with a small learning rate. This needs far less data and compute than training from scratch and is the default for images and text.",
            "Check the pretrained model's licence and the data it was trained on. Use the same preprocessing as in the original training, and compare against a simple baseline to confirm the gain.",
          ],
          points: [
            "Reuse pretrained features; train a new head first.",
            "Match the original preprocessing.",
            "Check licences and compare with a baseline.",
          ],
        },
        S.transformersLlms,
      ],
    },
    {
      id: "engineering",
      title: "From notebook to system",
      topics: [
        {
          id: "ml-pipelines",
          title: "Reproducible ML pipelines",
          minutes: 7,
          summary: "Make training repeatable, testable and automatable.",
          body: [
            "Move code from notebooks into modules with clear stages: load data, validate, transform, train, evaluate, save. Keep configuration in files, set random seeds, pin dependencies and version data. A pipeline lets you rerun everything with one command and lets teammates do the same.",
            "Test the code: unit tests for transformations, checks that the data matches expected columns and ranges, and a quick training run on a small sample in CI. Bugs in data code are common and silent.",
          ],
          points: [
            "Modular stages, configs in files, pinned dependencies.",
            "Validate data and test transformations.",
            "One command should reproduce a result.",
          ],
        },
        S.experimentTracking,
        {
          id: "model-deployment",
          title: "Deploying a model",
          minutes: 8,
          summary: "Batch scoring and real-time APIs.",
          body: [
            "Batch scoring runs a model on a schedule and writes predictions to a table, which is simple and cheap when answers are not needed instantly. Real-time serving wraps the model in an API that loads it once and answers requests quickly. Streaming uses events. Choose by latency need and traffic.",
            "Apply the same preprocessing at serving as in training, validate inputs, version the model and API, log inputs and outputs and set a timeout. Test with realistic data and load before release.",
          ],
          points: [
            "Choose batch, real-time or streaming by latency need.",
            "Use identical preprocessing in training and serving.",
            "Version models and log predictions.",
          ],
          example: {
            title: "A prediction endpoint with FastAPI",
            language: "python",
            code: `import joblib
from fastapi import FastAPI
from pydantic import BaseModel

model = joblib.load("model.joblib")
app = FastAPI()


class Features(BaseModel):
    age: float
    income: float
    city: str


@app.post("/predict")
def predict(f: Features):
    import pandas as pd

    proba = model.predict_proba(pd.DataFrame([f.model_dump()]))[0, 1]
    return {"probability": float(proba)}`,
          },
        },
        S.docker,
        S.cicd,
        S.monitoring,
      ],
    },
    {
      id: "career",
      title: "Design and career",
      topics: [
        {
          id: "ml-system-design",
          title: "ML system design",
          minutes: 9,
          summary: "Structure an end-to-end design from problem to monitoring.",
          body: [
            "Work through a fixed outline: clarify the goal and constraints; define the prediction target and metrics; describe data sources and labels; design features; choose a baseline and a model; plan training and evaluation; choose the serving pattern and latency; and design monitoring, feedback and retraining.",
            "State assumptions and trade-offs aloud: accuracy versus latency, build versus buy, freshness versus cost. Discuss failure modes, bias, privacy and what you would do first with limited time. Interviewers value structured thinking over perfect answers.",
          ],
          points: [
            "Follow a structure from goal to monitoring.",
            "Explain trade-offs and assumptions.",
            "Cover failure modes, bias and privacy.",
          ],
        },
        S.responsibleAi,
        {
          id: "ml-portfolio",
          title: "Portfolio and next steps",
          minutes: 5,
          summary: "Projects that show end-to-end ability.",
          body: [
            "Build projects that go beyond a notebook: a tabular prediction service with tracked experiments and an API, a computer-vision or text model fine-tuned from a pretrained one, and a pipeline with tests and CI. Publish clean repositories with a clear README, results and honest limitations.",
            "Learn adjacent skills as you grow: MLOps for operating models, LLM techniques for language tasks and domain knowledge in an industry you enjoy.",
          ],
          points: [
            "Show end-to-end projects, not only notebooks.",
            "Write READMEs with results and limitations.",
            "Extend into MLOps, LLMs or a domain.",
          ],
        },
      ],
    },
  ],
};
