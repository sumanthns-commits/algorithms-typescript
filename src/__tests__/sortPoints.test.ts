import mergeSort from "../mergeSort";
import Point from "../model/point";

describe("sort points", () => {
  it("should be able to sort an array of points by their x co-ordinate", () => {
    const points = [
      new Point(5, 6),
      new Point(-1, 5),
      new Point(0, 0),
      new Point(100, 1),
      new Point(9, -4),
    ];

    const expectedSortedPointsByX = [
      new Point(-1, 5),
      new Point(0, 0),
      new Point(5, 6),
      new Point(9, -4),
      new Point(100, 1),
    ];

    const actualSortedPointsByX = mergeSort(
      points,
      (point1: Point, point2: Point) =>
        point1.x < point2.x ? -1 : point1.x > point2.x ? 1 : 0
    );

    expect(actualSortedPointsByX).toEqual(expectedSortedPointsByX);
  });

  it("should be able to sort an array of points by their y co-ordinate", () => {
    const points = [
      new Point(5, 6),
      new Point(-1, 5),
      new Point(0, 0),
      new Point(100, 1),
      new Point(9, -4),
    ];

    const expectedSortedPointsByY = [
      new Point(9, -4),
      new Point(0, 0),
      new Point(100, 1),
      new Point(-1, 5),
      new Point(5, 6),
    ];

    const actualSortedPointsByY = mergeSort(
      points,
      (point1: Point, point2: Point) =>
        point1.y < point2.y ? -1 : point1.y > point2.y ? 1 : 0
    );

    expect(actualSortedPointsByY).toEqual(expectedSortedPointsByY);
  });
});
