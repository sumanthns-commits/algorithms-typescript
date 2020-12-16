import mergeSort from "../mergeSort";

describe("mergeSort", () => {
  [
    [[], []],
    [[3], [3]],
    [
      [4, 7, 2, 5, 8, 3],
      [2, 3, 4, 5, 7, 8],
    ],
    [
      [4, 7, 2, 5, 8, 3, 1],
      [1, 2, 3, 4, 5, 7, 8],
    ],
    [
      [4, 7, 2, -5, 8, 3, 1],
      [-5, 1, 2, 3, 4, 7, 8],
    ],
    [
      [4, 7, 2, 5, 5, 3, 1],
      [1, 2, 3, 4, 5, 5, 7],
    ],
    [
      [4, 7, 2, 5, 5, 3, 1, 0, 14, 0, 7, 0],
      [0, 0, 0, 1, 2, 3, 4, 5, 5, 7, 7, 14],
    ],
  ].forEach((testCase) => {
    const [unsortedArray, expectedSortedArray] = testCase;
    it(`should return [${expectedSortedArray}] for [${unsortedArray}]`, () => {
      expect(mergeSort(unsortedArray)).toEqual(expectedSortedArray);
    });
  });
});
