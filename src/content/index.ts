import type { Roadmap, Topic } from "../types";
import { aiEngineer } from "./roles/aiEngineer";
import { genAiEngineer } from "./roles/genAiEngineer";
import { forwardDeployedEngineer } from "./roles/forwardDeployedEngineer";
import { aiProductManager } from "./roles/aiProductManager";
import { agenticAiEngineer } from "./roles/agenticAiEngineer";
import { aiAutomationSpecialist } from "./roles/aiAutomationSpecialist";
import { aiGovernanceSpecialist } from "./roles/aiGovernanceSpecialist";
import { mlEngineer } from "./roles/mlEngineer";
import { mlopsEngineer } from "./roles/mlopsEngineer";

export const roadmaps: Roadmap[] = [
  { ...aiEngineer, emoji: "AIE" },
  { ...genAiEngineer, emoji: "LLM" },
  { ...forwardDeployedEngineer, emoji: "FDE" },
  { ...aiProductManager, emoji: "APM" },
  { ...agenticAiEngineer, emoji: "AGT" },
  { ...aiAutomationSpecialist, emoji: "AUT" },
  { ...aiGovernanceSpecialist, emoji: "GRC" },
  { ...mlEngineer, emoji: "MLE" },
  { ...mlopsEngineer, emoji: "OPS" },
];

export const topicsOf = (r: Roadmap): Topic[] => r.sections.flatMap((s) => s.topics);

export const minutesOf = (r: Roadmap): number => topicsOf(r).reduce((sum, t) => sum + t.minutes, 0);

export const findRoadmap = (slug: string) => roadmaps.find((r) => r.slug === slug);

const uniqueTopics = new Set(roadmaps.flatMap(topicsOf));

export const stats = {
  roadmaps: roadmaps.length,
  topics: uniqueTopics.size,
  minutes: Array.from(uniqueTopics).reduce((sum, t) => sum + t.minutes, 0),
};
