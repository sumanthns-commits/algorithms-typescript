import strassenMatrixMultiplication from "../strassenMatrixMultiplication";

describe("strassenMatrixMultiplication", () => {
  it("should throw error while multiplying non-square matrices", () => {
    expect(() =>
      strassenMatrixMultiplication(
        [
          [1, 2],
          [1, 2],
        ],
        [[2], [1]]
      )
    ).toThrow(`Strassen's algorithm can only be applied to square matrices`);
  });

  it("should throw error while multiplying matrices of different dimensions", () => {
    expect(() =>
      strassenMatrixMultiplication(
        [
          [1, 2],
          [2, 1],
        ],
        [
          [1, 2, 3],
          [1, 2, 3],
          [1, 2, 3],
        ]
      )
    ).toThrow(`Matrices should be of same dimension`);
  });

  it("should throw error while multiplying matrices of dimensions which are not multiple of 2", () => {
    expect(() =>
      strassenMatrixMultiplication(
        [
          [1, 2, 3],
          [1, 2, 3],
          [1, 2, 3],
        ],
        [
          [1, 2, 3],
          [1, 2, 3],
          [1, 2, 3],
        ]
      )
    ).toThrow(`Dimension of matrices should be a multiple of 2`);
  });

  [
    [[], [], []],
    [[[1]], [[2]], [[2]]],
    [
      [
        [1, 2],
        [2, 1],
      ],
      [
        [2, 1],
        [1, 2],
      ],
      [
        [4, 5],
        [5, 4],
      ],
    ],
    [
      [
        [1, 2, 3, 4],
        [2, 1, 5, 6],
        [3, 6, 5, 6],
        [4, 5, 5, 6],
      ],
      [
        [8, 4, 5, 3],
        [2, 1, 5, 2],
        [7, 6, 5, 1],
        [4, 3, 9, 0],
      ],
      [
        [49, 36, 66, 10],
        [77, 57, 94, 13],
        [95, 66, 124, 26],
        [101, 69, 124, 27],
      ],
    ],
  ].forEach((testCase) => {
    const [a, b, c] = testCase;
    it(`should multiple matrix ${a} and matrix ${b} and matrix ${c}`, () => {
      expect(strassenMatrixMultiplication(a, b)).toEqual(c);
    });
  });
});
