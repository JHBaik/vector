import { Shape } from "@/lib/model/shape";

export interface Rectangle extends Shape<Rectangle> {
  type: "rectangle";
  // topRight: Coordinate;
  width: number;
  height: number;
}
