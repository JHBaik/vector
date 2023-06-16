import {
  KeyEvent,
  MouseClickEvent,
  MouseDragEvent,
  NewShape,
} from "@/lib/base";
import { Path } from "@/lib/shapes/path";
import { Rectangle } from "@/lib/shapes/rectangle";
import { Circle } from "@/lib/shapes/circle";

export type AllShapes = Path | Circle | Rectangle;

export type AllCommands =
  | NewShape<AllShapes>
  | KeyEvent
  | MouseClickEvent
  | MouseDragEvent;

// export type SupportedCommands =
//   | (
//       | "shape/new"
//       | "shape/move"
//       | "shape/resize"
//       | "shape/select"
//       | "shape/z-index"
//       | "shape/delete"
//       | "shape/props"
//     )
//   | "path/append_point";
