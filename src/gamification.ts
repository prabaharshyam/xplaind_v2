import { useEffect, useState } from "react";
import { roadmaps, topicsOf } from "./content";
import { countFinished, getStoredGoalSlug, loadProgressMap, setStoredGoalSlug } from "./progress";
import type { Roadmap, Topic } from "./types";

export interface BadgeDef {
  id: string;
  icon: string;
  title: string;
  desc: string;
  unlocked: boolean;
}

export interface StageNodeProgress {
  index: number;
  title: string;
  done: number;
  total: number;
  pct: number;
  isComplete: boolean;
  isCurrent: boolean;
}

export interface GoalCoaching {
  headline: string;
  message: string;
  unlockImpact: string;
  momentumBadge: string;
}

export interface PlayerStats {
  level: number;
  rank: string;
  streak: number;
  completedTopics: number;
  totalTopicsAllRoles: number;
  quizzesWon: number;
  labsTried: number;
  badges: BadgeDef[];
  // Active Goal Track telemetry (replaces Credit Points)
  goalRoadmap: Roadmap;
  goalDone: number;
  goalTotal: number;
  goalPct: number;
  goalRemaining: number;
  goalRemainingMinutes: number;
  goalCurrentStageIndex: number;
  goalCurrentStageTitle: string;
  goalStagesCompleted: number;
  goalTotalStages: number;
  goalStages: StageNodeProgress[];
  nextTopic: Topic | undefined;
  nextTopicNumber: number;
  coaching: GoalCoaching;
}

const RANKS = [
  "Stage 01 · Foundations Explorer",
  "Stage 02 · Core Systems Builder",
  "Stage 03 · Applied AI Practitioner",
  "Stage 04 · Production Systems Engineer",
  "Stage 05 · Senior AI Architect",
  "Stage 06 · Staff Systems Lead",
  "Stage 07 · Principal Track Master",
];

const QUIZZES_KEY = "xplained:quizzes_won";
const LABS_KEY = "xplained:labs_tried";
const STREAK_KEY = "xplained:streak";
const LAST_DAY_KEY = "xplained:last_day";

function readNumber(key: string): number {
  try {
    return Number(localStorage.getItem(key) ?? "0") || 0;
  } catch {
    return 0;
  }
}

export function touchStreak(): number {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const last = localStorage.getItem(LAST_DAY_KEY);
    let streak = readNumber(STREAK_KEY);
    if (!last) {
      streak = 1;
      localStorage.setItem(LAST_DAY_KEY, today);
      localStorage.setItem(STREAK_KEY, String(streak));
    } else if (last !== today) {
      const prev = new Date(last);
      const curr = new Date(today);
      const diffDays = Math.round((curr.getTime() - prev.getTime()) / 86400000);
      streak = diffDays === 1 ? streak + 1 : 1;
      localStorage.setItem(LAST_DAY_KEY, today);
      localStorage.setItem(STREAK_KEY, String(streak));
    }
    return Math.max(1, streak);
  } catch {
    return 1;
  }
}

export function awardBonusXp(_points: number, kind?: "quiz" | "lab") {
  try {
    if (kind === "quiz") {
      localStorage.setItem(QUIZZES_KEY, String(readNumber(QUIZZES_KEY) + 1));
    } else if (kind === "lab") {
      localStorage.setItem(LABS_KEY, String(readNumber(LABS_KEY) + 1));
    }
    touchStreak();
    window.dispatchEvent(
      new CustomEvent("xplained:xp", {
        detail: {
          toastMessage:
            kind === "quiz"
              ? "Checkpoint verified — you're one step closer to goal mastery!"
              : "Lab simulation logged — hands-on intuition unlocked!",
        },
      })
    );
  } catch {
    // ignore storage errors
  }
}

