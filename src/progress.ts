import { useCallback, useState } from "react";
import type { Status } from "./types";

type ProgressMap = Record<string, Status>;

const key = (slug: string) => `xplained:progress:${slug}`;
const ACTIVE_GOAL_KEY = "xplained:active_goal";

export function loadProgressMap(slug: string): ProgressMap {
  try {
    return JSON.parse(localStorage.getItem(key(slug)) ?? "{}") as ProgressMap;
  } catch {
    return {};
  }
}

export function getStoredGoalSlug(): string | null {
  try {
    return localStorage.getItem(ACTIVE_GOAL_KEY);
  } catch {
    return null;
  }
}

export function setStoredGoalSlug(slug: string): void {
  try {
    localStorage.setItem(ACTIVE_GOAL_KEY, slug);
    window.dispatchEvent(new CustomEvent("xplained:xp", { detail: { goalSlug: slug } }));
  } catch {
    // ignore storage errors
  }
}

/** Number of finished (done or skipped) topics, read directly from storage. */
export function countFinished(slug: string): number {
  return Object.values(loadProgressMap(slug)).filter((s) => s === "done" || s === "skipped").length;
}

/** Per-roadmap topic progress, persisted in localStorage. */
export function useProgress(slug: string) {
  const [map, setMap] = useState<ProgressMap>(() => loadProgressMap(slug));

  const setStatus = useCallback(
    (topicId: string, status: Status) => {
      setMap((prev) => {
        const prevStatus = prev[topicId] ?? "pending";
        const next = { ...prev };
        if (status === "pending") delete next[topicId];
        else next[topicId] = status;
        localStorage.setItem(key(slug), JSON.stringify(next));
        localStorage.setItem(ACTIVE_GOAL_KEY, slug);
        const wasDone = prevStatus === "done" || prevStatus === "skipped";
        const isDone = status === "done" || status === "skipped";
        window.dispatchEvent(
          new CustomEvent("xplained:xp", {
            detail: { completedNew: !wasDone && isDone, topicId, slug },
          })
        );
        return next;
      });
    },
    [slug],
  );

  const getStatus = (topicId: string): Status => map[topicId] ?? "pending";
  return { getStatus, setStatus };
}
