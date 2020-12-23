import Point from "../point";

describe("point", () => {
  describe("equals", () => {
    it("should return true for two points with same x and y co-ordinates", () => {
      const point1 = new Point(2, 3);
      const point2 = new Point(2, 3);

      expect(point1.equals(point2)).toBeTruthy();
    });

    it("should return false for two points with same x but different y co-ordinates", () => {
      const point1 = new Point(2, 3);
      const point2 = new Point(2, 4);

      expect(point1.equals(point2)).toBeFalsy();
    });

    it("should return false for two points with same y but different x co-ordinates", () => {
      const point1 = new Point(2, 3);
      const point2 = new Point(1, 3);

      expect(point1.equals(point2)).toBeFalsy();
    });
  });

  describe("distance", () => {
    const testCases: [Point, Point, number][] = [
      [new Point(1, 2), new Point(4, 6), 5],
      [new Point(1, 2), new Point(3, 4), 2.83],
      [new Point(-1, 4), new Point(0, -5), 9.06],
    ];

    testCases.forEach((testCase: [Point, Point, number]) => {
      const [point1, point2, expectedDistance] = testCase;
      it(`should return the euclidean distance between ${point1} and ${point2} as ${expectedDistance}`, () => {
        expect(point1.distance(point2)).toBe(expectedDistance);
      });
    });
  });

  describe("toString", () => {
    const testCases: [Point, string][] = [
      [new Point(1, 2), `P(1, 2)`],
      [new Point(-1, 4), `P(-1, 4)`],
      [new Point(0, 0), `P(0, 0)`],
    ];

    testCases.forEach((testCase) => {
      const [point, expectedString] = testCase;
      it(`should return the string representation of the point with x - ${point.x} and y - ${point.y} as ${expectedString}`, () => {
        expect(point.toString()).toBe(expectedString);
      });
    });
  });
});
