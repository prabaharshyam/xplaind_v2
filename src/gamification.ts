import { useEffect, useState } from "react";
import { roadmaps, topicsOf } from "./content";
import { countFinished } from "./progress";

export interface BadgeDef {
  id: string;
  icon: string;
  title: string;
  desc: string;
  unlocked: boolean;
}

export interface PlayerStats {
  xp: number;
  level: number;
  rank: string;
  nextLevelXp: number;
  currentLevelProgress: number;
  streak: number;
  completedTopics: number;
  quizzesWon: number;
  labsTried: number;
  badges: BadgeDef[];
}

const RANKS = [
  "Associate Practitioner",
  "Systems Analyst",
  "Applied Engineer",
  "Senior Architect",
  "Staff AI Architect",
  "Principal Systems Lead",
  "Distinguished Fellow",
];

const BONUS_XP_KEY = "xplained:bonus_xp";
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

export function awardBonusXp(points: number, kind?: "quiz" | "lab") {
  try {
    const cur = readNumber(BONUS_XP_KEY);
    localStorage.setItem(BONUS_XP_KEY, String(cur + points));
    if (kind === "quiz") {
      localStorage.setItem(QUIZZES_KEY, String(readNumber(QUIZZES_KEY) + 1));
    } else if (kind === "lab") {
      localStorage.setItem(LABS_KEY, String(readNumber(LABS_KEY) + 1));
    }
    touchStreak();
    window.dispatchEvent(new CustomEvent("xplained:xp", { detail: { points } }));
  } catch {
    // ignore storage errors
  }
}

export function computePlayerStats(): PlayerStats {
  const completedTopics = roadmaps.reduce((sum, r) => sum + countFinished(r.slug), 0);
  const bonusXp = readNumber(BONUS_XP_KEY);
  const quizzesWon = readNumber(QUIZZES_KEY);
  const labsTried = readNumber(LABS_KEY);
  const streak = touchStreak();

  const xp = completedTopics * 120 + bonusXp + streak * 25;
  const level = Math.floor(xp / 350) + 1;
  const currentLevelProgress = Math.round(((xp % 350) / 350) * 100);
  const nextLevelXp = level * 350;
  const rank = RANKS[Math.min(RANKS.length - 1, level - 1)];

  const anyRoadmapDone = roadmaps.some((r) => {
    const total = topicsOf(r).length;
    return total > 0 && countFinished(r.slug) >= total;
  });

  const badges: BadgeDef[] = [
    {
      id: "first-step",
      icon: "01",
      title: "Foundational Specification",
      desc: "Complete your first technical specification module across any discipline.",
      unlocked: completedTopics >= 1,
    },
    {
      id: "five-topics",
      icon: "05",
      title: "Systems Cadence",
      desc: "Complete 5 technical modules with verified implementation review.",
      unlocked: completedTopics >= 5,
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
      desc: "Execute prompt, token cost, or agent trajectory simulations in the Systems Lab.",
      unlocked: labsTried >= 1,
    },
    {
      id: "deep-diver",
      icon: "20",
      title: "Cross-Functional Depth",
      desc: "Complete 20 technical modules across the engineering curriculum.",
      unlocked: completedTopics >= 20,
    },
    {
      id: "role-master",
      icon: "CERT",
      title: "Discipline Mastery",
      desc: "Complete 100% of all required modules within an AI career track.",
      unlocked: anyRoadmapDone,
    },
  ];

  return {
    xp,
    level,
    rank,
    nextLevelXp,
    currentLevelProgress,
    streak,
    completedTopics,
    quizzesWon,
    labsTried,
    badges,
  };
}

export function usePlayerStats() {
  const [stats, setStats] = useState<PlayerStats>(() => computePlayerStats());
  const [toast, setToast] = useState<number | null>(null);

  useEffect(() => {
    const refresh = (e?: Event) => {
      setStats(computePlayerStats());
      const detail = (e as CustomEvent<{ points?: number }> | undefined)?.detail;
      if (detail?.points) {
        setToast(detail.points);
        setTimeout(() => setToast(null), 1800);
      }
    };
    window.addEventListener("xplained:xp", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("xplained:xp", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  return { stats, toast, refresh: () => setStats(computePlayerStats()) };
}
