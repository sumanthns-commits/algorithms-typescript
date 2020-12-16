import sortAndCountInversions from "../sortAndCountInversions";

type Case = [number[], number[], number];

const testCases: Case[] = [
  [[], [], 0],
  [[3], [3], 0],
  [[4, 7, 2, 5, 8, 3], [2, 3, 4, 5, 7, 8], 7],
  [[4, 7, 2, 5, 8, 3, 1], [1, 2, 3, 4, 5, 7, 8], 13],
  [[4, 7, 2, -5, 8, 3, 1], [-5, 1, 2, 3, 4, 7, 8], 13],
  [[4, 7, 2, 5, 5, 3, 1], [1, 2, 3, 4, 5, 5, 7], 14],
  [
    [4, 7, 2, 5, 5, 3, 1, 0, 14, 0, 7, 0],
    [0, 0, 0, 1, 2, 3, 4, 5, 5, 7, 7, 14],
    39,
  ],
];
describe("sortAndCountInversions", () => {
  testCases.forEach((testCase: [number[], number[], number]) => {
    const [
      unsortedArray,
      expectedSortedArray,
      expectedInversionsCount,
    ] = testCase;
    it(
      `should return [${expectedSortedArray}] for [${unsortedArray}] ` +
        `with ${expectedInversionsCount} inversions`,
      () => {
        const [sortedArray, inversions] = sortAndCountInversions(unsortedArray);

        expect(sortedArray).toEqual(expectedSortedArray);
        expect(inversions).toEqual(expectedInversionsCount);
      }
    );
  });
});
