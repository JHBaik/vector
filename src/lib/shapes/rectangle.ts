import { Coordinate, Shape } from "@/lib/domain";

export interface Rectangle extends Shape<Rectangle> {
  type: "rectangle";
  // topRight: Coordinate;
  width: number;
  height: number;
}
