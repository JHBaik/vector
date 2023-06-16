export type SupportedShapes = "path" | "circle" | "rectangle";

export type SupportedCommands =
  | (
      | "shape/new"
      | "shape/move"
      | "shape/resize"
      | "shape/select"
      | "shape/z-index"
      | "shape/delete"
      | "shape/props"
    )
  | "path/append_point";
