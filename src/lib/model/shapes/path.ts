import { Coordinate, Shape } from "@/lib/model/shape";

export interface Path extends Shape<Path> {
  type: "path";
  points: Coordinate[];
}
