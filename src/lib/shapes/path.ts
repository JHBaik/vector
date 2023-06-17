import { Coordinate, Shape } from "@/lib/domain";

export interface Path extends Shape<Path> {
  type: "path";
  points: Coordinate[];
}
