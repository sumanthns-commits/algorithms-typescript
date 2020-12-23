import Point from "./model/point";

export type ClosestPairResult = [number, Point, Point];

const closestPair = (points: Point[]): ClosestPairResult => {
  if (points.length < 2) {
    throw new Error(
      "Atleast two points are required to calculate closest pair"
    );
  }

  let result: ClosestPairResult = [
    Number.POSITIVE_INFINITY,
    new Point(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY),
    new Point(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY),
  ];

  points.forEach((point1) => {
    points.forEach((point2) => {
      const currentMinDistance = result[0];
      if (
        !point1.equals(point2) &&
        point1.distance(point2) < currentMinDistance
      ) {
        result = [point1.distance(point2), point1, point2];
      }
    });
  });

  return result;
};

export default closestPair;
