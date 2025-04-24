import { evaluateConfiguration } from "../utils/rulesEvaluator";

test("Rule 4 - No options when memory below 2048MB", () => {
  expect(evaluateConfiguration("Power", [1024], false)).toEqual([]);
});

test("Rule 2 and 3 - Power CPU with large memory", () => {
  const result = evaluateConfiguration("Power", [262144], false);
  expect(result).toEqual(
    expect.arrayContaining([
      { model: "Mainframe", rule: 2 },
      { model: "4U Rack Server", rule: 3 },
      { model: "Tower Server", rule: 3 },
    ])
  );
});

test("Rule 3 - X86 with large memory", () => {
  const result = evaluateConfiguration("X86", [524288], false);
  expect(result).toEqual(
    expect.arrayContaining([
      { model: "4U Rack Server", rule: 3 },
      { model: "Tower Server", rule: 3 },
    ])
  );
});

test("Rule 1 - ARM with GPU and 524288MB memory", () => {
  const result = evaluateConfiguration("ARM", [524288], true);
  expect(result).toEqual([
    {
      model: "High Density Server",
      rule: 1,
    },
  ]);
});

test("Invalid memory input should return empty array", () => {
  const result = evaluateConfiguration("X86", [123], false);
  expect(result).toEqual([]);
});
