import { Coordinate, Shape } from "@/lib/base";

export interface Rectangle extends Shape<Rectangle> {
  type: "rectangle";
  topRight: Coordinate;
  width: number;
  height: number;
}
