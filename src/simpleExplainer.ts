import type { Topic } from "./types";

export interface SimpleTake {
  vibe: string;
  analogy: string;
  noCodeStep: string;
}

const CUSTOM_VIBES: Record<string, SimpleTake> = {
  "python-essentials": {
    vibe: "Python is basically English with superpowers — it's the remote control for almost every AI tool on earth.",
    analogy: "Think of Python like LEGO bricks: you don't mold the plastic yourself, you snap ready-made blocks (libraries) together to build a spaceship.",
    noCodeStep: "Open Google Colab in your browser (zero install) and run `print('Hello AI')` — boom, you're officially coding.",
  },
  "how-llms-work": {
    vibe: "LLMs don't 'think' like humans — they play the world's most advanced game of autocomplete, one word-piece (token) at a time.",
    analogy: "Imagine a friend who read the entire internet and finishes your sentences with spooky accuracy, but sometimes makes up facts just to sound confident.",
    noCodeStep: "Paste a paragraph into an AI chat and ask it to 'give me 3 completely different endings' to see next-token prediction in action.",
  },
  "prompt-design": {
    vibe: "Prompting is giving clear briefing notes to a genius intern who takes everything literally.",
    analogy: "Ordering 'food' gets you anything; ordering 'a spicy paneer wrap, no onions, cut in half' gets you exactly what you craved.",
    noCodeStep: "Take your last vague ChatGPT prompt and rewrite it with Role + Task + Example + Output Format.",
  },
  rag: {
    vibe: "RAG = letting the AI open your notes during the exam instead of relying on its fuzzy memory.",
    analogy: "Closed-book exam vs open-book exam with sticky notes on the exact pages you need.",
    noCodeStep: "Upload a PDF to ChatGPT or NotebookLM and ask a question with 'cite the exact paragraph' — that's RAG!",
  },
  "tool-use": {
    vibe: "Tools give AI hands — instead of just talking, it can check live weather, query a database, or send a calendar invite.",
    analogy: "A brain in a jar vs a person with a smartphone and calculator.",
    noCodeStep: "Ask an AI assistant to calculate `48912 * 99123` using code execution or search today's news.",
  },
  "agent-loop": {
    vibe: "An AI Agent is a model running in a loop: Goal → Think → Use Tool → Check Result → Repeat until done.",
    analogy: "A single prompt is asking for directions; an agent is hiring a driver who checks traffic, takes detours, and parks the car.",
    noCodeStep: "Sketch a 4-step task you do every Monday and mark which steps need judgement vs clicking a button.",
  },
  "ml-fundamentals": {
    vibe: "Classic Machine Learning is teaching computers by showing 10,000 examples instead of writing 10,000 if-else rules.",
    analogy: "Like teaching a kid what a 'dog' is by pointing at dogs in the park rather than measuring ear-length with a ruler.",
    noCodeStep: "Think of your spam folder: every time you click 'Report Spam', you're labeling training data.",
  },
  "ai-regulation": {
    vibe: "AI laws (like the EU AI Act) sort AI by danger level — harmless spam filters get a pass, while AI that decides jobs or loans gets strict audits.",
    analogy: "Bicycles don't need a license, cars need a driver's test, and commercial airplanes need black boxes and daily inspections.",
    noCodeStep: "Pick one AI app you use daily and ask: 'If this makes a mistake, who gets hurt and how badly?'",
  },
};

export function getSimpleTake(topic: Topic): SimpleTake {
  const custom = CUSTOM_VIBES[topic.id];
  if (custom) return custom;

  return {
    vibe: `${topic.title} in plain English: ${topic.summary.replace(/\.$/, "")} — without needing a PhD to get why it matters.`,
    analogy: `Think of "${topic.title}" like upgrading from manual gear to autopilot: ${topic.points[0] ?? topic.summary}`,
    noCodeStep: `Try explaining "${topic.title}" to a friend in one sentence using these 3 takeaways, then mark this milestone Done for +120 XP!`,
  };
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export function buildTopicQuiz(topic: Topic): QuizQuestion {
  const correct = topic.points[0] ?? topic.summary;
  const distractors = [
    "Ignore validation and deploy directly to production without testing or baselines.",
    "Always train a 70-billion parameter model from scratch before trying a simple prompt.",
    "Store API keys and personal customer data directly inside public Git commits.",
  ];

  // Deterministic shuffle based on topic.id length
  const correctIndex = topic.id.length % 4;
  const options: string[] = [];
  let dIdx = 0;
  for (let i = 0; i < 4; i++) {
    if (i === correctIndex) options.push(correct);
    else options.push(distractors[dIdx++]);
  }

  return {
    question: `Quick Vibe Check: Which rule actually holds true for "${topic.title}"?`,
    options,
    correctIndex,
    explanation: `Spot on! "${correct}" is a core principle of ${topic.title}.`,
  };
}
