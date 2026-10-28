import type { Topic } from "../types";

// Topics reused by several role roadmaps. Keys are for code; `id` is the URL part.
export const core = {
  pythonEssentials: {
    id: "python-essentials",
    title: "Python for AI work",
    minutes: 7,
    summary: "The Python habits that matter on the job, beyond syntax.",
    body: [
      "Python is the working language of AI. After the basics (variables, loops, functions, lists, dictionaries), learn the habits that teams expect: one virtual environment per project, type hints, small functions, reading stack traces calmly, and tests with pytest. You do not need advanced tricks. You need to read other people's code and write clear scripts and services.",
      "Learn the core libraries for your role: NumPy and pandas for data, httpx or requests for APIs, pydantic for validation, FastAPI for services. Learn async basics as well. Model calls spend most of their time waiting on the network, and async lets one process serve many requests at once.",
    ],
    points: [
      "Use a virtual environment and a requirements file for every project.",
      "Type hints and pydantic models catch many bugs early.",
      "Learn pytest and async basics; both are used daily.",
    ],
    example: {
      title: "A typed model and a small function",
      language: "python",
      code: `from pydantic import BaseModel


class Ticket(BaseModel):
    id: int
    subject: str
    priority: str = "normal"


def urgent(tickets: list[Ticket]) -> list[Ticket]:
    return [t for t in tickets if t.priority == "high"]`,
    },
  },
  gitGithub: {
    id: "git-github",
    title: "Git and team workflow",
    minutes: 5,
    summary: "Version control, branches and pull requests.",
    body: [
      "Git records every change to your code so you can go back, compare and collaborate. Learn the daily loop: clone, create a branch, make small commits with clear messages, push, and open a pull request. Reviews catch mistakes and spread knowledge, so treat them as part of the job, not a hurdle.",
      "Never commit secrets such as API keys or passwords. Add them to environment variables and list sensitive files in .gitignore. If a secret is ever pushed, assume it is exposed and rotate it immediately; deleting the commit is not enough.",
    ],
    points: [
      "Small branches and small commits make reviews easy.",
      "Keep secrets out of the repository; rotate any that leak.",
      "A pull request is a conversation, not just a merge button.",
    ],
    example: {
      title: "The everyday loop",
      language: "bash",
      code: `git switch -c add-eval-script
git add evals/run.py
git commit -m "Add eval runner for support bot"
git push -u origin add-eval-script`,
    },
  },
  sqlBasics: {
    id: "sql-basics",
    title: "SQL and data access",
    minutes: 6,
    summary: "Ask questions of relational data and avoid common traps.",
    body: [
      "Most business data lives in relational databases, so SQL is a core skill. Learn SELECT, WHERE, GROUP BY, JOIN, ORDER BY and aggregate functions first. Then window functions and common table expressions, which make analysis queries readable.",
      "Check your results. A join can silently multiply rows if the keys are not unique, and NULL behaves differently from zero or an empty string. Look at row counts before and after every join, and use read-only access when exploring production data.",
    ],
    points: [
      "Master SELECT, JOIN, GROUP BY and aggregates first.",
      "Verify row counts after joins to catch duplicated rows.",
      "Use read-only access on production data.",
    ],
    example: {
      title: "Top customers by revenue",
      language: "sql",
      code: `SELECT customer_id,
       COUNT(*)   AS orders,
       SUM(total) AS revenue
FROM orders
WHERE created_at >= DATE '2026-01-01'
GROUP BY customer_id
ORDER BY revenue DESC
LIMIT 10;`,
    },
  },
  apisHttp: {
    id: "apis-http",
    title: "HTTP, REST and JSON APIs",
    minutes: 6,
    summary: "How services talk to each other, and how to call them safely.",
    body: [
      "Almost every AI system calls or exposes an API. Know the HTTP methods (GET, POST, PUT, DELETE), status codes (200 success, 400 bad request, 401 unauthorised, 429 too many requests, 500 server error), headers and JSON bodies. Read API docs for authentication, rate limits and pagination before writing code.",
      "Write calls defensively: set a timeout, check the status, retry temporary failures with a growing delay, and make repeated requests safe where possible. When you build an API, validate inputs, return clear errors and never trust data from the caller.",
    ],
    points: [
      "Always set timeouts and check status codes.",
      "Retry only temporary errors (429, 5xx) and back off between tries.",
      "Validate every input your own API receives.",
    ],
    example: {
      title: "A careful API call",
      language: "python",
      code: `import httpx

resp = httpx.get(
    "https://api.example.com/v1/items",
    params={"page": 1},
    headers={"Authorization": f"Bearer {token}"},
    timeout=10,
)
resp.raise_for_status()
items = resp.json()["items"]`,
    },
  },
  mlFundamentals: {
    id: "ml-fundamentals",
    title: "Machine learning fundamentals",
    minutes: 8,
    summary: "How models learn from data, and how to tell whether they really did.",
    body: [
      "Machine learning fits a function to examples instead of coding rules by hand. In supervised learning the examples have labels; in unsupervised learning they do not. Data is split into training, validation and test sets. You fit on the first, tune on the second and report on the third, which you touch only at the end.",
      "The central risk is overfitting: a model that memorises training data and fails on new data. Simple baselines, regularisation, more data and honest validation protect you. Always start with a simple baseline so you can tell whether a complex model is worth its cost.",
    ],
    points: [
      "Keep a test set untouched until the final check.",
      "Overfitting means good training scores and poor new-data scores.",
      "A simple baseline tells you whether complexity pays off.",
    ],
  },
  dataPreparation: {
    id: "data-preparation",
    title: "Data preparation and features",
    minutes: 8,
    summary: "Clean data, build features, and avoid leakage.",
    body: [
      "Most of applied ML is data work: fixing missing values, removing duplicates, encoding categories, scaling numbers and creating useful features such as 'days since last purchase'. Put these steps in a pipeline so the same transformations run in training and in production.",
      "Beware of data leakage, where information from the future or from the answer slips into the features. A model that predicts churn using a 'cancelled_date' column looks brilliant and is useless. Split data by time when the real task is forecasting, and fit every transformer on training data only.",
    ],
    points: [
      "Package preprocessing in a pipeline used for training and serving.",
      "Leakage produces results that are too good to be true.",
      "Fit transformers on training data only.",
    ],
    example: {
      title: "A preprocessing and model pipeline",
      language: "python",
      code: `from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler

numeric = Pipeline([
    ("impute", SimpleImputer(strategy="median")),
    ("scale", StandardScaler()),
])
prep = ColumnTransformer([
    ("num", numeric, ["age", "income"]),
    ("cat", OneHotEncoder(handle_unknown="ignore"), ["city"]),
])
model = Pipeline([("prep", prep), ("clf", LogisticRegression(max_iter=500))])`,
    },
  },
  evaluationMetrics: {
    id: "evaluation-metrics",
    title: "Evaluating models",
    minutes: 7,
    summary: "Choose metrics that match the real cost of mistakes.",
    body: [
      "Accuracy is misleading when classes are unbalanced: a model that says 'no fraud' every time is 99% accurate and worthless. Use precision (how many flagged items were right), recall (how many true items were found), F1 and ROC-AUC, and read the confusion matrix. For numbers, use MAE or RMSE.",
      "Pick the metric from the business cost. Missing a cancer scan is worse than a false alarm, so favour recall. Annoying users with false alerts is costly, so favour precision. Report results with uncertainty and compare against a baseline, not against nothing.",
    ],
    points: [
      "Accuracy hides problems on unbalanced data.",
      "Choose precision or recall according to which error costs more.",
      "Always compare with a simple baseline.",
    ],
    example: {
      title: "A per-class report",
      language: "python",
      code: `from sklearn.metrics import classification_report

print(classification_report(y_test, model.predict(X_test)))`,
    },
  },
  deepLearning: {
    id: "deep-learning",
    title: "Deep learning basics",
    minutes: 8,
    summary: "Neural networks, training and why GPUs matter.",
    body: [
      "A neural network is layers of simple units with adjustable weights. Training repeats four steps: predict, measure the loss, compute gradients with backpropagation, and update the weights with an optimiser such as Adam. Activation functions let the network model curves, not just straight lines.",
      "Deep learning needs more data and compute than classical ML, and GPUs make the matrix maths fast. Regularisation tools such as dropout, weight decay and early stopping fight overfitting. Choose it for images, audio and text; for plain tables, gradient-boosted trees are often as good and far cheaper.",
    ],
    points: [
      "Training: predict, measure loss, backpropagate, update weights.",
      "Dropout, weight decay and early stopping reduce overfitting.",
      "For tabular data, try tree-based models before deep networks.",
    ],
  },
  cloudBasics: {
    id: "cloud-basics",
    title: "Cloud basics",
    minutes: 6,
    summary: "Compute, storage, networking and access control in the cloud.",
    body: [
      "Cloud providers rent you computing, storage and managed services by the hour. Learn the main building blocks: virtual machines, object storage, managed databases, networks and identity and access management (IAM). Pick one provider (AWS, Azure or Google Cloud) and learn it well; the ideas transfer.",
      "Security and cost are your responsibility. Give each service the least permission it needs, keep resources private by default, and set budgets and alerts. Forgotten GPU machines are a classic source of surprise bills, so tag resources and shut down what you do not use.",
    ],
    points: [
      "Learn VMs, object storage, managed databases, networking and IAM.",
      "Grant least privilege and keep resources private by default.",
      "Set budgets and alerts; shut down idle GPU machines.",
    ],
  },
  docker: {
    id: "docker",
    title: "Containers with Docker",
    minutes: 6,
    summary: "Package an application with everything it needs to run.",
    body: [
      "A container bundles your code, its dependencies and its runtime settings, so it runs the same on your laptop, in CI and on a server. A Dockerfile describes how to build the image. Order its steps so rarely changing layers (installing dependencies) come before often changing ones (your code) to speed up builds.",
      "Keep images small and safe: use a slim base image, do not bake secrets into the image, pass them as environment variables at run time, and run as a non-root user where you can. Docker Compose helps you run an app together with its database locally.",
    ],
    points: [
      "Images make environments reproducible.",
      "Put dependency installation before copying code to use the build cache.",
      "Pass secrets at run time; never bake them into images.",
    ],
    example: {
      title: "A Dockerfile for a FastAPI service",
      language: "dockerfile",
      code: `FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]`,
    },
  },
  cicd: {
    id: "ci-cd",
    title: "Testing and CI/CD",
    minutes: 7,
    summary: "Run checks automatically on every change and ship safely.",
    body: [
      "Continuous integration runs your tests, linters and type checks on every push, so broken code is caught before it merges. Continuous delivery then builds and deploys the passing code in a repeatable way. Together they replace risky manual releases with small, frequent, reversible ones.",
      "AI projects need extra checks in the pipeline: a quick evaluation run on a fixed test set, a check that prompts or models were not changed without review, and a data validation step. Fail the build when quality drops below an agreed threshold.",
    ],
    points: [
      "Automate tests, linting and type checks on every pull request.",
      "Add an evaluation gate for models and prompts.",
      "Prefer small, frequent, reversible releases.",
    ],
    example: {
      title: "A minimal GitHub Actions workflow",
      language: "yaml",
      code: `name: ci
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
      - run: pip install -r requirements.txt
      - run: pytest -q`,
    },
  },
  monitoring: {
    id: "monitoring",
    title: "Monitoring and observability",
    minutes: 7,
    summary: "Know what your system is doing and whether it is still good.",
    body: [
      "Observability rests on logs (what happened), metrics (how much and how fast) and traces (the path of one request through many steps). Track the basics: request rate, error rate, latency percentiles and cost. Alert on symptoms users feel, such as slow or failing requests, not only on server internals.",
      "AI systems can fail silently: the service is up but answers got worse, or the input data changed. Sample real outputs for review, collect user feedback, track quality scores over time and watch input distributions for drift. Without this you learn about problems from angry users.",
    ],
    points: [
      "Logs, metrics and traces answer different questions.",
      "Alert on user-visible symptoms.",
      "Track quality and data drift, since AI can degrade silently.",
    ],
  },
} satisfies Record<string, Topic>;
