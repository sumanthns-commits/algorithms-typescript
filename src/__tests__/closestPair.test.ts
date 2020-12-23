import closestPair, { ClosestPairResult } from "../closestPair";
import Point from "../model/point";

describe("closestPair", () => {
  it("should throw an error for empty array", () => {
    expect(() => {
      closestPair([]);
    }).toThrow(`Atleast two points are required to calculate closest pair`);
  });

  it("should throw an error for array of one point", () => {
    expect(() => {
      closestPair([new Point(1, 2)]);
    }).toThrow(`Atleast two points are required to calculate closest pair`);
  });

  const testCases: Array<[Point[], ClosestPairResult]> = [
    [
      [new Point(1, 2), new Point(4, 6)],
      [5, new Point(1, 2), new Point(4, 6)],
    ],
    [
      [
        new Point(5, 6),
        new Point(-1, 5),
        new Point(0, 0),
        new Point(100, 1),
        new Point(9, -4),
      ],
      [5.1, new Point(-1, 5), new Point(0, 0)],
    ],
  ];

  testCases.forEach((testCase) => {
    const [points, expectedResult] = testCase;

    it(
      `should return closest pair ${expectedResult[1]}, ${expectedResult[2]} ` +
        `with distance ${expectedResult[0]} for points ${points}`,
      () => {
        const result: ClosestPairResult = closestPair(points);
        const [distance, point1, point2] = result;

        expect(distance).toBe(expectedResult[0]);
        expect(point1).toEqual(expectedResult[1]);
        expect(point2).toEqual(expectedResult[2]);
      }
    );
  });
});
