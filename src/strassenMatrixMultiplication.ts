/*
Strassen's Algorithm

X =    [A, B]
       [C, D]
Y =    [E, F]
       [G, H]
P1 = A(F - H)
P2 = (A + B)H
P3 = (C + D)E
P4 = D(G - E)
P5 = (A + D)(E + H)
P6 = (B - D)(G + H)
p7 = (A - C)(E + F)

X.Y = [P5 + P4 - P2 + P6 ,           P1 + P2]
      [P3 + P4           , P1 + P5 - P3 - P7]
*/

const addMatrices = (a: number[][], b: number[][]): number[][] => {
  const result: number[][] = [];
  for (let i = 0; i < a.length; i++) {
    const row = [];
    for (let j = 0; j < a.length; j++) {
      row.push(a[i][j] + b[i][j]);
    }
    result.push(row);
  }
  return result;
};

const subtractMatrices = (a: number[][], b: number[][]): number[][] => {
  const result: number[][] = [];
  for (let i = 0; i < a.length; i++) {
    const row = [];
    for (let j = 0; j < a.length; j++) {
      row.push(a[i][j] - b[i][j]);
    }
    result.push(row);
  }
  return result;
};

const getQuadrant = (
  a: number[][],
  startingXIndex: number,
  endingXIndex: number,
  startingYIndex: number,
  endingYIndex: number
): number[][] => {
  const result: number[][] = [];
  for (let i = startingXIndex; i < endingXIndex; i++) {
    const row = [];
    for (let j = startingYIndex; j < endingYIndex; j++) {
      row.push(a[i][j]);
    }
    result.push(row);
  }
  return result;
};

const mergeQuadrants = (
  a: number[][],
  b: number[][],
  c: number[][],
  d: number[][]
): number[][] => {
  const totalLength = a.length + b.length;
  const result: number[][] = [];
  // Fill result with all 0's initially
  // to avoid array index issues
  for (let i = 0; i < totalLength; i++) {
    const row = [];
    for (let j = 0; j < totalLength; j++) {
      row.push(0);
    }
    result.push(row);
  }

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length; j++) {
      result[i][j] = a[i][j];
    }
  }

  for (let i = 0; i < b.length; i++) {
    for (let j = b.length; j < totalLength; j++) {
      result[i][j] = b[i][j - b.length];
    }
  }

  for (let i = c.length; i < totalLength; i++) {
    for (let j = 0; j < c.length; j++) {
      result[i][j] = c[i - c.length][j];
    }
  }

  for (let i = d.length; i < totalLength; i++) {
    for (let j = d.length; j < totalLength; j++) {
      result[i][j] = d[i - d.length][j - d.length];
    }
  }
  return result;
};

const validateMatricesAreSquare = (matrix: number[][]) => {
  for (const row of matrix) {
    if (row.length !== matrix.length) {
      throw new Error(
        `Strassen's algorithm can only be applied to square matrices`
      );
    }
  }
};

const validate = (matrix1: number[][], matrix2: number[][]) => {
  if (matrix1.length !== matrix2.length) {
    throw new Error(`Matrices should be of same dimension`);
  }
  if (matrix1.length > 1 && matrix1.length % 2 !== 0) {
    throw new Error(`Dimension of matrices should be a multiple of 2`);
  }
  validateMatricesAreSquare(matrix1);
  validateMatricesAreSquare(matrix2);
};

const strassenMatrixMultiplication = (
  matrix1: number[][],
  matrix2: number[][]
): number[][] => {
  validate(matrix1, matrix2);
  if (matrix1.length === 0) {
    return [];
  }
  const result: number[][] = [];
  if (matrix1.length === 1) {
    return [[matrix1[0][0] * matrix2[0][0]]];
  }

  // divide give matrices into quadrants
  const a = getQuadrant(matrix1, 0, matrix1.length / 2, 0, matrix1.length / 2); // top-left quadrant of matrix1
  const b = getQuadrant(
    matrix1,
    0,
    matrix1.length / 2,
    matrix1.length / 2,
    matrix1.length
  ); // top-right quadrant of matrix1
  const c = getQuadrant(
    matrix1,
    matrix1.length / 2,
    matrix1.length,
    0,
    matrix1.length / 2
  ); // bottom-left quadrant of matrix1
  const d = getQuadrant(
    matrix1,
    matrix1.length / 2,
    matrix1.length,
    matrix1.length / 2,
    matrix1.length
  ); // bottom-right quadrant of matrix1
  const e = getQuadrant(matrix2, 0, matrix2.length / 2, 0, matrix2.length / 2); // top-left quadrant of matrix2
  const f = getQuadrant(
    matrix2,
    0,
    matrix2.length / 2,
    matrix2.length / 2,
    matrix2.length
  ); // top-right quadrant of matrix2
  const g = getQuadrant(
    matrix2,
    matrix2.length / 2,
    matrix2.length,
    0,
    matrix2.length / 2
  ); // bottom-left quadrant of matrix2
  const h = getQuadrant(
    matrix2,
    matrix2.length / 2,
    matrix2.length,
    matrix2.length / 2,
    matrix2.length
  ); // bottom-right quadrant of matrix2

  // apply strassen's algorithm
  const p1 = strassenMatrixMultiplication(a, subtractMatrices(f, h));
  const p2 = strassenMatrixMultiplication(addMatrices(a, b), h);
  const p3 = strassenMatrixMultiplication(addMatrices(c, d), e);
  const p4 = strassenMatrixMultiplication(d, subtractMatrices(g, e));
  const p5 = strassenMatrixMultiplication(addMatrices(a, d), addMatrices(e, h));
  const p6 = strassenMatrixMultiplication(
    subtractMatrices(b, d),
    addMatrices(g, h)
  );
  const p7 = strassenMatrixMultiplication(
    subtractMatrices(a, c),
    addMatrices(e, f)
  );

  // p5 + p4 - p2 + p6
  const firstQuadrant = addMatrices(
    addMatrices(p5, subtractMatrices(p4, p2)),
    p6
  );

  // p1 + p2
  const secondQuadrant = addMatrices(p1, p2);

  // p3 + p4
  const thirdQuadrant = addMatrices(p3, p4);

  // p1 + p5 - p3 - p7
  const fourthQuadrant = addMatrices(
    p1,
    subtractMatrices(p5, addMatrices(p3, p7))
  );

  // merge all quadrants
  return mergeQuadrants(
    firstQuadrant,
    secondQuadrant,
    thirdQuadrant,
    fourthQuadrant
  );
};

export default strassenMatrixMultiplication;
