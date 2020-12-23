import mergeSort from "./mergeSort";
import Point from "./model/point";

export type ClosestPairResult = [number, Point, Point];

const closestPairBruteForce = (points: Point[]): ClosestPairResult => {
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

const closestSplitPair = (
  pointsX: Point[],
  pointsY: Point[],
  distance: number
): ClosestPairResult => {
  // get the point on boundary
  const midLength =
    pointsX.length % 2 === 0 ? pointsX.length / 2 : (pointsX.length + 1) / 2;
  const pointMid = pointsX[midLength];

  // get all points in boundary (between pointMid - distance and pointMid + distance)
  // sort by y cordinate
  const pointsBoundaryY: Point[] = [];
  pointsY.forEach((point) => {
    if (point.distance(pointMid) <= distance) {
      pointsBoundaryY.push(point);
    }
  });

  // compare each point in boundary with atmost 7 neighbouring points
  let currentMinDist = distance;
  let currentClosestPair: Point[] = [pointsX[0], pointsX[1]];

  for (let i = 0; i < pointsBoundaryY.length; i++) {
    for (let j = 1; j < Math.min(pointsBoundaryY.length - i, 8); j++) {
      if (
        pointsBoundaryY[i].distance(pointsBoundaryY[i + j]) < currentMinDist
      ) {
        currentMinDist = pointsBoundaryY[i].distance(pointsBoundaryY[i + j]);
        currentClosestPair = [pointsBoundaryY[i], pointsBoundaryY[i + j]];
      }
    }
  }

  return [currentMinDist, currentClosestPair[0], currentClosestPair[1]];
};

const closestPairXY = (
  pointsX: Point[],
  pointsY: Point[]
): ClosestPairResult => {
  // base condition
  if (pointsX.length < 4) {
    return closestPairBruteForce(pointsX);
  }

  // divide pointsX into left and right halves, Q and R
  const midPoint =
    pointsX.length % 2 === 0 ? pointsX.length / 2 : (pointsX.length + 1) / 2;

  const Q = pointsX.slice(0, midPoint);
  const R = pointsX.slice(midPoint, pointsX.length);

  // Sort left and right halves by x and y co-ordinates
  const Qx: Point[] = mergeSort(Q, (point1: Point, point2: Point) =>
    point1.x < point2.x ? -1 : point1.x > point2.x ? 1 : 0
  );
  const Qy: Point[] = mergeSort(Q, (point1: Point, point2: Point) =>
    point1.y < point2.y ? -1 : point1.y > point2.y ? 1 : 0
  );
  const Rx: Point[] = mergeSort(R, (point1: Point, point2: Point) =>
    point1.x < point2.x ? -1 : point1.x > point2.x ? 1 : 0
  );
  const Ry: Point[] = mergeSort(R, (point1: Point, point2: Point) =>
    point1.y < point2.y ? -1 : point1.y > point2.y ? 1 : 0
  );

  // recursively find closest pair between left and right halves
  const [dLeft, p1, q1] = closestPairXY(Qx, Qy);
  const [dRight, p2, q2] = closestPairXY(Rx, Ry);

  const d = Math.min(dLeft, dRight);

  // find closest pair that may be split across two halves
  const [dSplit, p3, q3] = closestSplitPair(pointsX, pointsY, d);

  const minDistance = Math.min(dLeft, dRight, dSplit);
  if (minDistance === dLeft) {
    return [dLeft, p1, q1];
  } else if (minDistance === dRight) {
    return [dRight, p2, q2];
  }
  return [dSplit, p3, q3];
};

const closestPair = (points: Point[]): ClosestPairResult => {
  if (points.length < 2) {
    throw new Error(
      "Atleast two points are required to calculate closest pair"
    );
  }

  // Sort points by x co-ordinate
  const pointsX: Point[] = mergeSort(points, (point1: Point, point2: Point) =>
    point1.x < point2.x ? -1 : point1.x > point2.x ? 1 : 0
  );

  // Sort points by y co-ordinate
  const pointsY: Point[] = mergeSort(points, (point1: Point, point2: Point) =>
    point1.y < point2.y ? -1 : point1.y > point2.y ? 1 : 0
  );

  return closestPairXY(pointsX, pointsY);
};

export default closestPair;
