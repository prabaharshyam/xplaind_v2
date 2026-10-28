import type { Roadmap } from "../../types";
import { S } from "../shared";

export const aiProductManager: Roadmap = {
  slug: "ai-product-manager",
  title: "AI Product Manager",
  emoji: "🧭",
  description:
    "Decide what AI products to build, define how they should behave, measure whether they work and launch them responsibly.",
  audience:
    "Product managers, analysts and founders who guide AI features without necessarily writing the models themselves.",
  tools: ["Product requirement docs", "Evaluation sheets", "A/B testing tools", "Analytics dashboards", "Prompt playgrounds", "Cost models"],
  outcomes: [
    "Pick problems where AI creates real value and is feasible.",
    "Write a product spec that defines behaviour, quality bar and failure handling.",
    "Plan experiments, launch safely and manage cost, risk and adoption.",
  ],
  sections: [
    {
      id: "ai-literacy",
      title: "AI literacy for product people",
      topics: [
        S.mlFundamentals,
        S.transformersLlms,
        {
          id: "capabilities-limits",
          title: "What AI can and cannot do",
          minutes: 7,
          summary: "A practical map of strengths, weaknesses and risks.",
          body: [
            "AI is strong at classifying, extracting, summarising, drafting, translating, searching by meaning and finding patterns in large data. It is weaker at exact arithmetic, guaranteed facts, rare edge cases and tasks that need up-to-date or private knowledge unless you provide it. Every output has some chance of being wrong.",
            "Learn to test an idea yourself: try 20 real examples in a playground and note where it fails. That hands-on view, including the ugly cases, helps you judge feasibility and write honest requirements.",
          ],
          points: [
            "Strong at language, patterns and drafting; weaker at exactness.",
            "Every output carries some error probability.",
            "Try 20 real examples before committing to an idea.",
          ],
        },
      ],
    },
    {
      id: "discovery",
      title: "Discovery and strategy",
      topics: [
        {
          id: "choosing-problems",
          title: "Choosing problems worth solving with AI",
          minutes: 7,
          summary: "Score ideas on user value, feasibility and risk.",
          body: [
            "Start with a user problem, not a technology. Good AI candidates are frequent, costly, tolerant of occasional errors or easy to review, and supported by available data. Score ideas on value, feasibility, data readiness and risk, and compare AI with simpler options such as rules or better UX.",
            "Ask what happens when the AI is wrong. If a wrong answer is cheap to catch (a draft email), AI fits well. If it is dangerous or irreversible (a medical dose), add human review or choose another approach.",
          ],
          points: [
            "Start from the user problem and compare non-AI options.",
            "Score on value, feasibility, data readiness and risk.",
            "Consider the cost of a wrong answer.",
          ],
        },
        {
          id: "user-research-ai",
          title: "Researching users for AI features",
          minutes: 6,
          summary: "Learn how people work, what they trust and where they need control.",
          body: [
            "Interview users about their current workflow, pain points and the decisions they make. Observe how they check information and what makes them trust or distrust a tool. Collect real examples of inputs and good outputs; these become your first evaluation set.",
            "Prototype with a person or a simple prompt behind the scenes (a 'Wizard of Oz' test) to learn how people react before investing in engineering. Pay attention to when they want to edit, undo or override.",
          ],
          points: [
            "Collect real examples; they seed your evaluation set.",
            "Test the experience early with a simple prototype.",
            "Learn where users need control and verification.",
          ],
        },
        {
          id: "data-strategy",
          title: "Data strategy",
          minutes: 7,
          summary: "Do you have the data, the rights to use it and a feedback loop?",
          body: [
            "Ask four questions. Do we have enough relevant data? Is it accurate and representative? Do we have the legal right to use it for this purpose? How will usage generate better data over time? A strong feedback loop, such as users correcting outputs, can become a lasting advantage.",
            "Plan data ownership, access, retention and quality checks early. Poor data is the most common reason AI projects slip. Involve privacy and legal teams before collection, not after.",
          ],
          points: [
            "Check data volume, quality, representativeness and rights.",
            "Design a feedback loop that improves data over time.",
            "Involve privacy and legal early.",
          ],
        },
        {
          id: "build-buy",
          title: "Build, buy or fine-tune",
          minutes: 6,
          summary: "Choose between APIs, open models, vendors and custom training.",
          body: [
            "Most teams should begin with a hosted model API and strong prompts, because it is the fastest way to learn. Move to retrieval, fine-tuning or self-hosting when evidence shows a need: quality, cost at scale, latency, privacy or control. Evaluate vendors on quality, price, reliability, data terms and exit options.",
            "Avoid lock-in by keeping prompts, evaluation sets and data under your control and by abstracting the model behind an interface. Revisit the decision regularly; the market changes quickly.",
          ],
          points: [
            "Start with an API; escalate when evidence demands.",
            "Compare vendors on quality, price, reliability, data terms and exit.",
            "Keep prompts, data and evaluations portable.",
          ],
        },
      ],
    },
    {
      id: "definition",
      title: "Defining the product",
      topics: [
        {
          id: "ai-prd",
          title: "Writing an AI product spec",
          minutes: 8,
          summary: "Specify behaviour with examples, a quality bar and failure plans.",
          body: [
            "An AI spec covers more than screens. Include the user and job to be done, input and output examples (good, bad and edge), the tone and boundaries, the quality bar and how it will be measured, what the system should do when unsure, and how errors are reported and fixed. Example tables are often more useful than prose.",
            "Define non-functional needs too: latency, cost per request, privacy, languages and supported platforms. Treat the spec as a living document that grows with the evaluation set.",
          ],
          points: [
            "Use example tables with good, bad and edge cases.",
            "State the quality bar and the behaviour when unsure.",
            "Include latency, cost, privacy and language needs.",
          ],
        },
        {
          id: "ai-metrics",
          title: "Product and model metrics",
          minutes: 7,
          summary: "Link model quality to user and business outcomes.",
          body: [
            "Use three layers of metrics. Model metrics (accuracy, precision, recall, faithfulness) show technical quality. Product metrics (task completion, edits per draft, time saved, retention) show user value. Business metrics (revenue, cost, satisfaction) show impact. A better model score does not always improve the product.",
            "Offline tests on a fixed set are fast and repeatable; online experiments show real behaviour. Use both, and add guardrail metrics such as complaint rate, escalation rate and cost so you notice harmful side effects.",
          ],
          points: [
            "Track model, product and business metrics together.",
            "Offline evaluation is fast; online experiments are real.",
            "Add guardrail metrics for harm and cost.",
          ],
        },
        {
          id: "ux-for-ai",
          title: "Designing UX for uncertain output",
          minutes: 7,
          summary: "Help users verify, correct and trust AI results.",
          body: [
            "Design for the fact that the AI will sometimes be wrong. Show sources, let users edit and undo, make it easy to give feedback, and indicate confidence honestly. Put the human in control for important actions with previews and confirmations. Stream text so waiting feels shorter.",
            "Set accurate expectations in the interface and the marketing. Explain what the feature does, its limits and how to report problems. Good error states, such as 'I could not find that in your documents', build more trust than confident guesses.",
          ],
          points: [
            "Offer editing, undo, sources and feedback.",
            "Keep humans in control of important actions.",
            "Honest limits and good error states build trust.",
          ],
        },
      ],
    },
    {
      id: "delivery",
      title: "Delivery and launch",
      topics: [
        {
          id: "working-with-ml-teams",
          title: "Working with ML and engineering teams",
          minutes: 6,
          summary: "Plan around uncertainty and experimentation.",
          body: [
            "AI work is experimental: the first approach may not hit the target. Plan in short cycles with clear checkpoints, define the evaluation set early and agree what 'good enough' means. Share real user examples with the team, and review failures together instead of only reviewing averages.",
            "Estimate with ranges, not single dates, and reserve time for data work and evaluation, which usually take longer than modelling. Be ready to change scope when evidence shows a feature is not yet feasible.",
          ],
          points: [
            "Work in short cycles with clear checkpoints.",
            "Review failure cases together, not just averages.",
            "Budget time for data and evaluation work.",
          ],
        },
        S.llmEvaluation,
        {
          id: "experimentation",
          title: "Experiments and A/B testing",
          minutes: 7,
          summary: "Test changes on real users with sound statistics.",
          body: [
            "Randomly assign users to the current and new experience and compare a primary metric defined in advance. Decide the sample size and duration before starting, and avoid stopping the moment results look good, which produces false wins. Check guardrail metrics for harm.",
            "AI features add complications: outputs vary between runs, effects may differ by segment, and novelty can fade. Combine A/B tests with qualitative review of real conversations to understand why numbers moved.",
          ],
          points: [
            "Define the primary metric and sample size in advance.",
            "Do not stop early on a lucky result.",
            "Pair numbers with review of real outputs.",
          ],
        },
        {
          id: "launch-rollout",
          title: "Launch and rollout",
          minutes: 6,
          summary: "Release gradually with the ability to stop quickly.",
          body: [
            "Roll out in stages: internal testing, a small beta, a percentage of users, then everyone. Shadow mode lets the AI run silently beside the existing process so you can compare results before users see anything. Use feature flags and a kill switch.",
            "Prepare support: documentation, escalation paths, a feedback channel and a plan for incidents. Define go/no-go criteria in advance, including quality thresholds and open risks, so launch decisions rest on evidence.",
          ],
          points: [
            "Use staged rollouts, shadow mode and feature flags.",
            "Keep a kill switch and an incident plan.",
            "Set go/no-go criteria before launch.",
          ],
        },
      ],
    },
    {
      id: "business",
      title: "Business and growth",
      topics: [
        {
          id: "unit-economics",
          title: "Cost, pricing and unit economics",
          minutes: 7,
          summary: "Make sure each AI interaction pays for itself.",
          body: [
            "Estimate cost per interaction: tokens in and out, retrieval, hosting, human review and support. Multiply by usage patterns, including heavy users. Compare with the revenue or savings each interaction creates. Model costs change quickly, so rerun the numbers regularly.",
            "Pricing choices include per seat, per usage, per outcome or bundled. Usage-based costs can erode margins on flat plans, so set fair-use limits and tiers. Engineering levers such as smaller models and caching directly improve margin.",
          ],
          points: [
            "Calculate full cost per interaction, including review.",
            "Beware heavy users on flat pricing.",
            "Work with engineering on cost levers.",
          ],
        },
        {
          id: "go-to-market",
          title: "Positioning and go-to-market",
          minutes: 6,
          summary: "Explain value clearly and earn trust to drive adoption.",
          body: [
            "Position around the user's outcome, not the model. Buyers worry about accuracy, security and compliance, so prepare plain-language answers, case studies with real numbers and a trial that lets them test on their own data. Avoid overclaiming; trust is hard to rebuild.",
            "Educate users, since many do not know how to prompt or check AI output. Onboarding, templates and examples raise adoption. Listen to sales and support, because their conversations show real objections.",
          ],
          points: [
            "Sell outcomes, not models.",
            "Prepare accurate answers on security and compliance.",
            "Invest in onboarding and examples.",
          ],
        },
        S.responsibleAi,
        S.aiRegulation,
        S.stakeholderComm,
      ],
    },
  ],
};
