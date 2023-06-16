import { Coordinate, Shape } from "@/lib/base";
import { Command } from "@/lib/types";

export interface Path extends Shape<Path> {
  type: "path";
  points: Coordinate[];
}

// export interface AppendPoint extends Command<"path/append_point"> {
//   point: Coordinate;
// }
