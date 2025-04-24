export const isPowerOfTwo = (num: number): boolean => (num & (num - 1)) === 0;

export const validateMemory = (memories: number[]) => {
  return memories.every(
    (m) => m >= 2048 && m % 1024 === 0 && isPowerOfTwo(m) && m <= 8388608
  );
};

export const evaluateConfiguration = (
  cpu: string,
  memories: number[],
  gpu: boolean
): any => {
  const models = [];
  if (!validateMemory(memories)) return []; //rule 4 or 5

  const minMemory = Math.min(...memories);
  const allAbove524K = memories.every((m) => m >= 524288);
  const allAbove131K = memories.every((m) => m >= 131072);

  if (gpu) {
    if (cpu === "ARM" && allAbove524K)
      models.push({ model: "High Density Server", rule: 1 });
  } else {
    if (minMemory < 2048) return [];
    if (cpu === "Power") models.push({ model: "Mainframe", rule: 2 });
    if (allAbove131K) {
      models.push({ model: "4U Rack Server", rule: 3 });
      models.push({ model: "Tower Server", rule: 3 });
    } else if (minMemory >= 2048) {
      models.push({ model: "Tower Server", rule: 3 });
    }
  }
  return models;
};
