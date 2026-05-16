type Usage = {
  memoriesUsed: number;
  memoriesLimit: number;
  searchesToday: number;
  searchesPerDayLimit: number;
  plan: "free" | "builder" | "team" | "scale";
};

export function getUpgradePrompt(usage: Usage): string | null {
  const memoryRatio = usage.memoriesUsed / usage.memoriesLimit;
  const searchRatio = usage.searchesToday / usage.searchesPerDayLimit;

  if (usage.plan !== "free") return null;

  if (memoryRatio >= 0.9) {
    return `You have used ${usage.memoriesUsed} / ${usage.memoriesLimit} free memories. Upgrade to keep long-term memory active.`;
  }

  if (searchRatio >= 0.9) {
    return `You have used ${usage.searchesToday} / ${usage.searchesPerDayLimit} free searches today. Upgrade for production recall limits.`;
  }

  return null;
}