function buildPersonalizedCoaching(
  roadmap: Roadmap,
  done: number,
  total: number,
  pct: number,
  nextTopic: Topic | undefined,
  stageTitle: string,
  stageDone: number,
  stageTotal: number,
  remainingMinutes: number
): GoalCoaching {
  if (!nextTopic || done >= total) {
    return {
      headline: `100% Goal Achieved — You Mastered ${roadmap.title}!`,
      message: `Every single stage and specification in ${roadmap.title} is verified. Download your physical checklist PDF or select a new specialization track to expand your architecture range.`,
      unlockImpact: "Track Complete · Full Production Readiness Verified",
      momentumBadge: "GOAL ACHIEVED · 100%",
    };
  }

  const nextPct = Math.min(100, Math.round(((done + 1) / total) * 100));
  const pctJump = Math.max(1, nextPct - pct);
  const stageLeft = Math.max(1, stageTotal - stageDone);

  if (done === 0) {
    return {
      headline: `Start your ${roadmap.title} journey with "${nextTopic.title}" (${nextTopic.minutes} min)`,
      message: `Every senior ${roadmap.title} starts with Step 01. Knocking out "${nextTopic.title}" today breaks the inertia, launches "${stageTitle}", and immediately moves you to ${nextPct}% goal readiness.`,
      unlockImpact: `Completing this first module unlocks ${nextTopic.points[0] ?? "your core foundation"}`,
      momentumBadge: `IGNITION STEP · ${nextTopic.minutes} MIN TO LAUNCH`,
    };
  }

  if (stageLeft === 1) {
    return {
      headline: `1 Module Left to Conquer "${stageTitle}"! Finish "${nextTopic.title}" Next`,
      message: `You're on the finish line of this stage (${stageDone}/${stageTotal} done). Spend ${nextTopic.minutes} minutes on "${nextTopic.title}" right now to seal off "${stageTitle}" and surge to ${nextPct}% closer to your ${roadmap.title} goal!`,
      unlockImpact: `Seals Stage "${stageTitle}" + jumps goal readiness by +${pctJump}%`,
      momentumBadge: `STAGE FINISHER · ONLY ${nextTopic.minutes} MIN LEFT`,
    };
  }

  if (pct >= 75) {
    return {
      headline: `Final Sprint (${pct}% There!) — Tackle "${nextTopic.title}" to Close the Gap`,
      message: `You have already conquered ${done} of ${total} modules! Only ${total - done} specifications (~${Math.ceil(
        remainingMinutes / 60
      )}h) stand between you and full ${roadmap.title} mastery. Complete "${nextTopic.title}" next to hit ${nextPct}%.`,
      unlockImpact: `Pushes you to ${nextPct}% readiness with only ${total - done - 1} modules remaining`,
      momentumBadge: `FINAL STRETCH · ${total - done} STEPS TO FINISH LINE`,
    };
  }

  if (pct >= 40) {
    return {
      headline: `Past the Halfway Climb (${pct}%) — Keep Momentum with "${nextTopic.title}"`,
      message: `You've built real architectural momentum (${done}/${total} complete). Finishing "${nextTopic.title}" (${nextTopic.minutes} min) advances "${stageTitle}" (${stageDone + 1}/${stageTotal}) and brings your ${roadmap.title} goal to ${nextPct}%.`,
      unlockImpact: `Mastering "${nextTopic.title}" locks in: ${nextTopic.summary}`,
      momentumBadge: `HIGH MOMENTUM · +${pctJump}% CLOSER IN ${nextTopic.minutes} MIN`,
    };
  }

  return {
    headline: `Next Up (${done + 1} of ${total}): Master "${nextTopic.title}" in ${nextTopic.minutes} Mins`,
    message: `You're ${pct}% of the way to becoming a job-ready ${roadmap.title}. Complete "${nextTopic.title}" next to advance "${stageTitle}" (${stageDone + 1}/${stageTotal}) and jump to ${nextPct}% goal completion.`,
    unlockImpact: `Directly unlocks: ${nextTopic.summary}`,
    momentumBadge: `NEXT MILESTONE · +${pctJump}% GOAL PROGRESS`,
  };
}

function selectActiveGoalRoadmap(): Roadmap {
  const storedSlug = getStoredGoalSlug();
  if (storedSlug) {
    const found = roadmaps.find((r) => r.slug === storedSlug);
    if (found) return found;
  }
  // Otherwise pick the roadmap with the highest in-progress completion (<100%), or highest completion overall
  let best = roadmaps[0];
  let bestDone = -1;
  for (const r of roadmaps) {
    const done = countFinished(r.slug);
    const total = topicsOf(r).length;
    if (done > 0 && done < total && done > bestDone) {
      best = r;
      bestDone = done;
    }
  }
  if (bestDone > 0) return best;

  for (const r of roadmaps) {
    const done = countFinished(r.slug);
    if (done > bestDone) {
      best = r;
      bestDone = done;
    }
  }
  return best;
}

