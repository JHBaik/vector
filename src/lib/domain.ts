import { AllCommands, AllShapes } from "@/lib/meta";

export interface Command<NAME> {
  target_id?: number;
  name: NAME;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface Shape<T extends Shape<T>> {
  id: number;
  type: string;
  lineColor: string;
  lineWidth: number;
  closed: boolean;
  fillColor: string;
  pivot: Coordinate;

  // below is runtime only
  _selected: boolean;
}

export interface Canvas {
  width: number;
  height: number;
  shapes: AllShapes[];

  // get<T extends AllShapes = AllShapes>(): (id: number) => T;
}

// export interface ShapeProvider<SHAPE extends Shape<any>> {
//   shape: SupportedShapes;
//   handleCommand: (command: AllCommands, shape: SHAPE) => SHAPE;
// }

export interface CanvasCtx {
  mode: mode;
  canvas: Canvas;
  debugLog: string;

  // registerShapeProvider: (provider: ShapeProvider<any>) => {};
  registerListener: (cb: () => void) => void;
  unregisterListener: (cb: () => void) => void;
  handleCommand: (command: AllCommands) => void;
  log: (str: string | object) => void;
  selected: Set<AllShapes>;

  newItemId(): number;
}

export interface NewShape<T extends AllShapes> extends Command<"shape/new"> {
  shape: T;
}

export interface KeyEvent extends Command<"shape/key_event"> {
  key: "shift" | "alt"; //| '' | 'meta'
}

export interface MouseClickEvent extends Command<"shape/mouse_click"> {
  item_id?: number;
}

export interface MouseDragEvent extends Command<"shape/mouse_drag"> {
  delta: Coordinate;
}

export interface UpdateShape<T extends AllShapes>
  extends Command<"shape/update"> {
  shape: T;
}

export interface UpdateZIndex extends Command<"shape/z_index"> {
  item_id?: number;
  type: "+" | "-";
}

export type mode = "idle" | "select" | "move";

export const mode_map = {
  idle_alt: "select",
  idle_shift: "move",
  select_alt: "idle",
  select_shift: "move",
  move_alt: "move",
  move_shift: "idle",
} as const;

const mode_map_assert: Record<`${mode}_${KeyEvent["key"]}`, mode> = mode_map;
