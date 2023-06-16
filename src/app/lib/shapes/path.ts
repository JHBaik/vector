import { Coordinate, Shape } from "@/app/lib/base";
import { Command } from "@/app/lib/types";

export interface Path extends Shape {
  type: "path";
  points: Coordinate[];
}

export interface AppendPoint extends Command<"path/append_point"> {
  point: Coordinate;
}