export function computePlayerStats(): PlayerStats {
  const completedTopics = roadmaps.reduce((sum, r) => sum + countFinished(r.slug), 0);
  const totalTopicsAllRoles = roadmaps.reduce((sum, r) => sum + topicsOf(r).length, 0);
  const quizzesWon = readNumber(QUIZZES_KEY);
  const labsTried = readNumber(LABS_KEY);
  const streak = touchStreak();

  const goalRoadmap = selectActiveGoalRoadmap();
  const goalMap = loadProgressMap(goalRoadmap.slug);
  const allGoalTopics = topicsOf(goalRoadmap);
  const goalTotal = allGoalTopics.length;
  const goalDone = allGoalTopics.filter((t) => goalMap[t.id] === "done" || goalMap[t.id] === "skipped").length;
  const goalPct = goalTotal ? Math.round((goalDone / goalTotal) * 100) : 0;
  const goalRemaining = Math.max(0, goalTotal - goalDone);
  const goalRemainingMinutes = allGoalTopics
    .filter((t) => goalMap[t.id] !== "done" && goalMap[t.id] !== "skipped")
    .reduce((acc, t) => acc + t.minutes, 0);

  let currentStageIdx = 0;
  let foundCurrentStage = false;
  let stagesCompleted = 0;

  const goalStages: StageNodeProgress[] = goalRoadmap.sections.map((sec, idx) => {
    const secDone = sec.topics.filter((t) => goalMap[t.id] === "done" || goalMap[t.id] === "skipped").length;
    const secTotal = sec.topics.length;
    const isComplete = secTotal > 0 && secDone >= secTotal;
    if (isComplete) stagesCompleted += 1;
    let isCurrent = false;
    if (!isComplete && !foundCurrentStage) {
      foundCurrentStage = true;
      currentStageIdx = idx;
      isCurrent = true;
    }
    return {
      index: idx + 1,
      title: sec.title,
      done: secDone,
      total: secTotal,
      pct: secTotal ? Math.round((secDone / secTotal) * 100) : 0,
      isComplete,
      isCurrent,
    };
  });

  if (!foundCurrentStage && goalStages.length > 0) {
    currentStageIdx = goalStages.length - 1;
    goalStages[currentStageIdx].isCurrent = true;
  }

  const nextTopicIdx = allGoalTopics.findIndex((t) => goalMap[t.id] !== "done" && goalMap[t.id] !== "skipped");
  const nextTopic = nextTopicIdx >= 0 ? allGoalTopics[nextTopicIdx] : undefined;
  const nextTopicNumber = nextTopicIdx >= 0 ? nextTopicIdx + 1 : goalTotal;

  const activeStage = goalStages[currentStageIdx] ?? {
    index: 1,
    title: goalRoadmap.sections[0]?.title ?? "Stage 1",
    done: 0,
    total: 1,
  };

  const coaching = buildPersonalizedCoaching(
    goalRoadmap,
    goalDone,
    goalTotal,
    goalPct,
    nextTopic,
    activeStage.title,
    activeStage.done,
    activeStage.total,
    goalRemainingMinutes
  );

  const level = Math.min(7, Math.max(1, Math.floor((goalPct / 100) * 6) + 1));
  const rank = RANKS[Math.min(RANKS.length - 1, level - 1)];

  const anyRoadmapDone = roadmaps.some((r) => {
    const total = topicsOf(r).length;
    return total > 0 && countFinished(r.slug) >= total;
  });

  const badges: BadgeDef[] = [
    {
      id: "first-step",
      icon: "01",
      title: "Ignition Milestone",
      desc: "Complete your first technical specification module toward your goal.",
      unlocked: completedTopics >= 1,
    },
    {
      id: "stage-clear",
      icon: "STG",
      title: "Stage Finisher",
      desc: "Complete 100% of a roadmap stage within your target role.",
      unlocked: stagesCompleted >= 1,
    },
    {
      id: "quiz-ace",
      icon: "QA",
      title: "Architecture Verification",
      desc: "Pass 3 technical verification assessments with zero errors.",
      unlocked: quizzesWon >= 3,
    },
    {
      id: "lab-rat",
      icon: "LAB",
      title: "Empirical Benchmarking",
      desc: "Execute prompt, token cost, or agent trajectory simulations in the Systems Workbench.",
      unlocked: labsTried >= 1,
    },
    {
      id: "halfway-hero",
      icon: "50%",
      title: "Halfway Horizon",
      desc: "Reach 50% or higher completion on your primary AI career roadmap.",
      unlocked: goalPct >= 50 || completedTopics >= 10,
    },
    {
      id: "role-master",
      icon: "100%",
      title: "Goal Track Mastery",
      desc: "Complete 100% of all required modules within an AI career track.",
      unlocked: anyRoadmapDone,
    },
  ];

  return {
    level,
    rank,
    streak,
    completedTopics,
    totalTopicsAllRoles,
    quizzesWon,
    labsTried,
    badges,
    goalRoadmap,
    goalDone,
    goalTotal,
    goalPct,
    goalRemaining,
    goalRemainingMinutes,
    goalCurrentStageIndex: currentStageIdx + 1,
    goalCurrentStageTitle: activeStage.title,
    goalStagesCompleted: stagesCompleted,
    goalTotalStages: goalStages.length,
    goalStages,
    nextTopic,
    nextTopicNumber,
    coaching,
  };
}

export function usePlayerStats() {
  const [stats, setStats] = useState<PlayerStats>(() => computePlayerStats());
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const refresh = (e?: Event) => {
      const updated = computePlayerStats();
      setStats(updated);
      const detail = (
        e as CustomEvent<{ completedNew?: boolean; toastMessage?: string }> | undefined
      )?.detail;
      if (detail?.completedNew) {
        const msg = updated.nextTopic
          ? `${updated.goalPct}% toward ${updated.goalRoadmap.title}! Next up: "${updated.nextTopic.title}"`
          : `100% Goal Complete! You finished ${updated.goalRoadmap.title}!`;
        setToast(msg);
        setTimeout(() => setToast(null), 3200);
      } else if (detail?.toastMessage) {
        setToast(detail.toastMessage);
        setTimeout(() => setToast(null), 2600);
      }
    };
    window.addEventListener("xplained:xp", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("xplained:xp", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return {
    stats,
    toast,
    setActiveGoal: (slug: string) => {
      setStoredGoalSlug(slug);
      setStats(computePlayerStats());
    },
    refresh: () => setStats(computePlayerStats()),
  };
}
