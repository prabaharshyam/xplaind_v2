export type Status = "pending" | "learning" | "done" | "skipped";

export interface TopicLink {
  label: string;
  url: string;
}

export interface Example {
  title: string;
  language: string;
  code: string;
}

export interface Topic {
  id: string;
  title: string;
  minutes: number;
  summary: string;
  body: string[];
  points: string[];
  example?: Example;
  links?: TopicLink[];
}

export interface Section {
  id: string;
  title: string;
  topics: Topic[];
}

export interface Roadmap {
  slug: string;
  title: string;
  emoji: string;
  description: string;
  audience: string;
  tools: string[];
  outcomes: string[];
  sections: Section[];
}
