import { useCallback, useState } from "react";
import type { Status } from "./types";

type ProgressMap = Record<string, Status>;

const key = (slug: string) => `xplained:progress:${slug}`;

function load(slug: string): ProgressMap {
  try {
    return JSON.parse(localStorage.getItem(key(slug)) ?? "{}") as ProgressMap;
  } catch {
    return {};
  }
}

/** Number of finished (done or skipped) topics, read directly from storage. */
export function countFinished(slug: string): number {
  return Object.values(load(slug)).filter((s) => s === "done" || s === "skipped").length;
}

/** Per-roadmap topic progress, persisted in localStorage. */
export function useProgress(slug: string) {
  const [map, setMap] = useState<ProgressMap>(() => load(slug));

  const setStatus = useCallback(
    (topicId: string, status: Status) => {
      setMap((prev) => {
        const prevStatus = prev[topicId] ?? "pending";
        const next = { ...prev };
        if (status === "pending") delete next[topicId];
        else next[topicId] = status;
        localStorage.setItem(key(slug), JSON.stringify(next));
        const wasDone = prevStatus === "done" || prevStatus === "skipped";
        const isDone = status === "done" || status === "skipped";
        const points = !wasDone && isDone ? 120 : 0;
        window.dispatchEvent(new CustomEvent("xplained:xp", { detail: { points } }));
        return next;
      });
    },
    [slug],
  );

  const getStatus = (topicId: string): Status => map[topicId] ?? "pending";
  return { getStatus, setStatus };
}
