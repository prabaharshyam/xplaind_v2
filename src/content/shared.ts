import { core } from "./sharedCore";
import { llm } from "./sharedLlm";

/** Shared topics, reused by several roles. */
export const S = { ...core, ...llm };
