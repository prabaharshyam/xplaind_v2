import type { Roadmap } from "../../types";
import { S } from "../shared";

export const genAiEngineer: Roadmap = {
  slug: "generative-ai-llm-engineer",
  title: "Generative AI & LLM Engineer",
  emoji: "✨",
  description:
    "Go deep on large language models: how they work, how to adapt them, retrieve knowledge for them, evaluate them and serve them efficiently.",
  audience:
    "Engineers who want to work on the model layer: fine-tuning, retrieval quality, evaluation and inference performance.",
  tools: ["Python", "PyTorch", "Hugging Face Transformers", "PEFT / LoRA", "vLLM-style servers", "Vector databases", "GPUs"],
  outcomes: [
    "Explain tokenisation, attention and the stages of model training.",
    "Fine-tune a model with LoRA on a clean dataset and measure the gain.",
    "Build advanced retrieval pipelines and serve a model with good throughput.",
  ],
  sections: [
    {
      id: "foundations",
      title: "Foundations",
      topics: [S.pythonEssentials, S.mlFundamentals, S.deepLearning, S.transformersLlms],
    },
    {
      id: "inside",
      title: "Inside language models",
      topics: [
        {
          id: "tokenization",
          title: "Tokenisation and embeddings",
          minutes: 6,
          summary: "How text becomes numbers, and why it affects cost and quality.",
          body: [
            "Models do not see characters or words but tokens, pieces found by algorithms such as byte-pair encoding. A token is often a short word or part of one. Token counts drive cost and context limits, and the same text can need very different token counts in different languages and scripts.",
            "Each token maps to an embedding vector the model learns. Odd tokenisation explains surprising failures such as poor letter counting or arithmetic. Always count tokens with the model's own tokenizer, never by estimating from words.",
          ],
          points: [
            "Tokens, not words, set cost and context limits.",
            "Different languages can use very different token counts.",
            "Use the model's own tokenizer to count.",
          ],
        },
        {
          id: "attention-transformer",
          title: "Attention and the transformer",
          minutes: 9,
          summary: "The architecture behind modern language models.",
          body: [
            "A transformer stacks layers that each contain self-attention and a feed-forward network. Self-attention lets every token compute how much to draw from every earlier token, using query, key and value vectors. Positional information tells the model token order. Decoder-only transformers generate text one token at a time.",
            "Attention cost grows with the square of the sequence length, which is why long contexts are expensive and why many optimisations exist. During generation, the model stores past keys and values (the KV cache) to avoid recomputing them, trading memory for speed.",
          ],
          points: [
            "Self-attention mixes information across tokens using queries, keys and values.",
            "Attention cost grows quadratically with sequence length.",
            "The KV cache saves compute but uses memory.",
          ],
        },
        {
          id: "pretraining-scaling",
          title: "Pretraining and scaling",
          minutes: 7,
          summary: "How base models are trained and why scale matters.",
          body: [
            "Pretraining teaches a model to predict the next token over trillions of tokens of text and code. This takes large clusters of GPUs and careful data curation: deduplication, quality filtering and removal of unwanted content. The result is a base model with broad knowledge but no instruction-following manners.",
            "Scaling studies show that loss falls predictably as model size, data and compute grow together. Practitioners rarely pretrain from scratch; they choose a base model, so understanding data quality and licence terms matters more than the training code.",
          ],
          points: [
            "Pretraining predicts the next token over a very large corpus.",
            "Data quality and licensing are central.",
            "Most teams adapt existing models rather than pretrain.",
          ],
        },
        {
          id: "post-training",
          title: "Instruction tuning and alignment",
          minutes: 8,
          summary: "From base model to helpful assistant: SFT, RLHF and DPO.",
          body: [
            "Supervised fine-tuning (SFT) trains the base model on example conversations so it follows instructions. Preference methods then teach it which answers people prefer. Reinforcement learning from human feedback (RLHF) trains a reward model and optimises against it; Direct Preference Optimisation (DPO) learns from preferred and rejected pairs without a separate reward model.",
            "Alignment also covers safety behaviour and refusals. These stages shape tone, helpfulness and risk, and poor preference data can teach flattery or over-refusal. Learn the ideas so you can read model reports and choose fine-tuning methods sensibly.",
          ],
          points: [
            "SFT teaches instruction following from examples.",
            "RLHF and DPO learn from human preference comparisons.",
            "Bad preference data can cause flattery or over-refusal.",
          ],
        },
      ],
    },
    {
      id: "adapting",
      title: "Adapting models",
      topics: [
        S.promptDesign,
        S.structuredOutput,
        {
          id: "datasets-synthetic",
          title: "Building datasets and synthetic data",
          minutes: 7,
          summary: "Quality examples matter more than quantity.",
          body: [
            "A few hundred to a few thousand clean, diverse, correctly labelled examples often beat a huge noisy set. Define the task and format, collect real inputs, write or review the outputs carefully, remove duplicates and personal data, and keep a held-out evaluation set that is never used for training.",
            "Stronger models can generate synthetic training data, but it needs filtering and human spot checks, and you must respect the generating model's terms of use. Watch for contamination: evaluation items leaking into training data inflate scores.",
          ],
          points: [
            "Clean, diverse examples beat large noisy sets.",
            "Hold out an evaluation set and guard against contamination.",
            "Filter and review synthetic data; check licence terms.",
          ],
        },
        {
          id: "lora-finetuning",
          title: "Fine-tuning with LoRA and QLoRA",
          minutes: 9,
          summary: "Adapt large models cheaply by training small add-on weights.",
          body: [
            "Full fine-tuning updates every weight and needs a lot of GPU memory. LoRA freezes the base model and trains small low-rank matrices added to chosen layers, often well under one percent of the parameters. QLoRA also loads the base model in 4-bit precision to fit larger models on modest hardware.",
            "Tune the rank, learning rate and number of epochs, and watch validation loss to stop before overfitting. Evaluate on your held-out set and on general tasks to check you did not damage other abilities. Adapters can be swapped or merged at deployment.",
          ],
          points: [
            "LoRA trains small adapters while the base stays frozen.",
            "QLoRA adds 4-bit quantisation to save memory.",
            "Check both task gains and general-ability regressions.",
          ],
          example: {
            title: "Attach a LoRA adapter with PEFT",
            language: "python",
            code: `from peft import LoraConfig, get_peft_model

config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "v_proj"],
    lora_dropout=0.05,
    task_type="CAUSAL_LM",
)
model = get_peft_model(base_model, config)
model.print_trainable_parameters()`,
          },
        },
      ],
    },
    {
      id: "retrieval-apps",
      title: "Retrieval and applications",
      topics: [
        S.embeddingsSearch,
        S.rag,
        {
          id: "advanced-rag",
          title: "Advanced RAG techniques",
          minutes: 8,
          summary: "Chunking, hybrid search, reranking and query rewriting.",
          body: [
            "Improve retrieval step by step. Chunk by document structure (headings, sections) with some overlap, add metadata for filtering, combine keyword and vector search, then rerank the top results with a cross-encoder model that reads the question and passage together. Rewrite vague or multi-part questions before searching.",
            "Measure each change. Track recall at k on labelled questions, then answer faithfulness. Complex corpora may need parent-child chunks, graph-based links or tables handled separately. Do not add components without evidence they help.",
          ],
          points: [
            "Chunk by structure, add metadata, combine keyword and vector search.",
            "A reranker often gives a large quality jump.",
            "Measure recall at k before and after every change.",
          ],
        },
        S.toolUse,
        {
          id: "multimodal",
          title: "Multimodal models",
          minutes: 6,
          summary: "Working with images, audio and documents as well as text.",
          body: [
            "Many models now accept images, audio or video, and some produce them. Practical uses include reading charts and scanned forms, transcribing speech, describing images and generating pictures. Vision-language models usually convert images into tokens the language model can attend to.",
            "Test multimodal features on your own data: handwriting, poor scans, small text and unusual layouts cause errors. Be careful with privacy (faces, voices), copyright of generated content and the larger cost of image and audio tokens.",
          ],
          points: [
            "Images and audio are converted to tokens the model reads.",
            "Test on messy real inputs such as scans and handwriting.",
            "Consider privacy, copyright and higher token costs.",
          ],
        },
      ],
    },
    {
      id: "evaluation-safety",
      title: "Evaluation and safety",
      topics: [S.llmEvaluation, S.guardrailsSecurity, S.responsibleAi],
    },
    {
      id: "serving",
      title: "Serving and optimisation",
      topics: [
        {
          id: "inference-optimisation",
          title: "Inference optimisation",
          minutes: 9,
          summary: "Make models faster and cheaper to run.",
          body: [
            "Generation has two phases: prefill, which processes the prompt in parallel, and decoding, which produces tokens one by one and is limited by memory bandwidth. Key techniques are quantisation (storing weights in 8 or 4 bits), continuous batching, KV-cache management such as paged attention, and speculative decoding where a small model drafts tokens that a large one verifies.",
            "Each trade-off affects quality, so re-evaluate after quantising. Choose the metric that matters: time to first token for chat, tokens per second for throughput and cost per million tokens for batch work.",
          ],
          points: [
            "Prefill is compute-bound; decoding is memory-bound.",
            "Quantisation, batching, KV-cache tricks and speculative decoding speed things up.",
            "Re-run evaluations after any optimisation.",
          ],
        },
        {
          id: "serving-llms",
          title: "Serving LLMs in production",
          minutes: 7,
          summary: "Model servers, GPUs, scaling and fallbacks.",
          body: [
            "Use a purpose-built inference server with continuous batching and an OpenAI-compatible API rather than writing your own. Size GPUs by model memory (weights plus KV cache for expected concurrency), autoscale on queue depth or latency, and keep spare capacity for traffic spikes.",
            "Plan for failure: set timeouts, add a fallback model or provider, load test before launch and cache frequent results. Compare self-hosting with managed APIs on total cost, including engineering time, not just GPU price.",
          ],
          points: [
            "Use an inference server with continuous batching.",
            "Size GPU memory for weights plus KV cache.",
            "Load test, add fallbacks and compare with managed APIs.",
          ],
        },
        S.costLatency,
        S.monitoring,
      ],
    },
  ],
};
