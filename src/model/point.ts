export default class Point {
  public readonly x: number;

  public readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public equals(anotherPoint: Point): boolean {
    return anotherPoint.x === this.x && anotherPoint.y === this.y;
  }

  public distance(anotherPoint: Point): number {
    return (
      Math.round(
        Math.sqrt(
          Math.pow(anotherPoint.x - this.x, 2) +
            Math.pow(anotherPoint.y - this.y, 2)
        ) * 100
      ) / 100
    );
  }

  public toString(): string {
    return `P(${this.x}, ${this.y})`;
  }
}
