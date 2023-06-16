import { Coordinate, Shape } from "@/lib/base";

export interface Circle extends Shape<Circle> {
  type: "circle";
  center: Coordinate;
  radius: number;
}
