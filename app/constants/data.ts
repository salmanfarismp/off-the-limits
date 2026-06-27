export const TRACKING_UNITS = [
  { value: "reps", label: "Reps" },
  { value: "sets", label: "Sets" },
  { value: "mins", label: "Minutes" },
  { value: "kgs", label: "Kilograms" },
];

export const GOAL_ICONS = [
  { id: 1, type: "dumbbell" },
  { id: 2, type: "runner" },
  { id: 3, type: "sprinter" },
  { id: 4, type: "timer" },
  { id: 5, type: "graph" },
  { id: 6, type: "water" },
];

type BadgeType = "better" | "waiting" | "almost" | "done" | "progressing";

interface BadgeConfig {
  text: string;
  type: BadgeType;
}

// You can export this alongside GOAL_ICONS
export const STATUS_BADGES: Record<number, BadgeConfig> = {
  0: { text: "WAITING", type: "waiting" }, // Default/fallback status
  1: { text: "BETTER THAN YESTERDAY", type: "better" },
  2: { text: "ALMOST THERE", type: "almost" },
  3: { text: "YOU DID IT", type: "done" },
  4: { text: "PROGRESSING", type: "progressing" },
};
