import { AllCommands, AllShapes } from "@/lib/meta";
import { Command } from "@/lib/types";

export interface Coordinate {
  x: number;
  y: number;
}

/**
 * Canvas 의 기본은 선을 그리고 색을 채우는 것
 */
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
  mode: "idle" | "select" | "move";
  canvas: Canvas;
  debugLog: string;

  // registerShapeProvider: (provider: ShapeProvider<any>) => {};
  registerListener: (cb: () => void) => void;
  unregisterListener: (cb: () => void) => void;
  handleCommand: (command: AllCommands) => void;

  log: (str: string | object) => void;

  selected: Set<AllShapes>;
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
