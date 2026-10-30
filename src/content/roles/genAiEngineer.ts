import type { Roadmap } from "../../types";
import { S } from "../shared";

export const genAiEngineer: Roadmap = {
  slug: "generative-ai-llm-engineer",
  title: "Generative AI & LLM Engineer",
  emoji: "✨",
  description:
    "Master the internals of Large Language Models and Inference Engineering: Transformer architecture, KV-cache physics, GPU Roofline bottlenecks, post-training alignment (SFT/DPO/GRPO), PEFT/QLoRA, quantization (AWQ/FP8), speculative decoding, and distributed serving with vLLM, SGLang, and TensorRT-LLM.",
  audience:
    "Systems, ML, and AI engineers working on the model and inference layer—fine-tuning, post-training alignment, model compression, and high-throughput GPU serving.",
  tools: [
    "PyTorch & CUDA / Triton",
    "Hugging Face Transformers, TRL & PEFT",
    "vLLM, SGLang & TensorRT-LLM",
    "AWQ / GPTQ / FP8 / GGUF",
    "FlashAttention & PagedAttention",
    "NVIDIA Hopper / Blackwell GPUs",
    "AIPerf / GenAI-Bench",
  ],
  outcomes: [
    "Analyze Transformer internals (RoPE, GQA, SwiGLU, MoE, KV-Cache) and diagnose compute-bound vs memory-bandwidth-bound GPU bottlenecks.",
    "Execute post-training pipelines (synthetic dataset curation, SFT, LoRA/QLoRA, DPO, and GRPO) and evaluate capability regressions.",
    "Serve LLMs at scale using vLLM/SGLang/TensorRT-LLM with FP8/AWQ quantization, continuous batching, prefix caching, speculative decoding, and tensor parallelism.",
  ],
  sections: [
    {
      id: "transformer-internals",
      title: "1. Transformer Internals & Modern LLM Architectures",
      topics: [
        {
          id: "tokenization",
          title: "Tokenizers (BPE, Unigram) & Embedding Spaces",
          minutes: 7,
          summary: "How Byte-Pair Encoding (BPE) vocabulary size, fertility, and byte fallback govern LLM context efficiency and arithmetic behavior.",
          body: [
            "Language models operate on discrete integer token IDs produced by sub-word tokenizers such as Byte-Pair Encoding (BPE, used in GPT-4o, Llama 3, Qwen) or SentencePiece Unigram. Vocabulary size (ranging from 32,000 in Llama 2 to 128,000+ in Llama 3 and GPT-4o) directly determines token fertility—the average number of tokens required to encode a word across English, code, and non-Latin scripts.",
            "Every token ID indexes into a learned embedding matrix $E \\in \\mathbb{R}^{|V| \\times d_{\\text{model}}}$. Because tokenization splits numbers and words arbitrarily, understanding BPE merge rules explains why models struggle with character-level tasks, why whitespace formatting affects code generation, and why multilingual prompts can cost 2x–4x more tokens.",
          ],
          points: [
            "Larger vocabularies (100k–150k) compress code and multilingual text into fewer tokens, reducing decoding steps.",
            "Always count tokens using the model's exact tokenizer (`tiktoken` or `AutoTokenizer`) before sizing prompts or billing budgets.",
            "Tokenization artifacts explain character-counting failures and sensitivity to trailing whitespace in prompts.",
          ],
        },
        {
          id: "attention-transformer",
          title: "Modern Transformer Blocks: RoPE, GQA, SwiGLU & Mixture-of-Experts (MoE)",
          minutes: 10,
          summary: "Inside frontier decoder architectures: Rotary Position Embeddings, Grouped-Query Attention, and sparse MoE routing.",
          body: [
            "Modern decoder-only LLMs (Llama 3, DeepSeek-V3, Qwen2.5, Mistral) have evolved significantly beyond the 2017 Transformer. Pre-normalization with RMSNorm stabilizes deep gradient flow; Rotary Position Embeddings (RoPE) encode relative token distances by rotating Query and Key vectors in complex space (enabling context extension to 128k+ tokens); and SwiGLU gated feed-forward layers replace standard ReLU MLPs.",
            "To shrink the memory footprint of the Key-Value (KV) cache during generation, Grouped-Query Attention (GQA) shares a single Key and Value head across multiple Query heads (or compresses KV states into a low-rank latent vector via Multi-head Latent Attention, MLA). Sparse Mixture-of-Experts (MoE) models replace dense MLPs with routed expert sub-networks, activating only a fraction of total parameters (e.g., 37B active out of 671B total) per token.",
          ],
          points: [
            "Grouped-Query Attention (GQA) and Multi-head Latent Attention (MLA) slash KV-cache memory by 4x–8x with minimal quality loss.",
            "RoPE encodes relative token positions and enables long-context scaling via YaRN or rope-theta adjustments.",
            "Mixture-of-Experts (MoE) decouples total parameter capacity from per-token FLOPs, though all expert weights must still reside in VRAM.",
          ],
        },
        {
          id: "pretraining-scaling",
          title: "Pretraining, Chinchilla Scaling Laws & Data Curation Pipelines",
          minutes: 8,
          summary: "How compute-optimal scaling laws, deduplication, and synthetic curriculum mixing produce strong base models.",
          body: [
            "Pretraining minimizes cross-entropy loss on next-token prediction across 10T–15T+ tokens. While Chinchilla scaling laws showed that compute-optimal training scales model parameters and training tokens equally ($N_{\\text{tokens}} \\approx 20 \\times N_{\\text{params}}$), modern inference-optimized models (like Llama 3 8B trained on 15T tokens) deliberately 'over-train' smaller parameter counts so the resulting model is much cheaper to serve in production.",
            "Data quality dominates architecture tweaks: web crawls undergo URL filtering, MinHash/LSH fuzzy deduplication, heuristic quality scoring, classifier-based filtering, PII removal, and late-stage annealing on high-quality math, code, and reasoning corpora.",
          ],
          points: [
            "Modern open-weight models over-train smaller models far beyond Chinchilla optimality to minimize production inference cost.",
            "Deduplication (MinHash), classifier filtering, and late-stage curriculum annealing drive base model reasoning capability.",
            "Continual pretraining on domain corpora requires replay buffers (5–10% general web/code data) to prevent catastrophic forgetting.",
          ],
        },
      ],
    },
    {
      id: "hardware-bottlenecks",
      title: "2. GPU Architecture, Roofline Model & Inference Physics",
      topics: [
        {
          id: "prefill-decode-roofline",
          title: "Prefill vs Decode Phases, Arithmetic Intensity & The Roofline Model",
          minutes: 9,
          summary: "Why LLM prefill is compute-bound (FLOP/s) while autoregressive token decoding is memory-bandwidth-bound (TB/s).",
          body: [
            "LLM inference consists of two distinct hardware regimes. First, the Prefill Phase processes all input prompt tokens in parallel through matrix-matrix multiplications (GEMMs): it has high arithmetic intensity (FLOPs per byte transferred from HBM) and is compute-bound, determining Time-to-First-Token (TTFT).",
            "Second, the Decode Phase generates output tokens one at a time. To emit just one token for a batch size of 1, the GPU must stream every single model weight plus the entire KV-cache from High Bandwidth Memory (HBM) into SRAM Tensor Cores. Because arithmetic intensity is ~1–2 ops/byte, decoding is strictly memory-bandwidth-bound, governing Inter-Token Latency (ITL) and Tokens Per Second (TPS).",
          ],
          points: [
            "Prefill (parallel prompt processing) is compute-bound and governs Time-to-First-Token (TTFT).",
            "Decode (token-by-token generation) is memory-bandwidth-bound and governs Inter-Token Latency (ITL).",
            "Increasing batch size or using quantization raises arithmetic intensity and moves decoding closer to the GPU's compute roofline.",
          ],
          example: {
            title: "Theoretical max tokens/sec from GPU memory bandwidth",
            language: "python",
            code: `def max_decode_tps(model_params_billions: float, bytes_per_param: float, hbm_bandwidth_gb_s: float) -> float:
    """For batch_size=1, every token requires reading all model weights from HBM once."""
    model_size_gb = model_params_billions * bytes_per_param
    return hbm_bandwidth_gb_s / model_size_gb

# Llama-3-70B in FP16 (2 bytes) on an NVIDIA H100 SXM (3,350 GB/s HBM3):
print(f"{max_decode_tps(70, 2.0, 3350):.1f} tokens/sec ceiling at batch=1")  # ~23.9 tok/s`,
          },
        },
        {
          id: "gpu-hardware-kernels",
          title: "GPU Architecture (H100 / Blackwell), FlashAttention & Custom Kernels",
          minutes: 9,
          summary: "Understand HBM vs SRAM hierarchy, NVLink interconnects, FlashAttention tiling, and CUDA/Triton kernel fusion.",
          body: [
            "Data center GPUs like NVIDIA Hopper (H100/H200) and Blackwell (B200) pair massive Tensor Core compute with fast High Bandwidth Memory (HBM3e, 3.35–8.0 TB/s) and a small, ultra-fast on-chip SRAM (L1/Shared Memory, ~20+ TB/s). Naive PyTorch operations materialize intermediate tensors (like the $N \\times N$ attention matrix) back and forth to slow HBM.",
            "FlashAttention (v2/v3) uses online softmax tiling to compute exact attention entirely inside on-chip SRAM without ever writing the $N \\times N$ matrix to HBM, reducing attention memory from $O(N^2)$ to $O(N)$ and accelerating long-context prefill by 3x–5x. Kernel fusion via `torch.compile` or OpenAI Triton merges sequential elementwise ops (RMSNorm, RoPE, SiLU) into a single HBM round-trip.",
          ],
          points: [
            "On-chip SRAM is an order of magnitude faster than HBM VRAM; minimizing HBM reads/writes is the core of kernel optimization.",
            "FlashAttention tiles Q, K, and V blocks in SRAM with online softmax, making 128k context windows feasible.",
            "NVLink (900–1800 GB/s) is essential for multi-GPU Tensor Parallelism due to all-reduce synchronization after every layer.",
          ],
        },
      ],
    },
    {
      id: "post-training-finetuning",
      title: "3. Post-Training, Alignment & Parameter-Efficient Fine-Tuning",
      topics: [
        {
          id: "datasets-synthetic",
          title: "Instruction Dataset Curation, Synthetic Distillation & Decontamination",
          minutes: 8,
          summary: "Build high-signal SFT and preference datasets using frontier model distillation, verifier rejection sampling, and n-gram decontamination.",
          body: [
            "In post-training, 1,000 meticulously verified, diverse instruction-response pairs consistently outperform 100,000 noisy scraped examples (the LIMA principle). Teams use strong frontier models to synthesize domain examples, then filter them with deterministic verifiers (compilers, unit tests, SQL parsers, JSON validators) or LLM-as-a-Judge rubrics.",
            "Before training, run strict n-gram and embedding decontamination against your evaluation benchmarks so test questions never leak into training splits, and strip personally identifiable information (PII) and unwanted refusal patterns.",
          ],
          points: [
            "Use rejection sampling: generate $N$ candidate completions per prompt and keep only those that pass unit tests or verifier checks.",
            "Decontaminate training data against all evaluation benchmarks to prevent inflated metrics.",
            "Balance task distribution so the fine-tuned model does not overfit to a single response length or style.",
          ],
        },
        {
          id: "lora-finetuning",
          title: "Parameter-Efficient Fine-Tuning: LoRA, QLoRA & Multi-LoRA Serving",
          minutes: 9,
          summary: "Freeze base weights and train low-rank adapters ($W_0 + BA$) in 16-bit or 4-bit NormalFloat (NF4) precision.",
          body: [
            "Full-parameter fine-tuning of a 70B model requires >500 GB of VRAM for weights, gradients, and AdamW optimizer states. Low-Rank Adaptation (LoRA) freezes the pretrained weight matrix $W_0 \\in \\mathbb{R}^{d \\times k}$ and injects trainable low-rank matrices $B \\in \\mathbb{R}^{d \\times r}$ and $A \\in \\mathbb{R}^{r \\times k}$ where rank $r \\ll \\min(d, k)$ (typically $r = 16$ or $32$), cutting trainable parameters by >99%.",
            "QLoRA quantizes the frozen base model to 4-bit NormalFloat (NF4) with double quantization while computing gradients in BFloat16, fitting a 70B fine-tuning run on a single 80GB GPU. Applying LoRA across all linear projection layers (`q_proj`, `k_proj`, `v_proj`, `o_proj`, `gate_proj`, `up_proj`, `down_proj`) matches full fine-tuning quality.",
          ],
          points: [
            "Apply LoRA to all attention and MLP linear layers (not just Q and V) for quality parity with full fine-tuning.",
            "Use QLoRA (4-bit NF4 base + BF16 adapters) when GPU memory is constrained; merge adapters or serve dynamically with Multi-LoRA in vLLM.",
            "Always evaluate on both your target domain test set and general capability benchmarks (MMLU, IFEval) to detect catastrophic forgetting.",
          ],
          example: {
            title: "Configure LoRA across all linear modules with Hugging Face PEFT",
            language: "python",
            code: `from peft import LoraConfig, get_peft_model

config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj"],
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM",
)
model = get_peft_model(base_model, config)
model.print_trainable_parameters()`,
          },
        },
        {
          id: "post-training",
          title: "Alignment: SFT, RLHF (PPO), Direct Preference Optimization (DPO) & GRPO",
          minutes: 9,
          summary: "Align instruction models using human preference pairs (DPO) and verifiable reward reinforcement learning (GRPO).",
          body: [
            "Post-training proceeds in stages: Supervised Fine-Tuning (SFT) teaches instruction formatting via behavioral cloning. Next, preference alignment shapes helpfulness, tone, and safety using chosen vs rejected response pairs $(x, y_w, y_l)$. Direct Preference Optimization (DPO) optimizes policy weights directly on preference pairs using a closed-form classification loss, avoiding the memory overhead of training a separate reward model in PPO-based RLHF.",
            "For reasoning, math, and coding models (such as DeepSeek-R1), Group Relative Policy Optimization (GRPO) samples a group of completions per prompt, scores them with deterministic verifiers (e.g., code execution or exact math check), and normalizes rewards across the group without needing a critic network.",
          ],
          points: [
            "SFT imitates demonstrations; DPO contrasts chosen vs rejected completions to suppress subtle failure modes.",
            "GRPO (Group Relative Policy Optimization) uses verifiable rewards (unit tests, compilers) to train reasoning chains without a separate value network.",
            "Monitor KL-divergence from the reference model so alignment does not collapse output diversity or cause reward hacking.",
          ],
        },
      ],
    },
    {
      id: "inference-optimization",
      title: "4. Inference Optimization: Quantization,KV-Cache & Speculative Decoding",
      topics: [
        {
          id: "quantization-methods",
          title: "Model Quantization: FP8, INT8, AWQ, GPTQ & GGUF",
          minutes: 9,
          summary: "Compress model weights and activations to slash VRAM footprint and multiply token throughput.",
          body: [
            "Post-Training Quantization (PTQ) maps 16-bit (BF16/FP16) weights into lower-precision representations (FP8, INT8, INT4). Because neural network activations contain extreme outlier channels (~0.1% of features with 100x magnitude), naive uniform rounding destroys model perplexity.",
            "Activation-Aware Weight Quantization (AWQ) identifies the 1% most salient weight channels based on activation magnitudes and scales them before 4-bit quantization. On NVIDIA Hopper/Blackwell GPUs, native hardware FP8 (W8A8—8-bit weights and 8-bit activations) doubles Tensor Core FLOPs and halves memory bandwidth with virtually zero quality degradation.",
          ],
          points: [
            "Use native FP8 (W8A8) on H100/H200/B200 GPUs for near-lossless 2x throughput gains across both prefill and decode.",
            "Use AWQ or GPTQ (W4A16—4-bit weights, 16-bit activations) when memory-capacity-bound or running at smaller batch sizes.",
            "Always run your domain evaluation benchmark after quantizing; coding and complex reasoning degrade faster at 4-bit than simple chat.",
          ],
        },
        {
          id: "kv-cache-paged-attention",
          title: "KV-Cache Management, PagedAttention & Prefix Caching",
          minutes: 9,
          summary: "Eliminate GPU memory fragmentation with PagedAttention and reuse shared prompt prefixes across requests.",
          body: [
            "During autoregressive generation, storing Key and Value tensors for every past token avoids $O(N^2)$ recomputation, but the KV-cache grows linearly with sequence length and batch size. Pre-allocating contiguous VRAM for `max_seq_len` wastes 60–80% of GPU memory due to internal and external fragmentation.",
            "PagedAttention (introduced by vLLM) partitions the KV-cache into fixed-size non-contiguous physical blocks mapped via a virtual page table—just like OS virtual memory—raising GPU memory utilization above 95% and allowing 2x–4x larger batch sizes. RadixAttention (SGLang) and Automatic Prefix Caching retain KV blocks for shared system prompts, RAG documents, and multi-turn histories in a radix tree so repeated prefixes skip prefill computation entirely.",
          ],
          points: [
            "PagedAttention eliminates contiguous VRAM fragmentation, unlocking much higher concurrent batch sizes.",
            "Automatic Prefix Caching / RadixAttention reuses KV-cache blocks across requests that share system prompts or RAG context.",
            "For long-context workloads (32k–128k), quantizing the KV-cache to FP8 halves dynamic memory growth.",
          ],
        },
        {
          id: "speculative-decoding",
          title: "Speculative Decoding (Draft-Target, EAGLE, Medusa) & Constrained Decoding",
          minutes: 8,
          summary: "Break the sequential autoregressive bottleneck by drafting multiple tokens and verifying them in a single forward pass.",
          body: [
            "Because single-token decoding is memory-bandwidth-bound, verifying 5 tokens in parallel takes almost the exact same wall-clock time on a GPU as generating 1 token. Speculative Decoding uses a tiny, fast draft mechanism (a 1B model, an N-gram lookahead, or a lightweight EAGLE/Medusa head attached to the target model's hidden states) to propose $K$ candidate tokens.",
            "The large target model then scores all $K$ drafted tokens in a single parallel forward pass using rejection sampling that mathematically guarantees the exact same output distribution as standard decoding—achieving 1.8x–3x lower inter-token latency on code and structured text.",
          ],
          points: [
            "Speculative decoding is mathematically lossless: rejection sampling guarantees outputs match the target model's exact distribution.",
            "EAGLE and n-gram prompt lookahead achieve 2x–3x speedups on code generation, JSON extraction, and RAG summarization.",
            "Finite-State Machine (FSM) constrained decoding (Outlines, XGrammar) pre-masks invalid vocabulary tokens to enforce 100% valid JSON Schema with zero latency overhead.",
          ],
        },
      ],
    },
    {
      id: "production-serving",
      title: "5. Distributed Inference Engines & Production Serving at Scale",
      topics: [
        {
          id: "serving-llms",
          title: "Inference Engines: vLLM, SGLang, TensorRT-LLM & Continuous Batching",
          minutes: 9,
          summary: "Serve open-weight models with iteration-level continuous batching, chunked prefill, and disaggregated serving.",
          body: [
            "Static batching waits for the longest sequence in a batch to finish before accepting new requests, leaving GPUs idle. Production inference engines—vLLM, SGLang, TensorRT-LLM, and NVIDIA Dynamo—implement iteration-level Continuous Batching: completed sequences exit immediately and new requests join the batch at the very next token step.",
            "To prevent a long 32k-token prompt prefill from stalling ongoing token decodes in the same batch, Chunked Prefill splits large prompts into smaller token chunks interleaved with decode steps, or Disaggregated Serving separates Prefill GPU nodes from Decode GPU nodes with high-speed KV-cache transfer.",
          ],
          points: [
            "Use vLLM or SGLang for rapid multi-model OpenAI-compatible serving; use TensorRT-LLM when squeezing maximum C++/CUDA performance on NVIDIA hardware.",
            "Enable Chunked Prefill or Disaggregated Prefill/Decode to protect Inter-Token Latency (ITL) under mixed prompt lengths.",
            "Use LoRA-aware and prefix-cache-aware load balancing (e.g., llm-d / NVIDIA Dynamo) rather than naive round-robin routing.",
          ],
          example: {
            title: "Launch a production vLLM server with FP8, prefix caching, and tensor parallelism",
            language: "bash",
            code: `vllm serve meta-llama/Llama-3.3-70B-Instruct \\
  --tensor-parallel-size 4 \\
  --quantization fp8 \\
  --enable-prefix-caching \\
  --enable-chunked-prefill \\
  --max-model-len 32768 \\
  --port 8000`,
          },
        },
        {
          id: "distributed-parallelism",
          title: "Multi-GPU Parallelism: Tensor (TP), Pipeline (PP) & Expert Parallelism (EP)",
          minutes: 8,
          summary: "Scale models that exceed a single GPU across multi-GPU nodes and multi-node clusters.",
          body: [
            "When a model's weights and KV-cache exceed a single GPU's VRAM (or require lower latency than a single GPU's memory bandwidth can deliver), Tensor Parallelism (TP) splits individual weight matrices across $N$ GPUs within the same node, executing an All-Reduce synchronization over NVLink twice per Transformer layer. This reduces per-token latency almost linearly up to 4 or 8 GPUs.",
            "Across multiple nodes connected via slower InfiniBand/RoCE networks, Pipeline Parallelism (PP) partitions whole layers sequentially across nodes, while Expert Parallelism (EP) distributes Mixture-of-Experts (MoE) sub-networks across GPUs using All-to-All token dispatch.",
          ],
          points: [
            "Use Tensor Parallelism (TP = 2, 4, or 8) within a single NVLink node to reduce latency and split large models.",
            "Never span Tensor Parallelism across slow inter-node TCP networks; use Pipeline Parallelism (PP) across nodes.",
            "Benchmark your serving cluster under realistic concurrency distributions using AIPerf or SGLang `genai-bench` before production launch.",
          ],
        },
        S.llmEvaluation,
        S.costLatency,
        S.monitoring,
      ],
    },
  ],
};

